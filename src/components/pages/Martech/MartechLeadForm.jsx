"use client";

import { useState, useRef, useEffect } from "react";
import { trackEvent, trackFormInteraction, ANALYTICS_EVENTS } from "@/lib/analytics";
import { getLeadEventId, trackLeadSubmit } from "@/lib/trackLead";
import { clickIdPayload } from "@/lib/clickIds";
import { getUTMData } from "@/hooks/useUTMTracking";

// Kept in sync with the service card titles and with formServiceForSlug in
// data/martechPages.js — a mismatch means the pre-select silently fails.
const SERVICES = [
    "AI Ad Intelligence & Ad-Ops",
    "Marketing Automation (AtoEmail)",
    "Influencer Marketing Platform (Zyflus)",
    "B2B Lead Generation & Sales Intelligence",
    "B2B Lead CRM",
    "Instagram DM Automation & Scrapers",
    "AI Calling Agent & Call Center",
    "Neural Creative Analysis (TRIBE v2)",
    "AI Proposal Generator (Branded)",
    "MCP Integration & AI Enablement",
    "Shopify / E-Commerce Store",
    "Agency Partnership / White Label",
    "Not sure yet, advise me",
];

const BUDGETS = [
    "Under ₹5 Lakh",
    "₹5 - ₹15 Lakh",
    "₹15 - ₹40 Lakh",
    "₹40 Lakh+",
    "Custom amount…",
    "Prefer not to say",
];
const TIMELINES = ["ASAP", "Within a month", "1-3 months", "Exploring options"];

/**
 * @param defaultService  Pre-selects the service dropdown. Passed by product
 *   pages so a visitor who read the AI Call Center page isn't asked to restate
 *   what they came for. Still editable — pre-select, don't lock.
 * @param source  Recorded as lead_source, e.g. "martech/ai-call-center", so the
 *   leads table shows which page produced the lead. Previously every martech
 *   lead recorded as just "martech".
 * @param services / @param budgets  Option lists for the dropdowns. Defaults are
 *   the martech set; the US-targeted AI services pages pass their own so US
 *   visitors are not offered martech product names or rupee budget bands.
 */
