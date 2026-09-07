'use client'
import React from 'react'
import AnimatedInViewDiv from '@/components/Animate/AppearInView';

const logos = [
    { src: '/media/logos-grid-02.svg', },
    { src: '/media/logos04.svg', },
    { src: '/media/logos-grid-07.svg', },
    { src: '/media/logos01.svg', },
    { src: '/media/logos-grid-03.svg', },
    { src: '/media/logos-grid-09.svg', },
    { src: '/media/logos-grid-06.svg', },
    { src: '/media/logos03.svg', },
    { src: '/media/logos-grid-10.svg', },
    { src: '/media/logos02.svg', },
];

export default function TrustedByAbout() {
    return (
        <section>
            {/* <div className="padding-global py-16">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="trusted-by-about-component">
                        <AnimatedInViewDiv className="opacity-80">
                            <div className="text-size-small">From prototypes to production systems, we partner with teams to turn roadmaps into measurable outcomes.</div>
                        </AnimatedInViewDiv>
                        <div className="trusted-by-about-logos logos">
                            {logos.map((logo, index) => (
                                <AnimatedInViewDiv delay={index * .1} key={index} className="flex justify-center items-center">
                                    <img loading="lazy" src={logo.src} alt="Logo" className='w-sm-[200px] w-11/12 h-5/6' />
                                </AnimatedInViewDiv>
                            ))}
                        </div>
                    </div>
                </div>
            </div> */}
        </section>
    )
}

