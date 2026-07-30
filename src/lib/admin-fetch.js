import { supabase } from './supabase';

/**
 * Fetch utility for admin API endpoints that includes authentication
 */
export async function adminFetch(url, options = {}) {
  // Get auth token from Supabase session
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;

  // Add auth header to the request
  const headers = {
    ...options.headers,
    'Authorization': token ? `Bearer ${token}` : '',
  };

  // Make the request with auth headers
  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle 401 Unauthorized - redirect to login
  if (response.status === 401) {
    // Clear session and redirect to login
    await supabase.auth.signOut();
    window.location.href = '/admin/dashboard'; // Will redirect to login
  }

  return response;
}

/**
 * Convenience method for GET requests
 */
export async function adminGet(url) {
  return adminFetch(url, { method: 'GET' });
}

/**
 * Convenience method for POST requests
 */
export async function adminPost(url, data) {
  return adminFetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

/**
 * Convenience method for PUT requests
 */
export async function adminPut(url, data) {
  return adminFetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

/**
 * Convenience method for DELETE requests
 */
export async function adminDelete(url) {
  return adminFetch(url, { method: 'DELETE' });
}

/**
 * Authenticated file download.
 *
 * The export button used to call window.open('/api/admin/export?…'), which is a
 * plain navigation — it cannot attach an Authorization header, so the route had
 * to be left unauthenticated for the button to work. That is how the leads table
 * ended up downloadable by anyone who knew the URL.
 *
 * Fetching with credentials and turning the response into a blob keeps a single
 * header-based auth scheme across every admin call, with no token in the URL.
 */
export async function adminDownload(url, fallbackName = 'export') {
  const response = await adminFetch(url, { method: 'GET' });
  if (!response.ok) {
    throw new Error(`Download failed (${response.status})`);
  }

  const blob = await response.blob();

  // Prefer the server's filename; it already sets Content-Disposition.
  const disposition = response.headers.get('Content-Disposition') || '';
  const match = disposition.match(/filename="?([^";]+)"?/);
  const filename = match ? match[1] : fallbackName;

  const href = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(href);
}