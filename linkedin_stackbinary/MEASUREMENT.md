# LinkedIn measurement — the rules

How LinkedIn plugs into the site's GA4 + Clarity + leads pipeline
(see ../marketing/DESIGN.md for the loop this feeds).

## 1. Every link carries UTMs — no exceptions

Links go in the FIRST COMMENT (per the posting checklist), and every one is
built as:

    https://stackbinary.io/<page>?utm_source=linkedin&utm_medium=social&utm_campaign=<pillar>&utm_content=<post-id>

- `utm_campaign` = the content pillar, kebab-case: `waste-audit`,
  `ai-orchestration`, `proof`, `product-spotlight`, `playbooks`
- `utm_content` = one id per post, dated: `2026-07-27-carousel`,
  `2026-08-04-reframe`, …

A bare link tells GA4 only "linkedin.com sent someone, once". A tagged link
tells the loop which post, which pillar, and — if they convert — which lead.
The site already stores every utm_* on the lead row, so a tagged click that
becomes an enquiry is attributable back to the exact post with zero extra work.

Build links here: https://stackbinary.io/utm-builder (internal tool, unlisted).

## 2. Two engagement rates exist. Never mix them.

- LinkedIn's engagement rate = interactions ÷ impressions, on LinkedIn.
  For document/carousel posts, "clicks" includes slide-expands — it is NOT
  site traffic.
- GA4's engagement rate = engaged sessions ÷ sessions, on the site.

Report them side by side, never in one fraction. LinkedIn numbers answer
"did the content stop the scroll"; GA4 numbers answer "did anyone come home
and do something". A post can win one and lose the other — that split is the
useful signal, not a contradiction.

## 3. Weekly, alongside the Monday routine

Screenshot or export each post's LinkedIn stats (impressions, engagement rate,
clicks) into this folder as `stats/YYYY-Www.md` (a plain list is fine). The
Monday review reads it next to GA4's utm_source=linkedin sessions.

## 4. Proof posts: no partner names (decision 2026-07-31)

Client brand names stay off LinkedIn for now. Proof uses aggregates and
descriptors instead:

- counts: "55+ products shipped", "8+ industries, 3 continents"
- descriptors: "a celebrity beauty brand", "a global dermo-cosmetics label",
  "a B2B trade platform"
- own products by name (Zyflus, AtoEmail, TRIBE, AI Call Center) — always fine

If a named-brand post is ever wanted later, it uses the same partnership
framing as the site's case studies ("in partnership with the client team"),
never sole-delivery wording.

## 5. Stats keep their citations

"49% utilization (Gartner 2025)", "20-31% TCO (NAV43/Corcava)" — the source
travels with the number every time it's reused. Uncited stats have a way of
migrating into ad copy, where substantiation is policy, not politeness.
