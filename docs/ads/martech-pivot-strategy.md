# MarTech pivot — positioning, pages, content and ads

Built on four rounds of Keyword Planner data (~500 keywords, India + global), a
full read of the martech surface, and the analytics fixes landed 2026-07-28.

---

## 1. The pivot

**Current identity:** "custom martech development company" — hero, meta and
`query-page-map.md` all target it.

**The problem:** it has no search demand. Across 2,546 keyword ideas, **zero**
contained `develop`, `company`, `consultant`, `hire` or `vendor`. A competitor
pull on Schbang (2,361 more keywords) returned exactly 2 martech-technology terms.
Three independent datasets, same answer.

**Where the demand actually is:**

| Vocabulary | India | Global | Low bid |
|---|---|---|---|
| ai automation agency | 1K–10K | **10K–100K** | ₹34.50 |
| ai agent development company | 1K–10K | 1K–10K | ₹113 |
| ai chatbot development company | 1K–10K | 1K–10K | ₹136 |
| ai calling agent | 1K–10K | 1K–10K | ₹102 |
| influencer marketing agency | 1K–10K | 10K–100K | ₹25 |
| whatsapp marketing software | 1K–10K | 1K–10K | ₹33 |
| **ai marketing agency** ← the bridge | 500 | 5,000 | ₹37 |
| martech stack | 100–1K | 1K–10K | ₹47 |

**The pivot:** *"custom martech development company"* → **"AI automation agency
that also runs the marketing."**

The line is already written, in `MartechCaseStudies.jsx`:

> "We build martech because we run marketing."

That is the differentiator, and it is rare. Most agencies can't build; most dev
shops have never run a campaign. You have 37 shipped products **and** campaign
results on Shiseido, Bioderma, Sugar Cosmetics and StarStruck. Nobody else in
this keyword space can say both.

The pivot is not a rebrand. It is **using the words buyers type** for a business
you already are.

---

## 2. Page architecture — three tiers

### Tier 1 — money pages (get paid traffic)

| Page | Target keyword | India | Status |
|---|---|---|---|
| `/ai-automation` | ai automation agency | 1K–10K | **build — does not exist** |
| `/martech/ai-call-center` | ai calling agent | 1K–10K | retitle |
| `/martech/influencer-marketing` | influencer marketing agency | 1K–10K | retitle |
| `/martech` (hub) | ai marketing agency | 500 | reposition |
| `/whatsapp-automation` | whatsapp marketing software | 1K–10K | **build** |
| `/stack-audit` | martech stack audit | 10–100 | **build — offer exists, page doesn't** |

### Tier 2 — SEO and content only (real but small demand; no paid budget)

| Page | Target | India |
|---|---|---|
| `/martech/lead-intelligence` | b2b lead generation company | 100–1K |
| `/martech/ai-integration` | mcp integration | 100–1K @ **₹10** |
| `/martech/social-automation` | instagram dm automation | 100–1K |
| `/martech/proposal-maker` | ai proposal generator | 100–1K |
| `/martech/marketing-automation` | marketing automation platform | 100–1K |
| `/martech/shopify-websites` | shopify store development | 100–1K |

`mcp integration` deserves a note: 100–1K in India, **1K–10K globally**, at a
₹10 floor — the cheapest real keyword in the entire dataset. Worth a small paid
test despite sitting in tier 2.

### Tier 3 — category creation (no search demand exists)

| Page | Why |
|---|---|
| `/martech/ad-intelligence` | every term 10–100 or zero |
| `/martech/creative-analysis` | `neural ad testing`, `brain response advertising`, `ai video ad analysis` — all zero |

**Do not buy ads for these.** Nobody searches for a category that doesn't exist
yet. They are outbound assets, sales collateral and content plays — genuinely
strong ones, since a live TRIBE demo in a pitch is more persuasive than any ad.

---

## 3. Content changes, page by page

### `/martech` hub — reposition
- **H1 now:** "Full-Stack MarTech, Engineered to Order"
- **Problem:** "MarTech" + "Engineered" is vocabulary nobody searches.
- **Change to:** an *AI marketing agency* frame — "AI Marketing Systems, Built and Run" or similar. Keep `WhyCustom` and `MartechProcess` untouched; they're the strongest sections on the page and they already argue build-vs-buy.
- Add the dual-proof line above the fold: **we build it, and we run it.**

### `/martech/ai-call-center` — retitle
- **Now:** "AI Call Center for Sales — Real-Time Multilingual Voice Agent"
- **Miss:** targets `ai call center` (100–1K) but not **`ai calling agent` (1K–10K)** — a 10× bigger term, absent from the title.
- **Change to:** "AI Calling Agent for Sales — Multilingual AI Call Center". Add `ai receptionist` (100–1K India, **10K–100K global**) to the body copy.

