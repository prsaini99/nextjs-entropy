import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
// The service-role client, not the anon one: career_applications has RLS with
// no anon-insert policy, so the anon client's inserts die with 42501. This is
// a server route; the service key never reaches the browser.
import { supabaseAdmin } from '@/lib/supabase-admin';
import { NOTIFY_EMAIL, MAIL_FROM } from '@/constants/contact';
import {
  applicationConfirmationHtml,
  applicationConfirmationText,
  applicationNotificationHtml,
  applicationNotificationText,
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
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];

      if (resumeFile.size > maxSize) {
        return NextResponse.json(
          { error: 'File size must be less than 5MB' },
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

    if (resumeFile && resumeFile.size > 0) {
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
    if (process.env.EMAIL && process.env.EMAIL_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
        });

        const view = {
          applicationId,
          jobTitle: applicationData.jobTitle as string,
          firstName: applicationData.firstName as string,
          lastName: applicationData.lastName as string,
          email: applicationData.email as string,
          phone: applicationData.phone as string,
          location: applicationData.location as string,
          workEligibility: applicationData.workEligibility as string,
          yearsOfExperience: applicationData.yearsOfExperience as string,
          availabilityDate: applicationData.availabilityDate as string,
          salaryExpectations: applicationData.salaryExpectations as string,
          portfolioUrl: applicationData.portfolioUrl as string,
          linkedinUrl: applicationData.linkedinUrl as string,
          githubUrl: applicationData.githubUrl as string,
          technicalSkills: applicationData.technicalSkills as string,
          relevantProjects: applicationData.relevantProjects as string,
          additionalInfo: applicationData.additionalInfo as string,
          roleAnswers: applicationData.roleAnswers as string,
          resumeFilename: resumeMeta.resume_filename,
        };

        // Internal notification. The CV rides along as an attachment so the
        // team can read it without opening the storage console.
        const notification: Record<string, unknown> = {
          from: MAIL_FROM,
          to: NOTIFY_EMAIL,
          replyTo: applicationData.email as string,
          subject: `New application: ${view.jobTitle || 'role'} — ${view.firstName} ${view.lastName}`,
          text: applicationNotificationText(view),
          html: applicationNotificationHtml(view),
        };
        if (resumeFile && resumeFile.size > 0) {
          notification.attachments = [
            {
              filename: resumeFile.name || 'resume.pdf',
              content: Buffer.from(await resumeFile.arrayBuffer()),
              contentType: resumeFile.type,
            },
          ];
        }
        await transporter.sendMail(notification);

        await transporter.sendMail({
          from: MAIL_FROM,
          to: applicationData.email as string,
          subject: `We have your application — ${view.jobTitle || 'StackBinary'}`,
          text: applicationConfirmationText({ firstName: view.firstName, jobTitle: view.jobTitle }),
          html: applicationConfirmationHtml({ firstName: view.firstName, jobTitle: view.jobTitle }),
        });
      } catch (mailError) {
        console.error('Career application email failed (application was still saved):', mailError);
      }
    } else {
      console.warn('EMAIL/EMAIL_PASSWORD not configured — application saved without notification');
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