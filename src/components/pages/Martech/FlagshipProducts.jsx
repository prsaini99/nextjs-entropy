"use client";

import { useState } from "react";
import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import { LearnMoreButton } from "@/components/Buttons";
import MartechCTA from "./MartechCTA";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

const products = [
    {
        key: "ad-analysis",
        tab: "AI Ad Analysis",
        title: "Know Which Ad Wins, Before You Spend on Media",
        description:
            "Every video ad runs through five AI analysis pipelines: on-screen emotion, voice & tone, visuals & pacing, script structure and predicted brain response. A full technical read on why a creative works, ranked across your batch before the first ad dollar is committed.",
        features: [
            "On-screen emotion, frame-by-frame read of what your talent projects",
            "Voice & tone, energy, pace, pitch and music-to-voice balance",
            "Visuals & pacing, cut rhythm, brand windows, aesthetic scoring",
            "Script intelligence, hook structure, emotional arc, CTA strength",
            "Neural attention, predicted brain response, second by second",
            "Calibration against your real CTR, ROAS and watch-time",
        ],
        stats: [
            { value: "5", label: "AI lenses per creative" },
            { value: "0-3s", label: "hook window scored" },
            { value: "A/B", label: "hook strength compared across a real creative pair" },
        ],
        href: "/martech/creative-analysis",
        linkLabel: "See a Real Ad Scored Live",
        showCurve: true,
    },
    {
        key: "adsboys",
        tab: "Adsboys",
        title: "Meta Ads, Run End to End From One Dashboard",
        description:
            "Adsboys, our AI ad intelligence platform, runs the whole campaign loop: generate posts and ad creative with AI, publish across 10-20 Meta ad accounts through the API, get AI insights on every ad, and when the campaign talks back, answer the comments and DMs straight from the dashboard.",
        features: [
            "AI performance analysis on every ad",
            "AI post & creative generation",
            "Comment & DM intelligence, replies from the dashboard",
            "Publish straight through the Meta Graph API",
            "Bulk operations across accounts",
            "Cross-account performance views & audit logs",
        ],
        stats: [
            { value: "10-20", label: "Meta ad accounts run from one dashboard" },
            { value: "v23", label: "Meta Graph API, published straight through" },
            { value: "2-way", label: "campaigns: it posts, and answers what comes back" },
        ],
        href: "/martech/ad-intelligence",
        linkLabel: "Explore Adsboys Live",
    },
    {
        key: "zyflus",
        tab: "Zyflus",
        title: "Influencer Marketing, Run Like an Operation",
        description:
            "Our end-to-end creator marketing platform: discover creators, vet them with AI against your ideal influencer profile, automate DM outreach and manage every negotiation in one pipeline, with campaign analytics closing the loop.",
        features: [
            "Creator discovery & enrichment from Instagram",
            "AI vetting with 0-100 match scores",
            "Automated DM outreach & reply tracking",
            "Multi-stage negotiation pipeline with quote history",
            "Campaign deliverables & performance analytics",
            "Multi-brand isolation for agencies",
        ],
        stats: [
            { value: "0-100", label: "AI match score per creator" },
            { value: "292%", label: "follower growth on a celebrity beauty brand" },
            { value: "3.8x", label: "ROAS on campaigns we've run" },
        ],
        href: "/martech/influencer-marketing",
        linkLabel: "Explore Zyflus Live",
    },
    {
        key: "atoemail",
        tab: "AtoEmail",
        title: "Marketing Automation You Own",
        description:
            "Visual customer journeys, high-volume campaigns, a unified inbox and AI steps, one automation engine without per-contact pricing that punishes list growth. Your data, your sending infrastructure, your rules.",
        features: [
            "Drag-and-drop journey builder",
            "Triggers: events, replies, schedules, webhooks",
            "Campaigns with merge tags & load balancing",
            "Unified inbox where replies advance journeys",
            "AI steps: classify, draft, score inside workflows",
            "Interactive AMP email & developer API",
        ],
        stats: [
            { value: "∞", label: "contacts, no per-subscriber tiers" },
            { value: "4", label: "trigger types for automations" },
            { value: "100%", label: "owned: your data, infra and rules" },
        ],
        href: "/martech/marketing-automation",
        linkLabel: "Explore AtoEmail Live",
    },
    {
        key: "call-center",
        tab: "AI Call Center",
        title: "A Sales Agent That Never Misses a Call",
        description:
            "A real-time voice AI that answers, qualifies and follows up in 11 languages, books the meeting, hands off to a human with full context when needed, and logs every transcript and outcome into your CRM.",
        features: [
            "Real-time voice conversations in 11 languages",
            "Sales qualification & meeting booking on the call",
            "Inbound answering + outbound follow-up calls",
            "Human handoff with full context",
            "Configured per company from one profile, no redeploy",
            "Transcripts & outcomes pushed to your CRM",
        ],
        stats: [
            { value: "11", label: "languages, in real time" },
            { value: "24/7", label: "coverage, every call answered" },
            { value: "1", label: "profile to launch a company's agent" },
        ],
        href: "/martech/ai-call-center",
        linkLabel: "Explore the Live Console",
    },
];

// Illustrative per-second attention curve for the ad-analysis tab
const curve = [
    0.35, 0.82, 0.95, 0.88, 0.72, 0.61, 0.66, 0.58, 0.52, 0.57, 0.49, 0.45,
    0.55, 0.62, 0.51, 0.44, 0.48, 0.42, 0.5, 0.63, 0.71, 0.58, 0.46, 0.4,
];

