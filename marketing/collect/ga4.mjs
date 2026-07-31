#!/usr/bin/env node
// GA4 daily collector.
//
// Pulls the trailing 3 IST days in one set of date-dimensioned reports, then
// splits rows into per-day snapshots: marketing/data/ga4/YYYY-MM-DD.json.
// Days younger than 48h are rewritten each run (GA4 data is not final for
// 24-48h); frozen days are skipped. GA4's property timezone is already IST,
// so its `date` dimension needs no conversion — that alignment is why the
// property timezone must never be changed casually.

import { loadEnv, ga4Token, trailingDays, readState, writeState, isFrozen, markFinalIfDue, writeSnapshot } from './lib.mjs';

const env = loadEnv();
const propertyId = env.GA4_PROPERTY_ID;
if (!propertyId || !env.GA4_SA_KEY_FILE) {
  console.error('ga4: GA4_PROPERTY_ID / GA4_SA_KEY_FILE missing from .env.local');
  process.exit(1);
}

const EXCLUDE_LOCAL = {
  notExpression: {
    filter: { fieldName: 'hostName', stringFilter: { matchType: 'FULL_REGEXP', value: '(localhost|127\\.0\\.0\\.1|.*\\.local)' } },
  },
};

async function runReport(token, body) {
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GA4 report failed (${res.status}): ${await res.text()}`);
  return res.json();
}

const rows = (r) =>
  (r.rows || []).map((row) => ({
    ...Object.fromEntries((row.dimensionValues || []).map((d, i) => [r.dimensionHeaders[i].name, d.value])),
    ...Object.fromEntries((row.metricValues || []).map((m, i) => [r.metricHeaders[i].name, Number(m.value)])),
  }));

export async function collectGa4() {
  const state = readState();
  const days = trailingDays(3).filter((d) => !isFrozen(state, 'ga4', d));
  if (!days.length) return { source: 'ga4', collected: [] };

  const token = await ga4Token(env);
  const dateRanges = [{ startDate: days[days.length - 1], endDate: days[0] }];
  const q = (dimensions, metrics, extra = {}) =>
    runReport(token, {
      dateRanges,
      dimensions: ['date', ...dimensions].map((name) => ({ name })),
      metrics: metrics.map((name) => ({ name })),
      dimensionFilter: EXCLUDE_LOCAL,
      limit: 5000,
      ...extra,
    });

  const [overview, events, sources, keywords, landing] = await Promise.all([
    q([], ['sessions', 'activeUsers', 'engagedSessions', 'engagementRate', 'averageSessionDuration', 'bounceRate']),
    q(['eventName'], ['eventCount', 'totalUsers']),
    q(['sessionSource', 'sessionMedium'], ['sessions', 'engagementRate']),
    q(['sessionManualTerm'], ['sessions', 'engagementRate']),
    q(['landingPagePlusQueryString'], ['sessions', 'bounceRate', 'engagementRate']),
  ]);

  // GA4 date dimension is YYYYMMDD; normalise to YYYY-MM-DD before grouping.
  const norm = (d) => `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;
  const byDay = (report) => {
    const out = {};
    for (const row of rows(report)) {
      const day = norm(row.date);
      delete row.date;
      (out[day] = out[day] || []).push(row);
    }
    return out;
  };

  const sections = {
    overview: byDay(overview),
    events: byDay(events),
    sources: byDay(sources),
    keywords: byDay(keywords),
    landingPages: byDay(landing),
  };

  const collected = [];
  for (const day of days) {
    writeSnapshot('ga4', day, {
      meta: { source: 'ga4', date: day, timezone: 'Asia/Kolkata', collectedAt: new Date().toISOString() },
      overview: (sections.overview[day] || [])[0] || null,
      events: sections.events[day] || [],
      sources: sections.sources[day] || [],
      keywords: sections.keywords[day] || [],
      landingPages: sections.landingPages[day] || [],
    });
    markFinalIfDue(state, 'ga4', day);
    collected.push(day);
  }
  writeState(state);
  return { source: 'ga4', collected };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  collectGa4().then((r) => console.log(`ga4: collected ${r.collected.join(', ') || 'nothing (all frozen)'}`));
}
