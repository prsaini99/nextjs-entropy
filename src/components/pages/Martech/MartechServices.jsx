"use client";

import { useState } from "react";
import Link from "next/link";
import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import MartechCTA from "./MartechCTA";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

const services = [
    {
        pillar: "Advertising & Promotion",
        title: "AI Ad Intelligence & Ad-Ops",
        description:
            "Manage 10–20 Meta ad accounts from one dashboard: AI analysis on every ad, AI-generated copy and creative, pushed live through the Meta API with bulk operations and audit trails.",
        capabilities: [
            "AI performance analysis per ad",
            "AI ad copy & creative generation",
            "Publish straight through the Meta Graph API",
            "Cross-account dashboards & governance",
        ],
        href: "/martech/ad-intelligence",
        demo: "Meta Marketing Tool",
    },
    {
        pillar: "Content & Experience",
        title: "Marketing Automation (AtoEmail)",
        description:
            "Our marketing automation platform: visual customer journeys, high-volume campaigns, unified inbox and AI steps, without per-contact pricing that punishes list growth.",
        capabilities: [
            "Visual journey builder with 4 trigger types",
            "Campaigns with merge tags & load balancing",
            "Replies trigger automations from a unified inbox",
            "Interactive AMP email & developer API",
        ],
        href: "/martech/marketing-automation",
        demo: "AtoEmail",
    },
    {
        pillar: "Influencer & Social",
        title: "Influencer Marketing Platform (Zyflus)",
        description:
            "End-to-end creator marketing: discovery via Instagram Graph API, AI match-scoring against your ideal influencer profile, automated DM outreach and a full negotiation pipeline.",
        capabilities: [
            "Creator discovery & enrichment",
            "AI vetting with 0–100 match scores",
            "DM outreach automation & reply tracking",
            "Negotiation pipeline & campaign analytics",
        ],
        href: "/martech/influencer-marketing",
        demo: "Zyflus",
    },
    {
        pillar: "Influencer & Social",
        title: "Instagram DM Automation & Scrapers",
        description:
            "Reply and follow-up bots for Instagram, Facebook, Quora and more, plus scrapers that gather intelligence on anything: competitors, prospects, pricing, trends.",
        capabilities: [
            "Instant DM & comment replies in your brand voice",
            "Scheduled follow-up sequences that stop on reply",
            "Quora/community monitoring with human review",
            "Scrape any public source into your warehouse",
        ],
        href: "/martech/social-automation",
        demo: "Zyflus outreach engine · TradeToIndia pipelines",
    },
    {
        pillar: "Commerce & Sales",
        title: "B2B Lead Generation & Sales Intelligence",
        description:
            "B2B data engines that turn raw lists into revenue: web and LinkedIn enrichment, verified email and phone discovery, live pipelines that keep your CRM fed with fresh prospects.",
        capabilities: [
            "Web & LinkedIn scraping with verified contacts",
            "CSV in → live enrichment → export, with progress streaming",
            "Company firmographics & employee data",
            "Credit-metered access for your team or your customers",
        ],
        href: "/martech/sales-intelligence",
        demo: "TradeToIndia DB",
    },
    {
        pillar: "Commerce & Sales",
        title: "AI Calling Agent & Call Center",
        description:
            "A real-time voice sales agent that speaks 11 languages, qualifies leads, books meetings and runs outbound follow-up calls, configured per company from one profile.",
        capabilities: [
            "Real-time voice AI in 11 languages",
            "Inbound answering & outbound follow-ups",
            "Human handoff with full context",
            "Transcripts & outcomes pushed to your CRM",
        ],
        href: "/martech/ai-call-center",
        demo: "Sales Agent Console",
    },
    {
        pillar: "Commerce & Sales",
        title: "StackBinary B2B Lead CRM",
        description:
            "The AI-assisted CRM our own BD team closes with: every lead, WhatsApp thread, call and email in one timeline, with AI scoring that tells reps exactly who to call next and what to say.",
        capabilities: [
            "WhatsApp, call & email capture with multilingual transcription",
            "AI lead brain: score, temperature, stage & next action",
            "\"Ask your CRM\" assistant with semantic recall over every conversation",
            "AI-drafted proposals & emails grounded in each lead's dossier",
        ],
        href: "/martech/lead-intelligence",
        demo: "lead.stackbinary.io, in daily production use",
    },
    {
        pillar: "Commerce & Sales",
        title: "AI Proposal Generator (Branded)",
        description:
            "Proposals that look like your brand and think like your best closer: AI drafts the pitch from your previous mandates, recommends the quote, suggests upsell ideas, then tells you exactly what the client read.",
        capabilities: [
            "On-brand by default. Your logo, type & colors on every proposal",
            "AI drafts scope & pitch from past mandates and won proposals",
            "Quote recommendations from your pricing history",
            "Reading analytics & behavior-triggered follow-ups",
        ],
        href: "/martech/proposal-maker",
        demo: "SolarProposal · StackBinary CRM proposals",
    },
    {
        pillar: "AI Enablement",
        title: "MCP Integration & AI Enablement",
        description:
            "We plug your marketing platforms, ad accounts, CRM, email, analytics, socials, into your AI ecosystem as MCP tools. We learn your business first, then wire the connections, so your team runs marketing by asking their AI instead of juggling ten dashboards.",
        capabilities: [
            "Stack audit. We map your platforms, workflows and business rules",
            "Custom MCP connectors for ads, CRM, email, analytics & socials",
            "AI agents that know your brand voice, pricing and approval flows",
            "Team enablement, governance & human-approval guardrails",
        ],
        href: "/martech/ai-integration",
        demo: "How we run our own stack, CRM assistant, ad-ops AI, TribeV2 lab",
    },
    {
        pillar: "Creative Analytics",
        title: "AI Video Ad Analysis Suite",
        description:
            "Every video ad through five AI lenses before you spend on media, emotion, voice & tone, visuals, script and predicted brain response, via our in-house creative intelligence pipeline.",
        capabilities: [
            "Neural attention, predicted brain response, second by second",
            "On-screen emotion, frame-by-frame facial-affect analysis",
            "Voice & tone, speech-emotion, pacing & prosody analysis",
            "Visuals, scene, pacing & aesthetic scoring",
            "Script, transcription + AI script intelligence (hook, arc, CTA)",
        ],
        href: "/martech/creative-analysis",
        demo: "TRIBE v2 Lab, see a real ad scored live",
    },
];

