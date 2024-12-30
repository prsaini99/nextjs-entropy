'use client'
import React from 'react'
import { GetStarted, LearnMoreButton } from '@/components/Buttons'
import AnimatedInViewDiv from '@/components/Animate/AppearInView'


export default function TransformBussiness() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container medium w-container">
                    <div className="features-cards-wrapper">
                        <AnimatedInViewDiv className="header">
                            <div className="heading-4 text-weight-bold">
                                Transform Your Business with Advanced AI Features
                            </div>
                            <div className="opacity-60">
                                <div className="max-width-46ch">
                                    <div className="text-size-regular">
                                        Our AI solutions are crafted to meet the unique
                                        challenges of your industry, ensuring you stay ahead in a rapidly evolving digital
                                        landscape.
                                    </div>
                                </div>
                            </div>
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
                                        <div className="text-size-large">Fast Email Campaigns</div>
                                        <div className="opacity-70">
                                            <div className="max-width-50ch">
                                                <div className="text-size-regular">
                                                    Send lightning-quick email campaigns with
                                                    Mercury Mail, ensuring your messages reach your audience in record time.
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
                                        <div className="text-size-large">Customer Relationships</div>
                                        <div className="opacity-70">
                                            <div className="max-width-50ch">
                                                <div className="text-size-regular">
                                                    Featuring a beautiful and intuitive interface
                                                    that simplifies interactions.
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
                                        <div className="text-size-large">Insights</div>
                                        <div className="opacity-70">
                                            <div className="max-width-50ch">
                                                <div className="text-size-regular">
                                                    Gain powerful, data-driven insights, helping
                                                    you make informed decisions.
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
                                        <div className="text-size-large">Connectivity</div>
                                        <div className="opacity-70">
                                            <div className="max-width-50ch">
                                                <div className="text-size-regular">
                                                    Boost your social media presence, creating
                                                    rings of connections and expanding your brand’s reach.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedInViewDiv>
                            </div>
                        </div>
                        <AnimatedInViewDiv>
                            <div className="double-button-component">
                                <GetStarted />
                                <LearnMoreButton />
                            </div>
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    )
}