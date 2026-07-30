#!/usr/bin/env node
/**
 * List and create GA4 key events via the Admin API.
 *
 *   node scripts/ga-key-events.mjs            # list only
 *   node scripts/ga-key-events.mjs --apply    # create anything missing
 *
 * Note this is the Admin API (analyticsadmin.googleapis.com), a different
 * service from the Data API used by ga-report.mjs. Both are authorised by the
 * same service-account key, but the Admin API must be separately enabled in the
 * Cloud project and writes need the analytics.edit scope.
 *
 * Counting method is ONCE_PER_SESSION for everything. That is deliberate: the
 * conversion action this replaces fired 16 times for 7 users, because a visitor
 * revisiting a page counted again each time. Per-session counting makes a key
 * event mean "this session did the thing" rather than "how many times".
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createSign } from 'node:crypto';

const ENV_FILE = '.env.local';
const ADMIN = 'https://analyticsadmin.googleapis.com/v1beta';

// Marked as key events so they are available to Google Ads and to GA4 reporting.
// Only generate_lead should ever be a *Primary* conversion in Google Ads; the
// rest are mid-funnel signals, useful because at ~350 clicks/month the lead
// count alone is too sparse to optimise against.
const WANTED = [
  'generate_lead',
  'contact_form_start',
  'demo_open',
  'demo_interact',
  'cta_click',
  'chat_open',
];

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

const b64url = (buf) =>
  Buffer.from(buf).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

async function getToken(sa, scope) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope,
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    })
  );
  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claim}`);
  const assertion = `${header}.${claim}.${b64url(signer.sign(sa.private_key))}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });
  if (!res.ok) {
    console.error(`\n✖ Token exchange failed (${res.status}): ${await res.text()}\n`);
    process.exit(1);
  }
  return (await res.json()).access_token;
}

const env = { ...loadEnv(ENV_FILE), ...process.env };
const propertyId = env.GA4_PROPERTY_ID;
const keyFile = env.GA4_SA_KEY_FILE;
if (!propertyId || !keyFile) {
  console.error('\n✖ GA4_PROPERTY_ID and GA4_SA_KEY_FILE must be set in .env.local\n');
  process.exit(1);
}

const apply = process.argv.includes('--apply');
const sa = JSON.parse(readFileSync(resolve(process.cwd(), keyFile), 'utf8'));
const scope = apply
  ? 'https://www.googleapis.com/auth/analytics.edit'
  : 'https://www.googleapis.com/auth/analytics.readonly';
const token = await getToken(sa, scope);
const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

const listRes = await fetch(`${ADMIN}/properties/${propertyId}/keyEvents?pageSize=200`, { headers });
if (!listRes.ok) {
  console.error(`\n✖ Could not list key events (${listRes.status}): ${await listRes.text()}\n`);
  process.exit(1);
}
const existing = (await listRes.json()).keyEvents || [];

console.log(`\nGA4 property ${propertyId} — ${existing.length} key event(s) currently defined:\n`);
for (const k of existing) {
  console.log(`  ${k.eventName.padEnd(30)} ${k.countingMethod || '-'}${k.custom ? '' : '  (built-in)'}`);
}

const have = new Set(existing.map((k) => k.eventName));
const missing = WANTED.filter((e) => !have.has(e));

if (!missing.length) {
  console.log('\n✔ All wanted key events already exist.\n');
  process.exit(0);
}

console.log(`\n${missing.length} missing: ${missing.join(', ')}`);

if (!apply) {
  console.log('\nRun again with --apply to create them.\n');
  process.exit(0);
}

console.log('\nCreating…\n');
let created = 0;
for (const eventName of missing) {
  const res = await fetch(`${ADMIN}/properties/${propertyId}/keyEvents`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ eventName, countingMethod: 'ONCE_PER_SESSION' }),
  });
  if (res.ok) {
    console.log(`  ✔ ${eventName}`);
    created++;
  } else {
    console.log(`  ✖ ${eventName} — ${res.status} ${(await res.text()).slice(0, 160)}`);
  }
}
console.log(`\n${created}/${missing.length} created.\n`);
