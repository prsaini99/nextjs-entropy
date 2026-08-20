import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

/**
 * Uploads a CV on its own, ahead of the application submit.
 *
 * Why this exists: the apply route used to take the whole application AND the
 * CV in one multipart POST. On a phone with a weak connection that request is
 * large and slow, and it frequently died before the response came back. On
 * 2026-08-19 that produced 899 "Failed to fetch" errors in a day, and the
 * database ended up with 555 MORE rows than the client recorded as successful,
 * meaning the server had saved the application and the applicant was told it
 * failed.
 *
 * Splitting the file out leaves the final submit small enough to survive a
 * flaky connection, which is what actually fixes that class of error.
 *
 * Returns the storage key. The apply route trusts that key only after
 * confirming the object exists, so a forged path cannot attach someone else's
 * file to an application.
 */

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const file = form.get('resume');

    if (!file || typeof file === 'string' || file.size === 0) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: 'Resume must be under 5MB' },
        { status: 400 },
      );
    }
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json(
        { error: 'Only PDF, DOC, and DOCX files are allowed' },
        { status: 400 },
      );
    }

    const safeName = (file.name || 'resume')
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .slice(-80);
    const key = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName}`;

    const { error } = await supabaseAdmin.storage
      .from('resumes')
      .upload(key, file, { contentType: file.type, upsert: false });

    if (error) {
      console.error('Resume pre-upload failed:', error);
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }

    return NextResponse.json({
      resumePath: key,
      resumeFilename: file.name || null,
      resumeSize: file.size,
      resumeMime: file.type || null,
    });
  } catch (err) {
    console.error('Resume upload route error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
