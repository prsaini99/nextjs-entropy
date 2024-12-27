import Link from 'next/link'
import React from 'react'

export default function Banner() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="banner-wrapper">
                        <div className="banner-content">
                            <div className="top-content">
                                <div className="max-width-38ch">
                                    <div className="text-align-right">
                                        <div>Our AI solutions are designed to deliver measurable results and drive growth.
                                            Start your journey now and experience the future of technology.</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom-content">
                                <div className="max-width-50ch">
                                    <div className="heading-5 text-weight-bold">Transform Your Business with Cutting-Edge AI
                                        Today</div>
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
                        <div className="banner-background">
                            <img
                                sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, 92vw"
                                srcSet="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd2_Banner%2520Image-p-500.jpg 500w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd2_Banner%2520Image-p-800.jpg 800w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd2_Banner%2520Image-p-1080.jpg 1080w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd2_Banner%2520Image-p-1600.jpg 1600w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd2_Banner%2520Image-p-2000.jpg 2000w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd2_Banner%2520Image-p-2600.jpg 2600w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd2_Banner%20Image.jpg 2688w"
                                alt="Banner Image"
                                src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd2_Banner%20Image.jpg"
                                loading="lazy" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
