"use client";

import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import { LearnMoreButton } from "@/components/Buttons";
import MartechCTA from "./MartechCTA";
import shopifyStores from "@/data/shopifyStores";

const stats = [
    { value: "29+", label: "live Shopify & D2C storefronts" },
    { value: "$100M+", label: "online sales on commerce platforms we've built (Steve Madden)" },
    { value: "50+", label: "countries served by our global storefronts" },
];

export default function ShopifyShowcase() {
    return (
        <section id="shopify-showcase">
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="hero-wrapper">
                        <AnimatedInViewDiv className="hero-component">
                            <div className="read-more-tag w-inline-block">
                                <div className="text-size-small text-weight-bold text-[#ed5145]">
                                    Shopify &amp; E-Commerce Portfolio
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-10">
                                <h1 className="heading-3 text-weight-bold max-w-5xl">
                                    29+ Stores Built. Every One of Them Live.
                                </h1>
                                <div className="max-w-4xl">
                                    <p className="opacity-60">
                                        From diamond jewellery to sports nutrition to designer
                                        couture, storefronts designed to convert, and wired into
                                        the marketing stack that fills them. Click any store to
                                        see it live.
                                    </p>
                                </div>
                            </div>
                        </AnimatedInViewDiv>

                        <AnimatedInViewDiv
                            className="double-button-component margin-top-button-hero"
                            delay={0.2}
                        >
                            <MartechCTA title="Get a Store Quote" location="shopify-showcase-top" />
                            <LearnMoreButton title="All MarTech Services" routeTo="/martech" />
                        </AnimatedInViewDiv>

                        <AnimatedInViewDiv delay={0.3} className="w-full">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-px mt-12 rounded-lg overflow-hidden border border-white/10 bg-white/10">
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
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>

            <div className="padding-global py-16">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                        {shopifyStores.map((store, index) => (
                            <AnimatedInViewDiv key={store.url} delay={Math.min(index * 0.03, 0.5)}>
                                <a
                                    href={store.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border border-white/10 rounded-lg p-6 bg-white/[0.02] hover:border-[#ed5145]/60 hover:bg-[#ed5145]/[0.05] transition-all duration-300 flex flex-col gap-2 group h-full"
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-weight-medium">{store.name}</span>
                                        <span className="text-[#ed5145] opacity-0 group-hover:opacity-100 transition-opacity">
                                            ↗
                                        </span>
                                    </div>
                                    <span className="text-size-small opacity-40">
                                        {store.niche}
                                    </span>
                                    <span className="text-size-small opacity-30 mt-auto pt-2">
                                        {store.url.replace(/https?:\/\/(www\.)?/, "")}
                                    </span>
                                </a>
                            </AnimatedInViewDiv>
                        ))}
                    </div>

                    <AnimatedInViewDiv className="w-full border border-white/10 rounded-lg p-8 bg-white/[0.02] flex flex-col lg:flex-row lg:items-center gap-6 justify-between mt-10">
                        <div className="flex flex-col gap-2">
                            <div className="text-size-large text-weight-medium">
                                Beyond Shopify: enterprise commerce
                            </div>
                            <p className="text-size-small opacity-60 max-w-2xl">
                                Steve Madden ($100M+ online sales, 2M+ app downloads), Utsav
                                Fashion ($20M+ annual revenue, 50+ countries), Dudalina ($15M+
                                online revenue), custom omnichannel platforms when you outgrow
                                a template.
                            </p>
                        </div>
                        <MartechCTA title="Discuss My Store" location="shopify-showcase-bottom" />
                    </AnimatedInViewDiv>
                </div>
            </div>
        </section>
    );
}
