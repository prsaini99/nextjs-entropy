"use client";

import Link from "next/link";

export default function HeroSection() {

    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="hero-wrapper">
                        <div className="hero-component">
                            {/* Link to Features */}
                            <Link href="/features" className="read-more-tag w-inline-block">
                                <div className="text-size-small text-weight-bold">More AI models</div>
                                <div className="vertical-line-tag"></div>
                                <div className="read-more-button">
                                    <div className="opacity-50">
                                        <div className="text-size-small text-weight-bold">Read more</div>
                                    </div>
                                    <img
                                        loading="lazy"
                                        src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c3f_Read%20More%20Arrow.svg"
                                        alt="Arrow"
                                        className="arrow"
                                    />
                                </div>
                            </Link>
                            {/* Hero Heading */}
                            <div className="max-width-50ch">
                                <div className="heading-2 text-weight-bold">Unlock the Future with AI</div>
                            </div>
                        </div>

                        {/* Double Button Section */}
                        <div className="double-button-component margin-top-button-hero">
                            {/* Get Started Button */}
                            <Link href="/contact" className="primary-button w-inline-block">
                                <div className="relative">
                                    <div className="text-size-small text-weight-bold">Get Started</div>
                                </div>
                                <div className="button-elipse"></div>
                            </Link>

                            {/* Learn More Button */}
                            <Link href="/features" className="secondary-button w-inline-block">
                                <div className="button-wrapper">
                                    <div className="secondary-button-text">
                                        <div className="text-weight-bold text-size-small">Learn More</div>
                                    </div>
                                    <div className="button-icon">
                                        <div className="icon-wrapper">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ccb_Arrow.svg"
                                                alt="Arrow"
                                                className="icon"
                                            />
                                            <img
                                                loading="lazy"
                                                src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ccb_Arrow.svg"
                                                alt="Arrow"
                                                className="icon"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Video Section */}
                        <div className="about-hero-image">
                            <div
                                data-poster-url="https://cdn.prod.website-files.com/66d89db32b418832a387e57c%2F66d8c23fec6488becdc7f741_About%20Hero%20Video-poster-00001.jpg"
                                data-video-urls="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c75_About%20Hero%20Video-transcode.mp4,https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c75_About%20Hero%20Video-transcode.webm"
                                data-autoplay="true"
                                data-loop="true"
                                className="hero-video w-background-video w-background-video-atom"
                            >
                                <video
                                    id="hero-video"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    style={{
                                        backgroundImage: `url("https://cdn.prod.website-files.com/66d89db32b418832a387e57c%2F66d8c23fec6488becdc7f741_About%20Hero%20Video-poster-00001.jpg")`,
                                        objectFit: "cover",
                                    }}
                                >
                                    <source
                                        src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c75_About%20Hero%20Video-transcode.mp4"
                                        type="video/mp4"
                                    />
                                    <source
                                        src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c75_About%20Hero%20Video-transcode.webm"
                                        type="video/webm"
                                    />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
