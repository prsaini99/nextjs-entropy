---
name: stackbinary-google-ads
description: The owner's operating doctrine for ALL Stackbinary Google Ads and paid marketing work. Load whenever a task touches campaigns, ad groups, keywords, budgets, negatives, ad copy, or paid strategy for customer 6594379515. Every campaign recommendation and reply must follow this document; do not improvise a different strategy.
---

# Stackbinary Google Ads doctrine

This is the binding frame for paid marketing. Answers and plans that
contradict it are wrong even if they would be reasonable elsewhere.

## 0. The purpose (owner decision 2026-08-26)

**The ads budget exists to make SEO rank higher.** It buys search-term
vocabulary, CTR message evidence and commercial validation. Paid CPA is
not the success metric; the promotion ladder is:

- **Tier 1, build a money page:** term produced a qualified lead AND
  appears ~20+ times/month. Retarget or create a page, keep bidding
  while SEO climbs.
- **Tier 2, write an insights article:** healthy CTR / engagement, no
  lead yet or thin volume.
- **Tier 3, paid-only forever:** converts but the SERP is product-held
  (page one is platforms, not peers). Never build SEO for it.
- **Tier 4, negative it:** zero qualified leads after ~Rs1,500 on the
  term, or wrong intent. As valuable as Tier 1.
- SERP check before promoting: Serper gl=in / gl=us / gl=de. Peer-held
  = winnable; product-held = Tier 3.
- When organic reaches top 5 for a Tier 1 term, halve its bid; top 3,
  pause it and move the budget to the next discovery theme.

## 1. Approval ceremony (never skip)

1. Present every change as a written plan and WAIT for explicit
   approval, even when the request reads as a go-ahead.
2. AdLoop flow: draft_* -> plan_id preview -> dry_run=true ->
   dry_run=false. Two-phase apply is enforced; plans die when the MCP
   restarts, so re-draft rather than hunting stale plan_ids.
3. Verify landing pages return 200 before any ad or keyword references
   them. One change-set at a time.
4. Budget ramps are approval-gated steps, never automatic.

## 2. Account facts

- Customer 6594379515, currency INR, MCC 9888930545.
- **Split stress test (owner decision 2026-08-26, decided at the Monday
  scoreboard):** martech India at Rs500/day judged on vocabulary per
  the ladder, versus **germany-de** 24186276928 at Rs500/day judged on
  /de/kontakt form fills (lead_source de-kontakt). Germany ad groups:
  ki-entwicklung 202061220400, ki-beratung 200028384896,
  individualsoftware 199277296483; PHRASE, Rs150 max CPC, German
  language 1001, geo 2276, 50 German pre-emptive negatives (kostenlos,
  gehalt, studium, aktien, chatgpt...). ENABLED 2026-08-26 on the
  owner's go after the test mails passed; the sales colleague's copy
  review continues on the LIVE pages, corrections applied as they come.
  Budgets: germany-de Rs1,000/day, martech Rs300/day. The German lead
  pipeline is complete: de-kontakt / chatbot-de tagging in Supabase,
  form_location de_kontakt in GA4, German confirmation mail, GERMAN
  LEAD prefix on internal notifications, chatbot in German on /de.
- **martech** 24081846465 is the India discovery campaign. ai-automation 24106736390 is PAUSED for cause: Rs3,008,
  zero conversions; do not revive without new evidence. The
  influencer-marketing ad group failed its test too; same rule.
- Ad groups: ai-callcenter (only historical converter), lead-
  intelligence, marketing-automation, whatsapp-social-automation,
  ad-intelligence, martech-services.
- Bidding: TARGET_SPEND (Maximize Clicks), **locked by design**: it
  buys the most vocabulary per rupee. Do not propose conversion
  bidding. PHRASE match, Rs40 max CPC on discovery keywords.
- Budget Rs1,000/day; ramp Rs1,500 (week 2) then Rs2,300 only on
  results and approval. AdLoop safety cap is 2500 in
  ~/.adloop/config.yaml.
