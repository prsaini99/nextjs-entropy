import { supabase } from './supabase';
import { isAdminEmail } from './admins';

export async function verifyAuth(request) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return {
        authenticated: false,
        error: 'No authorization header',
        user: null
      };
    }

    // Extract token
    const token = authHeader.replace('Bearer ', '');
    
    if (!token) {
      return {
        authenticated: false,
        error: 'No token provided',
        user: null
      };
    }

    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return {
        authenticated: false,
        error: error?.message || 'Invalid token',
        user: null
      };
    }

    // Allowlist lives in lib/admins.js so middleware.js and this check can never
    // drift apart. isAdminEmail also normalises case — the previous inline
    // Array.includes was case-sensitive, so Prateek@… would have been rejected.
    if (!isAdminEmail(user.email)) {
      return {
        authenticated: false,
        error: 'User is not an admin',
        user: null
      };
    }

    return {
      authenticated: true,
      error: null,
      user: user
    };
    
  } catch (error) {
    console.error('Auth verification error:', error);
    return {
      authenticated: false,
      error: 'Authentication failed',
      user: null
    };
  }
}