'use client'
import React from 'react'
import AnimatedInViewDiv from '@/components/Animate/AppearInView'

const features = [
    {
        title: 'Adaptive Learning Models',
        description: 'Continuously evolve with changing data using our self-learning algorithms',
    },
    {
        title: 'Visual Recognition',
        description: 'Automated image and video analysis for fast, actionable insights.',
    },
    {
        title: 'Persona-Driven Precision',
        description: 'Personalized interactions based on unique customer behaviors.',
    },
    {
        title: 'SecureAI Shield',
        description: 'Proactive threat detection and neutralization to keep your business secure.',
    },
]

export default function IgnitePotential() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="home-features-wrapper">
                        <AnimatedInViewDiv className="header">
                            <div className="heading-4 text-weight-bold">Ignite Your Potential with AI-Driven Innovations</div>
                            <div className="opacity-60">
                                <div className="max-width-48ch">
                                    <div className="text-size-regular">Fuel your business growth with AI solutions that are not
                                        only dynamic and adaptive but also innovative and tailored to match the scale and
                                        vision of your ambitions.</div>
                                </div>
                            </div>
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
                    </div>
                </div>
            </div>
        </section>
    )
}