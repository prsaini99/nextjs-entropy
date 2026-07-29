# FAQs and lead-form architecture for the martech pages

---

## Part 1 — The form question

### Recommendation: one component, contextually pre-filled, rendered inline on every page

Not separate forms per product, and not one generic form everyone is sent to.

| Approach | Verdict |
|---|---|
| A form per product (9 of them) | ❌ nine things to maintain, nine places to break, analytics fragmented across nine event streams — and no conversion gain over pre-filling |
| One form, everyone navigates to it | ❌ **this is what you have today, and it leaks** |
| **One component, `defaultService` prop, rendered inline per page** | ✅ single codebase, single API, single analytics path, perfect message match |

### The leak — fix this before running any ads

Every martech sub-page currently sends conversion traffic **off the page**:

```
/martech/ai-call-center      → CTA → /martech#martech-lead-form
/martech/lead-intelligence   → CTA → /martech#martech-lead-form
/martech/creative-analysis   → CTA → /martech#martech-lead-form
/martech/social-automation   → CTA → /martech#martech-lead-form
/martech/proposal-maker      → CTA → /martech#martech-lead-form
/martech/ai-integration      → CTA → /martech#martech-lead-form
```

Plus `ctaHref="/martech#martech-lead-form"` on **all nine** sub-pages via
`[slug]/page.jsx`.

So a visitor who clicks an ad for "ai calling agent", reads the AI Call Center
page, decides to enquire — gets navigated to a **different page**, waits for a
load, and is then shown a 12-option dropdown asking what they need. After
reading a page about exactly one thing.

Three costs: a page load (drop-off), lost context (the page they cared about is
gone), and a question you already know the answer to.

### What to build

1. Give `MartechLeadForm` a `defaultService` prop that pre-selects the dropdown.
2. Render it inline at the bottom of `MartechProductPage`, so every sub-page has
   its own form with the right service already chosen.
3. Change every `ctaHref` and `demo.href` from `/martech#martech-lead-form` to
   the **on-page** anchor `#martech-lead-form` — a scroll, not a navigation.
4. Pass `lead_source: 'martech/<slug>'` so the `leads` table records which page
   produced the lead. Today every martech lead records as just `martech`.

Keep the service dropdown editable — pre-select, don't lock. Someone may arrive
for the call centre and enquire about something else.

**Leave `/contact-us` alone.** It's the general-purpose entry point and its
6-field form is right for that job. This is about the martech pages only.

---

## Part 2 — FAQs

### Two things are missing

1. **`MartechFAQ.jsx` is hub-only** — a hardcoded `faqs` array, no per-page
   support. The nine sub-pages have no FAQ at all.
2. **No `FAQPage` schema anywhere.** Without it these never appear as rich
   results and are far less likely to be pulled into AI answers.

### How to implement

Add a `faqs: [{ q, a }]` array to each page in `martechPages.js`; generalise
`MartechFAQ` to accept them as a prop; emit `FAQPage` JSON-LD from
`[slug]/page.jsx` alongside the existing structured data.

### Rules that make FAQs work

- **5–7 per page.** More reads as padding.
- **Answer in 40–60 words.** That's snippet length; longer gets truncated.
- **Answer first, explain second.** Don't build up to it.
- **Use the buyer's phrasing in the question**, including the terms with no ad
  volume — "build vs buy marketing automation" is worthless for ads but is
  exactly what someone asks an LLM.
- **Include the objections**: price, timeline, legality, "why not just use X",
  and what happens when it fails. These are the questions people actually have,
  and answering them honestly is what earns the call.

---

## The FAQs

### `/martech` (hub) — AI marketing agency, martech stack

**What does an AI marketing agency actually do?**
We build the marketing systems you'd otherwise rent — automation, influencer
platforms, calling agents, lead engines — and then run campaigns on them. Most
agencies configure off-the-shelf SaaS; most dev shops have never run a campaign.
The combination is the point.

**Build vs buy: when does custom marketing automation beat SaaS?**
Roughly when your annual SaaS spend crosses the cost of building, or when the
tool stops fitting your workflow. Per-seat and per-contact pricing scales with
your headcount and list size rather than your results, so the crossover arrives
sooner than most teams expect.

**How much does it cost to build a custom martech stack?**
It depends on scope, but the useful comparison isn't licence-vs-build — it's
three-year total cost. Licence fees recur and rise; a build is capital that
stops costing you. We'll model both against your actual stack in the audit.

**How long does a martech build take?**
First release in weeks, not quarters — typically a 90-day path from stack audit
to a live system, delivered in weekly increments. AI-accelerated engineering
compressed the timeline that made "building takes too long" true in 2020.

**Who maintains it after launch?**
We do, on a managed retainer — monitoring, API version upgrades and new
capabilities. Platform APIs change constantly; owned software needs someone
keeping pace with them. You don't need an in-house platform team.

**What is a martech stack audit?**
A map of your current tools, spend and data flows, identifying shelfware,
integration debt and what to keep, replace or build — sequenced by ROI. It's
free and it's useful whether or not you build anything with us.

---

### `/martech/ai-call-center` — ai calling agent, ai receptionist

**What is an AI calling agent?**
A voice AI that answers and makes phone calls in real time — qualifying leads,
booking meetings, following up — and logs every transcript to your CRM. Unlike
an IVR it holds an actual conversation, handles interruptions and understands
intent rather than menu choices.

**What's the difference between an AI receptionist and an AI call center?**
An AI receptionist answers inbound calls — routing, taking messages, booking.
An AI call center does that plus outbound: follow-up calls, qualification,
re-engaging leads that went quiet. Ours does both from one configuration.

