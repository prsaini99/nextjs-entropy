# LinkedIn content strategy

LinkedIn's role: **founder authority + pipeline**. Buyers who see Prateek's
posts weekly already half-trust StackBinary by the time they need an agency.
Posts go out under Prateek's personal profile (personal profiles get 5-10x the
reach of company pages), spanning ALL service lines equally — software, AI,
cloud, e-commerce, industries and martech alike, per positioning.

## Cadence & mix (3 posts/week: Tue / Thu / Sat)

- **~1/3 repurposed** — each insights article / Medium piece becomes a
  LinkedIn-native post (hook-first rewrite, NOT a link dump; the link goes in
  the first comment or at the end with UTM).
- **~1/3 build-in-public** — what we're building and learning: "we track what
  AI engines recommend when buyers ask for agencies — here's what we found
  this week" (the GEO harvest data is endless LinkedIn material), product
  build stories, engineering decisions.
- **~1/3 opinion/lessons** — pricing honesty (real ₹ bands), build-vs-buy
  takes, hiring and delivery lessons. Strong first line, personal voice.

## Format rules (encoded in the generator)

- First line = the hook; must survive the "...see more" fold (~200 chars).
- Short lines, white space, no corporate voice, minimal emoji.
- 3-5 hashtags at the end, mixed reach (#softwaredevelopment) + niche (#martech).
- One idea per post. 900-1300 characters is the sweet spot.
- Same hard rules as everywhere: own products and numbers only, NO
  client/partner brands (blocklist enforced), no invented facts.
- Links: UTM-tagged (utm_source=linkedin) so leads attribute in the dashboard.
- Optional image: an accurate QuickChart graph of numbers in the post.

## Pipeline (mirrors the article flow — human approves, machine does the rest)

1. **Generate**: Monday workflow drafts 3 posts (from new insights, the
   week's harvest findings, and an opinion topic) → opens a PR.
2. **Approve**: you review the PR — edit freely, delete any post, merge.
   Merged = approved. Nothing posts without this merge.
3. **Post**: Tue/Thu/Sat workflow publishes the next approved post via the
   LinkedIn API (with image upload when the draft has one), marks it posted.
4. **Report**: the Sunday email lists posted/queued/approved counts.

Manual alternative at every step: drafts are plain text files — copy-paste
into LinkedIn by hand if the API token has lapsed.

## One-time setup (Prateek, ~15 min)

1. linkedin.com/developers → Create app (name: StackBinary Content, company
   page required — create the StackBinary page first if none).
2. In the app → Products → add **"Share on LinkedIn"** and **"Sign In with
   LinkedIn using OpenID Connect"** (both self-serve).
3. Auth tab → add redirect URL: `http://localhost:8919/callback`.
4. Run `node scripts/linkedin-auth.mjs` with the app's Client ID/Secret —
   it opens the approval page, catches the redirect, prints the access token.
5. Add secrets: `gh secret set LINKEDIN_ACCESS_TOKEN` (and the helper prints
   the expiry date — re-run this step every ~60 days when it lapses).

## Measurement

- Leads with utm_source=linkedin in the admin dashboard (money metric).
- LinkedIn analytics: impressions/engagement per post — feed back monthly
  into the mix (double down on what works).
- Follower growth on Prateek's profile.
