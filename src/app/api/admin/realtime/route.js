import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const metric = searchParams.get('metric') || 'dashboard'; // dashboard, alerts, activity, live-funnel

    switch (metric) {
      case 'dashboard':
        return NextResponse.json(await getDashboardMetrics());
      case 'alerts':
        return NextResponse.json(await getSystemAlerts());
      case 'activity':
        return NextResponse.json(await getLiveActivity());
      case 'live-funnel':
        return NextResponse.json(await getLiveFunnel());
      case 'performance':
        return NextResponse.json(await getPerformanceMetrics());
      default:
        return NextResponse.json(await getDashboardMetrics());
    }

  } catch (error) {
    console.error('Error in real-time API:', error);
    return NextResponse.json(
      { error: 'Real-time data fetch failed' },
      { status: 500 }
    );
  }
}

async function getDashboardMetrics() {
  // Get real-time metrics from database function
  const { data: metrics, error } = await supabase
    .rpc('real_time_metrics');

  if (error) {
    console.error('Error getting real-time metrics:', error);
    return { error: 'Failed to fetch metrics' };
  }

  // Get additional live data
  const [
    { data: recentLeads },
    { data: todayStats },
    { data: activeAlerts }
  ] = await Promise.all([
    supabase
      .from('leads')
      .select('id, full_name, created_at, status, lead_score')
      .order('created_at', { ascending: false })
      .limit(5),
    
    supabase
      .from('leads')
      .select('status, lead_score, estimated_value')
      .gte('created_at', new Date().toISOString().split('T')[0]),
    
    getActiveAlerts()
  ]);

  // Process today's stats
  const todayMetrics = {
    total_today: todayStats?.length || 0,
    avg_score_today: todayStats?.length > 0 ? 
      (todayStats.reduce((sum, lead) => sum + (lead.lead_score || 0), 0) / todayStats.length).toFixed(1) : '0',
    pipeline_value_today: todayStats?.reduce((sum, lead) => sum + (lead.estimated_value || 0), 0) || 0,
    new_leads_today: todayStats?.filter(l => l.status === 'new').length || 0,
    qualified_today: todayStats?.filter(l => l.status === 'qualified').length || 0,
  };

  return {
    real_time_metrics: metrics || [],
    today_metrics: todayMetrics,
    recent_leads: recentLeads || [],
    active_alerts: activeAlerts,
    last_updated: new Date().toISOString(),
    server_time: new Date().toLocaleString(),
  };
}

async function getSystemAlerts() {
  const alerts = [];
  
  try {
    // Check for high-value leads needing attention
    const { data: highValueLeads } = await supabase
      .from('leads')
      .select('id, full_name, estimated_value, status, created_at')
      .gte('estimated_value', 50000)
      .eq('status', 'new')
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    if (highValueLeads?.length > 0) {
      alerts.push({
        type: 'high_value_leads',
        priority: 'high',
        title: `${highValueLeads.length} High-Value Leads Need Attention`,
        message: `You have ${highValueLeads.length} new leads with estimated value ≥ $50K`,
        count: highValueLeads.length,
        action_url: '/admin/leads?filter=high_value',
        created_at: new Date().toISOString()
      });
    }

    // Check for stale leads
    const { data: staleLeads } = await supabase
      .from('leads')
      .select('id, full_name, status, updated_at')
      .in('status', ['new', 'contacted'])
      .lt('updated_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    if (staleLeads?.length > 0) {
      alerts.push({
        type: 'stale_leads',
        priority: 'medium',
        title: `${staleLeads.length} Stale Leads Found`,
        message: `${staleLeads.length} leads haven't been updated in over 7 days`,
        count: staleLeads.length,
        action_url: '/admin/leads?filter=stale',
        created_at: new Date().toISOString()
      });
    }

    // Check for low conversion rate campaigns
    const { data: campaigns } = await supabase
      .from('campaign_performance')
      .select('utm_source, utm_campaign, conversion_rate, total_leads')
      .gte('total_leads', 10)
      .lt('conversion_rate', 5);

    if (campaigns?.length > 0) {
      alerts.push({
        type: 'low_conversion_campaigns',
        priority: 'medium',
        title: `${campaigns.length} Campaigns with Low Conversion`,
        message: `${campaigns.length} campaigns have conversion rates below 5%`,
        count: campaigns.length,
        action_url: '/admin/analytics?type=campaigns',
        created_at: new Date().toISOString()
      });
    }

    // Check for unusual activity patterns
    const now = new Date();
    const currentHour = now.getHours();
    const { data: currentHourLeads } = await supabase
      .from('leads')
      .select('id')
      .gte('created_at', new Date(now.setMinutes(0, 0, 0)).toISOString())
      .lt('created_at', new Date(now.setHours(currentHour + 1, 0, 0, 0)).toISOString());

    // Get average for this hour over past 30 days
    const { data: historicalHourData } = await supabase
      .from('activity_patterns')
      .select('lead_count')
      .eq('hour_of_day', currentHour)
      .gte('date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    if (historicalHourData?.length > 0 && currentHourLeads?.length > 0) {
      const avgHourlyLeads = historicalHourData.reduce((sum, d) => sum + d.lead_count, 0) / historicalHourData.length;
      if (currentHourLeads.length > avgHourlyLeads * 2) {
        alerts.push({
          type: 'traffic_spike',
          priority: 'high',
          title: 'Unusual Traffic Spike Detected',
          message: `Current hour has ${currentHourLeads.length} leads vs average ${avgHourlyLeads.toFixed(1)}`,
          count: currentHourLeads.length,
          action_url: '/admin/analytics?type=activity',
          created_at: new Date().toISOString()
        });
      }
    }

  } catch (error) {
    console.error('Error generating alerts:', error);
  }

  return {
    alerts: alerts.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }),
    alert_count: alerts.length,
    last_checked: new Date().toISOString()
  };
}

