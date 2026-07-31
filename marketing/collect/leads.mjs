#!/usr/bin/env node
// Leads daily collector.
//
// Snapshots `leads` rows created in the trailing 3 IST days into
// marketing/data/leads/YYYY-MM-DD.json. Supabase stores created_at in UTC;
// rows are bucketed into IST days at the door (guardrail 8).
//
// Rows are stored in full — including name/email/phone — by explicit decision
// (2026-07-31): the laptop is the trust boundary for now, and full payloads
// keep retro-scoring possible once revenue outcomes are known. If that
// decision changes, trim the FIELDS list; nothing else needs to move.

import { loadEnv, trailingDays, istDate, istDayStartUtc, readState, writeState, isFrozen, markFinalIfDue, writeSnapshot } from './lib.mjs';

const env = loadEnv();
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('leads: NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing from .env.local');
  process.exit(1);
}

export async function collectLeads() {
  const state = readState();
  const days = trailingDays(3).filter((d) => !isFrozen(state, 'leads', d));
  if (!days.length) return { source: 'leads', collected: [] };

  // One query covering the whole window, then bucket per IST day.
  const oldest = days[days.length - 1];
  const from = istDayStartUtc(oldest).toISOString();
  const res = await fetch(
    `${url}/rest/v1/leads?select=*&created_at=gte.${from}&order=created_at.asc`,
    { headers: { apikey: key, Authorization: `Bearer ${key}` } }
  );
  if (!res.ok) throw new Error(`Supabase query failed (${res.status}): ${await res.text()}`);
  const all = await res.json();

  const byDay = {};
  for (const row of all) {
    const day = istDate(new Date(row.created_at));
    (byDay[day] = byDay[day] || []).push(row);
  }

  const collected = [];
  for (const day of days) {
    writeSnapshot('leads', day, {
      meta: { source: 'leads', date: day, timezone: 'Asia/Kolkata (bucketed from UTC created_at)', collectedAt: new Date().toISOString() },
      count: (byDay[day] || []).length,
      rows: byDay[day] || [],
    });
    markFinalIfDue(state, 'leads', day);
    collected.push(day);
  }
  writeState(state);
  return { source: 'leads', collected };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  collectLeads().then((r) => console.log(`leads: collected ${r.collected.join(', ') || 'nothing (all frozen)'}`));
}
