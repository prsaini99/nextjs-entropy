'use client'
import React from 'react'
import { GetStarted, LearnMoreButton } from '@/components/Buttons'
import AnimatedInViewDiv from '@/components/Animate/AppearInView'

const services = [
    { title: "Accelerated Deployment", description: "Empowering you to launch projects swiftly and efficiently, reducing time-to-market." },
    { title: "Strategic Customer Relationship Management", description: "Enhancing customer engagement with tailored solutions that foster trust and long-term loyalty." },
    { title: "Advanced Data Insights", description: "Transforming raw data into actionable intelligence to inform strategic decisions and drive success." },
    { title: "Tailored Digital Integration", description: "Providing end-to-end technology solutions designed to streamline operations and boost performance." },
]

export default function TransformBussiness() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container medium w-container">
                    <div className="features-cards-wrapper">
                        <AnimatedInViewDiv className="header">
                            <div className="heading-4 text-weight-bold">
                                Revolutionize Your Operations with Our Services
                            </div>
                            {/* <div className="opacity-60">
                                <div className="max-width-46ch">
                                    <div className="text-size-regular">
                                        {services[0].description}
                                    </div>
                                </div>
                            </div> */}
                        </AnimatedInViewDiv>
                        <div className="home-integrations-wrapper">
                            <div className="integrations-content-component">
                                <AnimatedInViewDiv className="integrations-block first">
                                    <div className="integrations-image">
                                        <img
                                            sizes="(max-width: 479px) 73vw, (max-width: 767px) 75vw, (max-width: 991px) 384.75px, 37vw"
                                            srcSet="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c44_Images%2520Cards%252001-p-500.jpg 500w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c44_Images%2520Cards%252001-p-800.jpg 800w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c44_Images%20Cards%2001.jpg 808w"
                                            alt="Image Features"
                                            src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c44_Images%20Cards%2001.jpg"
                                            loading="lazy" />
                                    </div>
                                    <div className="integrations-content">
                                        <div className="text-size-large">
                                            {services[0].title}
                                        </div>
                                        <div className="opacity-70">
                                            <div className="max-width-50ch">
                                                <div className="text-size-regular">
                                                    {services[0].description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedInViewDiv>
                                <AnimatedInViewDiv className="integrations-block second" delay={0.2}>
                                    <div className="integrations-image">
                                        <img
                                            sizes="(max-width: 479px) 73vw, (max-width: 991px) 304.921875px, 24vw"
                                            srcSet="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c42_Images%2520Cards%252002-p-500.jpg 500w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c42_Images%20Cards%2002.jpg 526w"
                                            alt="Image Features"
                                            src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c42_Images%20Cards%2002.jpg"
                                            loading="lazy" />
                                    </div>
                                    <div className="integrations-content">
                                        <div className="text-size-large">
                                            {services[1].title}
                                        </div>
                                        <div className="opacity-70">
                                            <div className="max-width-50ch">
                                                <div className="text-size-regular">
                                                    {services[1].description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedInViewDiv>
                            </div>
                            <div className="integrations-content-component">
                                <AnimatedInViewDiv className="integrations-block second">
                                    <div className="integrations-image">
                                        <img loading="lazy"
                                            src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c41_Images%20Cards%2003.jpg"
                                            alt="Image Features" />
                                    </div>
                                    <div className="integrations-content">
                                        <div className="text-size-large">
                                            {services[2].title}
                                        </div>
                                        <div className="opacity-70">
                                            <div className="max-width-50ch">
                                                <div className="text-size-regular">
                                                    {services[2].description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedInViewDiv>
                                <AnimatedInViewDiv className="integrations-block first" delay={0.2}>
                                    <div className="integrations-image">
                                        <img sizes="(max-width: 479px) 73vw, 339.640625px"
                                            srcSet="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c43_Images%2520Cards%252004-p-500.jpg 500w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c43_Images%20Cards%2004.jpg 726w"
                                            alt="Image Features"
                                            src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c43_Images%20Cards%2004.jpg"
                                            loading="lazy" />
                                    </div>
                                    <div className="integrations-content">
                                        <div className="text-size-large">
                                            {services[3].title}
                                        </div>
                                        <div className="opacity-70">
                                            <div className="max-width-50ch">
                                                <div className="text-size-regular">
                                                    {services[3].description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedInViewDiv>
                            </div>
                        </div>
                        <AnimatedInViewDiv>
                            <LearnMoreButton title='Discover All Services' />
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    )
}