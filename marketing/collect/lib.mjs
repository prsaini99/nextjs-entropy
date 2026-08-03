// Shared plumbing for the collectors: env, GA4 auth, IST date maths, state.
//
// Everything here follows two rules from DESIGN.md:
//   - guardrail 8: all dates are IST, converted at the door
//   - stage 1: trailing 3-day window, days freeze ("final") once 48h old

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { createSign } from 'node:crypto';
import { fileURLToPath } from 'node:url';

// Repo root = two levels up from marketing/collect/
export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const MARKETING = resolve(ROOT, 'marketing');
export const STATE_FILE = resolve(MARKETING, 'state.json');

export function loadEnv() {
  const env = {};
  try {
    for (const line of readFileSync(resolve(ROOT, '.env.local'), 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (m) env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    }
  } catch {}
  return { ...env, ...process.env };
}

// ── IST date maths ───────────────────────────────────────────────────────────
// IST is UTC+5:30 with no DST, so fixed-offset arithmetic is safe.
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

/** The IST calendar date (YYYY-MM-DD) for a given instant. */
export function istDate(d = new Date()) {
  return new Date(d.getTime() + IST_OFFSET_MS).toISOString().slice(0, 10);
}

/** UTC instant at which the given IST date began / ended. */
export function istDayStartUtc(dateStr) {
  return new Date(new Date(`${dateStr}T00:00:00.000Z`).getTime() - IST_OFFSET_MS);
}
export function istDayEndUtc(dateStr) {
  return new Date(istDayStartUtc(dateStr).getTime() + 24 * 60 * 60 * 1000);
}

/** The trailing N IST dates ending yesterday (today is still in progress). */
export function trailingDays(n = 3) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    out.push(istDate(new Date(Date.now() - i * 24 * 60 * 60 * 1000)));
  }
  return out; // newest first: [yesterday, D-2, D-3]
}

/** A day freezes once its IST end is 48h in the past. */
export function isFinal(dateStr) {
  return Date.now() - istDayEndUtc(dateStr).getTime() >= 48 * 60 * 60 * 1000;
}

// ── state.json ───────────────────────────────────────────────────────────────
export function readState() {
  try {
    return JSON.parse(readFileSync(STATE_FILE, 'utf8'));
  } catch {
    return { finalized: {}, runs: [] };
  }
}

export function writeState(state) {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

/** True if this (source, date) is frozen and must not be rewritten. */
export function isFrozen(state, source, dateStr) {
  return (state.finalized[dateStr] || []).includes(source);
}

export function markFinalIfDue(state, source, dateStr) {
  if (!isFinal(dateStr)) return;
  state.finalized[dateStr] = state.finalized[dateStr] || [];
  if (!state.finalized[dateStr].includes(source)) state.finalized[dateStr].push(source);
}

// ── output ───────────────────────────────────────────────────────────────────
export function writeSnapshot(source, dateStr, payload) {
  const dir = resolve(MARKETING, 'data', source);
  mkdirSync(dir, { recursive: true });
  const file = resolve(dir, `${dateStr}.json`);
  writeFileSync(file, JSON.stringify(payload, null, 1));
  return file;
}

export function snapshotExists(source, dateStr) {
  return existsSync(resolve(MARKETING, 'data', source, `${dateStr}.json`));
}

// ── fetch with retry ─────────────────────────────────────────────────────────
// clarity.ms drops connections intermittently (UND_ERR_CONNECT_TIMEOUT), and
// the launchd job can fire on laptop-wake before Wi-Fi is up. Both cost us
// permanent Clarity days on Aug 1-2. Backoff of 15s/30s/45s spans a typical
// wake-to-network window and rides out transient host flakiness.
export async function fetchRetry(url, opts = {}, tries = 4) {
  let lastErr;
  for (let i = 1; i <= tries; i++) {
    try {
      return await fetch(url, opts);
    } catch (err) {
      lastErr = err;
      if (i < tries) await new Promise((r) => setTimeout(r, i * 15000));
    }
  }
  throw lastErr;
}

// ── GA4 service-account token (same flow as scripts/ga-report.mjs) ───────────
const b64url = (buf) =>
  Buffer.from(buf).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

export async function ga4Token(env, scope = 'https://www.googleapis.com/auth/analytics.readonly') {
  const sa = JSON.parse(readFileSync(resolve(ROOT, env.GA4_SA_KEY_FILE), 'utf8'));
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64url(
    JSON.stringify({ iss: sa.client_email, scope, aud: 'https://oauth2.googleapis.com/token', exp: now + 3600, iat: now })
  );
  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claim}`);
  const assertion = `${header}.${claim}.${b64url(signer.sign(sa.private_key))}`;
  const res = await fetchRetry('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
  });
  if (!res.ok) throw new Error(`GA4 token exchange failed (${res.status}): ${await res.text()}`);
  return (await res.json()).access_token;
}
