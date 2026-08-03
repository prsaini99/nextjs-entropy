#!/usr/bin/env node
// Clarity daily collector.
//
// The Data Export API is the constraint that shapes the whole loop:
//   - it serves only a rolling recent window (numOfDays 1-3), no history
//   - ~10 requests per project per day
// So this collector runs once daily, spends 3 of the 10 requests on fixed
// cuts, and stamps the result as *yesterday's* snapshot. A day missed before
// it scrolls out of the window is unrecoverable — these files are the history.
//
// Timezone caveat, recorded here and in the snapshot meta: the API buckets by
// UTC day, not IST. numOfDays=1 therefore covers the UTC day, which is offset
// 5.5h from the IST day the filename claims. Per guardrail 7 this data never
// shares a ratio with another source, so the skew shifts levels slightly but
// never corrupts a cross-source comparison. Accepted, documented, not hidden.

import { loadEnv, fetchRetry, trailingDays, readState, writeState, isFrozen, markFinalIfDue, writeSnapshot } from './lib.mjs';

const env = loadEnv();
const token = env.CLARITY_API_TOKEN;
if (!token) {
  console.error('clarity: CLARITY_API_TOKEN missing from .env.local');
  process.exit(1);
}

const API = 'https://www.clarity.ms/export-data/api/v1/project-live-insights';

async function fetchInsights(dimensions) {
  const params = new URLSearchParams({ numOfDays: '1' });
  dimensions.forEach((d, i) => params.set(`dimension${i + 1}`, d));
  const res = await fetchRetry(`${API}?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Clarity export failed (${res.status}): ${await res.text()}`);
  return res.json();
}

export async function collectClarity() {
  const state = readState();
  // Clarity can only describe the most recent day; earlier gaps are permanent.
  const [yesterday] = trailingDays(1);
  if (isFrozen(state, 'clarity', yesterday)) return { source: 'clarity', collected: [] };

  // 3 fixed cuts = 3 of the ~10 daily requests, leaving headroom for
  // interactive MCP drill-down later the same day.
  const [totals, byUrl, bySourceDevice] = [
    await fetchInsights([]),
    await fetchInsights(['URL']),
    await fetchInsights(['Source', 'Device']),
  ];

  writeSnapshot('clarity', yesterday, {
    meta: {
      source: 'clarity',
      date: yesterday,
      timezone: 'UTC-day approximating the labelled IST day (offset 5.5h, see collector header)',
      collectedAt: new Date().toISOString(),
      requestsSpent: 3,
    },
    totals,
    byUrl,
    bySourceDevice,
  });
  markFinalIfDue(state, 'clarity', yesterday);
  writeState(state);
  return { source: 'clarity', collected: [yesterday] };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  collectClarity().then((r) => console.log(`clarity: collected ${r.collected.join(', ') || 'nothing (frozen)'}`));
}
