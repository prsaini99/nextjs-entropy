"use client";

import { useState } from "react";
import { trackEvent, trackFormInteraction, ANALYTICS_EVENTS } from "@/lib/analytics";
import { trackLeadSubmit } from "@/lib/trackLead";
import { clickIdPayload } from "@/lib/clickIds";
import { getUTMData } from "@/hooks/useUTMTracking";

// The /ai-automation campaign page. Positioning: the diagnostician, not the
// build-anything shop — "we find the highest-ROI automation and ship it in
// 2-3 weeks, owned outright, wired into what you already run."
//
// The jobs list below is demand-ordered from Keyword Planner (India,
// 2026-08-05): WhatsApp ~6k/mo combined, invoices/AP ~6.5k, email journeys
// ~7k (tool-heavy, agency slice real), data entry ~1k, calls proven by our
// own campaign, lead follow-up = the speed-to-lead thesis. Card copy uses
// the searchers' own vocabulary deliberately.
const JOBS = [
    {
        title: "WhatsApp Replies & Follow-Ups",
        description:
            "Auto-replies that actually answer, order and appointment confirmations, and follow-up sequences on the official WhatsApp Business API — the channel your customers already live on.",
    },
    {
        title: "Invoices & Accounts Payable",
        description:
            "Invoices land in one inbox, AI extracts every line item, flags mismatches against purchase orders, and posts clean entries into your accounting system for one-click approval.",
    },
    {
        title: "Email Journeys That Run Themselves",
        description:
            "Welcome series, nurture, win-back and drip campaigns triggered by real behaviour — sent from infrastructure you own, with no per-contact pricing.",
    },
    {
        title: "Calls Answered & Appointments Booked",
        description:
            "An AI receptionist that picks up 24/7 in your customer's language, qualifies the caller, books the slot, and logs the conversation to your CRM.",
    },
    {
        title: "Data Entry & Document Processing",
        description:
            "The copy-paste work: forms, PDFs and spreadsheets read by AI and written into your systems — validated, flagged when unsure, and audit-trailed.",
    },
    {
        title: "Lead Follow-Up & CRM Updates",
        description:
            "Every new enquiry gets a response in under a minute — call, WhatsApp or email — and your CRM updates itself. Speed-to-lead, without hiring for it.",
    },
];

const STORIES = [
    {
        tag: "Healthcare",
        title: "The clinic chain that stopped playing phone-tag",
        body: "A multi-branch clinic was losing bookings to phone-tag: front desks busy at exactly the hours patients call, nobody answering after 7pm. Now an AI receptionist answers every call, books directly into each branch's calendar, and WhatsApp-confirms the appointment before the caller has put the phone down. Reception went back to the patients standing in front of them — and roughly 20 hours a week of phone-tag disappeared.",
    },
    {
        tag: "Distribution",
        title: "The distributor that closed month-end in an afternoon",
        body: "A trading business was hand-typing hundreds of supplier invoices a month — slow, error-prone, always behind. Now invoices land in one inbox, AI extracts every line item, flags mismatches against purchase orders, and posts clean entries for a human to approve in one click. Month-end closing went from a week of overtime to an afternoon.",
    },
    {
        tag: "Real Estate",
        title: "The brokerage where no lead goes cold",
        body: "A brokerage was generating portal leads faster than its agents could dial. Now every new enquiry gets a call within a minute, a WhatsApp with matching listings, and an email sequence that nudges until the visit is booked — every touch logged to the CRM automatically. Same ad spend, same team; nothing leaks between enquiry and site visit.",
    },
];

