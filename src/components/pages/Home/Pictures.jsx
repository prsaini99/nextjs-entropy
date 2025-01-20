'use client'
import Image from "next/image";
import AnimatedInViewDiv from "@/components/Animate/AppearInView";

const leftImage = "https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/bd9ietj9vz9ezmtrsajf";
const middleVideo = "https://res.cloudinary.com/ddnydyvlf/video/upload/f_auto:video,q_auto/v1/stack-binary-live/home-video";
const middlePoster = "https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/poster-image";
const rightImage = "https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/home-right-image";

export default function Pictures() {

    return (
        <div className="overflow-hidden">
            <section>
                <AnimatedInViewDiv className="about-hero-interaction">
                    <div className="hero-sticky-component">
                        <div className="sticky-images left">
                            <Image
                                sizes="(max-width: 479px) 100vw, 30vw"
                                src={leftImage}
                                srcSet={leftImage}
                                alt="Slider Image"
                                className="image"
                                width={848}
                                height={500}
                            />
                        </div>
                        <div className="sticky-images middle">
                            <div
                                data-poster-url={middlePoster}
                                data-video-urls={middleVideo}
                                data-autoplay="true"
                                data-loop="true"
                                data-wf-ignore="true"
                                className="hero-video w-background-video w-background-video-atom"
                            >
                                <video
                                    id="8cd18ab4-66b9-32d7-9eb8-771b2493adc9-video"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    style={{
                                        backgroundImage:
                                            'url("https://cdn.prod.website-files.com/66d89db32b418832a387e57c%2F66d8c23fec6488becdc7f741_About%20Hero%20Video-poster-00001.jpg")',
                                        objectFit: "cover",
                                    }}
                                >
                                    <source type="video/mp4" src={middleVideo} />
                                </video>
                            </div>
                        </div>
                        <div className="sticky-images right">
                            <Image
                                sizes="(max-width: 479px) 100vw, 30vw"
                                src={rightImage}
                                srcSet={rightImage}
                                alt="Hero Image"
                                className="image"
                                width={848}
                                height={500}
                            />
                        </div>
                    </div>
                </AnimatedInViewDiv>
            </section>
        </div>
    );
}
