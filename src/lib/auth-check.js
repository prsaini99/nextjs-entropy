import { supabase } from './supabase';

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

    // Optional: Check if user is admin (you can add custom logic here)
    // For example, check if user email is in allowed admin list
    const ADMIN_EMAILS = [
      'prateek@stackbinary.io',
      // Add other admin emails here
    ];

    const isAdmin = ADMIN_EMAILS.includes(user.email);
    
    if (!isAdmin) {
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