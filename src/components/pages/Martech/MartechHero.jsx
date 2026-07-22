"use client";

import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import MartechLeadForm from "./MartechLeadForm";

const stats = [
    { value: "91", label: "tools in the average enterprise marketing stack" },
    { value: "49%", label: "of licensed martech features actually get used" },
    { value: "1 in 4", label: "new martech capabilities are now built, not bought" },
    { value: "15,000+", label: "SaaS tools in the martech landscape — and churning" },
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
                                        MarTech Engineering
                                    </div>
                                    <div className="vertical-line-tag"></div>
                                    <div className="text-size-small opacity-50">
                                        Build. Own. Compound.
                                    </div>
                                </div>
                                <h1 className="heading-2 text-weight-bold">
                                    Own Your Marketing Stack. Stop Renting It.
                                </h1>
                                <p className="opacity-60">
                                    Most agencies configure off-the-shelf SaaS. We are the
                                    martech engineering firm — we design and build the ad-ops
                                    automation, marketing automation, influencer platforms,
                                    lead-gen engines and AI creative analysis you own outright.
                                    One system built for how you market, instead of ten
                                    subscriptions built for everyone else.
                                </p>
                                <ul className="flex flex-col gap-2">
                                    {[
                                        "Every service backed by a live product you can click today",
                                        "AI-accelerated builds: weeks to first release, not quarters",
                                        "Your data, your design, your IP — zero license creep",
                                    ].map((point) => (
                                        <li key={point} className="flex gap-3 text-size-small opacity-80">
                                            <span className="text-[#ed5145]">✓</span>
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
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px mt-16 rounded-lg overflow-hidden border border-white/10 bg-white/10">
                                {stats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="bg-black/90 p-6 lg:p-8 flex flex-col gap-2"
                                    >
                                        <div className="heading-4 text-weight-bold text-[#ed5145]">
                                            {stat.value}
                                        </div>
                                        <p className="text-size-small opacity-60">{stat.label}</p>
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
