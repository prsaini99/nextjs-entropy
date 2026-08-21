'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedInViewDiv from '@/components/Animate/AppearInView';
import ApplicationForm from '@/components/careers/ApplicationForm';
import { Job, isJobOpen } from '@/lib/careers';
import { getProductLinksForJob } from '@/lib/careersProductLinks';
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics';

interface Props {
  job: Job;
}

export default function JobDetailsPage({ job }: Props) {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  // A paused role keeps its page for SEO, but must not take applications:
  // an apply button under an "applications closed" notice is how you collect
  // submissions nobody reads, which is what drives people to re-apply.
  const open = isJobOpen(job);

  return (
    <div>
      {/* Job Header */}
      <section>
        <div className="padding-global">
          <div className="w-layout-blockcontainer container w-container">
            <div className="steps-wrapper">
              <AnimatedInViewDiv className="header text-center">
                <div className="mb-6">
                  <Link 
                    href="/careers" 
                    className="text-size-small text-weight-medium opacity-85 hover:opacity-100 transition-opacity"
                  >
                    ← Back to Careers
                  </Link>
                </div>
                <div className="max-width-60ch">
                  <h1 className="heading-2 text-weight-medium">
                    {job.title}
                  </h1>
                  <div className="job-meta mt-6 mb-8">
                    <div className="text-size-medium opacity-85 mb-2">
                      {job.location} • {job.type} • {job.experienceLevel} • {job.team}
                    </div>
                  </div>
                  <div className="text-size-large opacity-80 mb-8">
                    {job.blurb}
                  </div>
                  <div style={{ textAlign: 'center' as const, display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <button
                      onClick={() => open && setShowApplicationForm(true)}
                      disabled={!open}
                      className="primary-button w-inline-block"
                      style={{ margin: '0 auto' }}
                    >
                      <div className="relative">
                        <div className="text-size-small text-weight-bold">Apply for This Role</div>
                      </div>
                      <div className="button-elipse"></div>
                    </button>
                  </div>
                </div>
              </AnimatedInViewDiv>
            </div>
          </div>
        </div>
      </section>

      {/* Job Details */}
      <section>
        <div className="padding-global">
          <div className="w-layout-blockcontainer container w-container">
            <div className="features-wrapper">
              <AnimatedInViewDiv className="header text-center">
                <h2 className="heading-4 text-weight-medium mb-6">About the Role</h2>
                <div className="opacity-80 mb-12">
                  <div className="max-width-48ch">
                    <div className="text-size-regular">
                      {job.description}
                    </div>
                  </div>
                </div>
              </AnimatedInViewDiv>

              <div className="features-component">
                {/* What You'll Do Card */}
                <AnimatedInViewDiv delay={0.1} className="features-vantages">
                  <div className="features-image-container">
                    <div className="features-image-wrapper">
                      <Image
                        src="/what-youll-do.jpg"
                        alt="What You'll Do"
                        fill
                        sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, (max-width: 991px) 92vw, 56vw"
                        className="image"
                        style={{ objectFit: "cover" }}
                      />
                      <div className="gradient-overlay bigger"></div>
                    </div>
                  </div>
                  <div className="features-vantages-content">
                    <div className="features-heading-wrapper">
                      <div className="features-heading align-left">
                        <div className="heading-6 text-weight-medium">What You'll Do</div>
                      </div>
                    </div>
                    <div className="check-list">
                      {job.whatYoullDo.map((item, index) => (
                        <div key={index} className="check-item">
                          <div className="check-icon-wrap">
                            <img
                              width="14"
                              height="12"
                              alt="Check Icon"
                              src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c65_Check%20Icon.svg"
                              className="check-icon"
                            />
                          </div>
                          <div className="text-size-medium">{item}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedInViewDiv>

                {/* What You'll Bring Card */}
                <AnimatedInViewDiv delay={0.2} className="features-vantages">
                  <div className="features-vantages-content">
                    <div className="features-heading-wrapper">
                      <div className="features-heading align-left">
                        <div className="heading-6 text-weight-medium">What You'll Bring</div>
                      </div>
                    </div>
                    <div className="check-list">
                      {job.whatYoullBring.map((item, index) => (
                        <div key={index} className="check-item">
                          <div className="check-icon-wrap">
                            <img
                              width="14"
                              height="12"
                              alt="Check Icon"
                              src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c65_Check%20Icon.svg"
                              className="check-icon"
                            />
                          </div>
                          <div className="text-size-medium">{item}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="features-image-container">
                    <div className="features-image-wrapper">
                      <Image
                        src="/what-youll-bring.jpg"
                        alt="What You'll Bring"
                        fill
                        sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, (max-width: 991px) 92vw, 56vw"
                        className="image"
                        style={{ objectFit: "cover" }}
                      />
                      <div className="gradient-overlay bigger"></div>
                    </div>
                  </div>
                </AnimatedInViewDiv>

                {/* Nice to Have Card (if exists) */}
                {job.niceToHave && job.niceToHave.length > 0 && (
                  <AnimatedInViewDiv delay={0.3} className="features-vantages">
                    <div className="features-image-container">
                      <div className="features-image-wrapper">
                        <Image
                        src="/nice-to-have.jpg"
                        alt="Nice to Have"
                        fill
                        sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, (max-width: 991px) 92vw, 56vw"
                        className="image"
                        style={{ objectFit: "cover" }}
                      />
                        <div className="gradient-overlay bigger"></div>
                      </div>
                    </div>
                    <div className="features-vantages-content">
                      <div className="features-heading-wrapper">
                        <div className="features-heading align-left">
                          <div className="heading-6 text-weight-medium">Nice to Have</div>
                        </div>
                      </div>
                      <div className="check-list">
                        {job.niceToHave.map((item, index) => (
                          <div key={index} className="check-item">
                            <div className="check-icon-wrap">
                              <img
                                width="14"
                                height="12"
                                alt="Check Icon"
                                src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c65_Check%20Icon.svg"
                                className="check-icon"
                              />
                            </div>
                            <div className="text-size-medium opacity-85">{item}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AnimatedInViewDiv>
                )}

                {/* What You'd Build, links each role to the products it would
                    actually work on. Careers pages are the site's most-visited
                    pages; without this they were dead ends for both candidates
                    and crawlers. */}
                <AnimatedInViewDiv delay={0.35} className="features-vantages">
                  <div className="features-vantages-content">
                    <div className="features-heading-wrapper">
                      <div className="features-heading align-left">
                        <div className="heading-6 text-weight-medium">What You&apos;d Build</div>
                      </div>
                    </div>
                    <div className="text-size-medium opacity-85 mb-6">
                      These aren&apos;t hypothetical projects, they&apos;re live products you can
                      try before your first interview.
                    </div>
                    <div className="check-list">
                      {getProductLinksForJob(job.slug).map((product) => (
                        <div key={product.href} className="check-item">
                          <div className="check-icon-wrap">
                            <img
                              width="14"
                              height="12"
                              alt="Check Icon"
                              src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c65_Check%20Icon.svg"
                              className="check-icon"
                            />
                          </div>
                          <div className="text-size-medium">
                            <Link
                              href={product.href}
                              className="text-weight-medium underline hover:opacity-80"
                              onClick={() =>
                                // No UTMs on internal links — they would reset
                                // the session's acquisition source. This event
                                // (with the registered cta_location dimension)
                                // is how careers→product traffic is attributed.
                                trackEvent(ANALYTICS_EVENTS.CTA_CLICK, {
                                  cta_location: 'careers_product_link',
                                  cta_label: product.href,
                                  job_title: job.title,
                                })
                              }
                            >
                              {product.title}
                            </Link>
                            <span className="opacity-85">, {product.note}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedInViewDiv>

                {/* Why Join StackBinary Card */}
                <AnimatedInViewDiv delay={0.4} className="features-vantages">
                  <div className="features-vantages-content">
                    <div className="features-heading-wrapper">
                      <div className="features-heading align-left">
                        <div className="heading-6 text-weight-medium">Why Join StackBinary™?</div>
                      </div>
                    </div>
                    <div className="check-list">
                      {[
                        'Flexible working hours',
                        'Remote-friendly culture',
                        'Learning & development budget',
                        'High-ownership projects',
                        'Pragmatic engineering culture',
                        'Work with cutting-edge tech'
                      ].map((item, index) => (
                        <div key={index} className="check-item">
                          <div className="check-icon-wrap">
                            <img
                              width="14"
                              height="12"
                              alt="Check Icon"
                              src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c65_Check%20Icon.svg"
                              className="check-icon"
                            />
                          </div>
                          <div className="text-size-medium">{item}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="features-image-container">
                    <div className="features-image-wrapper">
                      <Image
                        src="/why-join-us.jpg"
                        alt="Why Join StackBinary"
                        fill
                        sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, (max-width: 991px) 92vw, 56vw"
                        className="image"
                        style={{ objectFit: "cover" }}
                      />
                      <div className="gradient-overlay bigger"></div>
                    </div>
                  </div>
                </AnimatedInViewDiv>

                {/* Ready to Apply Section */}
                <AnimatedInViewDiv delay={0.5} className="margin-top-button-hero">
                  <div style={{ textAlign: 'center' as const, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <h3 className="heading-4 text-weight-medium mb-4" style={{ textAlign: 'center' as const }}>Ready to Apply?</h3>
                    <div className="text-size-regular opacity-85 mb-6" style={{ textAlign: 'center' as const, maxWidth: '42ch', margin: '0 auto' }}>
                      Join our team of builders who love shipping quality software.
                    </div>
                    <div className="mb-6" style={{ textAlign: 'center' as const, display: 'flex', justifyContent: 'center' }}>
                      <button
                        onClick={() => open && setShowApplicationForm(true)}
                        disabled={!open}
                        className="primary-button w-inline-block"
                        style={{ margin: '0 auto' }}
                      >
                        <div className="relative">
                          <div className="text-size-small text-weight-bold">Apply Now</div>
                        </div>
                        <div className="button-elipse"></div>
                      </button>
                    </div>
                    <div className="mb-6" style={{ textAlign: 'center' as const }}>
                      <div className="text-size-small opacity-85 mb-2" style={{ textAlign: 'center' as const }}>
                        We connect with shortlisted candidates through LinkedIn or our official email IDs.
                      </div>
                      <a
                        href="https://www.linkedin.com/company/stackbinary"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackEvent(ANALYTICS_EVENTS.CTA_CLICK, {
                            cta_location: 'careers_job_page',
                            cta_label: 'linkedin_follow',
                            job_title: job.title,
                          })
                        }
                        className="text-size-small text-weight-bold underline hover:opacity-80"
                      >
                        Follow StackBinary on LinkedIn →
                      </a>
                    </div>
                    <div style={{ textAlign: 'center' as const }}>
                      <div className="text-size-small opacity-85 mb-2" style={{ textAlign: 'center' as const }}>
                        Questions about this role?
                      </div>
                      <Link 
                        href="mailto:contact@stackbinary.io" 
                        className="text-size-small text-weight-medium text-gray-700 hover:text-gray-900"
                        style={{ textAlign: 'center' as const }}
                      >
                        contact@stackbinary.io
                      </Link>
                    </div>
                  </div>
                </AnimatedInViewDiv>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      {open && showApplicationForm && (
        <ApplicationForm 
          job={job} 
          onClose={() => setShowApplicationForm(false)} 
        />
      )}
    </div>
  );
}