const pillars = [
    {
        name: "Advertising & Promotion",
        blurb: "Run paid media like an operation, every ad analyzed, every account governed.",
    },
    {
        name: "Content & Experience",
        blurb: "Own the channel between you and your audience, journeys, campaigns and inbox.",
    },
    {
        name: "Influencer & Social",
        blurb: "Creators, communities and conversations, discovered, engaged and followed up automatically.",
    },
    {
        name: "Commerce & Sales",
        blurb: "From raw prospect data to signed proposal, the full revenue pipeline, AI-assisted at every step.",
    },
    {
        name: "Creative Analytics",
        blurb: "Your video ads through five AI lenses, emotion, voice, visuals, script and brain response.",
    },
    {
        name: "AI Enablement",
        blurb: "Your whole marketing stack, wired into your AI, so the team works by asking, not clicking.",
    },
];

function ServiceCard({ service, wide = false }) {
    if (wide) {
        return (
            <Link
                href={service.href}
                className="border border-white/10 rounded-lg p-8 lg:p-10 bg-white/[0.03] hover:border-[#ed5145]/60 transition-colors duration-300 grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-8 group"
            >
                <div className="flex flex-col gap-4">
                    <h3 className="heading-6 text-weight-medium">{service.title}</h3>
                    <p className="opacity-60 text-size-small">{service.description}</p>
                    <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-size-small gap-3">
                        <span className="opacity-50">{service.demo}</span>
                        <span className="text-[#ed5145] text-weight-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Explore →
                        </span>
                    </div>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 content-center">
                    {service.capabilities.map((cap) => (
                        <li
                            key={cap}
                            className="text-size-small opacity-80 flex gap-2 border border-white/10 rounded-lg p-4 bg-black/30"
                        >
                            <span className="text-[#ed5145]">✓</span>
                            <span>{cap}</span>
                        </li>
                    ))}
                </ul>
            </Link>
        );
    }

    return (
        <Link
            href={service.href}
            className="border border-white/10 rounded-lg p-8 bg-white/[0.03] hover:border-[#ed5145]/60 transition-colors duration-300 flex flex-col gap-4 h-full group"
        >
            <h3 className="text-size-large text-weight-medium">{service.title}</h3>
            <p className="opacity-60 text-size-small">{service.description}</p>
            <ul className="flex flex-col gap-2 mt-2">
                {service.capabilities.map((cap) => (
                    <li key={cap} className="text-size-small opacity-80 flex gap-2">
                        <span className="text-[#ed5145]">✓</span>
                        <span>{cap}</span>
                    </li>
                ))}
            </ul>
            <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-size-small gap-3">
                <span className="opacity-50">{service.demo}</span>
                <span className="text-[#ed5145] text-weight-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Explore →
                </span>
            </div>
        </Link>
    );
}

