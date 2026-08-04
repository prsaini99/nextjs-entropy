"use client";

import AnimatedInViewDiv from "@/components/Animate/AppearInView";

/**
 * The three claims that answer every objection to building custom, shown on
 * every martech product page directly under the hero.
 *
 * Order is deliberate: speed first because it reads as capability, cost second
 * and stated comparatively (against a licence they already pay) rather than as
 * an absolute price, ownership third as the payoff.
 *
 * This lives in its own strip rather than in each page's `tagline`, because
 * tagline doubles as the meta description and is already at length.
 */
const PROOF = [
    {
        headline: "2–3 weeks",
        detail: "for a single project to go live, not a quarter",
    },
    {
        headline: "Less than a year of licence",
        detail: "is often the whole build cost, and then it stops",
    },
    {
        headline: "You own it",
        detail: "the code, the data and the schema. No seat pricing.",
    },
];

export default function MartechProofStrip() {
    return (
        // Structure mirrors heroStats deliberately. In this codebase the page
        // background behind a section is not reliably dark — elements paint
        // their own. A translucent overlay (bg-[#F7F7F5]) therefore renders
        // white-on-white. Each cell paints bg-black/90, exactly as heroStats
        // does; the wrapper's bg-gray-200 shows through the gap-px as dividers.
        <section aria-label="Why building beats renting">
            <div className="padding-global py-12">
                <div className="w-layout-blockcontainer container w-container">
                    <AnimatedInViewDiv className="grid grid-cols-1 md:grid-cols-3 gap-px rounded-lg overflow-hidden border border-gray-200 bg-gray-200">
                        {PROOF.map((item) => (
                            <div
                                key={item.headline}
                                className="bg-[#F7F7F5] p-6 lg:p-8 flex flex-col gap-2"
                            >
                                <div className="text-weight-bold text-[#E0362C]">
                                    {item.headline}
                                </div>
                                <p className="text-size-small opacity-60">{item.detail}</p>
                            </div>
                        ))}
                    </AnimatedInViewDiv>
                </div>
            </div>
        </section>
    );
}
