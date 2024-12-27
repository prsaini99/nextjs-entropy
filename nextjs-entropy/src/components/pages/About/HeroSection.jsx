"use client";

import { MoreAImodels, LearnMoreButton, GetStarted } from "@/components/Buttons";
import Link from "next/link";

export default function HeroSection() {

    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="hero-wrapper">
                        <div className="hero-component">
                            {/* Link to Features */}
                            <MoreAImodels />
                            {/* Hero Heading */}
                            <div className="max-width-50ch">
                                <div className="heading-2 text-weight-bold">Unlock the Future with AI</div>
                            </div>
                        </div>

                        {/* Double Button Section */}
                        <div className="double-button-component margin-top-button-hero">
                            <GetStarted />
                            <LearnMoreButton />
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
