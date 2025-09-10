import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form data
    const applicationData = {
      jobTitle: formData.get('jobTitle'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      location: formData.get('location'),
      workEligibility: formData.get('workEligibility'),
      visaStatus: formData.get('visaStatus'),
      portfolioUrl: formData.get('portfolioUrl'),
      linkedinUrl: formData.get('linkedinUrl'),
      githubUrl: formData.get('githubUrl'),
      yearsOfExperience: formData.get('yearsOfExperience'),
      currentRole: formData.get('currentRole'),
      currentCompany: formData.get('currentCompany'),
      education: formData.get('education'),
      university: formData.get('university'),
      graduationYear: formData.get('graduationYear'),
      technicalSkills: formData.get('technicalSkills'),
      relevantProjects: formData.get('relevantProjects'),
      roleAnswers: formData.get('roleAnswers'),
      availabilityDate: formData.get('availabilityDate'),
      salaryExpectations: formData.get('salaryExpectations'),
      referralSource: formData.get('referralSource'),
      additionalInfo: formData.get('additionalInfo'),
      privacyConsent: formData.get('privacyConsent'),
      communicationConsent: formData.get('communicationConsent'),
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

    // Save application to Supabase database
    let applicationId = null;
    try {
      const { data: savedApplication, error: supabaseError } = await supabase
        .from('career_applications')
        .insert([dbApplicationData])
        .select('id')
        .single();

      if (supabaseError) {
        console.error('Supabase error saving career application:', supabaseError);
      } else {
        applicationId = savedApplication?.id;
        console.log('Career application saved to database with ID:', applicationId);
      }
    } catch (dbError) {
      console.error('Database storage error for career application:', dbError);
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