"use client";

import AnimatedInViewDiv from "@/components/Animate/AppearInView";

const brands = [
    "Abbott", "Sanofi", "Philips", "KFC", "Future Group", "Hyundai",
    "IndianOil", "Reliance Entertainment", "Sony Pictures", "Mumbai Indians",
    "Quick Heal", "Syngenta", "UPL", "Bayer CropScience", "The Fern Hotels",
    "Sugar Cosmetics", "Shiseido", "Bioderma", "The Ordinary", "Steve Madden",
    "Zebronics", "Syska", "D-Link", "Priyagold", "WROGN", "Piramal",
];

export default function MartechBrands() {
    return (
        <section id="martech-brands">
            <div className="padding-global py-12">
                <div className="w-layout-blockcontainer container w-container">
                    <AnimatedInViewDiv className="flex flex-col items-center gap-8">
                        <div className="text-size-small text-weight-bold uppercase tracking-widest opacity-40">
                            Brands we&apos;ve worked with
                        </div>
                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-5xl">
                            {brands.map((brand) => (
                                <span
                                    key={brand}
                                    className="text-size-medium text-weight-medium opacity-50 hover:opacity-100 hover:text-[#E0362C] transition-all duration-300 whitespace-nowrap"
                                >
                                    {brand}
                                </span>
                            ))}
                        </div>
                        <p className="text-size-small opacity-40 text-center max-w-2xl">
                            55+ products designed and delivered across 8+ industries on 3
                            continents, healthcare, retail, agriculture, mobility, media,
                            education and marketing.
                        </p>
                    </AnimatedInViewDiv>
                </div>
            </div>
        </section>
    );
}
