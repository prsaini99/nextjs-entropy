"use client";

import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import MartechCTA from "./MartechCTA";

const steps = [
    {
        number: "01",
        title: "Stack Audit & Roadmap",
        description:
            "We map your current tools, spend and data flows, find the shelfware and integration debt, and identify what to keep, replace and build — sequenced by ROI.",
        duration: "Week 1–2",
    },
    {
        number: "02",
        title: "Design the System",
        description:
            "Architecture, data schema and UX for the platform that replaces the sprawl — designed around your actual campaign workflows, approvals and reporting.",
        duration: "Week 2–4",
    },
    {
        number: "03",
        title: "Build & Integrate",
        description:
            "AI-accelerated delivery in weekly increments: API integrations (Meta, Google, Instagram, email, CRM), automation, dashboards and admin — live in your environment.",
        duration: "Week 4–12",
    },
    {
        number: "04",
        title: "Run & Compound",
        description:
            "Managed retainer covering monitoring, API version upgrades and new capabilities — so you never need an in-house platform team to own your stack.",
        duration: "Ongoing",
    },
];

export default function MartechProcess() {
    return (
        <section id="martech-process">
            <div className="padding-global py-16">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="about-features-wrapper">
                        <AnimatedInViewDiv className="about-features-header">
                            <div className="header">
                                <h2 className="heading-4 text-weight-medium">
                                    From Tool Sprawl to Owned Stack in 90 Days
                                </h2>
                                <div className="opacity-60">
                                    <div className="max-w-4xl">
                                        <p>
                                            &ldquo;Building takes too long&rdquo; was true in 2020.
                                            AI-accelerated engineering compressed the timeline — and
                                            the managed retainer answers &ldquo;who maintains
                                            it?&rdquo;
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedInViewDiv>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
                            {steps.map((step, index) => (
                                <AnimatedInViewDiv
                                    key={step.number}
                                    delay={index * 0.1}
                                    className="border border-white/10 rounded-lg p-8 bg-white/[0.03] flex flex-col gap-3"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="heading-5 text-weight-bold text-[#ed5145]">
                                            {step.number}
                                        </div>
                                        <div className="text-size-small opacity-40">
                                            {step.duration}
                                        </div>
                                    </div>
                                    <h3 className="text-weight-medium">{step.title}</h3>
                                    <p className="text-size-small opacity-60">
                                        {step.description}
                                    </p>
                                </AnimatedInViewDiv>
                            ))}
                        </div>

                        <AnimatedInViewDiv className="double-button-component margin-top-button-features">
                            <MartechCTA title="Start My 90-Day Plan" />
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    );
}
