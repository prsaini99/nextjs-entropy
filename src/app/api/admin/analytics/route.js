import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // days
    const dataType = searchParams.get('type') || 'overview'; // overview, advanced, real-time, forecast, cohort
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // Route to different analytics based on type
    switch (dataType) {
      case 'overview':
        return NextResponse.json(await getOverviewAnalytics(period, startDate));
      case 'advanced':
        return NextResponse.json(await getAdvancedAnalytics(period));
      case 'real-time':
        return NextResponse.json(await getRealTimeMetrics());
      case 'forecast':
        return NextResponse.json(await getRevenueForecast(searchParams.get('months') || '3'));
      case 'cohort':
        return NextResponse.json(await getCohortAnalysis(searchParams.get('cohort_period') || 'month'));
      case 'velocity':
        return NextResponse.json(await getLeadVelocity());
      case 'scoring':
        return NextResponse.json(await getLeadScoringAnalysis());
      case 'activity':
        return NextResponse.json(await getActivityPatterns());
      case 'funnel':
        return NextResponse.json(await getLeadFunnel());
      case 'services':
        return NextResponse.json(await getServicePerformance());
      case 'campaigns':
        return NextResponse.json(await getCampaignPerformance());
      default:
        return NextResponse.json(await getOverviewAnalytics(period, startDate));
    }

  } catch (error) {
    console.error('Error in analytics API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Original overview analytics
async function getOverviewAnalytics(period, startDate) {
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

  return {
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
}

// Advanced analytics using database views
async function getAdvancedAnalytics(period) {
  const { data: leadAnalytics, error: leadError } = await supabase
    .from('lead_analytics')
    .select('*')
    .gte('created_at', new Date(Date.now() - period * 24 * 60 * 60 * 1000).toISOString());

  if (leadError) {
    console.error('Error getting lead analytics:', leadError);
    return { error: 'Failed to get lead analytics' };
  }

  // Process advanced metrics
  return {
    lead_analytics: leadAnalytics || [],
    budget_analysis: processBudgetAnalysis(leadAnalytics || []),
    quality_distribution: processQualityDistribution(leadAnalytics || []),
    time_patterns: processTimePatterns(leadAnalytics || []),
    age_analysis: processLeadAgeAnalysis(leadAnalytics || []),
  };
}

// Real-time metrics using database function
async function getRealTimeMetrics() {
  const { data: realTimeData, error: realTimeError } = await supabase
    .rpc('real_time_metrics');

  if (realTimeError) {
    console.error('Error getting real-time metrics:', realTimeError);
    return { error: 'Failed to get real-time metrics' };
  }

  return {
    metrics: realTimeData || [],
    last_updated: new Date().toISOString(),
  };
}

// Revenue forecasting
async function getRevenueForecast(months) {
  const { data: forecastData, error: forecastError } = await supabase
    .rpc('revenue_forecast', { forecast_months: parseInt(months) });

  if (forecastError) {
    console.error('Error getting revenue forecast:', forecastError);
    return { error: 'Failed to get revenue forecast' };
  }

  return {
    forecast: forecastData || [],
    generated_at: new Date().toISOString(),
  };
}

// Cohort analysis
async function getCohortAnalysis(cohortPeriod) {
  const { data: cohortData, error: cohortError } = await supabase
    .rpc('cohort_analysis', { cohort_period: cohortPeriod });

  if (cohortError) {
    console.error('Error getting cohort analysis:', cohortError);
    return { error: 'Failed to get cohort analysis' };
  }

  return {
    cohorts: cohortData || [],
    period: cohortPeriod,
  };
}

// Lead velocity
async function getLeadVelocity() {
  const { data: velocityData, error: velocityError } = await supabase
    .rpc('calculate_lead_velocity');

  if (velocityError) {
    console.error('Error getting lead velocity:', velocityError);
    return { error: 'Failed to get lead velocity' };
  }

  return {
    velocity: velocityData || [],
    calculated_at: new Date().toISOString(),
  };
}

// Lead scoring analysis
async function getLeadScoringAnalysis() {
  const { data: scoringData, error: scoringError } = await supabase
    .rpc('analyze_lead_scoring');

  if (scoringError) {
    console.error('Error getting lead scoring analysis:', scoringError);
    return { error: 'Failed to get lead scoring analysis' };
  }

  return {
    scoring_analysis: scoringData || [],
    generated_at: new Date().toISOString(),
  };
}

// Activity patterns
async function getActivityPatterns() {
  const { data: activityData, error: activityError } = await supabase
    .from('activity_patterns')
    .select('*')
    .order('date', { ascending: false })
    .limit(100);

  if (activityError) {
    console.error('Error getting activity patterns:', activityError);
    return { error: 'Failed to get activity patterns' };
  }

  return {
    activity_patterns: activityData || [],
    hourly_patterns: processHourlyPatterns(activityData || []),
    daily_patterns: processDailyPatterns(activityData || []),
  };
}

// Lead funnel
async function getLeadFunnel() {
  const { data: funnelData, error: funnelError } = await supabase
    .from('lead_funnel')
    .select('*')
    .order('stage_order');

  if (funnelError) {
    console.error('Error getting lead funnel:', funnelError);
    return { error: 'Failed to get lead funnel' };
  }

  return {
    funnel: funnelData || [],
    conversion_rates: processFunnelConversions(funnelData || []),
  };
}

// Service performance
async function getServicePerformance() {
  const { data: serviceData, error: serviceError } = await supabase
    .from('service_performance')
    .select('*')
    .order('total_requests', { ascending: false });

  if (serviceError) {
    console.error('Error getting service performance:', serviceError);
    return { error: 'Failed to get service performance' };
  }

  return {
    services: serviceData || [],
    top_performers: (serviceData || []).slice(0, 5),
    revenue_by_service: processServiceRevenue(serviceData || []),
  };
}

// Campaign performance
async function getCampaignPerformance() {
  const { data: campaignData, error: campaignError } = await supabase
    .from('campaign_performance')
    .select('*')
    .order('total_leads', { ascending: false });

  if (campaignError) {
    console.error('Error getting campaign performance:', campaignError);
    return { error: 'Failed to get campaign performance' };
  }

  return {
    campaigns: campaignData || [],
    top_campaigns: (campaignData || []).slice(0, 10),
    roi_analysis: processCampaignROI(campaignData || []),
  };
}

// Original processing functions for backward compatibility
function processStatusDistribution(leads) {
  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
    percentage: leads.length > 0 ? ((count / leads.length) * 100).toFixed(1) : '0',
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
    avg_score: p.total_leads > 0 ? (p.total_score / p.total_leads).toFixed(1) : '0',
    conversion_rate: p.total_leads > 0 ? ((p.won_leads / p.total_leads) * 100).toFixed(1) : '0',
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
      rate: c.total > 0 ? ((c.conversions / c.total) * 100).toFixed(1) : '0',
    }))
    .sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate));
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

