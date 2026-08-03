"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import { LearnMoreButton } from "@/components/Buttons";
import MartechCTA from "./MartechCTA";
import MartechFAQ from "./MartechFAQ";
import MartechProofStrip from "./MartechProofStrip";
import MartechLeadForm from "./MartechLeadForm";
import { linkAnchors, formServiceForSlug } from "@/data/martechPages";
import { trackEvent, trackScrollDepth, ANALYTICS_EVENTS } from "@/lib/analytics";

export default function MartechProductPage({ page, slug = "", afterHero = null }) {
    // Scroll depth. Reaching 75% of a product page is a genuine read-through
    // and one of the few engagement signals available on a page where the
    // visitor never clicks anything.
    const firedDepths = useRef(new Set());

    useEffect(() => {
        firedDepths.current = new Set();

        const onScroll = () => {
            const doc = document.documentElement;
            const scrollable = doc.scrollHeight - window.innerHeight;
            if (scrollable <= 0) return;

            const percent = Math.round((window.scrollY / scrollable) * 100);

            [50, 75, 90].forEach((mark) => {
                if (percent >= mark && !firedDepths.current.has(mark)) {
                    firedDepths.current.add(mark);
                    trackScrollDepth(mark);
                }
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [slug]);

    const trackDemoOpen = () =>
        trackEvent(ANALYTICS_EVENTS.DEMO_OPEN, {
            demo_label: page.demo?.label,
            demo_destination: page.demo?.href,
            demo_location: "product-page",
            page_slug: slug,
        });

    return (
        <>
            <section>
                <div className="padding-global">
                    <div className="w-layout-blockcontainer container w-container">
                        <div className="hero-wrapper">
                            <AnimatedInViewDiv className="hero-component">
                                {/* Was a plain div; 2 of 10 recorded paid visitors
                                    clicked it expecting something. Now it honestly
                                    goes where clickers want to end up. */}
                                <a
                                    href="#martech-lead-form"
                                    className="read-more-tag w-inline-block cursor-pointer"
                                >
                                    <div className="text-size-small text-weight-bold text-[#ed5145]">
                                        {page.badge}
                                    </div>
                                </a>
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
                                <MartechCTA
                                    title="Get My Build Quote"
                                    location={`product:${page.badge.split("·")[0].trim()}`}
                                />
                                {/* The second hero slot used to be "All MarTech
                                    Services" — a catalog link inviting paid visitors
                                    off the page they were bought onto. The live demo
                                    is the differentiator; it earns the slot. The
                                    catalog stays reachable via nav + related links. */}
                                {page.demo?.external ? (
                                    <a
                                        href={page.demo.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() =>
                                            trackEvent(ANALYTICS_EVENTS.DEMO_OPEN, {
                                                demo_label: page.demo.label,
                                                demo_destination: page.demo.href,
                                                demo_location: "hero",
                                                page_slug: slug,
                                            })
                                        }
                                        className="secondary-button w-inline-block"
                                    >
                                        <span>▶ {page.demo.label}</span>
                                    </a>
                                ) : (
                                    <LearnMoreButton title="All MarTech Services" routeTo="/martech" />
                                )}
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

            <MartechProofStrip />

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
                                                onClick={() =>
                                                    trackEvent(ANALYTICS_EVENTS.DEMO_INTERACT, {
                                                        demo_name: page.embed.title,
                                                        demo_action: "open_fullscreen",
                                                        page_slug: slug,
                                                    })
                                                }
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
                                            {page.featuresHeading || "What's Inside"}
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

                                {/* Mid-page CTA. Clarity: average paid scroll depth
                                    is 41%, which lands about here — and recordings
                                    showed 4-5 minute readers stalling with no action
                                    in reach. demo_location/cta location let Monday's
                                    review compare hero vs midpage placement. */}
                                {page.demo && (
                                    <AnimatedInViewDiv className="w-full mt-10 border border-[#ed5145]/30 rounded-lg bg-[#ed5145]/[0.05] p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <p className="text-size-medium text-weight-medium m-0">
                                            Prefer to see it than read about it?
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            {page.demo.external && (
                                                <a
                                                    href={page.demo.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() =>
                                                        trackEvent(ANALYTICS_EVENTS.DEMO_OPEN, {
                                                            demo_label: page.demo.label,
                                                            demo_destination: page.demo.href,
                                                            demo_location: "midpage",
                                                            page_slug: slug,
                                                        })
                                                    }
                                                    className="secondary-button w-inline-block text-center"
                                                >
                                                    <span>▶ Try the live demo</span>
                                                </a>
                                            )}
                                            <MartechCTA
                                                title="Get My Build Quote"
                                                location="midpage"
                                            />
                                        </div>
                                    </AnimatedInViewDiv>
                                )}
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

            {page.related?.length > 0 && (
                <section>
                    <div className="padding-global py-16">
                        <div className="w-layout-blockcontainer container w-container">
                            <div className="about-features-wrapper">
                                <AnimatedInViewDiv className="about-features-header">
                                    <div className="header">
                                        <h2 className="heading-6 text-weight-medium">
                                            Works Even Better Together
                                        </h2>
                                    </div>
                                </AnimatedInViewDiv>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                                    {page.related.map((slug) => (
                                        <Link
                                            key={slug}
                                            href={`/martech/${slug}`}
                                            className="border border-white/10 rounded-lg p-6 bg-white/[0.02] hover:border-[#ed5145]/60 transition-colors duration-300 flex items-center justify-between gap-3 group"
                                        >
                                            <span className="text-size-small text-weight-medium capitalize-first">
                                                {linkAnchors[slug] || slug}
                                            </span>
                                            <span className="text-[#ed5145] opacity-40 group-hover:opacity-100 transition-opacity">
                                                →
                                            </span>
                                        </Link>
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
                                                onClick={trackDemoOpen}
                                            >
                                                {page.demo.label} →
                                            </a>
                                        ) : (
                                            <Link
                                                href={page.demo.href}
                                                className="text-link text-weight-bold"
                                                onClick={trackDemoOpen}
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

            {page.faqs?.length > 0 && (
                <MartechFAQ
                    faqs={page.faqs}
                    heading={`${page.badge.split("·")[0].trim()}, Common Questions`}
                />
            )}

            {/* The form lives on the page rather than back on /martech. Every CTA
                above now scrolls to it instead of navigating away, MartechCTA
                already prefers an on-page form when one exists. */}
            <section>
                <div className="padding-global py-16">
                    <div className="w-layout-blockcontainer container w-container">
                        <div className="max-w-3xl mx-auto">
                            <MartechLeadForm
                                defaultService={formServiceForSlug[slug] || ""}
                                source={slug ? `martech/${slug}` : "martech"}
                                heading={`Get a Quote for ${page.badge.split("·")[0].trim()}`}
                                subheading="Tell us what you need and we'll come back with scope, timeline and cost. Most single projects go live in 2–3 weeks."
                                submitLabel="Get My Build Quote →"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
