// Content for the Dubai/UAE services pair rendered by the static routes
// /services/custom-software-development-dubai and
// /services/mobile-app-development-dubai. Same shape as aiServicesPages
// entries; consumed by the same AIServicePage template.
//
// Why these pages exist (research 2026-08-29): the Dubai software SERPs
// carry real volume at LOW competition ("mobile app development dubai"
// cluster ~4,000/mo idx 24, "software development dubai" cluster ~3,500/mo)
// and page one is held by peer agencies. Ranking formula from the teardown:
// exact keyword plus city in title and H1, variant-keyword H2s, 2,000-7,000
// words, UAE trust anchors, industry blocks with real estate first, FAQPage
// schema.
//
// Copy register (owner verdict 2026-08-29): professional B2B in the SERP
// incumbents' format, per .claude/skills/b2b-web-copy. No essay voice, no
// competitor snark, and NEVER volunteer internal structure: no mention of
// where engineering sits or of the office's nature. Offices are stated
// plainly: Dubai (Regal Tower 705, Business Bay), USA, India.
//
// PRICING RULE (owner decision 2026-08-29): NO AED figures and no currency
// figures on these pages. Cost FAQs answer qualitatively: fixed price,
// typically well below prevailing Dubai agency quotes.
//
// PHONE RULE (owner decision 2026-08-29): +971 52 589 1213 appears on the
// contact page and in LocalBusiness schema only, never in body text here.
//
// Other rules enforced by review: no em dashes, "Stackbinary", no named
// products on services pages, compliance only "aligned"/"ready"/"aware".

// "Dubai:" prefix mirrors the "DE:" convention on the German form: the lead
// scorer keys off other service titles, and the prefix makes UAE pipeline
// leads unmistakable in Supabase for routing to the Dubai sales contact.
const DUBAI_FORM_SERVICES = [
  "Dubai: Custom Software Development",
  "Dubai: Mobile App Development",
  "Dubai: AI and Automation",
  "Dubai: Something else",
];

