# Google Ads — MarTech Search Campaign

**Rewritten 2026-07-28** against Keyword Planner data for 145 candidate keywords
(India + global). The previous version of this plan targeted 8 keywords —
`custom marketing automation development`, `martech development company` and
similar — **all of which returned no data**. Across 2,546 keyword ideas, zero
contained `develop`, `company`, `consultant`, `hire` or `vendor`. That vocabulary
has no search demand and no campaign can be built on it.

Volumes below are Keyword Planner buckets (no spend history yet). Treat them as
relative sizes, not forecasts.

---

## The headline finding

The strongest demand is **not** martech stack. Ranked by India volume:

| Cluster | Best term | India | Global | Page |
|---|---|---|---|---|
| **Voice AI / call centre** | ai calling agent | **1K–10K** | 1K–10K | `/martech/ai-call-center` |
| **Influencer / creator** | influencer marketing agency | **1K–10K** | 10K–100K | `/martech/influencer-marketing` |
| B2B lead gen | email finder tool | 1K–10K | 1K–10K | `/martech/lead-intelligence` |
| Automation services | business automation agency | 100–1K | 1K–10K | `/martech` |
| Shopify / commerce | shopify store development | 100–1K | 1K–10K | `/martech/shopify-websites` |
| MCP / AI enablement | mcp integration | 100–1K | 1K–10K | `/martech/ai-integration` |
| Proposals | ai proposal generator | 100–1K | 1K–10K | `/martech/proposal-maker` |
| Social / scraping | instagram dm automation | 100–1K | 1K–10K | `/martech/social-automation` |
| **Martech stack** | martech stack | 100–1K | 1K–10K | `/martech` hub |
| **Ad ops / creative** | *(nothing above 10–100)* | — | — | **drop from paid** |

`ai receptionist` is **10K–100K globally** — the single largest term in the whole
set, and its India volume (100–1K) is growing (+900% YoY).

---

## Campaign settings

| Setting | Value |
|---|---|
| Type | Search only — uncheck Display Network **and** Search partners |
| Locations | India, "Presence: people in this location" |
| Language | English |
| Bidding | **Manual CPC** or Maximize Clicks with cap. **Not** Maximize Conversions — it needs ~30 conversions/month to work and you will have ~5–10 |
| Budget | ₹300/day (~₹9,000/month) |
| Ad schedule | Mon–Sat, 09:00–20:00 IST |
| Devices | Expect desktop to dominate — forecast showed **5.2% CTR desktop vs 2.8% mobile**. Review after 2 weeks and consider a desktop bid adjustment |
| Final URL suffix | `utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}&utm_content={creative}` |

Note on `{keyword}`: this returns the *matched keyword from your list*, not the
user's actual query. Real queries only exist in the Search Terms report.

---

## Ad group 1 — AI Call Center *(launch first)*

Landing page: `/martech/ai-call-center` · Suggested max CPC: **₹110**

Phrase match:
```
"ai calling agent"
"ai call center"
"ai receptionist"
"ai voice agent india"
"ai cold calling software"
"outbound calling ai"
"conversational voice ai"
"ai sales agent software"
"voice ai for business"
```

Bid context: top-of-page low ranges run ₹33–102. `ai calling agent` is the only
High-competition term in the set — expect it to cost most.

**Ad copy angles** (from existing page copy): "Speaks 11 Languages, Never Misses a
Call" · "Real-Time Voice AI for Sales" · "Inbound + Outbound, One Profile" ·
"Human Handoff With Full Context" · "Every Call Logged to Your CRM".

---

## Ad group 2 — Influencer Marketing *(launch first)*

Landing page: `/martech/influencer-marketing` · Suggested max CPC: **₹90**

Phrase match:
```
"influencer marketing agency"
"influencer marketing tools"
"influencer marketing software"
"influencer marketing platform"
"influencer marketing platform india"
"influencer management platform"
"influencer discovery tool"
"influencer outreach tool"
"influencer campaign management"
"influencer crm"
"ugc creator platform"
"creator marketing platform"
```

