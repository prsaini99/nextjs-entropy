# India martech pricing research — calculator source of truth

Researched 2026-07-29 via official pricing pages (third-party roundups where
official pages are JS-gated or quote-only — flagged per line). This file feeds
`src/data/stackPricing.js` when the calculator is built.

**Modeling rules that came out of the research:**
- **+18% GST on everything** for Indian buyers — show it as a toggle-able line
- **USD-billed tools carry FX drift** (Klaviyo, Mailchimp, HubSpot, Salesforce,
  ActiveCampaign, Intercom, Semrush…) — convert at a stated rate (₹88/$ used
  below) and label it
- **Confidence levels:** ✅ official page · 🟡 roundup/estimate · 🔴 quote-only
  (show as "typical range — custom quote")
- WhatsApp math is **per-message** (post July 2025), not per-conversation
- Event-priced analytics (Mixpanel, PostHog) need an events-per-user assumption
  — surface it as an editable input (default 75 events/user/mo)

---

## Category 1 — Email / Marketing automation (driver: contacts, except Brevo)

| Tool | 10k contacts | 50k | 100k | Entry paid | Conf |
|---|---|---|---|---|---|
| Klaviyo | $150/mo (~₹13.2k) | $720/mo (~₹63k) | $1,380–1,700/mo | $20/mo | 🟡 (official gated) |
| Mailchimp Standard | $135/mo | $450/mo | $800/mo | $13–20/mo | 🟡 |
| ActiveCampaign Plus | $239/mo | ~$609/mo | quote | $15/mo | 🟡 |
| Zoho Campaigns | ~$49/mo | unverified | unverified | ~₹300/mo | 🟡 (INR-native ✅) |
| Brevo (per-email!) | $18–29/mo at 20–40k emails | $65/mo at 100k emails | — | $9/mo | 🟡 |
| HubSpot Mktg Pro | ~$1,300/mo computed | ~$2,900–3,300/mo computed | quote | $7–20/seat Starter | 🟡 (base ✅) |

Notes: Klaviyo counts ALL profiles since Feb 2025 (suppressed included) — a
gotcha worth a tooltip. Brevo is the budget outlier (unlimited contacts, pays
per send) — honest "keep/cheaper-rent" verdict for low-frequency senders.

## Category 2 — CRM (driver: seats)

| Tool | Per seat/mo | Mid tier | Conf |
|---|---|---|---|
| Zoho CRM | ₹800 Std / ₹1,400 Pro / ₹2,400 Ent | Pro–Ent | ✅ INR-native |
| Freshsales | $9 / $39 / $59 (₹749–6,400) | Pro $39 | ✅ USD, 🟡 INR |
| HubSpot CRM | free base; Starter $7–20/seat | — | ✅ |
| Salesforce | $25 / $100 / $175 | Pro $100 | 🟡 (no INR list; USD+GST) |

## Category 3 — WhatsApp (driver: subscription + per-message; the India-critical category)

**Meta base (India, Jan 2026):** marketing ₹0.8631/msg · utility/auth ₹0.115 ·
service replies free · utility free inside 24-hr window. 🟡 high-confidence.

| BSP | Subscription | Effective marketing ₹/msg | Extra seats | Conf |
|---|---|---|---|---|
| AiSensy | ₹1,500 / ₹3,200/mo | **₹1.09** | ₹750/agent | ✅ |
| WATI | ₹2,499 / ₹5,999 / ₹16,999 | **~₹1.04** (+20% on Meta) | $24–69/user | ✅ USD, 🟡 INR |
| Interakt | ₹2,799 / ₹3,799 | ₹0.949–0.958 | unlimited agents | ✅ |
| DoubleTick | ₹3,000 / ₹4,200 (annual only) | ~₹1.09 | 5–10 incl. | ✅ subs, 🟡 rates |
| QuickReply | ₹2,999 → ₹14,999 | ₹1.05 (+ charges service ₹0.41!) | ₹500/agent | 🟡 |
| Gupshup | quote | ~₹0.09 BSP fee/msg | — | 🔴 |
| Zoko | $49.99+ | $0.015/conv platform fee | tiered | ✅ |

**The calculator's killer stat:** 30,000 marketing msgs/mo →
BSP ≈ ₹41–46k incl. GST vs direct Cloud API ≈ ₹30.5k incl. GST.
**~25–35% BSP markup, forever, at every volume.** This is the WhatsApp page's
core argument, now with receipts.

