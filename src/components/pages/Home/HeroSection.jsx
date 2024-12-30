'use client'
import React from 'react';
import { GetStarted, LearnMoreButton, MoreAImodels } from '@/components/Buttons';
import AnimatedInViewDiv from '@/components/Animate/AppearInView';

const logos = [
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c98_Logos%20Grid%2002.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c97_Logos%20Grid%2007.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c96_Logos%20Grid%2009.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c95_Logos%20Grid%2006.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c94_Logos%20Grid%2010.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c8f_Logos%20Grid%2003.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ce6_Logos03.svg', },
];

export default function HeroSection() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="hero-wrapper">
                        <AnimatedInViewDiv className="hero-component">
                            <MoreAImodels />
                            <div className="max-width-70ch">
                                <div className="heading-2 text-weight-bold">Unlock the Future AI with Entropy</div>
                            </div>
                        </AnimatedInViewDiv>
                        <AnimatedInViewDiv className="double-button-component margin-top-button-hero" delay={.2}>
                            <GetStarted />
                            <LearnMoreButton />
                        </AnimatedInViewDiv>
                        <AnimatedInViewDiv className="trusted-by-component" delay={.4}>
                            <div className="opacity-60">
                                <div className="text-size-small">Trusted by design teams at</div>
                            </div>
                            <div className="trusted-by-hero-logos">
                                {logos.map((logo, index) => (
                                    <AnimatedInViewDiv delay={index * .05} key={index} className="logos">
                                        <img loading="lazy" src={logo.src} alt="Logo" />
                                    </AnimatedInViewDiv>
                                ))}
                            </div>
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    )
}
