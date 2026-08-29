// Content for the Dubai/UAE services pair rendered by the static routes
// /services/custom-software-development-dubai and
// /services/mobile-app-development-dubai. Same shape as aiServicesPages
// entries; consumed by the same AIServicePage template.
//
// Why these pages exist (research 2026-08-29): the Dubai software SERPs
// carry real volume at LOW competition ("mobile app development dubai"
// cluster ~4,000/mo idx 24, "software development dubai" cluster ~3,500/mo)
// and page one is held entirely by peer agencies, most of them Indian-origin
// shops with Dubai landing pages (Royex, Apptunix, Code Brew). The ranking
// formula, from the 2026-08-29 teardown of the top pages: exact keyword plus
// city in title and H1, variant-keyword H2s, 2,000-7,000 words, UAE trust
// anchors, industry blocks with real estate first, FAQPage schema.
//
// PRICING RULE (owner decision 2026-08-29): NO AED figures on these pages,
// and no currency figures at all for now. Cost questions are answered
// qualitatively: market rate versus our roughly-half, one fixed price.
//
// Copy rules enforced by review: no em dashes, the company is "Stackbinary",
// no named products on services pages (systems described generically),
// compliance only as "aligned" / "ready" / "aware", never certified. We have
// no Dubai office: never imply one. The honest local anchor is the
// Dubai-based sales contact and the 1.5 hour time difference.

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
    seoTitle: "Custom Software Development in Dubai, UAE",
    seoDescription:
      "Custom software development for Dubai and UAE businesses: web platforms, internal systems and AI-first builds. 55+ shipped products, fixed-price proposals, partners in Dubai.",
    title: "Custom Software Development in Dubai You Can Actually Verify",
    tagline:
      "Stackbinary builds custom software for businesses in Dubai and across the UAE: web platforms, internal systems, integrations and AI-first products. We are an engineering company with over 55 shipped products, several of which we operate ourselves in production, and a Dubai-based point of contact who speaks your market. Fixed-scope proposals, senior engineers, and every line of code owned by you.",
    heroStats: [
      { value: "55+", label: "products shipped by the engineering team you actually get, several running in production under our own name" },
      { value: "1.5h", label: "time difference between Dubai and our engineering floor. Your working day is our working day, not your midnight" },
      { value: "100%", label: "IP assignment on payment: code, documentation and infrastructure, with no lock-in and no license back to us" },
    ],
    intro: {
      heading: "What a Software Development Company in Dubai Should Prove Before You Sign",
      paragraphs: [
        "Search for a custom software development company in Dubai and you will find fifty agencies with the same page: a logo wall, a portfolio of screenshots and a claim to be number one. Almost none of them can show you software they operate themselves, and that is the single most revealing question you can ask a development partner. An agency that has only ever shipped client demos has never been woken by its own system failing at 2am. We have: we run our own live platforms, including a voice AI system answering real business phone calls and marketing automation spending real advertising budgets, and the engineering habits that come from operating software are in every system we build for clients.",
        "The second thing to verify is who actually writes your code. Much of the Dubai market resells development to subcontracted teams the client never meets, with an account manager in between. Stackbinary is the engineering team: senior engineers in Mumbai, one and a half hours behind Dubai, working your business day with a named lead on your project and a Dubai-based sales contact for everything commercial. No handoffs, no telephone game between you and the people building your product.",
        "The third is the commercial structure. We write fixed-scope proposals: what will exist at the end, the milestones, the team, the timeline and one fixed price before you commit anything. Scope changes are priced as changes, not absorbed into drift. Because our cost base is engineering in India rather than office space in DIFC, the same scope typically lands at roughly half of what Dubai agencies quote, without the quality discount that usually implies at the bottom of the market.",
      ],
    },
    offerings: {
      heading: "Custom Software Development Services in Dubai and the UAE",
      lead: "Everything below is delivered by the same senior team, under one fixed-scope proposal per project.",
      items: [
        {
          title: "Web Platforms and SaaS Development",
          description:
            "Customer portals, marketplaces, booking systems and full SaaS products, built on modern stacks and delivered with the operations tooling to run them: monitoring, backups and deployment pipelines included.",
        },
        {
          title: "Enterprise and Internal Systems",
          description:
            "The software your spreadsheets are pretending to be: inventory, operations, HR and finance workflows, built around how your business actually runs instead of forcing your process into an off-the-shelf tool.",
        },
        {
          title: "AI-First Software Development",
          description:
            "Custom software with AI where it earns its keep: document processing, lead scoring, customer service automation and AI agents inside your workflows. We build AI systems we operate ourselves, not demos.",
        },
        {
          title: "System Integration and APIs",
          description:
            "Your CRM, ERP, payment gateway, WhatsApp Business API and accounting stack, connected properly: event pipelines and official APIs rather than fragile copy-paste middleware.",
        },
        {
          title: "Software Modernization",
          description:
            "Legacy systems rebuilt without stopping the business: incremental migration off outdated stacks, with the old and new running side by side until cutover is safe.",
        },
        {
          title: "Dedicated Development Teams",
          description:
            "A named senior team working your Dubai hours as an extension of your company, for businesses that need ongoing engineering capacity rather than a one-off project.",
        },
      ],
    },
    deepDive: [
      {
        heading: "Software Development for the Industries That Drive Dubai",
        paragraphs: [
          "Real estate first, because in Dubai it is first. Brokerages, developers and property managers run on lead flow, and most of the software sold to them is rented per seat per agent forever. We build owned systems: lead capture and routing from portals and campaigns, automated follow-up over WhatsApp and email, listing and commission management, and AI that qualifies enquiries before an agent spends a minute on them. Owning that system instead of renting it changes the economics of a brokerage at exactly the point where Dubai brokerages compete hardest.",
          "The same logic runs through the UAE's other engines. Trading and logistics companies need operations systems that talk to customs, fleets and warehouses. Retail and e-commerce need inventory, loyalty and fulfilment connected to storefronts. Clinics and wellness businesses need booking, reminders and patient communication that respect how people in the UAE actually communicate, which is to say on WhatsApp. Hospitality needs guest journeys that do not collapse across language boundaries. We design for the UAE's operating reality: multilingual customers, WhatsApp-first communication and businesses that run seven days a week.",
          "What we deliberately do not do is claim to be a Dubai company. We are an Indian engineering company that serves the UAE, and you should be suspicious of how many ranking agencies blur that line with a rented desk and a booth photo. What we do have in Dubai is real: a network of partners we work with on the ground, a commercial contact in your market and time zone, and shipped products you can open, click and phone today. In a market this full of logo walls, verifiability is the differentiator.",
        ],
      },
      {
        heading: "Why UAE Businesses Choose Us Over a Local Agency, Honestly",
        paragraphs: [
          "The economics are the visible half. Dubai agencies carry Dubai costs and price accordingly, and the offshore shops undercutting them compete on rate cards instead of outcomes. We sit in the gap on purpose: senior engineering at Indian cost with delivery discipline structured for buyers who cannot afford a failed project. The same budget buys roughly twice the engineering, which on a real build is the difference between an MVP and a finished system with monitoring, documentation and a second iteration informed by real users.",
          "The less visible half is the delivery structure that removes the classic offshore risks. You get a named lead engineer, a shared channel, weekly demo calls where you click working software instead of reading status reports, and daily overlap through your entire working day because Gulf Standard Time and our engineering hours are ninety minutes apart. Contracts assign IP to you completely on payment. We sign your NDA before hearing anything sensitive. And the engagement starts small on purpose, with a scoped first milestone, so the trust decision you make on day one is modest and reversible.",
          "Ask any shortlisted vendor the operating question: what do you run in production yourselves, and can we see it? Our answer is live systems you can try before the first call. If the others on your shortlist have a better answer, hire them.",
        ],
      },
    ],
    process: {
      heading: "How We Deliver Software Projects for Dubai Clients",
      lead: "Six stages, each ending in something you can see or use. Most projects reach a working first delivery within the first month.",
      steps: [
        {
          title: "Discovery Call",
          description:
            "A working session on your process, your systems and what the software must change. Your Dubai contact and the lead engineer are both on this call.",
        },
        {
          title: "Fixed-Scope Proposal",
          description:
            "A written proposal: deliverables, milestones, team, timeline and one fixed price. Signed before any build starts, so the number you agree is the number you pay.",
        },
        {
          title: "Design and Architecture",
          description:
            "Screens and system design reviewed with you before code, so expensive decisions are made on paper where changing them is free.",
        },
        {
          title: "Build in Weekly Increments",
          description:
            "Working software demonstrated every week in your business hours. You steer while the project moves, not after it lands.",
        },
        {
          title: "Launch and Data Migration",
          description:
            "Controlled rollout with your real data, your team trained on the system, and the legacy process kept warm until cutover is proven safe.",
        },
        {
          title: "Operate or Hand Over",
          description:
            "Full documentation, dashboards and runbooks. Your team runs it independently, or we operate it under a support agreement. Either way it is yours.",
        },
      ],
    },
    techStack: {
      heading: "The Stack We Build On",
      lead: "Chosen per project, not by habit, and run inside your own cloud accounts so you keep billing control and data custody from day one.",
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
      lead: "Compliance is an architecture input, not a paragraph added before launch.",
      items: [
        {
          title: "UAE PDPL-Aware by Design",
          description:
            "Systems handling personal data of UAE residents are designed with the UAE Personal Data Protection Law in mind: consent capture, purpose limitation, retention rules and deletion that actually deletes.",
        },
        {
          title: "Data Residency Options in the Gulf",
          description:
            "Where residency matters, we deploy to Gulf cloud regions, including AWS UAE (me-central-1) and Bahrain (me-south-1), so customer data stays in the region under your account.",
        },
        {
          title: "SOC 2-Aligned Engineering Practice",
          description:
            "Access control, encryption in transit and at rest, audit logging and change management are standard in our builds, aligned with SOC 2 expectations rather than bolted on later.",
        },
        {
          title: "Your Accounts, Your Custody",
          description:
            "We build inside cloud and API accounts you own, as scoped collaborators. From the first commit, leaving us never means losing your system.",
        },
      ],
    },
    faqHeading: "Custom Software Development in Dubai, Common Questions",
    faqs: [
      {
        question: "How much does custom software development cost in Dubai?",
        answer:
          "It depends on scope, and any agency quoting a number before understanding your project is quoting a hook, not a price. What we can say plainly: Dubai agencies carry Dubai overheads and price accordingly, and for the same scope our proposals typically land at roughly half of what the established local agencies quote, as one fixed price agreed before you commit. The first call and the written proposal are free, so the cheapest way to get a real number for your project is to describe it to us.",
      },
      {
        question: "Why work with a company that has no Dubai office?",
        answer:
          "Because you are buying engineering, not office space. We are open about what we are: an Indian engineering company serving the UAE, with partners on the ground in Dubai and a commercial contact who meets you in your market. The engineering runs one and a half hours behind Gulf time, so your entire working day overlaps with ours, a tighter overlap than most European or American vendors can offer. What you save is the tower rent baked into local agency pricing. What you keep is everything that matters: a named lead engineer, weekly demos in your hours, and contracts that assign the IP to you completely.",
      },
      {
        question: "How long does a custom software project take?",
        answer:
          "A focused first version typically takes six to twelve weeks depending on integrations, with working software demonstrated weekly from the second week. We ship a usable release early on purpose, because real usage reshapes assumptions and steering a moving project beats reviewing a finished one. Larger platforms run in milestone phases, each independently priced and accepted.",
      },
      {
        question: "Do we own the source code?",
        answer:
          "Completely. The agreement assigns all work product to you on payment: source code, documentation, infrastructure configuration and design assets. We keep no license to reuse your system and build no lock-in hooks. If you end the relationship after delivery, everything keeps running without us, and any competent team can take it over from the documentation.",
      },
      {
        question: "Can you build AI features into our software?",
        answer:
          "Yes, and this is where we differ most from the general-purpose agencies in the Dubai market. We build and operate our own AI systems in production, including voice AI answering live business calls, so AI in your project means working systems with evaluation and guardrails, not a chatbot widget added for the demo. Where AI is the wrong tool for your problem, we will say so and build the boring reliable version instead.",
      },
      {
        question: "Do you work with UAE free zone companies and startups?",
        answer:
          "Yes. Mainland, free zone and offshore structures are all normal for us, and the contract is drafted to match your entity. For startups we scope a genuine MVP first: the smallest system that can face real customers, so the budget goes into learning what the market wants rather than into features nobody has validated.",
      },
      {
        question: "Can you take over software another company built?",
        answer:
          "Usually, yes. We start with a paid technical audit: code quality, security, infrastructure and documentation, delivered as a written report with a recommendation to rescue, refactor or rebuild, and an honest one, since rebuilding everything is not always in your interest. Rescues are common in the Dubai market, where projects are frequently subcontracted twice before anyone writes code.",
      },
      {
        question: "How do we start?",
        answer:
          "A thirty-minute call with your Dubai-based contact and our lead engineer, followed by a written fixed-price proposal within a few business days. If an NDA needs to come first, send yours or use ours. If the project is not a fit, we will say so on the call and point you somewhere useful.",
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
    seoTitle: "Mobile App Development in Dubai, UAE",
    seoDescription:
      "Mobile app development for Dubai and UAE businesses: iOS, Android and Flutter apps with AI built in. 55+ shipped products, fixed-price proposals, your IP.",
    title: "Mobile App Development in Dubai for Apps That Outlive Their Launch",
    tagline:
      "Stackbinary builds iOS, Android and Flutter apps for businesses in Dubai and across the UAE: customer apps, delivery and booking platforms, internal tools and AI-powered products. An engineering team with over 55 shipped products, a Dubai-based point of contact, fixed-scope pricing and complete IP ownership for you.",
    heroStats: [
      { value: "55+", label: "shipped products behind the team on your project, including apps and platforms we operate ourselves in production" },
      { value: "1.5h", label: "between Dubai time and our engineering floor: daily standups, demos and support inside your working day" },
      { value: "1", label: "codebase for iOS and Android with Flutter, where it fits, which is most of the time and most of the budget saved" },
    ],
    intro: {
      heading: "What App Development in Dubai Usually Gets Wrong",
      paragraphs: [
        "Most mobile apps commissioned in Dubai die within a year of launch, and rarely because the code was bad. They die because the agency's job ended at the app store while the actual product work was just beginning: the backend that has to scale past the launch campaign, the analytics that tell you what users do, the iteration loop that turns version one into something people keep. We build apps as products, not deliverables: backend, admin panel, analytics and a release pipeline are part of the scope, because an app without them is a screenshot that compiles.",
        "The second thing the market gets wrong is platform strategy. Building native iOS and Android separately doubles cost and halves iteration speed, and for most business apps it buys nothing your users will notice. We default to Flutter with one codebase for both stores, and we will tell you plainly when your app is one of the exceptions that genuinely needs native, such as heavy real-time media or platform-specific hardware work. The recommendation comes from engineers, not from whichever technology the agency has spare capacity in.",
        "And because it is 2026: AI belongs inside apps now, not beside them. In-app assistants that answer from your real data, voice interfaces in multiple languages, smart search, document scanning and personalization are things we build routinely, on the same engineering we use in AI systems we operate ourselves. Dubai's app market is full of agencies that renamed their old services page to include AI. Ask for a working demonstration, from us and from everyone else on your shortlist.",
      ],
    },
    offerings: {
      heading: "Mobile App Development Services in Dubai and the UAE",
      lead: "One senior team, one fixed-scope proposal, from first screen to store release and beyond.",
      items: [
        {
          title: "iOS and Android App Development",
          description:
            "Consumer and business apps for both stores from one Flutter codebase, or native Swift and Kotlin where the product genuinely demands it, with the trade-off explained before you spend.",
        },
        {
          title: "AI-Powered Mobile Apps",
          description:
            "Apps with AI at the core: in-app assistants grounded in your data, multilingual voice interfaces, smart search and personalization, built by a team that runs AI systems in production.",
        },
        {
          title: "On-Demand and Marketplace Apps",
          description:
            "Delivery, booking and services marketplaces with the full machinery: customer app, provider app, dispatch logic, payments and the admin panel that runs the business.",
        },
        {
          title: "E-Commerce and Retail Apps",
          description:
            "Storefronts connected to real inventory, payments, loyalty and WhatsApp-first customer communication, built for the UAE's multilingual, mobile-first shoppers.",
        },
        {
          title: "Enterprise and Internal Apps",
          description:
            "Field-force, operations and employee apps that connect to your existing systems and work offline in the places your team actually goes: warehouses, sites and vehicles.",
        },
        {
          title: "App Rescue and Modernization",
          description:
            "Existing apps taken over, audited and rebuilt where needed: outdated stacks migrated, crash rates brought down and release pipelines restored, without losing your users or your data.",
        },
      ],
    },
    deepDive: [
      {
        heading: "Apps for the Industries That Run Dubai",
        paragraphs: [
          "Real estate leads the list for a reason. Dubai brokerages and developers live on speed to lead, and an app that lets agents respond, schedule viewings and update listings from the road, with AI qualifying enquiries before a human touches them, is a competitive weapon rather than a convenience. We build broker apps, buyer-facing property apps and the connective tissue to portals and CRMs behind them, and we build them as owned systems rather than per-agent subscriptions that scale their price with your success.",
          "Beyond property: delivery and logistics apps with live tracking and dispatch, clinic and wellness apps where booking and reminders move over WhatsApp because that is where UAE customers actually respond, retail apps tied to real inventory, and hospitality apps that hold up in five languages. The common thread is that the app is never the whole system. The backend, the admin tools and the integrations are where these products succeed or fail, and they are in our scope from the first proposal.",
          "Every app ships with the operational layer the Dubai market habitually forgets to quote: crash reporting, analytics, staged rollouts, store compliance for both Apple and Google, and a release pipeline your team can run after handover. That is the difference between buying an app and buying eighteen months of arguing with a vendor about maintenance invoices.",
        ],
      },
      {
        heading: "The Honest Comparison With Dubai App Agencies",
        paragraphs: [
          "First, the honest disclosure the market rarely makes: we are not a Dubai company. We are an Indian engineering team serving the UAE through partners on the ground in Dubai and a commercial contact in your market, and several of the top-ranking Dubai agencies are, quietly, the same arrangement with a rented address on top. The structural difference worth your attention is who writes the code: much of the local market subcontracts delivery, adding a margin and a communication layer between you and the engineers. With us the proposal names the team, and the people in the weekly demo are the people writing your app.",
          "Second, the shape of the price. Dubai-based agencies publish wide cost ranges and price to their overheads. Our cost base is engineering in India, ninety minutes from your time zone, and for equivalent scope our fixed-price proposals typically land at roughly half of established local quotes. We put that in writing per project rather than in a marketing range on a page, because a range wide enough to be safe is too wide to be useful.",
          "Third, proof you can touch. Before you sign anything, you can use systems we built and operate ourselves, today, from your phone. We would rather earn the project with a working demonstration than with a wall of logos, and we encourage you to hold everyone on your shortlist to the same standard.",
        ],
      },
    ],
    process: {
      heading: "How We Build and Ship Your App",
      lead: "Six stages with working software from the second week, releases you can install from the first month.",
      steps: [
        {
          title: "Product and Feasibility Call",
          description:
            "What the app must do, for whom, and what success looks like in numbers. If an app is the wrong answer, or version one should be smaller, we say so here.",
        },
        {
          title: "Fixed-Scope Proposal",
          description:
            "Deliverables, milestones, team, timeline and one fixed price, including backend, admin panel and store submission. Agreed before any build starts.",
        },
        {
          title: "Design and Prototype",
          description:
            "Clickable designs for the full journey, reviewed with you screen by screen, so the expensive decisions happen before the expensive part.",
        },
        {
          title: "Build in Weekly Releases",
          description:
            "Installable builds on your own phone every week through TestFlight and internal tracks, with your feedback steering the next sprint.",
        },
        {
          title: "Store Launch",
          description:
            "Apple and Google review handled by us, including the compliance details that stall first submissions, with staged rollout and crash monitoring from day one.",
        },
        {
          title: "Iterate or Hand Over",
          description:
            "Post-launch analytics reviewed together, a costed iteration plan, and full handover of code, stores and pipelines whenever you want it. The app is yours either way.",
        },
      ],
    },
    techStack: {
      heading: "The Stack Behind Our Dubai App Projects",
      lead: "Modern, boring where boring is right, and always inside accounts you own.",
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
      lead: "The unglamorous requirements handled as engineering, not as an afterthought before submission.",
      items: [
        {
          title: "UAE PDPL-Aware Data Handling",
          description:
            "Consent, retention and deletion for UAE user data designed in from the architecture stage, with Gulf data residency options including AWS UAE (me-central-1) where it matters.",
        },
        {
          title: "Apple and Google Compliance",
          description:
            "Privacy manifests, data safety forms, sign-in requirements and payment rules handled correctly the first time, because a rejected submission costs weeks at exactly the wrong moment.",
        },
        {
          title: "SOC 2-Aligned Engineering Practice",
          description:
            "Access control, encrypted transport and storage, audit logging and reviewed releases as standard practice on every build, aligned with SOC 2 expectations.",
        },
        {
          title: "Your Stores, Your Accounts",
          description:
            "Apps ship under your Apple and Google developer accounts, backends run in your cloud. Leaving us never means losing your app, your users or your reviews.",
        },
      ],
    },
    faqHeading: "Mobile App Development in Dubai, Common Questions",
    faqs: [
      {
        question: "How much does mobile app development cost in Dubai?",
        answer:
          "Honestly: it depends on scope, and the wide cost ranges Dubai agencies publish are marketing, not estimates. Two things are reliably true. A single Flutter codebase for both stores costs meaningfully less than parallel native builds, and our fixed-price proposals for equivalent scope typically land at roughly half of what established Dubai agencies quote, because our cost base is engineering rather than Dubai overheads. Describe your app to us and you will have a real, fixed number in writing within a few business days, free.",
      },
      {
        question: "How long does it take to build an app?",
        answer:
          "A focused first version typically takes eight to fourteen weeks from proposal to store release, with installable weekly builds from the second week, so you are using your app months before launch day. Marketplace and multi-app platforms run longer and are phased into independently priced milestones. Apple and Google review time is built into the plan, not discovered at the end.",
      },
      {
        question: "Flutter or native, and who decides?",
        answer:
          "Engineers decide, with reasons you can interrogate. Flutter with one codebase for iOS and Android is the right answer for most business apps: near-native performance, one team, one test surface, roughly half the build and maintenance cost of parallel native apps. Genuine native cases exist, such as heavy real-time media processing or deep platform hardware work, and when your app is one of them we will recommend native and show you why. What we will not do is recommend whatever happens to fit our bench.",
      },
      {
        question: "Do you build the backend and admin panel too?",
        answer:
          "Always, unless you already have one we should integrate with. An app without its backend, admin panel and analytics is a screenshot that compiles. Our proposals scope the full system: the app, the server, the dashboard your team runs the business from, and the release pipeline, so there is no second invoice hiding behind the first.",
      },
      {
        question: "Can you add AI features like a chatbot or voice assistant to our app?",
        answer:
          "Yes, and this is our strongest suit relative to the Dubai market. We operate our own AI systems in production, including voice AI that answers real business phone calls in multiple languages, so in-app assistants, voice interfaces and smart search in your app are built on engineering we already trust with our own customers. Ask any agency proposing AI features for a live demonstration of AI they run themselves; we will happily be judged on that comparison.",
      },
      {
        question: "Will our app work in Arabic?",
        answer:
          "Yes. Right-to-left layout, Arabic typography and multilingual content are designed in from the first screen rather than patched on later, which is the difference between an app that supports Arabic and an app that was translated into it. The same applies to the multilingual reality of the UAE market generally: English, Arabic, Hindi and Urdu users often share one customer base, and the app should not care.",
      },
      {
        question: "Who owns the app, the code and the store listings?",
        answer:
          "You do, entirely. The app ships under your own Apple and Google developer accounts from day one, the backend runs in your cloud accounts, and the agreement assigns all code and assets to you on payment. If we part ways, you keep the app, the users, the reviews and the ability to hand the codebase to any competent team.",
      },
      {
        question: "Can you fix or take over an app another agency built?",
        answer:
          "Usually. We start with a paid audit of the codebase, backend and store setup, delivered as a written report: what is salvageable, what needs rebuilding and what it will cost, with an honest recommendation even when the answer is that the original agency did fine work and you only need maintenance. App rescues are a steady share of our Dubai enquiries for a reason.",
      },
      {
        question: "How do we start?",
        answer:
          "A thirty-minute call with your Dubai-based contact and our lead engineer about the app you have in mind. Within a few business days you get a written fixed-price proposal covering the full system. If the idea needs a smaller version one, or does not need an app at all, we will say exactly that on the call.",
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
