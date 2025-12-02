import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
  const debugInfo = {
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT_SET',
      supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT_SET',
      runtime: 'nodejs', // This will show if we're using edge runtime
    },
    tests: {},
    errors: []
  };

  try {
    // Test 1: Check Supabase connection
    console.log('Testing Supabase connection...');
    const { data: connectionTest, error: connectionError } = await supabase
      .from('leads')
      .select('count', { count: 'exact' })
      .limit(1);

    debugInfo.tests.supabaseConnection = {
      success: !connectionError,
      error: connectionError?.message || null,
      data: connectionTest
    };

    if (connectionError) {
      debugInfo.errors.push(`Supabase connection: ${connectionError.message}`);
    }

    // Test 2: Try to fetch actual leads data
    console.log('Testing leads query...');
    const { data: leadsData, error: leadsError } = await supabase
      .from('leads')
      .select('id, status, created_at, full_name')
      .limit(5);

    debugInfo.tests.leadsQuery = {
      success: !leadsError,
      error: leadsError?.message || null,
      count: leadsData?.length || 0,
      data: leadsData?.slice(0, 3) || [] // Only show first 3 for debugging
    };

    if (leadsError) {
      debugInfo.errors.push(`Leads query: ${leadsError.message}`);
    }

    // Test 3: Try career applications
    console.log('Testing career applications query...');
    const { data: appsData, error: appsError } = await supabase
      .from('career_applications')
      .select('id, status, created_at')
      .limit(5);

    debugInfo.tests.careerApplicationsQuery = {
      success: !appsError,
      error: appsError?.message || null,
      count: appsData?.length || 0,
      data: appsData?.slice(0, 3) || []
    };

    if (appsError) {
      debugInfo.errors.push(`Career applications: ${appsError.message}`);
    }

    // Test 4: Check if tables exist
    console.log('Checking table schemas...');
    const { data: tablesData, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', ['leads', 'career_applications']);

    debugInfo.tests.tablesExist = {
      success: !tablesError,
      error: tablesError?.message || null,
      tables: tablesData?.map(t => t.table_name) || []
    };

  } catch (error) {
    console.error('Debug dashboard error:', error);
    debugInfo.errors.push(`Global error: ${error.message}`);
  }

  return NextResponse.json(debugInfo);
}