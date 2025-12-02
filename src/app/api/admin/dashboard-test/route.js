import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(request) {
  try {
    console.log('Testing dashboard without auth...');
    
    // Test basic connection
    const { data: leads, error: leadsError } = await supabaseAdmin
      .from('leads')
      .select('id, full_name, status, created_at')
      .limit(5);

    if (leadsError) {
      console.error('Leads error:', leadsError);
      return NextResponse.json({ 
        error: 'Database error', 
        details: leadsError.message,
        data: null 
      });
    }

    console.log('Found leads:', leads?.length);

    // Return simple data
    const dashboardData = {
      summary: {
        leads: {
          total: leads?.length || 0,
          new: leads?.filter(l => l.status === 'new').length || 0,
          contacted: leads?.filter(l => l.status === 'contacted').length || 0,
          qualified: leads?.filter(l => l.status === 'qualified').length || 0,
          won: leads?.filter(l => l.status === 'won').length || 0,
        },
        recent_counts: {
          last_7_days: leads?.length || 0,
          last_30_days: leads?.length || 0,
        },
        conversion_rates: {
          overall_conversion: '0.0',
          lead_to_qualified: '0.0',
        },
        pipeline_value: {
          active: 0,
          won: 0,
          currency: 'INR',
        },
      },
      lead_quality: {
        high: 0,
        medium: 0,
        low: 0,
      },
      recent_activities: leads?.map(lead => ({
        type: 'lead',
        id: lead.id,
        title: `New lead: ${lead.full_name}`,
        description: 'Test lead',
        timestamp: lead.created_at,
        status: lead.status,
      })) || [],
      alerts: [],
    };

    return NextResponse.json(dashboardData);

  } catch (error) {
    console.error('Dashboard test error:', error);
    return NextResponse.json({
      error: 'Server error',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}