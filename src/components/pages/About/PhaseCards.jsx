'use client'
import React from 'react'
import Link from 'next/link'
import { MoreAImodels } from '@/components/Buttons'
import AnimatedInViewDiv from '@/components/Animate/AppearInView'

export default function PhaseCards() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="phase-cards-wrapper">
                        <AnimatedInViewDiv className="phase-cards-header">
                            {/* <MoreAImodels /> */}
                            <div className="header">
                                <h2 className="heading-4 text-weight-medium">
                                    How We Work
                                </h2>
                                {/* <div className="opacity-60">
                                    <div className="max-width-40ch">
                                        <div>Explore our three-phase approach to see how we drive growth and efficiency at every step.</div>
                                    </div>
                                </div> */}
                            </div>
                        </AnimatedInViewDiv>
                        <div className="phase-cards-grid">
                            {[
                                {
                                    title: "Discover",
                                    description: "Workshops to map goals, scope, risks and success metrics."
                                },
                                {
                                    title: "Build",
                                    description: "Iterative sprints with design, engineering and QA in lockstep."
                                },
                                {
                                    title: "Scale",
                                    description: (
                                        <>
                                            Reliability, cost optimization and continuous improvement. Learn more about our <Link href="/services" className="text-link">DevOps and infrastructure services</Link>.
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