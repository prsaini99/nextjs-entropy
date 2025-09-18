import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client that bypasses RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Log environment variables during deployment/build
console.log('=== DEPLOYMENT ENV CHECK ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('NEXT_PUBLIC_SUPABASE_URL exists:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
console.log('EMAIL exists:', !!process.env.EMAIL);
console.log('EMAIL_PASSWORD exists:', !!process.env.EMAIL_PASSWORD);
console.log('SUPABASE_SERVICE_ROLE_KEY length:', process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0);
console.log('All env keys:', Object.keys(process.env).filter(key => 
  key.includes('SUPABASE') || key.includes('EMAIL')
));
console.log('=== END ENV CHECK ===');

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.warn('Supabase admin client not configured. Service role key required for admin operations.')
}

export const supabaseAdmin = createClient(
  supabaseUrl || '',
  supabaseServiceRoleKey || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)