const dubaiPages = {
  /* ================================================================== */
  /* /services/custom-software-development-dubai                         */
  /* target: "custom software development company dubai" ~340/mo idx 9,  */
  /* "software development company dubai/uae" ~1,180/mo, "software       */
  /* development dubai" 1,900/mo MED                                     */
  /* ================================================================== */
  "custom-software-development-dubai": {
    badge: "Custom Software Development Dubai · Fixed Price, Your IP",
    seoTitle: "Custom Software Development Company in Dubai, UAE",
    seoDescription:
      "Custom software development company in Dubai: web platforms, enterprise systems and AI-powered solutions. 55+ delivered products, fixed-price proposals, office in Business Bay.",
    title: "Custom Software Development Company in Dubai, UAE",
    tagline:
      "Stackbinary delivers custom software for businesses across Dubai and the UAE: web platforms, enterprise systems, integrations and AI-powered products. We give you senior engineering, weekly visible progress and complete ownership of every line of code.",
    heroStats: [
      { value: "55+", label: "products delivered by our engineering team, including platforms we operate in production ourselves" },
      { value: "100%", label: "IP ownership assigned to you on payment: source code, documentation and infrastructure, with no lock-in" },
      { value: "Weekly", label: "working software demonstrated every week during your business hours, from the second week of the project" },
    ],
    intro: {
      heading: "Trusted Software Development Services in Dubai",
      paragraphs: [
        "Businesses in Dubai choose custom software when off-the-shelf tools stop fitting the way they operate: a workflow the market's products do not cover, systems that need to talk to each other, or a product idea that deserves its own platform. Stackbinary designs, builds and operates that software. Our portfolio spans customer platforms, enterprise operations systems, marketplaces and AI-powered products, and several of the systems we have built we run ourselves in production, including live AI platforms serving real customers every day. That operating experience shapes how we engineer for clients: reliability, monitoring and maintainability are part of the build, not an aftersale.",
        "We serve the UAE from our office at Regal Tower in Business Bay, alongside our offices in the USA and India, with a team structured for international delivery. Your project gets a named lead engineer, a shared communication channel and weekly demonstrations of working software in your business hours, so progress is something you see and click rather than read about in a status report.",
        "Every engagement is commercially straightforward: a written fixed-scope proposal with deliverables, milestones, timeline and one fixed price, agreed before the project begins. Scope changes are priced transparently as changes. On completion, all intellectual property transfers to you, and the system is documented so any competent team can operate and extend it.",
      ],
    },
    offerings: {
      heading: "Our Custom Software Development Services in Dubai",
      lead: "End-to-end delivery by one senior team, under one fixed-scope proposal per project.",
      items: [
        {
          title: "Web Platforms and SaaS Development",
          description:
            "Customer portals, marketplaces, booking systems and full SaaS products, delivered with the operational tooling to run them: monitoring, backups and deployment pipelines included.",
        },
        {
          title: "Enterprise Software Development",
          description:
            "Operations, inventory, HR and finance systems built around how your business actually works, replacing spreadsheet processes with software your team can rely on.",
        },
        {
          title: "AI Software Development",
          description:
            "AI applied where it creates measurable value: document processing, lead qualification, customer service automation and AI agents integrated into your workflows.",
        },
        {
          title: "System Integration and APIs",
          description:
            "Your CRM, ERP, payment gateway, WhatsApp Business API and accounting stack connected through official APIs and event pipelines, engineered for reliability.",
        },
        {
          title: "Software Modernization",
          description:
            "Legacy systems rebuilt without disrupting the business: incremental migration to modern stacks, with old and new running side by side until cutover is proven safe.",
        },
        {
          title: "Dedicated Development Teams",
          description:
            "A named senior team working your Dubai hours as an extension of your company, for organizations that need ongoing engineering capacity beyond a single project.",
        },
      ],
    },
    deepDive: [
      {
        heading: "Software Development Expertise Across UAE Industries",
        paragraphs: [
          "Real estate leads our UAE work. Brokerages, developers and property managers run on lead flow, and we build the systems that maximize it: lead capture and routing from portals and campaigns, automated follow-up over WhatsApp and email, listing and commission management, and AI qualification that ensures agents spend their time on genuine buyers. Owning these systems outright, rather than renting them per seat, changes the economics of a growing brokerage.",
          "The same engineering depth serves the UAE's other core sectors. Trading and logistics companies rely on us for operations platforms that connect fleets, warehouses and customs workflows. Retail and e-commerce businesses get inventory, loyalty and fulfilment connected to their storefronts. Clinics and wellness groups get booking, reminders and patient communication built WhatsApp-first, because that is how UAE customers respond. Hospitality operators get guest systems that perform across languages. In every sector, we design for the UAE's operating reality: multilingual customers, seven-day business weeks and companies that scale fast.",
          "Data protection is engineered in from the start. Systems handling personal data of UAE residents are designed with the UAE Personal Data Protection Law in mind, and where data residency matters we deploy to Gulf cloud regions, including AWS UAE, under accounts you control.",
        ],
      },
      {
        heading: "Why Businesses in Dubai Choose Stackbinary",
        paragraphs: [
          "Proof you can verify. Beyond a portfolio of 55+ delivered products, we operate our own software in production, including AI platforms answering live business calls and automation systems managing real advertising budgets. A development partner that runs its own systems brings operating discipline you can measure: uptime habits, monitoring standards and an instinct for the failure cases that only production teaches.",
          "A delivery model designed for certainty. One fixed price agreed up front, milestones you accept one by one, weekly demonstrations of working software, and a named lead engineer accountable to you throughout. Our efficiency comes from a mature engineering practice, including AI-assisted delivery pipelines we built ourselves, which is why our proposals typically come in well below prevailing Dubai agency quotes for equivalent scope, with senior engineers on the work end to end.",
          "Complete ownership and independence. Your systems are built inside cloud and API accounts you own, the IP assigns to you fully on payment, and handover documentation is a project milestone, not a courtesy. Everything we build for you keeps running, and keeps being extendable, whether or not we are the team extending it.",
        ],
      },
    ],
    process: {
      heading: "Our Software Development Process",
      lead: "Six stages, each ending in something you can see or use. Most projects reach a working first delivery within the first month.",
      steps: [
        {
          title: "Discovery Call",
          description:
            "A working session on your process, your systems and what the software must achieve, with our Dubai contact and the lead engineer on the call.",
        },
        {
          title: "Fixed-Scope Proposal",
          description:
            "A written proposal covering deliverables, milestones, team, timeline and one fixed price, agreed before any build starts.",
        },
        {
          title: "Design and Architecture",
          description:
            "Screens and system design reviewed with you before development, so the important decisions are made where changing them is easy.",
        },
        {
          title: "Build in Weekly Increments",
          description:
            "Working software demonstrated every week in your business hours, with your feedback steering each sprint.",
        },
        {
          title: "Launch and Data Migration",
          description:
            "Controlled rollout with your real data, your team trained on the system, and existing processes kept running until cutover is proven safe.",
        },
        {
          title: "Operate or Hand Over",
          description:
            "Full documentation, dashboards and runbooks. Your team runs the system independently, or we operate it under a support agreement.",
        },
      ],
    },
    techStack: {
      heading: "The Technology Stack We Build On",
      lead: "Selected per project and run inside your own cloud accounts, so you keep billing control and data custody from day one.",
      groups: [
        {
          name: "Application Engineering",
          items: ["Next.js and React", "Node.js", "Python and FastAPI", "Flutter", "PostgreSQL", "Redis"],
        },
        {
          name: "AI and Automation",
          items: ["OpenAI GPT-5", "Anthropic Claude", "Open-weight models", "LangGraph", "n8n pipelines", "WhatsApp Business API"],
        },
        {
          name: "Cloud and Operations",
          items: ["AWS including me-central-1 (UAE)", "GCP", "Docker", "GitHub Actions CI", "Monitoring and alerting", "Automated backups"],
        },
        {
          name: "Integrations",
          items: ["Payment gateways", "CRM and ERP APIs", "Property portals", "Accounting systems", "SSO and identity", "Event pipelines"],
        },
      ],
    },
    compliance: {
      heading: "Data Protection Built for the UAE",
      lead: "Compliance is an architecture input from day one, not a paragraph added before launch.",
      items: [
        {
          title: "UAE PDPL-Aware by Design",
          description:
            "Systems handling personal data of UAE residents are designed with the UAE Personal Data Protection Law in mind: consent capture, purpose limitation, retention rules and reliable deletion.",
        },
        {
          title: "Data Residency in the Gulf",
          description:
            "Where residency matters, we deploy to Gulf cloud regions, including AWS UAE (me-central-1) and Bahrain (me-south-1), so customer data stays in the region under your account.",
        },
        {
          title: "SOC 2-Aligned Engineering Practice",
          description:
            "Access control, encryption in transit and at rest, audit logging and change management are standard in our builds, aligned with SOC 2 expectations.",
        },
        {
          title: "Your Accounts, Your Custody",
          description:
            "We build inside cloud and API accounts you own, as scoped collaborators. From the first commit, your systems and your data remain under your control.",
        },
      ],
    },
    faqHeading: "Custom Software Development in Dubai, Common Questions",
    faqs: [
      {
        question: "How much does custom software development cost in Dubai?",
        answer:
          "Every project is quoted as one fixed price based on its scope, agreed in writing before work begins. For equivalent scope, our proposals typically come in well below prevailing Dubai agency quotes, because our delivery model is built on senior engineers and AI-assisted development pipelines rather than large blended teams. The discovery call and the written proposal are free, so the fastest way to get an accurate number for your project is to describe it to us.",
      },
      {
        question: "How long does a custom software project take?",
        answer:
          "A focused first version typically takes six to twelve weeks depending on integrations, with working software demonstrated weekly from the second week. We deliver a usable release early by design, because real usage sharpens requirements faster than any specification document. Larger platforms run in milestone phases, each independently priced and accepted.",
      },
      {
        question: "Do we own the source code?",
        answer:
          "Yes, completely. The agreement assigns all work product to you on payment: source code, documentation, infrastructure configuration and design assets. We keep no license to reuse your system and build no lock-in dependencies. Your software keeps running and any competent team can maintain it from the handover documentation.",
      },
      {
        question: "Can you build AI features into our software?",
        answer:
          "Yes. AI development is one of our core practices, and we operate our own AI systems in production, including voice AI that answers live business calls. That means AI in your project is delivered with evaluation, monitoring and guardrails, built by a team that runs this technology commercially. Where AI is not the right tool for a requirement, we advise exactly that and engineer the dependable conventional solution instead.",
      },
      {
        question: "Do you work with UAE free zone companies and startups?",
        answer:
          "Yes. Mainland, free zone and offshore structures are all standard for us, and contracts are drafted to match your entity. For startups we scope a genuine MVP first: the smallest system that can face real customers, so your budget goes into validated learning rather than unproven features.",
      },
      {
        question: "Can you take over software another company built?",
        answer:
          "In most cases, yes. We begin with a technical audit of the code, security, infrastructure and documentation, delivered as a written report with a clear recommendation: maintain, refactor or rebuild. The recommendation is honest either way, including when the existing system is sound and only needs ongoing maintenance.",
      },
      {
        question: "How do you keep our data secure during the project?",
        answer:
          "Your data stays in accounts you own, with our engineers as scoped, auditable collaborators. We encrypt in transit and at rest, log access, and sign your NDA before any sensitive material moves. For regulated data we design to the applicable requirements, including the UAE PDPL, from the architecture stage.",
      },
      {
        question: "How do we start?",
        answer:
          "Book a thirty-minute discovery call through the form below or our contact page, or meet us at Regal Tower in Business Bay. You will speak with our Dubai contact and a lead engineer, and receive a written fixed-price proposal within a few business days. If an NDA needs to come first, send yours or use ours.",
      },
    ],
    formService: "Dubai: Custom Software Development",
    formServices: DUBAI_FORM_SERVICES,
    formHeading: "Get a Fixed-Price Proposal for Your Dubai Project",
    related: ["mobile-app-development-dubai"],
  },

  /* ================================================================== */
  /* /services/mobile-app-development-dubai                              */
  /* target: "mobile app development dubai" cluster ~4,000/mo idx 24,    */
  /* "app development company dubai" 1,900/mo idx 24                     */
  /* ================================================================== */
  "mobile-app-development-dubai": {
    badge: "Mobile App Development Dubai · iOS, Android, Flutter",
    seoTitle: "Mobile App Development Company in Dubai, UAE",
    seoDescription:
      "Mobile app development company in Dubai: iOS, Android and Flutter apps with AI built in. 55+ delivered products, fixed-price proposals, office in Business Bay, your IP.",
    title: "Mobile App Development Company in Dubai, UAE",
    tagline:
      "Stackbinary builds iOS, Android and Flutter apps for businesses across Dubai and the UAE: customer apps, delivery and booking platforms, enterprise tools and AI-powered products, engineered to succeed well beyond launch day.",
    heroStats: [
      { value: "55+", label: "products delivered by our engineering team, including apps and platforms we operate in production ourselves" },
      { value: "100%", label: "ownership for you: the app ships under your store accounts and all code assigns to you on payment" },
      { value: "Weekly", label: "installable builds on your own phone from the second week, through TestFlight and internal release tracks" },
    ],
    intro: {
      heading: "Expert Mobile App Developers for Dubai Businesses",
      paragraphs: [
        "A successful mobile app is a complete product: the app your customers touch, the backend that powers it, the admin panel your team runs the business from, and the analytics that show what to improve next. Stackbinary delivers all of it under one fixed-scope proposal. Our portfolio spans consumer apps, on-demand platforms, enterprise tools and AI-powered products, and we operate several of our own products in production, which keeps our engineering standards anchored in real commercial use.",
        "For most business apps we recommend Flutter, delivering iOS and Android from a single codebase with near-native performance, one team and one testing surface. Where a product genuinely benefits from native Swift or Kotlin development, such as intensive real-time media or deep platform hardware integration, we recommend native and explain the trade-offs clearly. Platform recommendations come from engineering analysis of your product, presented with reasons you can evaluate.",
        "AI capability is a core part of our app development practice. In-app assistants grounded in your business data, multilingual voice interfaces, smart search and personalization are features we build routinely, on the same engineering foundations as the AI systems we operate ourselves. If your app should be more intelligent than a set of static screens, we are the right conversation.",
      ],
    },
    offerings: {
      heading: "Mobile App Development Services in Dubai and the UAE",
      lead: "One senior team, one fixed-scope proposal, from first screen to store release and beyond.",
      items: [
        {
          title: "iOS and Android App Development",
          description:
            "Consumer and business apps for both stores from one Flutter codebase, or native Swift and Kotlin where the product demands it, with the recommendation explained before you commit.",
        },
        {
          title: "AI-Powered Mobile Apps",
          description:
            "Apps with intelligence built in: in-app assistants grounded in your data, multilingual voice interfaces, smart search and personalization, engineered by a team that runs AI in production.",
        },
        {
          title: "On-Demand and Marketplace Apps",
          description:
            "Delivery, booking and services marketplaces with the complete system: customer app, provider app, dispatch logic, payments and the admin panel that runs the operation.",
        },
        {
          title: "E-Commerce and Retail Apps",
          description:
            "Storefronts connected to live inventory, payments, loyalty and WhatsApp-first customer communication, designed for the UAE's multilingual, mobile-first shoppers.",
        },
        {
          title: "Enterprise and Internal Apps",
          description:
            "Field-force, operations and employee apps that integrate with your existing systems and work offline in warehouses, on sites and in vehicles.",
        },
        {
          title: "App Modernization and Takeover",
          description:
            "Existing apps audited and upgraded: outdated stacks migrated, stability improved and release pipelines restored, without losing your users or your data.",
        },
      ],
    },
    deepDive: [
      {
        heading: "App Development Expertise Across UAE Industries",
        paragraphs: [
          "Real estate is a cornerstone of our UAE work. Speed to lead decides outcomes in Dubai property, and we build the apps that win it: agent apps for responding, scheduling viewings and updating listings from anywhere, buyer-facing property apps, and AI qualification that ensures every enquiry gets an instant response while agents focus on genuine buyers. Built as owned systems, they scale with your business instead of scaling their subscription price against it.",
          "Across other sectors, the pattern holds: delivery and logistics apps with live tracking and dispatch, clinic and wellness apps where booking and reminders run over WhatsApp because that is where UAE customers respond, retail apps tied to live inventory, and hospitality apps that perform across English, Arabic and the other languages of the UAE market. Arabic support means proper right-to-left design from the first screen, not a translation pass at the end.",
          "Every app ships with the operational layer that determines its long-term success: crash reporting, analytics, staged rollouts, store compliance for both Apple and Google, and a release pipeline your team can operate after handover. We build apps to be improved continuously, because the version that wins your market is rarely the version that launched.",
        ],
      },
      {
        heading: "Why Businesses in Dubai Choose Stackbinary for App Development",
        paragraphs: [
          "Verifiable delivery. Our portfolio of 55+ delivered products includes apps and platforms we operate ourselves in production, serving real customers today. That operating experience translates directly into client work: performance budgets, monitoring, store-compliance discipline and the engineering judgment that comes from running products commercially rather than handing them over at launch.",
          "Direct engineering, transparent structure. The proposal names your team, and the people in the weekly demo are the people writing your app. Progress is installable: from the second week you carry the current build on your own phone, and your feedback steers each sprint. Our partners on the ground in Dubai support everything that benefits from being in the room with you.",
          "Commercial clarity. One fixed price for the complete system, including backend, admin panel and store submission, agreed before development starts. Our efficiency comes from a mature practice and AI-assisted delivery pipelines we engineered ourselves, which is why our proposals typically come in well below prevailing Dubai agency quotes for equivalent scope. The app ships under your store accounts, the code assigns to you on payment, and independence is built into the handover.",
        ],
      },
    ],
    process: {
      heading: "How We Build and Launch Your App",
      lead: "Six stages, with working software from the second week and installable releases from the first month.",
      steps: [
        {
          title: "Product and Feasibility Call",
          description:
            "What the app must do, for whom, and what success looks like in numbers, assessed with our Dubai contact and a lead engineer.",
        },
        {
          title: "Fixed-Scope Proposal",
          description:
            "Deliverables, milestones, team, timeline and one fixed price, covering the app, backend, admin panel and store submission.",
        },
        {
          title: "Design and Prototype",
          description:
            "Clickable designs for the full user journey, reviewed with you screen by screen before development begins.",
        },
        {
          title: "Build in Weekly Releases",
          description:
            "Installable builds on your phone every week through TestFlight and internal tracks, with your feedback steering each sprint.",
        },
        {
          title: "Store Launch",
          description:
            "Apple and Google review managed by us, including the compliance requirements that delay first submissions, with staged rollout and monitoring from day one.",
        },
        {
          title: "Iterate or Hand Over",
          description:
            "Post-launch analytics reviewed together, a costed iteration plan, and full handover of code, stores and pipelines whenever you choose.",
        },
      ],
    },
    techStack: {
      heading: "The Technology Behind Our Dubai App Projects",
      lead: "Modern, proven and always inside accounts you own.",
      groups: [
        {
          name: "Mobile",
          items: ["Flutter", "Swift and SwiftUI", "Kotlin", "Push and deep linking", "Offline-first storage", "App analytics"],
        },
        {
          name: "Backend and APIs",
          items: ["Node.js", "Python and FastAPI", "PostgreSQL", "Supabase", "Redis", "Realtime and websockets"],
        },
        {
          name: "AI in Apps",
          items: ["OpenAI GPT-5", "Anthropic Claude", "On-device models", "Voice and speech", "Smart search", "Document scanning"],
        },
        {
          name: "Payments and UAE Integrations",
          items: ["UAE payment gateways", "Apple Pay and Google Pay", "WhatsApp Business API", "SMS and OTP providers", "Maps and geolocation", "CRM and ERP APIs"],
        },
      ],
    },
    compliance: {
      heading: "Store-Ready and UAE-Ready",
      lead: "The requirements that decide launch dates, handled as engineering from day one.",
      items: [
        {
          title: "UAE PDPL-Aware Data Handling",
          description:
            "Consent, retention and deletion for UAE user data designed in from the architecture stage, with Gulf data residency options including AWS UAE (me-central-1) where required.",
        },
        {
          title: "Apple and Google Compliance",
          description:
            "Privacy manifests, data safety forms, sign-in requirements and payment rules handled correctly the first time, protecting your launch date from avoidable rejections.",
        },
        {
          title: "SOC 2-Aligned Engineering Practice",
          description:
            "Access control, encrypted transport and storage, audit logging and reviewed releases as standard practice on every build.",
        },
        {
          title: "Your Stores, Your Accounts",
          description:
            "Apps ship under your Apple and Google developer accounts, backends run in your cloud. Your app, your users and your reviews remain yours in every scenario.",
        },
      ],
    },
    faqHeading: "Mobile App Development in Dubai, Common Questions",
    faqs: [
      {
        question: "How much does mobile app development cost in Dubai?",
        answer:
          "Every app is quoted as one fixed price based on its scope, covering the complete system: the app, backend, admin panel and store submission. Two factors work in your favour: a single Flutter codebase for both stores costs meaningfully less to build and maintain than parallel native apps, and our proposals typically come in well below prevailing Dubai agency quotes for equivalent scope. Describe your app through the form or our contact page and you will have a written fixed price within a few business days.",
      },
      {
        question: "How long does it take to build an app?",
        answer:
          "A focused first version typically takes eight to fourteen weeks from proposal to store release, with installable weekly builds from the second week, so you are using your app months before launch day. Marketplace and multi-app platforms run in phased milestones, each independently priced. Apple and Google review time is built into the plan from the start.",
      },
      {
        question: "Should we build with Flutter or native, and who decides?",
        answer:
          "Our engineers recommend, with reasons you can evaluate, and you decide. Flutter with one codebase for iOS and Android is the right choice for most business apps: near-native performance, one team, one testing surface and substantially lower build and maintenance cost. Products that genuinely benefit from native development, such as intensive real-time media or deep hardware integration, get a native recommendation with the trade-offs laid out clearly.",
      },
      {
        question: "Do you build the backend and admin panel too?",
        answer:
          "Always, unless you have existing systems we should integrate with. An app is only as strong as the platform behind it, so our proposals scope the complete product: the app, the server, the admin dashboard your team operates from, and the release pipeline. One proposal, one price, no follow-on invoices hiding behind the first.",
      },
      {
        question: "Can you add AI features like a chatbot or voice assistant to our app?",
        answer:
          "Yes, and it is one of our strongest capabilities. We operate our own AI systems in production, including voice AI answering live business calls in multiple languages, so AI features in your app are built on engineering proven with real customers: in-app assistants grounded in your data, voice interfaces, smart search and personalization, all delivered with proper evaluation and guardrails.",
      },
      {
        question: "Will our app work in Arabic?",
        answer:
          "Yes. Right-to-left layout, Arabic typography and multilingual content are designed in from the first screen. The UAE market is genuinely multilingual, with English, Arabic, Hindi and Urdu speakers often sharing one customer base, and we engineer apps to serve all of them seamlessly.",
      },
      {
        question: "Who owns the app, the code and the store listings?",
        answer:
          "You do, entirely. The app ships under your own Apple and Google developer accounts from day one, the backend runs in your cloud accounts, and the agreement assigns all code and assets to you on payment. Your app, your users, your reviews and your codebase remain yours in every scenario.",
      },
      {
        question: "Can you take over an app another agency built?",
        answer:
          "In most cases, yes. We begin with a technical audit of the codebase, backend and store setup, delivered as a written report: what is sound, what needs work and what it will cost, with an honest recommendation either way, including when the existing app only needs ongoing maintenance.",
      },
      {
        question: "How do we start?",
        answer:
          "Book a call through the form below or our contact page, or meet us at Regal Tower in Business Bay. You will discuss the app with our Dubai contact and a lead engineer, and receive a written fixed-price proposal covering the complete system within a few business days.",
      },
    ],
    formService: "Dubai: Mobile App Development",
    formServices: DUBAI_FORM_SERVICES,
    formHeading: "Get a Fixed-Price Proposal for Your App",
    related: ["custom-software-development-dubai"],
  },
};

export function getDubaiPage(slug) {
  return dubaiPages[slug] || null;
}

export function getAllDubaiSlugs() {
  return Object.keys(dubaiPages);
}

// Anchor text for the related-links grid, same contract as aiServiceAnchors.
export const dubaiAnchors = {
  "custom-software-development-dubai": "Custom software development in Dubai",
  "mobile-app-development-dubai": "Mobile app development in Dubai",
};
