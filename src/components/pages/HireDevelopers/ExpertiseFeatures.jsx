'use client'
import React from 'react'
import Link from 'next/link'
import AnimatedInViewDiv from '@/components/Animate/AppearInView'

const expertiseAreas = [
    {
        title: 'Frontend Development',
        description: 'React, Next.js, Vue.js, TypeScript, JavaScript ES6+, Responsive Design & UI/UX, Progressive Web Apps (PWA)',
    },
    {
        title: 'Backend Development',
        description: 'Node.js, Python, Java, REST APIs & GraphQL, Database Design & Optimization, Microservices Architecture',
    },
    {
        title: 'Cloud & DevOps',
        description: 'AWS, Azure, Google Cloud, Docker & Kubernetes, CI/CD Pipelines, Infrastructure as Code',
    },
    {
        title: 'Mobile Development',
        description: 'React Native, Flutter, iOS & Android Native, Cross-Platform Solutions, App Store Deployment',
    },
    {
        title: 'AI & Machine Learning',
        description: 'TensorFlow, PyTorch, Natural Language Processing, Computer Vision, Model Deployment, AI Integration',
    },
    {
        title: 'Data & Analytics',
        description: 'Data Pipeline Development, ETL Processes, Business Intelligence, Real-time Analytics, Data Visualization',
    },
]

export default function ExpertiseFeatures() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="phase-cards-wrapper">
                        <AnimatedInViewDiv className="phase-cards-header">
                            <div className="header">
                                <h2 className="heading-4 text-weight-medium">
                                    Our Expertise
                                </h2>
                                <div className="opacity-60">
                                    <div className="max-width-40ch">
                                        <div>Access to skilled developers across multiple technologies and platforms with deep expertise in modern development practices.</div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedInViewDiv>
                        <div className="phase-cards-grid">
                            {expertiseAreas.map((area, index) => (
                                <AnimatedInViewDiv delay={index * .1} className="phase-cards" key={area.title}>
                                    <div className="phase-cards-content">
                                        <div className="text-size-large text-weight-medium">{area.title}</div>
                                        <div>{area.description}</div>
                                    </div>
                                    <div className="phase-number">
                                        <div className="heading-1 text-weight-regular">
                                            {(index + 1).toString().padStart(2, '0')}
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