"use client";

import { useRouter } from "next/navigation";
import { trackCTAClick } from "@/lib/analytics";

// CTA used at every conversion point on the martech pages. Scrolls to the
// lead form when it's on the current page, otherwise navigates to it.
//
// `location` identifies which section the click came from — it becomes
// cta_location in GA4, which is how we tell whether the pricing argument, the
// process section or the FAQ is actually driving intent.
export default function MartechCTA({
    title = "Get My Free Stack Audit",
    location = "martech",
}) {
    const router = useRouter();

    const handleClick = () => {
        const form = document.getElementById("martech-lead-form");

        trackCTAClick(title, location, form ? "scroll-to-form" : "navigate-to-hub");

        if (form) {
            form.scrollIntoView({ behavior: "smooth", block: "center" });
            const first = form.querySelector("input");
            if (first) setTimeout(() => first.focus({ preventScroll: true }), 600);
        } else {
            router.push("/martech#martech-lead-form");
        }
    };

    return (
        <button onClick={handleClick} className="primary-button w-inline-block">
            <div className="relative">
                <div className="text-size-small text-weight-bold">{title}</div>
            </div>
            <div className="button-elipse"></div>
        </button>
    );
}
