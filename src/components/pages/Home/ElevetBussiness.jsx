'use client'
import React from 'react'
import Link from 'next/link'
import AnimatedInViewDiv from '@/components/Animate/AppearInView'
import { LearnMoreButton } from '@/components/Buttons'
import ROUTES from '@/constants/routes'

const steps = [
    {
        phase: '01',
        title: 'Discover',
        description: 'Workshops to align scope, risks and success metrics.',
        image: 'https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/sec3-1',
        buttonText: 'Talk to an Expert',
        buttonLink: '/contact-us',
    },
    {
        phase: '02',
        title: 'Build',
        description: 'Iterative delivery with design, engineering and QA in lockstep.',
        image: 'https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/kxcu463dsepnw8vozsbu',
        buttonText: 'Talk to an Expert',
        buttonLink: '/contact-us',
    },
    {
        phase: '03',
        title: 'Scale',
        description: 'Reliability, cost optimization and continuous improvement.',
        image: 'https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/sec3-3',
        buttonText: 'Talk to an Expert',
        buttonLink: '/contact-us',
    },
]

export default function ElevetBussiness() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="steps-wrapper">
                        <AnimatedInViewDiv className="header">
                            <h2 className="heading-4 text-weight-medium">How We Work
                            </h2>
                            <div className="opacity-60">
                                <div className="max-width-42ch">
                                    <div>
                                        Explore our three-phase approach to see how we drive growth and efficiency at every step.
                                    </div>
                                </div>
                            </div>
                        </AnimatedInViewDiv>
                        <div className="steps-stack-component">
                            {steps.map((step, index) => (
                                <AnimatedInViewDiv key={index} className="steps-item">
                                    <div className="steps-card">
                                        <div className="left-content">
                                            <div className="steps-content">
                                                <div className="steps-tag">
                                                    <div className="text-size-small text-weight-bold">Phase</div>
                                                    <div className="vertical-line-tag"></div>
                                                    <div className="read-more-button">
                                                        <div className="opacity-70">
                                                            <div className="text-size-small text-weight-medium">{step.phase}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="max-width-40ch">
                                                    <div className="heading-4 text-weight-medium">{step.title}</div>
                                                </div>
                                                <div className="steps-description">
                                                    <div>{step.description}</div>
                                                </div>
                                            </div>
                                            <Link href={step.buttonLink} className="primary-button w-inline-block">
                                                <div className="relative">
                                                    <div className="text-size-small text-weight-bold">{step.buttonText}</div>
                                                </div>
                                                <div className="button-elipse"></div>
                                            </Link>
                                        </div>
                                        <div className="right-content">
                                            <div className="steps-image"><img
                                                sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, (max-width: 991px) 46vw, 47vw"
                                                srcSet={`${step.image} 500w, ${step.image} 800w, ${step.image} 1080w`}
                                                alt="Stack Image"
                                                src={step.image}
                                                loading="lazy" className="image" /></div>
                                        </div>
                                    </div>
                                </AnimatedInViewDiv>
                            ))}
                        </div>                       
                    </div>
                </div>
            </div>
        </section>
    )
}