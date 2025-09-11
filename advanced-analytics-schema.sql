-- Advanced Analytics Views and Functions for StackBinary Lead Dashboard
-- Run this AFTER your main supabase-schema.sql

-- Create comprehensive lead analytics view
CREATE OR REPLACE VIEW lead_analytics AS
WITH lead_stages AS (
  SELECT 
    id,
    full_name,
    work_email,
    service,
    budget,
    timeline,
    utm_source,
    utm_medium,
    utm_campaign,
    status,
    lead_score,
    estimated_value,
    created_at,
    updated_at,
    -- Calculate days in current status
    EXTRACT(epoch FROM (CURRENT_TIMESTAMP - updated_at))/86400::float as days_in_status,
    -- Calculate total lead age
    EXTRACT(epoch FROM (CURRENT_TIMESTAMP - created_at))/86400::float as lead_age_days,
    -- Extract date parts for time-based analytics
    EXTRACT(year FROM created_at) as created_year,
    EXTRACT(month FROM created_at) as created_month,
    EXTRACT(week FROM created_at) as created_week,
    EXTRACT(dow FROM created_at) as created_day_of_week,
    EXTRACT(hour FROM created_at) as created_hour,
    -- Budget categorization
    CASE 
      WHEN budget LIKE '%50,000%' OR budget LIKE '%50k%' OR budget LIKE '%40,00,000%' THEN 'Enterprise (50k+)'
      WHEN budget LIKE '%25,000%' OR budget LIKE '%25k%' OR budget LIKE '%20,00,000%' THEN 'Medium (25k-50k)'
      WHEN budget LIKE '%10,000%' OR budget LIKE '%10k%' OR budget LIKE '%8,00,000%' THEN 'Small (10k-25k)'
      WHEN budget LIKE '%5,000%' OR budget LIKE '%5k%' OR budget LIKE '%4,00,000%' THEN 'Startup (<10k)'
      ELSE 'Unspecified'
    END as budget_category,
    -- Lead quality tier
    CASE 
      WHEN lead_score >= 80 THEN 'High Quality'
      WHEN lead_score >= 60 THEN 'Medium Quality'
      ELSE 'Low Quality'
    END as quality_tier
  FROM leads
)
SELECT * FROM lead_stages;

-- Create UTM campaign performance view
CREATE OR REPLACE VIEW campaign_performance AS
SELECT 
  utm_source,
  utm_medium,
  utm_campaign,
  COUNT(*) as total_leads,
  COUNT(CASE WHEN status IN ('qualified', 'proposal_sent', 'won') THEN 1 END) as qualified_leads,
  COUNT(CASE WHEN status = 'won' THEN 1 END) as won_leads,
  COUNT(CASE WHEN status = 'lost' THEN 1 END) as lost_leads,
  ROUND(AVG(lead_score), 2) as avg_lead_score,
  ROUND(AVG(EXTRACT(epoch FROM (updated_at - created_at))/86400::float)::numeric, 2) as avg_days_to_convert,
  SUM(COALESCE(estimated_value, 0)) as total_pipeline_value,
  SUM(CASE WHEN status = 'won' THEN COALESCE(estimated_value, 0) ELSE 0 END) as won_revenue,
  -- Conversion rates
  ROUND((COUNT(CASE WHEN status = 'won' THEN 1 END)::float / COUNT(*)::float * 100)::numeric, 2) as conversion_rate,
  ROUND((COUNT(CASE WHEN status IN ('qualified', 'proposal_sent', 'won') THEN 1 END)::float / COUNT(*)::float * 100)::numeric, 2) as qualification_rate,
  -- Time analysis
  MIN(created_at) as first_lead_date,
  MAX(created_at) as last_lead_date,
  EXTRACT(epoch FROM (MAX(created_at) - MIN(created_at)))/86400::float as campaign_duration_days
FROM leads
WHERE utm_source IS NOT NULL
GROUP BY utm_source, utm_medium, utm_campaign
ORDER BY total_leads DESC;

