// Case studies extracted from our credentials portfolio (creds.11point2.in).
// type: "marketing" entries include campaign metrics; "software" entries include product impact.
const caseStudies = [
  {
    "id": "starstruck-sunny-leone",
    "title": "StarStruck by Sunny Leone",
    "category": "Beauty",
    "description": "End-to-end social media and performance marketing for celebrity beauty brand",
    "challenge": "StarStruck needed to establish a strong digital presence and drive consistent e-commerce sales while maintaining brand authenticity and leveraging celebrity influence effectively.",
    "solution": "In partnership with the client team, we developed a comprehensive digital strategy combining influencer marketing, performance advertising, and engaging social content. The approach focused on authentic storytelling, user-generated content campaigns, and data-driven ad optimization across Meta and Google platforms.",
    "impact": "The campaign has transformed StarStruck into one of India's fastest-growing celebrity beauty brands with exponential follower growth and industry-leading ROAS.",
    "metrics": [
      {
        "label": "Follower Increase",
        "value": "292%"
      },
      {
        "label": "ROAS",
        "value": "3.8x"
      },
      {
        "label": "Engagement Rate",
        "value": "8.5%"
      }
    ],
    "services": [
      "Social Media Marketing",
      "Performance Marketing",
      "Influencer Strategy"
    ],
    "type": "marketing"
  },
  {
    "id": "bioderma-india",
    "title": "Bioderma India",
    "category": "Beauty",
    "description": "Digital brand awareness and dermatologist-backed marketing campaigns",
    "challenge": "Bioderma needed to educate Indian consumers about dermatologist-recommended skincare while competing against larger beauty conglomerates with bigger marketing budgets.",
    "solution": "In partnership with the client team, we crafted educational content strategies partnering with dermatologists and skincare experts, combined with targeted programmatic advertising to reach skincare-conscious consumers at key moments.",
    "impact": "The campaign has established Bioderma as a trusted skincare authority in India with massive reach and strong brand recall among target demographics.",
    "metrics": [
      {
        "label": "Impressions",
        "value": "8.5M"
      },
      {
        "label": "Brand Recall",
        "value": "+45%"
      },
      {
        "label": "Website Traffic",
        "value": "3.2x"
      }
    ],
    "services": [
      "Programmatic Advertising",
      "Content Marketing",
      "Influencer Partnerships"
    ],
    "type": "marketing"
  },
  {
    "id": "sugar-cosmetics",
    "title": "Sugar Cosmetics",
    "category": "Beauty",
    "description": "Scalable content production and performance marketing optimization",
    "challenge": "Sugar Cosmetics required high-volume, high-quality content production to fuel their aggressive growth while maintaining brand consistency and reducing production costs.",
    "solution": "In partnership with the client team, we implemented an efficient content production pipeline with AI-assisted creative workflows, combined with rigorous A/B testing frameworks for ad creatives. The approach enabled rapid iteration while maintaining quality.",
    "impact": "The campaign dramatically reduced content production overhead while increasing content output and improving ad performance metrics.",
    "metrics": [
      {
        "label": "Content Production",
        "value": "-40%"
      },
      {
        "label": "Ad Creative Output",
        "value": "3x"
      },
      {
        "label": "CPM Reduction",
        "value": "28%"
      }
    ],
    "services": [
      "Content Production",
      "Performance Marketing",
      "Creative Strategy"
    ],
    "type": "marketing"
  },
  {
    "id": "shiseido-india",
    "title": "Shiseido India",
    "category": "Luxury Beauty",
    "description": "Premium brand positioning and luxury market penetration strategy",
    "challenge": "Shiseido needed to establish their luxury positioning in the Indian market while educating consumers about Japanese beauty philosophy and premium skincare benefits.",
    "solution": "In partnership with the client team, we developed an aspirational brand narrative combining Japanese heritage storytelling with localized content. The strategy included exclusive influencer partnerships, premium content production, and targeted campaigns reaching high-net-worth individuals.",
    "impact": "The campaign helped position Shiseido as a leading luxury skincare brand in India with strong presence among premium beauty consumers.",
    "metrics": [
      {
        "label": "Brand Awareness",
        "value": "+65%"
      },
      {
        "label": "Premium Audience Reach",
        "value": "2.1M"
      },
      {
        "label": "Engagement Rate",
        "value": "6.2%"
      }
    ],
    "services": [
      "Brand Strategy",
      "Luxury Marketing",
      "Content Production"
    ],
    "type": "marketing"
  },
  {
    "id": "the-ordinary",
    "title": "The Ordinary",
    "category": "Skincare",
    "description": "Science-backed skincare marketing with ingredient education focus",
    "challenge": "The Ordinary's ingredient-focused approach required educating consumers about active ingredients while simplifying complex skincare science for mainstream appeal.",
    "solution": "In partnership with the client team, we created educational content series breaking down skincare ingredients, built community engagement around skincare routines, and developed performance campaigns targeting skincare enthusiasts.",
    "impact": "The campaign has built a highly engaged community of skincare enthusiasts and drove significant growth in both awareness and sales.",
    "metrics": [
      {
        "label": "Community Growth",
        "value": "180%"
      },
      {
        "label": "Content Engagement",
        "value": "12%"
      },
      {
        "label": "Conversion Rate",
        "value": "4.8%"
      }
    ],
    "services": [
      "Content Marketing",
      "Community Building",
      "Performance Marketing"
    ],
    "type": "marketing"
  },
  {
    "id": "healthspace-afiya",
    "title": "HealthSpace (Afiya)",
    "category": "Healthcare",
    "description": "Comprehensive telemedicine platform connecting doctors and patients across the MENA region",
    "challenge": "Healthcare access in the MENA region was limited by geographical barriers, long wait times, and fragmented healthcare systems, leaving many without timely medical consultations.",
    "solution": "In partnership with the client team, we built an all-in-one EHR, telemedicine, and practice management platform with video consultations, electronic health records, appointment booking, prescription management, multi-language support, and integrated payment systems tailored for the MENA region.",
    "impact": "The platform has facilitated 300,000+ teleconsultations, connected 5,000+ healthcare providers, served patients across 15 MENA countries, and reduced healthcare access time by 75%.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "health2mumma",
    "title": "Health2Mumma",
    "category": "Healthcare",
    "description": "Pregnancy and baby care companion app with holistic wellness support",
    "challenge": "Expecting mothers needed comprehensive, personalized guidance throughout pregnancy, recovery, and postpartum, but existing solutions were fragmented and lacked holistic wellness approaches.",
    "solution": "In partnership with the client team, we created a holistic wellness app with 20+ expert guides, trimester-specific workout programs, nutrition plans, pelvic floor recovery exercises, mental health support, baby care tips, and community forums for mothers at every stage.",
    "impact": "The platform has supported 150,000+ mothers through pregnancy and beyond, delivered 500,000+ guided workouts, achieved 4.8-star rating, and helped 85% of users achieve faster postpartum recovery.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "easecare",
    "title": "EaseCare",
    "category": "Healthcare",
    "description": "Telemedicine app enabling remote consultations and patient health record management",
    "challenge": "Healthcare providers needed a secure, HIPAA-compliant platform for virtual consultations and patient record management during the pandemic.",
    "solution": "In partnership with the client team, we developed a comprehensive telemedicine platform with video consultations, electronic health records, prescription management, and secure patient-doctor communication.",
    "impact": "The platform has enabled 50,000+ virtual consultations, reduced wait times by 60%, and improved patient satisfaction scores by 85%.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "ipatientcare",
    "title": "iPatientCare",
    "category": "Healthcare",
    "description": "AI-driven Electronic Health Record system with intelligent patient insights",
    "challenge": "Medical facilities struggled with fragmented patient data and inefficient record-keeping systems.",
    "solution": "In partnership with the client team, we built an AI-powered EHR system that consolidates patient data, provides predictive health insights, and automates clinical documentation.",
    "impact": "The platform has reduced documentation time by 40%, improved diagnosis accuracy by 30%, and streamlined workflows for 200+ healthcare providers.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "assurecare",
    "title": "AssureCare",
    "category": "Healthcare",
    "description": "Integrated healthcare management solution for care coordination",
    "challenge": "Healthcare organizations needed a unified platform to coordinate care across multiple providers and facilities.",
    "solution": "In partnership with the client team, we created an integrated care management system with patient tracking, appointment scheduling, care plan management, and real-time provider collaboration.",
    "impact": "The platform has improved care coordination for 100,000+ patients, reduced hospital readmissions by 25%, and increased operational efficiency by 45%.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "medcompass",
    "title": "MedCompass",
    "category": "Healthcare",
    "description": "AI-powered health management platform for personalized patient care",
    "challenge": "Patients needed personalized health guidance and proactive care management beyond traditional clinical visits.",
    "solution": "In partnership with the client team, we developed an AI health management platform that provides personalized health recommendations, medication reminders, symptom tracking, and predictive health alerts.",
    "impact": "The platform has engaged 75,000+ users, improved medication adherence by 55%, and reduced emergency visits by 20%.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "medichat",
    "title": "MediChat",
    "category": "Healthcare",
    "description": "AI-powered healthcare chatbot for patient support and triage",
    "challenge": "Healthcare facilities were overwhelmed with routine patient inquiries and needed automated triage capabilities.",
    "solution": "In partnership with the client team, we built an intelligent healthcare chatbot using natural language processing to answer patient questions, provide symptom assessment, and route cases appropriately.",
    "impact": "The platform has handled 200,000+ patient interactions, reduced support staff workload by 70%, and improved response times to under 30 seconds.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "ai-diagnosis",
    "title": "AI Medical Diagnosis",
    "category": "Healthcare",
    "description": "Machine learning system for medical image analysis and diagnosis support",
    "challenge": "Radiologists needed AI assistance to improve diagnostic accuracy and reduce analysis time for medical imaging.",
    "solution": "In partnership with the client team, we developed a deep learning system for medical image analysis that detects abnormalities, provides diagnostic suggestions, and prioritizes critical cases.",
    "impact": "The platform has analyzed 500,000+ medical images, improved detection accuracy by 35%, and reduced analysis time by 50%.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "ayushman-cowfit",
    "title": "Ayushman Cowfit",
    "category": "Healthcare",
    "description": "IoT-enabled smart livestock health monitoring and Ayurvedic care platform",
    "challenge": "Dairy farmers struggled with early disease detection in cattle, leading to significant losses. Traditional veterinary care was reactive, expensive, and lacked real-time health monitoring capabilities.",
    "solution": "In partnership with the client team, we developed an IoT-powered livestock health platform using BLE-enabled wearable devices that monitor vital signs in real-time. The system provides Ayurvedic treatment recommendations, automated health alerts, and predictive analytics for disease prevention.",
    "impact": "The platform monitors 100,000+ cattle across India, reduced veterinary costs by 45%, enabled early disease detection in 80% of cases, and improved livestock productivity by 30%.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "complyany",
    "title": "ComplyAny",
    "category": "FinTech",
    "description": "Real-time compliance scoring and risk intelligence platform for cybersecurity",
    "challenge": "Enterprises struggled with manual compliance tracking across multiple frameworks (ISO, SOC2, GDPR), leading to audit delays, compliance gaps, and significant resource expenditure.",
    "solution": "In partnership with the client team, we developed an AI-powered GRC platform that automates compliance monitoring, provides real-time risk scoring, manages policies centrally, and generates audit-ready reports across multiple cybersecurity frameworks.",
    "impact": "The platform has reduced compliance preparation time by 70%, improved audit readiness scores by 85%, and helped 200+ organizations maintain continuous compliance across multiple frameworks.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "banksathi",
    "title": "Banksathi",
    "category": "FinTech",
    "description": "Comprehensive finance and wealth management application",
    "challenge": "Users struggled to manage multiple financial accounts and needed personalized investment guidance.",
    "solution": "In partnership with the client team, we built a unified wealth management platform with account aggregation, AI-powered investment recommendations, and automated financial planning.",
    "impact": "The platform has managed $50M+ in assets, served 25,000+ users, and delivered average returns 15% above market benchmarks.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "utsav-fashion",
    "title": "Utsav Fashion",
    "category": "E-Commerce",
    "description": "Global ethnic e-commerce platform for Indian fashion with smart personalization",
    "challenge": "Indian ethnic fashion brand needed to serve a global customer base with vast product catalog, custom sizing, international shipping, and personalized shopping experiences across different cultural preferences.",
    "solution": "In partnership with the client team, we built a comprehensive e-commerce platform with advanced product filtering, size customization, virtual try-on recommendations, multi-currency support, global shipping integration, and AI-powered personalized recommendations based on cultural preferences and browsing behavior.",
    "impact": "The platform has achieved 1M+ products sold globally, expanded to 50+ countries, increased customer retention by 60%, and generated $20M+ in annual revenue with 4.0+ customer rating.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "hungry-hut",
    "title": "Hungry Hut",
    "category": "E-Commerce",
    "description": "Digital fast-food ordering platform transforming quick-service restaurant experience",
    "challenge": "Fast-food chain needed to modernize customer experience with online ordering, reduce wait times, improve order accuracy, and compete with delivery aggregators while maintaining direct customer relationships.",
    "solution": "In partnership with the client team, we developed a comprehensive digital ordering platform with mobile app and web ordering, real-time order tracking, customizable menu options, loyalty rewards program, and seamless payment integration for pickup and delivery.",
    "impact": "The platform has processed 500,000+ orders, increased average order value by 35%, reduced order errors by 80%, and built a loyal customer base of 100,000+ registered users.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "fashion-lifestyle",
    "title": "Fashion & Lifestyle App",
    "category": "E-Commerce",
    "description": "Modern eCommerce platform for fashion brands with AR try-on",
    "challenge": "Fashion retailers needed an engaging mobile shopping experience with virtual try-on capabilities to reduce returns.",
    "solution": "In partnership with the client team, we developed a feature-rich fashion eCommerce app with AR try-on, personalized recommendations, and seamless checkout.",
    "impact": "The platform has generated $5M+ in sales, reduced return rates by 35%, and increased conversion rates by 45%.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "koovs",
    "title": "Koovs App",
    "category": "E-Commerce",
    "description": "Flutter-based fashion eCommerce platform with social features",
    "challenge": "Fashion brand needed a cross-platform mobile app with social shopping features to engage younger demographics.",
    "solution": "In partnership with the client team, we built a Flutter-based fashion marketplace with social feeds, influencer collections, and one-click purchasing.",
    "impact": "The platform has reached 100,000+ downloads, achieved 4.5+ app rating, and increased repeat purchases by 60%.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "dudalina",
    "title": "Dudalina",
    "category": "E-Commerce",
    "description": "Premium Brazilian fashion e-commerce platform with personalized shopping experience",
    "challenge": "Established Brazilian fashion brand needed to transform their digital presence and create a sophisticated online shopping experience that matched their premium retail positioning while scaling to serve customers nationwide.",
    "solution": "In partnership with the client team, we developed a comprehensive e-commerce platform featuring advanced product filtering, size recommendation engine, virtual fitting guides, seamless payment integration, and personalized product recommendations based on browsing behavior.",
    "impact": "The platform has generated $15M+ in annual online revenue, achieved 3.5x increase in online conversions, expanded customer base by 200%, and reduced cart abandonment by 40%.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "steve-madden",
    "title": "Steve Madden",
    "category": "E-Commerce",
    "description": "Global fashion e-commerce platform with omnichannel mobile shopping experience",
    "challenge": "International fashion brand needed a unified shopping experience across web and mobile platforms, managing thousands of products, multiple currencies, international shipping, and maintaining brand consistency across 50+ countries.",
    "solution": "In partnership with the client team, we built a comprehensive omnichannel e-commerce platform with native mobile apps, advanced search and filtering, real-time inventory management, multi-currency support, international shipping integration, and personalized product recommendations.",
    "impact": "The platform has achieved 2M+ mobile app downloads, generated $100M+ in global online sales, increased mobile conversion rates by 65%, and expanded to 50+ international markets.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "charity-life",
    "title": "Charity Life",
    "category": "Social",
    "description": "Building transparency and trust in digital giving through blockchain technology",
    "challenge": "Donors lacked transparency in charitable giving, unable to track how their donations were used, leading to trust issues and reduced charitable contributions.",
    "solution": "In partnership with the client team, we built a blockchain-powered digital giving platform with transparent fund tracking, verified charity profiles, donation impact reports, fundraising campaigns, and real-time donor dashboards showing exactly how funds are utilized.",
    "impact": "The platform has facilitated $10M+ in transparent donations, onboarded 1,000+ verified charities, engaged 200,000+ donors, and achieved 95% donor satisfaction through complete transparency.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "ponttual",
    "title": "Ponttual",
    "category": "Social",
    "description": "End-to-end ride-hailing platform connecting drivers and riders seamlessly",
    "challenge": "Riders needed reliable, affordable transportation options while drivers sought flexible earning opportunities with fair commission structures and transparent payment systems.",
    "solution": "In partnership with the client team, we developed a comprehensive ride-hailing platform with real-time matching, dynamic pricing, in-app payments, driver and rider safety features, ratings system, and transparent earnings dashboard for drivers.",
    "impact": "The platform has facilitated 5M+ rides, onboarded 50,000+ drivers, served 500,000+ riders, and achieved 4.6-star average rating with 95% ride completion rate.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "krooz",
    "title": "KROOZ",
    "category": "Social",
    "description": "Multi-service transportation network for rides, food delivery, and logistics",
    "challenge": "Users needed a unified platform for multiple services (rides, food delivery, courier) while drivers wanted diverse income streams from a single app without switching between multiple platforms.",
    "solution": "In partnership with the client team, we created an all-in-one transportation network platform combining ride-hailing, food delivery, courier services, and hot-shot package delivery with unified driver and customer apps, flexible service selection, and integrated payment systems.",
    "impact": "The platform has expanded to 50 countries, onboarded 100,000+ drivers, served 2M+ customers, processed 10M+ service requests across multiple verticals.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "classpass",
    "title": "ClassPass",
    "category": "Social",
    "description": "Flexible fitness subscription and class booking platform connecting users with gyms and studios",
    "challenge": "Fitness enthusiasts wanted access to variety of gyms and studios without expensive multiple memberships, while fitness businesses struggled to fill class spots and attract new members.",
    "solution": "In partnership with the client team, we built a comprehensive fitness marketplace platform with flexible credit-based subscriptions, real-time class booking, studio discovery, mobile apps, and integrated payment processing that benefits both consumers and fitness businesses.",
    "impact": "The platform now connects 30,000+ fitness venues globally, served 10M+ members, facilitated 100M+ class bookings, and expanded to 2,500+ cities worldwide.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "stargaze",
    "title": "Stargaze",
    "category": "Social",
    "description": "Celebrity-fan engagement platform with exclusive content and interactions",
    "challenge": "Celebrities needed a direct channel to engage with fans and monetize exclusive content.",
    "solution": "In partnership with the client team, we developed a social platform enabling celebrities to share exclusive content, host virtual events, and interact directly with fans through subscriptions.",
    "impact": "The platform has onboarded 500+ celebrities, reached 1M+ fans, and generated $3M+ in subscription revenue.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "eventnoir",
    "title": "EventNoir",
    "category": "Social",
    "description": "Multicultural event discovery and ticketing platform",
    "challenge": "Multicultural communities lacked a dedicated platform to discover culturally relevant events and faced difficulties with ticketing and event management.",
    "solution": "In partnership with the client team, we built a specialized event platform celebrating cultural diversity with event discovery, integrated ticketing, community features, and multilingual support for diverse audiences.",
    "impact": "The platform has hosted 25,000+ cultural events, sold 400,000+ tickets, and built a community of 150,000+ users across multiple cultural groups.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "k99fm",
    "title": "K99.1 Music App",
    "category": "Social",
    "description": "Live radio streaming and on-demand music platform",
    "challenge": "Country music fans wanted seamless access to live radio, on-demand content, and artist interactions, but traditional radio lacked mobile-first features and personalization.",
    "solution": "In partnership with the client team, we developed a comprehensive streaming platform combining live radio broadcasts, on-demand podcasts, artist interviews, concert updates, and interactive features like song requests and social sharing.",
    "impact": "The platform has reached 100,000+ active listeners, streamed 5M+ hours of content, and achieved 4.7-star app rating.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "busokay",
    "title": "BusOkay",
    "category": "Education",
    "description": "Smart transportation and safety platform for educational institutions",
    "challenge": "Schools struggled with student transportation safety, real-time tracking, parent communication, and driver behavior monitoring, leading to safety concerns and operational inefficiencies.",
    "solution": "In partnership with the client team, we developed an end-to-end school transport management platform with real-time GPS tracking, automated boarding/de-boarding alerts, parent mobile apps, driver behavior monitoring, route optimization, and safety compliance management.",
    "impact": "The platform is deployed in 500+ schools, tracking 100,000+ students daily, reduced safety incidents by 80%, improved parent satisfaction by 90%, and optimized transport routes saving 30% in operational costs.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "aloki-learning",
    "title": "Aloki Learning",
    "category": "Education",
    "description": "Interactive mobile learning app connecting students with qualified local tutors",
    "challenge": "Students struggled to find qualified local tutors for personalized learning, while tutors lacked a platform to efficiently manage students, schedule lessons, and receive secure payments.",
    "solution": "In partnership with the client team, we developed a comprehensive tutor-student matching platform with detailed tutor profiles, secure in-app payments via Stripe, lesson scheduling, rating and review system, and mobile apps for seamless learning connections.",
    "impact": "The platform has connected 10,000+ students with qualified tutors, facilitated 100,000+ tutoring sessions, and helped students improve academic performance by an average of 40%.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "gurukul",
    "title": "Gurukul",
    "category": "Education",
    "description": "All-in-one competitive exam preparation platform with smart learning tools",
    "challenge": "Students preparing for competitive exams needed comprehensive study materials, practice tests, performance analytics, and peer discussion forums all in one place, but existing solutions were fragmented and expensive.",
    "solution": "In partnership with the client team, we created a unified exam preparation platform featuring curated study content, adaptive practice tests, detailed performance analytics, peer discussion forums, doubt-solving sessions, and personalized learning paths for various competitive exams including CAT, GATE, and civil services.",
    "impact": "The platform has helped 200,000+ students prepare for competitive exams, achieved 75% improvement in student test scores, and built an engaged community with 1M+ forum discussions.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "lands-home",
    "title": "Lands & Home",
    "category": "AI/Technology",
    "description": "AI-powered property listing platform revolutionizing real estate search and financing",
    "challenge": "Homebuyers and land investors struggled with complex property searches, lack of transparent financing options, and difficulty finding suitable properties matching their specific criteria and budget.",
    "solution": "In partnership with the client team, we developed an AI-powered real estate platform with intelligent property matching, visual search capabilities, flexible financing options (50% down, no prepayment penalty), virtual property tours, and personalized recommendations based on user preferences and financial capacity.",
    "impact": "The platform has listed 50,000+ properties, facilitated $500M+ in property transactions, helped 10,000+ buyers secure flexible financing, and reduced property search time by 60%.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "total-coaching",
    "title": "Total Coaching",
    "category": "AI/Technology",
    "description": "Digital fitness and nutrition platform empowering trainers with smart client management",
    "challenge": "Personal trainers struggled to efficiently manage multiple clients, create customized workout and meal plans, track progress, and scale their business beyond in-person sessions.",
    "solution": "In partnership with the client team, we built a comprehensive personal training software with online fitness and meal plan builder, 25,000+ foods database, mobile apps for clients, automated progress tracking, workout logging, and client communication tools that enable trainers to coach more clients remotely.",
    "impact": "The platform has empowered 50,000+ personal trainers globally, helped manage 500,000+ clients, saved trainers 10+ hours per week on administrative tasks, and enabled trainers to scale their revenue by 3x.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "fraud-detection",
    "title": "Real-Time Fraud Detection",
    "category": "AI/Technology",
    "description": "Machine learning system for detecting fraudulent transactions in real-time",
    "challenge": "Payment processors faced increasing fraud attempts and needed real-time detection without impacting legitimate transactions.",
    "solution": "In partnership with the client team, we developed a machine learning fraud detection system that analyzes transaction patterns, user behavior, and risk factors in milliseconds.",
    "impact": "The platform has prevented $25M+ in fraud, achieved 99.5% accuracy, and reduced false positives by 80%.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "ai-analytics",
    "title": "AI Business Intelligence",
    "category": "AI/Technology",
    "description": "Intelligent analytics platform providing predictive business insights",
    "challenge": "Enterprises struggled to extract actionable insights from massive data volumes and needed predictive capabilities.",
    "solution": "In partnership with the client team, we created an AI-powered business intelligence platform with automated data analysis, predictive modeling, and natural language querying.",
    "impact": "The platform has analyzed 10TB+ of data, improved forecast accuracy by 40%, and reduced analysis time from days to minutes.",
    "liveUrl": null,
    "type": "software"
  },
  {
    "id": "mybeat",
    "title": "Mybeat",
    "category": "AI/Technology",
    "description": "AI-powered music video creation platform for artists",
    "challenge": "Musicians and content creators needed an affordable, easy way to create professional vinyl music videos with custom artwork, but lacked design skills or budget for professional video production.",
    "solution": "In partnership with the client team, we built an AI-powered platform that enables artists to create stunning vinyl music videos by generating custom AI artwork, synchronizing it with their music, and producing shareable social media content in minutes.",
    "impact": "The platform has empowered 50,000+ artists, generated 200,000+ music videos, and achieved 10M+ social media impressions.",
    "liveUrl": null,
    "type": "software"
  }
];

export default caseStudies;
