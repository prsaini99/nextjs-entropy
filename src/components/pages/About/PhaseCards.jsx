'use client'
import React from 'react'
import { MoreAImodels } from '@/components/Buttons'
import AnimatedInViewDiv from '@/components/Animate/AppearInView'

export default function PhaseCards() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="phase-cards-wrapper">
                        <AnimatedInViewDiv className="phase-cards-header">
                            <div className="header">
                                <div className="heading-4 text-weight-medium">The Secret Sauce: How We Work</div>                              
                            </div>
                        </AnimatedInViewDiv>
                        <div className="phase-cards-grid">
                            {[
                                {
                                    title: "Discover Your Needs",
                                    description: "We take the time to learn your business inside out, identifying the gaps and opportunities."
                                },
                                {
                                    title: "Develop Tailored Solutions",
                                    description: " Our team designs and deploys innovative tech that aligns with your goals."
                                },
                                {
                                    title: "Drive Growth and Innovation",
                                    description: "With systems in place, we focus on scaling your success and preparing for what’s next."
                                }
                            ].map((item, index) => (
                                <AnimatedInViewDiv delay={index * .2} className="phase-cards" key={index}>
                                    <div className="phase-cards-content">
                                        <div className="text-size-large text-weight-medium">{item.title}</div>
                                        <div>{item.description}</div>
                                    </div>
                                    <div className="phase-number">
                                        <div className="heading-1 text-weight-regular">
                                            {(index + 1).toString().padStart(2, '0')}
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