import { NextRequest, NextResponse } from 'next/server';

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

    // In a real application, you would:
    // 1. Save the application data to a database
    // 2. Upload the resume file to cloud storage
    // 3. Send notification emails to the hiring team
    // 4. Send confirmation email to the applicant
    // 5. Add to ATS (Applicant Tracking System)

    // For now, we'll log the application (in production, use proper logging)
    console.log('New job application received:', {
      jobTitle: applicationData.jobTitle,
      applicantName: `${applicationData.firstName} ${applicationData.lastName}`,
      email: applicationData.email,
      submittedAt: applicationData.submittedAt
    });

    // Return success response
    return NextResponse.json(
      { 
        message: 'Application submitted successfully',
        applicationId: `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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