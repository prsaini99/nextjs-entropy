#!/usr/bin/env node
/**
 * Pull Microsoft Clarity insights into docs/reports/.
 *
 *   node scripts/clarity-report.mjs           # last 1 day
 *   node scripts/clarity-report.mjs 3         # last 3 days (API maximum)
 *
 * ── One-time setup ────────────────────────────────────────────────────────────
 * Clarity → Settings → Data Export → generate an API token, then add to .env.local:
 *      CLARITY_API_TOKEN=...
 *
 * ── API limits worth knowing ──────────────────────────────────────────────────
 *  · 10 requests per project per day. This script uses 4, so run it at most
 *    twice a day.
 *  · Maximum window is 3 days. It is not a historical API — for trends, run it
 *    daily and let docs/reports/ accumulate the series.
 *  · Up to 3 dimensions per request.
 *
 * Clarity answers questions GA4 cannot: rage clicks, dead clicks, excessive
 * scrolling, quick-backs. Those are usability failures, not traffic numbers,
 * and they are usually the reason a good page converts badly.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const ENV_FILE = '.env.local';
const OUT_DIR = 'docs/reports';
const API = 'https://www.clarity.ms/export-data/api/v1/project-live-insights';

function loadEnv(file) {
  const env = {};
  try {
    for (const line of readFileSync(resolve(process.cwd(), file), 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (m) env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    }
  } catch {}
  return env;
}

function fail(msg) {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
}

const days = Math.min(Number(process.argv[2] || 1), 3);
const env = { ...loadEnv(ENV_FILE), ...process.env };
const token = env.CLARITY_API_TOKEN;
if (!token) {
  fail(
    `CLARITY_API_TOKEN missing from ${ENV_FILE}.\n\n` +
      `  Clarity → Settings → Data Export → generate API token, then add:\n` +
      `    CLARITY_API_TOKEN=...`
  );
}

async function fetchInsights(dimensions) {
  const params = new URLSearchParams({ numOfDays: String(days) });
  dimensions.forEach((d, i) => params.set(`dimension${i + 1}`, d));

  const res = await fetch(`${API}?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 429) fail('Clarity rate limit reached (10 requests/day). Try again tomorrow.');
  if (!res.ok) fail(`Clarity API returned ${res.status}: ${await res.text()}`);
  return res.json();
}

console.log(`\nClarity · last ${days} day(s)\n`);

// 4 requests, well inside the 10/day budget. The custom tags set in
// Analytics.jsx (kw, campaign, source, paid, action) are what make these useful.
const [overall, byUrl, bySource, byDevice] = await Promise.all([
  fetchInsights([]),
  fetchInsights(['URL']),
  fetchInsights(['Source']),
  fetchInsights(['Device']),
]);

const report = {
  generatedAt: new Date().toISOString(),
  windowDays: days,
  overall,
  byUrl,
  bySource,
  byDevice,
};

mkdirSync(resolve(process.cwd(), OUT_DIR), { recursive: true });
const stamp = new Date().toISOString().slice(0, 10);
const out = `${OUT_DIR}/clarity-${stamp}.json`;
writeFileSync(resolve(process.cwd(), out), JSON.stringify(report, null, 2));

// Surface the frustration signals, which are the point of pulling this at all.
// Note: `sessionsCount` is the total for the window and is identical on every
// metric. The real value is sessionsWithMetricPercentage (share of sessions
// affected) and subTotal (raw count of occurrences).
const list = Array.isArray(overall) ? overall : overall?.metrics || [];
const get = (name) => list.find((m) => (m.metricName || m.name) === name)?.information?.[0];

const totals = get('DeadClickCount') || {};
console.log(`  sessions in window: ${totals.sessionsCount ?? '?'}\n`);

const FRUSTRATION = [
  ['RageClickCount', 'rage clicks', 'repeated clicking in frustration'],
  ['DeadClickCount', 'dead clicks', 'clicked something that does nothing'],
  ['ErrorClickCount', 'error clicks', 'click triggered a JS error'],
  ['QuickbackClick', 'quick backs', 'entered a page and immediately left'],
  ['ExcessiveScroll', 'excessive scroll', 'hunting for something'],
  ['ScriptErrorCount', 'script errors', ''],
];

for (const [key, label, meaning] of FRUSTRATION) {
  const i = get(key);
  if (!i) continue;
  const pct = Number(i.sessionsWithMetricPercentage || 0);
  const flag = pct >= 15 ? '⚠' : pct > 0 ? '·' : ' ';
  const note = pct >= 15 && meaning ? `   ← ${meaning}` : '';
  console.log(
    `  ${flag} ${label.padEnd(17)} ${String(pct).padStart(5)}% of sessions` +
      `  (${i.subTotal ?? 0} total)${note}`
  );
}

console.log(`\n✔ written to ${out}\n`);
