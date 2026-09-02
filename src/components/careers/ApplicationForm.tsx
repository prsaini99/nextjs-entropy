'use client';
import React, { useState, useEffect } from 'react';
import { Job } from '@/lib/careers';
import { useUTMTracking } from '@/hooks/useUTMTracking';
import { trackEvent, trackFormInteraction, trackConversion, ANALYTICS_EVENTS } from '@/lib/analytics';

interface Props {
  job: Job;
  onClose: () => void;
}

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Work Eligibility
  workEligibility: 'indian-citizen' | 'permanent-resident' | 'visa-holder' | 'need-sponsorship';
  currentLocation: string;
  
  // Experience
  portfolioUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  resumeFile: File | null;
  
  // Education
  highestEducation: string;
  university: string;
  graduationYear: string;
  
  // Experience Details
  currentRole: string;
  currentCompany: string;
  totalExperience: string;
  relevantExperience: string;
  
  // Skills and Motivation
  keyStrengths: string;
  whyInterested: string;
  whyStackbinary: string;
  
  // Role-specific Questions
  roleAnswers: Record<string, string>;
  
  // Additional
  startDate: string;
  salaryExpectation: string;
  anythingElse: string;
  
  // Legal
  privacyConsent: boolean;
  dataProcessingConsent: boolean;
}