-- Create daily/hourly activity patterns view
CREATE OR REPLACE VIEW activity_patterns AS
WITH hourly_data AS (
  SELECT 
    EXTRACT(hour FROM created_at) as hour_of_day,
    EXTRACT(dow FROM created_at) as day_of_week,
    DATE_TRUNC('day', created_at) as date,
    COUNT(*) as lead_count,
    ROUND(AVG(lead_score)::numeric, 2) as avg_score,
    COUNT(CASE WHEN status = 'won' THEN 1 END) as conversions
  FROM leads
  GROUP BY EXTRACT(hour FROM created_at), EXTRACT(dow FROM created_at), DATE_TRUNC('day', created_at)
)
SELECT 
  hour_of_day,
  day_of_week,
  CASE day_of_week
    WHEN 0 THEN 'Sunday'
    WHEN 1 THEN 'Monday'
    WHEN 2 THEN 'Tuesday'
    WHEN 3 THEN 'Wednesday'
    WHEN 4 THEN 'Thursday'
    WHEN 5 THEN 'Friday'
    WHEN 6 THEN 'Saturday'
  END as day_name,
  date,
  lead_count,
  avg_score,
  conversions,
  ROUND((conversions::float / lead_count::float * 100)::numeric, 2) as hourly_conversion_rate
FROM hourly_data
ORDER BY date DESC, hour_of_day;

-- Create service performance analysis view
CREATE OR REPLACE VIEW service_performance AS
SELECT 
  service,
  COUNT(*) as total_requests,
  COUNT(CASE WHEN status = 'won' THEN 1 END) as won_deals,
  COUNT(CASE WHEN status = 'lost' THEN 1 END) as lost_deals,
  ROUND(AVG(lead_score)::numeric, 2) as avg_lead_score,
  SUM(COALESCE(estimated_value, 0)) as total_pipeline,
  SUM(CASE WHEN status = 'won' THEN COALESCE(estimated_value, 0) ELSE 0 END) as revenue_generated,
  ROUND(AVG(CASE WHEN status = 'won' THEN COALESCE(estimated_value, 0) END)::numeric, 2) as avg_deal_size,
  ROUND((COUNT(CASE WHEN status = 'won' THEN 1 END)::float / COUNT(*)::float * 100)::numeric, 2) as win_rate,
  -- Most common budget range for this service
  MODE() WITHIN GROUP (ORDER BY 
    CASE 
      WHEN budget LIKE '%50,000%' OR budget LIKE '%50k%' THEN 'Enterprise'
      WHEN budget LIKE '%25,000%' OR budget LIKE '%25k%' THEN 'Medium'
      WHEN budget LIKE '%10,000%' OR budget LIKE '%10k%' THEN 'Small'
      ELSE 'Unspecified'
    END
  ) as most_common_budget,
  -- Top UTM source for this service
  MODE() WITHIN GROUP (ORDER BY utm_source) as top_source
FROM leads
GROUP BY service
ORDER BY total_requests DESC;

-- Create lead funnel analysis view
CREATE OR REPLACE VIEW lead_funnel AS
WITH funnel_stages AS (
  SELECT 
    'Total Leads' as stage,
    1 as stage_order,
    COUNT(*) as count,
    100.0 as percentage
  FROM leads
  
  UNION ALL
  
  SELECT 
    'Contacted' as stage,
    2 as stage_order,
    COUNT(*) as count,
    ROUND((COUNT(*)::float / (SELECT COUNT(*) FROM leads)::float * 100)::numeric, 2) as percentage
  FROM leads 
  WHERE status != 'new'
  
  UNION ALL
  
  SELECT 
    'Qualified' as stage,
    3 as stage_order,
    COUNT(*) as count,
    ROUND((COUNT(*)::float / (SELECT COUNT(*) FROM leads)::float * 100)::numeric, 2) as percentage
  FROM leads 
  WHERE status IN ('qualified', 'proposal_sent', 'won')
  
  UNION ALL
  
  SELECT 
    'Proposal Sent' as stage,
    4 as stage_order,
    COUNT(*) as count,
    ROUND((COUNT(*)::float / (SELECT COUNT(*) FROM leads)::float * 100)::numeric, 2) as percentage
  FROM leads 
  WHERE status IN ('proposal_sent', 'won')
  
  UNION ALL
  
  SELECT 
    'Won' as stage,
    5 as stage_order,
    COUNT(*) as count,
    ROUND((COUNT(*)::float / (SELECT COUNT(*) FROM leads)::float * 100)::numeric, 2) as percentage
  FROM leads 
  WHERE status = 'won'
)
SELECT 
  stage,
  stage_order,
  count,
  percentage,
  LAG(count) OVER (ORDER BY stage_order) - count as drop_off_count,
  ROUND((LAG(percentage) OVER (ORDER BY stage_order) - percentage)::numeric, 2) as drop_off_percentage
