'use client'
import React from 'react'
import ROUTES from '@/constants/routes'
import { GetStarted, LearnMoreButton, MoreAImodels } from '@/components/Buttons'
import AnimatedInViewDiv from '@/components/Animate/AppearInView'

export default function HeroSection() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="hero-wrapper">
                        <AnimatedInViewDiv className="hero-component">
                            <MoreAImodels />
                            <div data-w-id="09973273-c8a4-e412-bd7e-c098a9c2faa7"
                                className="max-width-75ch">
                                <div className="heading-2 text-weight-bold">Explore Our Advanced AI Features</div>
                            </div>
                        </AnimatedInViewDiv>
                        <AnimatedInViewDiv className="double-button-component margin-top-button-hero">
                            <GetStarted />
                            <LearnMoreButton title='About Us' routeTo={ROUTES.ABOUT} />
                        </AnimatedInViewDiv>
                        <AnimatedInViewDiv className="features-hero-image">
                            <img sizes="95vw"
                                srcSet="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c74_Background%2520Image-p-500.jpg 500w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c74_Background%2520Image-p-800.jpg 800w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c74_Background%2520Image-p-1080.jpg 1080w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c74_Background%2520Image-p-1600.jpg 1600w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c74_Background%2520Image-p-2000.jpg 2000w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c74_Background%20Image.jpg 2880w"
                                alt="Background Image"
                                src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c74_Background%20Image.jpg"
                                loading="lazy" className="image" />
                            <div className="gradient-overlay hero"></div>
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    )
}