export default function ApplicationForm({ job, onClose }: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { utmData, getAttributionData } = useUTMTracking();
  
  // Track form view on mount
  useEffect(() => {
    trackEvent(ANALYTICS_EVENTS.CAREER_APPLY_START, {
      job_title: job.title,
      job_team: job.team,
      job_location: job.location,
      job_type: job.type
    });
  }, [job]);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    workEligibility: 'indian-citizen',
    currentLocation: '',
    portfolioUrl: '',
    linkedinUrl: '',
    githubUrl: '',
    resumeFile: null,
    highestEducation: '',
    university: '',
    graduationYear: '',
    currentRole: '',
    currentCompany: '',
    totalExperience: '',
    relevantExperience: '',
    keyStrengths: '',
    whyInterested: '',
    whyStackbinary: '',
    roleAnswers: {},
    startDate: '',
    salaryExpectation: '',
    anythingElse: '',
    privacyConsent: false,
    dataProcessingConsent: false
  });

  const totalSteps = job.roleQuestions ? 6 : 5;

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRoleAnswerChange = (question: string, answer: string) => {
    setFormData(prev => ({
      ...prev,
      roleAnswers: { ...prev.roleAnswers, [question]: answer }
    }));
  };

  // 4MB, not the API route's nominal 5MB: Vercel rejects request bodies over
  // ~4.5MB with an opaque 413 before our route ever runs. On 2026-08-03 three
  // applicants with 4.5-5MB CVs retried 31 times against that wall. Capping
  // here, at selection time, is the only place the user gets a useful message.
  const MAX_CV_BYTES = 4 * 1024 * 1024;
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > MAX_CV_BYTES) {
      setFileError('This file is larger than 4MB. Please compress it or export a smaller PDF.');
      trackFormInteraction('career_application', 'error', {
        job_title: job.title,
        error_type: 'cv_too_large_client',
      });
      e.target.value = '';
      setFormData(prev => ({ ...prev, resumeFile: null }));
      return;
    }
    setFileError(null);
    setFormData(prev => ({ ...prev, resumeFile: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Enter in any text field submits the form even though the submit button
    // only renders on the last step — on 2026-08-03 that sent dozens of
    // half-completed applications to the API (consent unchecked, emails
    // mid-keystroke). Enter now behaves like the Next button instead.
    if (currentStep !== totalSteps) {
      if (canProceed()) {
        trackFormInteraction('career_application', 'progress', {
          job_title: job.title,
          step: currentStep,
        });
        setCurrentStep(prev => Math.min(totalSteps, prev + 1));
      }
      return;
    }
    if (!canProceed() || isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      // Get UTM and attribution data
      const attributionData = getAttributionData();
      const currentUTM = (utmData as any)?.current || (utmData as any)?.last_touch || (utmData as any)?.first_touch || {};
      
      // Create FormData with all application data
      const submitData = new FormData();
      
      // Add all form fields
      submitData.append('jobTitle', job.title);
      submitData.append('firstName', formData.firstName);
      submitData.append('lastName', formData.lastName);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('workEligibility', formData.workEligibility);
      submitData.append('currentLocation', formData.currentLocation);
      submitData.append('portfolioUrl', formData.portfolioUrl || '');
      submitData.append('linkedinUrl', formData.linkedinUrl || '');
      submitData.append('githubUrl', formData.githubUrl || '');
      // The CV goes up on its own request BEFORE the application, and only its
      // storage key travels with the submit. Sending the file inline made the
      // final POST large and slow, and on weak mobile connections it died
      // before the response returned: 899 "Failed to fetch" errors on
      // 2026-08-19, with the row often saved server-side anyway. Keeping the
      // submit small is what fixes that.
      //
      // A failed pre-upload is deliberately NOT fatal. We fall back to sending
      // the file inline, so the applicant still gets through on the old path
      // rather than being blocked by a CV that would not upload.
      if (formData.resumeFile) {
        let attached = false;
        try {
          const fileForm = new FormData();
          fileForm.append('resume', formData.resumeFile);
          const up = await fetch('/api/careers/resume', { method: 'POST', body: fileForm });
          if (up.ok) {
            const meta = await up.json();
            submitData.append('resumePath', meta.resumePath);
            submitData.append('resumeFilename', meta.resumeFilename ?? '');
            submitData.append('resumeSize', String(meta.resumeSize ?? ''));
            submitData.append('resumeMime', meta.resumeMime ?? '');
            attached = true;
          }
        } catch {
          // Network failure on the pre-upload: fall through to inline.
        }
        if (!attached) {
          submitData.append('resume', formData.resumeFile);
        }
      }
      submitData.append('totalExperience', formData.totalExperience);
      submitData.append('relevantExperience', formData.relevantExperience || '');
      submitData.append('keyStrengths', formData.keyStrengths);
      submitData.append('whyInterested', formData.whyInterested);
      submitData.append('whyStackbinary', formData.whyStackbinary);
      submitData.append('roleAnswers', JSON.stringify(formData.roleAnswers));
      submitData.append('startDate', formData.startDate);
      submitData.append('salaryExpectation', formData.salaryExpectation || '');
      submitData.append('anythingElse', formData.anythingElse || '');

      // The consents. These were collected in the UI but never sent, and the
      // API rejects any submission without privacyConsent='true' — which made
      // every application ever submitted fail with a 400. Do not remove.
      submitData.append('privacyConsent', String(formData.privacyConsent));
      submitData.append('dataProcessingConsent', String(formData.dataProcessingConsent));
      
      // Add UTM tracking data
      submitData.append('utm_source', currentUTM.utm_source || '');
      submitData.append('utm_medium', currentUTM.utm_medium || '');
      submitData.append('utm_campaign', currentUTM.utm_campaign || '');
      submitData.append('utm_term', currentUTM.utm_term || '');
      submitData.append('utm_content', currentUTM.utm_content || '');
      submitData.append('attribution_data', JSON.stringify(attributionData));
      submitData.append('landing_page', currentUTM.landing_page || '');
      submitData.append('referrer', currentUTM.referrer || '');
      
      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: submitData
      });
      
      if (response.ok) {
        // Track successful submission
        trackEvent(ANALYTICS_EVENTS.CAREER_APPLY_SUBMIT, {
          job_title: job.title,
          job_team: job.team,
          experience_level: formData.totalExperience
        });
        
        // Track as conversion
        trackConversion('career_application_submit', null, 'INR', {
          job_title: job.title,
          lead_source: currentUTM.utm_source || 'direct',
          lead_medium: currentUTM.utm_medium || 'none'
        });
        
        // Swap the form for the success panel instead of closing. Two reasons:
        // the old alert promised a confirmation email that the CAREERS_EMAILS
        // kill switch may be suppressing, and the moment right after applying
        // is the one time a candidate will happily follow the company page —
        // the LinkedIn CTA lives there. No timeline promised, deliberately.
        setSubmitted(true);
      } else {
        // Surface the server's actual reason — a generic message is how the
        // consent bug went undiagnosed: 43 error events, zero information.
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || `Submission failed (${response.status})`);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      trackFormInteraction('career_application', 'error', {
        job_title: job.title,
        error_type: String((error as Error).message || 'submission_failed').slice(0, 100)
      });
      // A duplicate is not an error the applicant should be told to retry:
      // retrying is exactly what produced 571 repeat rows. Show the server's
      // explanation, which names the date they already applied.
      const message = (error as Error).message || '';
      alert(
        message.startsWith('You already applied')
          ? message
          : 'There was an error submitting your application. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // canProceed is called on every render, so it must never fire analytics —
  // the old version tracked 'progress' in here and produced 67 events from a
  // single applicant typing their name. Progress now fires once per step
  // advance, in the Next button handler.
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.workEligibility && formData.currentLocation;
      case 3:
        return formData.resumeFile && formData.totalExperience;
      case 4:
        return formData.keyStrengths && formData.whyInterested && formData.whyStackbinary;
      case 5:
        if (job.roleQuestions) {
          return job.roleQuestions.every(q => formData.roleAnswers[q]);
        }
        return formData.startDate && formData.privacyConsent && formData.dataProcessingConsent;
      case 6:
        return formData.startDate && formData.privacyConsent && formData.dataProcessingConsent;
      default:
        return false;
    }
  };

  // Mirrors canProceed(), but names what is still missing rather than just
  // returning false. canProceed only decides whether the button works, and a
  // disabled .primary-button is invisible: the class has no :disabled rule, so
  // it renders in full brand red at opacity 1 exactly like a live button.
  // Clarity on 2026-08-22/23 recorded 14,907 dead clicks and 544 rage clicks on
  // "Next" for this one job page, plus 2,717 rage clicks around the consent row
  // where Submit sits disabled until both boxes are ticked. People were
  // clicking a button that looked clickable with nothing telling them why it
  // did nothing. The dimming below makes the state visible, this names the gap.
  const missingFields = (): string[] => {
    const missing: string[] = [];
    const need = (value: unknown, label: string) => {
      if (!value) missing.push(label);
    };
    switch (currentStep) {
      case 1:
        need(formData.firstName, 'First name');
        need(formData.lastName, 'Last name');
        need(formData.email, 'Email');
        need(formData.phone, 'Phone');
        break;
      case 2:
        need(formData.workEligibility, 'Work eligibility');
        need(formData.currentLocation, 'Current location');
        break;
      case 3:
        need(formData.resumeFile, 'CV upload');
        need(formData.totalExperience, 'Total experience');
        break;
      case 4:
        need(formData.keyStrengths, 'Key strengths');
        need(formData.whyInterested, 'Why this role');
        need(formData.whyStackbinary, 'Why Stackbinary');
        break;
      case 5:
        if (job.roleQuestions) {
          job.roleQuestions.forEach((q, i) =>
            need(formData.roleAnswers[q], `Question ${i + 1}`),
          );
          break;
        }
      // falls through: with no role questions, step 5 is the final step
      case 6:
        need(formData.startDate, 'Earliest start date');
        need(formData.privacyConsent, 'Consent to data processing');
        need(formData.dataProcessingConsent, 'Consent to 12-month storage');
        break;
    }
    return missing;
  };

  const inputClassName = "w-full p-3 border border-[#17171A]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-[#17171A]/25 bg-white text-[#17171A] placeholder-gray-500";
  const selectClassName = "w-full p-3 border border-[#17171A]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-[#17171A]/25 bg-white text-[#17171A] [&>option]:bg-white [&>option]:text-[#17171A]";
  const textareaClassName = "w-full p-3 border border-[#17171A]/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-[#17171A]/25 bg-white text-[#17171A] placeholder-gray-500 resize-vertical";
  const labelClassName = "block text-size-small text-weight-medium mb-2 text-[#17171A]";
  const headingClassName = "text-size-large text-weight-medium text-[#17171A] mb-6";

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className={headingClassName}>Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClassName}>First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={inputClassName}
                  required
                />
              </div>
              <div>
                <label className={labelClassName}>Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={inputClassName}
                  required
                />
              </div>
            </div>
            <div>
              <label className={labelClassName}>Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={inputClassName}
                required
              />
            </div>
            <div>
              <label className={labelClassName}>Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={inputClassName}
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className={headingClassName}>Work Eligibility</h3>
            <div>
              <label className={labelClassName}>Work Authorization Status *</label>
              <select
                value={formData.workEligibility}
                onChange={(e) => handleInputChange('workEligibility', e.target.value)}
                className={selectClassName}
                required
              >
                <option value="indian-citizen">Indian Citizen</option>
                <option value="permanent-resident">Permanent Resident</option>
                <option value="visa-holder">Current Visa Holder</option>
                <option value="need-sponsorship">Will need visa sponsorship</option>
              </select>
            </div>
            <div>
              <label className={labelClassName}>Current Location *</label>
              <input
                type="text"
                value={formData.currentLocation}
                onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                placeholder="City, State/Country"
                className={inputClassName}
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className={headingClassName}>Professional Background</h3>
            <div>
              <label className={labelClassName}>Resume *</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className={inputClassName}
                required
              />
              <div className="text-size-small mt-1 text-[#17171A]/55">PDF, DOC, or DOCX format, max 4MB</div>
              {fileError && (
                <div className="text-size-small mt-2 text-[#E0362C]">{fileError}</div>
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClassName}>LinkedIn Profile</label>
                <input
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className={inputClassName}
                />
              </div>
              <div>
                <label className={labelClassName}>GitHub/Portfolio</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                  placeholder="https://github.com/yourusername"
                  className={inputClassName}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClassName}>Total Years of Experience *</label>
                <select
                  value={formData.totalExperience}
                  onChange={(e) => handleInputChange('totalExperience', e.target.value)}
                  className={selectClassName}
                  required
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-8">5-8 years</option>
                  <option value="8+">8+ years</option>
                </select>
              </div>
              <div>
                <label className={labelClassName}>Relevant Experience</label>
                <input
                  type="text"
                  value={formData.relevantExperience}
                  onChange={(e) => handleInputChange('relevantExperience', e.target.value)}
                  placeholder="Years in similar roles"
                  className={inputClassName}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className={headingClassName}>Tell Us About You</h3>
            <div>
              <label className={labelClassName}>What are your key technical strengths? *</label>
              <textarea
                value={formData.keyStrengths}
                onChange={(e) => handleInputChange('keyStrengths', e.target.value)}
                rows={4}
                placeholder="List your main technical skills, technologies, and areas of expertise..."
                className={textareaClassName}
                required
              />
            </div>
            <div>
              <label className={labelClassName}>Why are you interested in this role? *</label>
              <textarea
                value={formData.whyInterested}
                onChange={(e) => handleInputChange('whyInterested', e.target.value)}
                rows={4}
                placeholder="What excites you about this opportunity..."
                className={textareaClassName}
                required
              />
            </div>
            <div>
              <label className={labelClassName}>Why do you want to join Stackbinary? *</label>
              <textarea
                value={formData.whyStackbinary}
                onChange={(e) => handleInputChange('whyStackbinary', e.target.value)}
                rows={4}
                placeholder="What draws you to our company and culture..."
                className={textareaClassName}
                required
              />
            </div>
          </div>
        );

      case 5:
        if (job.roleQuestions) {
          return (
            <div className="space-y-6">
              <h3 className={headingClassName}>Role-Specific Questions</h3>
              {job.roleQuestions.map((question, index) => (
                <div key={index}>
                  <label className={labelClassName}>{question} *</label>
                  <textarea
                    value={formData.roleAnswers[question] || ''}
                    onChange={(e) => handleRoleAnswerChange(question, e.target.value)}
                    rows={4}
                    className={textareaClassName}
                    required
                  />
                </div>
              ))}
            </div>
          );
        }
        // Fall through to final step if no role questions
        
      case 6:
        return (
          <div className="space-y-6">
            <h3 className={headingClassName}>Final Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClassName}>Earliest Start Date *</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className={inputClassName}
                  required
                />
              </div>
              <div>
                <label className={labelClassName}>Salary Expectation (Optional)</label>
                <input
                  type="text"
                  value={formData.salaryExpectation}
                  onChange={(e) => handleInputChange('salaryExpectation', e.target.value)}
                  placeholder="e.g., 15-20 LPA"
                  className={inputClassName}
                />
              </div>
            </div>
            <div>
              <label className={labelClassName}>Anything else you&apos;d like us to know?</label>
              <textarea
                value={formData.anythingElse}
                onChange={(e) => handleInputChange('anythingElse', e.target.value)}
                rows={3}
                placeholder="Additional information, questions, or comments..."
                className={textareaClassName}
              />
            </div>
            {/* Pre-submit follow nudge: deliberately placed before the outcome
                (post-submit asks convert ~14%; the applicant still wants
                something here). Copy states how we contact people, LinkedIn
                DM or official email, without promising announcements. */}
            <div className="border border-[#17171A]/10 bg-white rounded-lg p-4">
              <p className="text-size-small text-[#17171A]/75 mb-3">
                We connect with shortlisted candidates through LinkedIn or our
                official email IDs. Follow Stackbinary on LinkedIn so our
                message doesn&apos;t catch you by surprise.
              </p>
              <a
                href="https://www.linkedin.com/company/stackbinary"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent(ANALYTICS_EVENTS.CTA_CLICK, {
                    cta_location: 'careers_form_final_step',
                    cta_label: 'linkedin_follow',
                    job_title: job.title,
                  })
                }
                className="inline-block text-size-small text-weight-bold text-[#E0362C] hover:underline"
              >
                Follow Stackbinary on LinkedIn →
              </a>
            </div>
            <div className="space-y-4 pt-4 border-t border-[#17171A]/10">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy-consent"
                  checked={formData.privacyConsent}
                  onChange={(e) => handleInputChange('privacyConsent', e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#E0362C] focus:ring-red-500 border-[#17171A]/15 rounded bg-white"
                  required
                />
                <label htmlFor="privacy-consent" className="text-size-small text-[#17171A]/65">
                  I consent to the collection and processing of my personal data for recruitment purposes. *
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="data-processing"
                  checked={formData.dataProcessingConsent}
                  onChange={(e) => handleInputChange('dataProcessingConsent', e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#E0362C] focus:ring-red-500 border-[#17171A]/15 rounded bg-white"
                  required
                />
                <label htmlFor="data-processing" className="text-size-small text-[#17171A]/65">
                  I agree to Stackbinary storing my application data for up to 12 months for potential future opportunities. *
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-[#17171A] bg-opacity-80 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full border border-[#17171A]/10 p-8 text-[#17171A] text-center">
          <div className="text-4xl mb-4">✓</div>
          <h2 className="text-size-xlarge text-weight-medium mb-3">Application received</h2>
          <p className="text-size-regular opacity-85 mb-8 max-w-md mx-auto">
            Thanks for applying for {job.title}. Our team reviews every application
            and we&apos;ll get back to you.
          </p>
          <div className="border border-[#17171A]/10 rounded-lg p-6 mb-8">
            <p className="text-size-regular opacity-80 mb-4">
              We announce new roles and ship-updates on LinkedIn first, follow
              Stackbinary to hear about them before they&apos;re posted anywhere else.
            </p>
            <a
              href="https://www.linkedin.com/company/stackbinary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent(ANALYTICS_EVENTS.CTA_CLICK, {
                  cta_location: 'careers_apply_success',
                  cta_label: 'linkedin_follow',
                  job_title: job.title,
                })
              }
              className="primary-button w-inline-block"
            >
              <div className="relative">
                <div className="text-size-small text-weight-bold">Follow Stackbinary on LinkedIn</div>
              </div>
              <div className="button-elipse"></div>
            </a>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 text-size-small border border-[#17171A]/15 rounded-lg hover:border-[#17171A]/25 transition-colors text-[#17171A]"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#17171A] bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#17171A]/10">
        <div className="p-6 border-b border-[#17171A]/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-size-xlarge text-weight-medium text-[#17171A]">Apply for {job.title}</h2>
              <div className="text-size-small mt-1 text-[#17171A]/55">{job.team} • {job.location}</div>
            </div>
            <button
              onClick={onClose}
              className="text-[#17171A]/40 hover:text-[#17171A]/65 text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* Progress indicator */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-size-small opacity-85 mb-2 text-[#17171A]">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% complete</span>
            </div>
            <div className="w-full bg-[#17171A]/10 rounded-full h-2">
              <div 
                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 text-[#17171A]">
          {renderStep()}

          <div className="flex justify-between mt-8 pt-6 border-t border-[#17171A]/10">
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="px-6 py-2 text-size-small border border-[#17171A]/15 rounded-lg hover:border-gray-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-[#17171A]"
            >
              Previous
            </button>
            
            {currentStep === totalSteps ? (
              <button
                type="submit"
                disabled={!canProceed() || isSubmitting}
                className="primary-button w-inline-block disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <div className="relative">
                  <div className="text-size-small text-weight-bold">{isSubmitting ? 'Submitting...' : 'Submit Application'}</div>
                </div>
                <div className="button-elipse"></div>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  // One progress event per step actually completed — the
                  // signal the funnel analysis needs, nothing more.
                  trackFormInteraction('career_application', 'progress', {
                    job_title: job.title,
                    step: currentStep,
                  });
                  setCurrentStep(prev => Math.min(totalSteps, prev + 1));
                }}
                disabled={!canProceed()}
                className="primary-button w-inline-block disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <div className="relative">
                  <div className="text-size-small text-weight-bold">Next</div>
                </div>
                <div className="button-elipse"></div>
              </button>
            )}
          </div>

          {/* Say which field is holding them up. The dimmed button tells them
              they cannot continue, this tells them why, which is the half that
              was missing while people rage-clicked their way off the page. */}
          {missingFields().length > 0 && (
            <div className="mt-3 text-size-small text-[#17171A]/55 text-right">
              Still needed: {missingFields().join(', ')}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}