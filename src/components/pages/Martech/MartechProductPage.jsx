"use client";

import Link from "next/link";
import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import { LearnMoreButton } from "@/components/Buttons";
import MartechCTA from "./MartechCTA";

export default function MartechProductPage({ page, afterHero = null }) {
    return (
        <>
            <section>
                <div className="padding-global">
                    <div className="w-layout-blockcontainer container w-container">
                        <div className="hero-wrapper">
                            <AnimatedInViewDiv className="hero-component">
                                <div className="read-more-tag w-inline-block">
                                    <div className="text-size-small text-weight-bold text-[#ed5145]">
                                        {page.badge}
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-10">
                                    <h1 className="heading-3 text-weight-bold max-w-5xl">
                                        {page.title}
                                    </h1>
                                    <div className="max-w-4xl">
                                        <p className="opacity-60">{page.tagline}</p>
                                    </div>
                                </div>
                            </AnimatedInViewDiv>

                            <AnimatedInViewDiv
                                className="double-button-component margin-top-button-hero"
                                delay={0.2}
                            >
                                <MartechCTA />
                                <LearnMoreButton title="All MarTech Services" routeTo="/martech" />
                            </AnimatedInViewDiv>

                            {page.heroStats && (
                                <AnimatedInViewDiv delay={0.4} className="w-full">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px mt-16 rounded-lg overflow-hidden border border-white/10 bg-white/10">
                                        {page.heroStats.map((stat) => (
                                            <div
                                                key={stat.label}
                                                className="bg-black/90 p-6 lg:p-8 flex flex-col gap-2"
                                            >
                                                <div className="heading-4 text-weight-bold text-[#ed5145]">
                                                    {stat.value}
                                                </div>
                                                <p className="text-size-small opacity-60">
                                                    {stat.label}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </AnimatedInViewDiv>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {afterHero}

            {page.embed && (
                <section>
                    <div className="padding-global py-16">
                        <div className="w-layout-blockcontainer container w-container">
                            <div className="about-features-wrapper">
                                <AnimatedInViewDiv className="about-features-header">
                                    <div className="header">
                                        <div className="text-size-small text-weight-bold text-[#ed5145] uppercase tracking-wider mb-4">
                                            Live Product · No Mockups
                                        </div>
                                        <h2 className="heading-4 text-weight-medium">
                                            Try It Right Here
                                        </h2>
                                        <div className="opacity-60">
                                            <div className="max-w-4xl">
                                                <p>{page.embed.note}</p>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedInViewDiv>

                                <AnimatedInViewDiv className="w-full">
                                    <div className="border border-white/15 rounded-lg overflow-hidden bg-black">
                                        <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-white/10 bg-white/[0.03]">
                                            <div className="flex items-center gap-2">
                                                <span className="w-3 h-3 rounded-full bg-[#ed5145]/70"></span>
                                                <span className="w-3 h-3 rounded-full bg-white/20"></span>
                                                <span className="w-3 h-3 rounded-full bg-white/20"></span>
                                                <span className="text-size-small opacity-50 ml-3">
                                                    {page.embed.title}
                                                </span>
                                            </div>
                                            <a
                                                href={page.embed.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-size-small text-weight-bold text-[#ed5145] hover:opacity-80 transition-opacity whitespace-nowrap"
                                            >
                                                Open full-screen ↗
                                            </a>
                                        </div>
                                        <iframe
                                            src={page.embed.url}
                                            title={page.embed.title}
                                            loading="lazy"
                                            className="w-full h-[70vh] min-h-[480px] bg-white"
                                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                        />
                                    </div>
                                </AnimatedInViewDiv>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {page.features && (
                <section>
                    <div className="padding-global py-16">
                        <div className="w-layout-blockcontainer container w-container">
                            <div className="about-features-wrapper">
                                <AnimatedInViewDiv className="about-features-header">
                                    <div className="header">
                                        <h2 className="heading-4 text-weight-medium">
                                            What&apos;s Inside
                                        </h2>
                                    </div>
                                </AnimatedInViewDiv>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                                    {page.features.map((feature, index) => (
                                        <AnimatedInViewDiv
                                            key={feature.title}
                                            delay={index * 0.08}
                                            className="border border-white/10 rounded-lg p-8 bg-white/[0.03] hover:border-[#ed5145]/60 transition-colors duration-300 flex flex-col gap-3"
                                        >
                                            <h3 className="text-size-large text-weight-medium">
                                                {feature.title}
                                            </h3>
                                            <p className="text-size-small opacity-60">
                                                {feature.description}
                                            </p>
                                        </AnimatedInViewDiv>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {page.howItWorks && (
                <section>
                    <div className="padding-global py-16">
                        <div className="w-layout-blockcontainer container w-container">
                            <div className="about-features-wrapper">
                                <AnimatedInViewDiv className="about-features-header">
                                    <div className="header">
                                        <h2 className="heading-4 text-weight-medium">
                                            How It Works
                                        </h2>
                                    </div>
                                </AnimatedInViewDiv>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
                                    {page.howItWorks.map((step, index) => (
                                        <AnimatedInViewDiv
                                            key={step.title}
                                            delay={index * 0.1}
                                            className="border border-white/10 rounded-lg p-8 bg-white/[0.03] flex flex-col gap-3"
                                        >
                                            <div className="heading-5 text-weight-bold text-[#ed5145]">
                                                {String(index + 1).padStart(2, "0")}
                                            </div>
                                            <h3 className="text-weight-medium">{step.title}</h3>
                                            <p className="text-size-small opacity-60">
                                                {step.description}
                                            </p>
                                        </AnimatedInViewDiv>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {page.proof && (
                <section>
                    <div className="padding-global py-16">
                        <div className="w-layout-blockcontainer container w-container">
                            <AnimatedInViewDiv className="border border-[#ed5145]/30 rounded-lg p-8 lg:p-12 bg-[#ed5145]/[0.04]">
                                <h2 className="heading-6 text-weight-medium mb-6">
                                    {page.proof.heading}
                                </h2>
                                <ul className="flex flex-col gap-3">
                                    {page.proof.items.map((item) => (
                                        <li key={item} className="flex gap-3 opacity-80">
                                            <span className="text-[#ed5145]">✓</span>
                                            <span className="text-size-small">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                {page.demo && (
                                    <div className="mt-8">
                                        {page.demo.external ? (
                                            <a
                                                href={page.demo.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-link text-weight-bold"
                                            >
                                                {page.demo.label} →
                                            </a>
                                        ) : (
                                            <Link
                                                href={page.demo.href}
                                                className="text-link text-weight-bold"
                                            >
                                                {page.demo.label} →
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </AnimatedInViewDiv>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
