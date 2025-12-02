'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function FloatingChat() {
    // Debug: Log when component mounts
    useEffect(() => {
        console.log('FloatingChat component mounted');
        return () => console.log('FloatingChat component unmounted');
    }, []);
    const [isOpen, setIsOpen] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    
    // Debug: Log state changes
    useEffect(() => {
        console.log('Chat widget isOpen:', isOpen);
    }, [isOpen]);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi! I'm StackBinary™'s multi-agent assistant. I can help with your project needs, schedule discovery calls, and connect you with our team. How can I assist you today?",
            isBot: true,
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [leadCollected, setLeadCollected] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            text: inputMessage,
            isBot: false,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    user: inputMessage,
                    session_id: sessionId 
                }),
            });

            const data = await response.json();
            
            if (response.ok) {
                // Update session ID if not set
                if (!sessionId && data.session_id) {
                    setSessionId(data.session_id);
                }

                // Check if lead was collected
                if (data.lead_collected && !leadCollected) {
                    setLeadCollected(true);
                    console.log('Lead collected:', data.lead_data);
                }

                const botMessage = {
                    id: Date.now() + 1,
                    text: data.answer,
                    isBot: true,
                    timestamp: new Date(),
                    leadCollected: data.lead_collected || false
                };
                setMessages(prev => [...prev, botMessage]);
            } else {
                throw new Error(data.error || 'Something went wrong');
            }
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage = {
                id: Date.now() + 1,
                text: "I'm experiencing technical difficulties. Please try again or contact us directly: https://stackbinary.io/contact-us",
                isBot: true,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    // Always render the button for debugging
    if (!isOpen) {
        console.log('Rendering closed chat button');
        return (
            <div style={{
                position: 'fixed !important',
                bottom: '24px !important',
                right: '24px !important',
                zIndex: '9999 !important',
                width: '200px',
                height: '50px'
            }}>
                <button
                    onClick={() => {
                        console.log('Chat button clicked');
                        setIsOpen(true);
                    }}
                    style={{
                        display: 'flex !important',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        borderRadius: '50px',
                        background: '#ed5145',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                        cursor: 'pointer',
                        border: 'none',
                        color: '#ffffff',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        width: '100%',
                        height: '100%'
                    }}
                >
                    💬 Chat with us
                </button>
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999
        }}>
            <div 
                style={{
                    width: '380px',
                    height: '500px',
                    background: '#1a1a1a',
                    border: '1px solid #333',
                    borderRadius: '12px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Header */}
                <div 
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px',
                        borderBottom: '1px solid #333',
                        background: '#ed5145'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div 
                            style={{ 
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(255,255,255,0.2)' 
                            }}
                        >
                            <svg 
                                width="20" 
                                height="20" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.36 14.98 3.01 16.26L2 22L7.74 20.99C9.02 21.64 10.46 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" 
                                    fill="white"
                                />
                            </svg>
                        </div>
                        <div>
                            <div style={{ color: 'white', fontWeight: '500' }}>
                                StackBinary™ Assistant
                            </div>
                            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>
                                {leadCollected ? '✓ Lead Captured' : 'Multi-Agent AI • Online'}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            padding: '4px'
                        }}
                    >
                        <svg 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                d="M18 6L6 18M6 6L18 18" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* Messages */}
                <div 
                    style={{
                        flex: 1,
                        padding: '16px',
                        overflowY: 'auto',
                        backgroundColor: '#1a1a1a'
                    }}
                >
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            style={{
                                display: 'flex',
                                justifyContent: message.isBot ? 'flex-start' : 'flex-end',
                                marginBottom: '16px'
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: '280px',
                                    padding: '8px 16px',
                                    borderRadius: '16px',
                                    backgroundColor: message.isBot 
                                        ? (message.leadCollected ? '#2d5a2d' : '#333')
                                        : '#ed5145',
                                    color: '#ffffff',
                                    border: message.leadCollected ? '1px solid #4ade80' : 'none'
                                }}
                            >
                                <div 
                                    style={{ fontSize: '14px' }}
                                    dangerouslySetInnerHTML={{ 
                                        __html: message.text.replace(
                                            /(https:\/\/stackbinary\.io\/contact-us)/g, 
                                            '<a href="$1" target="_blank" style="color: #a0c4ff; text-decoration: underline;">$1</a>'
                                        )
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            marginBottom: '16px'
                        }}>
                            <div 
                                style={{
                                    maxWidth: '280px',
                                    padding: '8px 16px',
                                    borderRadius: '16px',
                                    backgroundColor: '#333',
                                    color: '#ffffff'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            backgroundColor: '#ffffff',
                                            borderRadius: '50%',
                                            animation: 'bounce 1.4s infinite ease-in-out both'
                                        }}></div>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            backgroundColor: '#ffffff',
                                            borderRadius: '50%',
                                            animation: 'bounce 1.4s infinite ease-in-out both',
                                            animationDelay: '0.16s'
                                        }}></div>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            backgroundColor: '#ffffff',
                                            borderRadius: '50%',
                                            animation: 'bounce 1.4s infinite ease-in-out both',
                                            animationDelay: '0.32s'
                                        }}></div>
                                    </div>
                                    <span style={{ fontSize: '12px', opacity: 0.7 }}>Typing...</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div 
                    style={{
                        padding: '16px',
                        borderTop: '1px solid #333',
                        backgroundColor: '#1a1a1a'
                    }}
                >
                    <form onSubmit={sendMessage} style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type your message..."
                            style={{
                                flex: 1,
                                padding: '8px 16px',
                                borderRadius: '20px',
                                backgroundColor: '#333',
                                border: '1px solid #555',
                                color: '#ffffff',
                                fontSize: '14px',
                                outline: 'none'
                            }}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !inputMessage.trim()}
                            style={{
                                padding: '8px 12px',
                                borderRadius: '20px',
                                color: '#ffffff',
                                fontSize: '14px',
                                background: inputMessage.trim() && !isLoading 
                                    ? '#ed5145' 
                                    : '#666',
                                cursor: inputMessage.trim() && !isLoading ? 'pointer' : 'not-allowed',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <svg 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}