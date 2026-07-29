#!/usr/bin/env node
/**
 * One-time Google OAuth helper for the GA4 Data API.
 *
 * Why OAuth and not a service account: Google now enforces the
 * `iam.disableServiceAccountKeyCreation` org policy by default, which blocks
 * downloading JSON keys. That policy is correct — service-account keys are
 * long-lived secrets on disk. A user refresh token is better here anyway:
 * it inherits your existing GA4 permissions (no extra property grant needed),
 * and you can revoke it from myaccount.google.com/permissions.
 *
 * ── Setup ─────────────────────────────────────────────────────────────────────
 * 1. Google Cloud Console → APIs & Services → Library → enable
 *    "Google Analytics Data API"
 * 2. APIs & Services → OAuth consent screen → External → add yourself as a
 *    Test user (no verification needed for personal use)
 * 3. APIs & Services → Credentials → Create credentials → OAuth client ID
 *    → Application type: **Desktop app**
 *    (Desktop clients are NOT blocked by the service-account key policy)
 * 4. Copy the client ID and secret, then run:
 *
 *      GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=... node scripts/ga-auth.mjs
 *
 * It opens the consent screen, catches the redirect, and prints the two lines
 * to paste into .env.local.
 */

import http from 'node:http';
import { exec } from 'node:child_process';

const ID = process.env.GOOGLE_CLIENT_ID;
const SECRET = process.env.GOOGLE_CLIENT_SECRET;
const PORT = 8920;
const REDIRECT = `http://localhost:${PORT}/callback`;
const SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';

if (!ID || !SECRET) {
  console.error(
    '\n✖ Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.\n\n' +
      '  Cloud Console → APIs & Services → Credentials → Create credentials\n' +
      '  → OAuth client ID → Application type: Desktop app\n\n' +
      '  Then:\n' +
      '    GOOGLE_CLIENT_ID=... GOOGLE_CLIENT_SECRET=... node scripts/ga-auth.mjs\n'
  );
  process.exit(1);
}

const authUrl =
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    client_id: ID,
    redirect_uri: REDIRECT,
    response_type: 'code',
    scope: SCOPE,
    access_type: 'offline', // required to receive a refresh_token
    prompt: 'consent', // force a refresh_token even on re-auth
  });

const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith('/callback')) {
    res.writeHead(404).end();
    return;
  }

  const code = new URL(req.url, `http://localhost:${PORT}`).searchParams.get('code');
  if (!code) {
    res.writeHead(400).end('No code returned.');
    return;
  }

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: ID,
      client_secret: SECRET,
      redirect_uri: REDIRECT,
      grant_type: 'authorization_code',
    }),
  });

  const data = await tokenRes.json();

  if (!tokenRes.ok || !data.refresh_token) {
    res.writeHead(500).end('Token exchange failed. Check the terminal.');
    console.error('\n✖ Token exchange failed:\n', JSON.stringify(data, null, 2));
    server.close();
    process.exit(1);
  }

  res.writeHead(200, { 'Content-Type': 'text/html' }).end(
    '<h2>Done.</h2><p>Refresh token issued. Return to your terminal.</p>'
  );

  console.log('\n✔ Authorised. Add these to .env.local:\n');
  console.log(`GOOGLE_CLIENT_ID=${ID}`);
  console.log(`GOOGLE_CLIENT_SECRET=${SECRET}`);
  console.log(`GA4_REFRESH_TOKEN=${data.refresh_token}`);
  console.log(`GA4_PROPERTY_ID=          # GA4 → Admin → Property Settings (numeric)\n`);
  console.log('Then: node scripts/ga-report.mjs 7\n');

  server.close();
  process.exit(0);
});

server.listen(PORT, () => {
  console.log(`\nOpening Google consent screen…`);
  console.log(`If it doesn't open, paste this into a browser:\n\n${authUrl}\n`);
  exec(`open "${authUrl}"` );
});
