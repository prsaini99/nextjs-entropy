'use client';
import React from 'react';
import ROUTES from '@/constants/routes';
import AnimatedInViewDiv from '@/components/Animate/AppearInView';
import { GetStarted, LearnMoreButton } from '@/components/Buttons';
import { features } from './data';
import { services } from '@/data/services';
import Link from 'next/link';

export default function FeaturesWrapper() {
    const title = "Services Built for Impact"
    const description = "We help you launch faster and operate reliably with AI, cloud, custom software, data analytics, DevOps and more."
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="features-wrapper">
                        <AnimatedInViewDiv className="header">
                            <div className="heading-4 text-weight-bold">
                                {title}
                            </div>
                            <div className="opacity-60">
                                <div className="max-width-48ch">
                                    <div>
                                        {description}
                                    </div>
                                </div>
                            </div>
                        </AnimatedInViewDiv>
                        <div className="features-component">
                            {features.map((feature, index) => (
                                <AnimatedInViewDiv key={index} className="features-vantages">
                                    {index % 2 === 1 && (
                                        <div className="features-image-container">
                                            <div className="features-image-wrapper">
                                                <img
                                                    sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, (max-width: 991px) 92vw, 56vw"
                                                    src={feature.imageSrc}
                                                    alt="Features Image"
                                                    className="image"
                                                />
                                                <div className="gradient-overlay bigger"></div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="features-vantages-content">
                                        <div className="features-heading-wrapper">
                                            <div className='flex items-center gap-4'>
                                                {feature.icon &&
                                                    <div className="features-icon-wrapper">
                                                        <img src={feature.icon} alt="Icon" />
                                                    </div>}
                                                {feature.quote &&
                                                    <p className='text-gray-500 text-lg mb-0'>
                                                        “{feature.quote}”
                                                    </p>}
                                            </div>
                                            <div className="features-heading align-left">
                                                {feature.title &&
                                                    <div className="heading-6 text-weight-medium">{feature.title}</div>}
                                                {feature.description &&
                                                    <div className="text-size-medium">{feature.description}</div>}
                                            </div>
                                        </div>
                                        <div className="check-list">
                                            {(feature.checks || [])?.map((check, checkIndex) => (
                                                <div key={checkIndex} className="check-item">
                                                    <div className="check-icon-wrap">
                                                        <img
                                                            width="14"
                                                            height="12"
                                                            alt="Check Icon"
                                                            src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c65_Check%20Icon.svg"
                                                            className="check-icon"
                                                        />
                                                    </div>
                                                    <div className="text-size-medium" dangerouslySetInnerHTML={{ __html: check }}></div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="margin-top-button-hero">
                                            <Link href={`/services/${feature.slug}`} className="primary-button w-inline-block">
                                                <div className="relative">
                                                    <div className="text-size-small text-weight-bold">See details →</div>
                                                </div>
                                                <div className="button-elipse"></div>
                                            </Link>
                                        </div>
                                    </div>
                                    {index % 2 === 0 && (
                                        <div className="features-image-container">
                                            <div className="features-image-wrapper">
                                                <img
                                                    sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, (max-width: 991px) 92vw, 56vw"
                                                    src={feature.imageSrc || ""}
                                                    alt="Features Image"
                                                    className="image"
                                                />
                                                <div className="gradient-overlay bigger"></div>
                                            </div>
                                        </div>
                                    )}
                                </AnimatedInViewDiv>
                            ))}
                            <AnimatedInViewDiv className="double-button-component margin-top-button-hero">
                                <GetStarted />
                                <LearnMoreButton title="About Us" routeTo={ROUTES.ABOUT} />
                            </AnimatedInViewDiv>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
