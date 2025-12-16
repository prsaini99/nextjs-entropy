'use client'
import React from 'react'
import Link from 'next/link'
import { GetStarted, LearnMoreButton } from '@/components/Buttons'
import AnimatedInViewDiv from '@/components/Animate/AppearInView'

const models = [
    {
        image: '/project-based.jpg',
        title: 'Project-Based',
        description: 'Dedicated team for specific projects with defined scope, timeline, and deliverables. Perfect for feature development, product launches, or system upgrades.',
    },
    {
        image: '/monthly-retainer.jpg',
        title: 'Monthly Retainer',
        description: 'Ongoing development support with consistent monthly allocation. Ideal for continuous feature development, maintenance, and iterative improvements.',
    },
    {
        image: '/extended-partnership.jpg',
        title: 'Extended Partnership',
        description: 'Long-term collaboration for strategic initiatives. Your extended team for scaling operations, platform development, and digital transformation.',
    },
]

export default function EngagementModels() {
    return (
        <section>
            <div className="padding-global py-16">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="about-features-wrapper">
                        <AnimatedInViewDiv className="about-features-header">
                            <div className="header">
                                <h2 className="heading-4 text-weight-medium">
                                    Flexible Engagement Models
                                </h2>
                                <div className="opacity-60">
                                    <div className="max-w-4xl">
                                        <p>
                                            Choose the engagement model that best fits your project requirements and timeline. Explore our <Link href="/services" className="text-link">comprehensive services</Link> or <Link href="/contact-us" className="text-link">discuss your needs</Link> with our team.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedInViewDiv>
                        <h2 className="heading-6 text-weight-medium">
                            Our Models
                        </h2>
                        <div className="w-layout-grid about-features-grid">
                            {models.map((model, index) => (
                                <AnimatedInViewDiv delay={index * .2} className="about-features-card" key={model.title}>
                                    <div className="about-features-image">
                                        <img
                                            sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, (max-width: 991px) 92vw, 28vw"
                                            srcSet={model.image}
                                            alt={model.title}
                                            src={model.image}
                                            loading="lazy" className="image" />
                                        <div className="mask-frame"></div>
                                    </div>
                                    <div className="about-features-content">
                                        <div className="text-size-large text-weight-medium">{model.title}</div>
                                        <div className="opacity-80">
                                            <div className="max-width-33ch">
                                                <div>{model.description}</div>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedInViewDiv>
                            ))}
                        </div>
                        <AnimatedInViewDiv className="double-button-component margin-top-button-features">
                            <GetStarted />
                            <LearnMoreButton />
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    )
}