'use client'
import React from 'react'
import Link from 'next/link'
import AnimatedInViewDiv from '@/components/Animate/AppearInView'
import { LearnMoreButton } from '@/components/Buttons'
import ROUTES from '@/constants/routes'

const steps = [
    {
        phase: '01',
        title: 'Discovery and Integration',
        description: 'We dive into your needs and seamlessly integrate solutions—scuba gear optional.',
        image: 'https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/sec3-1',
        buttonText: 'Start Integration',
        buttonLink: '/pricing',
    },
    {
        phase: '02',
        title: 'Optimization and Enhancement',
        description: 'Fine-tuning your systems until they’re as efficient as a caffeinated coder',
        image: 'https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/kxcu463dsepnw8vozsbu',
        buttonText: 'Optimize Now',
        buttonLink: '/pricing',
    },
    {
        phase: '03',
        title: 'Innovation and Expansion',
        description: 'Scaling new heights and exploring growth areas—because the sky’s not the limit; it’s just the beginning.',
        image: 'https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/sec3-3',
        buttonText: 'Explore Innovations',
        buttonLink: '/pricing',
    },
]

export default function ElevetBussiness() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="steps-wrapper">
                        <AnimatedInViewDiv className="header">
                            <div className="heading-4 text-weight-medium">Elevate Your Business with Our Three-Step Approach
                            </div>
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