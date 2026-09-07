"use client";

import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import { MoreAImodels, LearnMoreButton, GetStarted } from "@/components/Buttons";

export default function HeroSection() {

    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="hero-wrapper">
                        <AnimatedInViewDiv className="hero-component">
                            {/* Link to Features */}
                            <MoreAImodels />
                            {/* Hero Heading */}
                            <div className="flex flex-col items-center gap-10">
                                <h1 className="heading-2 text-weight-bold">
                                    About Stackbinary
                                </h1>
                                <div className="max-w-4xl">
                                    <p className="opacity-80">
                                        We're an engineering-led team building AI, cloud and custom software that ships fast, scales reliably and stays secure.
                                    </p>
                                </div>
                            </div>
                        </AnimatedInViewDiv>

                        {/* Double Button Section */}
                        <AnimatedInViewDiv className="double-button-component margin-top-button-hero" delay={0.2}>
                            <GetStarted />
                            <LearnMoreButton title="Explore Our Services" />
                        </AnimatedInViewDiv>

                        {/* Video Section */}
                        <AnimatedInViewDiv className="about-hero-image" delay={0.4}>
                            <div
                                data-poster-url="/media/about-hero-video-poster-00001.webp"
                                data-video-urls="/media/about-hero-video-transcode.mp4"
                                data-autoplay="true"
                                data-loop="true"
                                className="hero-video w-background-video w-background-video-atom"
                            >
                                <video
                                    id="hero-video"
                                    poster="/media/about-hero-video-poster-00001.webp"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    style={{
                                        backgroundImage: `url("/media/about-hero-video-poster-00001.webp")`,
                                        objectFit: "cover",
                                    }}
                                >
                                    <source
                                        src="/media/about-hero-video-transcode.mp4"
                                        type="video/mp4"
                                    />
                                </video>
                            </div>
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    );
}
