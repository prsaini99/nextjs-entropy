-- Migration to add chatbot-specific fields to leads table
-- Run this in Supabase SQL Editor

-- Add new columns for chatbot integration
ALTER TABLE leads ADD COLUMN IF NOT EXISTS alternate_contact TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS contact_preference TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS call_arranged BOOLEAN DEFAULT false;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS calendar_link TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS thread_id TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS language_detected TEXT DEFAULT 'en';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_source TEXT DEFAULT 'form';

-- Note: phone column should already exist from contact form

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_thread_id ON leads(thread_id);
CREATE INDEX IF NOT EXISTS idx_leads_call_arranged ON leads(call_arranged);
CREATE INDEX IF NOT EXISTS idx_leads_lead_source ON leads(lead_source);
CREATE INDEX IF NOT EXISTS idx_leads_language_detected ON leads(language_detected);

-- Update existing leads to have lead_source = 'form' (retroactive)
UPDATE leads SET lead_source = 'form' WHERE lead_source IS NULL;

-- Add comment for documentation
COMMENT ON COLUMN leads.alternate_contact IS 'Phone/WhatsApp/LinkedIn or other contact method';
COMMENT ON COLUMN leads.contact_preference IS 'self-schedule or team-reach-out';
COMMENT ON COLUMN leads.call_arranged IS 'True when discovery call is successfully scheduled';
COMMENT ON COLUMN leads.calendar_link IS 'Generated Calendly link for discovery call';
COMMENT ON COLUMN leads.thread_id IS 'Chat session ID for conversation tracking';
COMMENT ON COLUMN leads.language_detected IS 'Detected language from user input (en, hi, es, etc)';
COMMENT ON COLUMN leads.lead_source IS 'Source of lead: form, chat, or other';

-- Verify the changes
SELECT column_name, data_type, column_default, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'leads' 
AND column_name IN ('alternate_contact', 'contact_preference', 'call_arranged', 'calendar_link', 'thread_id', 'language_detected', 'lead_source')
ORDER BY ordinal_position;