const FAQS = [
    {
        q: "Do we have to replace the tools we already use?",
        a: "No — and this is the point most people worry about needlessly. We build automations to plug into what you already run: your CRM, your accounting software, your calendars, your WhatsApp Business account, your spreadsheets. The automation does the repetitive work between your existing systems; it does not ask you to migrate off them.",
    },
    {
        q: "How long does it take?",
        a: "A single working automation goes live in 2–3 weeks. We deliberately scope one automation at a time — the highest-ROI one first — rather than proposing a six-month transformation.",
    },
    {
        q: "What does it cost?",
        a: "It depends on the automation, but the shape is fixed: a one-time build, owned outright. No per-seat licences, no per-contact pricing, no subscription that grows with your team. Tell us where the hours go and we'll give you a straight number.",
    },
    {
        q: "What if we don't know what to automate?",
        a: "That's the normal starting point — it's what the form below is for. Tell us where your team's hours actually go, and we'll reply with the three automations worth building first and what each would save you. No obligation.",
    },
    {
        q: "Who owns the automation afterwards?",
        a: "You do. The code, the data, the accounts it runs on. If we part ways, everything keeps working and keeps being yours.",
    },
];

const HOUR_SINKS = [
    "Chasing and following up leads",
    "Answering calls & booking appointments",
    "WhatsApp replies & confirmations",
    "Invoices, billing & data entry",
    "Email campaigns & follow-ups",
    "Reports & copy-paste between tools",
];

const TEAM_SIZES = ["1–5", "6–20", "21–50", "51–200", "200+"];
const BUDGETS = ["Under ₹1 Lakh", "₹1 – ₹5 Lakh", "₹5 – ₹15 Lakh", "₹15 Lakh+", "Not sure yet"];

