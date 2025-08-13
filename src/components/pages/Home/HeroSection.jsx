'use client'
import React from 'react';
import Link from 'next/link';
import { GetStarted, LearnMoreButton, MoreAImodels } from '@/components/Buttons';
import AnimatedInViewDiv from '@/components/Animate/AppearInView';

// Commented out until real client logos are available
/* const logos = [
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c98_Logos%20Grid%2002.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c97_Logos%20Grid%2007.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c96_Logos%20Grid%2009.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c95_Logos%20Grid%2006.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c94_Logos%20Grid%2010.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c8f_Logos%20Grid%2003.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ce6_Logos03.svg', },
]; */

export default function HeroSection() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="hero-wrapper">
                        <AnimatedInViewDiv className="hero-component">
                            <MoreAImodels />

                            <div className="max-width-75ch text-center">
                                <h1 className="heading-4 text-weight-bold line-height-1-2">
                                    AI, Cloud & Custom Software—Built to Ship and Scale.
                                </h1>
                            </div>
                            <div className="opacity-60">
                                <div className="max-width-46ch">
                                    <div className="text-size-regular">
                                    We design, build and run secure digital products that cut time-to-market and improve reliability across web, mobile and data platforms. <Link href="/about" className="text-link">Learn about our team</Link> or <Link href="/contact-us" className="text-link">start a conversation</Link>.
                                    </div>
                                </div>
                            </div>
                        </AnimatedInViewDiv>
                        <AnimatedInViewDiv className="double-button-component margin-top-button-hero" delay={.2}>
                            <GetStarted />
                            <LearnMoreButton title="Explore Our Services" />
                        </AnimatedInViewDiv>
                        {/* <AnimatedInViewDiv className="trusted-by-component" delay={.4}>
                            <div className="opacity-60">
                                <div className="text-size-small">Join the ranks of our satisfied clients who have elevated their businesses with our expertise.</div>
                            </div>
                            <div className="trusted-by-hero-logos">
                                {logos.map((logo, index) => (
                                    <AnimatedInViewDiv delay={index * .05} key={index} className="logos">
                                        <img loading="lazy" src={logo.src} alt="Logo" />
                                    </AnimatedInViewDiv>
                                ))}
                            </div>
                        </AnimatedInViewDiv> */}
                    </div>
                </div>
            </div>
        </section>
    )
}