- Kill rule: a theme dies at ~Rs8,000 spent with zero USABLE KEYWORDS
  harvested (junk vocabulary kills a theme; missing leads alone does
  not).

## 2b. Google automation products (decision 2026-08-27)

- **PMax and AI Max: NO until offline conversion import exists.** Both
  optimize toward the recorded conversion signal, and ours is junk
  form fills; they would amplify it across Display/YouTube, hide search
  terms (killing the vocabulary harvest), and AI Max's URL expansion /
  asset rewriting break the German funnel and reviewed copy. Revisit
  only after gclid-based offline import of vetted qualified leads runs
  at ~30 true conversions/month.
- Google's free "expert" strategists pitch a fixed template (PMax,
  broad match, AI Max, raise budget, no changes 7-14 days) without
  reading the account. Evaluate against Lead Truth, never adopt on the
  call. "Learning phase" is real for structural changes but NEVER
  delays negatives or stop-loss: obeying it would have cost ~Rs11k to
  the Inflact leak alone.
- Check quarterly (and before September 2026) that Automatically
  Created Assets and campaign-level broad match stay OFF: Google
  auto-upgrades campaigns using them to AI Max.

## 3. Negatives doctrine

- Campaign-level, PHRASE, and pre-emptive: block competitor product
  brands, consumer/DIY intent, careers terms BEFORE spend, then sweep
  search terms on day 3 and every Monday, mid-week when budgets rise.
- Standing clusters already blocked (~212 negatives): competitor
  brands (voice, CRM, email, WhatsApp SaaS, ads tools, SMM panels),
  consumer WhatsApp (whatsapp web, gb whatsapp...), DIY/freebie (how
  to, template, excel, sheet, sheets, open source, login...), careers,
  Hindi informational (kya hai), digital marketing agency intent.
- Lessons paid for, do not relearn: singular AND plural forms (sheet
  cost Rs45 because only "sheets" was blocked); generic "<category>
  tool" keywords get semantically expanded into consumer junk (the
  "social media automation tool" keyword let "inflact com" eat 90% of
  two days' budget); word-order variants need their own negative
  ("automation ai" vs "ai automation").

## 4. Lead truth

- Qualified lead = business email domain OR company website OR budget
  plus a real project summary, AND not present in career_applications.
  Everything else is junk regardless of what GA4 conversions say.
- Vet every ads-attributed lead in Supabase (leads table, gclid/
  utm_source=google) before reporting it. Historical base rate: every
  ads conversion to date was an unqualified gmail form-fill.
- GA4: filter "(not set)" phantom sessions; career events are never
  business conversions.

## 5. Geography doctrine (research-backed, re-verify quarterly)

- **India = the paid lab.** CPC ~Rs20-35; the discovery campaign runs
  here.
- **USA = SEO only.** CPC ~25x India (Rs533 avg voice); paid US is a
  donation until authority exists.
- **Germany = post-review opportunity.** Auctions verified EMPTY on
  every checked SERP; entry wedge ki entwicklung / ki beratung at
  Rs175-600 CPC, but only after the German sales colleague's review
  and with German pages live (german-b2b-copy skill governs the copy).

## 6. Ad copy rules

- No em or en dashes. "Stackbinary", never "StackBinary". Compliance
  claims only as "SOC 2-aligned" / "HIPAA-ready", never certified.
- Every ad points at a verified page whose H1 matches the theme.
- Lead with proof and live demos (Adsboys, AtoEmail, working products),
  price framing only as market-rate vs our roughly-half.

## 7. Reporting rhythm

- **Monday scoreboard**, SEO output first: search terms harvested per
  theme -> tier classification -> concrete SEO action (page / article /
  negative / paid-only); then spend, CTR, vetted qualified leads.
  Every report ends in SEO actions, or it is not finished.
- Thursday: search-terms leak glance. New competitor brands go
  straight into a proposed negatives batch.
- Ramp/kill decisions are made in these reports, presented as plans.
