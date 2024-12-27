import { MoreAImodels } from '@/components/Buttons'
import React from 'react'

export default function Transformative() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="testimonial-wrapper">
                        <div className="testimonial-component">
                            <MoreAImodels />
                            <div className="header">
                                <div className="heading-4 text-weight-medium">Transformative Results with Profound Impact on
                                    Success
                                </div>
                                <div className="opacity-60">
                                    <div className="max-width-40ch">
                                        <div>Hear directly from our clients about their experiences and the impact our
                                            technology has had on their operations</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-grid">
                            {[
                                {
                                    id: "525f333e-16b4-a716-1c03-a45f2fadfa63",
                                    quote: "The AI tools from Entropy have revolutionized our workflow. Their adaptability and precision have set a new standard for our operations.",
                                    imageSrc: "https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd9_Testimonial%2001.jpg",
                                    name: "Alex Johnson",
                                    title: "CTO at TechInnovate"
                                },
                                {
                                    id: "525f333e-16b4-a716-1c03-a45f2fadfa73",
                                    quote: "We’ve seen a significant boost in efficiency since integrating Entropy's AI solutions. The personalized features truly enhance our customer interactions.",
                                    imageSrc: "https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd6_Testimonial%2003.jpg",
                                    name: "Emily Davis",
                                    title: "Marketing Director at RetailPulse"
                                },
                                {
                                    id: "525f333e-16b4-a716-1c03-a45f2fadfa83",
                                    quote: "The predictive analytics provided by Entropy have been a game-changer for our strategic planning. We’re making more informed decisions than ever before.",
                                    imageSrc: "https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd8_Testimonial%2004.jpg",
                                    name: "Michael Lee",
                                    title: "CTO at TechInnovate"
                                },
                                {
                                    id: "525f333e-16b4-a716-1c03-a45f2fadfa93",
                                    quote: "The visual recognition technology has streamlined our processes and provided us with valuable insights. Entropy is a key partner in our success.",
                                    imageSrc: "https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd7_Testimonial%2002.jpg",
                                    name: "Sarah Martinez",
                                    title: "Operations Manager at Visionary Studios"
                                },
                                {
                                    id: "525f333e-16b4-a716-1c03-a45f2fadfaa3",
                                    quote: "Thanks to Entropy’s AI-driven personalization, we’ve seen a dramatic increase in customer satisfaction and engagement. It’s truly exceptional.",
                                    imageSrc: "https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd8_Testimonial%2004.jpg",
                                    name: "James Wilson",
                                    title: "Customer Experience Lead at BrightPath"
                                },
                                {
                                    id: "525f333e-16b4-a716-1c03-a45f2fadfab3",
                                    quote: "The cybersecurity solutions from Entropy offer unparalleled protection for our data. We feel confident and secure knowing our systems are in good hands.",
                                    imageSrc: "https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cda_Testimonial%2005.jpg",
                                    name: "John Thompson",
                                    title: "IT Director at SecureNet Solutions"
                                }
                            ].map(({ id, quote, imageSrc, name, title }) => (
                                <div key={id} id={`w-node-_` + id + `-aee64be3`} className="testimonial-card">
                                    <div className="quote-icon">
                                        <QuoteSvg />
                                    </div>
                                    <div className="testimonial-content">
                                        <div className="testimonial-quote">
                                            <div className="text-size-medium">{quote}</div>
                                        </div>
                                        <div className="testimonial-person-info">
                                            <div className="testimonial-image">
                                                <img loading="lazy" src={imageSrc} alt="Image" />
                                            </div>
                                            <div className="testimonial-info">
                                                <div className="text-size-small text-weight-bold">{name}</div>
                                                <div className="opacity-60">
                                                    <div className="text-size-small">{title}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const QuoteSvg = () =>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 7 7" fill="none">
        <path d="M6.71924 6.73926H4.01262V4.37333C4.01262 3.42695 4.22082 2.61307 4.67508 1.95061C5.12934 1.30708 5.81073 0.890677 6.71924 0.739258V1.98847C5.90536 2.23453 5.48896 2.85913 5.4511 3.84336H6.71924V6.73926ZM2.70662 6.73926H0V4.37333C0 3.42695 0.208202 2.61307 0.662461 1.95061C1.11672 1.30708 1.79811 0.890677 2.70662 0.739258V1.98847C1.89274 2.23453 1.47634 2.85913 1.43849 3.84336H2.70662V6.73926Z" fill="#ED5145" />
    </svg>