'use client'
import React from 'react'
import AnimatedInViewDiv from '@/components/Animate/AppearInView'
import { GetStarted, LearnMoreButton } from '@/components/Buttons'
import ROUTES from '@/constants/routes'

const features = [
    {
        title: 'Outcome-Driven',
        description: 'Roadmaps tied to business goals—not vanity metrics.',
    },
    {
        title: 'Secure by Default',
        description: 'Auth, secrets, encryption and privacy built into the SDLC.',
    },
    {
        title: 'Scale-Ready',
        description: 'Cloud-native patterns that grow with your audience.',
    },
    {
        title: 'Transparent Delivery',
        description: 'Weekly demos, clear docs and shared dashboards.',
    },
]

export default function IgnitePotential() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="home-features-wrapper">
                        <AnimatedInViewDiv className="header">
                            <h2 className="heading-4 text-weight-bold">Why StackBinary</h2>
                            {/* <div className="opacity-60">
                                <div className="max-width-48ch">
                                    <div className="text-size-regular">Fuel your business growth with AI solutions that are not
                                        only dynamic and adaptive but also innovative and tailored to match the scale and
                                        vision of your ambitions.</div>
                                </div>
                            </div> */}
                        </AnimatedInViewDiv>
                        <div className="features-grid">
                            {features.map((feature, index) => (
                                <AnimatedInViewDiv key={index} className="features" delay={index * .2}>
                                    <div className="text-size-large">{index + 1}</div>
                                    <div className="features-content">
                                        <div className="text-weight-medium">{feature.title}</div>
                                        <div className="opacity-70">
                                            <div>{feature.description}</div>
                                        </div>
                                    </div>
                                </AnimatedInViewDiv>
                            ))}
                        </div>
                        <AnimatedInViewDiv>
                            <LearnMoreButton title='Explore More Features' routeTo={ROUTES.SERVICES} />
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    )
}