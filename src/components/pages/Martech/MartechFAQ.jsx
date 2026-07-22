"use client";

import { useState } from "react";
import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import MartechCTA from "./MartechCTA";

const faqs = [
    {
        question: "Why build custom martech instead of buying SaaS?",
        answer: "The average enterprise marketing stack has 91 tools and only 49% feature utilization — you pay for sprawl you don't use, in schemas you don't own. Building makes sense when a workflow is core to how you win: ad-ops at scale, proprietary lead-gen data, creator relationships, creative scoring. One in four new martech capabilities are now built rather than bought. We help you decide which quarter that should be for you — sometimes the honest answer is 'keep the SaaS.'",
    },
    {
        question: "How long does a custom martech platform take?",
        answer: "A focused first release — one workflow, fully integrated — typically ships in 6–12 weeks. Our stack audit in week one sequences the roadmap by ROI so you see value from the first increment, not after a year-long replatform.",
    },
    {
        question: "Who maintains it after launch? We don't have a platform team.",
        answer: "We do, on a managed retainer: monitoring, third-party API version upgrades (Meta and Google change theirs constantly), security patches and new capabilities. You own the code and the data either way — the retainer is optional, not lock-in.",
    },
    {
        question: "What is TRIBE v2 creative analysis, exactly?",
        answer: "A neural pre-testing lab. We run your video ads through a tri-modal brain-encoding model that predicts human cortical attention second by second, then distill it into five indices — Hook Strength, Attention Retention, Value Resonance, CTA Readiness and a Composite Score — each tagged with its confidence level. You rank a batch of creatives before spending on media, then we calibrate the scores against your real CTR and ROAS so they become predictive for your account.",
    },
    {
        question: "Can you integrate with our existing CRM and ad accounts?",
        answer: "Yes — that's most of the work. We've shipped production integrations with the Meta Graph API, Instagram Graph API, Google APIs, Stripe, Razorpay, HubSpot-style CRMs, Google Sheets, Zoom, and warehouse destinations. Custom martech that doesn't talk to your CRM is just another silo; the CRM stays the gravitational center.",
    },
    {
        question: "What does this cost compared to our current SaaS spend?",
        answer: "A typical mid-market stack runs $50k–$250k a year in licenses, roughly half of it shelfware. A custom build is a one-time engineering investment plus modest infrastructure and an optional retainer — usually crossing break-even against license spend within 12–24 months, with the asset and the data compounding after that. The stack audit gives you the actual numbers for your case before you commit.",
    },
];

export default function MartechFAQ() {
    const [open, setOpen] = useState(0);

    return (
        <section id="martech-faq">
            <div className="padding-global py-16">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="about-features-wrapper">
                        <AnimatedInViewDiv className="about-features-header">
                            <div className="header">
                                <h2 className="heading-4 text-weight-medium">
                                    Questions Marketing Leaders Ask Us
                                </h2>
                            </div>
                        </AnimatedInViewDiv>

                        <div className="w-full max-w-4xl mx-auto flex flex-col gap-3">
                            {faqs.map((faq, index) => (
                                <AnimatedInViewDiv
                                    key={faq.question}
                                    delay={index * 0.05}
                                    className="border border-white/10 rounded-lg bg-white/[0.02] overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpen(open === index ? -1 : index)}
                                        className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors"
                                        aria-expanded={open === index}
                                    >
                                        <span className="text-weight-medium">{faq.question}</span>
                                        <span
                                            className={`text-[#ed5145] text-xl transition-transform duration-300 ${
                                                open === index ? "rotate-45" : ""
                                            }`}
                                        >
                                            +
                                        </span>
                                    </button>
                                    {open === index && (
                                        <div className="px-6 pb-6 text-size-small opacity-60">
                                            {faq.answer}
                                        </div>
                                    )}
                                </AnimatedInViewDiv>
                            ))}
                        </div>

                        <AnimatedInViewDiv className="double-button-component margin-top-button-features">
                            <MartechCTA title="Still Have Questions? Talk to Us" />
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    );
}
