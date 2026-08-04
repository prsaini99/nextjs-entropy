"use client";

import Link from "next/link";
import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import { GetStarted, LearnMoreButton } from "@/components/Buttons";

export default function IndustryDetail({ industry }) {
    return (
        <>
            <section>
                <div className="padding-global">
                    <div className="w-layout-blockcontainer container w-container">
                        <div className="hero-wrapper">
                            <AnimatedInViewDiv className="hero-component">
                                <div className="read-more-tag w-inline-block">
                                    <div className="text-size-small text-weight-bold text-[#E0362C]">
                                        Industry · {industry.name}
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-10">
                                    <h1 className="heading-3 text-weight-bold max-w-5xl">
                                        {industry.name}
                                    </h1>
                                    <div className="max-w-4xl">
                                        <p className="opacity-80">{industry.blurb}</p>
                                    </div>
                                </div>
                            </AnimatedInViewDiv>

                            <AnimatedInViewDiv
                                className="double-button-component margin-top-button-hero"
                                delay={0.2}
                            >
                                <GetStarted />
                                <LearnMoreButton title="All Industries" routeTo="/industries" />
                            </AnimatedInViewDiv>

                            <AnimatedInViewDiv delay={0.3} className="w-full">
                                <div className="flex flex-col items-center gap-4 mt-12">
                                    <div className="text-size-small text-weight-bold uppercase tracking-widest opacity-40">
                                        Brands we&apos;ve worked with
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 max-w-4xl">
                                        {industry.brands.map((brand) => (
                                            <span
                                                key={brand}
                                                className="text-size-medium text-weight-medium opacity-70 hover:opacity-100 hover:text-[#E0362C] transition-all duration-300 whitespace-nowrap"
                                            >
                                                {brand}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </AnimatedInViewDiv>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="padding-global py-16">
                    <div className="w-layout-blockcontainer container w-container">
                        <div className="about-features-wrapper">
                            <AnimatedInViewDiv className="about-features-header">
                                <div className="header">
                                    <h2 className="heading-4 text-weight-medium">
                                        The Problems We Solve Here
                                    </h2>
                                </div>
                            </AnimatedInViewDiv>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
                                {industry.pains.map((pain, i) => (
                                    <AnimatedInViewDiv
                                        key={pain.title}
                                        delay={i * 0.08}
                                        className="border border-[#E0362C]/25 rounded-lg p-6 bg-[#E0362C]/[0.04] flex flex-col gap-2"
                                    >
                                        <div className="text-weight-medium">{pain.title}</div>
                                        <p className="text-size-small opacity-80">{pain.detail}</p>
                                    </AnimatedInViewDiv>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="padding-global py-16">
                    <div className="w-layout-blockcontainer container w-container">
                        <div className="about-features-wrapper">
                            <AnimatedInViewDiv className="about-features-header">
                                <div className="header">
                                    <h2 className="heading-4 text-weight-medium">
                                        What We&apos;ve Built — and How It Helps
                                    </h2>
                                    <div className="opacity-80">
                                        <div className="max-w-4xl">
                                            <p>
                                                Shipped products, not concepts. See the numbers in
                                                our{" "}
                                                <Link href="/case-studies" className="text-link">
                                                    case studies
                                                </Link>
                                                .
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedInViewDiv>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                                {industry.built.map((product, i) => (
                                    <AnimatedInViewDiv
                                        key={product.name}
                                        delay={i * 0.08}
                                        className="border border-gray-200 rounded-lg p-8 bg-[#F7F7F5] hover:border-[#E0362C]/60 transition-colors duration-300 flex flex-col gap-3"
                                    >
                                        <div className="text-size-small text-weight-bold text-[#E0362C] uppercase tracking-wider">
                                            {product.tag}
                                        </div>
                                        <h3 className="text-size-large text-weight-medium">
                                            {product.name}
                                        </h3>
                                        <p className="text-size-small opacity-80">
                                            {product.detail}
                                        </p>
                                        <p className="text-size-small opacity-80 border-l-2 border-[#E0362C]/60 pl-3 mt-auto">
                                            {product.helps}
                                        </p>
                                    </AnimatedInViewDiv>
                                ))}
                            </div>

                            {industry.martechLink && (
                                <AnimatedInViewDiv className="w-full border border-gray-200 rounded-lg p-8 bg-[#F7F7F5] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                    <div className="flex flex-col gap-1">
                                        <div className="text-weight-medium">
                                            Marketing technology is a dedicated practice
                                        </div>
                                        <p className="text-size-small opacity-80">
                                            Ad-ops AI, marketing automation, influencer platforms,
                                            lead-gen engines and creative analysis — with live demos.
                                        </p>
                                    </div>
                                    <LearnMoreButton
                                        title="Explore AI Marketing & MarTech"
                                        routeTo="/martech"
                                    />
                                </AnimatedInViewDiv>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
