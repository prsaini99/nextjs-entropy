#!/usr/bin/env node
// Daily collection orchestrator — the entry point launchd invokes.
//
//   node marketing/collect/run-all.mjs
//
// Runs the three collectors, records the run in state.json, and never lets one
// collector's failure abort the others: a Clarity outage must not cost us the
// GA4 snapshot, because missed Clarity days are unrecoverable and missed GA4
// days are merely annoying — each source fails alone.

import { readState, writeState, istDate } from './lib.mjs';
import { collectGa4 } from './ga4.mjs';
import { collectClarity } from './clarity.mjs';
import { collectLeads } from './leads.mjs';

const results = [];
for (const [name, fn] of [
  ['ga4', collectGa4],
  ['clarity', collectClarity],
  ['leads', collectLeads],
]) {
  try {
    const r = await fn();
    results.push({ source: name, ok: true, collected: r.collected });
    console.log(`${name}: ok — ${r.collected.join(', ') || 'nothing to do'}`);
  } catch (err) {
    results.push({ source: name, ok: false, error: String(err.message || err).slice(0, 300) });
    console.error(`${name}: FAILED — ${err.message}`);
  }
}

const state = readState();
state.runs = state.runs || [];
state.runs.push({ at: new Date().toISOString(), istDay: istDate(), results });
// Keep the run log bounded; the snapshots are the real record.
if (state.runs.length > 120) state.runs = state.runs.slice(-120);
writeState(state);

const failed = results.filter((r) => !r.ok);
process.exit(failed.length ? 1 : 0);
