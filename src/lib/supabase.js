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
  // Keys are the exact service titles from components/pages/Features/data.js,
  // which are also the contact form's dropdown values. An unrecognised service
  // silently falls back to 5 — so if a service line is renamed there, rename it
  // here too. Weights are deal-size heuristics; tune them freely.
  SERVICE_WEIGHTS: {
    'Custom Software Development': 10,
    'AI & Machine Learning (Chatbots, NLP, Vision)': 9,
    'Cloud Migration & Managed Services (AWS, Azure, GCP)': 9,
    'Data Analytics & Business Intelligence': 8,
    'Cybersecurity & AppSec': 8,
    'SaaS & Marketplace Integrations': 8,
    'DevOps & SRE': 7,
    'Automation & RPA': 7,
    'Website & Web App Development': 6,
    'Digital Marketing': 6,
    'Blockchain Development': 6,
    'IoT Solutions': 6,
    'Game Development': 5,
    'AR/VR Development': 5,
    'IT Consulting': 5,
    'IT Support & Maintenance': 4,
    'Not sure yet — advise me': 3,
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
  
  // Budget consideration. Matches the Lakh-denominated values used by both the
  // contact and MarTech dropdowns; the $ / ₹00,000 forms are legacy free-text
  // entries kept so historical re-scoring stays consistent.
  // Order matters: check the highest tier first, since '₹15 – ₹40 Lakh'
  // contains '40 lakh' but not '40 lakh+'.
  if (leadData.budget) {
    const budget = leadData.budget.toLowerCase();
    if (budget.includes('40 lakh+') || budget.includes('$50,000+') || budget.includes('₹40,00,000+')) {
      score += 10;
    } else if (budget.includes('15 – ₹40') || budget.includes('$25,000') || budget.includes('₹20,00,000')) {
      score += 7;
    } else if (budget.includes('5 – ₹15') || budget.includes('$10,000') || budget.includes('₹8,00,000')) {
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