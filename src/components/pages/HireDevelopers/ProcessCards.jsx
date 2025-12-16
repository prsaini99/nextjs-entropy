'use client'
import React from 'react'
import Link from 'next/link'
import AnimatedInViewDiv from '@/components/Animate/AppearInView'

export default function ProcessCards() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="phase-cards-wrapper">
                        <AnimatedInViewDiv className="phase-cards-header">
                            <div className="header">
                                <h2 className="heading-4 text-weight-medium">
                                    How It Works
                                </h2>
                            </div>
                        </AnimatedInViewDiv>
                        <div className="phase-cards-grid">
                            {[
                                {
                                    title: "Discovery Call",
                                    description: "We discuss your project requirements, timeline, and technical needs to understand the scope and match you with the right team."
                                },
                                {
                                    title: "Team Selection",
                                    description: "We carefully match you with developers who have the right skills, experience, and cultural fit for your specific project needs."
                                },
                                {
                                    title: "Quick Start",
                                    description: (
                                        <>
                                            Your dedicated team begins working on your project with full transparency and regular updates. Learn more about our <Link href="/services" className="text-link">development process</Link>.
                                        </>
                                    )
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