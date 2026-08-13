"use client";

import { useState } from "react";
import AnimatedInViewDiv from "@/components/Animate/AppearInView";
import MartechFAQ from "@/components/pages/Martech/MartechFAQ";
import { trackFormInteraction } from "@/lib/analytics";
import { getLeadEventId, trackLeadSubmit } from "@/lib/trackLead";
import { clickIdPayload } from "@/lib/clickIds";
import { getUTMData } from "@/hooks/useUTMTracking";

// The /ai-automation campaign page. Positioning: the diagnostician, not the
// build-anything shop — "we find the highest-ROI automation and ship it in
// 2-3 weeks, owned outright, wired into what you already run."
//
// Layout deliberately mirrors MartechHero/MartechProcess (hero-wrapper,
// heading-2, read-more-tag with vertical-line-tag, AnimatedInViewDiv
// staggers, py-16 sections, hover-accent cards) so the page reads as a
// sibling of /martech, not a cousin.
//
// The jobs list is demand-ordered from Keyword Planner (India, 2026-08-05):
// WhatsApp ~6k/mo combined, invoices/AP ~6.5k, email journeys ~7k, data
// entry ~1k, calls proven by our own campaign, lead follow-up = the
// speed-to-lead thesis. Card copy uses the searchers' own vocabulary.
// Each card leads with the AI capability (red eyebrow) and keeps the job
// in the title (the searcher's keyword). The descriptions name what the AI
// *understands*, not what the workflow *moves* — that distinction is the page.
const JOBS = [
    {
        tag: "AI that reads intent",
        title: "WhatsApp Replies & Follow-Ups",
        description:
            "Not canned auto-replies. An AI that understands what the customer is actually asking, answers from your business data in their language, follows up on its own, and hands to a human the moment it should, all on the official WhatsApp Business API.",
    },
    {
        tag: "AI that reads documents",
        title: "Invoices & Accounts Payable",
        description:
            "Invoices in any format: clean PDFs, scans, photos of paper. AI extracts every line item, checks it against purchase orders, flags what doesn't add up, and posts clean entries to your accounting system for one-click approval.",
    },
    {
        tag: "AI that writes",
        title: "Email Journeys That Run Themselves",
        description:
            "AI segments your list by real behaviour, drafts on-brand emails per segment, and picks the moment to send (welcome, nurture, win-back) from infrastructure you own, with no per-contact pricing.",
    },
    {
        tag: "AI that speaks",
        title: "Calls Answered & Appointments Booked",
        description:
            "An AI receptionist that picks up 24/7, follows when the caller switches language mid-sentence, qualifies intent, books the slot, and logs the whole conversation to your CRM.",
    },
    {
        tag: "AI that extracts",
        title: "Data Entry & Document Processing",
        description:
            "Forms, PDFs and spreadsheets read by AI and written into your systems, validated against your rules, flagged when unsure, audit-trailed on every field. The copy-paste job, retired.",
    },
    {
        tag: "AI that prioritises",
        title: "Lead Follow-Up & CRM Updates",
        description:
            "AI scores every new enquiry, responds in under a minute on the right channel (call, WhatsApp or email), personalises each touch, and keeps your CRM writing itself. Speed-to-lead, without hiring for it.",
    },
];

const STORIES = [
    {
        tag: "Healthcare",
        title: "The clinic chain that stopped playing phone-tag",
        body: "A multi-branch clinic was losing bookings to phone-tag: front desks busy at exactly the hours patients call, nobody answering after 7pm. Now an AI receptionist answers every call, books directly into each branch's calendar, and WhatsApp-confirms the appointment before the caller has put the phone down. Reception went back to the patients standing in front of them, and roughly 20 hours a week of phone-tag disappeared.",
    },
    {
        tag: "Distribution",
        title: "The distributor that closed month-end in an afternoon",
        body: "A trading business was hand-typing hundreds of supplier invoices a month: slow, error-prone, always behind. Now invoices land in one inbox, AI extracts every line item, flags mismatches against purchase orders, and posts clean entries for a human to approve in one click. Month-end closing went from a week of overtime to an afternoon.",
    },
    {
        tag: "Real Estate",
        title: "The brokerage where no lead goes cold",
        body: "A brokerage was generating portal leads faster than its agents could dial. Now every new enquiry gets a call within a minute, a WhatsApp with matching listings, and an email sequence that nudges until the visit is booked, with every touch logged to the CRM automatically. Same ad spend, same team; nothing leaks between enquiry and site visit.",
    },
];

