// Industry pages data — sourced from the StackBinary credentials deck.
// Drives /industries and /industries/[slug].

const industries = {
  "healthcare-pharma": {
    name: "Healthcare & Pharma",
    seoTitle: "Healthcare Software Development, EHR, Telemedicine & Medical AI",
    blurb:
      "Compliant, AI-assisted systems for providers, pharma and wellness brands, connecting patient data and extending care beyond the clinic.",
    brands: ["Abbott", "Sanofi", "Aventis", "Nutricia", "ACI Limited", "Sheth Brothers"],
    pains: [
      { title: "Fragmented patient data", detail: "Records scattered across systems with no single view." },
      { title: "No remote access", detail: "Care limited to in-person visits and long wait times." },
      { title: "Slow manual diagnosis", detail: "Imaging and triage are bottlenecks for clinicians." },
      { title: "Compliance risk", detail: "HIPAA / FHIR / HL7 hard to meet and maintain." },
    ],
    built: [
      { name: "iPatientCare", tag: "AI EHR · FHIR", detail: "Consolidates patient data with predictive health insights.", helps: "One source of truth + earlier risk flags, documentation time down 40%." },
      { name: "EaseCare", tag: "Telemedicine · Live", detail: "HIPAA-compliant video consults with patient records (WebRTC).", helps: "50,000+ virtual consultations, wait times down 60%." },
      { name: "AI Medical Diagnosis", tag: "ML Imaging", detail: "CNN / DICOM system that flags abnormalities for radiologists.", helps: "500,000+ images analyzed, detection accuracy up 35%." },
      { name: "MediChat", tag: "NLP Triage", detail: "Chatbot that answers routine patient queries and triages.", helps: "200,000+ interactions handled, staff workload down 70%." },
      { name: "HealthSpace (Afiya)", tag: "Telemedicine · MENA", detail: "Telemedicine platform across 15 MENA countries.", helps: "300,000+ teleconsultations, 5,000+ providers connected." },
      { name: "Ayushman Cowfit", tag: "IoT Livestock Health", detail: "BLE sensors + predictive analytics for cattle health.", helps: "100,000+ cattle monitored, veterinary costs down 45%." },
    ],
  },

  "retail-ecommerce": {
    name: "Retail, E-Commerce & Consumer Brands",
    seoTitle: "E-Commerce Development, Omnichannel Storefronts & AI Personalization",
    blurb:
      "Omnichannel storefronts, AI personalization and cross-platform commerce for fashion, white-goods, electronics and FMCG brands.",
    brands: ["WROGN", "Future Group", "Philips", "D-Link", "Zebronics", "Syska", "Badshah Masala", "Priyagold", "KFC"],
    pains: [
      { title: "Disconnected web & mobile", detail: "Inconsistent experience and abandoned carts." },
      { title: "Generic discovery", detail: "Shoppers can't find the right product fast." },
      { title: "Global complexity", detail: "Multi-currency, sizing and international shipping." },
      { title: "Low repeat rate", detail: "Weak loyalty, re-engagement and retention." },
    ],
    built: [
      { name: "Steve Madden", tag: "Omnichannel", detail: "Unified web + app, multi-currency, inventory management.", helps: "$100M+ online sales, 2M+ app downloads, 50+ markets." },
      { name: "Styola", tag: "AI Stylist · Live", detail: "LLM recommendations + natural-language semantic search.", helps: "Personalised discovery that lifts conversion." },
      { name: "Utsav Fashion", tag: "Global D2C · Live", detail: "Custom sizing, multi-currency, global shipping.", helps: "$20M+ annual revenue across 50+ countries." },
      { name: "Koovs", tag: "Social Commerce", detail: "Flutter app with social feeds and one-click purchase.", helps: "100,000+ downloads, repeat purchases up 60%." },
      { name: "Dudalina", tag: "Premium Fashion", detail: "Brazilian fashion e-commerce with personalization.", helps: "$15M+ online revenue, 3.5x conversion lift." },
      { name: "29+ Shopify storefronts", tag: "D2C · Live", detail: "Kisna, BigMuscles, MyMuse, Bajaao, Jaipur Kurti and more.", helps: "Stores that convert, wired into the marketing stack." },
    ],
  },

  "agriculture-agritech": {
    name: "Agriculture & AgriTech",
    seoTitle: "AgriTech Software Development, IoT, Predictive Analytics & Rural Commerce",
    blurb:
      "IoT, predictive data and digital platforms for agri-input, crop-science and rural-supply brands, turning reactive operations into proactive, data-led ones.",
    brands: ["Bayer CropScience", "Syngenta", "UPL", "Piramal", "Indofil", "Biostadt", "Dhanuka"],
    pains: [
      { title: "Reactive crop/livestock care", detail: "Disease & loss caught far too late." },
      { title: "No field-level data", detail: "Decisions made without ground signals." },
      { title: "Fragmented distribution", detail: "Hard to reach, serve and track rural networks." },
      { title: "Low digital adoption", detail: "Manual, paper-based field operations." },
    ],
    built: [
      { name: "Ayushman Cowfit", tag: "IoT Livestock Health", detail: "BLE sensors + predictive analytics monitor cattle health in real time.", helps: "Early disease detection in 80% of cases, fewer losses." },
      { name: "IoT + Predictive Analytics", tag: "Capability", detail: "The same sensor + ML stack extends to crop, soil & cold-chain monitoring.", helps: "Proactive, data-led field decisions." },
      { name: "Distribution Platforms", tag: "Commerce", detail: "Multi-vendor catalogues, ordering and tracking for rural supply.", helps: "Digitises dealer & farmer distribution." },
    ],
  },

  "automotive-mobility-energy": {
    name: "Automotive, Mobility & Energy",
    seoTitle: "Mobility & Clean Energy Software, Fleet Platforms, EV & Solar Tools",
    blurb:
      "Connected mobility apps, EV & fleet platforms and clean-energy tooling for automotive, fuel and power brands.",
    brands: ["Hyundai", "IndianOil", "Balmerol", "eBikeGo", "Sterlite Power"],
    pains: [
      { title: "Fragmented mobility", detail: "Rides, delivery and EV services split across apps." },
      { title: "Poor fleet visibility", detail: "No real-time tracking of vehicles or drivers." },
      { title: "Manual energy quoting", detail: "Solar & power proposals are slow and error-prone." },
      { title: "Weak direct channel", detail: "Limited owned, data-rich customer relationships." },
    ],
    built: [
      { name: "KROOZ", tag: "Multi-Service Mobility", detail: "Rides, food delivery and courier in one driver/rider app.", helps: "50 countries, 2M+ customers, 10M+ service requests." },
      { name: "Ponttual", tag: "Ride-Hailing", detail: "Real-time matching, GPS navigation and dynamic pricing.", helps: "5M+ rides, 4.6-star average, 95% completion rate." },
      // Solar now has its own page; this stays as a pointer so the mobility
      // page keeps the capability signal without competing for solar queries.
      // The 3D roof designer claim was dropped here too, for the same reason
      // it was left off the solar page: unverified end to end.
      { name: "SolarProposal", tag: "Clean Energy · Live", detail: "Generation forecasts, ROI & PM Surya Ghar subsidy, branded PDF. See the full solar practice under Solar & Renewable Energy.", helps: "Solar proposals in minutes, not days." },
    ],
  },

  // Split out of automotive-mobility-energy on 2026-08-17. Solar EPCs were
  // buried under a page led by ride-hailing apps, which no EPC owner would
  // trust or find. Keyword check (India, same day): the searched vocabulary
  // is "solar design software" (390/mo, LOW), "crm for solar" + "solar crm
  // software" (430 combined), "solar proposal software" (70). Much of the
  // design-software volume is student and free-download intent, so the
  // seoTitle leads with the business-buyer terms (proposal, CRM, EPC) and
  // carries "design software" second.
  "solar-renewable-energy": {
    name: "Solar & Renewable Energy",
    seoTitle: "Solar EPC Software: Proposal Automation, CRM & Design Tools",
    blurb:
      "Software for solar EPC companies: generate a branded proposal with generation forecasts, ROI and PM Surya Ghar subsidy maths in minutes, then track it through to close.",
    brands: ["Sterlite Power", "IndianOil", "Balmerol"],
    // Two links on purpose. `href` is the platform itself, which opens on a
    // sign-in screen, so it suits the visitor willing to create an account.
    // `sample` is the public proposal viewer and needs no sign-up, which is
    // what most first-time visitors actually want: proof of the output.
    // The sample slug is OUR OWN demo proposal. Never point it at a Nexio
    // slug (mklmnkg0, lm7uyl4a, f4pyc1lq, f6c9466y): those carry real client
    // names, addresses and pricing.
    demo: {
      href: "https://solar-proposal-sigma.vercel.app/",
      label: "Explore the Platform",
      // Honest eyebrow: the sample needs no account, the platform link does.
      eyebrow: "Live Product · Sample Needs No Sign-Up",
      heading: "See it working, and see what your customer receives",
      note: "Open the platform to walk through how a proposal gets built, or jump straight to a finished proposal exactly as a homeowner would see it, with cover page, system specs, generation forecast, subsidy and ROI, components and payment terms.",
      sample: {
        href: "https://solar-proposal-sigma.vercel.app/p/4vimjs4v",
        label: "See a Sample Proposal",
      },
      disclaimer:
        "Every figure, client name and price in the sample proposal is demo data, shown to illustrate the format rather than a real project.",
    },
    pains: [
      { title: "Proposals take an hour", detail: "Sales teams rebuild the same deck in PowerPoint or Canva for every site visit." },
      { title: "Numbers cannot be trusted", detail: "Generation, payback and subsidy maths recalculated by hand, differently by each rep." },
      { title: "Slow quotes lose deals", detail: "The EPC who sends the proposal that evening wins the customer who asked three of you." },
      { title: "No visibility after sending", detail: "Nobody knows whether the customer opened the proposal or which page they stopped on." },
    ],
    built: [
      // The 3D roof designer and satellite shading study exist in the code
      // and are wired into the wizard, but were deliberately LEFT OFF this
      // page (owner call, 2026-08-17): the module could not be verified
      // running end to end, and an unproven claim invites a comparison with
      // PVsyst and Aurora that we would lose. Add it back only once it has
      // been demonstrated working on a real proposal.
      { name: "SolarProposal", tag: "Proposal Automation · Live", detail: "PVWatts-backed generation forecasts, PM Surya Ghar subsidy slabs, ROI and payback, bill of materials and a branded PDF, from one guided flow.", helps: "Proposals in minutes instead of 30-60 minutes, with the maths identical across every rep." },
      { name: "Components & BOM Engine", tag: "Costing", detail: "A library of panels, inverters and balance-of-system parts with live costs, grouped into good-better-best budget tiers that price a system automatically.", helps: "Every quote uses approved components and current prices, not last quarter's spreadsheet." },
      { name: "Subsidy & ROI Engine", tag: "PM Surya Ghar", detail: "Residential subsidy calculated to the current slabs, with payback, IRR and 25-year savings from the customer's actual tariff.", helps: "The two questions every homeowner asks, answered on the spot and consistently." },
      { name: "Solar Sales CRM", tag: "Lead to Close", detail: "Site visits, quotes, follow-ups and WhatsApp threads on one timeline, with AI lead scoring so reps work the hottest enquiry first.", helps: "The follow-up that was promised on Tuesday actually goes out on Tuesday." },
      { name: "AI Calling Agent", tag: "Voice · Qualification", detail: "Answers inbound enquiries from subsidy-scheme campaigns, qualifies roof type, bill size and location, and books the site visit.", helps: "Enquiries answered in seconds at any hour, instead of a callback the next morning." },
      { name: "Proposal View Tracking", tag: "Analytics", detail: "Every proposal gets a live web link that reports when it was opened and which sections were read.", helps: "Sales calls the customer who reopened the pricing page, not the one who never looked." },
    ],
  },

  "education-edtech": {
    name: "Education & EdTech",
    seoTitle: "EdTech Software Development, Learning Platforms, Tutoring & Student Safety",
    blurb:
      "Adaptive learning, cross-border tutoring and student-safety systems for institutions, universities and edtech brands.",
    brands: ["St. Angelo's", "D Y Patil University", "J.K. Shah Classes"],
    pains: [
      { title: "Fragmented prep tools", detail: "Content, tests and forums scattered across apps." },
      { title: "Tutor discovery & payments", detail: "Trust gaps and cross-border settlement friction." },
      { title: "Transport safety", detail: "No real-time student tracking for parents." },
      { title: "Limited reach", detail: "Geography caps enrolment and revenue." },
    ],
    built: [
      { name: "Gurukul", tag: "Exam Prep · Live", detail: "Adaptive learning, analytics engine, tests and forums.", helps: "200,000+ students, test scores up 75%." },
      { name: "Indu", tag: "Cross-Border Tutoring · Live", detail: "Zoom classes + recordings, AED↔INR multi-currency wallet.", helps: "Connects tutors & students across borders." },
      { name: "BusOkay", tag: "Student Safety · Live", detail: "GPS + IoT tracking, real-time alerts, route optimization.", helps: "500+ schools, 100,000+ students tracked daily, incidents down 80%." },
      { name: "Aloki Learning", tag: "Tutor Marketplace", detail: "Matching algorithm, scheduling, Stripe payments, ratings.", helps: "100,000+ tutoring sessions facilitated." },
    ],
  },

  "media-entertainment": {
    name: "Media, Events & Entertainment",
    seoTitle: "Media & Entertainment Software, Ticketing, Creator Platforms & Fan Engagement",
    blurb:
      "High-concurrency ticketing, creator monetization and social booking for media, sports and entertainment brands.",
    brands: ["Reliance Entertainment", "Sony Pictures", "Mumbai Indians"],
    pains: [
      { title: "Ticketing fails at scale", detail: "Crashes, double-booking and downtime at peak." },
      { title: "Weak creator monetization", detail: "No direct, paid fan-engagement channel." },
      { title: "Fragmented booking", detail: "Venues & experiences scattered across platforms." },
      { title: "Low between-event engagement", detail: "Audiences go cold between releases." },
    ],
    built: [
      { name: "Zoniq", tag: "Ticketing · Real-Time", detail: "Live seat maps with seat-locking and a WebSocket virtual queue.", helps: "High-concurrency sales, no double-booking." },
      { name: "Stargaze", tag: "Creator Platform", detail: "Exclusive content, virtual events (WebRTC) and payments.", helps: "500+ celebrities, $3M+ subscription revenue." },
      { name: "Gaming Zone", tag: "Social Booking · Live", detail: "Multi-vendor booking with 1v1 challenges & leaderboards.", helps: "40-50 gaming zones, booking + engagement in one." },
      { name: "EventNoir", tag: "Cultural Ticketing", detail: "Multicultural event discovery and ticketing platform.", helps: "25,000+ events, 400,000+ tickets sold." },
    ],
  },

  "travel-hospitality": {
    name: "Travel & Hospitality",
    seoTitle: "Travel & Hospitality Software, Booking Marketplaces & Direct-Booking Engines",
    blurb:
      "Production booking marketplaces and immersive direct-booking experiences for hotels, OTAs and resorts, multi-vendor, multi-currency, multi-language.",
    brands: ["The Fern Hotels & Resorts"],
    pains: [
      { title: "OTA dependence", detail: "High commissions and no owned direct channel." },
      { title: "Siloed inventory", detail: "Hotels, taxis and experiences not unified." },
      { title: "Generic websites", detail: "Sites that don't convert visits to bookings." },
      { title: "Multi-market complexity", detail: "Language, currency & local payments (MENA, global)." },
    ],
    built: [
      { name: "Canchello", tag: "Booking Marketplace · Live", detail: "Web + iOS/Android, vendor portal, Arabic RTL, Stripe & Moamalat.", helps: "A production OTA live across web & app stores in MENA." },
      { name: "360 Digital Duniya", tag: "Immersive Booking · Live", detail: "360° virtual tours, direct booking and a property CRM.", helps: "Commission-free direct bookings." },
      { name: "Reusable Booking Core", tag: "Capability", detail: "The marketplace, vendor-portal & payments engine adapt per brand.", helps: "Launch fast without rebuilding the core." },
    ],
  },

  "saas-marketing": {
    name: "Technology, SaaS & Marketing",
    seoTitle: "SaaS Product Development & Marketing Technology Engineering",
    blurb:
      "We build the software other companies run on: AI agents, SaaS platforms, compliance tooling and marketing infrastructure, including our own products.",
    brands: ["Quick Heal"],
    pains: [
      { title: "Manual, repetitive ops", detail: "No automation layer across teams & tools." },
      { title: "Compliance overhead", detail: "ISO / SOC2 / GDPR tracked by hand." },
      { title: "Disconnected martech", detail: "Sending, inbox & automation in separate tools." },
      { title: "Outreach that won't convert", detail: "Static email and unqualified leads." },
    ],
    built: [
      { name: "AtoEmail", tag: "Email Platform · Live", detail: "Campaigns + unified inbox + automation builder + developer API.", helps: "Full email infra & interactive (AMP) email in one place." },
      { name: "AI Call Center", tag: "Voice AI · Live", detail: "Real-time multilingual sales agent (11 languages) from one profile.", helps: "Any company's voice agent, no redeploy." },
      { name: "ComplyAny", tag: "Compliance SaaS · Live", detail: "Real-time compliance scoring & risk intelligence.", helps: "Compliance prep time down 70% for 200+ organizations." },
      { name: "Zyflus + Meta Automation", tag: "MarTech · Live", detail: "Influencer lifecycle + multi-account Meta ad-ops automation.", helps: "Agency-grade marketing operations." },
    ],
    martechLink: true,
  },
};

export const getAllIndustrySlugs = () => Object.keys(industries);
export const getIndustry = (slug) => industries[slug] || null;
export default industries;