FROM funnel_stages
ORDER BY stage_order;

-- Create lead scoring analysis function
CREATE OR REPLACE FUNCTION analyze_lead_scoring()
RETURNS TABLE(
  score_range text,
  lead_count bigint,
  conversion_rate numeric,
  avg_days_to_convert numeric,
  avg_deal_value numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    CASE 
      WHEN l.lead_score >= 90 THEN '90-100 (Excellent)'
      WHEN l.lead_score >= 80 THEN '80-89 (High)'
      WHEN l.lead_score >= 70 THEN '70-79 (Good)'
      WHEN l.lead_score >= 60 THEN '60-69 (Medium)'
      WHEN l.lead_score >= 50 THEN '50-59 (Fair)'
      ELSE '0-49 (Low)'
    END as score_range,
    COUNT(*) as lead_count,
    ROUND((COUNT(CASE WHEN l.status = 'won' THEN 1 END)::numeric / COUNT(*)::numeric * 100), 2) as conversion_rate,
    ROUND(AVG(CASE WHEN l.status = 'won' THEN EXTRACT(epoch FROM (l.updated_at - l.created_at))/86400::float END)::numeric, 2) as avg_days_to_convert,
    ROUND(AVG(CASE WHEN l.status = 'won' THEN l.estimated_value END)::numeric, 2) as avg_deal_value
  FROM leads l
  GROUP BY 
    CASE 
      WHEN l.lead_score >= 90 THEN '90-100 (Excellent)'
      WHEN l.lead_score >= 80 THEN '80-89 (High)'
      WHEN l.lead_score >= 70 THEN '70-79 (Good)'
      WHEN l.lead_score >= 60 THEN '60-69 (Medium)'
      WHEN l.lead_score >= 50 THEN '50-59 (Fair)'
      ELSE '0-49 (Low)'
    END
  ORDER BY MIN(l.lead_score) DESC;
END;
$$ LANGUAGE plpgsql;

-- Create time-based cohort analysis function
CREATE OR REPLACE FUNCTION cohort_analysis(cohort_period text DEFAULT 'month')
RETURNS TABLE(
  cohort_period_name text,
  total_leads bigint,
  week_1_active bigint,
  week_2_active bigint,
  week_4_active bigint,
  week_8_active bigint,
  final_conversions bigint,
  conversion_rate numeric
) AS $$
BEGIN
  IF cohort_period = 'month' THEN
    RETURN QUERY
    WITH cohorts AS (
      SELECT 
        DATE_TRUNC('month', created_at) as cohort_date,
        id,
        created_at,
        updated_at,
        status
      FROM leads
    )
    SELECT 
      TO_CHAR(c.cohort_date, 'YYYY-MM') as cohort_period_name,
      COUNT(*) as total_leads,
      COUNT(CASE WHEN c.updated_at >= c.created_at + INTERVAL '1 week' THEN 1 END) as week_1_active,
      COUNT(CASE WHEN c.updated_at >= c.created_at + INTERVAL '2 weeks' THEN 1 END) as week_2_active,
      COUNT(CASE WHEN c.updated_at >= c.created_at + INTERVAL '4 weeks' THEN 1 END) as week_4_active,
      COUNT(CASE WHEN c.updated_at >= c.created_at + INTERVAL '8 weeks' THEN 1 END) as week_8_active,
      COUNT(CASE WHEN c.status = 'won' THEN 1 END) as final_conversions,
      ROUND((COUNT(CASE WHEN c.status = 'won' THEN 1 END)::numeric / COUNT(*)::numeric * 100), 2) as conversion_rate
    FROM cohorts c
    GROUP BY c.cohort_date
    ORDER BY c.cohort_date DESC;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create revenue forecasting function
CREATE OR REPLACE FUNCTION revenue_forecast(forecast_months integer DEFAULT 3)
RETURNS TABLE(
  forecast_month text,
  projected_leads integer,
  projected_revenue numeric,
  confidence_level text
) AS $$
DECLARE
  avg_monthly_leads numeric;
  avg_conversion_rate numeric;
  avg_deal_size numeric;
  seasonal_factor numeric;
BEGIN
  -- Calculate historical averages
  SELECT 
    AVG(monthly_leads),
    AVG(monthly_conversion_rate),
    AVG(monthly_avg_deal)
  INTO avg_monthly_leads, avg_conversion_rate, avg_deal_size
  FROM (
    SELECT 
      DATE_TRUNC('month', created_at) as month,
      COUNT(*) as monthly_leads,
      (COUNT(CASE WHEN status = 'won' THEN 1 END)::float / COUNT(*)::float) as monthly_conversion_rate,
      AVG(CASE WHEN status = 'won' THEN estimated_value END) as monthly_avg_deal
    FROM leads
    WHERE created_at >= CURRENT_DATE - INTERVAL '12 months'
    GROUP BY DATE_TRUNC('month', created_at)
  ) monthly_stats;

  -- Simple seasonal adjustment (can be enhanced with more data)
  seasonal_factor := 1.0;

  -- Generate forecast
  FOR i IN 1..forecast_months LOOP
    RETURN QUERY
    SELECT 
      TO_CHAR(CURRENT_DATE + (i || ' months')::interval, 'YYYY-MM') as forecast_month,
      ROUND(avg_monthly_leads * seasonal_factor)::integer as projected_leads,
      ROUND((avg_monthly_leads * seasonal_factor * avg_conversion_rate * avg_deal_size)::numeric, 2) as projected_revenue,
      CASE 
        WHEN i <= 1 THEN 'High'
        WHEN i <= 2 THEN 'Medium'
        ELSE 'Low'
      END as confidence_level;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create lead velocity calculation function
CREATE OR REPLACE FUNCTION calculate_lead_velocity()
RETURNS TABLE(
  period text,
  leads_created bigint,
  leads_qualified bigint,
  leads_won bigint,
  avg_time_to_qualify numeric,
  avg_time_to_close numeric,
  velocity_score numeric
) AS $$
BEGIN
  RETURN QUERY
  WITH monthly_data AS (
    SELECT 
      TO_CHAR(DATE_TRUNC('month', created_at), 'YYYY-MM') as period,
      COUNT(*) as leads_created,
      COUNT(CASE WHEN status IN ('qualified', 'proposal_sent', 'won') THEN 1 END) as leads_qualified,
      COUNT(CASE WHEN status = 'won' THEN 1 END) as leads_won,
      AVG(CASE 
        WHEN status IN ('qualified', 'proposal_sent', 'won') 
        THEN EXTRACT(epoch FROM (updated_at - created_at))/86400::float 
      END)::numeric as avg_time_to_qualify,
      AVG(CASE 
        WHEN status = 'won' 
        THEN EXTRACT(epoch FROM (updated_at - created_at))/86400::float 
      END)::numeric as avg_time_to_close
    FROM leads
    WHERE created_at >= CURRENT_DATE - INTERVAL '12 months'
    GROUP BY DATE_TRUNC('month', created_at)
  )
  SELECT 
    m.period,
    m.leads_created,
    m.leads_qualified,
    m.leads_won,
    ROUND(m.avg_time_to_qualify, 2) as avg_time_to_qualify,
    ROUND(m.avg_time_to_close, 2) as avg_time_to_close,
    -- Velocity score: (qualified_leads / created_leads) / (avg_days_to_qualify / 30)
    ROUND(
      CASE 
        WHEN m.avg_time_to_qualify > 0 AND m.leads_created > 0 THEN
          (m.leads_qualified::float / m.leads_created::float) / (m.avg_time_to_qualify / 30.0)
        ELSE 0
      END::numeric, 3
    ) as velocity_score
  FROM monthly_data m
  ORDER BY m.period DESC;
END;
$$ LANGUAGE plpgsql;

-- Create real-time dashboard metrics function
CREATE OR REPLACE FUNCTION real_time_metrics()
RETURNS TABLE(
  metric_name text,
  metric_value numeric,
  previous_period_value numeric,
  percentage_change numeric,
  trend_direction text
) AS $$
BEGIN
  RETURN QUERY
  WITH current_metrics AS (
    SELECT 
      COUNT(*) as total_leads,
      COUNT(CASE WHEN status = 'new' THEN 1 END) as new_leads,
      COUNT(CASE WHEN status IN ('qualified', 'proposal_sent') THEN 1 END) as pipeline_leads,
      COUNT(CASE WHEN status = 'won' THEN 1 END) as won_leads,
      SUM(CASE WHEN status IN ('qualified', 'proposal_sent') THEN COALESCE(estimated_value, 0) END) as pipeline_value,
      SUM(CASE WHEN status = 'won' THEN COALESCE(estimated_value, 0) END) as won_revenue,
      ROUND(AVG(lead_score)::numeric, 2) as avg_score
    FROM leads
    WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
  ),
  previous_metrics AS (
    SELECT 
      COUNT(*) as total_leads,
      COUNT(CASE WHEN status = 'new' THEN 1 END) as new_leads,
      COUNT(CASE WHEN status IN ('qualified', 'proposal_sent') THEN 1 END) as pipeline_leads,
      COUNT(CASE WHEN status = 'won' THEN 1 END) as won_leads,
      SUM(CASE WHEN status IN ('qualified', 'proposal_sent') THEN COALESCE(estimated_value, 0) END) as pipeline_value,
      SUM(CASE WHEN status = 'won' THEN COALESCE(estimated_value, 0) END) as won_revenue,
      ROUND(AVG(lead_score)::numeric, 2) as avg_score
    FROM leads
    WHERE created_at >= CURRENT_DATE - INTERVAL '60 days' 
      AND created_at < CURRENT_DATE - INTERVAL '30 days'
  )
  SELECT 
    'Total Leads (30d)' as metric_name,
    c.total_leads::numeric,
    p.total_leads::numeric,
    ROUND(((c.total_leads - p.total_leads)::float / NULLIF(p.total_leads, 0)::float * 100)::numeric, 2),
    CASE 
      WHEN c.total_leads > p.total_leads THEN 'up'
      WHEN c.total_leads < p.total_leads THEN 'down'
      ELSE 'stable'
    END
  FROM current_metrics c, previous_metrics p
  
  UNION ALL
  
  SELECT 
    'Pipeline Value (30d)',
    c.pipeline_value,
    p.pipeline_value,
    ROUND(((c.pipeline_value - p.pipeline_value) / NULLIF(p.pipeline_value, 0) * 100)::numeric, 2),
    CASE 
      WHEN c.pipeline_value > p.pipeline_value THEN 'up'
      WHEN c.pipeline_value < p.pipeline_value THEN 'down'
      ELSE 'stable'
    END
  FROM current_metrics c, previous_metrics p
  
  UNION ALL
  
  SELECT 
    'Won Revenue (30d)',
    c.won_revenue,
    p.won_revenue,
    ROUND(((c.won_revenue - p.won_revenue) / NULLIF(p.won_revenue, 0) * 100)::numeric, 2),
    CASE 
      WHEN c.won_revenue > p.won_revenue THEN 'up'
      WHEN c.won_revenue < p.won_revenue THEN 'down'
      ELSE 'stable'
    END
  FROM current_metrics c, previous_metrics p;
END;
$$ LANGUAGE plpgsql;

-- Indexes for performance optimization
-- Note: DATE_TRUNC indexes removed due to IMMUTABLE function requirement
-- Using simpler date-based indexes instead
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_updated_at ON leads(updated_at);
CREATE INDEX IF NOT EXISTS idx_leads_service_status ON leads(service, status);
CREATE INDEX IF NOT EXISTS idx_leads_utm_composite ON leads(utm_source, utm_medium, utm_campaign) WHERE utm_source IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_leads_score_status ON leads(lead_score, status);
CREATE INDEX IF NOT EXISTS idx_leads_estimated_value ON leads(estimated_value) WHERE estimated_value IS NOT NULL;