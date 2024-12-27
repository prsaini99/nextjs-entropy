import React from 'react'
import ROUTES from '@/constants/routes'
import { GetStarted, LearnMoreButton } from '@/components/Buttons'

export default function FeaturesWrapper() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="features-wrapper">
                        <div className="header">
                            <div className="heading-4 text-weight-bold">Ignite Your Potential with AI-Driven Innovations
                            </div>
                            <div className="opacity-60">
                                <div className="max-width-48ch">
                                    <div>Fuel your business growth with AI solutions that are not only dynamic and adaptive
                                        but also innovative and tailored to match the scale and vision of your ambitions.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="features-component">
                            <div className="features-vantages">
                                <div className="features-vantages-content">
                                    <div className="features-heading-wrapper">
                                        <div className="features-icon-wrapper">
                                            <img loading="lazy"
                                                src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c64_Icon-1.svg"
                                                alt="Icon" /></div>
                                        <div className="features-heading align-left">
                                            <div className="heading-6 text-weight-medium">Vantage Analytics</div>
                                            <div className="text-size-medium">Gain a comprehensive view of your data with
                                                advanced analytics that provide actionable insights and strategic
                                                recommendations.</div>
                                        </div>
                                    </div>
                                    <div className="check-list">
                                        <div className="check-item">
                                            <div className="check-icon-wrap">
                                                <img width="13.996087074279785"
                                                    height="12.25517749786377" alt="Icon"
                                                    src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c65_Check%20Icon.svg"
                                                    loading="lazy" className="check-icon" /></div>
                                            <div className="text-size-medium">Real-Time Data Monitoring</div>
                                        </div>
                                        <div className="check-item">
                                            <div className="check-icon-wrap">
                                                <img width="13.996087074279785"
                                                    height="12.25517749786377" alt="Icon"
                                                    src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c65_Check%20Icon.svg"
                                                    loading="lazy" className="check-icon" /></div>
                                            <div className="text-size-medium">Customizable Dashboards</div>
                                        </div>
                                        <div className="check-item">
                                            <div className="check-icon-wrap">
                                                <img width="13.996087074279785"
                                                    height="12.25517749786377" alt="Icon"
                                                    src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c65_Check%20Icon.svg"
                                                    loading="lazy" className="check-icon" /></div>
                                            <div className="text-size-medium">Predictive Insights</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="features-image-container">
                                    <div href="#" className="features-image-wrapper">
                                        <img
                                            sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, (max-width: 991px) 92vw, 56vw"
                                            srcSet="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c67_Features%2520Images%252003-p-500.jpg 500w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c67_Features%2520Images%252003-p-800.jpg 800w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c67_Features%2520Images%252003-p-1080.jpg 1080w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c67_Features%20Images%2003.jpg 1152w"
                                            alt="Features Image"
                                            src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c67_Features%20Images%2003.jpg"
                                            loading="lazy" className="image" />
                                        <div className="gradient-overlay bigger"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="features-vantages">
                                <div className="features-image-container">
                                    <div href="#" className="features-image-wrapper">
                                        <img
                                            sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, (max-width: 991px) 92vw, 56vw"
                                            srcSet="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c6f_Features%2520Images%252002-p-500.jpg 500w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c6f_Features%2520Images%252002-p-800.jpg 800w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c6f_Features%20Images%2002.jpg 1120w"
                                            alt="Features Image"
                                            src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c6f_Features%20Images%2002.jpg"
                                            loading="lazy" className="image" />
                                        <div className="gradient-overlay bigger"></div>
                                    </div>
                                </div>
                                <div className="features-vantages-content">
                                    <div className="features-heading-wrapper">
                                        <div className="features-icon-wrapper">
                                            <img loading="lazy"
                                                src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c63_Icon.svg"
                                                alt="Icon" /></div>
                                        <div className="features-heading align-left">
                                            <div className="heading-6 text-weight-medium">Smart Automation</div>
                                            <div className="text-size-medium">Streamline your operations with intelligent
                                                automation that reduces manual tasks and enhances efficiency across your
                                                workflows.</div>
                                        </div>
                                    </div>
                                    <div className="check-list">
                                        <div className="check-item">
                                            <div className="check-icon-wrap">
                                                <img width="13.996087074279785"
                                                    height="12.25517749786377" alt="Icon"
                                                    src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c65_Check%20Icon.svg"
                                                    loading="lazy" className="check-icon" /></div>
                                            <div className="text-size-medium">Task Scheduling</div>
                                        </div>
                                        <div className="check-item">
                                            <div className="check-icon-wrap">
                                                <img width="13.996087074279785"
                                                    height="12.25517749786377" alt="Icon"
                                                    src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c65_Check%20Icon.svg"
                                                    loading="lazy" className="check-icon" /></div>
                                            <div className="text-size-medium">Workflow Integration</div>
                                        </div>
                                        <div className="check-item">
                                            <div className="check-icon-wrap">
                                                <img width="13.996087074279785"
                                                    height="12.25517749786377" alt="Icon"
                                                    src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c65_Check%20Icon.svg"
                                                    loading="lazy" className="check-icon" /></div>
                                            <div className="text-size-medium">Error Reduction</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="features-vantages">
                                <div className="features-vantages-content">
                                    <div className="features-heading-wrapper">
                                        <div className="features-icon-wrapper">
                                            <img loading="lazy"
                                                src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c63_Icon.svg"
                                                alt="Icon" /></div>
                                        <div className="features-heading align-left">
                                            <div className="heading-6 text-weight-medium">Personalized Engagement</div>
                                            <div className="text-size-medium">Enhance customer interactions with AI-driven
                                                personalization that tailors experiences based on individual preferences and
                                                behaviors.</div>
                                        </div>
                                    </div>
                                    <div className="check-list">
                                        <div className="check-item">
                                            <div className="check-icon-wrap">
                                                <img width="13.996087074279785"
                                                    height="12.25517749786377" alt="Icon"
                                                    src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c65_Check%20Icon.svg"
                                                    loading="lazy" className="check-icon" /></div>
                                            <div className="text-size-medium">Behavioral Targeting</div>
                                        </div>
                                        <div className="check-item">
                                            <div className="check-icon-wrap">
                                                <img width="13.996087074279785"
                                                    height="12.25517749786377" alt="Icon"
                                                    src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c65_Check%20Icon.svg"
                                                    loading="lazy" className="check-icon" /></div>
                                            <div className="text-size-medium">Dynamic Recommendations</div>
                                        </div>
                                        <div className="check-item">
                                            <div className="check-icon-wrap">
                                                <img width="13.996087074279785"
                                                    height="12.25517749786377" alt="Icon"
                                                    src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c65_Check%20Icon.svg"
                                                    loading="lazy" className="check-icon" /></div>
                                            <div className="text-size-medium">Custom Communication</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="features-image-container">
                                    <div href="#" className="features-image-wrapper">
                                        <img
                                            sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, (max-width: 991px) 92vw, 56vw"
                                            srcSet="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c66_Features%2520Images%252001-p-500.jpg 500w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c66_Features%2520Images%252001-p-800.jpg 800w, https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c66_Features%20Images%2001.jpg 1152w"
                                            alt="Features Image"
                                            src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c66_Features%20Images%2001.jpg"
                                            loading="lazy" className="image" />
                                        <div className="gradient-overlay bigger"></div>
                                    </div>
                                </div>
                            </div>
                            <div data-w-id="de8d51a1-a9f1-e8fc-1d9c-a4336e447a0b"
                                className="double-button-component margin-top-button-hero">
                                <GetStarted />
                                <LearnMoreButton title='About Us' routeTo={ROUTES.ABOUT} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