export default function MartechLeadForm({
    compact = false,
    defaultService = "",
    source = "martech",
    services = SERVICES,
    budgets = BUDGETS,
    // The hub asks about the whole stack; a product page is a quote request for
    // one thing. Same form, different promise. Reserve "stack audit" wording for
    // the hub and, later, the self-serve scanner.
    heading = "Get Your Free MarTech Stack Audit",
    subheading = "Tell us what you're running. We'll show you what to build, replace and keep. No obligation.",
    // The button should describe what submitting actually does. This form
    // collects service, budget and timeline — that's a quote request.
    submitLabel = "Send My Details →",
}) {
    const [form, setForm] = useState({
        fullName: "",
        workEmail: "",
        phone: "",
        service: defaultService,
        budget: "",
        timeline: "",
        projectSummary: "",
    });
    const [customBudget, setCustomBudget] = useState(false);
    const [status, setStatus] = useState("idle"); // idle | loading | success | error

    // Abandonment tracking. A conversion rate tells you people didn't finish;
    // this tells you which field they stopped at, which is the one to cut.
    const started = useRef(false);
    const lastField = useRef(null);
    const submitted = useRef(false);

    const set = (key) => (e) => {
        lastField.current = key;

        if (!started.current) {
            started.current = true;
            trackFormInteraction("martech_form", "start", {
                form_source: source,
                first_field: key,
            });
        }

        setForm((f) => ({ ...f, [key]: e.target.value }));
    };

    useEffect(() => {
        // pagehide rather than beforeunload: it fires reliably on mobile and on
        // bfcache navigations, where beforeunload often does not.
        const onLeave = () => {
            if (!started.current || submitted.current) return;
            trackEvent(ANALYTICS_EVENTS.FORM_ABANDON, {
                form_source: source,
                abandoned_at: lastField.current,
                fields_completed: Object.values(form).filter(Boolean).length,
            });
        };

        window.addEventListener("pagehide", onLeave);
        return () => window.removeEventListener("pagehide", onLeave);
    }, [form, source]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === "loading") return;
        setStatus("loading");

        // Prefer the live URL, but fall back to stored attribution — a visitor
        // who landed on an ad and then browsed to another page would otherwise
        // submit with no UTMs at all.
        const params = new URLSearchParams(window.location.search);
        const stored = getUTMData();
        const attributed = { ...stored.first_touch, ...stored.last_touch };
        const utm = (key) => params.get(key) || attributed[key] || null;

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    // Leads from the AI services cluster must not be labeled
                    // MarTech in the admin: the prefix follows the page family.
                    service: `${source.startsWith("services/") ? "AI Services" : "MarTech"}: ${form.service || "General"}`,
                    timeline: form.timeline || "Exploring options",
                    lead_source: source,
                    landing_page: window.location.pathname,
                    referrer: document.referrer || "direct",
                    utm_source: utm("utm_source"),
                    utm_medium: utm("utm_medium"),
                    utm_campaign: utm("utm_campaign"),
                    utm_term: utm("utm_term"),
                    utm_content: utm("utm_content"),
                    attribution_data: stored,
                    privacyConsent: true,
                    meta_event_id: getLeadEventId(),
                    ...clickIdPayload(),
                }),
            });
            if (res.ok) {
                submitted.current = true;
                trackLeadSubmit({
                    form: source,
                    service: form.service,
                    budget: form.budget,
                });
            }
            setStatus(res.ok ? "success" : "error");
        } catch {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div
                id="martech-lead-form"
                className="border border-[#E0362C]/40 rounded-lg p-8 bg-[#E0362C]/[0.06] flex flex-col items-center gap-3 text-center"
            >
                <div className="heading-5 text-weight-bold text-[#E0362C]">
                    You&apos;re in the pipeline ✓
                </div>
                <p className="opacity-85 text-size-small">
                    Thanks, {form.fullName.split(" ")[0] || "there"}. We&apos;ll get back to
                    you within one business day. Meanwhile, feel free to click through the
                    live products above.
                </p>
            </div>
        );
    }

    // data-clarity-mask: Clarity project masking should be Relaxed so marketing
    // copy is readable in recordings and heatmaps. This form is the exception —
    // it collects names, emails and phone numbers, so it stays masked.
    return (
        <form
            id="martech-lead-form"
            onSubmit={handleSubmit}
            data-clarity-mask="true"
            className="border border-[#17171A]/10 rounded-lg p-6 lg:p-8 bg-white backdrop-blur flex flex-col gap-4 w-full text-left"
        >
            <div>
                <div className="text-size-large text-weight-bold">{heading}</div>
                <p className="text-size-small opacity-70 mt-1">{subheading}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                    required
                    type="text"
                    placeholder="Full name *"
                    value={form.fullName}
                    onChange={set("fullName")}
                    className="martech-input"
                />
                <input
                    required
                    type="email"
                    placeholder="Work email *"
                    value={form.workEmail}
                    onChange={set("workEmail")}
                    className="martech-input"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                    type="tel"
                    placeholder="Phone / WhatsApp"
                    value={form.phone}
                    onChange={set("phone")}
                    className="martech-input"
                />
                <select
                    required
                    value={form.service}
                    onChange={set("service")}
                    className="martech-input"
                >
                    <option value="" disabled>
                        What do you need? *
                    </option>
                    {services.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {customBudget ? (
                    <div className="relative">
                        <input
                            autoFocus
                            type="text"
                            placeholder="Your budget, e.g. ₹8 Lakh"
                            value={form.budget}
                            onChange={set("budget")}
                            className="martech-input pr-9"
                        />
                        <button
                            type="button"
                            aria-label="Back to budget ranges"
                            onClick={() => {
                                setCustomBudget(false);
                                setForm((f) => ({ ...f, budget: "" }));
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 text-[#17171A]/75"
                        >
                            ×
                        </button>
                    </div>
                ) : (
                    <select
                        value={form.budget}
                        onChange={(e) => {
                            if (e.target.value === "Custom amount…") {
                                setCustomBudget(true);
                                setForm((f) => ({ ...f, budget: "" }));
                            } else {
                                setForm((f) => ({ ...f, budget: e.target.value }));
                            }
                        }}
                        className="martech-input"
                    >
                        <option value="" disabled>
                            Budget range (INR)
                        </option>
                        {budgets.map((b) => (
                            <option key={b} value={b}>
                                {b}
                            </option>
                        ))}
                    </select>
                )}
                <select
                    required
                    value={form.timeline}
                    onChange={set("timeline")}
                    className="martech-input"
                >
                    <option value="" disabled>
                        Timeline *
                    </option>
                    {TIMELINES.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
            </div>

            {!compact && (
                <textarea
                    rows={3}
                    placeholder="Anything else? Current tools, pain points, goals…"
                    value={form.projectSummary}
                    onChange={set("projectSummary")}
                    className="martech-input resize-none"
                />
            )}

            <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#E0362C] hover:bg-[#B3261A] transition-colors rounded-lg py-3.5 text-weight-bold disabled:opacity-80"
            >
                {status === "loading" ? "Sending…" : submitLabel}
            </button>

            {status === "error" && (
                <p className="text-size-small text-[#E0362C]">
                    Something went wrong, please try again or email contact@stackbinary.io.
                </p>
            )}

            <p className="text-size-small opacity-40">
                Response within one business day · Your data stays with us
            </p>

            <style jsx>{`
                .martech-input {
                    background: #ffffff;
                    border: 1px solid #d5d5d9;
                    border-radius: 0.5rem;
                    padding: 0.85rem 1rem;
                    font-size: 1rem;
                    color: #17171A;
                    width: 100%;
                    outline: none;
                    transition: border-color 0.2s;
                }
                .martech-input:focus {
                    border-color: #E0362C;
                }
                .martech-input::placeholder {
                    color: rgba(0, 0, 0, 0.45);
                }
                select.martech-input:invalid,
                select.martech-input option[value=""] {
                    color: rgba(0, 0, 0, 0.45);
                }
                select.martech-input option {
                    background: #ffffff;
                    color: #17171A;
                }
            `}</style>
        </form>
    );
}
