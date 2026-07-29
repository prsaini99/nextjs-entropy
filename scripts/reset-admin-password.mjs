#!/usr/bin/env node
/**
 * Set a new password for a Supabase Auth user.
 *
 *   node scripts/reset-admin-password.mjs prateek@stackbinary.io
 *
 * The password is typed at an interactive prompt with echo disabled — it never
 * appears in argv, in shell history, or in any log. Credentials are read from
 * .env.local (SUPABASE_SERVICE_ROLE_KEY), never passed on the command line.
 *
 * This updates the existing user. It does not delete or recreate anything, so
 * the user id, created_at and any rows referencing the account stay intact.
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createInterface } from 'node:readline';

const ENV_FILE = '.env.local';

function loadEnv(file) {
  const env = {};
  let raw;
  try {
    raw = readFileSync(resolve(process.cwd(), file), 'utf8');
  } catch {
    return env;
  }
  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m) env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
  return env;
}

function fail(msg) {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
}

/** Reads a line from stdin without echoing it to the terminal. */
function promptHidden(question) {
  return new Promise((res) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    const onData = (char) => {
      if ([`\n`, `\r`, ``].includes(char.toString('utf8'))) {
        process.stdin.removeListener('data', onData);
      } else {
        // Repaint the prompt so the characters never render.
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(question);
      }
    };
    process.stdin.on('data', onData);
    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write('\n');
      res(answer);
    });
  });
}

const email = process.argv[2];
if (!email) fail('Usage: node scripts/reset-admin-password.mjs <email>');

const env = { ...loadEnv(ENV_FILE), ...process.env };
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url) fail(`NEXT_PUBLIC_SUPABASE_URL not found in ${ENV_FILE}`);
if (!key) fail(`SUPABASE_SERVICE_ROLE_KEY not found in ${ENV_FILE}`);

const headers = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };

// Find the user by email.
const listRes = await fetch(`${url}/auth/v1/admin/users?per_page=200`, { headers });
if (!listRes.ok) fail(`Could not list users (${listRes.status}). Is the service_role key correct?`);

const { users = [] } = await listRes.json();
const user = users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
if (!user) fail(`No user found with email ${email}. Existing: ${users.map((u) => u.email).join(', ')}`);

console.log(`\nUser   : ${user.email}`);
console.log(`Id     : ${user.id}`);
console.log(`Created: ${user.created_at}`);

const pw = await promptHidden('\nNew password (input hidden): ');
if (pw.length < 12) {
  fail(
    'Use at least 12 characters.\n' +
      '  This account can read every lead in your database — names, emails and\n' +
      '  phone numbers — so it is in DPDP scope. Prefer a password-manager-generated\n' +
      "  string; you won't be typing it often."
  );
}

const confirm = await promptHidden('Confirm password           : ');
if (pw !== confirm) fail('Passwords did not match. Nothing was changed.');

const res = await fetch(`${url}/auth/v1/admin/users/${user.id}`, {
  method: 'PUT',
  headers,
  body: JSON.stringify({ password: pw }),
});

if (!res.ok) {
  const body = await res.text();
  // Never echo the password or the key, even on failure.
  fail(`Supabase returned ${res.status}\n${body}`);
}

console.log(`\n✔ Password updated for ${user.email}.`);
console.log('  Store it in your password manager — it is not saved anywhere else.\n');
