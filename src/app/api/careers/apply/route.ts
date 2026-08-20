import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
// The service-role client, not the anon one: career_applications has RLS with
// no anon-insert policy, so the anon client's inserts die with 42501. This is
// a server route; the service key never reaches the browser.
import { supabaseAdmin } from '@/lib/supabase-admin';
import { JOBS, isJobOpen } from '@/lib/careers';
import { MAIL_FROM } from '@/constants/contact';
import {
  applicationConfirmationHtml,
  applicationConfirmationText,
} from '@/lib/career-email-templates';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form data. Each field falls back through the names the form has
    // actually used over time — this route was written against a different
    // field vocabulary than ApplicationForm.tsx sends (totalExperience vs
    // yearsOfExperience, startDate vs availabilityDate, …), which left half
    // the columns permanently null. The form's real names come first.
    const pick = (...names: string[]) => {
      for (const n of names) {
        const v = formData.get(n);
        if (v !== null && v !== '') return v;
      }
      return null;
    };

    const applicationData = {
      jobTitle: pick('jobTitle'),
      firstName: pick('firstName'),
      lastName: pick('lastName'),
      email: pick('email'),
      phone: pick('phone'),
      location: pick('currentLocation', 'location'),
      workEligibility: pick('workEligibility'),
      visaStatus: pick('visaStatus'),
      portfolioUrl: pick('portfolioUrl'),
      linkedinUrl: pick('linkedinUrl'),
      githubUrl: pick('githubUrl'),
      yearsOfExperience: pick('totalExperience', 'yearsOfExperience'),
      currentRole: pick('currentRole'),
      currentCompany: pick('currentCompany'),
      education: pick('education'),
      university: pick('university'),
      graduationYear: pick('graduationYear'),
      technicalSkills: pick('keyStrengths', 'technicalSkills'),
      relevantProjects: pick('relevantExperience', 'relevantProjects'),
      roleAnswers: pick('roleAnswers'),
      availabilityDate: pick('startDate', 'availabilityDate'),
      salaryExpectations: pick('salaryExpectation', 'salaryExpectations'),
      referralSource: pick('referralSource'),
      // The motivation questions have no dedicated columns; keep them,
      // labelled, in additional_info rather than dropping them.
      additionalInfo:
        pick('additionalInfo') ??
        ([
          formData.get('whyInterested') ? `Why interested: ${formData.get('whyInterested')}` : null,
          formData.get('whyStackBinary') ? `Why StackBinary: ${formData.get('whyStackBinary')}` : null,
          formData.get('anythingElse') ? `Anything else: ${formData.get('anythingElse')}` : null,
        ]
          .filter(Boolean)
          .join('\n\n') || null),
      privacyConsent: pick('privacyConsent'),
      communicationConsent: pick('communicationConsent', 'dataProcessingConsent'),
      // UTM tracking data
      utm_source: formData.get('utm_source'),
      utm_medium: formData.get('utm_medium'),
      utm_campaign: formData.get('utm_campaign'),
      utm_term: formData.get('utm_term'),
      utm_content: formData.get('utm_content'),
      attribution_data: formData.get('attribution_data'),
      landing_page: formData.get('landing_page'),
      referrer: formData.get('referrer'),
      submittedAt: new Date().toISOString()
    };

    const resumeFile = formData.get('resume') as File;
    
    // Validate required fields
    if (!applicationData.firstName || !applicationData.lastName || !applicationData.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicationData.email as string)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate privacy consent
    if (applicationData.privacyConsent !== 'true') {
      return NextResponse.json(
        { error: 'Privacy consent is required' },
        { status: 400 }
      );
    }

    // Validate file if present
    if (resumeFile) {
      // 4MB to match the client. The old 5MB limit was unreachable: Vercel
      // 413s request bodies over ~4.5MB before this route runs.
      const maxSize = 4 * 1024 * 1024;
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];

      if (resumeFile.size > maxSize) {
        return NextResponse.json(
          { error: 'File size must be less than 4MB' },
          { status: 400 }
        );
      }

      if (!allowedTypes.includes(resumeFile.type)) {
        return NextResponse.json(
          { error: 'Only PDF, DOC, and DOCX files are allowed' },
          { status: 400 }
        );
      }
    }

    // Prepare application data for database storage
    const dbApplicationData = {
      job_title: applicationData.jobTitle as string,
      first_name: applicationData.firstName as string,
      last_name: applicationData.lastName as string,
      email: applicationData.email as string,
      phone: applicationData.phone as string || null,
      location: applicationData.location as string || null,
      work_eligibility: applicationData.workEligibility as string || null,
      visa_status: applicationData.visaStatus as string || null,
      portfolio_url: applicationData.portfolioUrl as string || null,
      linkedin_url: applicationData.linkedinUrl as string || null,
      github_url: applicationData.githubUrl as string || null,
      years_of_experience: applicationData.yearsOfExperience as string || null,
      current_position: applicationData.currentRole as string || null,
      current_company: applicationData.currentCompany as string || null,
      education: applicationData.education as string || null,
      university: applicationData.university as string || null,
      graduation_year: applicationData.graduationYear as string || null,
      technical_skills: applicationData.technicalSkills as string || null,
      relevant_projects: applicationData.relevantProjects as string || null,
      role_answers: applicationData.roleAnswers as string || null,
      availability_date: applicationData.availabilityDate as string || null,
      salary_expectations: applicationData.salaryExpectations as string || null,
      referral_source: applicationData.referralSource as string || null,
      additional_info: applicationData.additionalInfo as string || null,
      privacy_consent: applicationData.privacyConsent === 'true',
      communication_consent: applicationData.communicationConsent === 'true',
      utm_source: applicationData.utm_source as string || null,
      utm_medium: applicationData.utm_medium as string || null,
      utm_campaign: applicationData.utm_campaign as string || null,
      utm_term: applicationData.utm_term as string || null,
      utm_content: applicationData.utm_content as string || null,
      landing_page: applicationData.landing_page as string || null,
      referrer: applicationData.referrer as string || null,
      attribution_data: applicationData.attribution_data ? 
        JSON.parse(applicationData.attribution_data as string) : null,
    };

    // Upload the CV to the private `resumes` bucket before inserting, so the
    // row is written with its pointer already resolved. The file was validated
    // above; here we only care about storing it under a key that can't collide
    // and can't be guessed.
    let resumeMeta: {
      resume_path: string | null;
      resume_filename: string | null;
      resume_size: number | null;
      resume_mime: string | null;
    } = { resume_path: null, resume_filename: null, resume_size: null, resume_mime: null };

    // Preferred path: the CV was already uploaded by /api/careers/resume and
    // we were handed its key. Verify the object really exists before trusting
    // it, so a forged resumePath cannot attach someone else's file.
    const preUploadedPath = pick('resumePath') as string | null;

    if (preUploadedPath) {
      const slash = preUploadedPath.lastIndexOf('/');
      const dir = slash > 0 ? preUploadedPath.slice(0, slash) : '';
      const name = slash > 0 ? preUploadedPath.slice(slash + 1) : preUploadedPath;

      const { data: found } = await supabaseAdmin.storage
        .from('resumes')
        .list(dir, { search: name, limit: 1 });

      if (found && found.length > 0) {
        resumeMeta = {
          resume_path: preUploadedPath,
          resume_filename: (pick('resumeFilename') as string) || null,
          resume_size: Number(pick('resumeSize')) || null,
          resume_mime: (pick('resumeMime') as string) || null,
        };
      } else {
        console.warn('resumePath did not resolve to a stored object:', preUploadedPath);
      }
    } else if (resumeFile && resumeFile.size > 0) {
      // Fallback: an inline file, as the form used to send. Kept so an older
      // cached client, or a submit where the pre-upload failed, still works.
      const safeName = (resumeFile.name || 'resume').replace(/[^a-zA-Z0-9._-]/g, '_').slice(-80);
      const key = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName}`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from('resumes')
        .upload(key, resumeFile, { contentType: resumeFile.type, upsert: false });

      if (uploadError) {
        // A lost CV is recoverable (we can ask for it); a lost application is
        // not. Record the application anyway and log loudly.
        console.error('Resume upload failed, continuing without it:', uploadError);
      } else {
        resumeMeta = {
          resume_path: key,
          resume_filename: resumeFile.name || null,
          resume_size: resumeFile.size,
          resume_mime: resumeFile.type || null,
        };
      }
    }
    Object.assign(dbApplicationData, resumeMeta);

    // Save application to Supabase. Unlike the contact route, there is no
    // email fallback here — the database row IS the application. A failed
    // insert must therefore fail the request; the old code logged the error
    // and returned 200 with a fabricated ID, losing the application while
    // telling the applicant it was received.
    // Reject applications to a role that is no longer in the rotation. The UI
    // hides the button, but LinkedIn Limited Listings keep pointing at the old
    // URL for up to 72 hours after a role is paused, so the API has to say no
    // as well.
    {
      const target = JOBS.find(
        (j) => j.title === (applicationData.jobTitle as string),
      );
      if (target && !isJobOpen(target)) {
        return NextResponse.json(
          {
            closed: true,
            error:
              'This role is no longer open. We have closed applications for it, so nothing would reach our team. Please see our current openings at stackbinary.io/careers.',
          },
          { status: 410 },
        );
      }
    }

    // Reject a repeat application for the SAME role before inserting.
    // Measured 2026-08-18: 571 of 9,475 rows were the same person applying to
    // the same role twice, and 69% of those came MORE THAN A DAY apart with a
    // median gap of 73 hours. So this is not double-clicking (the form's
    // isSubmitting guard already handles that, and zero repeats were under 10
    // seconds apart) — it is candidates re-applying because they never heard
    // back. Blocking the row is half the fix; the acknowledgement email is the
    // other half. Applying to a DIFFERENT role stays allowed: 231 people did
    // that deliberately and those are genuine separate applications.
    // NOTE: .limit(1) rather than .maybeSingle(). maybeSingle() treats more
    // than one match as an error and returns null data, which silently let
    // repeats through for exactly the applicants who repeat most (one address
    // in the table has nine rows for a single role).
    const { data: priorRows } = await supabaseAdmin
      .from('career_applications')
      .select('id, created_at')
      .ilike('email', (applicationData.email as string).trim())
      .eq('job_title', dbApplicationData.job_title)
      .order('created_at', { ascending: true })
      .limit(1);

    const priorApplication = priorRows?.[0];

    if (priorApplication) {
      const when = new Date(priorApplication.created_at).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric',
      });
      return NextResponse.json(
        {
          duplicate: true,
          error: `You already applied for this role on ${when}. Your application is with our team, and applying again will not move it forward. If your details have changed, reply to your confirmation email and we will update it.`,
        },
        { status: 409 },
      );
    }

    let applicationId = null;
    const { data: savedApplication, error: supabaseError } = await supabaseAdmin
      .from('career_applications')
      .insert([dbApplicationData])
      .select('id')
      .single();

    if (supabaseError) {
      console.error('Supabase error saving career application:', supabaseError);
      return NextResponse.json(
        { error: 'Could not record your application, please try again or email us directly.' },
        { status: 500 }
      );
    }
    applicationId = savedApplication?.id;

    // Notify the team and acknowledge the applicant. Best-effort by design:
    // the application is already safely stored, so a mail failure must not turn
    // a successful submission into an error the candidate sees. Until now this
    // route sent nothing at all — applications landed in the database and
    // nobody was told, which is why a broken form went unnoticed for weeks.
    // KILL SWITCH — 2026-08-03. A genuine applicant flood (~700 applications in
    // ~90 minutes after the roles hit LinkedIn) meant every submission fired two
    // Gmail sends: on track to exhaust the Workspace 2,000/day cap and take the
    // ad campaign's LEAD notifications down with it, while burying the inbox.
    // Applications are fully stored in career_applications either way — email
    // here is a courtesy, not the record. CAREERS_EMAILS=on now sends ONLY the
    // applicant confirmation: the internal notification to contact@ was removed
    // 2026-08-03 — /admin/careers is the inbox, and at flood volume (1,665
    // applications on Aug 3 alone) even one send per application eats most of
    // the Gmail 2,000/day cap this account shares with lead notifications.
    // Transport is a pure env decision so switching providers never needs a
    // deploy. Priority: generic SMTP_* vars (any transactional provider —
    // Brevo, Resend, ZeptoMail, SES...) > SES_SMTP_* (kept for the pending
    // AWS reconsideration) > the Gmail account (bridge only: it shares the
    // 2,000/day cap with lead notifications — the coupling that caused the
    // 2026-08-03 kill switch).
    // RESEND_API_KEY alone is enough — host/user are fixed for Resend.
    const useResend = !!process.env.RESEND_API_KEY;
    const useSmtp = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
    const useSes = process.env.SES_SMTP_USER && process.env.SES_SMTP_PASS;
    const smtpConfigured = useResend || useSmtp || useSes || (process.env.EMAIL && process.env.EMAIL_PASSWORD);
    if (process.env.CAREERS_EMAILS === 'on' && smtpConfigured) {
      try {
        // Bounce guard: never hand a provider an address that cannot receive.
        // Syntax was validated above; this checks the domain actually has mail
        // servers (MX, falling back to A per RFC 5321). The flood's typo'd
        // domains hard-bounce otherwise, and every provider suspends senders
        // whose bounce rate climbs. Resolver failures fail OPEN — a DNS blip
        // must not block a legitimate confirmation.
        const domain = (applicationData.email as string).split('@')[1];
        let deliverable = true;
        try {
          const dns = await import('node:dns/promises');
          const mx = await dns.resolveMx(domain).catch(() => []);
          if (mx.length === 0) {
            const a = await dns.resolve4(domain).catch(() => []);
            deliverable = a.length > 0;
          }
        } catch {
          deliverable = true;
        }
        if (!deliverable) {
          console.warn(`Careers confirmation skipped, no MX/A records for ${domain}`);
          throw Object.assign(new Error('undeliverable domain'), { skipped: true });
        }

        const transporter = useResend
          ? nodemailer.createTransport({
              host: 'smtp.resend.com',
              port: 587,
              secure: false,
              auth: { user: 'resend', pass: process.env.RESEND_API_KEY },
            })
          : useSmtp
          ? nodemailer.createTransport({
              host: process.env.SMTP_HOST,
              port: Number(process.env.SMTP_PORT || 587),
              secure: process.env.SMTP_PORT === '465',
              auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
            })
          : useSes
          ? nodemailer.createTransport({
              host: process.env.SES_SMTP_HOST || 'email-smtp.ap-south-1.amazonaws.com',
              port: 587,
              secure: false, // STARTTLS on 587; SES rejects implicit TLS here
              auth: { user: process.env.SES_SMTP_USER, pass: process.env.SES_SMTP_PASS },
            })
          : nodemailer.createTransport({
              service: 'gmail',
              auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
            });

        await transporter.sendMail({
          from: MAIL_FROM,
          to: applicationData.email as string,
          subject: `We have your application, ${applicationData.jobTitle || 'StackBinary'}`,
          text: applicationConfirmationText({
            firstName: applicationData.firstName as string,
            jobTitle: applicationData.jobTitle as string,
          }),
          html: applicationConfirmationHtml({
            firstName: applicationData.firstName as string,
            jobTitle: applicationData.jobTitle as string,
          }),
        });
      } catch (mailError) {
        console.error('Career confirmation email failed (application was still saved):', mailError);
      }
    }

    // Log the application (keeping existing logging)
    console.log('New job application received:', {
      jobTitle: applicationData.jobTitle,
      applicantName: `${applicationData.firstName} ${applicationData.lastName}`,
      email: applicationData.email,
      submittedAt: applicationData.submittedAt,
      databaseId: applicationId
    });

    // Return success response with database ID if available
    return NextResponse.json(
      { 
        message: 'Application submitted successfully',
        applicationId: applicationId || `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        status: 'received'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing job application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}