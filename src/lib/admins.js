/**
 * The admin allowlist, in one place.
 *
 * Deliberately its own module with no imports: middleware.js runs on the Edge
 * runtime, so anything it pulls in must avoid Node APIs and the Supabase client.
 * Importing lib/auth-check.js here would drag in lib/supabase.js and its client
 * construction, which is exactly what an edge bundle should not carry.
 */
export const ADMIN_EMAILS = [
  'prateek@stackbinary.io',
];

export function isAdminEmail(email) {
  if (!email) return false;
  return ADMIN_EMAILS.includes(String(email).toLowerCase());
}
