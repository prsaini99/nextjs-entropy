import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // Get overall lead stats
    const { data: leadStats, error: leadStatsError } = await supabase
      .rpc('get_lead_stats', { days_back: parseInt(period) });

    if (leadStatsError) {
      console.error('Error getting lead stats:', leadStatsError);
    }

    // Get leads by status
    const { data: leadsByStatus, error: statusError } = await supabase
      .from('leads')
      .select('status')
      .gte('created_at', startDate.toISOString());

    if (statusError) {
      console.error('Error getting leads by status:', statusError);
    }

    // Get UTM performance
    const { data: utmData, error: utmError } = await supabase
      .from('leads')
      .select('utm_source, utm_medium, utm_campaign, status, lead_score, created_at')
      .gte('created_at', startDate.toISOString())
      .not('utm_source', 'is', null);

    if (utmError) {
      console.error('Error getting UTM data:', utmError);
    }

    // Get leads timeline (daily counts)
    const { data: timelineData, error: timelineError } = await supabase
      .from('leads')
      .select('created_at, status')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true });

    if (timelineError) {
      console.error('Error getting timeline data:', timelineError);
    }

    // Get career applications stats
    const { data: careerStats, error: careerError } = await supabase
      .from('career_applications')
      .select('status, created_at')
      .gte('created_at', startDate.toISOString());

    if (careerError) {
      console.error('Error getting career stats:', careerError);
    }

    // Process data for analytics
    const analytics = {
      overview: {
        total_leads: leadsByStatus?.length || 0,
        new_leads: leadsByStatus?.filter(l => l.status === 'new').length || 0,
        qualified_leads: leadsByStatus?.filter(l => l.status === 'qualified').length || 0,
        won_leads: leadsByStatus?.filter(l => l.status === 'won').length || 0,
        career_applications: careerStats?.length || 0,
      },
      
      status_distribution: processStatusDistribution(leadsByStatus || []),
      
      utm_performance: processUTMPerformance(utmData || []),
      
      timeline: processTimelineData(timelineData || []),
      
      top_sources: processTopSources(utmData || []),
      
      conversion_rates: processConversionRates(utmData || []),
      
      lead_quality: processLeadQuality(utmData || []),
      
      career_pipeline: processCareerPipeline(careerStats || []),
    };

    return NextResponse.json(analytics);

  } catch (error) {
    console.error('Error in analytics API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function processStatusDistribution(leads) {
  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
    percentage: ((count / leads.length) * 100).toFixed(1),
  }));
}

function processUTMPerformance(utmData) {
  const performance = {};
  
  utmData.forEach(lead => {
    const key = `${lead.utm_source}/${lead.utm_medium}`;
    if (!performance[key]) {
      performance[key] = {
        source: lead.utm_source,
        medium: lead.utm_medium,
        campaigns: new Set(),
        total_leads: 0,
        qualified_leads: 0,
        won_leads: 0,
        total_score: 0,
      };
    }
    
    performance[key].campaigns.add(lead.utm_campaign);
    performance[key].total_leads++;
    performance[key].total_score += lead.lead_score || 0;
    
    if (lead.status === 'qualified') performance[key].qualified_leads++;
    if (lead.status === 'won') performance[key].won_leads++;
  });

  return Object.values(performance).map(p => ({
    ...p,
    campaigns: Array.from(p.campaigns),
    avg_score: (p.total_score / p.total_leads).toFixed(1),
    conversion_rate: ((p.won_leads / p.total_leads) * 100).toFixed(1),
  }));
}

function processTimelineData(timelineData) {
  const dailyCounts = {};
  
  timelineData.forEach(lead => {
    const date = new Date(lead.created_at).toDateString();
    if (!dailyCounts[date]) {
      dailyCounts[date] = { date, total: 0, new: 0, qualified: 0, won: 0 };
    }
    
    dailyCounts[date].total++;
    if (lead.status === 'new') dailyCounts[date].new++;
    if (lead.status === 'qualified') dailyCounts[date].qualified++;
    if (lead.status === 'won') dailyCounts[date].won++;
  });

  return Object.values(dailyCounts).sort((a, b) => new Date(a.date) - new Date(b.date));
}

function processTopSources(utmData) {
  const sourceCounts = {};
  
  utmData.forEach(lead => {
    sourceCounts[lead.utm_source] = (sourceCounts[lead.utm_source] || 0) + 1;
  });

  return Object.entries(sourceCounts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function processConversionRates(utmData) {
  const conversions = {};
  
  utmData.forEach(lead => {
    const key = lead.utm_campaign || 'Unknown Campaign';
    if (!conversions[key]) {
      conversions[key] = { campaign: key, total: 0, conversions: 0 };
    }
    
    conversions[key].total++;
    if (lead.status === 'won') conversions[key].conversions++;
  });

  return Object.values(conversions)
    .map(c => ({
      ...c,
      rate: ((c.conversions / c.total) * 100).toFixed(1),
    }))
    .sort((a, b) => b.rate - a.rate);
}

function processLeadQuality(utmData) {
  const qualityRanges = {
    'High (80-100)': 0,
    'Medium (60-79)': 0,
    'Low (0-59)': 0,
  };
  
  utmData.forEach(lead => {
    const score = lead.lead_score || 0;
    if (score >= 80) qualityRanges['High (80-100)']++;
    else if (score >= 60) qualityRanges['Medium (60-79)']++;
    else qualityRanges['Low (0-59)']++;
  });

  return Object.entries(qualityRanges).map(([range, count]) => ({
    range,
    count,
    percentage: utmData.length > 0 ? ((count / utmData.length) * 100).toFixed(1) : '0',
  }));
}

function processCareerPipeline(careerStats) {
  const statusCounts = careerStats.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
  }));
}