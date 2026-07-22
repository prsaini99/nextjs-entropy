"use client";

import { useState } from "react";

const SERVICES = [
    "AI Ad Intelligence & Ad-Ops",
    "Marketing Automation (AtoEmail)",
    "Influencer Marketing (Zyflus)",
    "Lead Gen & Sales Intelligence",
    "B2B Lead CRM",
    "Social Bots & Scrapers",
    "AI Call Center",
    "Neural Creative Analysis (TRIBE v2)",
    "AI Branded Proposal Maker",
    "MCP & AI Ecosystem Integration",
    "Shopify / E-Commerce Store",
    "Not sure yet — advise me",
];

const BUDGETS = ["< $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Prefer not to say"];
const TIMELINES = ["ASAP", "Within a month", "1–3 months", "Exploring options"];

export default function MartechLeadForm({ compact = false }) {
    const [form, setForm] = useState({
        fullName: "",
        workEmail: "",
        phone: "",
        service: "",
        budget: "",
        timeline: "",
        projectSummary: "",
    });
    const [status, setStatus] = useState("idle"); // idle | loading | success | error

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === "loading") return;
        setStatus("loading");

        const params = new URLSearchParams(window.location.search);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    service: `MarTech — ${form.service || "General"}`,
                    timeline: form.timeline || "Exploring options",
                    lead_source: "martech",
                    landing_page: window.location.pathname,
                    referrer: document.referrer || "direct",
                    utm_source: params.get("utm_source"),
                    utm_medium: params.get("utm_medium"),
                    utm_campaign: params.get("utm_campaign"),
                    utm_term: params.get("utm_term"),
                    utm_content: params.get("utm_content"),
                    privacyConsent: true,
                }),
            });
            setStatus(res.ok ? "success" : "error");
        } catch {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div
                id="martech-lead-form"
                className="border border-[#ed5145]/40 rounded-lg p-8 bg-[#ed5145]/[0.06] flex flex-col items-center gap-3 text-center"
            >
                <div className="heading-5 text-weight-bold text-[#ed5145]">
                    You&apos;re in the pipeline ✓
                </div>
                <p className="opacity-70 text-size-small">
                    Thanks, {form.fullName.split(" ")[0] || "there"} — we&apos;ll get back to
                    you within one business day. Meanwhile, feel free to click through the
                    live products above.
                </p>
            </div>
        );
    }

    return (
        <form
            id="martech-lead-form"
            onSubmit={handleSubmit}
            className="border border-white/15 rounded-lg p-6 lg:p-8 bg-white/[0.04] backdrop-blur flex flex-col gap-4 w-full text-left"
        >
            <div>
                <div className="text-size-large text-weight-bold">
                    Get Your Free MarTech Stack Audit
                </div>
                <p className="text-size-small opacity-50 mt-1">
                    Tell us what you&apos;re running — we&apos;ll show you what to build,
                    replace and keep. No obligation.
                </p>
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
                    {SERVICES.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <select value={form.budget} onChange={set("budget")} className="martech-input">
                    <option value="" disabled>
                        Budget range
                    </option>
                    {BUDGETS.map((b) => (
                        <option key={b} value={b}>
                            {b}
                        </option>
                    ))}
                </select>
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
                className="bg-[#ed5145] hover:bg-[#d8453a] transition-colors rounded-lg py-3.5 text-weight-bold disabled:opacity-60"
            >
                {status === "loading" ? "Sending…" : "Get My Free Stack Audit →"}
            </button>

            {status === "error" && (
                <p className="text-size-small text-[#ed5145]">
                    Something went wrong — please try again or email contact@stackbinary.io.
                </p>
            )}

            <p className="text-size-small opacity-40">
                Response within one business day · Your data stays with us
            </p>

            <style jsx>{`
                .martech-input {
                    background: rgba(0, 0, 0, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 0.5rem;
                    padding: 0.75rem 1rem;
                    font-size: 0.875rem;
                    color: #fff;
                    width: 100%;
                    outline: none;
                    transition: border-color 0.2s;
                }
                .martech-input:focus {
                    border-color: #ed5145;
                }
                .martech-input::placeholder {
                    color: rgba(255, 255, 255, 0.4);
                }
                select.martech-input:invalid,
                select.martech-input option[value=""] {
                    color: rgba(255, 255, 255, 0.4);
                }
                select.martech-input option {
                    background: #111;
                    color: #fff;
                }
            `}</style>
        </form>
    );
}
