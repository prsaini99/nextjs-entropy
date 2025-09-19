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