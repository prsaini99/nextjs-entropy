'use client';
import React from 'react';
import AnimatedInViewDiv from '@/components/Animate/AppearInView';
import { GetStarted, LearnMoreButton } from '@/components/Buttons';
import ROUTES from '@/constants/routes';
import Link from 'next/link';
import { services } from '@/data/services';
import { serviceContent } from '@/data/serviceContent';

export default function ServicePageTemplate({ service }) {
    if (!service) {
        return <div>Service not found</div>;
    }

    // Get detailed content for this service
    const detailedContent = serviceContent[service.slug];
    
    // Get related services (next 3 services in the array)
    const currentIndex = services.findIndex(s => s.slug === service.slug);
    const relatedServices = services
        .slice(currentIndex + 1, currentIndex + 4)
        .concat(services.slice(0, Math.max(0, 3 - (services.length - currentIndex - 1))));

    return (
        <>
            {/* Hero Section - H1 & Lead */}
            <section>
                <div className="padding-global py-20">
                    <div className="w-layout-blockcontainer container w-container">
                        <div className="hero-wrapper">
                            <AnimatedInViewDiv className="hero-component">
                                <div className="max-width-75ch text-center">
                                    <div className="heading-2 text-weight-bold line-height-1-2">
                                        {detailedContent?.title || service.title}
                                    </div>
                                </div>
                                <div className="opacity-60">
                                    <div className="max-width-60ch text-center">
                                        <div className="text-size-large">
                                            {detailedContent?.lead || service.description}
                                        </div>
                                    </div>
                                </div>
                            </AnimatedInViewDiv>
                            <AnimatedInViewDiv className="double-button-component margin-top-button-hero" delay={.2}>
                                <GetStarted />
                                <LearnMoreButton title="View All Services" routeTo={ROUTES.SERVICES} />
                            </AnimatedInViewDiv>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Deliver Section */}
            {detailedContent?.whatWeDeliver && (
                <section>
                    <div className="padding-global">
                        <div className="w-layout-blockcontainer container w-container">
                            <div className="features-wrapper">
                                <AnimatedInViewDiv className="features-vantages">
                                    <div className="features-image-container">
                                        <div className="features-image-wrapper">
                                            <img
                                                sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, (max-width: 991px) 92vw, 56vw"
                                                src={service.imageSrc}
                                                alt={service.altText || service.title}
                                                className="image"
                                            />
                                            <div className="gradient-overlay bigger"></div>
                                        </div>
                                    </div>
                                    <div className="features-vantages-content">
                                        <div className="features-heading-wrapper">
                                            <div className='flex items-center gap-4 mb-6'>
                                                {service.icon && (
                                                    <div className="features-icon-wrapper">
                                                        <img src={service.icon} alt="Service Icon" />
                                                    </div>
                                                )}
                                                <div className="heading-4 text-weight-medium">
                                                    {detailedContent.whatWeDeliver.title}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="check-list">
                                            {detailedContent.whatWeDeliver.items?.map((item, index) => (
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
                                                    <div className="text-size-medium" dangerouslySetInnerHTML={{ __html: item }}></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </AnimatedInViewDiv>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* How We Work Section */}
            {detailedContent?.howWeWork && (
                <section>
                    <div className="padding-global">
                        <div className="w-layout-blockcontainer container w-container">
                            <AnimatedInViewDiv className="steps-wrapper">
                                <div className="header">
                                    <div className="heading-4 text-weight-medium">
                                        {detailedContent.howWeWork.title}
                                    </div>
                                    <div className="opacity-60">
                                        <div className="max-width-42ch">
                                            <div>
                                                Our proven methodology ensures successful project delivery and optimal outcomes.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="steps-stack-component">
                                    {detailedContent.howWeWork.items?.map((step, index) => (
                                        <AnimatedInViewDiv key={index} className="steps-item">
                                            <div className="steps-card">
                                                <div className="left-content">
                                                    <div className="steps-content">
                                                        <div className="steps-tag">
                                                            <div className="text-size-small text-weight-bold">Step</div>
                                                            <div className="vertical-line-tag"></div>
                                                            <div className="read-more-button">
                                                                <div className="opacity-70">
                                                                    <div className="text-size-small text-weight-medium">{String(index + 1).padStart(2, '0')}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="max-width-40ch">
                                                            <div className="heading-6 text-weight-medium">{step.split(':')[0]}</div>
                                                        </div>
                                                        <div className="steps-description">
                                                            <div>{step.split(':').slice(1).join(':').trim()}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </AnimatedInViewDiv>
                                    ))}
                                </div>
                            </AnimatedInViewDiv>
                        </div>
                    </div>
                </section>
            )}

            {/* Tech & Tools Section */}
            {detailedContent?.techTools && (
                <section>
                    <div className="padding-global">
                        <div className="w-layout-blockcontainer container w-container">
                            <div className="features-wrapper">
                                <AnimatedInViewDiv className="features-vantages">
                                    <div className="features-vantages-content">
                                        <div className="features-heading-wrapper">
                                            <div className='flex items-center gap-4 mb-6'>
                                                <div className="features-icon-wrapper">
                                                    <img src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c64_Icon-1.svg" alt="Tech Icon" />
                                                </div>
                                                <div className="heading-4 text-weight-medium">
                                                    {detailedContent.techTools.title}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="check-list">
                                            {detailedContent.techTools.items?.map((tech, index) => (
                                                <div key={index} className="check-item">
                                                    <div className="check-icon-wrap">
                                                        <img
                                                            width="14"
                                                            height="12"
                                                            alt="Tech Icon"
                                                            src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c65_Check%20Icon.svg"
                                                            className="check-icon"
                                                        />
                                                    </div>
                                                    <div className="text-size-medium" dangerouslySetInnerHTML={{ __html: tech }}></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="features-image-container">
                                        <div className="features-image-wrapper">
                                            <img
                                                sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, (max-width: 991px) 92vw, 56vw"
                                                src={service.imageSrc}
                                                alt={service.altText || service.title}
                                                className="image"
                                            />
                                            <div className="gradient-overlay bigger"></div>
                                        </div>
                                    </div>
                                </AnimatedInViewDiv>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Outcomes Section */}
            {detailedContent?.outcomes && (
                <section>
                    <div className="padding-global">
                        <div className="w-layout-blockcontainer container w-container">
                            <div className="features-wrapper">
                                <AnimatedInViewDiv className="features-vantages">
                                    <div className="features-image-container">
                                        <div className="features-image-wrapper">
                                            <img
                                                sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, (max-width: 991px) 92vw, 56vw"
                                                src={service.imageSrc}
                                                alt={service.altText || service.title}
                                                className="image"
                                            />
                                            <div className="gradient-overlay bigger"></div>
                                        </div>
                                    </div>
                                    <div className="features-vantages-content">
                                        <div className="features-heading-wrapper">
                                            <div className='flex items-center gap-4 mb-6'>
                                                <div className="features-icon-wrapper">
                                                    <img src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c63_Icon.svg" alt="Results Icon" />
                                                </div>
                                                <div className="heading-4 text-weight-medium">
                                                    {detailedContent.outcomes.title}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="check-list">
                                            {detailedContent.outcomes.items?.map((outcome, index) => (
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
                                                    <div className="text-size-medium" dangerouslySetInnerHTML={{ __html: outcome }}></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </AnimatedInViewDiv>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section>
                <div className="padding-global">
                    <div className="w-layout-blockcontainer container w-container">
                        <AnimatedInViewDiv className="text-center py-16">
                            <div className="heading-4 text-weight-bold mb-4">
                                Ready to Get Started?
                            </div>
                            <div className="opacity-60 mb-8">
                                <div className="max-width-50ch mx-auto">
                                    <div className="text-size-regular">
                                        Let's discuss how our {detailedContent?.title || service.title} can transform your business operations and drive growth.
                                    </div>
                                </div>
                            </div>
                            <div className="double-button-component">
                                <GetStarted />
                            </div>
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </section>

            {/* Related Services Section */}
            {relatedServices.length > 0 && (
                <section>
                    <div className="padding-global">
                        <div className="w-layout-blockcontainer container w-container">
                            <div className="steps-wrapper">
                                <AnimatedInViewDiv className="header">
                                    <div className="heading-4 text-weight-medium">
                                        Explore Our Other Services
                                    </div>
                                    <div className="opacity-60">
                                        <div className="max-width-42ch">
                                            <div>
                                                Discover more ways we can transform your business with our comprehensive range of technology solutions.
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedInViewDiv>
                                <div className="steps-stack-component">
                                    {relatedServices.map((relatedService, index) => (
                                        <AnimatedInViewDiv key={relatedService.slug} className="steps-item">
                                            <div className="steps-card">
                                                <div className="left-content">
                                                    <div className="steps-content">
                                                        <div className="steps-tag">
                                                            <div className="text-size-small text-weight-bold">Service</div>
                                                            <div className="vertical-line-tag"></div>
                                                            <div className="read-more-button">
                                                                <div className="opacity-70">
                                                                    <div className="text-size-small text-weight-medium">{String(index + 1).padStart(2, '0')}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="max-width-40ch">
                                                            <div className="heading-4 text-weight-medium">{relatedService.title}</div>
                                                        </div>
                                                        <div className="steps-description">
                                                            <div>{relatedService.description}</div>
                                                        </div>
                                                    </div>
                                                    <Link href={`/services/${relatedService.slug}`} className="primary-button w-inline-block">
                                                        <div className="relative">
                                                            <div className="text-size-small text-weight-bold">Learn More</div>
                                                        </div>
                                                        <div className="button-elipse"></div>
                                                    </Link>
                                                </div>
                                                <div className="right-content">
                                                    <div className="steps-image">
                                                        <img
                                                            sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, (max-width: 991px) 46vw, 47vw"
                                                            srcSet={`${relatedService.imageSrc} 500w, ${relatedService.imageSrc} 800w, ${relatedService.imageSrc} 1080w`}
                                                            alt={relatedService.title}
                                                            src={relatedService.imageSrc}
                                                            loading="lazy" className="image" />
                                                    </div>
                                                </div>
                                            </div>
                                        </AnimatedInViewDiv>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}