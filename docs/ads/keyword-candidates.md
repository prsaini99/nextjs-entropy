# MarTech keyword candidates — for Keyword Planner validation

Generated from a full read of the martech surface: `MartechServices.jsx` (10 services),
`FlagshipProducts.jsx` (4 products), the 9 sub-pages in `martechPages.js`, `WhyCustom.jsx`,
`MartechProcess.jsx`, `caseStudies.js` (37 studies) and `docs/ai-seo/buyer-prompts.json`.

## How to use this

Paste each block into **Google Ads → Keyword Planner → "Get search volume and forecasts"**
(not "Discover new keywords" — that expands, this measures exactly what you give it).

Run every block **twice**: once with Location = India, once unrestricted. Export both.
Filename convention: `kp-<block>-<in|global>.csv` in this folder.

Blocks are ordered by expected value. If you only have time for three, do **B1, B2, B5**.

---

## Already validated — do not re-check

From the 2026-07-28 exports (India, bucketed volumes, no spend history yet):

| Keyword | India /mo | Bid range | Verdict |
|---|---|---|---|
| influencer marketing platform | 5,000 | ₹25–150 | **strongest term found** |
| influencer platforms | 5,000 | ₹25–150 | strong |
| martech | 5,000 | ₹37–192 | polluted — see negatives |
| ai advertising / ai ad | 5,000 | ₹27–98 | strong, cheap |
| marketing automation | 5,000 | ₹37–260 | broad, mixed intent |
| marketing automation agency | 500 | ₹47–145 | **high intent** |
| marketing automation services | 500 | ₹66–451 | **high intent** |
| business automation agency | 500 | ₹47–120 | **high intent** |
| sales automation services | 500 | — | high intent |
| email marketing automation agency | 500 | — | high intent |
| martech companies | 500 | ₹37–153 | high intent |
| martech stack | 500 | ₹47–462 | evaluation intent |
| martech platform | 500 | ₹75–236 | evaluation intent |
| martech tools | 500 | ₹54–232 | evaluation intent |
| marketing automation platform | 500 | ₹90–186 | evaluation intent |
| sales intelligence | 500 | ₹68–281 | check intent |
| lead gen | 50,000 | ₹44–196 | too ambiguous |

**Proven absent** (0 ideas across 2,546): anything containing `develop`, `development`,
`developer`, `consultant`, `hire`, `vendor`. Do not build a campaign on this vocabulary.

---

## B1 — Influencer marketing → `/martech/influencer-marketing` (Zyflus)

Highest known volume and cheapest clicks of any cluster. You ship the product.

```
influencer marketing platform
influencer marketing software
influencer marketing tools
influencer marketing agency
influencer management platform
creator marketing platform
creator management platform
influencer discovery tool
influencer outreach tool
influencer outreach automation
influencer campaign management
influencer crm
influencer database india
find influencers for brand
influencer marketing platform for agencies
influencer marketing platform india
instagram influencer marketing tool
creator discovery software
influencer analytics platform
ugc creator platform
```

## B2 — Automation services / done-for-you → `/martech` or a new services page

The cluster nearest to what you actually sell. "Agency" and "services" are the nouns
buyers use where you say "development company".

```
marketing automation agency
marketing automation services
marketing automation consultant
marketing automation company
marketing automation implementation
marketing automation setup services
business automation agency
business automation services
sales automation services
sales automation agency
email marketing automation agency
email automation services
crm automation services
workflow automation agency
marketing operations agency
marketing ops consultant
martech agency
martech consultancy
martech implementation
martech companies
marketing technology companies
marketing technology consultant
```

## B3 — Build vs buy / stack → `/martech` hub (WhyCustom + Process sections)

Your existing hub copy already argues exactly this. Lower volume, but perfect message match.

```
martech stack
martech stack audit
build martech stack
martech stack consulting
marketing stack audit
marketing technology audit
build vs buy marketing automation
custom marketing automation
own marketing automation platform
white label marketing automation
self hosted marketing automation
marketing automation without per contact pricing
alternative to hubspot
hubspot alternative for agencies
mailchimp alternative self hosted
reduce saas spend marketing
marketing saas consolidation
tool sprawl marketing
```

## B4 — Meta ad ops → `/martech/ad-intelligence`

```
meta ads management tool
facebook ads management software
multiple meta ad accounts dashboard
manage multiple facebook ad accounts
ad account management platform
ai ad copy generator
ai ad creative generator
ad creative automation
meta ads api tool
ad ops platform
ad ops automation
agency ad management software
facebook ads automation tool
ai advertising platform
```

## B5 — AI call center → `/martech/ai-call-center`

Voice AI has strong global momentum; check whether India volume has caught up.

```
ai call center
ai calling agent
ai voice agent for sales
ai voice agent india
voice ai for business
ai receptionist
ai cold calling software
outbound calling ai
multilingual ai voice agent
ai sales agent software
automated calling system for sales
ai call center software india
conversational voice ai
```

## B6 — B2B lead gen / sales intelligence → `/martech/lead-intelligence`

