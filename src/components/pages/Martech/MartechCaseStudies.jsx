"use client";

import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import { LearnMoreButton } from "@/components/Buttons";
import MartechCTA from "./MartechCTA";

const caseStudies = [
    {
        brand: "StarStruck by Sunny Leone",
        category: "Celebrity Beauty",
        summary:
            "End-to-end social media and performance marketing — influencer strategy, UGC campaigns and data-driven ad optimization across Meta and Google.",
        metrics: [
            { value: "292%", label: "Follower growth" },
            { value: "3.8x", label: "ROAS" },
            { value: "8.5%", label: "Engagement rate" },
        ],
    },
    {
        brand: "Bioderma India",
        category: "Dermo-Cosmetics",
        summary:
            "Dermatologist-backed education content plus targeted programmatic advertising, establishing Bioderma as a trusted skincare authority in India.",
        metrics: [
            { value: "8.5M", label: "Impressions" },
            { value: "+45%", label: "Brand recall" },
            { value: "3.2x", label: "Website traffic" },
        ],
    },
    {
        brand: "Sugar Cosmetics",
        category: "Beauty D2C",
        summary:
            "Scalable content production and performance marketing optimization — more creative output, at lower cost, with cheaper reach.",
        metrics: [
            { value: "3x", label: "Ad creative output" },
            { value: "-40%", label: "Content production cost" },
            { value: "-28%", label: "CPM" },
        ],
    },
    {
        brand: "Shiseido India",
        category: "Luxury Beauty",
        summary:
            "Premium positioning and Japanese-heritage storytelling with exclusive influencer partnerships for high-net-worth audiences.",
        metrics: [
            { value: "+65%", label: "Brand awareness" },
            { value: "2.1M", label: "Premium audience reach" },
            { value: "6.2%", label: "Engagement rate" },
        ],
    },
    {
        brand: "The Ordinary",
        category: "Skincare",
        summary:
            "Science-backed, ingredient-education marketing and community building that converts curiosity into loyalty.",
        metrics: [
            { value: "180%", label: "Community growth" },
            { value: "12%", label: "Content engagement" },
            { value: "4.8%", label: "Conversion rate" },
        ],
    },
    {
        brand: "Steve Madden",
        category: "Fashion E-Commerce",
        summary:
            "Global omnichannel commerce platform — unified web and app with multi-currency checkout across 50+ international markets.",
        metrics: [
            { value: "$100M+", label: "Online sales" },
            { value: "2M+", label: "App downloads" },
            { value: "+65%", label: "Mobile conversion" },
        ],
    },
];

export default function MartechCaseStudies() {
    return (
        <section id="martech-case-studies">
            <div className="padding-global py-16">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="about-features-wrapper">
                        <AnimatedInViewDiv className="about-features-header">
                            <div className="header">
                                <h2 className="heading-4 text-weight-medium">
                                    Marketing Results We&apos;ve Actually Delivered
                                </h2>
                                <div className="opacity-60">
                                    <div className="max-w-4xl">
                                        <p>
                                            We build martech because we run marketing. These are
                                            real campaigns and platforms — from celebrity beauty
                                            brands to global fashion retailers.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedInViewDiv>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                            {caseStudies.map((cs, index) => (
                                <AnimatedInViewDiv
                                    key={cs.brand}
                                    delay={index * 0.08}
                                    className="border border-white/10 rounded-lg p-8 bg-white/[0.03] hover:border-[#ed5145]/60 transition-colors duration-300 flex flex-col gap-4"
                                >
                                    <div className="text-size-small text-weight-bold text-[#ed5145] uppercase tracking-wider">
                                        {cs.category}
                                    </div>
                                    <h3 className="text-size-large text-weight-medium">
                                        {cs.brand}
                                    </h3>
                                    <p className="text-size-small opacity-60">{cs.summary}</p>
                                    <div className="grid grid-cols-3 gap-3 mt-auto pt-4 border-t border-white/10">
                                        {cs.metrics.map((metric) => (
                                            <div key={metric.label}>
                                                <div className="text-size-large text-weight-bold text-[#ed5145]">
                                                    {metric.value}
                                                </div>
                                                <div className="text-size-small opacity-50">
                                                    {metric.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </AnimatedInViewDiv>
                            ))}
                        </div>

                        <AnimatedInViewDiv className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 border border-white/10 rounded-lg p-8 bg-white/[0.02]">
                            <div className="flex flex-col gap-1">
                                <div className="text-weight-medium">
                                    31 more case studies across healthcare, fintech, e-commerce and AI
                                </div>
                                <p className="text-size-small opacity-60">
                                    Every one shipped, every number from the work.
                                </p>
                            </div>
                            <div className="double-button-component">
                                <MartechCTA />
                                <LearnMoreButton
                                    title="Explore All 37 Case Studies"
                                    routeTo="/case-studies"
                                />
                            </div>
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    );
}
