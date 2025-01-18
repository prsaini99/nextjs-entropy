'use client'
import React from 'react'
import { MoreAImodels, LearnMoreButton, GetStarted } from '@/components/Buttons'
import AnimatedInViewDiv from '@/components/Animate/AppearInView'

const features = [
    {
        image: 'https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/g2cs03rgp0qd9icsldvr',
        title: 'Innovation as a Foundation',
        description: 'We harness cutting-edge technologies to drive success',
    },
    {
        image: 'https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/kumogbn1j46cjhackabb',
        title: 'Customer-First Mindset',
        description: 'Your success is our ultimate measure of achievement.',
    },
    {
        image: 'https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/y4barww5t70afjz7ugxj',
        title: 'Transparency and Trust',
        description: 'We build relationships that are as strong as our solutions.',
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
                                <div className="heading-4 text-weight-medium">
                                    Our Purpose: Turning Complexity into Simplicity
                                </div>
                                <div className="opacity-60">
                                    <div className="max-w-4xl">
                                        <div>
                                            Our mission is to make technology accessible and impactful. Whether you’re navigating a digital transformation or scaling your operations, we craft tailored solutions that empower you to focus on your core business. With us, you don’t just get a vendor—you gain a dedicated partner committed to your success.
                                        </div>
                                        <p>
                                            “We do the heavy lifting so you can keep doing what you do best—and maybe even sneak in an extra coffee break.”
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedInViewDiv>
                        <div className="heading-6 text-weight-medium">
                            The Core of What We Stand For
                        </div>
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
