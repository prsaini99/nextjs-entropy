import React from 'react'
import { MoreAImodels } from '@/components/Buttons'

export default function PhaseCards() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="phase-cards-wrapper">
                        <div className="phase-cards-header">
                            <MoreAImodels />
                            <div className="header">
                                <div className="heading-4 text-weight-medium">Elevate Your Business with Our Three-Phase AI Approach</div>
                                <div className="opacity-60">
                                    <div className="max-width-40ch">
                                        <div>Explore our three-phase approach to see how we drive growth and efficiency at every step.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="phase-cards-grid">
                            {[
                                {
                                    title: "Comprehensive Discovery and Flawless Seamless Integration",
                                    description: "Integrate AI solutions smoothly, setting a solid foundation for growth."
                                },
                                {
                                    title: "Advanced Optimization and Continuous Performance Enhancement",
                                    description: "Optimize and enhance performance with advanced analytics and adaptive algorithms."
                                },
                                {
                                    title: "Strategic Innovation and Scalable Market Expansion",
                                    description: "Drive innovation and explore new opportunities to scale a competitive edge."
                                }
                            ].map((item, index) => (
                                <div className="phase-cards" key={index}>
                                    <div className="phase-cards-content">
                                        <div className="text-size-large text-weight-medium">{item.title}</div>
                                        <div>{item.description}</div>
                                    </div>
                                    <div className="phase-number">
                                        <div className="heading-1 text-weight-regular">
                                            {(index + 1).toString().padStart(2, '0')}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}