export default function MartechServices() {
    const [active, setActive] = useState(pillars[0].name);
    const activePillar = pillars.find((p) => p.name === active);
    const group = services.filter((s) => s.pillar === active);

    return (
        <section id="martech-services">
            <div className="padding-global py-16">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="about-features-wrapper">
                        <AnimatedInViewDiv className="about-features-header">
                            <div className="header">
                                <h2 className="heading-4 text-weight-medium">
                                    AI Marketing Systems We Build, and Run
                                </h2>
                                <div className="opacity-60">
                                    <div className="max-w-4xl">
                                        <p>
                                            Pick a category to see what we build there. Every
                                            service is backed by a live product, click any card
                                            for the full breakdown.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedInViewDiv>

                        <AnimatedInViewDiv className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8 w-full items-start">
                            {/* Category nav, vertical on desktop, scrollable pills on mobile */}
                            <nav
                                aria-label="MarTech categories"
                                className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible lg:sticky lg:top-28 pb-2 lg:pb-0"
                            >
                                {pillars.map((pillar) => {
                                    const count = services.filter(
                                        (s) => s.pillar === pillar.name
                                    ).length;
                                    const isActive = active === pillar.name;
                                    return (
                                        <button
                                            key={pillar.name}
                                            onClick={() => {
                                                setActive(pillar.name);
                                                trackEvent(ANALYTICS_EVENTS.PILLAR_SELECT, {
                                                    pillar_name: pillar.name,
                                                });
                                            }}
                                            aria-pressed={isActive}
                                            className={`text-left rounded-lg px-5 py-4 border transition-all duration-200 whitespace-nowrap lg:whitespace-normal flex-shrink-0 ${
                                                isActive
                                                    ? "border-[#ed5145] bg-[#ed5145]/[0.08]"
                                                    : "border-white/10 bg-white/[0.02] hover:border-white/30"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <span
                                                    className={`text-size-small text-weight-bold ${
                                                        isActive ? "text-[#ed5145]" : ""
                                                    }`}
                                                >
                                                    {pillar.name}
                                                </span>
                                                <span
                                                    className={`text-size-small rounded-full border px-2 ${
                                                        isActive
                                                            ? "border-[#ed5145]/50 text-[#ed5145]"
                                                            : "border-white/15 opacity-40"
                                                    }`}
                                                >
                                                    {count}
                                                </span>
                                            </div>
                                            <p className="text-size-small opacity-50 mt-1 hidden lg:block">
                                                {pillar.blurb}
                                            </p>
                                        </button>
                                    );
                                })}
                            </nav>

                            {/* Active category's solutions */}
                            <div key={active} className="flex flex-col gap-6 animate-slideUpFadeIn-0.5">
                                <div className="border-l-2 border-[#ed5145] pl-5">
                                    <h3 className="heading-6 text-weight-bold">
                                        {activePillar.name}
                                    </h3>
                                    <p className="text-size-small opacity-50">
                                        {activePillar.blurb}
                                    </p>
                                </div>
                                <div
                                    className={
                                        group.length === 1
                                            ? "grid grid-cols-1 gap-6"
                                            : "grid grid-cols-1 xl:grid-cols-2 gap-6"
                                    }
                                >
                                    {group.map((service) => (
                                        <ServiceCard
                                            key={service.title}
                                            service={service}
                                            wide={group.length === 1}
                                        />
                                    ))}
                                </div>
                            </div>
                        </AnimatedInViewDiv>

                        <AnimatedInViewDiv className="double-button-component margin-top-button-features">
                            <MartechCTA location="services" />
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    );
}
