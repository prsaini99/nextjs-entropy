'use client'
import Image from "next/image";
import AnimatedInViewDiv from "@/components/Animate/AppearInView";

export default function Pictures() {

    return (
        <div className="overflow-hidden">
            <section>
                <AnimatedInViewDiv className="about-hero-interaction">
                    <div className="hero-sticky-component">
                        <div className="sticky-images left">
                            <Image
                                sizes="(max-width: 479px) 100vw, 30vw"
                                src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ce8_Hero%20Image.jpg"
                                srcSet="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ce8_Hero%2520Image-p-500.jpg 500w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ce8_Hero%2520Image-p-800.jpg 800w"
                                alt="Slider Image"
                                className="image"
                                width={848}
                                height={500}
                            />
                        </div>
                        <div className="sticky-images middle">
                            <div
                                data-poster-url="https://cdn.prod.website-files.com/66d89db32b418832a387e57c%2F66d8c23fec6488becdc7f741_About%20Hero%20Video-poster-00001.jpg"
                                data-video-urls="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c75_About%20Hero%20Video-transcode.mp4,https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c75_About%20Hero%20Video-transcode.webm"
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
                                    <source src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c75_About%20Hero%20Video-transcode.mp4" />
                                    <source src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c75_About%20Hero%20Video-transcode.webm" />
                                </video>
                            </div>
                        </div>
                        <div className="sticky-images right">
                            <Image
                                sizes="(max-width: 479px) 100vw, 30vw"
                                src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c7a_Hero%20Image.jpg"
                                srcSet="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c7a_Hero%2520Image-p-500.jpg 500w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c7a_Hero%2520Image-p-800.jpg 800w"
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
