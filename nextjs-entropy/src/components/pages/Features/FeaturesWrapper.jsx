'use client';
import React from 'react';
import ROUTES from '@/constants/routes';
import AnimatedInViewDiv from '@/components/Animate/AppearInView';
import { GetStarted, LearnMoreButton } from '@/components/Buttons';

const features = [
    {
        icon: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c64_Icon-1.svg',
        title: 'Vantage Analytics',
        description: 'Gain a comprehensive view of your data with advanced analytics that provide actionable insights and strategic recommendations.',
        checks: [
            'Real-Time Data Monitoring',
            'Customizable Dashboards',
            'Predictive Insights',
        ],
        imageSrc: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c67_Features%20Images%2003.jpg',
    },
    {
        icon: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c63_Icon.svg',
        title: 'Smart Automation',
        description: 'Streamline your operations with intelligent automation that reduces manual tasks and enhances efficiency across your workflows.',
        checks: [
            'Task Scheduling',
            'Workflow Integration',
            'Error Reduction',
        ],
        imageSrc: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c6f_Features%20Images%2002.jpg',
    },
    {
        icon: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c63_Icon.svg',
        title: 'Personalized Engagement',
        description: 'Enhance customer interactions with AI-driven personalization that tailors experiences based on individual preferences and behaviors.',
        checks: [
            'Behavioral Targeting',
            'Dynamic Recommendations',
            'Custom Communication',
        ],
        imageSrc: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c66_Features%20Images%2001.jpg',
    },
];

export default function FeaturesWrapper() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="features-wrapper">
                        <AnimatedInViewDiv className="header">
                            <div className="heading-4 text-weight-bold">
                                Ignite Your Potential with AI-Driven Innovations
                            </div>
                            <div className="opacity-60">
                                <div className="max-width-48ch">
                                    <div>
                                        Fuel your business growth with AI solutions that are not only dynamic and adaptive but also innovative and tailored to match the scale and vision of your ambitions.
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
                                            <div className="features-icon-wrapper">
                                                <img src={feature.icon} alt="Icon" />
                                            </div>
                                            <div className="features-heading align-left">
                                                <div className="heading-6 text-weight-medium">{feature.title}</div>
                                                <div className="text-size-medium">{feature.description}</div>
                                            </div>
                                        </div>
                                        <div className="check-list">
                                            {feature.checks.map((check, checkIndex) => (
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
                                                    <div className="text-size-medium">{check}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {index % 2 === 0 && (
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
