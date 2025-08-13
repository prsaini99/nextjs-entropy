'use client'
import React from 'react'
import Link from 'next/link'
import { MoreAImodels, LearnMoreButton, GetStarted } from '@/components/Buttons'
import AnimatedInViewDiv from '@/components/Animate/AppearInView'

const features = [
    {
        image: 'https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/g2cs03rgp0qd9icsldvr',
        title: 'Innovation with Purpose',
        description: 'Use the right tech to solve the right problem—no buzzword bloat.',
    },
    {
        image: 'https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/kumogbn1j46cjhackabb',
        title: 'Customer First',
        description: 'Align on outcomes, not outputs. Your KPIs guide our roadmap.',
    },
    {
        image: 'https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/y4barww5t70afjz7ugxj',
        title: 'Transparency',
        description: 'Clear timelines, visible backlogs, weekly demos and open docs.',
    },
]

export default function AboutFeatures() {
    return (
        <section>
            <div className="padding-global py-16">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="about-features-wrapper">
                        <AnimatedInViewDiv className="about-features-header">
                            <div className="header">
                                <h2 className="heading-4 text-weight-medium">
                                    Our Mission
                                </h2>
                                <div className="opacity-60">
                                    <div className="max-w-4xl">
                                        <p>
                                            Make technology simple to adopt and valuable to operate—so teams launch faster, run leaner and grow with confidence. Explore our <Link href="/services" className="text-link">comprehensive services</Link> or <Link href="/contact-us" className="text-link">get in touch</Link> to discuss your project.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedInViewDiv>
                        <h2 className="heading-6 text-weight-medium">
                            Our Values
                        </h2>
                        <div className="w-layout-grid about-features-grid">
                            {features.map((feature, index) => (
                                <AnimatedInViewDiv delay={index * .2} className="about-features-card" key={feature.title}>
                                    <div className="about-features-image">
                                        <img
                                            sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, (max-width: 991px) 92vw, 28vw"
                                            srcSet={feature.image}
                                            alt="Card Image"
                                            src={feature.image}
                                            loading="lazy" className="image" />
                                        <div className="mask-frame"></div>
                                    </div>
                                    <div className="about-features-content">
                                        <div className="text-size-large text-weight-medium">{feature.title}</div>
                                        <div className="opacity-80">
                                            <div className="max-width-33ch">
                                                <div>{feature.description}</div>
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