function AttentionCurve() {
    const w = 560;
    const h = 160;
    const step = w / (curve.length - 1);
    const points = curve.map(
        (v, i) => `${(i * step).toFixed(1)},${(h - v * h).toFixed(1)}`
    );
    const path = `M${points.join(" L")}`;
    const area = `${path} L${w},${h} L0,${h} Z`;
    const peakIndex = curve.indexOf(Math.max(...curve));

    return (
        <svg
            viewBox={`0 0 ${w} ${h + 30}`}
            className="w-full h-auto"
            role="img"
            aria-label="Per-second predicted attention curve for a video ad, peaking in the first three seconds"
        >
            <defs>
                <linearGradient id="flagshipFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E0362C" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#E0362C" stopOpacity="0" />
                </linearGradient>
            </defs>
            <rect x="0" y="0" width={step * 3} height={h} fill="#ffffff" opacity="0.06" />
            <path d={area} fill="url(#flagshipFill)" />
            <path d={path} fill="none" stroke="#E0362C" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx={peakIndex * step} cy={h - curve[peakIndex] * h} r="5" fill="#E0362C" />
            <text x={step * 1.5} y={h + 20} fill="#ffffff" opacity="0.5" fontSize="11" textAnchor="middle">
                hook (0-3s)
            </text>
            <text x={peakIndex * step} y={h - curve[peakIndex] * h - 12} fill="#ffffff" opacity="0.8" fontSize="11" textAnchor="middle">
                peak attention
            </text>
            <text x={w - 4} y={h + 20} fill="#ffffff" opacity="0.5" fontSize="11" textAnchor="end">
                seconds →
            </text>
        </svg>
    );
}

export default function FlagshipProducts() {
    const [active, setActive] = useState(products[0].key);

    // Tab switches reveal which product a visitor came for, on a page where
    // most of them never click a CTA.
    const selectProduct = (p) => {
        setActive(p.key);
        trackEvent(ANALYTICS_EVENTS.PRODUCT_TAB_VIEW, {
            product_name: p.tab,
            product_destination: p.href,
        });
    };
    const product = products.find((p) => p.key === active);

    return (
        <section id="flagship-products">
            <div className="padding-global py-16">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="about-features-wrapper">
                        <AnimatedInViewDiv className="about-features-header">
                            <div className="header">
                                <div className="text-size-small text-weight-bold text-[#E0362C] uppercase tracking-wider mb-4">
                                    Flagship Products
                                </div>
                                <h2 className="heading-4 text-weight-medium">
                                    Four AI Products We Built. Check Them Yourself.
                                </h2>
                                <div className="opacity-80">
                                    <div className="max-w-4xl">
                                        <p>
                                            The core of our martech offering. Each one in
                                            production today, each one explorable live on its
                                            dedicated page.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedInViewDiv>

                        <AnimatedInViewDiv className="w-full">
                            {/* Product tabs */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {products.map((p) => (
                                    <button
                                        key={p.key}
                                        onClick={() => selectProduct(p)}
                                        aria-pressed={active === p.key}
                                        className={`rounded-full px-6 py-3 border text-size-small text-weight-bold transition-all duration-200 ${
                                            active === p.key
                                                ? "border-[#E0362C] bg-[#E0362C]/[0.1] text-[#E0362C]"
                                                : "border-gray-200 bg-[#F7F7F5] hover:border-gray-400"
                                        }`}
                                    >
                                        {p.tab}
                                    </button>
                                ))}
                            </div>

                            {/* Active product */}
                            <div
                                key={product.key}
                                className="border border-gray-200 rounded-lg p-8 lg:p-10 bg-[#F7F7F5] animate-slideUpFadeIn-0.5"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                                    <div className="flex flex-col gap-5">
                                        <h3 className="heading-5 text-weight-bold">
                                            {product.title}
                                        </h3>
                                        <p className="opacity-80 text-size-small">
                                            {product.description}
                                        </p>
                                        <div className="grid grid-cols-3 gap-4">
                                            {product.stats.map((stat) => (
                                                <div key={stat.label}>
                                                    <div className="text-size-large text-weight-bold text-[#E0362C]">
                                                        {stat.value}
                                                    </div>
                                                    <div className="text-size-small opacity-70">
                                                        {stat.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="double-button-component pt-2">
                                            <MartechCTA location="flagship-products" />
                                            <LearnMoreButton
                                                title={product.linkLabel}
                                                routeTo={product.href}
                                                onClick={() =>
                                                    trackEvent(ANALYTICS_EVENTS.DEMO_OPEN, {
                                                        demo_name: product.tab,
                                                        demo_label: product.linkLabel,
                                                        demo_location: "flagship-products",
                                                        demo_destination: product.href,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        {product.showCurve && (
                                            <div className="border border-gray-200 rounded-lg p-6 bg-[#F7F7F5] mb-4">
                                                <div className="text-size-small opacity-70 mb-3">
                                                    One of the outputs: per-second predicted
                                                    attention
                                                </div>
                                                <AttentionCurve />
                                            </div>
                                        )}
                                        <ul
                                            className={`grid gap-3 ${
                                                product.showCurve
                                                    ? "grid-cols-1 sm:grid-cols-2"
                                                    : "grid-cols-1 sm:grid-cols-2"
                                            }`}
                                        >
                                            {product.features
                                                .slice(0, product.showCurve ? 4 : 6)
                                                .map((feature) => (
                                                    <li
                                                        key={feature}
                                                        className="text-size-small opacity-80 flex gap-2 border border-gray-200 rounded-lg p-4 bg-[#F7F7F5]"
                                                    >
                                                        <span className="text-[#E0362C]">✓</span>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    );
}
