'use client';
import React, { useState, useRef, useEffect } from 'react';
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics';
import { trackLeadSubmit, getLeadEventId } from '@/lib/trackLead';
import { getUTMData } from '@/hooks/useUTMTracking';
import { clickIdPayload } from '@/lib/clickIds';

// Shown while the conversation is still just the greeting. Visitors often
// don't know what to ask a website bot; each chip is a real question the bot
// answers well and that moves toward qualification.
const STARTER_QUESTIONS = [
    'What could you automate in my business?',
    'How long does an automation project take?',
    'What does a typical project cost?',
    'Can AI answer my business phone calls?',
];

/**
 * Floating chat launcher + panel.
 *
 * Three bugs fixed here, all of which cost real traffic:
 *
 * 1. Positioning. The previous version wrote `position: 'fixed !important'` in a
 *    React inline style object. React assigns styles via the CSSOM IDL setter
 *    (node.style.position = value), which parses the value against the property
 *    grammar — and `!important` is not part of that grammar, so the assignment is
 *    silently rejected. Every !important declaration was dropped, `position` fell
 *    back to `static`, and the launcher rendered in normal document flow below the
 *    footer instead of floating. Layout now lives in CSS, where !important would
 *    be legal and, being unnecessary, is absent.
 *
 * 2. Mobile. The panel was a hardcoded 380px anchored 24px from the right — 404px
 *    of demand on a 360px Android viewport. Inline styles cannot express media
 *    queries, so there was no mobile path at all. Clarity recorded a visitor from
 *    Google Search rage-clicking the greeting for ~5 minutes before leaving. Under
 *    640px the panel is now a full-screen sheet.
 *
 * 3. Untracked conversions. The API can return lead_collected, meaning the chat
 *    captured a lead — and that only ever reached console.log. Chat leads never
 *    appeared in GA4 and could never be imported as an Ads conversion. It now
 *    fires generate_lead through the same path as the forms.
 */

