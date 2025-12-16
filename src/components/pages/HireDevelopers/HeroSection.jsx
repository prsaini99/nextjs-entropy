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
                            <MoreAImodels />
                            <div className="flex flex-col items-center gap-10">
                                <h1 className="heading-2 text-weight-bold">
                                    Scale Your Team with Expert Developers
                                </h1>
                                <div className="max-w-4xl">
                                    <p className="opacity-60">
                                        Get access to skilled developers for your projects. From short-term sprints to long-term partnerships, we provide flexible engagement models tailored to your business needs.
                                    </p>
                                </div>
                            </div>
                        </AnimatedInViewDiv>

                        <AnimatedInViewDiv className="double-button-component margin-top-button-hero" delay={0.2}>
                            <GetStarted />
                            <LearnMoreButton title="Explore Our Services" />
                        </AnimatedInViewDiv>

                        <AnimatedInViewDiv className="about-hero-image" delay={0.4}>
                            <div className="hero-image-container">
                                <img
                                    src="/hero-dev-team.jpg"
                                    alt="Software development team collaboration"
                                    loading="lazy"
                                    style={{
                                        width: "100%",
                                        height: "400px",
                                        objectFit: "cover",
                                        borderRadius: "8px"
                                    }}
                                />
                            </div>
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    );
}