// New processing functions for advanced analytics
function processBudgetAnalysis(leadAnalytics) {
  const budgetCounts = {};
  const budgetRevenue = {};
  
  leadAnalytics.forEach(lead => {
    const budget = lead.budget_category || 'Unspecified';
    budgetCounts[budget] = (budgetCounts[budget] || 0) + 1;
    budgetRevenue[budget] = (budgetRevenue[budget] || 0) + (lead.estimated_value || 0);
  });

  return Object.entries(budgetCounts).map(([budget, count]) => ({
    budget_category: budget,
    lead_count: count,
    total_revenue: budgetRevenue[budget],
    avg_deal_size: count > 0 ? (budgetRevenue[budget] / count).toFixed(2) : '0',
  }));
}

function processQualityDistribution(leadAnalytics) {
  const qualityCounts = {};
  
  leadAnalytics.forEach(lead => {
    const quality = lead.quality_tier || 'Unknown';
    qualityCounts[quality] = (qualityCounts[quality] || 0) + 1;
  });

  return Object.entries(qualityCounts).map(([tier, count]) => ({
    quality_tier: tier,
    count,
    percentage: leadAnalytics.length > 0 ? ((count / leadAnalytics.length) * 100).toFixed(1) : '0',
  }));
}

function processTimePatterns(leadAnalytics) {
  const hourlyData = {};
  const dayData = {};
  
  leadAnalytics.forEach(lead => {
    const hour = lead.created_hour || 0;
    const day = lead.created_day_of_week || 0;
    
    hourlyData[hour] = (hourlyData[hour] || 0) + 1;
    dayData[day] = (dayData[day] || 0) + 1;
  });

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  return {
    hourly: Object.entries(hourlyData).map(([hour, count]) => ({ hour: parseInt(hour), count })),
    daily: Object.entries(dayData).map(([day, count]) => ({ 
      day: parseInt(day), 
      day_name: dayNames[parseInt(day)], 
      count 
    }))
  };
}

