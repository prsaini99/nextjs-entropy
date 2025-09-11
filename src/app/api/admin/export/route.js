import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import * as XLSX from 'xlsx';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json'; // json, csv, xlsx
    const dataType = searchParams.get('type') || 'leads'; // leads, analytics, campaigns, services
    const period = searchParams.get('period') || '30';
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    let data = [];
    let filename = '';

    switch (dataType) {
      case 'leads':
        data = await exportLeadsData(startDate);
        filename = `leads-export-${new Date().toISOString().split('T')[0]}`;
        break;
      case 'analytics':
        data = await exportAnalyticsData(period);
        filename = `analytics-export-${new Date().toISOString().split('T')[0]}`;
        break;
      case 'campaigns':
        data = await exportCampaignData();
        filename = `campaigns-export-${new Date().toISOString().split('T')[0]}`;
        break;
      case 'services':
        data = await exportServiceData();
        filename = `services-export-${new Date().toISOString().split('T')[0]}`;
        break;
      case 'funnel':
        data = await exportFunnelData();
        filename = `funnel-analysis-${new Date().toISOString().split('T')[0]}`;
        break;
      case 'cohort':
        data = await exportCohortData();
        filename = `cohort-analysis-${new Date().toISOString().split('T')[0]}`;
        break;
      default:
        return NextResponse.json({ error: 'Invalid data type' }, { status: 400 });
    }

    // Handle different export formats
    switch (format) {
      case 'csv':
        const csv = convertToCSV(data);
        return new NextResponse(csv, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="${filename}.csv"`
          }
        });
      
      case 'xlsx':
        const xlsx = convertToXLSX(data, dataType);
        return new NextResponse(xlsx, {
          headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': `attachment; filename="${filename}.xlsx"`
          }
        });
      
      case 'json':
      default:
        return NextResponse.json({
          data,
          exported_at: new Date().toISOString(),
          record_count: Array.isArray(data) ? data.length : Object.keys(data).length,
          period: period + ' days'
        });
    }

  } catch (error) {
    console.error('Error in export API:', error);
    return NextResponse.json(
      { error: 'Export failed' },
      { status: 500 }
    );
  }
}

async function exportLeadsData(startDate) {
  const { data: leads, error } = await supabase
    .from('lead_analytics')
    .select('*')
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error exporting leads:', error);
    return [];
  }

  return leads.map(lead => ({
    ID: lead.id,
    Name: lead.full_name,
    Email: lead.work_email,
    Phone: lead.phone || '',
    Company: lead.company_website || '',
    Service: lead.service,
    Budget: lead.budget || '',
    Timeline: lead.timeline,
    Status: lead.status,
    'Lead Score': lead.lead_score,
    'Estimated Value': lead.estimated_value || '',
    'UTM Source': lead.utm_source || '',
    'UTM Medium': lead.utm_medium || '',
    'UTM Campaign': lead.utm_campaign || '',
    'Quality Tier': lead.quality_tier || '',
    'Budget Category': lead.budget_category || '',
    'Lead Age (Days)': lead.lead_age_days || 0,
    'Days in Status': lead.days_in_status || 0,
    'Created Date': new Date(lead.created_at).toLocaleString(),
    'Updated Date': new Date(lead.updated_at).toLocaleString(),
  }));
}

async function exportAnalyticsData(period) {
  // Get multiple analytics datasets
  const [
    { data: realTimeMetrics },
    { data: funnelData },
    { data: serviceData },
    { data: campaignData }
  ] = await Promise.all([
    supabase.rpc('real_time_metrics'),
    supabase.from('lead_funnel').select('*').order('stage_order'),
    supabase.from('service_performance').select('*'),
    supabase.from('campaign_performance').select('*').limit(10)
  ]);

  return {
    real_time_metrics: realTimeMetrics || [],
    funnel_analysis: funnelData || [],
    service_performance: serviceData || [],
    campaign_performance: campaignData || [],
    generated_at: new Date().toISOString(),
    period_days: period
  };
}

async function exportCampaignData() {
  const { data: campaigns, error } = await supabase
    .from('campaign_performance')
    .select('*')
    .order('total_leads', { ascending: false });

  if (error) {
    console.error('Error exporting campaigns:', error);
    return [];
  }

  return campaigns.map(campaign => ({
    'UTM Source': campaign.utm_source,
    'UTM Medium': campaign.utm_medium,
    'UTM Campaign': campaign.utm_campaign,
    'Total Leads': campaign.total_leads,
    'Qualified Leads': campaign.qualified_leads,
    'Won Leads': campaign.won_leads,
    'Lost Leads': campaign.lost_leads,
    'Conversion Rate (%)': campaign.conversion_rate,
    'Qualification Rate (%)': campaign.qualification_rate,
    'Average Lead Score': campaign.avg_lead_score,
    'Average Days to Convert': campaign.avg_days_to_convert,
    'Total Pipeline Value': campaign.total_pipeline_value,
    'Won Revenue': campaign.won_revenue,
    'Campaign Duration (Days)': campaign.campaign_duration_days,
    'First Lead Date': campaign.first_lead_date,
    'Last Lead Date': campaign.last_lead_date,
  }));
}

async function exportServiceData() {
  const { data: services, error } = await supabase
    .from('service_performance')
    .select('*')
    .order('total_requests', { ascending: false });

  if (error) {
    console.error('Error exporting services:', error);
    return [];
  }

  return services.map(service => ({
    Service: service.service,
    'Total Requests': service.total_requests,
    'Won Deals': service.won_deals,
    'Lost Deals': service.lost_deals,
    'Win Rate (%)': service.win_rate,
    'Average Lead Score': service.avg_lead_score,
    'Total Pipeline Value': service.total_pipeline,
    'Revenue Generated': service.revenue_generated,
    'Average Deal Size': service.avg_deal_size,
    'Most Common Budget': service.most_common_budget,
    'Top UTM Source': service.top_source,
  }));
}

async function exportFunnelData() {
  const { data: funnel, error } = await supabase
    .from('lead_funnel')
    .select('*')
    .order('stage_order');

  if (error) {
    console.error('Error exporting funnel:', error);
    return [];
  }

  return funnel.map(stage => ({
    Stage: stage.stage,
    'Stage Order': stage.stage_order,
    Count: stage.count,
    'Percentage of Total': stage.percentage + '%',
    'Drop-off Count': stage.drop_off_count || 0,
    'Drop-off Percentage': (stage.drop_off_percentage || 0) + '%',
  }));
}

async function exportCohortData() {
  const { data: cohorts, error } = await supabase
    .rpc('cohort_analysis', { cohort_period: 'month' });

  if (error) {
    console.error('Error exporting cohort:', error);
    return [];
  }

  return cohorts.map(cohort => ({
    'Cohort Period': cohort.cohort_period_name,
    'Total Leads': cohort.total_leads,
    'Week 1 Active': cohort.week_1_active,
    'Week 2 Active': cohort.week_2_active,
    'Week 4 Active': cohort.week_4_active,
    'Week 8 Active': cohort.week_8_active,
    'Final Conversions': cohort.final_conversions,
    'Conversion Rate (%)': cohort.conversion_rate,
  }));
}

function convertToCSV(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return 'No data available';
  }

  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(row => 
    Object.values(row).map(value => {
      // Handle values that might contain commas or quotes
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(',')
  );

  return [headers, ...rows].join('\n');
}

function convertToXLSX(data, sheetName) {
  const workbook = XLSX.utils.book_new();
  
  if (Array.isArray(data)) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName || 'Data');
  } else {
    // Handle object data (like analytics with multiple datasets)
    Object.keys(data).forEach(key => {
      if (Array.isArray(data[key])) {
        const worksheet = XLSX.utils.json_to_sheet(data[key]);
        XLSX.utils.book_append_sheet(workbook, worksheet, key);
      }
    });
  }

  return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
}