// Escape first, then linkify. The previous version passed the model's reply
// straight to dangerouslySetInnerHTML after a narrow regex replace, so any other
// markup in the response rendered as HTML. Escaping first makes injected markup
// inert; the only tags in the output are the anchors we add ourselves.
function escapeHtml(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function linkify(text) {
    return escapeHtml(text).replace(
        /(https?:\/\/[^\s<]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="chat-link">$1</a>'
    );
}

export default function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi! I'm Stackbinary's assistant. Ask me what we could build or automate for your business, how projects run, or anything about our AI call answering. Pick a question below or type your own.",
            isBot: true,
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [leadCollected, setLeadCollected] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const messageCount = useRef(0);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const openChat = () => {
        setIsOpen(true);
        trackEvent(ANALYTICS_EVENTS.CHAT_OPEN, { entry_path: window.location.pathname });
        // Focus the input on open. The rage clicks in Clarity were on the greeting
        // bubble, which is the natural place to tap when the real target isn't
        // obvious — putting the caret in the input makes the affordance explicit.
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const closeChat = () => setIsOpen(false);

    // Escape closes the panel — expected of any modal-ish surface.
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => { if (e.key === 'Escape') closeChat(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen]);

    const sendText = async (text) => {
        const trimmed = text.trim();
        if (!trimmed || isLoading) return;

        const userMessage = {
            id: Date.now(),
            text: trimmed,
            isBot: false,
            timestamp: new Date()
        };

        // Snapshot before appending: this is the history the server receives.
        const priorHistory = messages.map((m) => ({
            role: m.isBot ? 'assistant' : 'user',
            content: m.text,
        }));

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        messageCount.current += 1;
        trackEvent(ANALYTICS_EVENTS.CHAT_MESSAGE, { message_index: messageCount.current });

        try {
            const stored = getUTMData();
            const attributed = { ...stored.first_touch, ...stored.last_touch, ...clickIdPayload() };
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user: trimmed,
                    session_id: sessionId,
                    history: priorHistory,
                    page: window.location.pathname,
                    referrer: document.referrer || null,
                    utm: attributed,
                    meta_event_id: getLeadEventId(),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                if (!sessionId && data.session_id) setSessionId(data.session_id);

                // A lead captured in chat is a lead. Route it through the same
                // helper the forms use so GA4, GTM and any Ads conversion import
                // see one consistent generate_lead regardless of capture surface.
                if (data.lead_collected && !leadCollected) {
                    setLeadCollected(true);
                    trackLeadSubmit({ form: 'chat', service: data.lead_data?.service || '' });
                }

                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: data.answer,
                    isBot: true,
                    timestamp: new Date(),
                    leadCollected: data.lead_collected || false
                }]);
            } else {
                // Rate limits and validation come back with a human-readable
                // answer; show that rather than a generic failure.
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: data.answer || "I'm experiencing technical difficulties. Please try again or contact us directly: https://stackbinary.io/contact-us",
                    isBot: true,
                    timestamp: new Date()
                }]);
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "I'm experiencing technical difficulties. Please try again or contact us directly: https://stackbinary.io/contact-us",
                isBot: true,
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        sendText(inputMessage);
    };

    return (
        <>
            {!isOpen && (
                <button
                    type="button"
                    className="chat-launcher"
                    onClick={openChat}
                    aria-label="Open chat with StackBinary assistant"
                >
                    💬 Chat with us
                </button>
            )}

            {isOpen && (
                <div
                    className="chat-panel"
                    role="dialog"
                    aria-modal="false"
                    aria-label="StackBinary assistant"
                >
                    <div className="chat-header">
                        <div className="chat-identity">
                            <div className="chat-avatar" aria-hidden="true">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.36 14.98 3.01 16.26L2 22L7.74 20.99C9.02 21.64 10.46 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="white" />
                                </svg>
                            </div>
                            <div>
                                <div className="chat-title">Stackbinary Assistant</div>
                                <div className="chat-subtitle">
                                    {leadCollected ? '✓ Details received' : 'AI assistant · Online'}
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="chat-close"
                            onClick={closeChat}
                            aria-label="Close chat"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    <div className="chat-messages">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`chat-row ${message.isBot ? 'is-bot' : 'is-user'}`}
                            >
                                <div
                                    className={`chat-bubble ${message.isBot ? 'bot' : 'user'} ${message.leadCollected ? 'lead' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: linkify(message.text) }}
                                />
                            </div>
                        ))}
                        {messages.length <= 1 && !isLoading && (
                            <div className="chat-starters">
                                {STARTER_QUESTIONS.map((q) => (
                                    <button
                                        key={q}
                                        type="button"
                                        className="chat-starter"
                                        onClick={() => sendText(q)}
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}
                        {isLoading && (
                            <div className="chat-row is-bot">
                                <div className="chat-bubble bot chat-typing">
                                    <span className="dot" /><span className="dot" /><span className="dot" />
                                    <span className="typing-label">Typing…</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chat-input-row" onSubmit={sendMessage}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type your message…"
                            aria-label="Message"
                            className="chat-input"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className="chat-send"
                            disabled={isLoading || !inputMessage.trim()}
                            aria-label="Send message"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}

            <style jsx global>{`
                .chat-launcher {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 20px;
                    border: none;
                    border-radius: 50px;
                    background: #E0362C;
                    color: #fff;
                    font-size: 14px;
                    font-weight: bold;
                    cursor: pointer;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
                }
                .chat-launcher:hover { background: #B3261A; }

                .chat-panel {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    z-index: 9999;
                    width: 380px;
                    height: 500px;
                    max-height: calc(100vh - 48px);
                    background: #1a1a1a;
                    border: 1px solid #333;
                    border-radius: 12px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                /* Below 640px the old panel demanded 404px of a 360px viewport and
                   overflowed off-screen. A full-bleed sheet is the only layout that
                   reliably keeps the input reachable on a phone. 100dvh rather than
                   100vh so the mobile browser chrome doesn't push the input under
                   the fold. */
                @media (max-width: 639px) {
                    .chat-panel {
                        top: 0; right: 0; bottom: 0; left: 0;
                        width: 100%;
                        height: 100dvh;
                        max-height: none;
                        border: none;
                        border-radius: 0;
                    }
                    .chat-launcher { bottom: 16px; right: 16px; }
                }

                .chat-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 16px;
                    background: #E0362C;
                    border-bottom: 1px solid #333;
                    flex-shrink: 0;
                }
                .chat-identity { display: flex; align-items: center; gap: 12px; }
                .chat-avatar {
                    width: 40px; height: 40px;
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    background: rgba(255, 255, 255, 0.2);
                    flex-shrink: 0;
                }
                .chat-title { color: #fff; font-weight: 500; }
                .chat-subtitle { color: rgba(255, 255, 255, 0.8); font-size: 12px; }
                .chat-close {
                    background: transparent; border: none; color: #fff;
                    cursor: pointer; padding: 8px; display: flex;
                }

                .chat-messages {
                    flex: 1;
                    padding: 16px;
                    overflow-y: auto;
                    background: #1a1a1a;
                    -webkit-overflow-scrolling: touch;
                }
                .chat-row { display: flex; margin-bottom: 16px; }
                .chat-row.is-bot { justify-content: flex-start; }
                .chat-row.is-user { justify-content: flex-end; }

                .chat-bubble {
                    max-width: 80%;
                    padding: 8px 16px;
                    border-radius: 16px;
                    font-size: 14px;
                    color: #fff;
                    line-height: 1.5;
                    word-break: break-word;
                }
                .chat-bubble.bot { background: #333; }
                .chat-bubble.user { background: #E0362C; }
                .chat-bubble.lead { background: #2d5a2d; border: 1px solid #4ade80; }
                .chat-link { color: #a0c4ff; text-decoration: underline; }

                .chat-starters {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                    margin: 4px 0 16px;
                }
                .chat-starter {
                    padding: 8px 14px;
                    border: 1px solid #555;
                    border-radius: 16px;
                    background: transparent;
                    color: #fff;
                    font-size: 13px;
                    text-align: left;
                    cursor: pointer;
                }
                .chat-starter:hover { border-color: #E0362C; color: #E0362C; }

                .chat-typing { display: flex; align-items: center; gap: 8px; }
                .chat-typing .dot {
                    width: 8px; height: 8px; border-radius: 50%;
                    background: #fff;
                    animation: chat-bounce 1.4s infinite ease-in-out both;
                }
                .chat-typing .dot:nth-child(2) { animation-delay: 0.16s; }
                .chat-typing .dot:nth-child(3) { animation-delay: 0.32s; }
                .typing-label { font-size: 12px; opacity: 0.7; }
                @keyframes chat-bounce {
                    0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
                    40% { transform: scale(1); opacity: 1; }
                }

                .chat-input-row {
                    display: flex;
                    gap: 8px;
                    padding: 16px;
                    border-top: 1px solid #333;
                    background: #1a1a1a;
                    flex-shrink: 0;
                    padding-bottom: max(16px, env(safe-area-inset-bottom));
                }
                .chat-input {
                    flex: 1;
                    padding: 10px 16px;
                    border-radius: 20px;
                    background: #333;
                    border: 1px solid #555;
                    color: #fff;
                    /* 16px on mobile: anything smaller makes iOS Safari zoom the
                       viewport on focus, which strands the user mid-conversation. */
                    font-size: 16px;
                    outline: none;
                    min-width: 0;
                }
                @media (min-width: 640px) { .chat-input { font-size: 14px; } }
                .chat-input:focus { border-color: #E0362C; }

                .chat-send {
                    display: flex; align-items: center; justify-content: center;
                    padding: 8px 14px;
                    border: none; border-radius: 20px;
                    background: #E0362C; color: #fff;
                    cursor: pointer;
                    flex-shrink: 0;
                }
                .chat-send:disabled { background: #666; cursor: not-allowed; }
            `}</style>
        </>
    );
}
