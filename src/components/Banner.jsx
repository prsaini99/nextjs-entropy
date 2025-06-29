'use client'
import Link from 'next/link'
import React from 'react'
import AnimatedInViewDiv from './Animate/AppearInView'

export default function Banner({
    title = "",
    description = "",
    subDescription = "",
    image = "",
    bannerStyle = {}
}) {
    return (
        <section>
            <AnimatedInViewDiv className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="banner-wrapper">
                        <div className="banner-content">
                            <div className="top-content">
                                <div className="max-width-38ch">
                                    <div className="text-align-left">
                                        <div>
                                            {description}
                                        </div>
                                        <div>
                                            {subDescription}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom-content">
                                <div className="max-width-50ch">
                                    <div className="heading-5 text-weight-bold">
                                        {title}
                                    </div>
                                </div>
                                <Link href="/pricing" className="banner-button w-inline-block">
                                    <div className="banner-button-line">
                                        <div className="line-fill"></div>
                                    </div>
                                    <div className="button-content">
                                        <div className="text-weight-medium">Get Started</div>
                                        <div className="icon-wrapper">
                                            <img loading="lazy"
                                                src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c40_Arrow%20Button.svg"
                                                alt="Arrow" className="arrow" />
                                            <img loading="lazy"
                                                src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c40_Arrow%20Button.svg"
                                                alt="Arrow" className="arrow" /></div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="banner-overlay"></div>
                        <div className="banner-background" style={bannerStyle}>
                            <img
                                sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, 92vw"
                                srcSet={image || "https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd2_Banner%2520Image-p-500.jpg 500w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd2_Banner%2520Image-p-800.jpg 800w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd2_Banner%2520Image-p-1080.jpg 1080w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd2_Banner%2520Image-p-1600.jpg 1600w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd2_Banner%2520Image-p-2000.jpg 2000w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd2_Banner%2520Image-p-2600.jpg 2600w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd2_Banner%20Image.jpg 2688w"}
                                alt="Banner Image"
                                src={image || "https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd2_Banner%20Image.jpg"}
                                loading="lazy"
                                className='z-10'
                            />
                        </div>
                    </div>
                </div>
            </AnimatedInViewDiv>
        </section>
    )
}
