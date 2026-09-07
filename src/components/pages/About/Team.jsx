'use client'
import React from 'react'
import { MoreAImodels } from '@/components/Buttons'
import AnimatedInViewDiv from '@/components/Animate/AppearInView'

export default function Team() {
    const teamMembers = [
        {
            name: 'Dr. Jane Smith',
            role: 'Chief AI Scientist',
            image: '/media/entropy-team-images-01.webp',
        },
        {
            name: 'Emily White',
            role: 'Lead Data Analyst',
            image: '/media/entropy-team-images-02.webp',
        },
        {
            name: 'John Doe',
            role: 'Head of Product Development',
            image: '/media/entropy-team-images-03.webp',
        },
    ]

    return (
        <section className="team-section">
            <div className="padding-global">
                <div className="container w-container">
                    <div className="team-wrapper">
                        <AnimatedInViewDiv className="team-header">
                            <div className="header">
                                <div className="heading-4 text-weight-medium">
                                    Meet the Game-Changers: Our Team
                                </div>
                                <div className="opacity-80">
                                    <div className="max-width-4xl">
                                        <div>
                                            Behind every great solution is an even greater team.
                                        </div>
                                        <div>
                                            “Partner with us for groundbreaking solutions that are as dynamic as your vision, delivered with a touch of personality.”
                                        </div>
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