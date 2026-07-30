# Marketing loop — design

A repeatable cycle that turns measurement into decisions and decisions back into
measurement. Lives in `marketing/`, deliberately separate from the app: it has its
own cadence, its own data, and no build dependency on the site.

Status: **design**. Nothing is built yet.

---

## 1. What problem this solves

Three systems each hold one third of the answer, and none of them can see the other two.

| System | Answers | Blind to |
|---|---|---|
| **Google Analytics 4** | How many, from which channel and keyword | What the person actually did |
| **Microsoft Clarity** | What they did — scroll, dead clicks, rage clicks, recordings | How many, and cost |
| **Supabase `leads`** | Who they are, what they asked for | Everything upstream of the form |
| *(later)* **Google Ads** | What it cost, which query triggered the ad | Everything after the click |

The value is not in any one of them. It is in the join — being able to say
*"the `ai calling agent` keyword produced 40 sessions, 61% of them dead-clicked the
chat widget, 3 started the form, 0 finished, and it cost ₹2,400"*. No single tool
can produce that sentence.

## 2. The join

This is the load-bearing part of the design. The four systems share no primary key
by default. They are joinable only because the instrumentation was built to make
them joinable:

```
  Google Ads click
        │  gclid
        v
  Landing page  ──> lib/clickIds.js captures gclid → localStorage (90d)
        │
        ├──> GA4        sessionManualTerm, sessionSource/Medium, landingPage
        │
        ├──> Clarity    session tags set in Analytics.jsx:
        │               kw, campaign, source, medium, paid, landing
        │
        └──> Form submit ──> Supabase leads row:
                             gclid, utm_term, utm_campaign, utm_source, landing_page
```

**Join keys, in order of strength:**

1. `gclid` — exact, per-click. Ties a Supabase lead row to a specific ad click.
   Only present on paid traffic.
2. `utm_term` ↔ GA4 `sessionManualTerm` ↔ Clarity tag `kw` — the keyword. Works for
   any tagged traffic, paid or not.
3. `landing_page` ↔ GA4 `landingPagePlusQueryString` ↔ Clarity tag `landing` — the
   coarsest join, but always available.

Nothing in the pipeline should assume a stronger key than the data supports. A lead
with no `gclid` is not a failure — it is organic, and must not be silently dropped
from channel totals.

## 3. Stages

```
  ┌─────────────────────────────────────────────────────────┐
  │                                                         │
  v                                                         │
COLLECT ──> JOIN ──> DIAGNOSE ──> DECIDE ──> ACT ──> VERIFY ┘
 daily      daily     weekly      weekly    human   scheduled
 auto       auto      me          me                 me
```

### Stage 1 — COLLECT (daily, automated)

Scripts, not MCP tools. This distinction matters and is explained in §5.

- `collect/ga4.mjs` — sessions, events, sources, keywords, landing pages, conversions.
  Extends the existing `scripts/ga-report.mjs`.
- `collect/clarity.mjs` — dead clicks, rage clicks, quickbacks, scroll depth, by
  device and source. Extends `scripts/clarity-report.mjs`.
- `collect/leads.mjs` — new `leads` rows since the last run, with attribution columns.
- `collect/run-all.mjs` — orchestrator; writes a run record to `state.json`.

Output: `data/{ga4,clarity,leads}/YYYY-MM-DD.json`

> **Why daily collection is mandatory even though decisions are weekly.**
> The Clarity Data Export API serves only a rolling recent window — there is no
> historical endpoint. A day not captured is a day lost permanently. These snapshots
> *are* the history; nothing can reconstruct them later.

### Stage 2 — JOIN (daily, automated)

Produce one row per `(date, source/medium, keyword, landing_page)`:

```
date, source, medium, keyword, landing_page,
sessions, engaged_sessions, engagement_rate,
dead_click_sessions, rage_click_sessions, avg_scroll_depth,
form_starts, form_abandons, abandon_field,
leads, lead_ids,
cost, clicks, impressions        <- null until AdLoop lands
```

Output: `joined/YYYY-MM-DD.json`

Rows where a metric is unavailable carry `null`, never `0`. Conflating "no data" with
"zero" is how a tracking outage becomes a fabricated performance drop.

### Stage 3 — DIAGNOSE (weekly, interactive)

Run the joined data against a fixed check list. Each check has an explicit threshold
and a minimum sample size below which it reports *insufficient data* rather than a
verdict.

| Check | Fires when | Min sample |
|---|---|---|
| Funnel break | `form_start` > 0 and `generate_lead` = 0 | 5 form starts |
| Friction | dead-click sessions / sessions > 20% on one page | 30 sessions |
| Spend waste | keyword with clicks and zero leads | 40 clicks |
| Attribution gap | leads with no `gclid` and no `utm_*` | 10 leads |
| Tracking health | an expected event absent for 48h | — always |
| Landing mismatch | high sessions, high bounce, low scroll | 30 sessions |

Tracking health runs first and unconditionally. **If instrumentation is broken, every
other finding that week is void** — this is exactly the trap that made 16 phantom
conversions look like performance for weeks.

### Stage 4 — DECIDE (weekly, interactive)

Every recommendation carries four things, or it is not a recommendation:

- **Evidence** — the specific rows and counts it rests on
- **Expected effect** — what should change, and by roughly how much
- **Confidence** — high / medium / low, driven by sample size, not by tone
- **Falsifier** — what observation would prove it wrong

The falsifier is what makes Stage 6 possible.

### Stage 5 — ACT

**Now:** output is a checklist you execute in the Google Ads and GA4 UIs. Consistent
with how we already work.

