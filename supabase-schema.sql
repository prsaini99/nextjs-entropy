-- StackBinary Lead Dashboard Database Schema
-- Run this in your Supabase SQL Editor to set up the database

-- Create leads table for contact form submissions
CREATE TABLE IF NOT EXISTS leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Contact information
  full_name text NOT NULL,
  work_email text NOT NULL,
  phone text,
  company_website text,
  
  -- Project details
  service text NOT NULL,
  budget text,
  timeline text NOT NULL,
  project_summary text,
  
  -- Privacy and consent
  privacy_consent boolean DEFAULT false,
  
  -- UTM tracking fields
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  landing_page text,
  referrer text,
  attribution_data jsonb,
  
  -- Lead management fields
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost')),
  lead_score integer DEFAULT 0 CHECK (lead_score >= 0 AND lead_score <= 100),
  estimated_value decimal(10,2),
  assigned_to text,
  
  -- Timestamps
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create career applications table
CREATE TABLE IF NOT EXISTS career_applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Job information
  job_title text NOT NULL,
  
  -- Personal information
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  location text,
  
  -- Work eligibility
  work_eligibility text,
  visa_status text,
  
  -- Professional profiles
  portfolio_url text,
  linkedin_url text,
  github_url text,
  
  -- Experience
  years_of_experience text,
  current_position text,
  current_company text,
  
  -- Education
  education text,
  university text,
  graduation_year text,
  
  -- Skills and projects
  technical_skills text,
  relevant_projects text,
  role_answers text,
  
  -- Availability and compensation
  availability_date text,
  salary_expectations text,
  
  -- Additional information
  referral_source text,
  additional_info text,
  
  -- Consent
  privacy_consent boolean DEFAULT false,
  communication_consent boolean DEFAULT false,
  
  -- UTM tracking fields
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  landing_page text,
  referrer text,
  attribution_data jsonb,
  
  -- Application status
  status text DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'interview_scheduled', 'interviewed', 'offer_extended', 'hired', 'rejected')),
  
  -- Timestamps
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create lead notes table for follow-up tracking
CREATE TABLE IF NOT EXISTS lead_notes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id uuid REFERENCES leads(id) ON DELETE CASCADE,
  note text NOT NULL,
  note_type text DEFAULT 'general' CHECK (note_type IN ('general', 'call', 'email', 'meeting', 'proposal', 'follow_up')),
  created_by text DEFAULT 'system',
  created_at timestamp with time zone DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_utm_source ON leads(utm_source);
CREATE INDEX IF NOT EXISTS idx_leads_utm_medium ON leads(utm_medium);
CREATE INDEX IF NOT EXISTS idx_leads_utm_campaign ON leads(utm_campaign);
CREATE INDEX IF NOT EXISTS idx_leads_lead_score ON leads(lead_score);

CREATE INDEX IF NOT EXISTS idx_career_applications_status ON career_applications(status);
CREATE INDEX IF NOT EXISTS idx_career_applications_created_at ON career_applications(created_at);
CREATE INDEX IF NOT EXISTS idx_career_applications_job_title ON career_applications(job_title);

CREATE INDEX IF NOT EXISTS idx_lead_notes_lead_id ON lead_notes(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_notes_created_at ON lead_notes(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at timestamp
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_career_applications_updated_at ON career_applications;
CREATE TRIGGER update_career_applications_updated_at
  BEFORE UPDATE ON career_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for better security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated access (you can modify these based on your needs)
-- For now, allow all operations for authenticated users
CREATE POLICY "Allow all operations for authenticated users" ON leads
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all operations for authenticated users" ON career_applications
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all operations for authenticated users" ON lead_notes
  FOR ALL USING (auth.role() = 'authenticated');

-- Allow anonymous users to insert (for the contact forms)
CREATE POLICY "Allow anonymous insert on leads" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous insert on career_applications" ON career_applications
  FOR INSERT WITH CHECK (true);

-- Create views for common queries
CREATE OR REPLACE VIEW leads_summary AS
SELECT 
  COUNT(*) as total_leads,
  COUNT(CASE WHEN status = 'new' THEN 1 END) as new_leads,
  COUNT(CASE WHEN status = 'contacted' THEN 1 END) as contacted_leads,
  COUNT(CASE WHEN status = 'qualified' THEN 1 END) as qualified_leads,
  COUNT(CASE WHEN status = 'won' THEN 1 END) as won_leads,
  COUNT(CASE WHEN created_at > NOW() - INTERVAL '30 days' THEN 1 END) as leads_this_month,
  COUNT(CASE WHEN created_at > NOW() - INTERVAL '7 days' THEN 1 END) as leads_this_week
FROM leads;

CREATE OR REPLACE VIEW utm_performance AS
SELECT 
  utm_source,
  utm_medium,
  utm_campaign,
  COUNT(*) as lead_count,
  COUNT(CASE WHEN status = 'won' THEN 1 END) as conversions,
  ROUND(
    (COUNT(CASE WHEN status = 'won' THEN 1 END)::float / COUNT(*)::float * 100)::numeric,
  2) as conversion_rate,
  AVG(lead_score) as avg_lead_score
FROM leads
WHERE utm_source IS NOT NULL
GROUP BY utm_source, utm_medium, utm_campaign
ORDER BY lead_count DESC;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Insert some example data (optional - remove if not needed)
-- INSERT INTO leads (full_name, work_email, service, timeline, utm_source, utm_medium, utm_campaign, lead_score)
-- VALUES 
--   ('John Doe', 'john@example.com', 'Custom Software Development', '3-6 months', 'google', 'cpc', 'brand_keywords', 85),
--   ('Jane Smith', 'jane@example.com', 'AI/ML Development', '1-3 months', 'linkedin', 'social', 'ai_promotion', 75);