'use client'
import React from 'react'
import AnimatedInViewDiv from '@/components/Animate/AppearInView'
import { GetStarted, LearnMoreButton } from '@/components/Buttons'
import ROUTES from '@/constants/routes'

const features = [
    {
        title: 'Adaptive Learning Models',
        description: 'Revolutionizing industries with algorithms that continuously evolve, delivering unparalleled efficiency and accuracy.',
    },
    {
        title: 'Visual Recognition Technology',
        description: 'Providing automated, precise analysis to transform data into actionable insights across diverse sectors.',
    },
    {
        title: 'Persona-Driven Engagement',
        description: 'Crafting personalized experiences that foster loyalty and enhance customer satisfaction in any industry.',
    },
    {
        title: 'SecureAI Shield',
        description: 'Delivering cutting-edge cybersecurity solutions to protect your operations with uncompromising reliability.',
    },
]

export default function IgnitePotential() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="home-features-wrapper">
                        <AnimatedInViewDiv className="header">
                            <div className="heading-4 text-weight-bold">Unlock the Future with Our Advanced Features</div>
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