### `/martech/influencer-marketing` — extend
- **Now:** "Influencer Marketing Platform for Agencies & Brands (Zyflus)" — already targets `influencer marketing platform` (5,000).
- **Add:** `influencer marketing agency` (1K–10K) — you have the campaign results to back the agency claim, which most platform vendors don't.

### `/martech/social-automation` — retitle
- **Now:** "Instagram, Facebook & Quora Reply Bots + Web Scraping Services"
- **Miss:** the searched term is **`instagram dm automation`** (100–1K), not "reply bots".
- **Change to:** "Instagram DM Automation & Reply Bots".

### `/martech/shopify-websites` — add evidence
`shopify store development` and `shopify plus agency` both clear 100–1K India and
1K–10K global. But **Shopify is named nowhere in the 37 case studies** — six
e-commerce studies exist without naming the platform. Real demand, no proof
behind it. Name the platform in those case studies or don't bid the terms.

### `/case-studies` — fix before any paid traffic
All 37 entries use "We developed / We built / We created" against **named**
brands (Steve Madden, ClassPass, The Ordinary, Shiseido, Bioderma, Sugar
Cosmetics) with hard figures — "$100M+ in global online sales". `MartechBrands`
correctly says "Brands we've worked with"; the case studies don't. Sole-delivery
claims on named third parties are both a Google Ads policy exposure and a
trademark risk. **Highest-priority content fix.**

### Ad-facing claims — substantiate or drop
"1,200+ martech tools vanished", "91 tools", "One in four new martech
capabilities", "+43% hook lift", "292% follower growth", "3.8x ROAS". Google
requires ad claims to be substantiable. Source them visibly on-page or keep them
out of the ads.

---

## 4. New pages, in priority order

**1. `/ai-automation`** — biggest demand in the entire dataset. Business-process
framing, *not* marketing: workflow automation, AI agents, internal tooling. The
audience searching `ai automation agency` is founders and ops leads, not CMOs —
sending them to `/martech` would be a message-match failure. Proof points:
AI Call Center, MCP integrations, the CRM you run your own BD on.

**2. `/stack-audit`** — the offer already exists as a CTA in two components
("Audit My Stack — Free", "Start My 90-Day Plan") and is promised in the ad copy,
but there is no page and no distinct form. A named offer with its own page
converts materially better than a generic contact form, and it gives every ad
group a message-matched destination.

**3. `/whatsapp-automation`** — `whatsapp business api` is 10K–100K in India at a
₹32 floor, the largest India term found. Avoid competing head-on with the BSPs
(Gupshup, Wati, AiSensy) on the head term; own the **integration** angle:
`whatsapp crm integration`, `whatsapp chatbot for business`. Your Lead CRM
already captures WhatsApp threads.

---

## 5. Engagement instrumentation — do this first

**Nothing in `src/components/pages/Martech/` fires a single analytics event.**
Eight CTAs, zero measurement:

```
Explore Zyflus Live        See a Real Ad Scored Live    Audit My Stack — Free
Explore AtoEmail Live      Explore the Live Console     Start My 90-Day Plan
Explore All 37 Case Studies                             Start Your Project
```

Only form submission is tracked. Every ad group below optimises on engagement,
so this is a hard prerequisite — not a nice-to-have.

**Events to add** (all via the existing `trackEvent`, which now reaches GA4):

| Event | Fires when | Why it matters |
|---|---|---|
| `demo_open` | any "Explore … Live" clicked | strongest mid-funnel signal you have |
| `demo_interact` | user actually interacts inside a demo | separates lookers from evaluators |
| `stack_audit_click` | "Audit My Stack — Free" | offer intent |
| `process_cta_click` | "Start My 90-Day Plan" | offer intent |
| `case_study_open` | a case study expanded | proof-seeking |
| `scroll_75` | 75% depth on a product page | read-through |

`★ The live demos are the asset.` Almost no competitor lets a prospect try the
product before talking to sales. That is a far lower-friction CTA than "book a
call", and it is a *better* engagement signal because interacting with a demo
takes real intent. **Ads should promise the demo, and the demo should be the
primary micro-conversion.**

---

## 6. Ad plan — built for engagement, not leads

### Why engagement, not leads

At ~₹9,000/month and ~₹25 average CPC you buy roughly **350 clicks/month**. At a
1–2% B2B form rate that is **4–7 leads**. Ranking keywords by lead conversion
needs 15–30 conversions before it means anything — over a year at that rate.

Engagement events fire on 10–30% of sessions. That is **35–100 signals a month**,
enough to rank keywords within four to six weeks. Engagement optimisation isn't a
compromise here; it is the only measurement that works at this budget.

### Campaign structure