## Category 4 — Engagement/retention CEPs (driver: MAU/MTU; mostly 🔴 quote-only)

| Tool | 10k–50k MAU/yr | 50k–200k MAU/yr | Public entry | Conf |
|---|---|---|---|---|
| WebEngage | ₹3–6 L/yr | ₹6–15 L/yr | none | 🔴 (CampaignHQ est.) |
| MoEngage | ₹2.5–5 L/yr | ₹6–14 L/yr | none | 🔴 |
| CleverTap | Essentials $75/mo (5k MAU; ₹6,000 India list) | Advanced ₹5–12 L/yr | ✅ Essentials | 🟡 |
| Netcore | "below the others, email-led" | quote | none | 🔴 |

Show these as "typical annual range — custom quote" bands. Single-source
(CampaignHQ 2026) — the softest numbers in the file.

## Category 5 — Analytics (drivers vary)

| Tool | Model | ~50k users/mo | Conf |
|---|---|---|---|
| GA4 | free | ₹0 — **verdict: KEEP** | ✅ |
| MS Clarity | free forever, no caps | ₹0 — **KEEP** | ✅ |
| Mixpanel | $0.28/1k events after 1M free | ~$420–1,120/mo @75 ev/user | ✅ rate, 🟡 derived |
| Amplitude | $0.049/MTU (Plus) | ~$204/mo | ✅ rate, 🟡 derived |
| PostHog | ~$50/1M events after 1M free | ~$75–200/mo | ✅ |
| Hotjar | daily sessions | ~$100–250/mo | 🟡 (post-merger flux) |

## Category 6 — Commerce / support / SEO / social / misc

| Tool | Entry | Mid | Conf |
|---|---|---|---|
| Shopify India | ₹1,994/mo (₹1,499 annual) | Grow ₹7,447 / Adv ₹30,164 | ✅ INR |
| WooCommerce real cost | ₹300–1.5k/mo hosting | ₹5–20k/mo scaled | 🟡 |
| Intercom | ~$29/seat + Fin $0.99/resolution | ~$85/seat | 🟡 seats, ✅ Fin |
| Freshchat | $19/agent (free ≤10 agents) | Pro $49/agent | ✅ |
| Tawk.to | **free** — KEEP verdict | — | ✅ |
| Crisp / Tidio | $45/workspace · $24/mo | $95 · $49+ | ✅ |
| Semrush | $117–139/mo | $199–299/mo | ✅ |
| Ahrefs | $29 Starter / $129 Lite | $249 | ✅ |
| Hootsuite | $99/mo | $199/mo | ✅ |
| Buffer | $5/channel | $10/channel | ✅ |
| SocialPilot | ₹2,000/mo | ₹6,000/mo | ✅ INR |
| Typeform | $29/mo | $59–99/mo | ✅ |
| Calendly | $10/seat | $16/seat | ✅ |

## Checklist ordering (from Part 2 adoption research — directional, not statistical)

**D2C preset:** Shopify → WhatsApp BSP (WATI/AiSensy/Interakt) → Klaviyo or
Mailchimp → GA4 + Meta ads → Zoho CRM / HubSpot free → reviews/logistics.
**B2B preset:** HubSpot or Zoho CRM → Freshworks suite → GA4 + Mixpanel →
LinkedIn Ads → Calendly → WATI for follow-ups.

WhatsApp tooling ranks far above Western staples (Hootsuite, Typeform) in
Indian stacks. Tawk.to/Freshchat beat Intercom on Indian price sensitivity.
Offer two preset buttons — "I'm a D2C brand" / "I'm B2B" — that pre-tick the
typical stack, then let the user edit. Faster than a cold checklist.

## Honest-verdict rules (credibility layer)

- Free tools (GA4, Clarity, Tawk.to, HubSpot free CRM): always **KEEP**
- Cheap flat tools (Buffer, Calendly, Typeform): **KEEP** below ~₹2k/mo spend
- Per-contact email at >25k contacts (Klaviyo, Mailchimp, AC): **BUILD candidate**
  — growth-punishing driver, the strongest case
- WhatsApp BSPs at >15k msgs/mo: **BUILD candidate** (25–35% markup, forever)
- Quote-only CEPs (WebEngage/MoEngage/CleverTap Advanced): **BUILD candidate** at
  the ₹5L+/yr band — this is where the biggest single line item usually sits
- Seat-priced CRM ≤5 seats on Zoho: **KEEP or replace-later** (₹800/seat is hard
  to beat) — honesty here buys trust for the build verdicts