function DiagnosticForm({ location }) {
    const [step, setStep] = useState(1);
    const [sinks, setSinks] = useState([]);
    const [teamSize, setTeamSize] = useState("");
    const [budget, setBudget] = useState("");
    const [contact, setContact] = useState({ fullName: "", workEmail: "", phone: "" });
    const [status, setStatus] = useState("idle");

    const toggleSink = (s) =>
        setSinks((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

    const step1Ok = sinks.length > 0 && teamSize;
    const step2Ok = contact.fullName.trim() && /\S+@\S+\.\S+/.test(contact.workEmail);

    const advance = () => {
        trackFormInteraction("ai_automation_diagnostic", "progress", { step: 1, location });
        setStep(2);
    };

    const submit = async (e) => {
        e.preventDefault();
        if (status === "loading") return;
        setStatus("loading");
        const params = new URLSearchParams(window.location.search);
        const stored = getUTMData();
        const attributed = { ...stored.first_touch, ...stored.last_touch };
        const utm = (key) => params.get(key) || attributed[key] || null;
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: contact.fullName,
                    workEmail: contact.workEmail,
                    phone: contact.phone,
                    service: "AI Automation (diagnostic)",
                    budget,
                    timeline: "Exploring options",
                    projectSummary: `Hours go to: ${sinks.join("; ")}. Team size: ${teamSize}.`,
                    lead_source: "martech",
                    landing_page: window.location.pathname,
                    referrer: document.referrer || "direct",
                    utm_source: utm("utm_source"),
                    utm_medium: utm("utm_medium"),
                    utm_campaign: utm("utm_campaign"),
                    utm_term: utm("utm_term"),
                    utm_content: utm("utm_content"),
                    attribution_data: stored,
                    privacyConsent: true,
                    ...clickIdPayload(),
                }),
            });
            if (res.ok) {
                trackLeadSubmit({ form: "ai_automation_diagnostic", service: "AI Automation", budget });
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="border border-gray-200 rounded-lg p-6 lg:p-8 bg-[#F7F7F5] flex flex-col gap-4">
                <div className="heading-6 text-weight-bold">Got it. Watch your inbox.</div>
                <p className="text-size-regular opacity-85">
                    Within one business day you&apos;ll get the three automations worth building
                    first for a team like yours — and what each would save you. A person writes
                    this, not a bot.
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={submit}
            className="border border-gray-200 rounded-lg p-6 lg:p-8 bg-[#F7F7F5] flex flex-col gap-4"
        >
            <div className="heading-6 text-weight-bold">Get Your Top 3 Automations</div>
            <p className="text-size-small opacity-85">
                Tell us where the hours go. We&apos;ll reply within one business day with the three
                automations worth building first — and what each would save you. No obligation.
            </p>

            {step === 1 && (
                <>
                    <div className="text-size-small text-weight-bold">
                        Where do your team&apos;s hours go? (pick any)
                    </div>
                    <div className="flex flex-col gap-2">
                        {HOUR_SINKS.map((s) => (
                            <label key={s} className="flex items-start gap-3 cursor-pointer text-size-small">
                                <input
                                    type="checkbox"
                                    checked={sinks.includes(s)}
                                    onChange={() => toggleSink(s)}
                                    className="mt-1 w-4 h-4 text-red-600 focus:ring-red-500 border-gray-400 rounded bg-white"
                                />
                                <span>{s}</span>
                            </label>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <select
                            value={teamSize}
                            onChange={(e) => setTeamSize(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
                        >
                            <option value="">Team size *</option>
                            {TEAM_SIZES.map((t) => (
                                <option key={t}>{t}</option>
                            ))}
                        </select>
                        <select
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
                        >
                            <option value="">Budget range</option>
                            {BUDGETS.map((b) => (
                                <option key={b}>{b}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="button"
                        disabled={!step1Ok}
                        onClick={advance}
                        className="primary-button w-inline-block disabled:opacity-50"
                    >
                        <div className="relative">
                            <div className="text-size-small text-weight-bold">Next → almost there</div>
                        </div>
                        <div className="button-elipse"></div>
                    </button>
                </>
            )}

            {step === 2 && (
                <>
                    <input
                        type="text"
                        placeholder="Full name *"
                        value={contact.fullName}
                        onChange={(e) => setContact({ ...contact, fullName: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500"
                    />
                    <input
                        type="email"
                        placeholder="Work email *"
                        value={contact.workEmail}
                        onChange={(e) => setContact({ ...contact, workEmail: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500"
                    />
                    <input
                        type="tel"
                        placeholder="Phone / WhatsApp"
                        value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500"
                    />
                    <button
                        type="submit"
                        disabled={!step2Ok || status === "loading"}
                        className="primary-button w-inline-block disabled:opacity-50"
                    >
                        <div className="relative">
                            <div className="text-size-small text-weight-bold">
                                {status === "loading" ? "Sending…" : "Get My Top 3 Automations →"}
                            </div>
                        </div>
                        <div className="button-elipse"></div>
                    </button>
                    {status === "error" && (
                        <p className="text-size-small text-red-600">
                            Something went wrong — please try again, or email contact@stackbinary.io.
                        </p>
                    )}
                </>
            )}

            <p className="text-size-tiny opacity-70">
                Response within one business day · Your data stays with us
            </p>
        </form>
    );
}

export default function AiAutomationPage() {
    return (
        <div>
            {/* HERO + diagnostic form */}
            <section>
                <div className="padding-global">
                    <div className="w-layout-blockcontainer container w-container">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start py-12">
                            <div>
                                <div className="read-more-tag w-inline-block mb-6">
                                    <div className="text-size-small text-weight-bold">AI Automation Agency</div>
                                    <div className="text-size-small opacity-85">Built in weeks. Owned forever.</div>
                                </div>
                                <h1 className="heading-3 text-weight-bold mb-6">
                                    Your Team Is Doing Work a System Should Do.
                                </h1>
                                <p className="text-size-medium opacity-85 mb-6 max-width-60ch">
                                    We find it, price it, and automate it — live in 2–3 weeks, owned
                                    outright, and wired into the tools you already run. No
                                    rip-and-replace, no subscription stack, no six-month
                                    transformation project.
                                </p>
                                <div className="check-list">
                                    {[
                                        "One working automation live in 2–3 weeks, not a quarter",
                                        "Plugs into your existing CRM, accounting, calendars and WhatsApp",
                                        "Yours outright: code, data and accounts. Zero per-seat licences",
                                    ].map((item) => (
                                        <div key={item} className="check-item">
                                            <div className="check-icon-wrap">
                                                <img
                                                    width="14"
                                                    height="12"
                                                    alt=""
                                                    src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c65_Check%20Icon.svg"
                                                    className="check-icon"
                                                />
                                            </div>
                                            <div className="text-size-medium">{item}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <DiagnosticForm location="hero" />
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT WE AUTOMATE — demand-ordered */}
            <section>
                <div className="padding-global">
                    <div className="w-layout-blockcontainer container w-container">
                        <div className="header text-center mb-10">
                            <h2 className="heading-4 text-weight-bold mb-4">What We Automate</h2>
                            <p className="text-size-medium opacity-85 max-width-60ch mx-auto">
                                The six places business hours actually disappear — each one a system
                                we&apos;ve built before, working alongside the tools you already use.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {JOBS.map((job) => (
                                <div
                                    key={job.title}
                                    className="border border-gray-200 rounded-lg p-6 bg-[#F7F7F5]"
                                >
                                    <div className="heading-6 text-weight-bold mb-3">{job.title}</div>
                                    <p className="text-size-small opacity-85">{job.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* PATTERN STORIES */}
            <section>
                <div className="padding-global">
                    <div className="w-layout-blockcontainer container w-container">
                        <div className="header text-center mb-10">
                            <h2 className="heading-4 text-weight-bold mb-4">
                                The Shape of What We Build
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {STORIES.map((s) => (
                                <div key={s.title} className="border border-gray-200 rounded-lg p-6 lg:p-8">
                                    <div className="text-size-small text-weight-bold text-[#E0362C] mb-3">
                                        {s.tag}
                                    </div>
                                    <div className="heading-6 text-weight-bold mb-3">{s.title}</div>
                                    <p className="text-size-small opacity-85">{s.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section>
                <div className="padding-global">
                    <div className="w-layout-blockcontainer container w-container">
                        <div className="header text-center mb-10">
                            <h2 className="heading-4 text-weight-bold mb-4">How It Works</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    step: "01 · Diagnose",
                                    text: "Tell us where the hours go. We come back with the three automations worth building first, what each saves, and a straight price.",
                                },
                                {
                                    step: "02 · Build",
                                    text: "We ship the highest-ROI one first — live in 2–3 weeks, integrated with the CRM, accounting, calendar and WhatsApp you already run. Your team keeps working; nothing gets ripped out.",
                                },
                                {
                                    step: "03 · Own",
                                    text: "The automation is yours: code, data, accounts. No per-seat licences, no growing subscription. When it proves itself, we build the next one.",
                                },
                            ].map((s) => (
                                <div key={s.step} className="border border-gray-200 rounded-lg p-6 lg:p-8 bg-[#F7F7F5]">
                                    <div className="text-size-small text-weight-bold text-[#E0362C] mb-3">{s.step}</div>
                                    <p className="text-size-small opacity-85">{s.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section>
                <div className="padding-global">
                    <div className="w-layout-blockcontainer container w-container">
                        <div className="header text-center mb-10">
                            <h2 className="heading-4 text-weight-bold mb-4">Questions, Answered Straight</h2>
                        </div>
                        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
                            {FAQS.map((f) => (
                                <div key={f.q} className="border border-gray-200 rounded-lg p-6">
                                    <div className="text-size-medium text-weight-bold mb-2">{f.q}</div>
                                    <p className="text-size-small opacity-85">{f.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CLOSING CTA */}
            <section>
                <div className="padding-global">
                    <div className="w-layout-blockcontainer container w-container">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-12">
                            <div>
                                <h2 className="heading-4 text-weight-bold mb-4">
                                    Find Out What&apos;s Worth Automating First
                                </h2>
                                <p className="text-size-medium opacity-85 max-width-48ch">
                                    Two minutes of questions. One reply, from a person, with the three
                                    automations that would save your team the most hours — and what
                                    each costs to build.
                                </p>
                            </div>
                            <DiagnosticForm location="closing" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
