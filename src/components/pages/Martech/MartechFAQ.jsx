"use client";

import { useState } from "react";
import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import MartechCTA from "./MartechCTA";
import martechFaqs from "@/data/martechFaqs";
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

/**
 * Renders an FAQ accordion. Defaults to the hub set so the existing
 * <MartechFAQ /> call on /martech keeps working with no props.
 *
 * Pass `faqs` to render a page-specific set — see data/martechFaqs.js. The
 * matching FAQPage JSON-LD is emitted by the route, not here, because this is a
 * client component.
 */
export default function MartechFAQ({
    faqs = martechFaqs.hub,
    heading = "Questions Marketing Leaders Ask Us",
    ctaTitle = "Still Have Questions? Talk to Us",
}) {
    const [open, setOpen] = useState(0);

    if (!faqs?.length) return null;

    return (
        <section id="martech-faq">
            <div className="padding-global py-16">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="about-features-wrapper">
                        <AnimatedInViewDiv className="about-features-header">
                            <div className="header">
                                <h2 className="heading-4 text-weight-medium">
                                    {heading}
                                </h2>
                            </div>
                        </AnimatedInViewDiv>

                        <div className="w-full max-w-4xl mx-auto flex flex-col gap-3">
                            {faqs.map((faq, index) => (
                                <AnimatedInViewDiv
                                    key={faq.question}
                                    delay={index * 0.05}
                                    className="border border-gray-200 rounded-lg bg-[#F7F7F5] overflow-hidden"
                                >
                                    <button
                                        onClick={() => {
                                            const opening = open !== index;
                                            setOpen(opening ? index : -1);
                                            // Only the open, not the close. Which question they
                                            // expand is the objection they actually have.
                                            if (opening) {
                                                trackEvent(ANALYTICS_EVENTS.FAQ_OPEN, {
                                                    faq_question: faq.question,
                                                    faq_position: index + 1,
                                                    faq_section: heading,
                                                });
                                            }
                                        }}
                                        className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-[#F7F7F5] transition-colors"
                                        aria-expanded={open === index}
                                    >
                                        <span className="text-weight-medium">{faq.question}</span>
                                        <span
                                            className={`text-[#E0362C] text-xl transition-transform duration-300 ${
                                                open === index ? "rotate-45" : ""
                                            }`}
                                        >
                                            +
                                        </span>
                                    </button>
                                    {open === index && (
                                        <div className="px-6 pb-6 text-size-small opacity-60">
                                            {faq.answer}
                                        </div>
                                    )}
                                </AnimatedInViewDiv>
                            ))}
                        </div>

                        <AnimatedInViewDiv className="double-button-component margin-top-button-features">
                            <MartechCTA title={ctaTitle} location="faq" />
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    );
}
