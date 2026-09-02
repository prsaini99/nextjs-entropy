"use client";

import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import MartechLeadForm from "./MartechLeadForm";

const stats = [
    { value: "91", label: "tools in the average enterprise marketing stack" },
    { value: "49%", label: "of licensed martech features actually get used" },
    { value: "1 in 4", label: "new martech capabilities are now built, not bought" },
    { value: "4", label: "AI products we built and run. Click any of them below." },
];

export default function MartechHero() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="hero-wrapper">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full pt-6">
                            <AnimatedInViewDiv className="flex flex-col gap-8 text-left items-start">
                                <div className="read-more-tag w-inline-block">
                                    <div className="text-size-small text-weight-bold">
                                        AI Marketing Agency
                                    </div>
                                    <div className="vertical-line-tag"></div>
                                    <div className="text-size-small opacity-70">
                                        Built in weeks. Owned forever.
                                    </div>
                                </div>
                                <h1 className="heading-2 text-weight-bold">
                                    Most Marketing Agencies Use AI Tools. We Build Them.
                                </h1>
                                <p className="opacity-80">
                                    Marketing automation, influencer platforms, AI calling
                                    agents and lead engines, built for how you market. Live in
                                    2-3 weeks, and yours outright. Often for less than a year of
                                    the licence they replace. And because we run campaigns on
                                    them ourselves, they are built by people who have to use
                                    them on Monday.
                                </p>
                                <ul className="flex flex-col gap-2">
                                    {[
                                        // Speed first (capability), cost second (proof, stated
                                        // comparatively), ownership third (the payoff).
                                        "A single project live in 2-3 weeks, not a quarter",
                                        "Often less than a year of the licence it replaces",
                                        "Every service backed by a live product you can click today",
                                        "Your data, your design, your IP. Zero licence creep.",
                                    ].map((point) => (
                                        <li key={point} className="flex gap-3 text-size-small opacity-80">
                                            <span className="text-[#E0362C]">✓</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </AnimatedInViewDiv>

                            <AnimatedInViewDiv delay={0.2} className="w-full">
                                <MartechLeadForm />
                            </AnimatedInViewDiv>
                        </div>

                        <AnimatedInViewDiv delay={0.4} className="w-full">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px mt-16 rounded-lg overflow-hidden border border-[#17171A]/10 bg-[#17171A]/10">
                                {stats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="bg-white p-6 lg:p-8 flex flex-col gap-2"
                                    >
                                        <div className="heading-4 text-weight-bold text-[#E0362C]">
                                            {stat.value}
                                        </div>
                                        <p className="text-size-small opacity-80">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-size-small opacity-40 mt-3 text-center">
                                Sources: Gartner Marketing Technology Survey 2025 · MarTech State
                                of the Stack 2025 · chiefmartec Landscape 2025
                            </p>
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    );
}