function processLeadAgeAnalysis(leadAnalytics) {
  const ageRanges = {
    'New (0-1 days)': 0,
    'Recent (1-7 days)': 0,
    'Aging (7-30 days)': 0,
    'Stale (30+ days)': 0,
  };
  
  leadAnalytics.forEach(lead => {
    const age = lead.lead_age_days || 0;
    if (age <= 1) ageRanges['New (0-1 days)']++;
    else if (age <= 7) ageRanges['Recent (1-7 days)']++;
    else if (age <= 30) ageRanges['Aging (7-30 days)']++;
    else ageRanges['Stale (30+ days)']++;
  });

  return Object.entries(ageRanges).map(([range, count]) => ({
    age_range: range,
    count,
    percentage: leadAnalytics.length > 0 ? ((count / leadAnalytics.length) * 100).toFixed(1) : '0',
  }));
}

function processHourlyPatterns(activityData) {
  const hourlyStats = {};
  
  activityData.forEach(activity => {
    const hour = activity.hour_of_day;
    if (!hourlyStats[hour]) {
      hourlyStats[hour] = {
        hour,
        total_leads: 0,
        total_conversions: 0,
        total_score: 0,
        count: 0
      };
    }
    
    hourlyStats[hour].total_leads += activity.lead_count || 0;
    hourlyStats[hour].total_conversions += activity.conversions || 0;
    hourlyStats[hour].total_score += (activity.avg_score || 0) * (activity.lead_count || 0);
    hourlyStats[hour].count++;
  });

  return Object.values(hourlyStats).map(stat => ({
    ...stat,
    avg_score: stat.total_leads > 0 ? (stat.total_score / stat.total_leads).toFixed(1) : '0',
    conversion_rate: stat.total_leads > 0 ? ((stat.total_conversions / stat.total_leads) * 100).toFixed(1) : '0'
  }));
}

function processDailyPatterns(activityData) {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dailyStats = {};
  
  activityData.forEach(activity => {
    const day = activity.day_of_week;
    if (!dailyStats[day]) {
      dailyStats[day] = {
        day,
        day_name: dayNames[day],
        total_leads: 0,
        total_conversions: 0,
        count: 0
      };
    }
    
    dailyStats[day].total_leads += activity.lead_count || 0;
    dailyStats[day].total_conversions += activity.conversions || 0;
    dailyStats[day].count++;
  });

  return Object.values(dailyStats).map(stat => ({
    ...stat,
    avg_leads_per_day: stat.count > 0 ? (stat.total_leads / stat.count).toFixed(1) : '0',
    conversion_rate: stat.total_leads > 0 ? ((stat.total_conversions / stat.total_leads) * 100).toFixed(1) : '0'
  }));
}

function processFunnelConversions(funnelData) {
  return funnelData.map((stage, index) => {
    if (index === 0) {
      return { ...stage, conversion_from_previous: '100.0' };
    }
    
    const previousStage = funnelData[index - 1];
    const conversionRate = previousStage.count > 0 ? 
      ((stage.count / previousStage.count) * 100).toFixed(1) : '0';
    
    return { ...stage, conversion_from_previous: conversionRate };
  });
}

function processServiceRevenue(serviceData) {
  const totalRevenue = serviceData.reduce((sum, s) => sum + (s.revenue_generated || 0), 0);
  
  return serviceData.map(service => ({
    service: service.service,
    total_pipeline: service.total_pipeline || 0,
    revenue_generated: service.revenue_generated || 0,
    revenue_percentage: totalRevenue > 0 ?
      (((service.revenue_generated || 0) / totalRevenue) * 100).toFixed(1) : '0'
  }));
}

function processCampaignROI(campaignData) {
  return campaignData.map(campaign => {
    const roi = campaign.won_revenue && campaign.total_pipeline_value ? 
      (((campaign.won_revenue / campaign.total_pipeline_value) - 1) * 100).toFixed(1) : '0';
    
    return {
      campaign: `${campaign.utm_source}/${campaign.utm_medium}/${campaign.utm_campaign}`,
      investment: campaign.total_pipeline_value || 0,
      return: campaign.won_revenue || 0,
      roi_percentage: roi,
      leads_generated: campaign.total_leads || 0,
      cost_per_lead: campaign.total_leads > 0 && campaign.total_pipeline_value ? 
        (campaign.total_pipeline_value / campaign.total_leads).toFixed(2) : '0'
    };
  });
}