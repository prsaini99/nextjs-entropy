---
name: stackbinary-chatgpt-ads
description: Operating doctrine and platform mechanics for ChatGPT Ads (OpenAI Ads Manager) for Stackbinary. Load whenever a task touches ChatGPT advertising, the OpenAI ads API, OAIQ pixel, or paid strategy on ChatGPT. India self-serve launched 2026-09; facts researched 2026-09-01 and must be re-verified as the platform changes fast.
---

# Stackbinary ChatGPT Ads doctrine

STATUS: strategy phase. NO campaigns exist and none may be created
until the owner approves a written plan (same ceremony as Google Ads:
plan -> explicit approval -> then act). Credentials: CHATGPT_ADS_API_KEY
in .env.local (sk-svcacct scoped service key, verified authenticating
2026-09-01; the original ads-manager-api-key.txt in the repo root is
gitignored). No public ads API endpoints exist yet; they surface with
the Ads Manager account docs when India self-serve opens 2026-09-04.

## Platform mechanics (researched 2026-09-01, re-verify before acting)

- Self-serve Ads Manager at ads.openai.com. India self-serve opens
  2026-09-04, minimum daily budget Rs725. Ads show ONLY to logged-in
  adult Free and Go tier users; Plus/Pro/Business/Enterprise never see
  ads. Fewer than ~20% of eligible users see ads on a given day.
- Format: one "chat_card" below the response: title 3-50 chars, body
  up to 100 chars, image, favicon, URL. Clearly labeled sponsored.
- Targeting is CONTEXT, not keywords: ad-group "context hints" are
  prose descriptions of user needs/questions, not match types. Geo at
  country level (state/DMA/ZIP US-only). Platform (iOS/Android/web).
  Custom audiences from email/phone lists need 25,000+ matched users
  (irrelevant to us). No demographics, no retargeting, no lookalikes.
- CRITICAL DIFFERENCE vs Google: advertisers get NO query/conversation
  data back. There is no search-terms report. The Google-doctrine
  purpose (buy vocabulary for SEO) does NOT transfer; ChatGPT ads can
  only be judged on CTR-by-context, click economics and vetted leads.
- Bidding: CPM (reach), CPC (recommended start US$3-5), oCPC
  (conversion-optimized, one standard event, charged per click).
  Rule carried over from Google doctrine: NO conversion-optimized
  bidding (oCPC) while our recorded conversion signal is junk form
  fills. CPC objective only.
- Tracking: OAIQ JS pixel (first-party __oppref cookie, 30-day) plus a
  server Conversions API (dedup via event ID). Attribution lags 24-48h,
  click-through only. Insights API gives account/campaign/ad-group/ad
  metrics via REST; no official SDK.
- Field results published by early testers: CTR 0.65-1.30%, CPCs
  roughly US$3-5 equivalent. B2B niche demand gen reported weak (pro
  buyers sit on ad-free paid tiers); consumer research/comparison
  intent reported strong; LLM referral traffic converting ~1.5x other
  channels for retail.

## Draft strategy frame (owner discussion 2026-09-01, not yet decided)

- The audience skew (Free/Go India) is consumers, students and the
  careers crowd, the exact population our Lead Truth doctrine filters
  OUT. Default posture: skeptical, small, capped.
- The bull case is day-1 auction emptiness: like Germany's empty
  Google auctions, early India inventory may be cheap and uncontested.
  Only a small probe can verify actual CPCs vs the published US$3-5.
- If a probe runs, judge it on: (1) CTR by context hint as message
  evidence, (2) actual CPC economics vs our Rs20 Google India CPCs,
  (3) vetted business leads per Lead Truth (gclid-equivalent: UTM-tag
  every landing URL, no exceptions). No query harvest exists, so a
  theme with junk clicks cannot be diagnosed from terms; kill faster
  than on Google.
- Candidate contexts (SMB owner asking ChatGPT for help): missed
  business calls / AI receptionist, WhatsApp customer communication
  for a business, automating operations. Insights articles are
  candidate landing pages: they match the research mindset the format
  serves and carry our CTA.
- All Google-doctrine safety rules apply unchanged: written plan and
  owner approval before ANY spend, hard daily caps, UTM discipline,
  lead vetting in Supabase, never bid on oyehello brand terms, no em
  dashes / "Stackbinary" in ad copy, compliance wording rules.