// Shape matches data/martechFaqs.js so the shared MartechFAQ accordion
// renders these (open-tracking and all) exactly like the /martech page.
const FAQS = [
    {
        question: "Do we have to replace the tools we already use?",
        answer: "No, and this is the point most people worry about needlessly. We build automations to plug into what you already run: your CRM, your accounting software, your calendars, your WhatsApp Business account, your spreadsheets. The automation does the repetitive work between your existing systems; it does not ask you to migrate off them.",
    },
    {
        question: "How long does it take?",
        answer: "A single working automation goes live in 2-3 weeks. We deliberately scope one automation at a time, the highest-ROI one first, rather than proposing a six-month transformation.",
    },
    {
        question: "What does it cost?",
        answer: "It depends on the automation, but the shape is fixed: a one-time build, owned outright. No per-seat licences, no per-contact pricing, no subscription that grows with your team. Tell us where the hours go and we'll give you a straight number.",
    },
    {
        question: "What if we don't know what to automate?",
        answer: "That's the normal starting point. It's what the form on this page is for. Tell us where your team's hours actually go, and we'll reply with the three automations worth building first and what each would save you. No obligation.",
    },
    {
        question: "Who owns the automation afterwards?",
        answer: "You do. The code, the data, the accounts it runs on. If we part ways, everything keeps working and keeps being yours.",
    },
];

// Systems we plug into, named because every one is a fear disarmed and a
// keyword surfaced. The closing line covers the long tail honestly.
const INTEGRATIONS = [
    "WhatsApp Business API", "Tally", "Zoho", "HubSpot", "Salesforce",
    "Google Sheets & Workspace", "Razorpay", "Shopify", "Slack",
    "Gmail & Outlook", "Your calendar", "Your CRM",
];

const HERO_STATS = [
    { value: "2-3", label: "weeks from first call to a working automation, live" },
    { value: "0", label: "per-seat licences. A growing team is not a growing bill." },
    { value: "100+", label: "AI systems and automations shipped by the team behind this page" },
    { value: "1", label: "automation at a time, the highest-ROI one first" },
];

const HOUR_SINKS = [
    "Chasing and following up leads",
    "Answering calls & booking appointments",
    "WhatsApp replies & confirmations",
    "Invoices, billing & data entry",
    "Email campaigns & follow-ups",
    "Reports & copy-paste between tools",
];

