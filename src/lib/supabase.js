import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Dashboard functionality will be limited.')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Database table names
export const TABLES = {
  LEADS: 'leads',
  CAREER_APPLICATIONS: 'career_applications',
  LEAD_NOTES: 'lead_notes',
}

// Lead status options
export const LEAD_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'qualified',
  PROPOSAL_SENT: 'proposal_sent',
  WON: 'won',
  LOST: 'lost',
}

// Lead scoring weights
export const LEAD_SCORING = {
  UTM_SOURCE_WEIGHTS: {
    'google': 10,
    'linkedin': 8,
    'facebook': 6,
    'twitter': 5,
    'email': 7,
    'referral': 9,
    'direct': 8,
  },
  UTM_MEDIUM_WEIGHTS: {
    'cpc': 9,
    'organic': 7,
    'social': 6,
    'email': 8,
    'referral': 10,
  },
  SERVICE_WEIGHTS: {
    'Custom Software Development': 10,
    'AI/ML Development': 9,
    'Cloud Solutions': 8,
    'DevOps & Infrastructure': 7,
    'Mobile App Development': 8,
    'Web Development': 6,
    'Consultation': 5,
  },
}

// Utility function to calculate lead score
export function calculateLeadScore(leadData) {
  let score = 0;
  
  // UTM source scoring
  if (leadData.utm_source) {
    score += LEAD_SCORING.UTM_SOURCE_WEIGHTS[leadData.utm_source] || 3;
  }
  
  // UTM medium scoring
  if (leadData.utm_medium) {
    score += LEAD_SCORING.UTM_MEDIUM_WEIGHTS[leadData.utm_medium] || 3;
  }
  
  // Service type scoring
  if (leadData.service) {
    score += LEAD_SCORING.SERVICE_WEIGHTS[leadData.service] || 5;
  }
  
  // Budget consideration
  if (leadData.budget) {
    if (leadData.budget.includes('$50,000+') || leadData.budget.includes('₹40,00,000+')) {
      score += 10;
    } else if (leadData.budget.includes('$25,000') || leadData.budget.includes('₹20,00,000')) {
      score += 7;
    } else if (leadData.budget.includes('$10,000') || leadData.budget.includes('₹8,00,000')) {
      score += 5;
    }
  }
  
  // Company website bonus
  if (leadData.company_website) {
    score += 3;
  }
  
  // Phone number bonus
  if (leadData.phone) {
    score += 2;
  }
  
  return Math.min(score, 100); // Cap at 100
}

// Utility function to get lead priority
export function getLeadPriority(score) {
  if (score >= 80) return { level: 'high', color: 'red', label: 'High Priority' };
  if (score >= 60) return { level: 'medium', color: 'yellow', label: 'Medium Priority' };
  return { level: 'low', color: 'green', label: 'Low Priority' };
}