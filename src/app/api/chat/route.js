// Chat assistant API. Self-contained: OpenAI chat completion + lead capture
// into Supabase + server-side Meta Lead, all behind rate limits. Replaced the
// old proxy to a dead external LangGraph service, which is why the widget
// errored on every message.

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendMetaEvent, readMetaCookies } from '@/lib/meta-capi';
import { SYSTEM_PROMPT, CAREERS_PATTERN, CAREERS_REPLY } from '@/lib/chatbot-facts';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4o-mini';

// ---- Abuse limits ----------------------------------------------------------
// In-memory sliding windows. Serverless instances each keep their own map, so
// the real-world cap is a small multiple of these numbers — still enough to
// stop scripted abuse from burning the OpenAI budget, with zero added latency.
const WINDOWS = [
  { ms: 60_000, max: 8 },        // 8 messages per minute per IP
  { ms: 3_600_000, max: 40 },    // 40 per hour per IP
];
const MAX_INPUT_CHARS = 600;
const MAX_HISTORY_MESSAGES = 12; // context sent to the model
const MAX_SESSION_MESSAGES = 30; // hard stop per conversation

const hits = new Map(); // ip -> [timestamps]

function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOWS[1].ms);
  for (const w of WINDOWS) {
    if (list.filter((t) => now - t < w.ms).length >= w.max) return true;
  }
  list.push(now);
  hits.set(ip, list);
  // Opportunistic cleanup so the map cannot grow unbounded.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (!v.some((t) => now - t < WINDOWS[1].ms)) hits.delete(k);
    }
  }
  return false;
}

// ---- Lead capture tool -----------------------------------------------------

const TOOLS = [
  {
    type: 'function',
    function: {
      name: 'submit_lead',
      description:
        'Save the visitor as a lead for the Stackbinary team. Call exactly once, only after the visitor has given at least their name and a valid email.',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string', description: "Visitor's full name" },
          email: { type: 'string', description: "Visitor's work email" },
          phone: { type: 'string', description: 'Phone or WhatsApp, optional' },
          need: {
            type: 'string',
            description: 'One or two sentences describing what they want built or automated, in their words',
          },
        },
        required: ['name', 'email', 'need'],
      },
    },
  },
];

async function saveLead(args, ctx) {
  const email = String(args.email || '').trim();
  if (!args.name || !/\S+@\S+\.\S+/.test(email)) return { ok: false, reason: 'invalid contact details' };

  const { error } = await supabaseAdmin.from('leads').insert([
    {
      full_name: String(args.name).trim().slice(0, 120),
      work_email: email.slice(0, 200),
      phone: args.phone ? String(args.phone).trim().slice(0, 40) : null,
      service: 'AI Automation (chatbot)',
      project_summary: String(args.need || '').slice(0, 1000),
      timeline: 'Exploring options',
      lead_source: 'chatbot',
      status: 'new',
      privacy_consent: true,
      thread_id: ctx.sessionId,
      landing_page: ctx.page || null,
      referrer: ctx.referrer || null,
      utm_source: ctx.utm?.utm_source || null,
      utm_medium: ctx.utm?.utm_medium || null,
      utm_campaign: ctx.utm?.utm_campaign || null,
      utm_term: ctx.utm?.utm_term || null,
      utm_content: ctx.utm?.utm_content || null,
      gclid: ctx.utm?.gclid || null,
      fbclid: ctx.utm?.fbclid || null,
    },
  ]);
  if (error) {
    console.error('chatbot: lead insert failed:', error);
    return { ok: false, reason: 'storage error' };
  }

  // Same server-side Lead the contact route fires; shares the browser's
  // event_id so Meta dedupes against the pixel copy.
  sendMetaEvent({
    eventName: 'Lead',
    eventId: ctx.metaEventId || undefined,
    email,
    phone: args.phone || undefined,
    sourceUrl: ctx.page ? `https://www.stackbinary.io${ctx.page}` : 'https://www.stackbinary.io',
    fbp: ctx.fbp,
    fbc: ctx.fbc,
    clientIp: ctx.ip,
    userAgent: ctx.userAgent,
    customData: { lead_source: 'chatbot' },
  }).catch(() => {});

  return { ok: true };
}

// ---- OpenAI ----------------------------------------------------------------

