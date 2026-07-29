# Measurement reference

What is captured, where it goes, and how to pull it for analysis.

---

## Why this exists

At ~350 clicks/month the campaign produces 5–10 leads. That is far too few to
rank keywords by conversion. Everything below is built to answer the questions
that *are* answerable at this volume: **which keyword produces readers, which
section holds them, which objection they open, and where they give up.**

---

## GA4 events

Every event reaches GA4 *and* the GTM dataLayer. Since 2026-07-28 `trackEvent`
sends both formats; before that fix, everything except `page_view` and
`generate_lead` was landing only in the dataLayer and never reaching GA4.

| Event | Fires when | Key parameters | Reads as |
|---|---|---|---|
| `page_view` | each route, once | `page_path` | reach |
| `cta_click` | any of 11 CTA sites | `cta_name`, `cta_location` | **which section drives intent** |
| `demo_open` | "Explore … Live" / product demo link | `demo_name`, `demo_location`, `page_slug` | strongest mid-funnel signal |
| `demo_interact` | TRIBE play/scrub, embed opened full-screen | `demo_name`, `demo_action` | evaluating, not skimming |
| `product_tab_view` | flagship product tab switched | `product_name` | which product they came for |
| `pillar_select` | services pillar clicked | `pillar_name` | which service family |
| `faq_open` | FAQ question expanded | `faq_question`, `faq_position` | **their actual objection** |
| `case_study_open` | case study expanded | `case_study`, `case_study_category` | proof-seeking |
| `scroll` | 50 / 75 / 90% depth | `percent_scrolled` | read-through |
| `contact_form_start` | first keystroke in a form | `first_field`, `form_source` | intent to convert |
| `form_abandon` | leaves a started form unsubmitted | **`abandoned_at`**, `fields_completed` | **the field costing you leads** |
| `generate_lead` | successful submission | `lead_form`, `lead_service`, `lead_budget` | the conversion |
| `calendly_click`, `whatsapp_click`, `social_click` | outbound contact | `destination` | chose another channel |

Every event also carries UTM data and attribution model automatically, via
`getUTMDataFromStorage()` inside `trackEvent`.

### The two most valuable, and why

**`faq_open`** turns your FAQ into an objection tracker. If *"Is Instagram DM
automation allowed by Meta?"* is opened three times more than anything else,
that objection belongs above the fold, not buried in an accordion.

**`form_abandon` + `abandoned_at`** is the only signal that names the specific
field losing you money. A conversion rate says "they didn't finish". This says
"they stopped at budget", which is a decision you can act on in one edit.

---

## Clarity session tags

Set in `Analytics.jsx` on every route. Without these, recordings are an
unsearchable pile.

| Tag | Value | Lets you ask |
|---|---|---|
| `kw` | `utm_term` | "sessions from the *ai calling agent* keyword" |
| `campaign` | `utm_campaign` | per-campaign behaviour |
| `source` / `medium` | UTM or `direct` | paid vs organic behaviour |
| `paid` | `google-ads` / `organic` | **did ad traffic behave differently** |
| `landing` | first path | entry-point comparison |
| `action` | accumulates each tagged event | "opened a demo but never submitted" |

`action` is tagged for: `demo_open`, `demo_interact`, `contact_form_start`,
`contact_form_submit`, `generate_lead`, `calendly_click`, `whatsapp_click`,
`faq_open`, `case_study_open`, `form_abandon`.

**The query worth running weekly:** sessions where `paid = google-ads` **and**
`action = demo_open` **and not** `action = generate_lead`. Those are people who
evaluated the product and left. Watching ten of those recordings is worth more
than any dashboard.

---

## Pulling the data

```bash
node scripts/ga-report.mjs 7        # last 7 days → docs/reports/ga4-YYYY-MM-DD.json
node scripts/clarity-report.mjs 3   # last 3 days → docs/reports/clarity-YYYY-MM-DD.json
```

Both read credentials from `.env.local` and write dated JSON, so the folder
accumulates a time series that can be compared week over week.

### Setup required

**GA4** (one-time, ~10 min)

Uses OAuth, not a service account. Google now enforces
`iam.disableServiceAccountKeyCreation` by default, which blocks downloading JSON
keys — and that policy is correct, since those keys are long-lived secrets on
disk. A user refresh token is better here anyway: it inherits your existing GA4
access (no extra property grant) and is revocable at
[myaccount.google.com/permissions](https://myaccount.google.com/permissions).

1. Cloud Console → APIs & Services → Library → enable **Google Analytics Data API**
2. OAuth consent screen → **External** → add yourself as a **Test user**
3. Credentials → Create credentials → **OAuth client ID** → type **Desktop app**
   *(desktop clients are not affected by the key-creation policy)*
4. Run once:
   ```bash
   GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=... node scripts/ga-auth.mjs
   ```
   It opens the consent screen, catches the redirect on `localhost:8920`, and
   prints the lines for `.env.local`.
5. Add the printed values plus `GA4_PROPERTY_ID` (GA4 → Admin → Property
   Settings — the **numeric** ID, not the `G-XXXX` measurement ID).

**Clarity** (one-time, ~1 min)
1. Clarity → Settings → Data Export → generate API token
2. `.env.local`: `CLARITY_API_TOKEN=...`

### Clarity API limits

10 requests per project per day; the script uses 4, so run it at most twice
daily. Maximum window is 3 days — it is not a historical API, so the daily
cadence is what builds the trend.

---

## What each tool is for

**GA4** — how many, from where, doing what. Counts and trends.
**Clarity** — why. Recordings, heatmaps, rage clicks, dead clicks, quick-backs.
**Search Terms report** (Google Ads, manual weekly export) — the actual queries
people typed. Keyword Planner only ever gave estimates.

The loop: GA4 shows *which* keyword underperforms → Clarity shows *why* by
filtering recordings to `kw = <that keyword>` → Search Terms shows what those
people actually searched → fix the page or add the negative.

---

## Still to configure (dashboard-side, not code)

1. **Google Ads conversion action** → paste ID/label into `AW_CONVERSION` in `src/lib/trackLead.js` *(currently empty — Ads conversions do not fire)*
2. **GA4 → Admin → Data Streams → Enhanced measurement** → turn **off** "Page changes based on browser history events" *(otherwise SPA navigations double-count against the page_view the code already sends)*
3. **GA4 → mark as Key events:** `generate_lead`, `contact_form_start`, `demo_open`, `demo_interact`, `cta_click`
4. **GA4 → internal traffic filter** for `localhost`
5. **Clarity → Settings → link to GA4**, so you can jump from a GA4 segment to its recordings
