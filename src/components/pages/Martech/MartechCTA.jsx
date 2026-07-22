"use client";

import { useRouter } from "next/navigation";

// CTA used at every conversion point on the martech pages. Scrolls to the
// lead form when it's on the current page, otherwise navigates to it.
export default function MartechCTA({ title = "Get My Free Stack Audit" }) {
    const router = useRouter();

    const handleClick = () => {
        const form = document.getElementById("martech-lead-form");
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
