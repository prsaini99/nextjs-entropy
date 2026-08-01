"use client";

import { useState } from "react";
import Link from "next/link";
import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import { LearnMoreButton } from "@/components/Buttons";
import MartechCTA from "./MartechCTA";
import caseStudies from "@/data/caseStudies";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

const categories = ["All", ...new Set(caseStudies.map((c) => c.category))];

// Internal links from each case-study category to the service that delivers it
const categoryService = {
    Beauty: { href: "/martech/influencer-marketing", label: "influencer marketing platform for agencies" },
    "Luxury Beauty": { href: "/martech/influencer-marketing", label: "influencer marketing platform for agencies" },
    Skincare: { href: "/martech/influencer-marketing", label: "influencer marketing platform for agencies" },
    "E-Commerce": { href: "/martech/shopify-websites", label: "Shopify & e-commerce development" },
    "AI/Technology": { href: "/martech/ai-integration", label: "AI ecosystem & MCP integration" },
    Healthcare: { href: "/services", label: "custom software development services" },
    FinTech: { href: "/services", label: "custom software development services" },
    Education: { href: "/services", label: "custom software development services" },
    Social: { href: "/services", label: "custom software development services" },
};

function CaseStudyCard({ cs }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border border-black/10 rounded-lg bg-white/[0.03] hover:border-[#ed5145]/60 transition-colors duration-300 flex flex-col">
            <div className="p-8 flex flex-col gap-3 flex-1">
                <div className="text-size-small text-weight-bold text-[#ed5145] uppercase tracking-wider">
                    {cs.category}
                </div>
                <h3 className="text-size-large text-weight-medium">{cs.title}</h3>
                <p className="text-size-small opacity-60">{cs.description}</p>

                {cs.metrics?.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 pt-3">
                        {cs.metrics.map((metric) => (
                            <div key={metric.label}>
                                <div className="text-size-large text-weight-bold text-[#ed5145]">
                                    {metric.value}
                                </div>
                                <div className="text-size-small opacity-50">{metric.label}</div>
                            </div>
                        ))}
                    </div>
                )}

                {cs.impact && (
                    <p className="text-size-small opacity-80 border-l-2 border-[#ed5145]/60 pl-3 mt-2">
                        {cs.impact}
                    </p>
                )}

                {categoryService[cs.category] && (
                    <p className="text-size-small opacity-50 mt-1">
                        Partnership work involving our{" "}
                        <Link
                            href={categoryService[cs.category].href}
                            className="text-link"
                        >
                            {categoryService[cs.category].label}
                        </Link>
                        .
                    </p>
                )}

                {open && (
                    <div className="flex flex-col gap-3 mt-2 pt-3 border-t border-black/10">
                        <div>
                            <div className="text-size-small text-weight-bold opacity-70 mb-1">
                                Challenge
                            </div>
                            <p className="text-size-small opacity-60">{cs.challenge}</p>
                        </div>
                        <div>
                            <div className="text-size-small text-weight-bold opacity-70 mb-1">
                                What we did
                            </div>
                            <p className="text-size-small opacity-60">{cs.solution}</p>
                        </div>
                        {cs.services?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {cs.services.map((service) => (
                                    <span
                                        key={service}
                                        className="text-size-small border border-black/15 rounded-full px-3 py-1 opacity-60"
                                    >
                                        {service}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <button
                onClick={() => {
                    if (!open) {
                        trackEvent(ANALYTICS_EVENTS.CASE_STUDY_OPEN, {
                            case_study: cs.title,
                            case_study_category: cs.category,
                        });
                    }
                    setOpen(!open);
                }}
                className="border-t border-black/10 px-8 py-4 text-size-small text-weight-bold flex items-center justify-between hover:bg-[#ed5145]/10 transition-colors text-left"
            >
                <span>{open ? "Show less" : "Challenge & solution"}</span>
                <span className={`text-[#ed5145] transition-transform duration-300 ${open ? "rotate-90" : ""}`}>
                    →
                </span>
            </button>
        </div>
    );
}

export default function CaseStudiesShowcase({ general = false }) {
    const [active, setActive] = useState("All");
    const filtered =
        active === "All"
            ? caseStudies
            : caseStudies.filter((c) => c.category === active);

    return (
        <section id="case-studies-showcase">
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="hero-wrapper">
                        <AnimatedInViewDiv className="hero-component">
                            <div className="read-more-tag w-inline-block">
                                <div className="text-size-small text-weight-bold text-[#ed5145]">
                                    Case Studies · {caseStudies.length} Shipped Products &amp; Campaigns
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-10">
                                <h1 className="heading-3 text-weight-bold max-w-5xl">
                                    Real Products. Real Campaigns. Real Numbers.
                                </h1>
                                <div className="max-w-4xl">
                                    <p className="opacity-60">
                                        From celebrity beauty campaigns to $100M+ commerce
                                        platforms, healthcare AI to fintech fraud detection.
                                        Every case study below shipped. Client work was
                                        delivered in partnership with brand and product teams,
                                        and the figures shown are the results those platforms
                                        and campaigns went on to produce.
                                    </p>
                                </div>
                            </div>
                        </AnimatedInViewDiv>

                        <AnimatedInViewDiv
                            className="double-button-component margin-top-button-hero"
                            delay={0.2}
                        >
                            <MartechCTA title="Start Your Project" location="case-studies-showcase" />
                            <LearnMoreButton
                                title={general ? "Industries We Serve" : "All MarTech Services"}
                                routeTo={general ? "/industries" : "/martech"}
                            />
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>

            <div className="padding-global py-16">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="flex flex-wrap gap-2 mb-10">
                        {categories.map((category) => {
                            const count =
                                category === "All"
                                    ? caseStudies.length
                                    : caseStudies.filter((c) => c.category === category).length;
                            return (
                                <button
                                    key={category}
                                    onClick={() => setActive(category)}
                                    aria-pressed={active === category}
                                    className={`rounded-full px-5 py-2.5 border text-size-small text-weight-bold transition-all duration-200 ${
                                        active === category
                                            ? "border-[#ed5145] bg-[#ed5145]/[0.1] text-[#ed5145]"
                                            : "border-black/15 bg-black/[0.02] hover:border-black/40"
                                    }`}
                                >
                                    {category}{" "}
                                    <span className="opacity-50">({count})</span>
                                </button>
                            );
                        })}
                    </div>

                    <div
                        key={active}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-slideUpFadeIn-0.5"
                    >
                        {filtered.map((cs) => (
                            <CaseStudyCard key={cs.id} cs={cs} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
