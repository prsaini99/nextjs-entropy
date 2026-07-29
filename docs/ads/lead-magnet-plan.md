# Lead magnet — MarTech Stack Audit

**Status: plan only. No code written.**

Replaces the "Free Stack Audit" that is currently promised in two CTAs
(`WhyCustom.jsx`, `MartechProcess.jsx`) and in the ad copy, but has no page,
no form and no deliverable behind it.

---

## The idea

**"Paste your website URL → see what martech you're running → see what it's
costing you."**

An instant, self-serve scan and cost model. The human audit still happens — it
becomes the follow-up rather than the offer.

## Why this and not a manual audit

| | Manual audit | Scanner + calculator |
|---|---|---|
| Cost to deliver | hours of your team, per lead | zero |
| Time to value | days | seconds |
| Differentiation | every agency offers one | nobody in your market does this |
| Engagement signal | one form submit | 4-stage funnel |
| Proof of capability | claimed | **demonstrated** |
| Shareable / linkable | no | yes — earns backlinks |

The last two rows are the real argument. A prospect who watches you build a tool
that instantly analyses *their* stack has seen you build something, which is the
entire thing you sell. And it turns `WhyCustom` — licence creep, per-contact
pricing, 1,200 tools sunset — from your claim into their own numbers.

It also dogfoods the new positioning: if a single project ships in 2–3 weeks,
this tool should take about that long. Saying so on the page is proof.

---

## The flow

```
1. Landing         H1 + single input: "yourcompany.com"          → magnet_start
2. Scan (~5s)      server fetches + detects martech signatures
3. Results         "We found 9 tools" + estimated annual spend   → magnet_scan_complete
4. Adjust          user corrects contacts / seats / tools        → magnet_adjust
5. Email gate      "Send me the full report + build comparison"  → magnet_email_submit
6. Follow-up       human audit, from your team, within 24h
```

Steps 1–4 are ungated. **Do not gate the numbers** — the value has to land before
the ask, or it's just a contact form wearing a costume.

---

## What it detects

Fetch the homepage HTML server-side and match known signatures:

**Analytics** GA4 · GTM · Clarity · Hotjar · Mixpanel · Amplitude · Plausible
**Marketing automation** HubSpot · Klaviyo · Mailchimp · Braze · MoEngage · WebEngage · CleverTap · Zoho
**Ads** Meta Pixel · Google Ads · LinkedIn Insight · TikTok Pixel
**Chat / support** Intercom · Drift · Freshchat · Tawk · Crisp
**CRM / forms** Salesforce · Zoho · Freshworks · Typeform
**Commerce** Shopify · WooCommerce · Magento

### The honest limitation — design around it, don't hide it

**Anything loaded *through* GTM is invisible to a raw HTML fetch.** GTM injects
its tags at runtime, so a site running twelve tools via GTM looks like it runs
one.

Two options:

- **v1 (recommended):** detect what's in the HTML, then say so plainly — *"You're
  loading tags through Google Tag Manager, so we can only see the container from
  outside. Add anything we missed:"* followed by a checklist. The limitation
  becomes a conversation and the user corrects the data for you.
- **v2:** headless browser that executes the page and watches network requests.
  Far more accurate, much heavier to run. Only worth it if v1 converts.

The v1 framing is better than it sounds. A user who ticks six extra boxes has
invested effort, and self-reported data is more accurate than anything you'd
infer anyway.

---

## The cost model — where credibility lives

If the tool says "you're spending ₹8 Lakh a year" and they're spending ₹2 Lakh,
you've lost them. Three rules:

1. **Always a range, never a figure.** "₹4.2–6.8 Lakh/year at your list size."
2. **Assumptions visible and editable.** Contacts, seats, plan tier — all
   adjustable, number updates live. More accurate, more engaging, and it makes
   the output *theirs*.
3. **Show the maths.** A per-tool line-item table, not a single scary total.
   Defensible beats dramatic.

Needs a maintained price table (tool → tier → India pricing). That's the real
ongoing maintenance cost of this thing — budget for reviewing it quarterly.

### The comparison that closes

Alongside the annual spend, one line:

> **Three-year licence cost: ₹14–20 Lakh** — and rising with your list.
> **What building the equivalent costs: a fraction of that, once.**

Comparative, not a price list. Consistent with the positioning guardrails: never
publish "$500" as a headline number.

---

## Page and naming

**URL:** `/stack-audit` — top-level, not nested under `/martech`. Cleaner to
share, and it can rank for `martech stack audit` and `marketing technology audit`
(both 10–100/mo — low volume but highly linkable).

**Title (for search):** "Free MarTech Stack Audit — What Is Your Marketing Stack
Costing You?"
**H1 (for humans):** "What is your marketing stack actually costing you?"

Keep the CTA wording already on the site — "Audit My Stack — Free" — so the two
existing CTAs finally point somewhere real.

---

## Engagement events

This is why it earns its place in the ad plan. A page with one binary event
becomes a four-stage funnel:

| Event | Fires when | Read as |
|---|---|---|
| `magnet_start` | URL submitted | curiosity |
| `magnet_scan_complete` | results rendered | **primary micro-conversion** |
| `magnet_adjust` | assumptions edited | strong intent — they're modelling their own case |
| `magnet_email_submit` | report requested | lead |

`magnet_adjust` is the interesting one. Someone editing their contact count is
mentally running your build-vs-buy argument on their own numbers. That's a
better sales signal than most form fills, and it's worth a fast follow-up.

---

## Build scope

**v1 — the shippable version**

- `/stack-audit` page: input, results, adjust panel, email gate
- `POST /api/stack-scan` — fetch URL, detect signatures, return findings
- Price table as a data file (no CMS)
- The four events
- Email capture reuses the existing `/api/contact` path with `lead_source: 'stack-audit'`, so scan results land in the same `leads` table

**Explicitly out of scope for v1:** PDF generation, headless rendering,
saved/shareable result links, competitor benchmarking. All good v2 candidates
once it proves it converts.

**Security, non-negotiable for v1** — server-side fetching of user-supplied URLs
is an SSRF risk:

- http/https only, no other schemes
- resolve DNS first and reject private ranges (`10.*`, `172.16-31.*`,
  `192.168.*`, `127.*`, `169.254.*`, IPv6 equivalents)
- reject cloud metadata endpoints explicitly
- cap redirects, and re-validate the target of every redirect
- 5s timeout, 2MB response cap
- per-IP rate limit

---

## Risks worth naming

**Scan accuracy is the whole product.** Wrong detections destroy trust faster
than no tool at all. The "add what we missed" step is the mitigation, and it
should be prominent rather than buried.

**Price table rots.** Vendors reprice constantly. Stale numbers are a
credibility risk — review quarterly.

**It could attract tyre-kickers**, since anyone can run it. Mitigated by the
email gate and by `magnet_adjust` separating real modellers from browsers.

**It reveals what they run to a competitor** — technically anyone can read this
from page source, but the framing should stay advisory, never "we can see you're
using X, here's why it's bad."

---

## Open questions for you

1. **Scope:** ship v1 as described, or start even smaller — calculator only, no
   URL scan, user picks tools from a list? Calculator-only is days of work with
   zero SSRF surface, but loses the magic of the paste-your-URL moment.
2. **Gate placement:** email *after* results (recommended — value first), or
   before? Gating first converts a higher percentage of a much smaller number.
3. **Price data:** do you have India pricing benchmarks for the common tools, or
   should the model be built on public list pricing with a stated margin of
   error?