**How much does an AI calling agent cost?**
Pricing depends on call volume and languages, but the comparison to run is
against a human calling team: a voice agent covers 24/7 with no shift
scheduling, no attrition and no ramp time. We'll model it against your volumes.

**Can it handle Hindi and English in the same call?**
Yes — 11 languages in real time, including code-switching mid-sentence, which is
how most Indian customers actually speak. Fixed-language agents break on the
first switch; that's the case we built for.

**What happens when the AI can't answer?**
It hands off to a human with the full conversation context, so the customer
never repeats themselves. Escalation rules are yours to set — by topic, by
sentiment, or on request.

**How long does it take to launch?**
A new company's agent is configured from a single profile, with no redeploy —
so a working agent is days, not months. The time goes into your scripts,
objection handling and escalation rules, not engineering.

---

### `/martech/influencer-marketing` — influencer marketing platform / agency

**What's the difference between an influencer marketing platform and an agency?**
A platform gives you tools; an agency runs the campaign. We do both — Zyflus is
the software, and we've run creator campaigns on it. Most vendors have never
executed a campaign with their own product.

**How do you find the right influencers for a brand?**
Discovery pulls creators from Instagram, then AI scores each one 0–100 against
your ideal influencer profile — audience fit, engagement quality, brand safety.
Your team spends its time on the top decile instead of scrolling thousands.

**Can agencies manage multiple brands in one account?**
Yes — multi-brand isolation is built in, so each client's creators, campaigns
and negotiations stay separate. It was designed for agency use rather than
retrofitted.

**How much does influencer marketing software cost?**
Depends on whether you want the platform, the campaigns, or both. The platform
is licensed; campaigns are scoped per engagement. Either way there's no
per-creator pricing that penalises you for searching more.

**Do you run the campaigns or only provide the tool?**
Both, and you can take either. Some clients license Zyflus and run it
themselves; others hand us the campaign end to end.

**How does outreach automation avoid looking like spam?**
Sequences are personalised per creator and stop the moment someone replies.
The goal is getting a human conversation started faster, not sending more DMs.

---

### `/martech/social-automation` — instagram dm automation

**What is Instagram DM automation?**
Software that replies to DMs and comments automatically — answering common
questions, qualifying interest and following up — so nobody waits hours for a
response. Humans only handle conversations that need judgement.

**Is Instagram DM automation allowed by Meta?**
Yes, within Meta's platform rules, which is why we build on the official
Instagram Graph API rather than browser scripts that risk your account. Rate
limits, consent and messaging windows are respected by design.

**Can automated replies sound like my brand?**
Yes — replies are drafted in your brand voice and can be reviewed before
sending. The aim is automation that builds your brand, not automation that
embarrasses it.

**What's the difference between a chatbot and DM automation?**
A chatbot answers; DM automation also *initiates* and follows up, then routes
qualified conversations to a human. It's a pipeline, not a Q&A widget.

**How fast do replies go out?**
Under a minute for incoming DMs and comments, around the clock — which is
usually the difference between a sale and a competitor's reply.

---

### `/martech/lead-intelligence` — b2b lead generation

**How do you build a B2B lead generation system?**
Three parts: a data engine that finds and enriches prospects, a CRM that
captures every WhatsApp, call and email in one timeline, and AI scoring that
tells reps who to call next. Most teams have the third missing.

**Is web scraping for lead generation legal in India?**
Scraping publicly available business information is generally permissible, but
how you *store and use* personal data falls under the DPDP Act. We build
consent and retention rules in rather than bolting them on.

**How is this different from Apollo or ZoomInfo?**
Those are subscriptions to someone else's database. This is your own pipeline,
your own schema, your own warehouse — enriched continuously and priced on
infrastructure rather than per seat.

**What is AI lead scoring?**
A model that reads every interaction — calls, WhatsApp threads, emails — and
assigns each lead a score, temperature and next action. Reps open the CRM
knowing exactly who to call and what to say.

---

### `/martech/ai-integration` — mcp integration

**What is MCP (Model Context Protocol)?**
An open standard for connecting AI assistants to real systems as tools. Instead
of copy-pasting between ChatGPT and ten dashboards, your AI can query your ad
accounts, CRM and analytics directly.

**How do I connect my CRM to ChatGPT or Claude?**
Through a custom MCP connector that exposes the actions you want, with
guardrails on the ones you don't. We map your platforms and business rules
first — the AI is only as useful as its understanding of how you work.

**What does MCP integration consulting cost?**
Scoped per connector, usually with an ongoing retainer — platform APIs change,
and connectors rot without maintenance. The retainer is what keeps the
ecosystem improving instead of degrading.

**Is it safe to let AI act on our marketing accounts?**
That's what the approval guardrails are for. High-consequence actions — spend
changes, sends, publishing — go through a human gate. The AI drafts; a person
confirms.

---

### `/martech/proposal-maker` — ai proposal generator

**What is an AI proposal generator?**
Software that drafts a proposal from your previous mandates, applies your brand
design automatically, recommends the quote from your pricing history — then
tells you which sections the client actually read.

**Can it use my brand's design?**
Yes — logo, type and colours applied automatically to every proposal, not a
generic template with your logo dropped in a corner.

**How is this different from PandaDoc or Proposify?**
Those are document tools you fill in. This drafts the content from your own won
proposals, recommends pricing from your history, and suggests upsells the client
didn't ask for. And it's yours, not a per-seat subscription.

**How do reading analytics help close deals?**
You see which sections were read and for how long, so follow-ups are timed by
the client's behaviour rather than your memory — and pipeline reporting reflects
real engagement instead of guesses.
