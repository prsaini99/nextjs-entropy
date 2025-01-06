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
                            <div className="max-width-60ch">
                                <div className="heading-3 text-weight-bold"> Redefining Tomorrow: Our Story</div>
                            </div>
                            <div className="opacity-60">
                                <div className="max-width-75ch">
                                    <div className="text-size-medium">
                                        At Stackbinary, we believe technology isn’t just a tool. it’s the future waiting to be unlocked. From day one,
                                        we’ve been dedicated to helping businesses overcome tech challenges and uncover new opportunities.
                                        With a passion for innovation and a knack for problem-solving, we’ve transformed companies across industries,
                                        making their goals our mission.</div>
                                    <div className="text-size-medium">
                                        “We don’t just adapt to change; we orchestrate it - while occasionally fueling up on coffee and brainstorming brilliance.”
                                    </div>
                                </div>
                            </div>
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
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    );
}