```
b2b lead generation services
b2b lead generation company
lead generation agency india
sales intelligence platform
b2b contact database india
b2b data enrichment
email finder tool
linkedin scraping tool
lead scraping service
prospect data enrichment
verified b2b contacts
custom crm development
crm with whatsapp integration
ai lead scoring software
b2b lead crm
```

## B7 — Creative / video ad analysis → `/martech/creative-analysis` (TRIBE v2)

Likely near-zero — this is a category you are creating, not entering. Check anyway so
the decision is evidence-based.

```
ai video ad analysis
ad creative testing tool
creative pre testing
ad pre testing platform
neural ad testing
brain response advertising
attention prediction advertising
video ad scoring
creative analytics platform
ad creative analysis ai
emotion analysis advertising
```

## B8 — Social automation → `/martech/social-automation`

```
instagram dm automation
instagram auto reply tool
facebook comment automation
social media reply bot
instagram chatbot for business
whatsapp automation for business
quora marketing service
web scraping services india
custom web scraper development
competitor price scraping
data scraping company
```

## B9 — Proposal software → `/martech/proposal-maker`

```
ai proposal generator
proposal automation software
proposal management software
branded proposal software
quote generation software
sales proposal tool
proposal tracking analytics
```

## B10 — MCP / AI enablement → `/martech/ai-integration`

Very new category. Expect low or no data — useful as an SEO/content signal, not ads.

```
mcp integration
mcp server development
model context protocol consulting
connect crm to chatgpt
ai integration consulting
ai agent for marketing team
marketing ai consultant
custom ai agent development
```

## B11 — Shopify / commerce → `/martech/shopify-websites`

Note: no case-study copy currently supports Shopify claims — see content gaps below.

```
shopify development agency india
shopify store development
shopify plus agency
custom shopify app development
ecommerce development agency india
headless commerce development
```

---

## Negative keyword list (validated from the exports)

**Brand terms** — these searchers want that product, not a partner. `zoho marketing
automation` alone is 5,000/mo in India and would drain the budget.

```
zoho, hubspot, salesforce, mailchimp, marketo, braze, klaviyo, activecampaign,
brevo, sendinblue, clevertap, moengage, webengage, freshworks, zapier, wordpress,
shopify app store, canva, semrush, ahrefs
```

**Definitional / informational** — `martech meaning` is 5,000/mo, larger than any
commercial term in the whole set.

```
meaning, definition, what is, examples, example, vs, versus, wikipedia, pdf, ppt,
quiz, mcq, full form, stands for, explained, guide, tutorial, how to
```

**Job / study seekers**

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

## Content changes flagged during this research

### 1. The hub page targets a phrase with zero demand — HIGH
`/martech` hero and meta target "custom martech development company"
(`query-page-map.md` line 8). Across 2,546 keyword ideas, **zero** contained
`develop`, `company`, `consultant`, `hire` or `vendor`. The hub cannot be an ads
landing page against that vocabulary. The product sub-pages are where demand exists.

### 2. Case studies claim sole delivery on named brands — HIGH RISK
All 37 entries in `caseStudies.js` use first-person sole-delivery verbs — "We
developed", "We built", "We created" — against **named** brands (Steve Madden,
ClassPass, The Ordinary, Shiseido, Bioderma, Sugar Cosmetics, Koovs, iPatientCare)
with hard figures attached ("$100M+ in global online sales", "$20M+ in annual
revenue", "$50M+ in assets").

`MartechBrands.jsx` gets this right — "Brands we've worked with" — but the case
studies do not. Fix before pointing paid traffic at them: unsubstantiated or
misattributed claims are both a Google Ads policy exposure and a trademark risk.

### 3. Category labels are inconsistent between components — MEDIUM
The same brands carry `category: "Beauty"` in `caseStudies.js` but render as
"Celebrity Beauty" / "Dermo-Cosmetics" / "Beauty D2C" in `MartechCaseStudies.jsx`.
Pick one taxonomy — it's also the taxonomy your ad groups should mirror.

### 4. Shopify has a page but no supporting evidence — MEDIUM
`/martech/shopify-websites` exists and `CaseStudiesShowcase.jsx` links to it as
"Shopify & e-commerce development", but **Shopify is named nowhere** in the 37 case
studies. Six e-commerce studies exist without naming the platform. Either surface
the platform in that copy or don't bid on Shopify terms.

### 5. The "Free Stack Audit" offer has CTAs but no landing page — MEDIUM
`WhyCustom.jsx` has "Audit My Stack — Free" and `MartechProcess.jsx` has "Start My
90-Day Plan", and the ad copy promises a free audit. But there is no dedicated page
or distinct form for it. A named offer with its own page converts materially better
than a generic contact form, and it gives the ads a message-matched destination.

### 6. Unsubstantiated stats used in ad-facing copy — MEDIUM
"1,200+ martech tools vanished from the landscape last year", "91 tools", "One in
four new martech capabilities", "+43% hook lift", "292% follower growth", "3.8x
ROAS". Google Ads requires claims in ads to be substantiated. Either source them
visibly on-page or keep them out of ad copy.