const TEAM_SIZES = ["1-5", "6-20", "21-50", "51-200", "200+"];
const BUDGETS = ["Under ₹1 Lakh", "₹1 - ₹5 Lakh", "₹5 - ₹15 Lakh", "₹15 Lakh+", "Not sure yet"];

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
                    meta_event_id: getLeadEventId(),
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

    const fieldCls =
        "w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#E0362C] transition-colors";

    if (status === "success") {
        return (
            <div className="border border-gray-200 rounded-lg p-6 lg:p-8 bg-[#F7F7F5] flex flex-col gap-4">
                <div className="heading-6 text-weight-bold">Got it. Watch your inbox.</div>
                <p className="text-size-regular opacity-85">
                    Within one business day you&apos;ll get the three automations worth building
                    first for a team like yours, and what each would save you. A person writes
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
            <div>
                <div className="flex items-baseline justify-between gap-3">
                    <div className="heading-6 text-weight-bold">Get Your Top 3 Automations</div>
                    <div className="text-size-tiny opacity-70 whitespace-nowrap">Step {step} of 2</div>
                </div>
                <p className="text-size-small opacity-85 mt-2">
                    Tell us where the hours go. We&apos;ll reply within one business day with the
                    three automations worth building first, and what each would save you. No
                    obligation.
                </p>
            </div>

            {step === 1 && (
                <>
                    <div className="text-size-small text-weight-bold">
                        Where do your team&apos;s hours go? (pick any)
                    </div>
                    <div className="flex flex-col gap-2">
                        {HOUR_SINKS.map((s) => (
                            <label
                                key={s}
                                className={`flex items-start gap-3 cursor-pointer text-size-small border rounded-lg px-4 py-2.5 bg-white transition-colors ${
                                    sinks.includes(s)
                                        ? "border-[#E0362C]"
                                        : "border-gray-200 hover:border-gray-400"
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={sinks.includes(s)}
                                    onChange={() => toggleSink(s)}
                                    className="mt-0.5 w-4 h-4 text-red-600 focus:ring-red-500 border-gray-400 rounded bg-white"
                                />
                                <span>{s}</span>
                            </label>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <select value={teamSize} onChange={(e) => setTeamSize(e.target.value)} className={fieldCls}>
                            <option value="">Team size *</option>
                            {TEAM_SIZES.map((t) => (
                                <option key={t}>{t}</option>
                            ))}
                        </select>
                        <select value={budget} onChange={(e) => setBudget(e.target.value)} className={fieldCls}>
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
                        className="primary-button w-inline-block disabled:opacity-40 disabled:cursor-not-allowed"
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
                    <p className="text-size-small opacity-85">
                        Last step. We reply by email, and there is no sales call unless you ask
                        for one.
                    </p>
                    <input
                        type="text"
                        autoFocus
                        placeholder="Full name *"
                        value={contact.fullName}
                        onChange={(e) => setContact({ ...contact, fullName: e.target.value })}
                        className={fieldCls}
                    />
                    <input
                        type="email"
                        placeholder="Work email *"
                        value={contact.workEmail}
                        onChange={(e) => setContact({ ...contact, workEmail: e.target.value })}
                        className={fieldCls}
                    />
                    <input
                        type="tel"
                        placeholder="Phone / WhatsApp"
                        value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                        className={fieldCls}
                    />
                    <button
                        type="submit"
                        disabled={!step2Ok || status === "loading"}
                        className="primary-button w-inline-block disabled:opacity-40 disabled:cursor-not-allowed"
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
                            Something went wrong. Please try again, or email contact@stackbinary.io.
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
            {/* HERO, mirrors MartechHero: hero-wrapper clears the nav, badge with
                divider, heading-2, red-check list, form right, stat strip below. */}
            <section>
                <div className="padding-global">
                    <div className="w-layout-blockcontainer container w-container">
                        <div className="hero-wrapper">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full pt-6">
                                <AnimatedInViewDiv className="flex flex-col gap-8 text-left items-start">
                                    <div className="read-more-tag w-inline-block">
                                        <div className="text-size-small text-weight-bold">
                                            AI Automation Agency
                                        </div>
                                        <div className="vertical-line-tag"></div>
                                        <div className="text-size-small opacity-70">
                                            Built in weeks. Owned forever.
                                        </div>
                                    </div>
                                    <h1 className="heading-2 text-weight-bold">
                                        Your Team Is Doing Work a System Should Do.
                                    </h1>
                                    <p className="opacity-80">
                                        We find it, price it, and automate it with AI that does the
                                        judgment work: reading documents, understanding callers,
                                        drafting replies. Live in 2-3 weeks because we build with
                                        AI too, owned outright, and wired into the tools you
                                        already run. No rip-and-replace, no six-month
                                        transformation project.
                                    </p>
                                    <ul className="flex flex-col gap-2">
                                        {[
                                            "One working automation live in 2-3 weeks, not a quarter",
                                            "Plugs into your existing CRM, accounting, calendars and WhatsApp",
                                            "Yours outright: code, data and accounts. Zero per-seat licences",
                                        ].map((point) => (
                                            <li key={point} className="flex gap-3 text-size-small opacity-80">
                                                <span className="text-[#E0362C]">✓</span>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </AnimatedInViewDiv>

                                <AnimatedInViewDiv delay={0.2} className="w-full">
                                    <DiagnosticForm location="hero" />
                                </AnimatedInViewDiv>
                            </div>

                            <AnimatedInViewDiv delay={0.4} className="w-full">
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px mt-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-200">
                                    {HERO_STATS.map((stat) => (
                                        <div
                                            key={stat.label}
                                            className="bg-[#F7F7F5] p-6 lg:p-8 flex flex-col gap-2"
                                        >
                                            <div className="heading-4 text-weight-bold text-[#E0362C]">
                                                {stat.value}
                                            </div>
                                            <p className="text-size-small opacity-80">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </AnimatedInViewDiv>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHAT WE AUTOMATE */}
            <section>
                <div className="padding-global py-16">
                    <div className="w-layout-blockcontainer container w-container">
                        <AnimatedInViewDiv className="header text-center mb-12 mx-auto">
                            <h2 className="heading-4 text-weight-medium mb-4">What We Automate</h2>
                            <p className="opacity-80 max-width-60ch mx-auto">
                                The six places business hours actually disappear, and the AI
                                capability that takes each one over, working alongside the tools
                                you already use.
                            </p>
                        </AnimatedInViewDiv>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {JOBS.map((job, i) => (
                                <AnimatedInViewDiv
                                    key={job.title}
                                    delay={0.05 * i}
                                    className="border border-gray-200 rounded-lg p-6 lg:p-8 bg-[#F7F7F5] hover:border-[#E0362C]/60 transition-colors flex flex-col gap-3"
                                >
                                    <div className="text-size-small text-weight-bold text-[#E0362C] uppercase tracking-wide">
                                        {job.tag}
                                    </div>
                                    <div className="heading-6 text-weight-bold">{job.title}</div>
                                    <p className="text-size-small opacity-80">{job.description}</p>
                                </AnimatedInViewDiv>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* AI AUTOMATION, NOT JUST AUTOMATION, the differentiator section.
                Two senses of AI, both true: AI inside the automations (judgment
                work, not brittle rules) and AI in the building (why 2-3 weeks
                is honest). The H2 carries the target keyword verbatim. */}
            <section>
                <div className="padding-global py-16">
                    <div className="w-layout-blockcontainer container w-container">
                        <AnimatedInViewDiv className="header text-center mb-12 mx-auto">
                            <h2 className="heading-4 text-weight-medium mb-4">
                                AI Automation, Not Just Automation
                            </h2>
                            <p className="opacity-80 max-width-60ch mx-auto">
                                Old automation was if-this-then-that rules, and it broke the moment
                                reality didn&apos;t match the template. AI changes what a business
                                can hand over.
                            </p>
                        </AnimatedInViewDiv>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "AI does the judgment work",
                                    text: "Reading a messy invoice, understanding a caller who switches languages mid-sentence, drafting a reply that sounds like your business, deciding which lead is worth a call first. Rule-based automation cannot do any of that. AI is the difference between automating the tidy 20% and automating the real work.",
                                },
                                {
                                    title: "Built with AI, that's the 2-3 weeks",
                                    text: "The same shift changed how software gets built. Our engineers ship AI-accelerated, which is how a working automation goes live in weeks instead of quarters, at a price that used to buy a discovery phase. It's the same way we've shipped 100+ systems of our own.",
                                },
                                {
                                    title: "And it knows when to stop",
                                    text: "Good AI automation is honest about its limits: confidence thresholds, human approval steps on anything that matters, and an audit trail for every decision. When it isn't sure, it asks a person, so you get the hours back without giving up control.",
                                },
                            ].map((c, i) => (
                                <AnimatedInViewDiv
                                    key={c.title}
                                    delay={0.1 * i}
                                    className="border border-gray-200 rounded-lg p-6 lg:p-8 bg-[#F7F7F5] hover:border-[#E0362C]/60 transition-colors flex flex-col gap-3"
                                >
                                    <div className="heading-6 text-weight-bold">{c.title}</div>
                                    <p className="text-size-small opacity-80">{c.text}</p>
                                </AnimatedInViewDiv>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* PATTERN STORIES */}
            <section>
                <div className="padding-global py-16">
                    <div className="w-layout-blockcontainer container w-container">
                        <AnimatedInViewDiv className="header text-center mb-12 mx-auto">
                            <h2 className="heading-4 text-weight-medium mb-4">
                                The Shape of What We Build
                            </h2>
                        </AnimatedInViewDiv>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {STORIES.map((s, i) => (
                                <AnimatedInViewDiv
                                    key={s.title}
                                    delay={0.1 * i}
                                    className="border border-gray-200 rounded-lg p-6 lg:p-8 hover:border-[#E0362C]/60 transition-colors flex flex-col gap-3"
                                >
                                    <div className="text-size-small text-weight-bold text-[#E0362C]">
                                        {s.tag}
                                    </div>
                                    <div className="heading-6 text-weight-bold">{s.title}</div>
                                    <p className="text-size-small opacity-80">{s.body}</p>
                                </AnimatedInViewDiv>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section>
                <div className="padding-global py-16">
                    <div className="w-layout-blockcontainer container w-container">
                        <AnimatedInViewDiv className="header text-center mb-12 mx-auto">
                            <h2 className="heading-4 text-weight-medium mb-4">How It Works</h2>
                        </AnimatedInViewDiv>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    step: "01 · Diagnose",
                                    text: "Tell us where the hours go. We come back with the three automations worth building first, what each saves, and a straight price.",
                                },
                                {
                                    step: "02 · Build",
                                    text: "We ship the highest-ROI one first, engineered AI-accelerated, which is why it goes live in 2-3 weeks and not a quarter. Integrated with the CRM, accounting, calendar and WhatsApp you already run; your team keeps working, nothing gets ripped out.",
                                },
                                {
                                    step: "03 · Own",
                                    text: "The automation is yours: code, data, accounts. No per-seat licences, no growing subscription. When it proves itself, we build the next one.",
                                },
                            ].map((s, i) => (
                                <AnimatedInViewDiv
                                    key={s.step}
                                    delay={0.1 * i}
                                    className="border border-gray-200 rounded-lg p-6 lg:p-8 bg-[#F7F7F5] flex flex-col gap-3"
                                >
                                    <div className="text-size-small text-weight-bold text-[#E0362C]">
                                        {s.step}
                                    </div>
                                    <p className="text-size-small opacity-80">{s.text}</p>
                                </AnimatedInViewDiv>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY AN AGENCY, NOT ANOTHER TOOL */}
            <section>
                <div className="padding-global py-16">
                    <div className="w-layout-blockcontainer container w-container">
                        <AnimatedInViewDiv className="header text-center mb-12 mx-auto">
                            <h2 className="heading-4 text-weight-medium mb-4">
                                Why an Agency, Not Another Tool
                            </h2>
                            <p className="opacity-80 max-width-60ch mx-auto">
                                You&apos;ve seen the other two answers. Here&apos;s where each one
                                actually leaves you.
                            </p>
                        </AnimatedInViewDiv>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Buy another SaaS tool",
                                    text: "Fast to start. Then the real work begins: configuring it, migrating into it, paying per seat forever, and discovering your workflow doesn't quite fit its template. The average business already runs dozens of tools that don't talk to each other. Adding one more rarely fixes that.",
                                },
                                {
                                    title: "Hire a no-code gluer",
                                    text: "Cheap and quick: a freelancer chains your tools together with connector subscriptions. It works until a connector changes, a trigger silently fails, or the freelancer moves on. You own nothing, and nobody is accountable when the chain breaks at month-end.",
                                },
                                {
                                    title: "Have it engineered, once",
                                    text: "We build the automation as real software, wired directly into your systems, tested against your actual volumes, and handed over with everything: code, data, accounts. It's the difference between renting a workaround and owning an asset.",
                                },
                            ].map((c, i) => (
                                <AnimatedInViewDiv
                                    key={c.title}
                                    delay={0.1 * i}
                                    className={`border rounded-lg p-6 lg:p-8 flex flex-col gap-3 ${
                                        i === 2
                                            ? "border-[#E0362C]/60 bg-[#F7F7F5]"
                                            : "border-gray-200"
                                    }`}
                                >
                                    <div className="heading-6 text-weight-bold">{c.title}</div>
                                    <p className="text-size-small opacity-80">{c.text}</p>
                                </AnimatedInViewDiv>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* INTEGRATIONS */}
            <section>
                <div className="padding-global py-16">
                    <div className="w-layout-blockcontainer container w-container">
                        <AnimatedInViewDiv className="header text-center mb-10 mx-auto">
                            <h2 className="heading-4 text-weight-medium mb-4">
                                Plugs Into What You Already Run
                            </h2>
                            <p className="opacity-80 max-width-60ch mx-auto">
                                No rip-and-replace. The automation works between the systems your
                                team already knows.
                            </p>
                        </AnimatedInViewDiv>
                        <AnimatedInViewDiv delay={0.1} className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                            {INTEGRATIONS.map((name) => (
                                <span
                                    key={name}
                                    className="text-size-small border border-gray-200 rounded-full px-4 py-2 bg-[#F7F7F5]"
                                >
                                    {name}
                                </span>
                            ))}
                        </AnimatedInViewDiv>
                        <AnimatedInViewDiv delay={0.2}>
                            <p className="text-size-small opacity-70 text-center mt-6 max-width-60ch mx-auto">
                                Running something we haven&apos;t listed? If it has an API, an
                                export, or an inbox, we can almost certainly wire to it. Ask us in
                                the form and we&apos;ll tell you straight.
                            </p>
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </section>

            {/* FAQ, the shared /martech accordion, page-specific questions */}
            <MartechFAQ
                faqs={FAQS}
                heading="Questions, Answered Straight"
                ctaTitle="Get My Top 3 Automations"
            />

            {/* CLOSING CTA */}
            <section>
                <div className="padding-global py-16 pb-24">
                    <div className="w-layout-blockcontainer container w-container">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                            <AnimatedInViewDiv>
                                <h2 className="heading-3 text-weight-bold mb-4">
                                    Find Out What&apos;s Worth Automating First
                                </h2>
                                <p className="opacity-80 max-width-48ch">
                                    Two minutes of questions. One reply, from a person, with the
                                    three automations that would save your team the most hours,
                                    and what each costs to build.
                                </p>
                            </AnimatedInViewDiv>
                            {/* id matches MartechCTA's scroll target so the FAQ's
                                CTA button lands on this form instead of routing
                                to /martech. */}
                            <AnimatedInViewDiv delay={0.15} className="w-full" id="martech-lead-form">
                                <DiagnosticForm location="closing" />
                            </AnimatedInViewDiv>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
