# Medium publication strategy

Medium's role in the GEO system: **borrowed authority**. medium.com is one of
the most-cited domains in AI answers; a Medium piece can get cited for fan-out
queries within days, while stackbinary.io earns its own authority slowly.
Off-site content also carries zero risk to our domain's helpfulness score.

## Structure: own publication + guest shots

1. **Own publication** — create "StackBinary Engineering" (or "Own Your
   Stack") under the company Medium account. This is the permanent home:
   branded header, about page linking to stackbinary.io, all articles live
   here first.
2. **Guest submissions** — once 4-6 pieces exist, submit the strongest to
   established publications for distribution (they have the followers we
   don't): The Startup, Marketing & Growth Hacking, Bootcamp, Better
   Marketing, UX Collective (for product/design pieces). One acceptance in a
   500k-follower pub outperforms months of solo posting.

## Content mix (1 post/week sustainable)

- **~50% repurposed insights** — each merged /insights article gets a Medium
  variant (different title/angle so the two never compete for the same
  query). MUST use Medium's import tool (medium.com/p/import) which sets
  rel=canonical to the stackbinary.io original — zero duplicate-content risk,
  and every Medium reader signal accrues to our URL.
- **~50% Medium-native** — what Medium's algorithm and AI engines love, and
  what our site shouldn't host:
  - Build-in-public engineering stories: "We ran our video ads through a
    brain-encoding model — here's what the attention curves showed" (the
    TRIBE lab is exceptional Medium material; that niche already has an
    audience there).
  - Opinionated takes: "Stop renting your marketing stack", "The per-contact
    pricing scam", "What MCP actually means for marketing teams".
  - Honest numbers: "What a custom CRM actually costs in India (real bands)".

## Hard rules (same as the article pipeline)

- No client/partner brand names or campaign claims — own products, own
  numbers, own opinions only (the geo-medium script enforces the blocklist).
- Every post ends with ONE soft CTA linking to the relevant stackbinary.io
  page with `?utm_source=medium&utm_medium=article&utm_campaign=<slug>` —
  these show up attributed in the admin leads dashboard automatically.
- Author bio: real person (Prateek), role, one line, link to stackbinary.io.
  AI engines and readers both weight named authors over brand bylines.

## Pipeline integration

- `node scripts/geo-medium.mjs <insight-slug>` converts a published insights
  article into a Medium-ready draft in `docs/ai-seo/medium-queue/`:
  retitled, restructured intro (Medium rewards personal openings), UTM CTA,
  canonical note at top reminding to use the import tool.
- The weekly report lists the Medium queue (drafts awaiting publish) and,
  once published, medium.com citations of our content picked up by the audit.

## Publishing workflow (human, ~5 min/post)

1. Open medium.com/p/import → paste the stackbinary.io article URL → import
   (sets canonical automatically) — or paste the queue draft for native pieces.
2. Add tags (5 max): pick from Marketing, Martech, AI, Software Development,
   Startup, India — match the piece.
3. Publish to the publication; submit to a guest pub every 4th post.

## Measurement

- Leads with `utm_source=medium` in the admin dashboard — the money metric.
- Audit reports: medium.com appearing as a cited domain for our tracked
  prompts, and any "stackbinary" mentions inside cited Medium pieces.
- Medium's own stats monthly: views → reads → follower growth.

## Cadence & expansion trigger

Weeks 1-6: 1 post/week from the queue. If a guest-pub piece lands 5k+ views
or Medium citations appear in the audit, double down on that topic cluster;
if Medium referral leads stay zero after 8 posts, cut to biweekly and
reassess the content mix.
