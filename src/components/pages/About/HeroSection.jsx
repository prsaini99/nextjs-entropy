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
                                <div className="heading-2 text-weight-bold">
                                    Redefining Tomorrow: Our Story
                                </div>
                                <div className="max-w-4xl">
                                    <p className="opacity-60">
                                        At Stackbinary, we believe technology isn’t just a tool—it’s the future waiting to be unlocked. From day one, we’ve been dedicated to helping businesses overcome tech challenges and uncover new opportunities. With a passion for innovation and a knack for problem-solving, we’ve transformed companies across industries, making their goals our mission.
                                    </p>
                                    <p className="opacity-60">
                                        "We don’t just adapt to change; we orchestrate it—while occasionally fueling up on coffee and brainstorming brilliance."
                                    </p>
                                </div>
                            </div>
                        </AnimatedInViewDiv>

                        {/* Double Button Section */}
                        {/* <AnimatedInViewDiv className="double-button-component margin-top-button-hero" delay={0.2}>
                            <GetStarted />
                            <LearnMoreButton />
                        </AnimatedInViewDiv> */}

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
