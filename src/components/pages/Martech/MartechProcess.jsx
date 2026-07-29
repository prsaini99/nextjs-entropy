"use client";

import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import MartechCTA from "./MartechCTA";

// Timings describe ONE project — the common case, and the thing that makes the
// speed claim concrete. A full stack is several of these run in sequence, which
// the intro copy says explicitly so nobody expects a whole stack in a fortnight.
const steps = [
    {
        number: "01",
        title: "Stack Audit & Roadmap",
        description:
            "We map your current tools, spend and data flows, find the shelfware and integration debt, and identify what to keep, replace and build, sequenced by ROI.",
        duration: "Days 1–3",
    },
    {
        number: "02",
        title: "Design the System",
        description:
            "Architecture, data schema and UX for the system that replaces the sprawl, designed around your actual campaign workflows, approvals and reporting.",
        duration: "Days 3–7",
    },
    {
        number: "03",
        title: "Build & Integrate",
        description:
            "AI-accelerated delivery: API integrations (Meta, Google, Instagram, email, CRM), automation, dashboards and admin, live in your environment and reviewed by senior engineers.",
        duration: "Week 2–3",
    },
    {
        number: "04",
        title: "Run & Compound",
        description:
            "Managed retainer covering monitoring, API version upgrades and new capabilities, so you never need an in-house platform team to own your stack.",
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
                                    From Tool Sprawl to Owned Stack in Weeks, Not Quarters
                                </h2>
                                <div className="opacity-60">
                                    <div className="max-w-4xl">
                                        <p>
                                            &ldquo;Building takes too long&rdquo; was true in 2020.
                                            AI-accelerated engineering collapsed the timeline: a
                                            single project runs this path in 2–3 weeks. Replacing a
                                            whole stack is several projects in sequence. Still
                                            weeks, and you are using the first one while we build
                                            the next. The managed retainer answers &ldquo;who
                                            maintains it?&rdquo;
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
                            <MartechCTA title="Start My Build" location="process" />
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    );
}
