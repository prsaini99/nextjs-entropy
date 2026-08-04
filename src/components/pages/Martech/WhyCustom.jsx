"use client";

import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import MartechCTA from "./MartechCTA";

const rows = [
    {
        dimension: "Cost curve",
        saas: "Per-seat and per-contact pricing that scales with your headcount and list size, not your results.",
        custom: "Build once, own forever. Costs scale with infrastructure, which is a fraction of license creep.",
    },
    {
        dimension: "Fit",
        saas: "You adapt your workflow to the tool. Half the features go unused; the one you need is on the roadmap.",
        custom: "The system is shaped around how your team actually markets. Nothing more, nothing less.",
    },
    {
        dimension: "Data",
        saas: "First-party data fragmented across 91 tools in vendors' schemas, exported through rate-limited APIs.",
        custom: "One schema, your warehouse, your moat. AI, attribution and personalization draw from a single source.",
    },
    {
        dimension: "AI",
        saas: "AI features bolted onto decade-old SaaS, priced as add-ons.",
        custom: "AI-native from day one, with agents, creative intelligence and scoring designed into the core.",
    },
    {
        dimension: "Longevity",
        saas: "Tools get acquired, repriced or sunset every year. Your workflow dies with the vendor.",
        custom: "Owned software doesn't get sunset, acquired or repriced. It compounds.",
    },
];

export default function WhyCustom() {
    return (
        <section id="why-custom">
            <div className="padding-global py-16">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="about-features-wrapper">
                        <AnimatedInViewDiv className="about-features-header">
                            <div className="header">
                                <h2 className="heading-4 text-weight-medium">
                                    Rented SaaS vs. Owned Infrastructure
                                </h2>
                                <div className="opacity-60">
                                    <div className="max-w-4xl">
                                        <p>
                                            One in four new martech capabilities are now built
                                            in-house rather than bought, because AI-accelerated
                                            engineering changed the build-vs-buy math. Here is the
                                            trade you are actually making.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedInViewDiv>

                        <div className="w-full overflow-hidden rounded-lg border border-gray-200">
                            <div className="grid grid-cols-3 bg-gray-100 text-weight-bold">
                                <div className="p-5 text-size-small uppercase tracking-wider opacity-60"></div>
                                <div className="p-5 text-size-small uppercase tracking-wider opacity-60">
                                    Off-the-shelf stack
                                </div>
                                <div className="p-5 text-size-small uppercase tracking-wider text-[#E0362C]">
                                    Built with StackBinary
                                </div>
                            </div>
                            {rows.map((row, i) => (
                                <AnimatedInViewDiv
                                    key={row.dimension}
                                    delay={i * 0.06}
                                    className="grid grid-cols-3 border-t border-gray-200"
                                >
                                    <div className="p-5 text-weight-medium text-size-small">
                                        {row.dimension}
                                    </div>
                                    <div className="p-5 text-size-small opacity-50">{row.saas}</div>
                                    <div className="p-5 text-size-small opacity-90 bg-[#E0362C]/[0.05]">
                                        {row.custom}
                                    </div>
                                </AnimatedInViewDiv>
                            ))}
                        </div>

                        <AnimatedInViewDiv className="double-button-component margin-top-button-features">
                            <MartechCTA title="Audit My Stack, Free" location="why-custom" />
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    );
}
