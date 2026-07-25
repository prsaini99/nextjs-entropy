"use client";

import { useState } from "react";
import Link from "next/link";
import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import { GetStarted, LearnMoreButton } from "@/components/Buttons";

const mumbaiClients = [
    "Mumbai Indians", "Reliance Entertainment", "Sony Pictures", "Piramal",
    "Future Group", "WROGN", "Badshah Masala", "Kisna", "Sheth Brothers",
];

const services = [
    { name: "Custom software development", href: "/services", detail: "Web, mobile, AI and cloud — 55+ products shipped." },
    { name: "MarTech engineering", href: "/martech", detail: "Ad-ops AI, marketing automation, influencer platforms — with live demos." },
    { name: "AI & ML systems", href: "/services", detail: "20+ AI/ML systems in production: medical imaging, fraud detection, voice agents." },
    { name: "E-commerce & Shopify", href: "/martech/shopify-websites", detail: "29+ live storefronts plus $100M+ enterprise commerce." },
    { name: "Industry solutions", href: "/industries", detail: "Healthcare, retail, media, education, mobility and more." },
    { name: "Dedicated dev teams", href: "/hire-developers", detail: "Project-based, retainer or extended partnership." },
];

const faqs = [
    {
        q: "Which software development company in Mumbai has worked with big brands?",
        a: "StackBinary has shipped products for Mumbai Indians, Reliance Entertainment, Sony Pictures, Piramal and Future Group, alongside global brands like Abbott, Philips, KFC and Steve Madden — 55+ products across 8 industries, many built and supported from our Mumbai office in Kandivali East.",
    },
    {
        q: "Can we meet in person in Mumbai?",
        a: "Yes. We're based at Spring Grove Towers, Kandivali East, Mumbai 400101. Discovery workshops, sprint reviews and stakeholder demos can happen at our office or yours — same city, same timezone, no 11pm calls.",
    },
    {
        q: "What does custom software development cost in Mumbai?",
        a: "A focused first release typically starts around ₹5–15 Lakh and ships in 6–12 weeks; larger platforms range ₹15–40 Lakh+. We scope precisely after a free discovery call, and our AI-accelerated delivery compresses timelines without cutting review or security.",
    },
    {
        q: "Do you also handle marketing technology for Mumbai businesses?",
        a: "Yes — martech is a dedicated practice: AI ad management, marketing automation, influencer platforms, AI call centers and lead-gen systems, all backed by live products you can try before you commit.",
    },
];

export default function MumbaiLanding() {
    const [open, setOpen] = useState(0);

    return (
        <>
            <section>
                <div className="padding-global">
                    <div className="w-layout-blockcontainer container w-container">
                        <div className="hero-wrapper">
                            <AnimatedInViewDiv className="hero-component">
                                <div className="read-more-tag w-inline-block">
                                    <div className="text-size-small text-weight-bold text-[#ed5145]">
                                        Kandivali East, Mumbai · IST · In-person friendly
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-10">
                                    <h1 className="heading-3 text-weight-bold max-w-5xl">
                                        Software Development Company in Mumbai — Trusted by Mumbai
                                        Indians, Reliance &amp; Sony
                                    </h1>
                                    <div className="max-w-4xl">
                                        <p className="opacity-60">
                                            StackBinary is a Mumbai-based, AI-native software
                                            studio: 55+ products shipped across healthcare, retail,
                                            media, fintech and marketing technology. Meet us in
                                            person in Kandivali East, work in your timezone, and
                                            see live products — not slideware — before you commit.
                                        </p>
                                    </div>
                                </div>
                            </AnimatedInViewDiv>

                            <AnimatedInViewDiv
                                className="double-button-component margin-top-button-hero"
                                delay={0.2}
                            >
                                <GetStarted />
                                <LearnMoreButton title="See Our Case Studies" routeTo="/case-studies" />
                            </AnimatedInViewDiv>

                            <AnimatedInViewDiv delay={0.3} className="w-full">
                                <div className="flex flex-col items-center gap-4 mt-12">
                                    <div className="text-size-small text-weight-bold uppercase tracking-widest opacity-40">
                                        Mumbai-headquartered brands we&apos;ve worked with
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 max-w-4xl">
                                        {mumbaiClients.map((client) => (
                                            <span
                                                key={client}
                                                className="text-size-medium text-weight-medium opacity-50 hover:opacity-100 hover:text-[#ed5145] transition-all duration-300 whitespace-nowrap"
                                            >
                                                {client}
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
                                        What We Build From Mumbai
                                    </h2>
                                </div>
                            </AnimatedInViewDiv>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                                {services.map((service, i) => (
                                    <AnimatedInViewDiv key={service.name} delay={i * 0.08} className="h-full">
                                        <Link
                                            href={service.href}
                                            className="border border-white/10 rounded-lg p-8 bg-white/[0.03] hover:border-[#ed5145]/60 transition-colors duration-300 flex flex-col gap-3 h-full group"
                                        >
                                            <h3 className="text-size-large text-weight-medium">
                                                {service.name}
                                            </h3>
                                            <p className="text-size-small opacity-60">
                                                {service.detail}
                                            </p>
                                            <span className="mt-auto pt-3 text-size-small text-[#ed5145] text-weight-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                                Explore →
                                            </span>
                                        </Link>
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
                                        Mumbai FAQs
                                    </h2>
                                </div>
                            </AnimatedInViewDiv>
                            <div className="w-full max-w-4xl mx-auto flex flex-col gap-3">
                                {faqs.map((faq, index) => (
                                    <AnimatedInViewDiv
                                        key={faq.q}
                                        delay={index * 0.05}
                                        className="border border-white/10 rounded-lg bg-white/[0.02] overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setOpen(open === index ? -1 : index)}
                                            className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors"
                                            aria-expanded={open === index}
                                        >
                                            <span className="text-weight-medium">{faq.q}</span>
                                            <span
                                                className={`text-[#ed5145] text-xl transition-transform duration-300 ${
                                                    open === index ? "rotate-45" : ""
                                                }`}
                                            >
                                                +
                                            </span>
                                        </button>
                                        {open === index && (
                                            <div className="px-6 pb-6 text-size-small opacity-60">
                                                {faq.a}
                                            </div>
                                        )}
                                    </AnimatedInViewDiv>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
