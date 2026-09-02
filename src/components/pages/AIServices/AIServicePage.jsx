"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import MartechCTA from "@/components/pages/Martech/MartechCTA";
import MartechFAQ from "@/components/pages/Martech/MartechFAQ";
import MartechLeadForm from "@/components/pages/Martech/MartechLeadForm";
import { aiServiceAnchors } from "@/data/aiServicesPages";
import { dubaiAnchors } from "@/data/dubaiPages";
import { trackScrollDepth } from "@/lib/analytics";

// US-facing option lists for the shared lead form. The martech defaults list
// product names and rupee budget bands, both wrong for this audience.
const AI_FORM_SERVICES = [
    "AI Development",
    "AI Agent Development",
    "AI App Development",
    "AI Chatbot Development",
    "AI Voice Agent Development",
    "AI Integration",
    "Custom AI Development",
    "Not sure yet, advise me",
];
const AI_FORM_BUDGETS = [
    "Under $10,000",
    "$10,000 - $25,000",
    "$25,000 - $75,000",
    "$75,000+",
    "Prefer not to say",
];

/**
 * Template for the US-targeted AI services cluster (/services/ai-*).
 *
 * Built from a measured teardown of the 22 pages holding page one for our
 * target SERPs (2026-08-15): median 3,730 words, 20/22 address pricing,
 * 16/22 show a delivery process, 12/22 carry FAQ schema. Sections here map
 * 1:1 to that brief, so completeness is a property of the template rather
 * than a per-page writing decision. Every section renders only when its data
 * exists, same convention as MartechProductPage.
 *
 * Long-form prose lives in `intro` and `deepDive` and renders as real
 * paragraphs, not cards: the word depth that ranks has to be readable text,
 * and card grids cap out near 1,200 words.
 */
