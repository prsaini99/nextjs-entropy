import React from 'react'
import { MoreAImodels, LearnMoreButton, GetStarted } from '@/components/Buttons'

const features = [
    {
        image: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c5f_card-01.jpg',
        title: 'Adaptive Learning Models',
        description: 'Continuously evolve with changing data using our self-learning algorithms, ensuring your AI solutions stay ahead of the curve.',
    },
    {
        image: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c5e_card-02.jpg',
        title: 'Visual Recognition',
        description: 'Automate the analysis of images and videos with cutting-edge visual recognition technology, gaining valuable insights effortlessly.',
    },
    {
        image: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c5d_card-03.jpg',
        title: 'AI-Driven Personalization',
        description: 'Create unique customer experiences with AI tools that personalize interactions based on individual behaviors and preferences.',
    },
]

export default function AboutFeatures() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="about-features-wrapper">
                        <div className="about-features-header">
                            <MoreAImodels />
                            <div className="header">
                                <div className="heading-4 text-weight-medium">
                                    Ignite Your Potential with AI-Driven Innovations
                                </div>
                                <div className="opacity-60">
                                    <div className="max-width-40ch">
                                        <div>
                                            Fuel your business growth with AI solutions tailored to match the scale and vision of your ambitions.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-layout-grid about-features-grid">
                            {features.map((feature) => (
                                <div className="about-features-card" key={feature.title}>
                                    <div className="about-features-image">
                                        <img
                                            sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, (max-width: 991px) 92vw, 28vw"
                                            srcSet={feature.image}
                                            alt="Card Image"
                                            src={feature.image}
                                            loading="lazy" className="image" />
                                        <div className="mask-frame"></div>
                                    </div>
                                    <div className="about-features-content">
                                        <div className="text-size-large text-weight-medium">{feature.title}</div>
                                        <div className="opacity-80">
                                            <div className="max-width-33ch">
                                                <div>{feature.description}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div data-w-id="a4a9a67c-c774-e652-722a-738ad99a6e0a"
                            className="double-button-component margin-top-button-features">
                            <GetStarted />
                            <LearnMoreButton />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