async function getLiveActivity() {
  // Get recent activities (last hour)
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  
  const [
    { data: recentLeads },
    { data: statusUpdates },
    { data: recentCareerApps }
  ] = await Promise.all([
    supabase
      .from('leads')
      .select('id, full_name, service, utm_source, created_at, lead_score')
      .gte('created_at', oneHourAgo.toISOString())
      .order('created_at', { ascending: false }),
    
    supabase
      .from('leads')
      .select('id, full_name, status, updated_at')
      .gte('updated_at', oneHourAgo.toISOString())
      .neq('created_at', supabase.raw('updated_at'))
      .order('updated_at', { ascending: false }),
    
    supabase
      .from('career_applications')
      .select('id, first_name, last_name, job_title, created_at')
      .gte('created_at', oneHourAgo.toISOString())
      .order('created_at', { ascending: false })
  ]);

  const activities = [];
  
  // Add lead activities
  recentLeads?.forEach(lead => {
    activities.push({
      type: 'new_lead',
      title: 'New Lead',
      description: `${lead.full_name} submitted inquiry for ${lead.service}`,
      details: {
        lead_id: lead.id,
        source: lead.utm_source || 'Direct',
        score: lead.lead_score
      },
      timestamp: lead.created_at,
      priority: lead.lead_score >= 80 ? 'high' : 'normal'
    });
  });

  // Add status updates
  statusUpdates?.forEach(update => {
    activities.push({
      type: 'status_update',
      title: 'Lead Status Updated',
      description: `${update.full_name} status changed to ${update.status}`,
      details: {
        lead_id: update.id,
        new_status: update.status
      },
      timestamp: update.updated_at,
      priority: update.status === 'won' ? 'high' : 'normal'
    });
  });

  // Add career applications
  recentCareerApps?.forEach(app => {
    activities.push({
      type: 'career_application',
      title: 'New Job Application',
      description: `${app.first_name} ${app.last_name} applied for ${app.job_title}`,
      details: {
        application_id: app.id,
        position: app.job_title
      },
      timestamp: app.created_at,
      priority: 'normal'
    });
  });

  // Sort by timestamp
  activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return {
    activities: activities.slice(0, 20), // Limit to 20 most recent
    activity_count: activities.length,
    time_window: '1 hour',
    last_updated: new Date().toISOString()
  };
}

async function getLiveFunnel() {
  const { data: funnelData, error } = await supabase
    .from('lead_funnel')
    .select('*')
    .order('stage_order');

  if (error) {
    console.error('Error getting live funnel:', error);
    return { error: 'Failed to get funnel data' };
  }

  // Get today's funnel data
  const today = new Date().toISOString().split('T')[0];
  const { data: todayLeads } = await supabase
    .from('leads')
    .select('status')
    .gte('created_at', today);

  const todayFunnel = {
    total: todayLeads?.length || 0,
    new: todayLeads?.filter(l => l.status === 'new').length || 0,
    contacted: todayLeads?.filter(l => l.status === 'contacted').length || 0,
    qualified: todayLeads?.filter(l => l.status === 'qualified').length || 0,
    proposal_sent: todayLeads?.filter(l => l.status === 'proposal_sent').length || 0,
    won: todayLeads?.filter(l => l.status === 'won').length || 0,
  };

  return {
    overall_funnel: funnelData || [],
    today_funnel: todayFunnel,
    last_updated: new Date().toISOString()
  };
}

async function getPerformanceMetrics() {
  // Database performance metrics
  const startTime = Date.now();
  
  try {
    // Test query performance
    await supabase
      .from('leads')
      .select('count(*)')
      .limit(1);
    
    const queryTime = Date.now() - startTime;
    
    // Get system stats
    const [
      { data: totalLeads },
      { data: totalCampaigns },
      { data: recentActivity }
    ] = await Promise.all([
      supabase.from('leads').select('count(*)'),
      supabase.from('campaign_performance').select('count(*)'),
      supabase
        .from('leads')
        .select('id')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    ]);

    return {
      database: {
        query_time_ms: queryTime,
        status: queryTime < 100 ? 'healthy' : queryTime < 500 ? 'warning' : 'slow',
        total_records: {
          leads: totalLeads?.[0]?.count || 0,
          campaigns: totalCampaigns?.[0]?.count || 0
        }
      },
      activity: {
        last_24h_leads: recentActivity?.length || 0,
        avg_per_hour: recentActivity?.length ? (recentActivity.length / 24).toFixed(1) : '0'
      },
      api: {
        response_time_ms: Date.now() - startTime,
        timestamp: new Date().toISOString()
      }
    };

  } catch (error) {
    return {
      database: {
        status: 'error',
        error: error.message
      },
      timestamp: new Date().toISOString()
    };
  }
}

async function getActiveAlerts() {
  // This would typically come from a system alerts table
  // For now, we'll return a simple structure
  return [];
}