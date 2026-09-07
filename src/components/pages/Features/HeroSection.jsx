'use client'
import React from 'react'
import ROUTES from '@/constants/routes'
import { GetStarted, LearnMoreButton, MoreAImodels } from '@/components/Buttons'
import AnimatedInViewDiv from '@/components/Animate/AppearInView'

export default function HeroSection() {
    const title = "Your One-Stop Shop for All Things"
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="hero-wrapper">
                        <AnimatedInViewDiv className="hero-component">
                            <MoreAImodels />
                            <div className="max-width-75ch">
                                <div className="heading-2 text-weight-bold">
                                    {title}
                                </div>
                            </div>
                        </AnimatedInViewDiv>
                        <AnimatedInViewDiv className="double-button-component margin-top-button-hero">
                            <GetStarted />
                            <LearnMoreButton title='About Us' routeTo={ROUTES.ABOUT} />
                        </AnimatedInViewDiv>
                        <AnimatedInViewDiv className="features-hero-image container">
                            <img sizes="95vw"
                                srcSet="/media/background-image-p-500.webp 500w, /media/background-image-p-800.webp 800w, /media/background-image-p-1080.webp 1080w, /media/background-image-p-1600.webp 1600w, /media/background-image-p-2000.webp 2000w, /media/background-image.webp 2880w"
                                alt="Background Image"
                                src="/media/background-image.webp"
                                loading="lazy" className="image" />
                            <div className="gradient-overlay hero"></div>
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    )
}