**Later, with AdLoop:** `draft_*` tools compose a change plan, you review it, and
`confirm_and_apply` executes. `require_dry_run` stays `true`. The pipeline never
gains an unattended write path — Stage 5 is the human gate by design, not by
limitation.

### Stage 6 — VERIFY (scheduled)

Each decision is written to `decisions/YYYY-MM-DD-slug.md` with a **review date**.
On that date the loop re-pulls and asks a single question: *did the expected effect
occur?* Outcomes are recorded as confirmed / refuted / inconclusive.

This stage is what makes this a loop rather than a weekly report. Without it, wrong
recommendations are never detected and the same mistake recurs indefinitely.

## 4. Cadence, and why it is tiered

At roughly **350 clicks/month**, the honest answer to most daily questions is "we
cannot know yet." The cadence is set by statistical power, not by convenience:

| Window | Approx clicks | Decidable |
|---|---|---|
| Daily | ~12 | Nothing. Collection only. |
| Weekly | ~80 | Engagement metrics (fire on 10–30% of sessions): dead clicks, scroll, demo opens, form starts |
| Monthly | ~350 | Direction of conversion rate. Weak. |
| Quarterly | ~1,000 | Conversion-rate comparisons between variants |

**Engagement metrics are the working signal at this volume**, which is why they were
instrumented in the first place. A conversion rate computed on 12 clicks is noise
wearing a number's clothing.

## 5. Automated vs interactive — and why it is split

MCP servers (Clarity, GA4, later AdLoop) are **session-scoped**: they run as local
processes attached to a Claude session. They do not exist inside GitHub Actions or a
cron job. So:

- **Collection is scripts.** `.mjs` files reading credentials from `.env.local`,
  runnable from cron or CI, no Claude involvement. Same pattern as the existing
  `geo-*` workflows.
- **Analysis is MCP.** Drill-down, session recordings, ad-hoc GAQL — things that
  require judgement about what to ask next, which is precisely what a fixed script
  cannot do.

Getting this backwards produces either a pipeline that cannot be automated or an
analysis that cannot ask a follow-up question.

**Clarity rate limit:** the Data Export API allows ~10 requests/day. Daily collection
must budget for this — a fixed allocation for the automated pull, with headroom
reserved for interactive drill-down. Exceeding it silently loses a day of history.

## 6. Layout

```
marketing/
  DESIGN.md              this file
  README.md              how to run it
  config.json            thresholds, IDs, sample minimums, review intervals
  state.json             last run per collector, open experiments, pending reviews

  collect/
    ga4.mjs
    clarity.mjs
    leads.mjs
    run-all.mjs
  join/
    build.mjs
  diagnose/
    checks.mjs           the table in §3, as code

  data/                  raw snapshots, append-only, never edited
    ga4/YYYY-MM-DD.json
    clarity/YYYY-MM-DD.json
    leads/YYYY-MM-DD.json
  joined/YYYY-MM-DD.json
  reports/weekly-YYYY-Www.md
  decisions/YYYY-MM-DD-slug.md
```

`data/` is append-only and **gitignored** — it holds lead PII and is the only copy of
Clarity history that will ever exist. Append-only is not a style preference: editing a
past snapshot silently rewrites the evidence a previous decision was based on, which
makes Stage 6 meaningless.

## 7. Guardrails

1. **No recommendation below its minimum sample.** Report "insufficient data" instead.
2. **Tracking health gates everything.** Broken instrumentation voids the week.
3. **`null` ≠ `0`.** Missing data is never rendered as a zero.
4. **No unattended writes.** Stage 5 requires a human, before and after AdLoop.
5. **One change at a time per surface.** Two simultaneous changes to the same page
   make Stage 6 unattributable.
6. **Decisions are immutable once written.** Outcomes are appended, not edited — a
   decision log that can be revised after the fact records no learning.

## 8. Decisions taken

**`data/` is gitignored — local only.** Keeps credentials-adjacent data and lead PII
out of the repository entirely. See the risk note below.

**Collection runs locally, not in CI.** No credentials move to GitHub secrets;
`.env.local` remains the single place they live.

**The loop optimises for lead count, not lead quality.** Accepted knowingly: nothing
currently distinguishes a qualified lead from a junk one, so the loop can be pulled
toward whichever keyword generates the most noise. Treat every keyword-level
recommendation as provisional until a quality signal exists.

> **Free mitigation, taken now:** `collect/leads.mjs` retains the full form payload —
> budget range, timeline, service, work-email domain, project summary. Scoring is not
> applied, but the raw fields are kept, so leads can be retro-scored later once you
> know which ones converted to revenue. Discarding those fields today would make that
> permanently impossible; keeping them costs nothing.

### The one compounding risk

Local-only storage and local-only scheduling point the same direction: **Clarity
history exists on exactly one machine, and gaps in it are permanent.** Clarity serves
only a rolling recent window, so a week with the laptop shut is a week that no longer
exists anywhere.

Two cheap mitigations, both applied:

1. **Use `launchd`, not `cron`.** This is the important one. `cron` silently skips a
   job whose scheduled time passed while the machine was asleep. `launchd` with
   `StartCalendarInterval` runs a missed job when the machine next wakes. On macOS
   this converts "laptop was closed" from data loss into a delayed run.
2. **`data/` is gitignored, not unbacked.** It sits inside the project directory, so
   whatever backs up your machine backs it up. Worth confirming that is actually true
   before relying on it.

### Still open

- **Weekly review day.** Monday reads the previous week cleanly; Friday allows acting
  before the weekend.