⚠️ **`influencer marketing platform` was never measured** — it was corrupted to
`nfluencer marketing platform` in the Keyword Planner paste and returned no data.
The 2026-07-28 ideas export shows it at **5,000/mo in India at ₹25–150**, making
it the single best term in this cluster. Re-check it, but include it regardless.

Note `influencer marketing agency` (1K–10K) is people looking for an agency to
*run* campaigns — which you have genuinely done (StarStruck, Bioderma, Shiseido).
Cheapest cluster overall: `ugc creator platform` bottoms out at **₹6.25**.

**Ad copy angles:** "Influencer Marketing, Run Like an Operation" · "AI Vetting,
0–100 Match Scores" · "Automated DM Outreach" · "Multi-Brand Isolation for
Agencies" · "292% Follower Growth on a Beauty Brand" *(substantiate first — see below)*.

---

## Ad group 3 — Automation Services *(add in month 2)*

Landing page: `/martech` · Suggested max CPC: **₹80**

```
"business automation agency"
"business automation services"
"marketing automation agency"
"marketing automation services"
"marketing automation consultant"
"sales automation services"
"email marketing automation agency"
"workflow automation agency"
"martech companies"
"martech agency"
```

This is the cluster whose vocabulary matches what you sell — buyers say **agency**
and **services** where the site says *development company*.

---

## Ad group 4 — MarTech Stack *(add only after 1–3 have data)*

Landing page: `/martech` · Suggested max CPC: **₹70**

```
"martech stack"
"martech stack audit"
"marketing technology audit"
"alternative to hubspot"
"self hosted marketing automation"
"white label marketing automation"
"custom marketing automation"
```

Only `martech stack` itself clears 100–1K; the rest are 10–100. Genuine
build-vs-buy intent and perfect message match with `WhyCustom.jsx`, but too thin
to lead with. `alternative to hubspot` is High competition — watch its cost.

---

## Do not advertise these

**`/martech/ad-intelligence` and `/martech/creative-analysis`.** Every term returned
10–100 or no data at all: `ad ops platform`, `ad ops automation`, `meta ads
management tool`, `meta ads api tool`, `multiple meta ad accounts dashboard`,
`agency ad management software`, `ad creative testing tool`, `ad pre testing
platform`, `ai video ad analysis`, `neural ad testing`, `brain response
advertising`, `attention prediction advertising`, `emotion analysis advertising`,
`creative analytics platform`, `video ad scoring` — all zero.

These are categories you are **creating**, not entering. They belong in SEO,
content and outbound — not paid search. Their strongest terms (`ai advertising
platform`, `ai ad creative generator`) sit at 10–100 and are generic AI-tool
queries, not buyers looking for what you built.

---

## Negative keywords