async function complete(messages, { withTools }) {
  const key = (process.env.OPEN_AI_KEY || '').trim();
  const res = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: MODEL,
      messages,
      max_tokens: 350,
      temperature: 0.4,
      ...(withTools ? { tools: TOOLS, tool_choice: 'auto' } : {}),
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`openai ${res.status}: ${detail.slice(0, 300)}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message;
}

// ---- Route -----------------------------------------------------------------

const OFFLINE_REPLY =
  'The assistant is offline right now. Please use the contact form or email contact@stackbinary.io and a person will reply within one business day.';

export async function POST(request) {
  let sessionId = 'unknown';
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'bad json' }, { status: 400 });
    }

    const user = typeof body.user === 'string' ? body.user.trim() : '';
    if (!user) return NextResponse.json({ error: 'Message is required' }, { status: 400 });

    sessionId =
      typeof body.session_id === 'string' && body.session_id.length <= 64
        ? body.session_id
        : `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;

    const forwarded = request.headers.get('x-forwarded-for') || '';
    const ip = forwarded.split(',')[0].trim() || 'local';

    // Input caps before anything costs money.
    if (user.length > MAX_INPUT_CHARS) {
      return NextResponse.json(
        { answer: 'That message is a bit long for chat. Could you shorten it, or email the details to contact@stackbinary.io?', session_id: sessionId, lead_collected: false },
        { status: 200 }
      );
    }
    const history = Array.isArray(body.history) ? body.history : [];
    if (history.length > MAX_SESSION_MESSAGES) {
      return NextResponse.json(
        { answer: 'We have covered a lot in this conversation. To go further, leave your email through the contact form and the team will pick it up from here: https://www.stackbinary.io/contact-us', session_id: sessionId, lead_collected: false },
        { status: 200 }
      );
    }
    if (rateLimited(ip)) {
      return NextResponse.json(
        { answer: 'You are sending messages faster than I can keep up. Give it a minute and try again.', session_id: sessionId, lead_collected: false },
        { status: 429 }
      );
    }

    // Careers deflection: guaranteed server-side, costs no tokens.
    if (CAREERS_PATTERN.test(user)) {
      return NextResponse.json({ answer: CAREERS_REPLY, session_id: sessionId, lead_collected: false });
    }

    if (!(process.env.OPEN_AI_KEY || '').trim()) {
      return NextResponse.json({ answer: OFFLINE_REPLY, session_id: sessionId, lead_collected: false });
    }

    // Sanitize client-supplied history: roles and lengths only, last N.
    const past = history
      .filter(
        (m) =>
          m &&
          (m.role === 'user' || m.role === 'assistant') &&
          typeof m.content === 'string' &&
          m.content.length <= MAX_INPUT_CHARS * 2
      )
      .slice(-MAX_HISTORY_MESSAGES)
      .map((m) => ({ role: m.role, content: m.content }));

    const messages = [{ role: 'system', content: SYSTEM_PROMPT }, ...past, { role: 'user', content: user }];

    const { fbp, fbc } = readMetaCookies(request.headers.get('cookie'));
    const ctx = {
      sessionId,
      ip,
      userAgent: request.headers.get('user-agent') || undefined,
      page: typeof body.page === 'string' ? body.page.slice(0, 300) : null,
      referrer: typeof body.referrer === 'string' ? body.referrer.slice(0, 300) : null,
      utm: typeof body.utm === 'object' && body.utm ? body.utm : null,
      metaEventId: typeof body.meta_event_id === 'string' ? body.meta_event_id.slice(0, 64) : null,
      fbp,
      fbc,
    };

    let reply = await complete(messages, { withTools: true });
    let leadCollected = false;
    let leadData = null;

    const toolCall = reply?.tool_calls?.[0];
    if (toolCall?.function?.name === 'submit_lead') {
      let args = {};
      try {
        args = JSON.parse(toolCall.function.arguments || '{}');
      } catch {}
      const result = await saveLead(args, ctx);
      leadCollected = result.ok;
      if (result.ok) leadData = { name: args.name, email: args.email, service: 'AI Automation (chatbot)' };

      // Second round so the confirmation reads naturally and reflects success
      // or failure truthfully.
      reply = await complete(
        [
          ...messages,
          { role: 'assistant', content: reply.content || '', tool_calls: reply.tool_calls },
          { role: 'tool', tool_call_id: toolCall.id, content: JSON.stringify(result) },
        ],
        { withTools: false }
      );
    }

    const answer =
      (reply?.content || '').trim() ||
      'Sorry, I lost my train of thought. Could you say that again?';

    return NextResponse.json({ answer, session_id: sessionId, lead_collected: leadCollected, lead_data: leadData });
  } catch (error) {
    console.error('chatbot: request failed:', error);
    return NextResponse.json(
      { answer: OFFLINE_REPLY, session_id: sessionId, lead_collected: false },
      { status: 500 }
    );
  }
}
