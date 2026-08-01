"use client";

import Link from "next/link";
import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import { GetStarted, LearnMoreButton } from "@/components/Buttons";
import industries from "@/data/industries";

export default function IndustriesHub() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="hero-wrapper">
                        <AnimatedInViewDiv className="hero-component">
                            <div className="read-more-tag w-inline-block">
                                <div className="text-size-small text-weight-bold text-[#ed5145]">
                                    8 Industries · 55+ Products · 3 Continents
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-10">
                                <h1 className="heading-3 text-weight-bold max-w-5xl">
                                    Every Industry Has Its Hard Problems. We&apos;ve Shipped
                                    Through Them.
                                </h1>
                                <div className="max-w-4xl">
                                    <p className="opacity-60">
                                        From HIPAA-compliant healthcare AI to high-concurrency
                                        ticketing, IoT cattle monitoring to $100M+ commerce — pick
                                        your industry and see exactly what we&apos;ve built for
                                        companies like yours.
                                    </p>
                                </div>
                            </div>
                        </AnimatedInViewDiv>

                        <AnimatedInViewDiv
                            className="double-button-component margin-top-button-hero"
                            delay={0.2}
                        >
                            <GetStarted />
                            <LearnMoreButton title="See All Case Studies" routeTo="/case-studies" />
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>

            <div className="padding-global py-16">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {Object.entries(industries).map(([slug, industry], i) => (
                            <AnimatedInViewDiv key={slug} delay={Math.min(i * 0.08, 0.4)}>
                                <Link
                                    href={`/industries/${slug}`}
                                    className="border border-black/10 rounded-lg p-8 bg-white/[0.03] hover:border-[#ed5145]/60 transition-colors duration-300 flex flex-col gap-3 h-full group"
                                >
                                    <h2 className="text-size-large text-weight-medium">
                                        {industry.name}
                                    </h2>
                                    <p className="text-size-small opacity-60">{industry.blurb}</p>
                                    <p className="text-size-small opacity-40">
                                        {industry.brands.slice(0, 5).join(" · ")}
                                        {industry.brands.length > 5 ? " · …" : ""}
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-black/10 flex items-center justify-between text-size-small">
                                        <span className="opacity-50">
                                            {industry.built.length} shipped products
                                        </span>
                                        <span className="text-[#ed5145] text-weight-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                            Explore →
                                        </span>
                                    </div>
                                </Link>
                            </AnimatedInViewDiv>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