**Brand terms** — `zoho marketing automation` alone is 5,000/mo in India:
```
zoho, hubspot, salesforce, mailchimp, marketo, braze, klaviyo, activecampaign,
brevo, sendinblue, clevertap, moengage, webengage, freshworks, zapier, wordpress,
canva, semrush, ahrefs, calendly, twilio
```
*(Exception: keep `alternative to hubspot` if you run ad group 4 — add `hubspot`
as a negative only at the other ad groups' level.)*

**Definitional** — `martech meaning` is 5,000/mo, bigger than any commercial term:
```
meaning, definition, what is, examples, example, vs, versus, wikipedia, pdf, ppt,
quiz, mcq, full form, stands for, explained, guide, tutorial, how to
```

**Jobs / study**
```
jobs, job, career, careers, salary, salaries, hiring, resume, cv, intern,
internship, course, courses, training, certification, certificate, learn, syllabus
```

**Budget mismatch**
```
free, cheap, cheapest, low cost, discount, coupon, crack, nulled, open source,
template, templates, download, plugin, clone script
```

---

## Measurement — read this before launching

At ~₹9,000/month and ~₹25 average CPC you will buy **roughly 350 clicks/month**.
At a 1–2% B2B form conversion rate that is **4–7 leads/month**. You cannot rank
keywords by lead conversion at that volume — it needs 15–30 conversions before
patterns mean anything.

**So optimise and judge on engagement, not leads.** Mark these as GA4 key events
and import them into Ads (they already fire correctly since the 2026-07-28 fix):

| Event | Meaning |
|---|---|
| `contact_form_start` | strongest proxy for intent |
| `calendly_click` | booking intent |
| `whatsapp_click` / `telegram_click` / `email_click` | chose another channel |
| `chat_open` | moderate interest |

Keep `generate_lead` as the Primary conversion for reporting truth, and validate
monthly: of the sessions that fired `contact_form_start`, how many became leads?
If that correlation is weak, the proxy is wrong.

**Prerequisites, in order:**
1. **`gclid` capture** — irreversible. Click IDs not captured at launch are lost forever, and without them offline conversion import is impossible.
2. **Conversion action** — fill `AW_CONVERSION` in `src/lib/trackLead.js`, or link GA4 and import `generate_lead`.
3. **GA4 Enhanced measurement** → switch off "Page changes based on browser history events" so it stops double-counting SPA navigations.
4. **GA4 internal traffic filter** for `localhost`.

---

## Kill / keep criteria

Revised — the old "100 clicks, 0 leads" threshold was both too slow and
statistically meaningless (0 leads from 100 clicks is unremarkable at a 2% rate).

- **Week 2 (~150 clicks):** any keyword with >20 clicks and **0 engagement events** → pause it.
- **Week 4:** compare engagement rate by `utm_term` in GA4. Bottom third → pause.
- **Week 6:** if the whole campaign has zero `contact_form_start` events, the landing pages are wrong, not the keywords. Check Clarity recordings of ad visitors before changing anything else.
- **Keep** any keyword producing a lead under ~₹3,000.
- **Escalate** to global only after India CPCs are known. Global bids run 3–5× higher (`ai receptionist` low-range is ₹378 vs ₹33 in India).

---

## Weekly routine

Every Monday:
1. Ads → campaign → **Insights & reports → Search terms** → export CSV to `docs/ads/`.
2. Add junk terms as negatives.
3. Terms that produced engagement → add to `docs/ai-seo/query-page-map.md`, and use them in page titles, H1s and FAQ questions.
4. Queue an `/insights` article for recurring themes that have no page.

---

## Content changes required before spending

1. **`/martech` hub targets a dead phrase** — hero and meta target "custom martech development company" (`query-page-map.md` line 8), which has zero demand. Retarget the hub at the *automation services* vocabulary, or send paid traffic only to product sub-pages.

2. **Case studies claim sole delivery — highest risk.** All 37 entries in `caseStudies.js` use "We developed / We built / We created" against named brands (Steve Madden, ClassPass, The Ordinary, Shiseido, Bioderma, Sugar Cosmetics) with hard figures ("$100M+ in global online sales"). `MartechBrands.jsx` correctly says "Brands we've worked with"; the case studies do not. Fix before pointing paid traffic at them — this is both an Ads policy exposure and a trademark risk.

3. **Unsubstantiated stats in ad-facing copy** — "1,200+ martech tools vanished", "91 tools", "One in four new martech capabilities", "+43% hook lift", "292% follower growth", "3.8x ROAS". Google requires ad claims to be substantiable. Source them visibly on-page or keep them out of the ads.

4. **No landing page for the "Free Stack Audit"** — `WhyCustom.jsx` has "Audit My Stack — Free" and `MartechProcess.jsx` has "Start My 90-Day Plan", but neither has its own page or form. A named offer with a dedicated page converts materially better than a generic contact form.

5. **`/martech/shopify-websites` has demand but no evidence** — `shopify store development` and `shopify plus agency` both hit 100–1K in India and 1K–10K globally, but **Shopify is named nowhere** in the 37 case studies. Real opportunity, currently unsupported by proof.

6. **Category taxonomy is inconsistent** — the same brands are `category: "Beauty"` in `caseStudies.js` but render as "Celebrity Beauty" / "Dermo-Cosmetics" / "Beauty D2C" in `MartechCaseStudies.jsx`. Pick one; it should mirror your ad groups.