export default function AIServicePage({ page, slug }) {
    // Same 50/75/90 scroll-depth events as the martech pages, so this
    // cluster's engagement is comparable to theirs in GA4 from day one.
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

    const heading = (text) => (
        <AnimatedInViewDiv className="about-features-header">
            <div className="header">
                <h2 className="heading-4 text-weight-medium">{text}</h2>
            </div>
        </AnimatedInViewDiv>
    );

    return (
        <>
            {/* ---------------------------------------------------------- hero */}
            <section>
                <div className="padding-global">
                    <div className="w-layout-blockcontainer container w-container">
                        <div className="hero-wrapper">
                            <AnimatedInViewDiv className="hero-component">
                                <a
                                    href="#ai-lead-form"
                                    className="read-more-tag w-inline-block cursor-pointer"
                                >
                                    <div className="text-size-small text-weight-bold text-[#E0362C]">
                                        {page.badge}
                                    </div>
                                </a>
                                <div className="flex flex-col items-center gap-10">
                                    <h1 className="heading-3 text-weight-bold max-w-5xl">
                                        {page.title}
                                    </h1>
                                    <div className="max-w-4xl">
                                        <p className="opacity-80">{page.tagline}</p>
                                    </div>
                                </div>
                            </AnimatedInViewDiv>

                            <AnimatedInViewDiv
                                className="double-button-component margin-top-button-hero"
                                delay={0.2}
                            >
                                <MartechCTA
                                    title="Get a Scoped Proposal"
                                    location={`ai-services:${slug}`}
                                />
                                {/* Pricing intentionally has no on-page section: per the
                                    owner's call (2026-08-15) prices appear only inside the
                                    FAQs, framed against published US market rates. */}
                                <a
                                    href="#martech-faq"
                                    className="secondary-button w-inline-block"
                                >
                                    <span>Pricing and FAQs</span>
                                </a>
                            </AnimatedInViewDiv>

                            {page.heroStats && (
                                <AnimatedInViewDiv delay={0.4} className="w-full">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px mt-16 rounded-lg overflow-hidden border border-[#17171A]/10 bg-[#17171A]/10">
                                        {page.heroStats.map((stat) => (
                                            <div
                                                key={stat.label}
                                                className="bg-white p-6 lg:p-8 flex flex-col gap-2"
                                            >
                                                <div className="heading-4 text-weight-bold text-[#E0362C]">
                                                    {stat.value}
                                                </div>
                                                <p className="text-size-small opacity-80">
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

            {/* ------------------------------------------------- intro prose */}
            {page.intro && (
                <section>
                    <div className="padding-global py-16">
                        <div className="w-layout-blockcontainer container w-container">
                            <div className="max-w-4xl mx-auto">
                                <AnimatedInViewDiv>
                                    <h2 className="heading-4 text-weight-medium mb-6">
                                        {page.intro.heading}
                                    </h2>
                                    <div className="flex flex-col gap-5">
                                        {page.intro.paragraphs.map((p, i) => (
                                            <p key={i} className="opacity-80">
                                                {p}
                                            </p>
                                        ))}
                                    </div>
                                </AnimatedInViewDiv>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* --------------------------------------------- offerings grid */}
            {page.offerings && (
                <section className="ink-section">
                    <div className="padding-global py-16">
                        <div className="w-layout-blockcontainer container w-container">
                            <div className="about-features-wrapper">
                                <AnimatedInViewDiv className="about-features-header">
                                    <div className="header">
                                        <h2 className="heading-4 text-weight-medium">
                                            {page.offerings.heading}
                                        </h2>
                                        {page.offerings.lead && (
                                            <div className="opacity-80">
                                                <div className="max-w-4xl">
                                                    <p>{page.offerings.lead}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </AnimatedInViewDiv>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                                    {page.offerings.items.map((item, index) => (
                                        <AnimatedInViewDiv
                                            key={item.title}
                                            delay={index * 0.08}
                                            className="border border-[#17171A]/10 rounded-lg p-8 bg-white hover:border-[#E0362C]/60 transition-colors duration-300 flex flex-col gap-3"
                                        >
                                            <h3 className="text-size-large text-weight-medium">
                                                {item.title}
                                            </h3>
                                            <p className="text-size-small opacity-80">
                                                {item.description}
                                            </p>
                                        </AnimatedInViewDiv>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ------------------------------------------- deep-dive prose */}
            {page.deepDive?.map((block) => (
                <section key={block.heading}>
                    <div className="padding-global py-12">
                        <div className="w-layout-blockcontainer container w-container">
                            <div className="max-w-4xl mx-auto">
                                <AnimatedInViewDiv>
                                    <h2 className="heading-5 text-weight-medium mb-5">
                                        {block.heading}
                                    </h2>
                                    <div className="flex flex-col gap-5">
                                        {block.paragraphs.map((p, i) => (
                                            <p key={i} className="opacity-80">
                                                {p}
                                            </p>
                                        ))}
                                    </div>
                                </AnimatedInViewDiv>
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* ------------------------------------------------- process */}
            {page.process && (
                <section>
                    <div className="padding-global py-16">
                        <div className="w-layout-blockcontainer container w-container">
                            <div className="about-features-wrapper">
                                <AnimatedInViewDiv className="about-features-header">
                                    <div className="header">
                                        <h2 className="heading-4 text-weight-medium">
                                            {page.process.heading}
                                        </h2>
                                        {page.process.lead && (
                                            <div className="opacity-80">
                                                <div className="max-w-4xl">
                                                    <p>{page.process.lead}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </AnimatedInViewDiv>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                                    {page.process.steps.map((step, index) => (
                                        <AnimatedInViewDiv
                                            key={step.title}
                                            delay={index * 0.08}
                                            className="border border-[#17171A]/10 rounded-lg p-8 bg-white flex flex-col gap-3"
                                        >
                                            <div className="heading-5 text-weight-bold text-[#E0362C]">
                                                {String(index + 1).padStart(2, "0")}
                                            </div>
                                            <h3 className="text-weight-medium">{step.title}</h3>
                                            <p className="text-size-small opacity-80">
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

            {/* ------------------------------------------------ tech stack */}
            {page.techStack && (
                <section className="ink-section">
                    <div className="padding-global py-16">
                        <div className="w-layout-blockcontainer container w-container">
                            <div className="about-features-wrapper">
                                <AnimatedInViewDiv className="about-features-header">
                                    <div className="header">
                                        <h2 className="heading-4 text-weight-medium">
                                            {page.techStack.heading}
                                        </h2>
                                        {page.techStack.lead && (
                                            <div className="opacity-80">
                                                <div className="max-w-4xl">
                                                    <p>{page.techStack.lead}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </AnimatedInViewDiv>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                    {page.techStack.groups.map((group) => (
                                        <AnimatedInViewDiv
                                            key={group.name}
                                            className="border border-[#17171A]/10 rounded-lg p-8 bg-white flex flex-col gap-4"
                                        >
                                            <h3 className="text-size-large text-weight-medium">
                                                {group.name}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {group.items.map((item) => (
                                                    <span
                                                        key={item}
                                                        className="text-size-small border border-[#17171A]/15 rounded-full px-3 py-1 bg-white"
                                                    >
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </AnimatedInViewDiv>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ----------------------------------------------- compliance */}
            {page.compliance && (
                <section>
                    <div className="padding-global py-16">
                        <div className="w-layout-blockcontainer container w-container">
                            <div className="about-features-wrapper">
                                <AnimatedInViewDiv className="about-features-header">
                                    <div className="header">
                                        <h2 className="heading-4 text-weight-medium">
                                            {page.compliance.heading}
                                        </h2>
                                        {page.compliance.lead && (
                                            <div className="opacity-80">
                                                <div className="max-w-4xl">
                                                    <p>{page.compliance.lead}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </AnimatedInViewDiv>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                    {page.compliance.items.map((item) => (
                                        <AnimatedInViewDiv
                                            key={item.title}
                                            className="border border-[#17171A]/10 rounded-lg p-8 bg-white flex flex-col gap-3"
                                        >
                                            <h3 className="text-size-large text-weight-medium">
                                                {item.title}
                                            </h3>
                                            <p className="text-size-small opacity-80">
                                                {item.description}
                                            </p>
                                        </AnimatedInViewDiv>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ----------------------------------------------------- FAQs */}
            {page.faqs?.length > 0 && (
                <MartechFAQ
                    faqs={page.faqs}
                    heading={page.faqHeading || "Questions US Buyers Ask Us"}
                />
            )}

            {/* -------------------------------------------- related links */}
            {page.related?.length > 0 && (
                <section>
                    <div className="padding-global py-16">
                        <div className="w-layout-blockcontainer container w-container">
                            <div className="about-features-wrapper">
                                {heading("Explore the Full AI Practice")}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                                    {page.related.map((relSlug) => (
                                        <Link
                                            key={relSlug}
                                            href={`/services/${relSlug}`}
                                            className="border border-[#17171A]/10 rounded-lg p-6 bg-white hover:border-[#E0362C]/60 transition-colors duration-300 flex items-center justify-between gap-3 group"
                                        >
                                            <span className="text-size-small text-weight-medium">
                                                {aiServiceAnchors[relSlug] || dubaiAnchors[relSlug] || relSlug}
                                            </span>
                                            <span className="text-[#E0362C] opacity-40 group-hover:opacity-100 transition-opacity">
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

            {/* ------------------------------------------------ lead form */}
            <section id="ai-lead-form">
                <div className="padding-global py-16">
                    <div className="w-layout-blockcontainer container w-container">
                        <div className="max-w-3xl mx-auto">
                            <MartechLeadForm
                                defaultService={page.formService || ""}
                                services={page.formServices || AI_FORM_SERVICES}
                                budgets={page.formBudgets || AI_FORM_BUDGETS}
                                source={`services/${slug}`}
                                heading={page.formHeading || "Get a Scoped Proposal"}
                                subheading="Tell us what you are building and we will come back with scope, team, timeline and a fixed cost. NDA first if you prefer, and no obligation either way."
                                submitLabel="Get My Proposal →"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
