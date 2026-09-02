"use client";

import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import { LearnMoreButton } from "@/components/Buttons";
import MartechCTA from "./MartechCTA";
import shopifyStores from "@/data/shopifyStores";

const featured = shopifyStores.slice(0, 8);

export default function MartechShopify() {
    return (
        <section id="martech-shopify">
            <div className="padding-global py-16">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="about-features-wrapper">
                        <AnimatedInViewDiv className="about-features-header">
                            <div className="header">
                                <div className="text-size-small text-weight-bold text-[#E0362C] uppercase tracking-wider mb-4">
                                    Shopify &amp; E-Commerce
                                </div>
                                <h2 className="heading-4 text-weight-medium">
                                    29+ Stores Built. From Diamond Jewellery to D2C Wellness.
                                </h2>
                                <div className="opacity-80">
                                    <div className="max-w-4xl">
                                        <p>
                                            Storefronts that convert, integrated with the marketing
                                            stack that fills them, every store is live. Beyond
                                            Shopify, we&apos;ve shipped global commerce platforms
                                            like Steve Madden ($100M+ online sales) and Utsav
                                            Fashion ($20M+ annual revenue in 50+ countries).
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedInViewDiv>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                            {featured.map((store, index) => (
                                <AnimatedInViewDiv key={store.url} delay={index * 0.05}>
                                    <a
                                        href={store.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="border border-[#17171A]/10 rounded-lg p-4 bg-white hover:border-[#E0362C]/60 hover:bg-[#E0362C]/[0.05] transition-all duration-300 flex flex-col gap-1 group h-full"
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-weight-medium text-size-small">
                                                {store.name}
                                            </span>
                                            <span className="text-[#E0362C] opacity-0 group-hover:opacity-100 transition-opacity">
                                                ↗
                                            </span>
                                        </div>
                                        <span className="text-size-small opacity-40">
                                            {store.niche}
                                        </span>
                                    </a>
                                </AnimatedInViewDiv>
                            ))}
                        </div>

                        <AnimatedInViewDiv className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 border border-[#17171A]/10 rounded-lg p-8 bg-white">
                            <div className="flex flex-col gap-1">
                                <div className="text-weight-medium">
                                    + {shopifyStores.length - featured.length} more live stores
                                </div>
                                <p className="text-size-small opacity-80">
                                    Browse the full portfolio with links to every storefront.
                                </p>
                            </div>
                            <div className="double-button-component">
                                <MartechCTA title="Get a Store & Stack Quote" location="shopify" />
                                <LearnMoreButton
                                    title={`View All ${shopifyStores.length} Stores`}
                                    routeTo="/martech/shopify-websites"
                                />
                            </div>
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    );
}
