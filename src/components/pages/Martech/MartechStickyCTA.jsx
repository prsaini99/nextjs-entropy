"use client";

import { useEffect, useState } from "react";
import { trackCTAClick } from "@/lib/analytics";

// Mobile-only sticky CTA. On phones the hero form sits about one screen down,
// so paid traffic can land without a visible conversion action. This keeps
// the form one tap away from anywhere on the page.
export default function MartechStickyCTA() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const form = document.getElementById("martech-lead-form");
            const success = form?.innerText.includes("You're in the pipeline");
            // hide once the form is on screen or already submitted
            const formVisible = form
                ? form.getBoundingClientRect().top < window.innerHeight * 0.9 &&
                  form.getBoundingClientRect().bottom > 0
                : false;
            setShow(window.scrollY > 400 && !formVisible && !success);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToForm = () => {
        const form = document.getElementById("martech-lead-form");

        // Tracked separately from the inline CTAs — mobile sticky clicks say
        // something different about intent, and this is mobile-only.
        trackCTAClick("Get My Free Stack Audit", "sticky-mobile", "scroll-to-form");

        if (!form) return;
        form.scrollIntoView({ behavior: "smooth", block: "center" });
        const first = form.querySelector("input");
        if (first) setTimeout(() => first.focus({ preventScroll: true }), 600);
    };

    return (
        <div
            // sits above the chat widget, which occupies the bottom-right corner
            className={`lg:hidden fixed bottom-24 left-0 right-0 z-40 px-4 transition-all duration-300 ${
                show
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0 pointer-events-none"
            }`}
        >
            <button
                onClick={scrollToForm}
                className="w-full bg-[#ed5145] hover:bg-[#d8453a] transition-colors rounded-full py-3.5 text-weight-bold text-white shadow-lg shadow-black/50"
            >
                Get My Free Stack Audit →
            </button>
        </div>
    );
}
