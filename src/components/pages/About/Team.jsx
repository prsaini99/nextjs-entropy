'use client'
import React from 'react'
import { MoreAImodels } from '@/components/Buttons'
import AnimatedInViewDiv from '@/components/Animate/AppearInView'

export default function Team() {
    const teamMembers = [
        {
            name: 'Dr. Jane Smith',
            role: 'Chief AI Scientist',
            image: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd3_Entropy%20Team%20Images%2001.jpg',
        },
        {
            name: 'Emily White',
            role: 'Lead Data Analyst',
            image: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd4_Entropy%20Team%20Images%2002.jpg',
        },
        {
            name: 'John Doe',
            role: 'Head of Product Development',
            image: 'https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cd5_Entropy%20Team%20Images%2003.jpg',
        },
    ]

    return (
        <section className="team-section">
            <div className="padding-global">
                <div className="container w-container">
                    <div className="team-wrapper">
                        <AnimatedInViewDiv className="team-header">
                            <div className="header">
                                <h2 className="heading-4 text-weight-medium">Meet the Game-Changers: Our Team</h2>
                                <div className="opacity-60">
                                    <div className="max-width-75ch">
                                        <p className="text-size-regular">Behind every great solution is an even greater team. Our experts come from diverse backgrounds in AI, cybersecurity, data science, and beyond. Together, we combine decades of experience with a love for innovation to tackle even the toughest challenges your business faces.</p>
                                        <p className="text-size-regular">“We’re basically the Avengers of IT, minus the capes but with plenty of tech gadgets - and an uncanny ability to solve problems.”</p>
                                    </div>
                                </div>
                                <div className="opacity-60">
                                    <div className="max-width-75ch">
                                        <p className="text-size-medium"><strong>Why Businesses Trust Us</strong></p>
                                        <ul className="text-size-regular">
                                            <li><strong>Customized Strategies:</strong> Your business isn’t generic, so why should your tech solutions be? We tailor every approach to your unique needs.</li>
                                            <li><strong>Future-Ready Tech:</strong> From cloud computing to machine learning, we use the latest tools to keep you ahead of the curve.</li>
                                            <li><strong>Long-Term Commitment:</strong> We’re not just here for the launch; we’re here for the journey.</li>
                                        </ul>
                                        <p className="text-size-regular mt-10">“Work with us, and you’ll not only get groundbreaking solutions but also the occasional bad pun—because tech shouldn’t be boring.”</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedInViewDiv>
                        <div className="team-grid">
                            {teamMembers.map((member, index) => (
                                <AnimatedInViewDiv delay={index * 0.2} key={member.name} className="children-perspective">
                                    <div className="team-card">
                                        <div className="team-image">
                                            <img src={member.image} alt={`${member.name}`} loading="lazy" />
                                        </div>
                                        <div className="team-content">
                                            <div className="text-size-large text-weight-medium">{member.name}</div>
                                            <div className="opacity-80">
                                                <div className="text-size-small text-weight-medium caps">{member.role}</div>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedInViewDiv>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}