| # | Ad group | Lead keyword | India | Max CPC | Landing page |
|---|---|---|---|---|---|
| 1 | AI Automation & Build | ai automation agency | 1K–10K | ₹120 | `/ai-automation` |
| 2 | AI Calling Agent | ai calling agent | 1K–10K | ₹110 | `/martech/ai-call-center` |
| 3 | Influencer / Creator | influencer marketing agency | 1K–10K | ₹90 | `/martech/influencer-marketing` |
| 4 | AI Marketing Agency | ai marketing agency | 500 | ₹90 | `/martech` |
| 5 | WhatsApp Integration | whatsapp marketing software | 1K–10K | ₹80 | `/whatsapp-automation` |

**Launch 2 and 3 first** — both point at pages that already exist and both have
shipped products behind them. Ad group 1 is the biggest opportunity but is gated
on building `/ai-automation`.

Settings: Search only (no Display, no Search partners) · India, presence-based ·
**Manual CPC** — Maximize Conversions needs ~30 conversions/month and you'll have
5–10 · ₹300/day · Mon–Sat 09:00–20:00 IST · expect desktop to dominate
(forecast: 5.2% CTR desktop vs 2.8% mobile).

### Ad copy direction

Lead with the demo, not the consultation:

- **"Try It Before You Talk To Us"** — the live demos, as the differentiator
- **"We Build It. We Also Run It."** — the dual proof nobody else has
- **"11 Languages. Never Misses a Call."** — AI Call Center specifics
- **"55+ Products Shipped"** — credibility *(verify this is defensible)*

Avoid: "custom development", "engineered to order", "full-stack martech". Correct
descriptions of the business, in words nobody searches.

### Negatives

Brand terms (`zoho`, `hubspot`, `salesforce`, `mailchimp`, `marketo`, `wati`,
`gupshup`, `aisensy`, `interakt`), definitional (`meaning`, `what is`,
`examples`, `tutorial`), jobs (`jobs`, `salary`, `course`, `internship`),
budget (`free`, `cheap`, `template`, `open source`). Note `martech meaning` alone
is 5,000/mo in India — larger than any commercial martech term.

---

## 7. Measurement

**GA4 key events → import to Google Ads:** `contact_form_start`, `demo_open`,
`demo_interact`, `calendly_click`, `whatsapp_click`, `stack_audit_click`.

Keep `generate_lead` as the **Primary** conversion for reporting truth; bid on
the micro-conversions. Validate monthly: of sessions that fired `demo_open`, how
many became leads? Weak correlation means the wrong proxy.

**Already fixed and working:** GA4 events reach GA4 (they were dataLayer-only
until 2026-07-28) · UTM capture writes first/last touch · `gclid` captured and
stored 90 days · one `page_view` per route.

**Still to configure:**
1. `AW_CONVERSION` in `src/lib/trackLead.js`, or link GA4 and import `generate_lead`
2. GA4 → Enhanced measurement → **turn off** "Page changes based on browser history events"
3. GA4 internal traffic filter for `localhost`

**Weekly, every Monday:** export the Search Terms report → add junk as negatives
→ terms that produced engagement go into `docs/ai-seo/query-page-map.md` and into
page titles, H1s and FAQ questions. This is the loop the whole campaign exists to
feed: ads buy the query data that SEO takes a year to learn.

---

## 8. Six-week roadmap

**Week 1 — instrument and de-risk**
- Add the six engagement events to the martech components
- Fix case-study attribution wording
- Configure the conversion action; fix the two GA4 settings

**Week 2 — retitle and launch**
- Retitle `ai-call-center` (`ai calling agent`) and `social-automation` (`instagram dm automation`)
- Extend `influencer-marketing` with the agency angle
- Launch ad groups 2 and 3 at ₹300/day

**Week 3–4 — build the gap pages**
- `/stack-audit` — the promised offer finally gets a page
- `/ai-automation` — the biggest keyword cluster gets a destination
- First Search Terms review; prune

**Week 5 — expand**
- Launch ad groups 1 and 4
- Reposition the `/martech` hub H1 and meta
- Engagement-rate-by-keyword review; pause the bottom third

**Week 6 — decide**
- Keyword-level engagement data is now meaningful
- Scale what engages, drop what doesn't, and feed the winning queries into SEO
- Revisit global expansion — but note bids run 3–5× India (`ai receptionist` low range: ₹378 global vs ₹33 India)

---

## Decision log — things the data settled

| Question | Answer | Evidence |
|---|---|---|
| Advertise "custom martech development"? | **No** | 0 of 2,546 ideas |
| Advertise ad-ops / creative analysis? | **No** | every term 10–100 or zero |
| Lead with martech stack? | **No** | 100–1K; 4th tier |
| Compete as a generic digital marketing agency? | **No** | 50,000/mo but commoditised, wrong customer |
| Biggest opportunity? | **AI automation agency** | 1K–10K India, 10K–100K global, ₹34.50 |
| Optimise for leads or engagement? | **Engagement** | 4–7 leads/month can't rank keywords |
