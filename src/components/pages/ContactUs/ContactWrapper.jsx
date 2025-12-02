'use client';
import React, { useState, useEffect } from 'react';
import AnimatedInViewDiv from '@/components/Animate/AppearInView';
import Link from 'next/link';
import { useUTMTracking, getUTMData } from '@/hooks/useUTMTracking';
import { trackEvent, trackFormInteraction, trackSocialClick, trackConversion, ANALYTICS_EVENTS } from '@/lib/analytics';

const FORM_STATUS = {
    IDLE: "idle",
    STEP_ONE: "step_one",
    STEP_TWO: "step_two",
    SUCCESS: "success",
    ERROR: "error",
}

// Removed dropdown options - now using text inputs for better UX

const initStep1Data = {
    fullName: '',
    workEmail: '',
    service: '',
    budget: '',
    timeline: '',
};

const initStep2Data = {
    projectSummary: '',
    companyWebsite: '',
    attachmentFile: null,
    phone: '',
    privacyConsent: false,
};

export default function ContactWrapper() {
    const [step1Data, setStep1Data] = useState(initStep1Data);
    const [step2Data, setStep2Data] = useState(initStep2Data);
    const [status, setStatus] = useState(FORM_STATUS.IDLE);
    const [loading, setLoading] = useState(false);
    const { utmData, getAttributionData } = useUTMTracking();
    
    // Track form view on mount
    useEffect(() => {
        trackEvent(ANALYTICS_EVENTS.CONTACT_FORM_VIEW, {
            form_location: 'contact_page'
        });
    }, []);

    const handleStep1Change = (e) => {
        const { name, value } = e.target;
        setStep1Data({ ...step1Data, [name]: value });
        
        // Track form start on first interaction
        if (!step1Data.fullName && !step1Data.workEmail) {
            trackFormInteraction('contact_form', 'start', {
                step: 1
            });
        }
    };

    const handleStep2Change = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setStep2Data({ ...step2Data, [name]: checked });
        } else if (type === 'file') {
            setStep2Data({ ...step2Data, [name]: files[0] });
        } else {
            setStep2Data({ ...step2Data, [name]: value });
        }
    };

    const handleStep1Submit = async (e) => {
        e.preventDefault();
        if (!step1Data.fullName || !step1Data.workEmail || !step1Data.service || !step1Data.timeline) {
            alert('Please fill in all required fields');
            trackFormInteraction('contact_form', 'error', {
                step: 1,
                error_type: 'validation'
            });
            return;
        }
        
        // Track step 1 completion
        trackEvent(ANALYTICS_EVENTS.CONTACT_FORM_STEP_COMPLETE, {
            step_number: 1,
            service_interest: step1Data.service,
            budget_range: step1Data.budget,
            timeline: step1Data.timeline
        });
        
        setStatus(FORM_STATUS.STEP_TWO);
    };

    const handleFinalSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // Get UTM and attribution data
            const attributionData = getAttributionData();
            const currentUTM = utmData.current || utmData.last_touch || utmData.first_touch || {};
            
            const finalData = {
                ...step1Data,
                ...step2Data,
                // Add UTM parameters
                utm_source: currentUTM.utm_source,
                utm_medium: currentUTM.utm_medium,
                utm_campaign: currentUTM.utm_campaign,
                utm_term: currentUTM.utm_term,
                utm_content: currentUTM.utm_content,
                // Add attribution data
                attribution_data: attributionData,
                landing_page: currentUTM.landing_page,
                referrer: currentUTM.referrer
            };
            
            console.log('Submitting final data with UTM:', finalData);
            
            let response;
            
            // Check if there's a file attachment
            if (step2Data.attachmentFile) {
                // Use FormData for file uploads
                const formData = new FormData();
                
                // Add all form fields to FormData
                Object.keys(finalData).forEach(key => {
                    if (key === 'attachmentFile') {
                        formData.append(key, finalData[key]);
                    } else {
                        formData.append(key, finalData[key] || '');
                    }
                });
                
                response = await fetch('/api/contact', {
                    method: 'POST',
                    body: formData, // Don't set Content-Type header, let browser set it
                });
            } else {
                // Use JSON for submissions without files
                const { attachmentFile, ...dataWithoutFile } = finalData;
                response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataWithoutFile),
                });
            }

            if (response.ok) {
                // Track successful submission
                trackEvent(ANALYTICS_EVENTS.CONTACT_FORM_SUBMIT, {
                    service_interest: step1Data.service,
                    budget_range: step1Data.budget,
                    timeline: step1Data.timeline,
                    has_attachment: !!step2Data.attachmentFile,
                    form_type: 'detailed'
                });
                
                // Track as conversion
                trackConversion('contact_form_submit', null, 'INR', {
                    lead_source: currentUTM.utm_source || 'direct',
                    lead_medium: currentUTM.utm_medium || 'none'
                });
                
                setStatus(FORM_STATUS.SUCCESS);
                setStep1Data(initStep1Data);
                setStep2Data(initStep2Data);
            } else {
                trackFormInteraction('contact_form', 'error', {
                    step: 2,
                    error_type: 'submission_failed'
                });
                setStatus(FORM_STATUS.ERROR);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            trackFormInteraction('contact_form', 'error', {
                step: 2,
                error_type: 'network_error'
            });
            setStatus(FORM_STATUS.ERROR);
        } finally {
            setLoading(false);
        }
    };

    const skipStep2 = async () => {
        setLoading(true);
        try {
            // Get UTM and attribution data
            const attributionData = getAttributionData();
            const currentUTM = utmData.current || utmData.last_touch || utmData.first_touch || {};
            
            const dataWithUTM = {
                ...step1Data,
                // Add UTM parameters
                utm_source: currentUTM.utm_source,
                utm_medium: currentUTM.utm_medium,
                utm_campaign: currentUTM.utm_campaign,
                utm_term: currentUTM.utm_term,
                utm_content: currentUTM.utm_content,
                // Add attribution data
                attribution_data: attributionData,
                landing_page: currentUTM.landing_page,
                referrer: currentUTM.referrer
            };
            
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataWithUTM),
            });

            if (response.ok) {
                // Track successful submission (quick form)
                trackEvent(ANALYTICS_EVENTS.CONTACT_FORM_SUBMIT, {
                    service_interest: step1Data.service,
                    budget_range: step1Data.budget,
                    timeline: step1Data.timeline,
                    form_type: 'quick'
                });
                
                // Track as conversion
                trackConversion('contact_form_submit_quick', null, 'INR', {
                    lead_source: currentUTM.utm_source || 'direct',
                    lead_medium: currentUTM.utm_medium || 'none'
                });
                
                setStatus(FORM_STATUS.SUCCESS);
                setStep1Data(initStep1Data);
                setStep2Data(initStep2Data);
            } else {
                trackFormInteraction('contact_form', 'error', {
                    step: 1,
                    error_type: 'quick_submission_failed'
                });
                setStatus(FORM_STATUS.ERROR);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            trackFormInteraction('contact_form', 'error', {
                step: 1,
                error_type: 'network_error'
            });
            setStatus(FORM_STATUS.ERROR);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="contact-wrapper">
                        <AnimatedInViewDiv className="hero-component">
                            <div className="max-width-70ch">
                                <div className="heading-2 text-weight-bold">
                                    Talk to StackBinary™
                                </div>
                            </div>
                            <div className="opacity-60 mt-4">
                                <div className="max-width-60ch">
                                    <div className="text-size-large">
                                        Tell us a bit about your project or ping us on your favorite channel. We'll reply within one business day.
                                    </div>
                                </div>
                            </div>
                        </AnimatedInViewDiv>

                        {/* Social CTA Buttons */}
                        <AnimatedInViewDiv className="social-cta-section" delay={0.1}>
                            <div className="text-center mb-6">
                                <div className="text-size-medium text-weight-medium mb-4">
                                    Prefer to chat directly? Reach out on your favorite platform:
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                                    {/* WhatsApp CTA */}
                                    <a 
                                        href="https://wa.me/?text=Hello%20StackBinary%2C%20I%27m%20interested%20in%20learning%20more%20about%20your%20services%20and%20would%20like%20to%20discuss%20a%20potential%20project."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackSocialClick('whatsapp', 'contact_page')}
                                        className="social-cta-button secondary-button"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '12px 20px',
                                            minWidth: '160px',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.348"/>
                                        </svg>
                                        WhatsApp
                                    </a>

                                    {/* Telegram CTA */}
                                    <a 
                                        href="https://t.me/?text=Hello%20StackBinary%2C%20I%27m%20interested%20in%20learning%20more%20about%20your%20services%20and%20would%20like%20to%20discuss%20a%20potential%20project."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackSocialClick('telegram', 'contact_page')}
                                        className="social-cta-button secondary-button"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '12px 20px',
                                            minWidth: '160px',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                                        </svg>
                                        Telegram
                                    </a>


                                    {/* Email CTA */}
                                    <a 
                                        href="mailto:contact@stackbinary.io?subject=Project%20Inquiry&body=Hello%20StackBinary%2C%0A%0AI%27m%20interested%20in%20learning%20more%20about%20your%20services%20and%20would%20like%20to%20discuss%20a%20potential%20project.%0A%0ABest%20regards"
                                        onClick={() => trackSocialClick('email', 'contact_page')}
                                        className="social-cta-button secondary-button"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '12px 20px',
                                            minWidth: '160px',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                        </svg>
                                        Email
                                    </a>
                                </div>
                                <div className="text-size-small opacity-70 mt-4">
                                    Or fill out the form below for a detailed project inquiry
                                </div>
                            </div>
                        </AnimatedInViewDiv>


                        {/* Calendly CTA Button */}
                        <AnimatedInViewDiv className="flex flex-col sm:flex-row gap-4 items-center justify-center my-8" delay={0.2}>
                            <a 
                                href="https://calendly.com/prateek-stackbinary/30min"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackEvent(ANALYTICS_EVENTS.CALENDLY_CLICK, { location: 'contact_page' })}
                                className="primary-button w-inline-block"
                            >
                                <div className="relative">
                                    <div className="text-size-small text-weight-bold">📅 Book a Discovery Call</div>
                                </div>
                                <div className="button-elipse"></div>
                            </a>
                            <div className="text-size-small opacity-70 mt-2">
                                Schedule a 30-minute call based on your availability
                            </div>
                        </AnimatedInViewDiv>

                        <AnimatedInViewDiv className="form-wrapper w-form" delay={0.4}>
                            {/* Step 1 Form */}
                            {(status === FORM_STATUS.IDLE) && (
                                <form onSubmit={handleStep1Submit} className="form">
                                    <div className="form-content">
                                        <div className="name-wrapper-contact">
                                            <label htmlFor="fullName" className="text-size-medium-vw">
                                                Full name *
                                            </label>
                                            <input
                                                className="text-field-contact w-input"
                                                maxLength="256"
                                                name="fullName"
                                                placeholder="Enter your full name"
                                                type="text"
                                                id="fullName"
                                                value={step1Data.fullName}
                                                onChange={handleStep1Change}
                                                required
                                            />
                                        </div>
                                        
                                        <div className="name-wrapper-contact">
                                            <label htmlFor="workEmail" className="text-size-medium-vw">
                                                Work email *
                                            </label>
                                            <input
                                                className="text-field-contact w-input"
                                                maxLength="256"
                                                name="workEmail"
                                                placeholder="Enter your work email"
                                                type="email"
                                                id="workEmail"
                                                value={step1Data.workEmail}
                                                onChange={handleStep1Change}
                                                required
                                            />
                                        </div>

                                        <div className="name-wrapper-contact">
                                            <label htmlFor="service" className="text-size-medium-vw">
                                                What do you need? *
                                            </label>
                                            <input
                                                className="text-field-contact w-input"
                                                maxLength="256"
                                                name="service"
                                                placeholder="e.g., AI/ML, Cloud, Custom software, DevOps/SRE, Data/BI, Automation, Website"
                                                type="text"
                                                id="service"
                                                value={step1Data.service}
                                                onChange={handleStep1Change}
                                                required
                                            />
                                        </div>

                                        <div className="name-wrapper-contact">
                                            <label htmlFor="budget" className="text-size-medium-vw">
                                                Budget range
                                            </label>
                                            <input
                                                className="text-field-contact w-input"
                                                maxLength="256"
                                                name="budget"
                                                placeholder="e.g., < ₹5L, ₹5–15L, ₹15–40L, ₹40L+ or your preferred range"
                                                type="text"
                                                id="budget"
                                                value={step1Data.budget}
                                                onChange={handleStep1Change}
                                            />
                                        </div>

                                        <div className="name-wrapper-contact">
                                            <label htmlFor="timeline" className="text-size-medium-vw">
                                                Timeline *
                                            </label>
                                            <input
                                                className="text-field-contact w-input"
                                                maxLength="256"
                                                name="timeline"
                                                placeholder="e.g., ASAP, 1–2 months, 3–6 months, or your preferred timeline"
                                                type="text"
                                                id="timeline"
                                                value={step1Data.timeline}
                                                onChange={handleStep1Change}
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="contact-button align-center">
                                        <button type="submit" className="primary-button">
                                            <span>Send inquiry</span>
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* Step 2 Form */}
                            {status === FORM_STATUS.STEP_TWO && (
                                <div>
                                    <div className="mb-6 p-4" style={{ 
                                        backgroundColor: '#1a1a1a', 
                                        border: '1px solid #333', 
                                        borderRadius: '8px' 
                                    }}>
                                        <div className="text-size-medium text-weight-medium mb-2" style={{ color: '#ffffff' }}>
                                            Step 1 Complete ✓
                                        </div>
                                        <div className="text-size-small opacity-70" style={{ color: '#ffffff' }}>
                                            Thank you! Now add more details to help us better understand your project (optional):
                                        </div>
                                    </div>
                                    
                                    <form onSubmit={handleFinalSubmit} className="form">
                                        <div className="form-content">
                                            <div>
                                                <label htmlFor="projectSummary" className="text-size-medium-vw">
                                                    Project summary
                                                </label>
                                                <textarea
                                                    id="projectSummary"
                                                    name="projectSummary"
                                                    maxLength="5000"
                                                    placeholder="Tell us more about your project, requirements, goals..."
                                                    className="text-field-contact w-input"
                                                    style={{ 
                                                        color: '#ffffff',
                                                        backgroundColor: '#1a1a1a',
                                                        border: '1px solid #333'
                                                    }}
                                                    value={step2Data.projectSummary}
                                                    onChange={handleStep2Change}
                                                    rows="4"
                                                ></textarea>
                                            </div>

                                            <div className="name-wrapper-contact">
                                                <label htmlFor="companyWebsite" className="text-size-medium-vw">
                                                    Company & website
                                                </label>
                                                <input
                                                    className="text-field-contact w-input"
                                                    style={{ 
                                                        color: '#ffffff',
                                                        backgroundColor: '#1a1a1a',
                                                        border: '1px solid #333'
                                                    }}
                                                    name="companyWebsite"
                                                    placeholder="Company name & website URL"
                                                    type="text"
                                                    id="companyWebsite"
                                                    value={step2Data.companyWebsite}
                                                    onChange={handleStep2Change}
                                                />
                                            </div>

                                            <div className="name-wrapper-contact">
                                                <label htmlFor="phone" className="text-size-medium-vw">
                                                    Phone (optional)
                                                </label>
                                                <input
                                                    className="text-field-contact w-input"
                                                    style={{ 
                                                        color: '#ffffff',
                                                        backgroundColor: '#1a1a1a',
                                                        border: '1px solid #333'
                                                    }}
                                                    name="phone"
                                                    placeholder="Your phone number"
                                                    type="tel"
                                                    id="phone"
                                                    value={step2Data.phone}
                                                    onChange={handleStep2Change}
                                                />
                                            </div>

                                            <div className="name-wrapper-contact">
                                                <label htmlFor="attachmentFile" className="text-size-medium-vw">
                                                    Attach brief/spec (optional)
                                                </label>
                                                <input
                                                    className="text-field-contact w-input"
                                                    style={{ 
                                                        color: '#ffffff',
                                                        backgroundColor: '#1a1a1a',
                                                        border: '1px solid #333'
                                                    }}
                                                    name="attachmentFile"
                                                    type="file"
                                                    id="attachmentFile"
                                                    onChange={handleStep2Change}
                                                    accept=".pdf,.doc,.docx,.txt"
                                                />
                                                {step2Data.attachmentFile && (
                                                    <div className="text-size-small opacity-70 mt-2" style={{ color: '#ffffff' }}>
                                                        📎 Selected: {step2Data.attachmentFile.name} ({(step2Data.attachmentFile.size / 1024).toFixed(1)} KB)
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <input
                                                    type="checkbox"
                                                    id="privacyConsent"
                                                    name="privacyConsent"
                                                    checked={step2Data.privacyConsent}
                                                    onChange={handleStep2Change}
                                                    className="mt-1"
                                                />
                                                <label htmlFor="privacyConsent" className="text-size-small opacity-70">
                                                    I agree to the <Link href="/privacy-policy" className="underline">privacy policy</Link> and consent to processing my data for this inquiry.
                                                </label>
                                            </div>
                                        </div>

                                        <div className="contact-button align-center flex flex-col sm:flex-row gap-4">
                                            <button 
                                                type="button"
                                                onClick={() => setStatus(FORM_STATUS.IDLE)}
                                                className="secondary-button"
                                                disabled={loading}
                                            >
                                                <span>← Back to Step 1</span>
                                            </button>
                                            
                                            <button 
                                                type="submit" 
                                                className="primary-button"
                                                disabled={loading || !step2Data.privacyConsent}
                                            >
                                                <span>
                                                    {loading ? "Sending..." : "Send detailed inquiry"}
                                                </span>
                                            </button>
                                            
                                            <button 
                                                type="button"
                                                onClick={skipStep2}
                                                className="secondary-button"
                                                disabled={loading}
                                            >
                                                <span>
                                                    {loading ? "Sending..." : "Skip for now"}
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* Success Message */}
                            {status === FORM_STATUS.SUCCESS && (
                                <AnimatedInViewDiv className="success-message text-center">
                                    <div className="text-size-contact mb-4">
                                        🎉 Thank you! Your inquiry has been received!
                                    </div>
                                    <div className="text-size-medium opacity-70">
                                        We'll get back to you within one business day.
                                    </div>
                                </AnimatedInViewDiv>
                            )}

                            {/* Error Message */}
                            {status === FORM_STATUS.ERROR && (
                                <AnimatedInViewDiv className="flex flex-col gap-4 items-center">
                                    <div className="error-message px-4 py-2 text-center">
                                        <div className="text-size-medium-contact">
                                            Oops! Something went wrong. Please try again or contact us directly.
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button 
                                            className="primary-button" 
                                            onClick={() => setStatus(FORM_STATUS.IDLE)}
                                        >
                                            <span>Try again</span>
                                        </button>
                                        <Link href="mailto:hello@stackbinary.io" className="secondary-button">
                                            <span>Email us directly</span>
                                        </Link>
                                    </div>
                                </AnimatedInViewDiv>
                            )}
                        </AnimatedInViewDiv>

                        {/* Contact Information & Office Addresses */}
                        <AnimatedInViewDiv className="contact-info-section" delay={0.15}>
                            <div className="text-center mb-8">
                                <div className="text-size-medium text-weight-medium mb-6" style={{ color: '#ffffff' }}>
                                    Our Office Locations
                                </div>
                                
                                {/* Phone Number */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-center gap-3 mb-4">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#ed5145' }}>
                                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                        </svg>
                                        <a 
                                            href="tel:+919034381347" 
                                            className="text-size-large text-weight-medium hover:text-[#ed5145] transition-colors"
                                            style={{ color: '#ffffff', textDecoration: 'none' }}
                                        >
                                            +91-9034381347
                                        </a>
                                    </div>
                                </div>

                                {/* Office Locations */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                                    {/* USA Office */}
                                    <div className="office-location p-6 border border-white/20 rounded-lg">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#ed5145' }}>
                                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                                </svg>
                                            </div>
                                            <div className="text-left">
                                                <div className="text-size-medium text-weight-medium mb-2" style={{ color: '#ffffff' }}>
                                                    Delaware, USA
                                                </div>
                                                <div className="text-size-small opacity-80 mb-4" style={{ color: '#ffffff' }}>
                                                    16192 Costal Highway,<br />
                                                    Lewes, Delaware 19958,<br />
                                                    County of Sussex
                                                </div>
                                                <a 
                                                    href="https://maps.google.com/?q=16192+Costal+Highway,+Lewes,+Delaware+19958"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-size-small hover:text-[#ed5145] transition-colors"
                                                    style={{ color: '#ffffff', textDecoration: 'none' }}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                    </svg>
                                                    View on Map
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* India Office */}
                                    <div className="office-location p-6 border border-white/20 rounded-lg">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#ed5145' }}>
                                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                                </svg>
                                            </div>
                                            <div className="text-left">
                                                <div className="text-size-medium text-weight-medium mb-2" style={{ color: '#ffffff' }}>
                                                    Mumbai, India
                                                </div>
                                                <div className="text-size-small opacity-80 mb-4" style={{ color: '#ffffff' }}>
                                                    Tower 3 - 604,<br />
                                                    Spring grove Towers,<br />
                                                    Kandivali East, 400101, India
                                                </div>
                                                <a 
                                                    href="https://maps.google.com/?q=Tower+3+-+604,+Spring+grove+Towers,+Kandivali+East,+400101,+India"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-size-small hover:text-[#ed5145] transition-colors"
                                                    style={{ color: '#ffffff', textDecoration: 'none' }}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                    </svg>
                                                    View on Map
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    );
}