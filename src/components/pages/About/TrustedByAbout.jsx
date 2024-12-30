'use client'
import React from 'react'
import AnimatedInViewDiv from '@/components/Animate/AppearInView';

const logos = [
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c98_Logos%20Grid%2002.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ce7_Logos04.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c97_Logos%20Grid%2007.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ce5_Logos01.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c8f_Logos%20Grid%2003.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c96_Logos%20Grid%2009.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c95_Logos%20Grid%2006.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ce6_Logos03.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c94_Logos%20Grid%2010.svg', },
    { src: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ce4_Logos02.svg', },
];

export default function TrustedByAbout() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="trusted-by-about-component">
                        <AnimatedInViewDiv className="opacity-60">
                            <div className="text-size-small">Trusted by design teams at</div>
                        </AnimatedInViewDiv>
                        <div className="trusted-by-about-logos logos">
                            {logos.map((logo, index) => (
                                <AnimatedInViewDiv delay={index * .1} key={index} className="flex justify-center items-center">
                                    <img loading="lazy" src={logo.src} alt="Logo" className='w-11/12 h-5/6' />
                                </AnimatedInViewDiv>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

