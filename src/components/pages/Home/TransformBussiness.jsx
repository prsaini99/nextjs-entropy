'use client'
import React from 'react'
import Link from 'next/link'
import { GetStarted, LearnMoreButton } from '@/components/Buttons'
import AnimatedInViewDiv from '@/components/Animate/AppearInView'

const services = [
    {
        title: "AI & Machine Learning",
        description: "Production-grade chatbots, AI custom solutions, integrations and recommendations.",
        image: "https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c44_Images%20Cards%2001.jpg"
    },
    {
        title: "Cloud Services (AWS, Azure, GCP)",
        description: "Migration, modernization and managed reliability with security baked in.",
        image: "https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/handshake"
    },
    {
        title: "Custom Software Development",
        description: "Web, mobile and SaaS products tailored to your workflows and goals.",
        image: "https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/zwsr959ygnleqr82zcop"
    },
    {
        title: "DevOps & SRE",
        description: "CI/CD, IaC, Kubernetes and observability to ship fast with confidence.",
        image: "https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/kec7qkyxrxnfrwxf5bl6"
    },
    {
        title: "Data Analytics & BI",
        description: "Warehousing, ETL/ELT and dashboards that turn data into decisions.",
        image: "https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/zwsr959ygnleqr82zcop"
    },
    {
        title: "Automation & Integrations",
        description: "RPA and third-party integrations that eliminate busywork.",
        image: "https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/kec7qkyxrxnfrwxf5bl6"
    },
]

export default function TransformBussiness() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container medium w-container">
                    <div className="features-cards-wrapper">
                        <AnimatedInViewDiv className="header">
                            <h2 className="heading-4 text-weight-bold">
                                What We Do
                            </h2>
                            {/* <div className="opacity-60">
                                <div className="max-width-46ch">
                                    <div className="text-size-regular">
                                        {services[0].description}
                                    </div>
                                </div>
                            </div> */}
                        </AnimatedInViewDiv>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <AnimatedInViewDiv key={index} className="integrations-block" delay={index * 0.1}>
                                    <div className="integrations-image">
                                        <img
                                            sizes="(max-width: 479px) 93vw, (max-width: 767px) 95vw, (max-width: 991px) 92vw, 30vw"
                                            alt={`${service.title} - StackBinary services`}
                                            src={service.image}
                                            loading="lazy" />
                                    </div>
                                    <div className="integrations-content">
                                        <Link href="/services" className="text-size-large text-link hover:text-primary transition-colors">
                                            {service.title}
                                        </Link>
                                        <div className="opacity-70">
                                            <div className="max-width-50ch">
                                                <div className="text-size-regular">
                                                    {service.description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedInViewDiv>
                            ))}
                        </div>
                        <AnimatedInViewDiv>
                            <LearnMoreButton title='See All Services' />
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    )
}