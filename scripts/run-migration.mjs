#!/usr/bin/env node
/**
 * Run a .sql migration against Supabase via the Management API.
 *
 * Usage:
 *   node scripts/run-migration.mjs migrations/2026-07-28-add-click-ids.sql
 *   node scripts/run-migration.mjs migrations/foo.sql --dry-run
 *
 * Credentials come from .env.local — never from the command line, so the token
 * stays out of shell history and scrollback:
 *
 *   SUPABASE_ACCESS_TOKEN=sbp_...        # Dashboard → Account → Access Tokens
 *
 * The project ref is derived from NEXT_PUBLIC_SUPABASE_URL automatically.
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ENV_FILE = '.env.local';
const API = 'https://api.supabase.com';

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
    if (!m) continue;
    env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
  return env;
}

function fail(msg) {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
}

const [, , sqlPath, ...flags] = process.argv;
if (!sqlPath) fail('Usage: node scripts/run-migration.mjs <path-to.sql> [--dry-run]');

const dryRun = flags.includes('--dry-run');
const env = { ...loadEnv(ENV_FILE), ...process.env };

const url = env.NEXT_PUBLIC_SUPABASE_URL || '';
const ref = url.match(/^https:\/\/([a-z0-9]+)\.supabase\.co/i)?.[1];

let sql;
try {
  sql = readFileSync(resolve(process.cwd(), sqlPath), 'utf8');
} catch {
  fail(`Cannot read ${sqlPath}`);
}

console.log(`\nProject : ${ref || '(not resolved)'}`);
console.log(`File    : ${sqlPath}`);
console.log(`Bytes   : ${sql.length}`);

// Dry run needs neither a token nor a project ref — it sends nothing.
if (dryRun) {
  console.log('\n--- dry run, nothing sent ---\n');
  console.log(sql);
  process.exit(0);
}

const token = env.SUPABASE_ACCESS_TOKEN;
if (!token) {
  fail(
    `SUPABASE_ACCESS_TOKEN not found.\n\n` +
      `  1. Supabase Dashboard → Account → Access Tokens → generate one\n` +
      `  2. Add to ${ENV_FILE}:  SUPABASE_ACCESS_TOKEN=sbp_...\n` +
      `  3. Confirm ${ENV_FILE} is gitignored (it is, in this repo)`
  );
}

if (!ref) fail(`Could not derive the project ref from NEXT_PUBLIC_SUPABASE_URL ("${url}").`);

const res = await fetch(`${API}/v1/projects/${ref}/database/query`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: sql }),
});

const text = await res.text();

if (!res.ok) {
  // Never echo the token, even on failure.
  fail(`Supabase returned ${res.status}\n${text}`);
}

console.log(`\n✔ Applied.\n`);
if (text && text !== '[]') console.log(text);
