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
                                    About StackBinary
                                </h1>
                                <div className="max-w-4xl">
                                    <p className="opacity-60">
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
                                        backgroundImage: `url("https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/about-poster")`,
                                        objectFit: "cover",
                                    }}
                                >
                                    <source
                                        src="https://res.cloudinary.com/ddnydyvlf/video/upload/f_auto:video,q_auto/v1/stack-binary-live/about-video"
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
