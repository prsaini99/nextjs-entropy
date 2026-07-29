#!/usr/bin/env node
/**
 * Pull a GA4 engagement report into docs/reports/ so it can be read and analysed.
 *
 *   node scripts/ga-report.mjs              # last 7 days
 *   node scripts/ga-report.mjs 1            # yesterday only
 *   node scripts/ga-report.mjs 28           # last 28 days
 *
 * ── Auth: two supported options ───────────────────────────────────────────────
 *
 * A) Service account (used if GA4_SA_KEY_FILE is set)
 *      GA4_PROPERTY_ID=123456789          # numeric, NOT the G-XXXX measurement ID
 *      GA4_SA_KEY_FILE=./ga-service-account.json
 *    Requires the org policy iam.disableServiceAccountKeyCreation to be turned
 *    off for the project, and the service-account email added as a Viewer on
 *    the GA4 property (Admin → Property Access Management).
 *
 * B) OAuth refresh token (fallback)
 *      run: node scripts/ga-auth.mjs
 *    Inherits your own GA4 access, so no property grant needed.
 *
 * No npm dependencies.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { createSign } from 'node:crypto';

const ENV_FILE = '.env.local';
const OUT_DIR = 'docs/reports';

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

const b64url = (buf) =>
  Buffer.from(buf).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

const SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';

/** Service-account flow: sign an RS256 JWT and exchange it for an access token. */
async function tokenFromServiceAccount(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: SCOPE,
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
    fail(
      `Service-account token exchange failed (${res.status}): ${await res.text()}\n` +
        `  Most common cause: the service account has not been added as a Viewer\n` +
        `  on the GA4 property (Admin → Property Access Management).`
    );
  }
  return (await res.json()).access_token;
}

/** Exchange the stored refresh token for a short-lived access token. */
async function tokenFromRefreshToken({ clientId, clientSecret, refreshToken }) {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });
  if (!res.ok) {
    fail(
      `Token refresh failed (${res.status}): ${await res.text()}\n` +
        `  If the token was revoked, re-run: node scripts/ga-auth.mjs`
    );
  }
  return (await res.json()).access_token;
}

async function runReport(token, propertyId, body) {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) fail(`GA4 report failed (${res.status}): ${await res.text()}`);
  return res.json();
}

const rows = (r) =>
  (r.rows || []).map((row) => ({
    ...Object.fromEntries((row.dimensionValues || []).map((d, i) => [r.dimensionHeaders[i].name, d.value])),
    ...Object.fromEntries((row.metricValues || []).map((m, i) => [r.metricHeaders[i].name, Number(m.value)])),
  }));

// ── main ──────────────────────────────────────────────────────────────────────
const days = Number(process.argv[2] || 7);
const env = { ...loadEnv(ENV_FILE), ...process.env };

const propertyId = env.GA4_PROPERTY_ID;
if (!propertyId) {
  fail(
    `GA4_PROPERTY_ID missing from ${ENV_FILE}.\n` +
      `  GA4 → Admin → Property Settings. It is the NUMERIC id, not G-XXXXXXX.`
  );
}

// Two supported auth paths. Service account wins if a key file is configured.
let token;
if (env.GA4_SA_KEY_FILE) {
  let sa;
  try {
    sa = JSON.parse(readFileSync(resolve(process.cwd(), env.GA4_SA_KEY_FILE), 'utf8'));
  } catch {
    fail(`Cannot read the service-account key at ${env.GA4_SA_KEY_FILE}`);
  }
  console.log(`\nAuth: service account (${sa.client_email})`);
  token = await tokenFromServiceAccount(sa);
} else if (env.GA4_REFRESH_TOKEN) {
  console.log('\nAuth: OAuth refresh token');
  token = await tokenFromRefreshToken({
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    refreshToken: env.GA4_REFRESH_TOKEN,
  });
} else {
  fail(
    `No GA4 credentials in ${ENV_FILE}. Pick one:\n\n` +
      `  Service account:  GA4_SA_KEY_FILE=./ga-service-account.json\n` +
      `  OAuth:            run node scripts/ga-auth.mjs`
  );
}

const dateRanges = [{ startDate: `${days}daysAgo`, endDate: 'today' }];
// Exclude local development traffic. Until 2026-07-29 the dev server loaded
// GA4, so historical data contains localhost sessions — roughly half the rows,
// all unattributed with 0% engagement. GA4 cannot delete them retroactively,
// but they can be filtered out of every report.
const EXCLUDE_LOCAL = {
  notExpression: {
    filter: {
      fieldName: 'hostName',
      stringFilter: { matchType: 'FULL_REGEXP', value: '(localhost|127\\.0\\.0\\.1|.*\\.local)' },
    },
  },
};

const q = (dimensions, metrics, extra = {}) =>
  runReport(token, propertyId, {
    dateRanges,
    dimensions: dimensions.map((name) => ({ name })),
    metrics: metrics.map((name) => ({ name })),
    dimensionFilter: EXCLUDE_LOCAL,
    limit: 100,
    ...extra,
  });

console.log(`\nGA4 property ${propertyId} · last ${days} days\n`);

const [overview, byEvent, byPage, bySource, byKeyword, byLanding] = await Promise.all([
  q([], ['sessions', 'activeUsers', 'engagedSessions', 'engagementRate', 'averageSessionDuration', 'bounceRate']),
  q(['eventName'], ['eventCount', 'totalUsers']),
  q(['pagePath'], ['screenPageViews', 'userEngagementDuration']),
  q(['sessionSource', 'sessionMedium'], ['sessions', 'engagementRate']),
  q(['sessionManualTerm'], ['sessions', 'engagementRate']),
  q(['landingPagePlusQueryString'], ['sessions', 'bounceRate', 'engagementRate']),
]);

const report = {
  generatedAt: new Date().toISOString(),
  propertyId,
  windowDays: days,
  overview: rows(overview)[0] || {},
  events: rows(byEvent).sort((a, b) => b.eventCount - a.eventCount),
  pages: rows(byPage).sort((a, b) => b.screenPageViews - a.screenPageViews),
  sources: rows(bySource).sort((a, b) => b.sessions - a.sessions),
  keywords: rows(byKeyword).sort((a, b) => b.sessions - a.sessions),
  landingPages: rows(byLanding).sort((a, b) => b.sessions - a.sessions),
};

mkdirSync(resolve(process.cwd(), OUT_DIR), { recursive: true });
const stamp = new Date().toISOString().slice(0, 10);
const out = `${OUT_DIR}/ga4-${stamp}.json`;
writeFileSync(resolve(process.cwd(), out), JSON.stringify(report, null, 2));

const o = report.overview;
console.log(`  sessions        ${o.sessions ?? 0}`);
console.log(`  engaged         ${o.engagedSessions ?? 0} (${((o.engagementRate ?? 0) * 100).toFixed(1)}%)`);
console.log(`  avg duration    ${Math.round(o.averageSessionDuration ?? 0)}s`);
console.log(`\n  top events:`);
for (const e of report.events.slice(0, 12)) {
  console.log(`    ${String(e.eventCount).padStart(6)}  ${e.eventName}`);
}
console.log(`\n✔ written to ${out}\n`);
