"use client";

import Link from "next/link";
import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import { GetStarted, LearnMoreButton } from "@/components/Buttons";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

export default function IndustryDetail({ industry }) {
    // Optional live-demo link, set per industry in data/industries.js. Added
    // 2026-08-17 for solar: in that market seeing a real rendered proposal is
    // the argument, so the demo takes the hero's second slot and gets its own
    // band. Industries without a `demo` keep the original catalog link.
    const demo = industry.demo;
    const trackDemo = (location) =>
        trackEvent(ANALYTICS_EVENTS.DEMO_OPEN, {
            demo_label: demo?.label,
            demo_destination: demo?.href,
            demo_location: location,
            industry: industry.name,
        });

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
                                {demo ? (
                                    <a
                                        href={demo.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackDemo("hero")}
                                        className="secondary-button w-inline-block"
                                    >
                                        <span>▶ {demo.label}</span>
                                    </a>
                                ) : (
                                    <LearnMoreButton title="All Industries" routeTo="/industries" />
                                )}
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

            <section className="ink-section">
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

            {/* Live demo band. Sits between the problems and the product grid:
                the visitor has just read what is broken, and the strongest next
                move is showing them a finished proposal rather than describing
                one. */}
            {demo && (
                <section>
                    <div className="padding-global py-8">
                        <div className="w-layout-blockcontainer container w-container">
                            <AnimatedInViewDiv className="border border-[#E0362C]/30 rounded-lg p-8 lg:p-10 bg-[#E0362C]/[0.05] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                                <div className="flex flex-col gap-2 max-w-2xl">
                                    <div className="text-size-small text-weight-bold text-[#E0362C] uppercase tracking-wider">
                                        {demo.eyebrow || "Live Product · Try It Yourself"}
                                    </div>
                                    <h2 className="heading-6 text-weight-medium">
                                        {demo.heading || "See a real proposal, not a screenshot"}
                                    </h2>
                                    {demo.note && (
                                        <p className="text-size-small opacity-80">{demo.note}</p>
                                    )}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                                    {/* Sample first: it needs no sign-up, so it
                                        is the lower-friction proof and earns the
                                        primary treatment. */}
                                    {demo.sample && (
                                        <a
                                            href={demo.sample.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => trackDemo("demo-band-sample")}
                                            className="primary-button w-inline-block whitespace-nowrap text-center"
                                        >
                                            <div className="relative">
                                                <div className="text-size-small text-weight-bold">
                                                    ▶ {demo.sample.label}
                                                </div>
                                            </div>
                                            <div className="button-elipse"></div>
                                        </a>
                                    )}
                                    <a
                                        href={demo.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackDemo("demo-band")}
                                        className="secondary-button w-inline-block whitespace-nowrap text-center"
                                    >
                                        <span>{demo.label}</span>
                                    </a>
                                </div>
                            </AnimatedInViewDiv>

                            {demo.disclaimer && (
                                <AnimatedInViewDiv className="w-full">
                                    <p className="text-size-small opacity-60 mt-4">
                                        {demo.disclaimer}
                                    </p>
                                </AnimatedInViewDiv>
                            )}
                        </div>
                    </div>
                </section>
            )}

            <section className="ink-section">
                <div className="padding-global py-16">
                    <div className="w-layout-blockcontainer container w-container">
                        <div className="about-features-wrapper">
                            <AnimatedInViewDiv className="about-features-header">
                                <div className="header">
                                    <h2 className="heading-4 text-weight-medium">
                                        What We&apos;ve Built, and How It Helps
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
                                        className="border border-[#17171A]/10 rounded-lg p-8 bg-white hover:border-[#E0362C]/60 transition-colors duration-300 flex flex-col gap-3"
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
                                <AnimatedInViewDiv className="w-full border border-[#17171A]/10 rounded-lg p-8 bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                    <div className="flex flex-col gap-1">
                                        <div className="text-weight-medium">
                                            Marketing technology is a dedicated practice
                                        </div>
                                        <p className="text-size-small opacity-80">
                                            Ad-ops AI, marketing automation, influencer platforms,
                                            lead-gen engines and creative analysis, with live demos.
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
