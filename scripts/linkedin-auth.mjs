#!/usr/bin/env node
/**
 * One-time (every ~60 days) LinkedIn OAuth helper.
 *
 * Prereq: a LinkedIn app (linkedin.com/developers) with products
 * "Share on LinkedIn" + "Sign In with LinkedIn using OpenID Connect",
 * and redirect URL http://localhost:8919/callback added in the Auth tab.
 *
 * Usage:
 *   LINKEDIN_CLIENT_ID=... LINKEDIN_CLIENT_SECRET=... node scripts/linkedin-auth.mjs
 *
 * Opens the approval URL, catches the redirect locally, prints the access
 * token + expiry, and the exact gh command to store it.
 */

import http from "node:http";
import { exec } from "node:child_process";

const { LINKEDIN_CLIENT_ID: ID, LINKEDIN_CLIENT_SECRET: SECRET } = process.env;
if (!ID || !SECRET) {
  console.error("Set LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET (from your app's Auth tab).");
  process.exit(1);
}

const REDIRECT = "http://localhost:8919/callback";
const SCOPES = "openid profile w_member_social";
const state = Math.random().toString(36).slice(2);
const authUrl =
  `https://www.linkedin.com/oauth/v2/authorization?response_type=code` +
  `&client_id=${ID}&redirect_uri=${encodeURIComponent(REDIRECT)}` +
  `&state=${state}&scope=${encodeURIComponent(SCOPES)}`;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost:8919");
  if (url.pathname !== "/callback") return res.end();
  const code = url.searchParams.get("code");
  res.end("<h2>Done — you can close this tab and return to the terminal.</h2>");
  server.close();

  const tok = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: ID,
      client_secret: SECRET,
      redirect_uri: REDIRECT,
    }),
  });
  const data = await tok.json();
  if (!data.access_token) {
    console.error("Token exchange failed:", JSON.stringify(data));
    process.exit(1);
  }
  const days = Math.round(data.expires_in / 86400);
  const expiry = new Date(Date.now() + data.expires_in * 1000).toISOString().slice(0, 10);
  console.log(`\nAccess token acquired ✓  (valid ${days} days, until ${expiry})\n`);
  console.log(`Store it for the workflows:\n`);
  console.log(`  gh secret set LINKEDIN_ACCESS_TOKEN --body "${data.access_token}"\n`);
  console.log(`Set a reminder to re-run this before ${expiry}.`);
  process.exit(0);
});

server.listen(8919, () => {
  console.log("Opening LinkedIn approval page… approve as Prateek.\n");
  console.log(authUrl + "\n");
  exec(`open "${authUrl}"`);
});
