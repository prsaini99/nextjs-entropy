import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Get current date ranges
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Get leads summary
    const { data: allLeads, error: leadsError } = await supabase
      .from('leads')
      .select('status, lead_score, created_at, estimated_value');

    if (leadsError) {
      console.error('Error fetching leads summary:', leadsError);
    }

    // Get career applications summary
    const { data: allApplications, error: applicationsError } = await supabase
      .from('career_applications')
      .select('status, created_at');

    if (applicationsError) {
      console.error('Error fetching applications summary:', applicationsError);
    }

    // Process leads data
    const leads = allLeads || [];
    const applications = allApplications || [];

    // Calculate lead metrics
    const leadMetrics = {
      total: leads.length,
      new: leads.filter(l => l.status === 'new').length,
      contacted: leads.filter(l => l.status === 'contacted').length,
      qualified: leads.filter(l => l.status === 'qualified').length,
      proposal_sent: leads.filter(l => l.status === 'proposal_sent').length,
      won: leads.filter(l => l.status === 'won').length,
      lost: leads.filter(l => l.status === 'lost').length,
    };

    // Calculate time-based metrics
    const recentLeads = {
      last_24h: leads.filter(l => new Date(l.created_at) > twentyFourHoursAgo).length,
      last_7_days: leads.filter(l => new Date(l.created_at) > sevenDaysAgo).length,
      last_30_days: leads.filter(l => new Date(l.created_at) > thirtyDaysAgo).length,
    };

    // Calculate conversion rates
    const conversionRates = {
      lead_to_qualified: leadMetrics.total > 0 ? 
        ((leadMetrics.qualified + leadMetrics.proposal_sent + leadMetrics.won) / leadMetrics.total * 100).toFixed(1) : 0,
      qualified_to_won: (leadMetrics.qualified + leadMetrics.proposal_sent + leadMetrics.won) > 0 ? 
        (leadMetrics.won / (leadMetrics.qualified + leadMetrics.proposal_sent + leadMetrics.won) * 100).toFixed(1) : 0,
      overall_conversion: leadMetrics.total > 0 ? 
        (leadMetrics.won / leadMetrics.total * 100).toFixed(1) : 0,
    };

    // Calculate lead quality distribution
    const leadQuality = {
      high: leads.filter(l => l.lead_score >= 80).length,
      medium: leads.filter(l => l.lead_score >= 60 && l.lead_score < 80).length,
      low: leads.filter(l => l.lead_score < 60).length,
    };

    // Calculate estimated pipeline value
    const pipelineValue = leads
      .filter(l => ['qualified', 'proposal_sent'].includes(l.status))
      .reduce((sum, l) => sum + (parseFloat(l.estimated_value) || 0), 0);

    const wonValue = leads
      .filter(l => l.status === 'won')
      .reduce((sum, l) => sum + (parseFloat(l.estimated_value) || 0), 0);

    // Career applications metrics
    const applicationMetrics = {
      total: applications.length,
      new: applications.filter(a => a.status === 'new').length,
      reviewing: applications.filter(a => a.status === 'reviewing').length,
      interview_scheduled: applications.filter(a => a.status === 'interview_scheduled').length,
      interviewed: applications.filter(a => a.status === 'interviewed').length,
      offer_extended: applications.filter(a => a.status === 'offer_extended').length,
      hired: applications.filter(a => a.status === 'hired').length,
      rejected: applications.filter(a => a.status === 'rejected').length,
    };

    // Get recent activities (last 10 leads and applications)
    const recentActivities = [];
    
    // Add recent leads
    leads
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5)
      .forEach(lead => {
        recentActivities.push({
          type: 'lead',
          id: lead.id,
          title: `New lead: ${lead.full_name}`,
          description: `${lead.service} - Score: ${lead.lead_score}`,
          timestamp: lead.created_at,
          status: lead.status,
        });
      });

    // Add recent applications
    applications
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5)
      .forEach(app => {
        recentActivities.push({
          type: 'application',
          id: app.id,
          title: `New application: ${app.first_name} ${app.last_name}`,
          description: `${app.job_title}`,
          timestamp: app.created_at,
          status: app.status,
        });
      });

    // Sort all activities by timestamp
    recentActivities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const dashboardData = {
      summary: {
        leads: leadMetrics,
        applications: applicationMetrics,
        recent_counts: recentLeads,
        conversion_rates: conversionRates,
        pipeline_value: {
          active: pipelineValue,
          won: wonValue,
          currency: 'INR',
        },
      },
      
      lead_quality: leadQuality,
      
      recent_activities: recentActivities.slice(0, 10),
      
      alerts: generateAlerts(leadMetrics, applicationMetrics, recentLeads),
    };

    return NextResponse.json(dashboardData);

  } catch (error) {
    console.error('Error in dashboard API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateAlerts(leadMetrics, applicationMetrics, recentLeads) {
  const alerts = [];

  // High-priority leads waiting
  if (leadMetrics.new > 5) {
    alerts.push({
      type: 'warning',
      title: 'High number of new leads',
      message: `${leadMetrics.new} leads are waiting for initial contact`,
      action: 'Review new leads',
      priority: 'high',
    });
  }

  // Qualified leads not followed up
  if (leadMetrics.qualified > 3) {
    alerts.push({
      type: 'info',
      title: 'Qualified leads pending',
      message: `${leadMetrics.qualified} qualified leads need follow-up`,
      action: 'Send proposals',
      priority: 'medium',
    });
  }

  // Spike in recent leads
  if (recentLeads.last_24h > 5) {
    alerts.push({
      type: 'success',
      title: 'High lead activity',
      message: `${recentLeads.last_24h} new leads in the last 24 hours`,
      action: 'Monitor quality',
      priority: 'low',
    });
  }

  // New job applications
  if (applicationMetrics.new > 0) {
    alerts.push({
      type: 'info',
      title: 'New job applications',
      message: `${applicationMetrics.new} applications waiting for review`,
      action: 'Review applications',
      priority: 'medium',
    });
  }

  return alerts;
}