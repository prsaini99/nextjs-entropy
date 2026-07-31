// FAQs per martech page, keyed by slug ("hub" = /martech).
//
// Written around the real USP: AI-native delivery, so a single project ships in
// 2–3 weeks and costs a fraction of a conventional build. A full stack is
// several projects, which is where the ~90-day roadmap comes from — the two
// numbers describe different things and the copy says so explicitly.
//
// Every capability claimed here already appears on the product pages. Nothing
// is invented, no competitor is benchmarked, and no figure is quoted that isn't
// already published on the site.

const martechFaqs = {
    hub: [
        {
            question: "What does an AI marketing agency actually do?",
            answer:
                "We build the marketing systems you'd otherwise rent, automation, influencer platforms, calling agents, lead engines, and run campaigns on them. Most agencies configure off-the-shelf SaaS and have never shipped software. Most dev shops have never run a campaign. Doing both is why the tools end up fitting how marketing actually works.",
        },
        {
            question: "How is AI-native delivery different from a normal agency?",
            answer:
                "We use AI throughout our own engineering, scoping, code, QA, documentation, with senior engineers reviewing everything. That's why work that used to be priced and scheduled as a quarter-long project now ships in weeks. It isn't a smaller version of the old process; it's a different cost structure.",
        },
        {
            question: "How long does it take to build?",
            answer:
                "A single project, one workflow, fully integrated, typically goes live in 2–3 weeks. A full stack is several of those projects, which is where the 90-day roadmap comes from: sequenced by ROI and delivered in weekly increments, so you're using working software from the first few weeks rather than waiting for a single big launch.",
        },
        {
            question: "How much does custom marketing software cost?",
            answer:
                "Less than most teams expect. Focused builds, a CRM, an internal tool, a single automation, have started around $500, with full platform work priced accordingly. The comparison that matters is three-year total cost: licences recur and rise, while a build stops costing you once it's yours.",
        },
        {
            question: "Build vs buy: when does custom marketing automation beat SaaS?",
            answer:
                "Sooner than it used to. Per-seat and per-contact pricing scales with your headcount and list size rather than your results, so the crossover often arrives inside the first year, especially now that a project takes weeks instead of quarters. If your tool genuinely fits and the price isn't growing, keep it. Most teams find neither is true.",
        },
        {
            question: "Who maintains it after launch? We don't have a platform team.",
            answer:
                "We do, on a managed retainer: monitoring, third-party API version upgrades (Meta and Google change theirs constantly), security patches and new capabilities. You own the code and the data either way. The retainer is optional, not lock-in.",
        },
        {
            question: "Can you integrate with our existing CRM and ad accounts?",
            answer:
                "Yes. That's most of the work. We've shipped production integrations with the Meta Graph API, Instagram Graph API, Google APIs, payment gateways, CRMs, Google Sheets and warehouse destinations. Custom martech that doesn't talk to your CRM is just another silo; the CRM stays the gravitational centre.",
        },
        {
            question: "What is a stack audit?",
            answer:
                "We map your current tools, spend and data flows, find the shelfware and integration debt, and tell you what to keep, replace and build, sequenced by ROI. It's free, and it's useful even if you never build anything with us.",
        },
        {
            // Carried over from the original hub FAQ. The unsourced stats that
            // sat alongside it ("91 tools", "49% utilization", "$50k–$250k a
            // year") were dropped — Google requires ad claims to be
            // substantiable and these pages are ad destinations.
            question: "What is TRIBE v2 creative analysis, exactly?",
            answer:
                "A neural pre-testing lab. We run your video ads through five AI analyses, on-screen emotion, voice and tone, visual pacing, script structure and predicted brain response, then distil them into indices like Hook Strength, Attention Retention and CTA Readiness, each tagged with its confidence level. You rank a batch of creatives before spending on media, then we calibrate against your real CTR and ROAS so the scores become predictive for your account.",
        },
    ],

    "ai-call-center": [
        {
            question: "What is an AI calling agent?",
            answer:
                "A voice AI that answers and makes calls in real time, qualifying leads, booking meetings, following up, and logs every transcript and outcome to your CRM. Unlike an IVR it holds a real conversation: it handles interruptions and understands intent instead of menu presses.",
        },
        {
            question: "What's the difference between an AI receptionist and an AI call center?",
            answer:
                "A receptionist handles inbound, routing, messages, bookings. A call centre adds outbound: follow-up calls, qualification, re-engaging leads that went quiet. Ours does both from a single configuration, so you aren't buying and integrating two systems.",
        },
        {
            question: "Can it handle Hindi and English in the same call?",
            answer:
                "Yes, 11 languages in real time, including switching mid-conversation, which is how most Indian customers actually speak. Agents locked to a single language break on the first switch. That's the specific case this was built for.",
        },
        {
            question: "What happens when the AI can't answer?",
            answer:
                "It hands off to a human with the full conversation context, so the customer never repeats themselves. Escalation rules are yours to set, by topic, by sentiment, or whenever the caller asks for a person.",
        },
        {
            question: "How much does an AI calling agent cost?",
            answer:
                "Less than most teams assume, because a new company's agent is configured from one profile rather than built from scratch. The comparison to run is against a human calling team: 24/7 coverage, no shift scheduling, no attrition and no ramp time. We'll model it against your actual call volumes on the first call.",
        },
        {
            question: "How quickly can we go live?",
            answer:
                "Days, not months. A new agent is configured from a single profile with no redeploy, so the time goes into your scripts, objection handling and escalation rules rather than engineering.",
        },
    ],

    "influencer-marketing": [
        {
            question: "What's the difference between an influencer marketing platform and an agency?",
            answer:
                "A platform gives you tools; an agency runs the campaign. We do both, Zyflus is the software, and we've run creator campaigns on it. Most platform vendors have never executed a campaign with their own product, which is why so many optimise for the demo rather than the outcome.",
        },
        {
            question: "How do you find the right influencers for a brand?",
            answer:
                "Discovery pulls creators from Instagram, then AI scores each one 0–100 against your ideal influencer profile. Your team reviews the top decile instead of scrolling through thousands, the shortlist arrives already ranked.",
        },
        {
            question: "Can agencies manage multiple brands in one account?",
            answer:
                "Yes. Multi-brand isolation is built in, so each client's creators, campaigns and negotiations stay separate. It was designed for agency use rather than retrofitted onto a single-brand tool.",
        },
        {
            question: "Do you run the campaigns or only provide the tool?",
            answer:
                "Either. Some clients license Zyflus and run it themselves; others hand us the campaign end to end. The software doesn't change, only who operates it.",
        },
        {
            question: "How does outreach automation avoid looking like spam?",
            answer:
                "Sequences are personalised per creator and stop the moment someone replies. The goal is starting more human conversations, not sending more DMs, a warm creator shouldn't go cold because someone forgot to follow up.",
        },
        {
            question: "Can we get a version customised to how we work?",
            answer:
                "Yes, and that's usually the point. Zyflus is ours, so we can extend it around your workflow rather than asking you to wait for a roadmap. Because delivery is AI-accelerated, that customisation is typically a matter of weeks.",
        },
    ],

    "marketing-automation": [
        {
            question: "What is a marketing automation platform?",
            answer:
                "Software that runs your customer journeys automatically: welcome sequences, follow-ups, campaigns, and the inbox that catches the replies. AtoEmail is ours, visual journeys, high-volume campaigns, a unified inbox and a developer API in one engine that you own.",
        },
        {
            question: "What's different about owning it instead of renting?",
            answer:
                "Subscription tools price per contact, so growing your list raises your bill every month. AtoEmail has no per-subscriber tiers, runs on your own sending infrastructure, and your data stays yours, growth stops being a cost event.",
        },
        {
            question: "What can trigger a journey?",
            answer:
                "Four things: app or website events, inbox replies, schedules, and webhooks. A reply to a campaign can advance a journey or alert sales the moment it lands, instead of sitting unread in a shared mailbox.",
        },
        {
            question: "Can AI make decisions inside a journey?",
            answer:
                "Yes. Journey nodes can branch into emails, HTTP calls, database updates and AI steps, so the flow can handle the cases a fixed rule can't express, without a human watching the queue.",
        },
        {
            question: "Does it get more expensive as my list grows?",
            answer:
                "No. There is no per-subscriber pricing, unlimited contacts is the design, not a plan tier. Deliverability at volume is handled with multi-key load balancing across your sending identities.",
        },
    ],

    "social-automation": [
        {
            question: "What is Instagram DM automation?",
            answer:
                "Software that replies to DMs and comments automatically, answering common questions, qualifying interest and following up, so nobody waits hours for a reply. Humans only handle the conversations that genuinely need judgement.",
        },
        {
            question: "Is Instagram DM automation allowed by Meta?",
            answer:
                "Yes, within Meta's platform rules, which is why we build on the official Instagram Graph API rather than browser scripts that put your account at risk. Automation should build your brand, not gamble it.",
        },
        {
            question: "Can automated replies sound like my brand?",
            answer:
                "Yes, replies are drafted in your brand voice, and you can keep a human review step before anything sends. Anything the bot shouldn't answer gets routed to a person instead of guessed at.",
        },
        {
            question: "What's the difference between a chatbot and DM automation?",
            answer:
                "A chatbot answers when spoken to. DM automation also initiates, follows up on a schedule, stops the moment someone replies, and routes qualified conversations to a human. It's a pipeline, not a widget.",
        },
        {
            question: "How fast do replies go out?",
            answer:
                "Under a minute for incoming DMs and comments, around the clock. On social, that's frequently the whole difference between your reply and a competitor's.",
        },
        {
            question: "Can you scrape data we need that isn't on social?",
            answer:
                "Yes, competitors, pricing, prospects, trends, from any public source, on a schedule, into your warehouse. These are usually small, focused builds, which makes them among the fastest and least expensive things we do.",
        },
    ],

    // CRM page. Questions lead with the searched vocabulary for this page:
    // "lead management software" and "custom crm development". The two
    // data-product FAQs that used to live here (scraping legality, subscription
    // databases) moved to "sales-intelligence" when the pages split.
    "lead-intelligence": [
        {
            question: "What is lead management software?",
            answer:
                "A system that captures every lead from every source, tracks each conversation, and makes sure follow-ups happen. Ours goes further: WhatsApp threads, call recordings and email all land in one timeline per lead, with AI scoring that tells reps who to call next and what to say.",
        },
        {
            question: "Can it really capture WhatsApp, calls and email in one place?",
            answer:
                "Yes, that's the core of it. A WhatsApp inbox with live chats and imported history, call recordings transcribed with multilingual AI, Hindi/English code-switching included, and connected mailboxes, all attached to the lead they belong to. Nothing lives in a rep's personal phone.",
        },
        {
            question: "What is AI lead scoring?",
            answer:
                "A model that reads every interaction, calls, WhatsApp threads, emails, and assigns each lead a score, a temperature and a next action. Reps open the CRM already knowing who to call.",
        },
        {
            question: "How do you build a B2B lead generation system?",
            answer:
                "Three parts: a data engine that finds and enriches prospects, a CRM that captures every WhatsApp, call and email in one timeline, and AI scoring that tells reps who to call next and what to say. Most teams have the first two and are missing the third.",
        },
        {
            question: "Can you build a CRM around how we actually sell?",
            answer:
                "Yes, and it's one of the least expensive things we do, focused CRM builds have started around $500, usually less than a year of seats on an off-the-shelf tool that still doesn't fit. We run our own business development on the CRM we built ourselves.",
        },
    ],

    // TradeToIndia DB page. Split from lead-intelligence 2026-07-30; the first
    // two questions migrated with it because they're about the data product.
    "sales-intelligence": [
        {
            question: "What is a sales intelligence platform?",
            answer:
                "A system that turns raw market data into accounts your team can actually sell to: which companies exist in a segment, who works there, how to reach them, and, in our case, what you could plausibly pitch each one. Ours runs as TradeToIndia DB, the same pipelines that feed our own CRM.",
        },
        {
            question: "How does B2B data enrichment work?",
            answer:
                "Upload a CSV or point the scrapers at a segment. Companies gain firmographics and employee data from the web and LinkedIn; people gain verified emails and phone numbers. You watch it enrich live with progress streaming, then export or keep it flowing as a live lead source.",
        },
        {
            question: "What are AI talking points?",
            answer:
                "For each company, AI reads the scraped data and recommends what you could sell them and the angle to open with. It's the difference between a cold template and a first message that names a reason to talk, most contact databases stop at the phone number.",
        },
        {
            question: "Is web scraping for lead generation legal in India?",
            answer:
                "Gathering publicly available business information is generally permissible; how you store and use personal data is what the DPDP Act governs. We build access controls and retention rules in from the start rather than bolting them on afterwards.",
        },
        {
            question: "How is this different from a subscription database?",
            answer:
                "Those are subscriptions to someone else's data, priced per seat and per credit. This is your own pipeline and your own schema, in your own warehouse, enriched continuously, and it doesn't get more expensive as your team grows.",
        },
        {
            question: "Can my customers use it too?",
            answer:
                "Yes. Access is metered by a credit wallet, so you can run it for your own team or resell enrichment to your customers, usage-based, with no seat licences.",
        },
    ],

    "creative-analysis": [
        {
            question: "What is AI video ad analysis?",
            answer:
                "Running a video ad through AI models to understand why it works before you pay to run it. TRIBE analyzes every creative through five lenses and reports what is strong, what is weak, and which of two ads is likely to win.",
        },
        {
            question: "What do the five lenses measure?",
            answer:
                "On-screen emotion, voice and tone, visual pacing, script structure, and predicted brain response. The first three seconds get special attention, that hook window is the thumb-stop signal that decides whether the rest of the ad is ever seen.",
        },
        {
            question: "Do I have to spend media budget to test an ad?",
            answer:
                "No, that's the point. Creatives are pre-tested before a rupee of media is spent, so the weak ones die in the lab instead of in your ad account.",
        },
        {
            question: "How reliable are the scores?",
            answer:
                "We report relative rankings with per-index confidence, and we never assert absolute thresholds before calibration. In a real two-ad comparison, the model's high-confidence indices correctly identified the stronger creative.",
        },
        {
            question: "How is this different from A/B testing?",
            answer:
                "A/B testing tells you which ad won after you paid to run both. Pre-testing tells you why, before you spend, and the two work together: pre-rank your candidates, then A/B the top pair in the market.",
        },
    ],

    "ai-integration": [
        {
            question: "What is MCP (Model Context Protocol)?",
            answer:
                "An open standard for connecting AI assistants to real systems as tools. Instead of copy-pasting between ChatGPT and ten dashboards, your AI queries your ad accounts, CRM, email and analytics directly.",
        },
        {
            question: "How do I connect my CRM to ChatGPT or Claude?",
            answer:
                "Through a custom MCP connector that exposes the actions you want and withholds the ones you don't. We map your platforms, workflows and business rules first, an AI is only as useful as its understanding of how you operate.",
        },
        {
            question: "Is it safe to let AI act on our marketing accounts?",
            answer:
                "That's what the approval guardrails are for. High-consequence actions, spend changes, sends, publishing, pass through a human gate. The AI drafts; a person confirms.",
        },
        {
            question: "What does MCP integration cost, and how long does it take?",
            answer:
                "Individual connectors are small, fast pieces of work, typically days to a couple of weeks each. We usually pair them with a retainer, because platform APIs change and unmaintained connectors quietly stop working.",
        },
    ],

    "proposal-maker": [
        {
            question: "What is an AI proposal generator?",
            answer:
                "Software that drafts a proposal from your previous mandates, applies your brand design automatically, recommends the quote from your pricing history, and then tells you which sections the client actually read.",
        },
        {
            question: "Can it use my brand's design?",
            answer:
                "Yes. Your logo, type and colours on every proposal, generated on brand by default rather than a stock template with a logo dropped into the corner.",
        },
        {
            question: "How is this different from off-the-shelf proposal software?",
            answer:
                "Those are documents you fill in. This drafts the content from your own won proposals, recommends pricing from your history, and suggests ideas the client didn't ask for. And it's yours outright, not a per-seat subscription that grows with your team.",
        },
        {
            question: "How do reading analytics help close deals?",
            answer:
                "You see which sections were read and for how long, so follow-ups are timed by the client's behaviour rather than your memory, and pipeline reporting reflects real engagement instead of optimism.",
        },
    ],
};

export function getMartechFaqs(slug) {
    return martechFaqs[slug] || null;
}

export default martechFaqs;
