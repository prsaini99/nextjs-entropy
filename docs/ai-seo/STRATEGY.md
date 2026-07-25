# StackBinary AI SEO (GEO) Strategy

Goal: when a buyer asks ChatGPT / Claude / Perplexity / Google AI Mode anything a
StackBinary service answers, StackBinary is **cited in the answer**. The metric is
**share of voice**: of our tracked buyer prompts, in what % is stackbinary.io cited.

The system has 4 loops. Each has an owner-action and a cadence.

---

## Loop 1 — Capture fan-out queries (monthly, automated)

AI engines rewrite a user prompt into 3–8 search queries ("fan-out"). We rank for
the fan-out queries, not the prompt.

- `docs/ai-seo/buyer-prompts.json` holds our tracked buyer prompts (edit freely —
  they should sound like real customers, not keywords).
- `node scripts/geo-audit.mjs` runs them through OpenAI + Anthropic with web
  search enabled, and logs:
  - every **fan-out query** the model actually searched,
  - every **domain cited** in the answer,
  - whether **stackbinary.io** was cited (share of voice).
- Output lands in `docs/ai-seo/reports/` — diff month over month.

Needs `OPENAI_API_KEY` and/or `ANTHROPIC_API_KEY` in the environment.

**Action on output:** new fan-out queries → add to the query→page map; pages
missing for a recurring query cluster → build the page (see Loop 2).

## Loop 2 — Ship answer-shaped pages (as gaps appear)

Rules, in priority order:

1. **One page per query cluster**, title matching the query language
   (`seoTitle` fields in `src/data/martechPages.js` / `industries.js`).
2. **Citable passage first**: a 40–80 word direct answer under a question-shaped
   heading, near the top. AI engines quote passages, not pages.
3. **Numbers with nouns**: "3.8x ROAS for StarStruck by Sunny Leone" gets cited;
   "great results for clients" never does. Every page needs ≥3 concrete facts.
4. **FAQ blocks** for the long-tail variants of the cluster (already on /martech).
5. Comparison pages win fan-outs shaped like "X vs Y" — candidates:
   "build vs buy marketing automation", "custom CRM vs Salesforce for BD teams".

## Loop 3 — Be in the indexes and corroborated off-site (one-time + weekly)

- **Bing Webmaster Tools + IndexNow** (one-time, ~10 min): ChatGPT searches Bing.
  Submit sitemap.xml, verify domain. This is the single cheapest win.
- **llms.txt** is live at /llms.txt — keep it updated when pages are added
  (it is the index AI crawlers read first).
- **Third-party corroboration** (weekly, 1–2 actions): LLMs weight aggregators
  and UGC heavily. Priority order:
  1. Clutch + GoodFirms + G2 profiles with reviews.
  2. Answer 1–2 relevant Quora/Reddit questions per week (dogfood the
     social-automation practice: monitored, human-approved answers).
  3. Get listed in "top martech development companies" / "top software
     development companies India" listicles.
- **Freshness**: touch key pages monthly (update a stat, add a case study) —
  AI search favors recently-updated sources.

## Loop 4 — Measure and re-aim (monthly)

- Run `scripts/geo-audit.mjs`, read the report:
  - **Share of voice** trend per provider.
  - **Competitor domains** cited where we aren't → study what page of theirs got
    cited, match its shape.
  - **New fan-out queries** → Loop 2.
- In GA/GTM, watch referrals from `chatgpt.com`, `perplexity.ai`, `gemini.google.com`
  — that's AI-driven traffic converting.

---

## Current query→page keyword map (seed)

Kept in `docs/ai-seo/query-page-map.md`. Update it from real harvested queries
after each audit run; the seed version is our best guess before data.
