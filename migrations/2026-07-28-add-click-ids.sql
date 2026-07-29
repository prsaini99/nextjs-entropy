-- Ad click identifiers on leads.
--
-- Run this in Supabase → SQL Editor BEFORE the first ad goes live. Until these
-- columns exist the API will fail to insert, because it now sends them on every
-- submission.
--
-- Why this matters: gclid is the only way to tie a lead back to the specific ad
-- click that produced it. Google Ads offline conversion import takes a gclid
-- plus a conversion time and value, and that is what teaches bidding which
-- clicks become revenue rather than merely which become form fills. A click ID
-- not captured at the moment of the click is gone permanently.

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS gclid text,
  ADD COLUMN IF NOT EXISTS gbraid text,
  ADD COLUMN IF NOT EXISTS wbraid text,
  ADD COLUMN IF NOT EXISTS fbclid text,
  ADD COLUMN IF NOT EXISTS msclkid text,
  ADD COLUMN IF NOT EXISTS click_id_captured_at timestamptz;

-- Partial index: the overwhelming majority of leads are organic and have no
-- gclid, so indexing only the non-null rows keeps this small.
CREATE INDEX IF NOT EXISTS idx_leads_gclid
  ON leads (gclid)
  WHERE gclid IS NOT NULL;

COMMENT ON COLUMN leads.gclid IS
  'Google Ads click ID. Required for offline conversion import; valid for up to 90 days from the click.';
COMMENT ON COLUMN leads.click_id_captured_at IS
  'When the click ID was captured — used to check it is still inside the conversion window.';

-- Paid leads awaiting an offline conversion upload:
--   SELECT id, full_name, work_email, gclid, click_id_captured_at, status, lead_score
--   FROM leads
--   WHERE gclid IS NOT NULL
--     AND status IN ('qualified', 'proposal_sent', 'won')
--   ORDER BY created_at DESC;
