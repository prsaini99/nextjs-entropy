-- Resume storage for career applications.
--
-- Until now the apply route validated the uploaded file (size, MIME type) and
-- then discarded it: applications arrived with no CV, and nothing recorded that
-- a CV had ever been attached. Files now go to the private `resumes` bucket and
-- these columns hold the pointer plus enough metadata to display the file
-- without fetching it.
--
-- resume_path is the object key inside the bucket, not a URL. The bucket is
-- private, so anything that needs to show a CV mints a short-lived signed URL
-- at read time; a stored URL would either expire or, if made permanent, leak.

ALTER TABLE career_applications
  ADD COLUMN IF NOT EXISTS resume_path text,
  ADD COLUMN IF NOT EXISTS resume_filename text,
  ADD COLUMN IF NOT EXISTS resume_size integer,
  ADD COLUMN IF NOT EXISTS resume_mime text;

COMMENT ON COLUMN career_applications.resume_path IS
  'Object key in the private `resumes` storage bucket. Sign at read time; never store a URL.';
