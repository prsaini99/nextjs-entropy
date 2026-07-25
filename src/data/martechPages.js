// Data for the dedicated martech product pages rendered by /martech/[slug].
// Each entry drives the shared MartechProductPage template; sections render
// only when their data is present.

const martechPages = {
  "influencer-marketing": {
    badge: "Zyflus · Influencer Marketing Platform",
    seoTitle: "Influencer Marketing Platform for Agencies & Brands (Zyflus)",
    related: ["creative-analysis","social-automation","ad-intelligence"],
    title: "Influencer Marketing, Run Like an Operation — Not a Spreadsheet",
    tagline:
      "Zyflus is our end-to-end creator marketing platform: discover creators, vet them with AI, automate outreach and negotiate — all in one pipeline.",
    heroStats: [
      { value: "0–100", label: "AI match score per creator against your ideal influencer profile" },
      { value: "292%", label: "follower growth delivered for StarStruck by Sunny Leone" },
      { value: "3.8x", label: "ROAS on celebrity beauty campaigns we've run" },
    ],
    features: [
      {
        title: "Creator Discovery",
        description:
          "Find creators via the Instagram Graph API with enriched profiles — audience size, engagement, content themes and contactability, filtered to your niche.",
      },
      {
        title: "AI Vetting & Match Scoring",
        description:
          "Every creator is scored 0–100 against your Ideal Influencer Profile, so your team spends time on the top decile instead of scrolling through thousands.",
      },
      {
        title: "DM Outreach Automation",
        description:
          "Personalized outreach at scale through official APIs, with reply tracking and automated follow-up sequences that never let a warm creator go cold.",
      },
      {
        title: "Negotiation Pipeline",
        description:
          "A multi-stage deal flow — Pending → Quote Proposed → Accepted — with quotes, revisions and history per creator, synced two-way to Google Sheets.",
      },
      {
        title: "Campaign Analytics",
        description:
          "Track deliverables, content performance and spend per creator, so the next campaign starts with data instead of guesswork.",
      },
      {
        title: "Multi-Brand Isolation",
        description:
          "Agencies run multiple brands side by side with fully isolated projects, teams and creator books.",
      },
    ],
    howItWorks: [
      { title: "Define", description: "Set your Ideal Influencer Profile — niche, audience, engagement, budget bands." },
      { title: "Discover & Score", description: "The platform surfaces and AI-scores matching creators continuously." },
      { title: "Outreach", description: "Automated, personalized DM sequences open conversations and track replies." },
      { title: "Negotiate & Run", description: "Manage quotes and deliverables through the pipeline; measure everything." },
    ],
    proof: {
      heading: "We don't just build the software — we've run the campaigns",
      items: [
        "StarStruck by Sunny Leone: 292% follower growth, 3.8x ROAS, 8.5% engagement through influencer strategy + performance marketing.",
        "Bioderma India: dermatologist and expert partnerships driving 8.5M impressions and +45% brand recall.",
      ],
    },
    demo: { href: "https://www.zyflus.com/", label: "See Zyflus live → zyflus.com", external: true },
    embed: {
      url: "https://www.zyflus.com/",
      title: "Zyflus — live product",
      note: "This is the real Zyflus platform, embedded live. Scroll and click around — or open it full-screen.",
    },
  },

  "marketing-automation": {
    badge: "AtoEmail · Marketing Automation Platform",
    seoTitle: "Marketing Automation Platform Without Per-Contact Pricing (AtoEmail)",
    related: ["lead-intelligence","social-automation","ai-call-center"],
    title: "Marketing Automation That You Own — Journeys, Campaigns and Inbox in One Engine",
    tagline:
      "AtoEmail is our marketing automation platform: visual customer journeys, high-volume campaigns, a unified inbox and a developer API — without per-contact pricing that punishes list growth.",
    heroStats: [
      { value: "∞", label: "contacts — no per-subscriber pricing tiers" },
      { value: "4", label: "trigger types: events, replies, schedules, webhooks" },
      { value: "100%", label: "your data, your sending infrastructure, your rules" },
    ],
    features: [
      {
        title: "Visual Journey Builder",
        description:
          "Drag-and-drop, node-based automations: trigger on signups, app events, inbox replies, cron schedules or webhooks — then branch into emails, HTTP calls, database updates and AI steps.",
      },
      {
        title: "Campaigns at Scale",
        description:
          "Bulk sends with CSV merge tags and multi-key load balancing across sending identities, keeping deliverability healthy at volume.",
      },
      {
        title: "Unified Inbox",
        description:
          "Replies land in one shared inbox and can trigger automations — a reply to a campaign can advance a journey or alert sales instantly.",
      },
      {
        title: "AI Steps in Journeys",
        description:
          "Drop AI actions into any workflow: classify a reply's intent, draft a personalized response, or score a lead before routing it.",
      },
      {
        title: "Interactive AMP Email",
        description:
          "Forms, carousels and actions inside the email itself — recipients respond without ever leaving their inbox.",
      },
      {
        title: "Developer API & Webhooks",
        description:
          "HMAC-signed webhooks and a clean API make it infrastructure, not an island — your product and CRM talk to it natively.",
      },
    ],
    howItWorks: [
      { title: "Connect", description: "Plug in your sending domains, product events and CRM." },
      { title: "Design", description: "Build journeys visually — welcome series, nurture, win-back, post-purchase." },
      { title: "Automate", description: "Triggers fire from real behavior: events, replies, schedules, webhooks." },
      { title: "Compound", description: "Every send enriches your owned data instead of a vendor's." },
    ],
    proof: {
      heading: "Multi-tenant, security-first architecture",
      items: [
        "Row-level security everywhere, SSRF-protected HTTP actions and Google SSO — built to SaaS-grade standards because it is a live SaaS.",
        "Runs as the email backbone for our own products and client platforms.",
      ],
    },
    demo: { href: "https://www.atoemail.com/", label: "See AtoEmail live → atoemail.com", external: true },
    embed: {
      url: "https://www.atoemail.com/",
      title: "AtoEmail — live product",
      note: "This is the real AtoEmail platform, embedded live. Scroll and click around — or open it full-screen.",
    },
  },

  "ad-intelligence": {
    badge: "Meta Marketing Tool · AI Ad Intelligence",
    seoTitle: "AI Meta Ads Management Tool — Ad Analysis & Creative Generation",
    related: ["creative-analysis","marketing-automation","influencer-marketing"],
    title: "Every Ad Analyzed. New Creatives Generated. Pushed Live — Without Leaving One Dashboard",
    tagline:
      "Our ad-ops platform manages 10–20 Meta ad accounts from one place, layers AI analysis on every ad, generates new ad copy and creative with AI, and pushes campaigns straight through the Meta API.",
    heroStats: [
      { value: "10–20", label: "ad accounts managed from a single dashboard" },
      { value: "v23", label: "Meta Graph API — campaign-faithful create & edit" },
      { value: "AI", label: "analysis, generation and publishing in one loop" },
    ],
    features: [
      {
        title: "AI Analysis on Every Ad",
        description:
          "Per-ad performance intelligence: what's driving results, what's fatiguing, and which audiences and placements are quietly burning budget — surfaced automatically, not buried in Ads Manager.",
      },
      {
        title: "AI Ad Content Generation",
        description:
          "Generate ad copy variants, hooks and creative concepts grounded in your winning ads' patterns — then A/B them without a creative bottleneck.",
      },
      {
        title: "Push Through the API",
        description:
          "Approved campaigns, ad sets and ads go live directly via the Meta Graph API — Meta-faithful creation flows, no copy-pasting into Ads Manager.",
      },
      {
        title: "Bulk Operations",
        description:
          "Create, edit, pause and duplicate across accounts in one action. Run twenty accounts with the effort of one.",
      },
      {
        title: "Cross-Account Performance Views",
        description:
          "One dashboard for spend, ROAS and delivery across every account and brand — with scheduled auto-sync keeping it current.",
      },
      {
        title: "Governance & Audit Logs",
        description:
          "Roles, approvals and a full audit trail of every change — agency-grade control your clients can trust.",
      },
    ],
    howItWorks: [
      { title: "Connect Accounts", description: "Link Meta ad accounts; scheduled sync pulls structure and insights." },
      { title: "Analyze", description: "AI reviews every ad's performance and flags winners, fatigue and waste." },
      { title: "Generate", description: "AI drafts new copy and creative directions from what's already working." },
      { title: "Push & Iterate", description: "Publish through the API, measure, and let the loop tighten weekly." },
    ],
    proof: {
      heading: "Paired with neural creative pre-testing",
      items: [
        "Combine with our TRIBE v2 lab to pre-rank new creatives on predicted attention before they spend a rupee.",
        "Built and used for real agency ad-ops across 10+ accounts in production.",
      ],
    },
    demo: { href: "/martech#martech-lead-form", label: "Request a walkthrough (auth-gated internal tool)", external: false },
  },

  "creative-analysis": {
    badge: "Creative Intelligence Lab · Emotion, Voice, Visuals, Script & Brain",
    seoTitle: "AI Video Ad Analysis — Emotion, Script, Voice & Neural Attention",
    related: ["ad-intelligence","influencer-marketing","marketing-automation"],
    title: "Your Video Ads Through Five AI Lenses — Before You Spend a Rupee on Media",
    tagline:
      "Our in-house creative intelligence pipeline runs every ad through five analyses — on-screen emotion, voice & tone, visual pacing, script structure, and predicted brain response — so you know exactly why an ad works, not just whether it did.",
    heroStats: [
      { value: "5", label: "AI lenses per creative — emotion, voice, visuals, script, brain" },
      { value: "0–3s", label: "hook window scored — the thumb-stop signal" },
      { value: "+43%", label: "hook-strength lift identified in a real A/B pair" },
    ],
    features: [
      {
        title: "Neural Attention Analysis",
        description:
          "An award-winning brain-encoding model predicts human cortical response second by second — Hook Strength, Attention Retention, Value Resonance, CTA Readiness and a per-second attention curve with the exact peak.",
      },
      {
        title: "On-Screen Emotion Analysis",
        description:
          "Our facial-affect pipeline reads the emotions your talent actually projects, frame by frame — does the smile land with the offer, or a beat too late?",
      },
      {
        title: "Voice & Tone Analysis",
        description:
          "Speech-emotion and prosody analysis scores energy, pace, pitch and confidence in the voiceover — and how the music-to-voice balance supports the moments that need attention most.",
      },
      {
        title: "Visual Analysis",
        description:
          "AI scene understanding: shot pacing, cut rhythm, brand visibility windows and aesthetic scoring — mapped against the attention curve to show which visuals earn the watch.",
      },
      {
        title: "Script Intelligence",
        description:
          "Automatic transcription feeding AI script analysis: hook structure, message clarity, emotional arc and CTA copy strength — benchmarked against high-performing ad script patterns.",
      },
      {
        title: "Calibrated, Confidence-Tagged Verdicts",
        description:
          "Batch leaderboards with per-index confidence tags, correlated over time against your real CTR, ROAS and watch-time — relative rankings, no unanchored thresholds, no pseudo-science.",
      },
    ],
    howItWorks: [
      { title: "Upload", description: "Send the creatives you're deciding between — winners and losers together." },
      { title: "Analyze", description: "All five pipelines run: emotion, voice, visuals, script and neural attention." },
      { title: "Report", description: "A ranked leaderboard plus a per-creative technical report across every lens." },
      { title: "Calibrate", description: "Indices are tuned against your real Meta performance over time." },
    ],
    proof: {
      heading: "Research-grade honesty",
      items: [
        "Scores are reported as relative rankings with per-index confidence — we never assert absolute thresholds before calibration.",
        "In a real two-ad comparison, the model's high-confidence indices correctly identified the stronger creative (+43% hook strength, +38% retention).",
      ],
    },
    demo: { href: "/martech#martech-lead-form", label: "Ask about a pilot batch for your creatives", external: false },
  },

  "lead-intelligence": {
    badge: "B2B Lead CRM + Scrapers · Sales Intelligence",
    seoTitle: "B2B Lead Generation, Sales Intelligence & AI-Assisted CRM",
    related: ["ai-call-center","proposal-maker","social-automation"],
    title: "A B2B Growth Engine: Scrape the Market, Score Every Lead, Never Drop a Follow-Up",
    tagline:
      "Our AI-assisted B2B CRM centralises leads, WhatsApp, calls, email, meetings and proposals — and our scraper stack keeps it fed with fresh, enriched prospect data on anything you sell to.",
    heroStats: [
      { value: "3", label: "channels captured: WhatsApp, calls, email — in one timeline" },
      { value: "AI", label: "lead scoring: temperature, stage, next action per lead" },
      { value: "10min", label: "sync cadence from lead sources like Google Sheets" },
    ],
    features: [
      {
        title: "Scrapers That Feed the Pipeline",
        description:
          "Data pipelines that gather and enrich prospects from the open web and LinkedIn — verified emails and phones, company firmographics, employee data — delivered as a live-updating lead source (the engine behind our TradeToIndia sales-intelligence product).",
      },
      {
        title: "Every Conversation, Captured",
        description:
          "WhatsApp inbox with live chats and imported history, call recordings transcribed with multilingual AI (Hindi/English code-switching included), and connected mailboxes — all attached to the lead.",
      },
      {
        title: "AI Lead Scoring — 'The Brain'",
        description:
          "The system reads a lead's full context — activities, conversations, deals — and produces a score, temperature, recommended stage, summary and next action. Your reps open the CRM knowing exactly who to call.",
      },
      {
        title: "Ask Your CRM",
        description:
          "A tool-using AI assistant that answers questions across your whole book — 'which leads went quiet after a proposal?' — with semantic recall over every past conversation. It proposes actions; humans approve every write.",
      },
      {
        title: "AI-Drafted Proposals & Emails",
        description:
          "Drafts grounded in the lead's dossier and your knowledge base, shared via public links with engagement tracking.",
      },
      {
        title: "Role-Aware & Secure",
        description:
          "Reps see only their book; admins see everything — enforced by row-level security in the database, not just UI filters.",
      },
    ],
    howItWorks: [
      { title: "Feed", description: "Scrapers and sheet sources pour enriched leads in on a schedule." },
      { title: "Engage", description: "WhatsApp, calls and email happen in the CRM — captured and transcribed." },
      { title: "Score", description: "AI ranks every lead by temperature and tells reps the next action." },
      { title: "Close", description: "AI-drafted proposals go out; follow-ups never slip through." },
    ],
    proof: {
      heading: "In production, every day",
      items: [
        "This is the CRM our own BD team runs on at lead.stackbinary.io — built for an India-based team, region-pinned for speed, in active daily use.",
        "The scraper stack powers TradeToIndia DB: CSV in → live enrichment → verified contacts out, metered by a credit wallet.",
      ],
    },
    demo: { href: "/martech#martech-lead-form", label: "Request a live walkthrough of the CRM", external: false },
  },

  "social-automation": {
    badge: "Bots & Scrapers · Always-On Growth Automation",
    seoTitle: "Instagram, Facebook & Quora Reply Bots + Web Scraping Services",
    related: ["influencer-marketing","lead-intelligence","marketing-automation"],
    title: "Reply, Follow Up and Research — On Every Channel, While You Sleep",
    tagline:
      "Bot tooling that answers and follows up across Instagram, Facebook, Quora and more, plus scrapers that gather intelligence on anything — competitors, prospects, trends — feeding your marketing with data and your audience with timely responses.",
    heroStats: [
      { value: "24/7", label: "response coverage across your social channels" },
      { value: "<1min", label: "time-to-first-reply on incoming DMs and comments" },
      { value: "Any", label: "target: competitors, prospects, pricing, trends — scraped on schedule" },
    ],
    features: [
      {
        title: "Instagram & Facebook Reply Bots",
        description:
          "Answer DMs and comments instantly through official APIs — qualify the intent, respond in your brand voice, and route hot leads to a human with full context.",
      },
      {
        title: "Follow-Up Sequences",
        description:
          "No reply? The bot follows up on a schedule you control, across the channels the prospect actually uses — and stops the moment they engage.",
      },
      {
        title: "Quora & Community Presence",
        description:
          "Monitor questions in your niche and draft helpful, non-spammy answers that build authority and drive qualified traffic — with human review before anything posts.",
      },
      {
        title: "Scrapers for Anything",
        description:
          "Structured data pipelines on any public source: competitor pricing, product catalogs, reviews, job posts, prospect lists — normalized, deduplicated and delivered to your sheet, warehouse or CRM.",
      },
      {
        title: "AI-Qualified Routing",
        description:
          "Every inbound message is classified — support, sales, spam, urgent — so humans only touch the conversations that need judgment.",
      },
      {
        title: "Compliance-Aware by Design",
        description:
          "Official APIs where they exist, rate-limit respect, human-in-the-loop for public posts — automation that builds your brand instead of risking it.",
      },
    ],
    howItWorks: [
      { title: "Map", description: "We map your channels, response playbooks and research targets." },
      { title: "Deploy", description: "Bots go live on your accounts; scrapers run on your schedule." },
      { title: "Qualify", description: "AI classifies and routes; humans handle only what matters." },
      { title: "Learn", description: "Response quality and scraped intelligence improve every week." },
    ],
    proof: {
      heading: "Built on proven pipelines",
      items: [
        "The same DM automation engine powers Zyflus creator outreach in production.",
        "The same scraping stack powers TradeToIndia's B2B enrichment — from raw web to verified contact data.",
      ],
    },
    demo: { href: "/martech#martech-lead-form", label: "Tell us which channels you want covered", external: false },
  },

  "proposal-maker": {
    badge: "AI Branded Proposal Maker · Close Faster",
    seoTitle: "AI Proposal Generator with Brand Design & Quote Recommendations",
    related: ["lead-intelligence","ai-call-center","marketing-automation"],
    title: "Proposals That Look Like Your Brand and Think Like Your Best Closer",
    tagline:
      "An AI proposal engine that drafts the pitch from your previous mandates, applies your brand's design system automatically, recommends the right quote, suggests ideas the client didn't ask for — and then tells you exactly which sections they read.",
    heroStats: [
      { value: "Minutes", label: "from brief to branded, client-ready proposal" },
      { value: "100%", label: "on-brand — your design system applied automatically" },
      { value: "Section-level", label: "reading analytics on every proposal you send" },
    ],
    features: [
      {
        title: "Your Brand, Baked In",
        description:
          "Logo, typography, colors, layouts and tone applied automatically from your brand kit — every proposal ships looking like your best designer made it, whether it's a PDF export or a live web link.",
      },
      {
        title: "Drafted From Your Past Mandates",
        description:
          "The AI is grounded in your history — previous mandates, won proposals, case studies and deliverables — so each new pitch opens with relevant proof and a scope written in your voice, not a generic template.",
      },
      {
        title: "Quote Recommendations",
        description:
          "Pricing suggested from what you actually charged on comparable mandates — scope-by-scope line items with margins you set, so juniors quote like seniors and nothing gets underpriced.",
      },
      {
        title: "AI Idea & Upsell Suggestions",
        description:
          "The engine proposes ideas the client didn't ask for — campaign concepts, add-on services, phase-two roadmaps — turning every proposal into a bigger conversation and a larger ticket.",
      },
      {
        title: "Reading Analytics That Sell",
        description:
          "Know the moment a proposal is opened, how long they spent on pricing versus scope, and which sections they re-read — so your follow-up call starts where their attention was.",
      },
      {
        title: "Behavior-Triggered Follow-Ups",
        description:
          "Client opened the proposal twice but stalled on pricing? An automated, personalized follow-up goes out via WhatsApp or email — timed by their behavior, not your memory.",
      },
      {
        title: "Interactive Configurators",
        description:
          "Embed calculators, 3D visualizations and map-based configurators (like our solar roof designer) so clients explore options inside the proposal instead of emailing questions.",
      },
      {
        title: "Templates Per Service Line",
        description:
          "Retainers, projects, campaigns, audits — each service gets its own template and pricing logic, so every team sends consistent, current collateral.",
      },
      {
        title: "CRM-Connected",
        description:
          "Proposals generate from the lead's dossier in your CRM and write outcomes back — sent, viewed, accepted — so pipeline reporting is real, not guessed.",
      },
    ],
    howItWorks: [
      { title: "Feed", description: "Connect your brand kit, past mandates, case studies and pricing history — once." },
      { title: "Brief", description: "Pick the client and scope; the AI drafts the full proposal with quote and ideas." },
      { title: "Polish & Send", description: "Edit anything, then share as a branded web link or PDF — with e-sign if you want it." },
      { title: "Track & Follow Up", description: "Reading analytics trigger the right follow-up at the right moment." },
    ],
    proof: {
      heading: "Built on systems already in production",
      items: [
        "SolarProposal: our vertical proposal platform with 3D configurators, branded PDF export and section-level engagement analytics — live for solar EPC companies.",
        "StackBinary CRM: AI-drafted proposals grounded in each lead's dossier and our knowledge base, with public share links — how our own BD team pitches every day.",
      ],
    },
    demo: { href: "/martech#martech-lead-form", label: "See a branded proposal generated for your brand", external: false },
  },

  "ai-integration": {
    badge: "MCP & AI Ecosystem Integration · AI Enablement",
    seoTitle: "MCP Integration Consulting — Connect Your Marketing Stack to AI",
    related: ["lead-intelligence","ad-intelligence","marketing-automation"],
    title: "Your Entire Marketing Stack, Wired Into Your AI",
    tagline:
      "We consult agencies and marketing teams on connecting their platforms — ad accounts, CRM, email, analytics, socials — into their AI ecosystem as MCP tools. We learn your business first, then build the connections and guardrails, so your team does everything in marketing by asking their AI.",
    heroStats: [
      { value: "1", label: "AI interface replacing ten platform dashboards" },
      { value: "MCP", label: "the open standard connecting your tools to your AI" },
      { value: "Yours", label: "connectors, agents and data — you own all of it" },
    ],
    features: [
      {
        title: "We Learn Your Business First",
        description:
          "Before any integration, we map how you actually market — your platforms, campaign workflows, approval chains, pricing rules and reporting cadence. The AI is only as useful as its understanding of your operation.",
      },
      {
        title: "Custom MCP Connectors",
        description:
          "We build MCP servers for the platforms you run: Meta and Google ad accounts, your CRM, email systems, analytics, social channels, sheets and internal databases — so your AI can read and act on all of them.",
      },
      {
        title: "Agents With Your Rules Baked In",
        description:
          "Campaign reporting, budget checks, creative briefs, lead follow-ups — agents that know your brand voice, margins and escalation rules, not generic chatbots.",
      },
      {
        title: "Human-Approval Guardrails",
        description:
          "The AI proposes, your team approves. Spend changes, outbound messages and data writes go through the approval gates you define — the same pattern we run in our own production CRM.",
      },
      {
        title: "Everything Marketing, One Interface",
        description:
          "\"Pause the underperforming ad sets and draft a report\" · \"Which leads went quiet after the proposal?\" · \"Score these five creatives\" — your team asks; the connected stack answers and acts.",
      },
      {
        title: "Enablement & Ongoing Tuning",
        description:
          "We train your team, document the toolkit, and keep connectors current as platform APIs change — on a retainer, so the ecosystem improves instead of rotting.",
      },
    ],
    howItWorks: [
      { title: "Discover", description: "Deep-dive into your business: platforms, workflows, rules, goals." },
      { title: "Wire", description: "MCP connectors built and tested for every tool in your stack." },
      { title: "Teach", description: "Agents configured with your brand voice, playbooks and guardrails." },
      { title: "Enable", description: "Team training, governance and ongoing tuning as your stack evolves." },
    ],
    proof: {
      heading: "We run our own company this way",
      items: [
        "Our BD team's CRM has a tool-using AI assistant with human-approved writes — in production daily at lead.stackbinary.io.",
        "Our ad-ops platform, email engine and creative-analysis lab are all AI-connected systems we built and operate ourselves — we're not selling a theory.",
      ],
    },
    demo: { href: "/martech#martech-lead-form", label: "Book an AI-readiness consultation", external: false },
  },

  "ai-call-center": {
    badge: "AI Call Center · Voice AI",
    seoTitle: "AI Call Center for Sales — Real-Time Multilingual Voice Agent",
    related: ["lead-intelligence","proposal-maker","ai-integration"],
    title: "A Sales Agent That Speaks 11 Languages and Never Misses a Call",
    tagline:
      "Our AI call center puts a real-time, multilingual voice agent on your phone lines — qualifying, answering and following up in the language your customer actually speaks. Any company's voice agent, configured from one profile, no redeploy.",
    heroStats: [
      { value: "11", label: "languages, in real time" },
      { value: "24/7", label: "coverage — every call answered" },
      { value: "1", label: "profile to configure — no engineering redeploy per client" },
    ],
    features: [
      {
        title: "Real-Time Voice Conversations",
        description:
          "Natural, low-latency speech in 11 languages — including Indian-language and code-switched conversations your customers actually have.",
      },
      {
        title: "Sales Qualification on the Call",
        description:
          "The agent qualifies intent, captures requirements and budget, and books the meeting — pushing a structured summary to your CRM.",
      },
      {
        title: "Configured, Not Coded",
        description:
          "Each company's agent is defined by a single profile — products, tone, objection handling, escalation rules. Launch a new client's voice agent without a redeploy.",
      },
      {
        title: "Inbound & Outbound",
        description:
          "Answer every inbound call, and run outbound follow-up calls on leads that went quiet — the calls your team never gets around to.",
      },
      {
        title: "Human Handoff",
        description:
          "When a conversation needs a person, the agent transfers with full context — the customer never repeats themselves.",
      },
      {
        title: "Every Call Logged & Analyzed",
        description:
          "Transcripts, summaries and outcomes flow into your CRM automatically — searchable, reportable, coachable.",
      },
    ],
    howItWorks: [
      { title: "Profile", description: "We configure your agent: offering, tone, languages, escalation rules." },
      { title: "Connect", description: "Plug into your numbers and CRM." },
      { title: "Answer & Call", description: "Inbound covered 24/7; outbound follow-ups run on schedule." },
      { title: "Review", description: "Transcripts and outcomes land in your CRM for coaching and reporting." },
    ],
    proof: {
      heading: "Live product",
      items: [
        "The AI Call Center is one of our own SaaS products, running real multilingual sales conversations today.",
        "Pairs with our B2B CRM so every AI call becomes structured pipeline data.",
      ],
    },
    demo: { href: "https://stackbinary-callcenter-seven.vercel.app/", label: "See the Sales Agent Console live", external: true },
    embed: {
      url: "https://stackbinary-callcenter-seven.vercel.app/",
      title: "AI Call Center — Sales Agent Console",
      note: "This is the real Sales Agent Console, embedded live. Explore it here — or open it full-screen.",
    },
  },
};


// Keyword-rich internal-link anchors per page, used wherever another page
// links to these solutions.
export const linkAnchors = {
  "influencer-marketing": "influencer marketing platform for agencies",
  "marketing-automation": "marketing automation without per-contact pricing",
  "ad-intelligence": "AI Meta ads management & creative generation",
  "creative-analysis": "AI video ad analysis — emotion, script & neural attention",
  "lead-intelligence": "B2B lead generation & AI sales CRM",
  "social-automation": "Instagram & Facebook reply bots + web scrapers",
  "proposal-maker": "AI branded proposal generator",
  "ai-integration": "MCP & AI ecosystem integration consulting",
  "ai-call-center": "multilingual AI call center for sales",
};

export const getAllMartechSlugs = () => Object.keys(martechPages);
export const getMartechPage = (slug) => martechPages[slug] || null;
export default martechPages;
