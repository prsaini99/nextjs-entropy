import { NextResponse } from 'next/server';
import { isAdminEmail } from '@/lib/admins';

/**
 * Structural auth gate for the admin API.
 *
 * Why this exists rather than another per-route check: authorisation used to be
 * opt-in, and six of eight routes under /api/admin never opted in — including
 * /api/admin/export, which returns the whole leads table as CSV/XLSX through
 * supabaseAdmin (service role, RLS bypassed). A missing verifyAuth call looks
 * identical to a route that legitimately doesn't need one, so the omission was
 * invisible in review.
 *
 * Middleware inverts the default. Every request to /api/admin/* is now denied
 * unless it carries a valid Supabase session belonging to an allowlisted admin,
 * and that holds for routes nobody has written yet.
 *
 * Runs on the Edge runtime, so: plain fetch only, no Supabase SDK, no Node APIs.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function deny(reason, status = 401) {
  return NextResponse.json({ error: 'Unauthorized', reason }, { status });
}

export async function middleware(request) {
  // Fail closed. A misconfigured deployment must not silently serve lead data.
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('[middleware] Supabase env vars missing — denying admin API');
    return deny('Server misconfigured', 500);
  }

  const authHeader = request.headers.get('authorization') || '';
  if (!authHeader.startsWith('Bearer ')) {
    return deny('Missing bearer token');
  }

  const token = authHeader.slice(7).trim();
  if (!token) return deny('Empty bearer token');

  let user;
  try {
    // Verify against Supabase directly. The token is opaque to us; only the
    // auth server can say whether it is live, unexpired and un-revoked.
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: SUPABASE_ANON_KEY,
      },
      cache: 'no-store',
    });

    if (!res.ok) return deny('Invalid or expired session');
    user = await res.json();
  } catch (err) {
    // Network failure reaching the auth server is not permission to proceed.
    console.error('[middleware] auth verification failed:', err);
    return deny('Authentication unavailable', 503);
  }

  if (!isAdminEmail(user?.email)) {
    return deny('Not an admin');
  }

  // Pass the verified identity downstream so routes need not re-verify.
  // Set on a fresh header set derived from the request, so any inbound header
  // of the same name from the client is overwritten rather than trusted.
  const headers = new Headers(request.headers);
  headers.set('x-admin-email', user.email);

  return NextResponse.next({ request: { headers } });
}

export const config = {
  // Only the admin API. Admin *pages* are client-rendered and hold no data of
  // their own — every byte they display comes from these routes, so gating the
  // API is what actually protects the data.
  matcher: ['/api/admin/:path*'],
};
