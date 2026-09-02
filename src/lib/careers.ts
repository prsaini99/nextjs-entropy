export type Job = {
  slug: string;
  title: string;
  team: 'Engineering' | 'AI/Data' | 'Cloud/DevOps' | 'Product/Design' | 'Go-to-Market' | 'People/Ops' | 'Internships';
  location: string;
  type: string;
  blurb: string;
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Intern';
  description: string;
  /**
   * ISO date the role was posted. Required by Google's JobPosting schema —
   * without it a listing is ineligible for the Jobs experience in Search.
   * Defaults to POSTED_DEFAULT below when a role predates this field.
   */
  datePosted?: string;
  whatYoullDo: string[];
  whatYoullBring: string[];
  niceToHave?: string[];
  roleQuestions?: string[];
  /**
   * Rotation state. 'paused' roles keep their URL and their indexed page (we
   * do NOT 404 them: several rank on page one and the equity is worth more
   * than the tidiness), but they disappear from the listing, the sitemap and
   * the JobPosting schema, and their page shows a closed notice pointing at
   * what is open. Undefined means open, so existing entries need no edit.
   *
   * Why rotate at all: applicant volume is wildly uneven (2,397 unique people
   * applied to the intern role, 25 to Product Manager). Showing fewer roles
   * concentrates the same traffic on the ones actually short of candidates,
   * and re-opening a paused role refreshes its datePosted, which is what
   * Google Jobs ranks on.
   */
  status?: 'open' | 'paused';
};

export const JOBS: Job[] = [
  // ── CURRENT ROTATION (opened 2026-08-18) ────────────────────────────
  // Fifteen martech and AI roles replacing the previous thirty, which are all
  // marked status:'paused' below. LinkedIn ingests these automatically as
  // Limited Listings by crawling /careers, and expires the paused ones on the
  // same re-crawl, typically within 24-72 hours. No manual posting either way.
  // Titles were chosen to double as topical signal for the martech and AI
  // keyword clusters the site now targets.
  {
    slug: 'martech-engineer',
    title: 'MarTech Engineer',
    team: 'Engineering',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    datePosted: '2026-08-18',
    blurb: 'Build and wire the marketing stack: CDPs, automation platforms, tracking and the APIs between them.',
    description: 'Own the engineering behind marketing technology. You will connect CRMs, automation platforms, ad APIs and data warehouses into systems marketing teams actually run on, and make sure the data flowing through them can be trusted.',
    whatYoullDo: [
      'Build integrations between CRM, marketing automation and ad platforms',
      'Design and maintain event tracking, server-side tagging and conversion APIs',
      'Own data quality across the marketing stack, from capture to warehouse',
      'Build internal tools that replace manual marketing operations work',
      'Debug attribution gaps across web, ads and CRM',
      'Work with marketers to turn campaign ideas into working automation'
    ],
    whatYoullBring: [
      '3+ years building integrations or backend services',
      'Strong JavaScript or Python and comfort with REST APIs and webhooks',
      'Working knowledge of a CRM or marketing automation platform',
      'Understanding of tracking, cookies, consent and server-side events',
      'SQL good enough to answer your own questions',
      'A bias for automating the thing rather than documenting the thing'
    ],
    niceToHave: [
      'Experience with HubSpot, Salesforce or Braze APIs',
      'Meta Conversions API or Google Ads API experience',
      'Familiarity with dbt, BigQuery or Snowflake'
    ],
    roleQuestions: [
      'Describe a marketing integration you built and what broke first.',
      'How would you debug a 30% gap between ad-platform conversions and CRM leads?'
    ]
  },
  {
    slug: 'marketing-automation-specialist',
    title: 'Marketing Automation Specialist',
    team: 'Go-to-Market',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    datePosted: '2026-08-18',
    blurb: 'Design lifecycle journeys, segmentation and campaign automation that run without babysitting.',
    description: 'Own the automation that turns a list into revenue. You will build journeys, segment audiences properly, and hold the line on deliverability and measurement.',
    whatYoullDo: [
      'Design and build lifecycle journeys: onboarding, nurture, win-back, post-purchase',
      'Own segmentation strategy and list hygiene',
      'Run A/B tests on subject lines, timing, content and offers',
      'Monitor deliverability, sender reputation and engagement decay',
      'Report on revenue per journey rather than opens',
      'Work with engineering to wire product events into campaign triggers'
    ],
    whatYoullBring: [
      '2+ years running marketing automation for a real business',
      'Hands-on with at least one automation platform end to end',
      'Understanding of deliverability: SPF, DKIM, DMARC, warm-up, sender reputation',
      'Comfort with data: you can pull your own numbers and defend them',
      'Copy instincts good enough to brief and edit'
    ],
    niceToHave: [
      'HubSpot, Braze, Klaviyo or Customer.io experience',
      'HTML and Liquid or similar templating',
      'Experience with WhatsApp or SMS lifecycle alongside email'
    ],
    roleQuestions: [
      'Walk through a lifecycle journey you built and the numbers it moved.',
      'How do you diagnose a sudden drop in open rate?'
    ]
  },
  {
    slug: 'crm-solutions-developer',
    title: 'CRM Solutions Developer',
    team: 'Engineering',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    datePosted: '2026-08-18',
    blurb: 'Customise, extend and integrate CRMs so sales teams work in one place.',
    description: 'Build CRM systems around how a business actually sells, rather than bending the business around a product. You will customise, extend and integrate so reps stop living in spreadsheets.',
    whatYoullDo: [
      'Customise CRM objects, pipelines, automation and permissions',
      'Build integrations to telephony, WhatsApp, email and marketing platforms',
      'Design lead routing, scoring and assignment logic',
      'Migrate data between systems without losing history',
      'Build reporting that sales leaders trust',
      'Train teams and write the documentation that outlives you'
    ],
    whatYoullBring: [
      '3+ years building on or around a CRM',
      'Strong API integration skills and a scripting language',
      'Understanding of sales processes and pipeline mechanics',
      'Data modelling instincts: you think about the schema before the screen',
      'Patience with stakeholders who describe outcomes, not requirements'
    ],
    niceToHave: [
      'Salesforce Apex, HubSpot custom objects or Zoho Deluge',
      'Experience with data migration at scale',
      'Familiarity with telephony or WhatsApp Business API integration'
    ],
    roleQuestions: [
      'Describe a CRM you shaped around a sales process rather than the reverse.',
      'How do you approach a migration where the source data is messy?'
    ]
  },
  {
    slug: 'growth-engineer',
    title: 'Growth Engineer',
    team: 'Go-to-Market',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    datePosted: '2026-08-18',
    blurb: 'Ship experiments across funnel, product and acquisition, and measure them honestly.',
    description: 'Sit between marketing and engineering and ship the things that move the funnel. You will build landing pages, run experiments, instrument everything and kill what does not work.',
    whatYoullDo: [
      'Build and iterate landing pages, funnels and onboarding flows',
      'Design and run experiments with proper measurement',
      'Instrument events and build dashboards that answer real questions',
      'Automate acquisition and activation workflows',
      'Find and fix the drop-off points nobody has looked at',
      'Report results honestly, including the losses'
    ],
    whatYoullBring: [
      '2+ years in a growth, product or marketing engineering role',
      'Front-end skills: React or similar, and CSS you are not scared of',
      'Analytics fluency: GA4, event design, funnel analysis',
      'Statistical literacy good enough to know when a test is not conclusive',
      'Comfort working without a spec'
    ],
    niceToHave: [
      'Experience with A/B testing tools and feature flags',
      'SEO and page-performance knowledge',
      'Paid acquisition experience'
    ],
    roleQuestions: [
      'Describe an experiment that failed and what you learned.',
      'How do you decide a test has run long enough?'
    ]
  },
  {
    slug: 'performance-marketing-analyst',
    title: 'Performance Marketing Analyst (Meta & Google)',
    team: 'Go-to-Market',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    datePosted: '2026-08-18',
    blurb: 'Run and analyse paid campaigns where the numbers, not the platform, decide.',
    description: 'Own paid performance across Meta and Google. You will manage spend, read the data properly, and make the calls that platform automation cannot.',
    whatYoullDo: [
      'Plan, launch and optimise campaigns across Meta and Google',
      'Own budget allocation and bid strategy decisions',
      'Build reporting that separates signal from platform-reported optimism',
      'Run creative testing programmes and identify what actually works',
      'Manage negative keywords, audience exclusions and waste',
      'Reconcile platform conversions against CRM reality'
    ],
    whatYoullBring: [
      '2+ years managing real paid budgets, not just dashboards',
      'Deep familiarity with Meta Ads Manager and Google Ads',
      'Analytical rigour: you segment before you conclude',
      'Understanding of attribution and its limits',
      'Ability to write and brief creative that performs'
    ],
    niceToHave: [
      'Experience with server-side tracking and Conversions API',
      'Scripting or automation for reporting',
      'Experience managing multiple ad accounts or clients'
    ],
    roleQuestions: [
      'Describe a campaign you turned around and how you diagnosed it.',
      'How do you handle a platform reporting more conversions than the CRM?'
    ]
  },
  {
    slug: 'seo-aeo-specialist',
    title: 'SEO & AEO Specialist',
    team: 'Go-to-Market',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    datePosted: '2026-08-18',
    blurb: 'Rank in search and get cited by AI answers, with keyword research that survives scrutiny.',
    description: 'Own organic visibility across both classic search and AI answer engines. You will do the research, shape the content brief, and prove movement with data rather than vibes.',
    whatYoullDo: [
      'Run keyword and SERP research that separates volume from winnability',
      'Own on-page, technical SEO and structured data',
      'Build content briefs from competitor teardowns rather than guesswork',
      'Optimise for AI answer engines: entity clarity, citations, structured facts',
      'Track rankings, impressions and position bands, and report movement honestly',
      'Fix indexing, canonical and crawl issues'
    ],
    whatYoullBring: [
      '2+ years doing SEO where you owned the numbers',
      'Fluency with Search Console and a rank-tracking or SERP API',
      'Understanding of schema markup and technical SEO',
      'Ability to read a SERP and judge whether it is winnable',
      'Writing skills good enough to brief and edit'
    ],
    niceToHave: [
      'Experience with AEO, llms.txt or entity and knowledge-graph work',
      'Programmatic or template-driven SEO at scale',
      'Basic HTML and comfort in a codebase'
    ],
    roleQuestions: [
      'Show a keyword you decided NOT to target and explain why.',
      'How do you judge whether a SERP is winnable at low domain authority?'
    ]
  },
  {
    slug: 'ai-automation-engineer',
    title: 'AI Automation Engineer',
    team: 'AI/Data',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    datePosted: '2026-08-18',
    blurb: 'Build automations with judgment in them, and the guardrails that make them safe.',
    description: 'Build the automation layer that replaces repetitive judgment work. You will design workflows, wire the tools, and build the evaluation and guardrails that let them run unattended.',
    whatYoullDo: [
      'Design and build automated workflows with AI decision steps',
      'Build tool integrations that are idempotent and safe to retry',
      'Implement evaluation harnesses so quality is measured, not assumed',
      'Design approval gates for anything consequential',
      'Monitor cost per task and optimise model routing',
      'Debug automations that fail in ways nobody predicted'
    ],
    whatYoullBring: [
      '2+ years building backend services or integrations',
      'Strong Python or JavaScript and API fluency',
      'Practical LLM experience: prompting, structured outputs, function calling',
      'Understanding of idempotency, retries and failure modes',
      'Instinct for what should never be automated'
    ],
    niceToHave: [
      'LangGraph, Model Context Protocol or similar orchestration',
      'Experience with vector databases and retrieval',
      'n8n, Temporal or workflow-engine experience'
    ],
    roleQuestions: [
      'Describe an automation that failed in production and the fix.',
      'How do you decide what needs a human approval gate?'
    ]
  },
  {
    slug: 'ai-agent-developer',
    title: 'AI Agent Developer',
    team: 'AI/Data',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    datePosted: '2026-08-18',
    blurb: 'Build agents that use tools, follow plans and stop where the stakes demand it.',
    description: 'Build production AI agents: systems that decide their next step and act inside real business systems, with the engineering that makes that trustworthy.',
    whatYoullDo: [
      'Design agent architectures: planning, memory, tool use',
      'Build tool layers with strict contracts and error semantics',
      'Implement layered guardrails including injection defence',
      'Build golden-set evaluation and run it on every change',
      'Design shadow-mode rollouts before autonomous execution',
      'Instrument audit logging for every action taken'
    ],
    whatYoullBring: [
      '2+ years software engineering, some of it on AI systems',
      'Strong Python or TypeScript',
      'Hands-on with agent frameworks and function calling',
      'Understanding of prompt injection and mitigation',
      'Scepticism: you assume the model will do something stupid'
    ],
    niceToHave: [
      'LangGraph or Model Context Protocol experience',
      'Evaluation tooling experience',
      'Production experience with agents that take real actions'
    ],
    roleQuestions: [
      'Describe an agent you shipped and what it was NOT allowed to do.',
      'How would you defend an agent that reads untrusted email?'
    ]
  },
  {
    slug: 'conversational-ai-engineer-voice',
    title: 'Conversational AI Engineer (Voice)',
    team: 'AI/Data',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    datePosted: '2026-08-18',
    blurb: 'Build voice agents where latency is felt in milliseconds and there is no retry button.',
    description: 'Build phone-native AI. You will engineer the streaming pipeline, the turn-taking and the telephony that make a voice agent feel like a conversation instead of an IVR.',
    whatYoullDo: [
      'Build streaming speech pipelines: recognition, understanding, synthesis',
      'Engineer for sub-second end-to-end response latency',
      'Handle barge-in, turn-end prediction and interruption gracefully',
      'Integrate telephony and handle real-world network conditions',
      'Build multilingual conversation support with per-language evaluation',
      'Wire booking and CRM actions as gated tools'
    ],
    whatYoullBring: [
      '2+ years backend or real-time systems engineering',
      'Python or Node.js and comfort with streaming and websockets',
      'Understanding of audio processing basics',
      'LLM experience with latency as a first-class constraint',
      'Patience for debugging problems that only appear on real calls'
    ],
    niceToHave: [
      'Telephony experience: Twilio, SIP or WebRTC',
      'Speech recognition or TTS integration experience',
      'Multilingual or Indic language speech experience'
    ],
    roleQuestions: [
      'Describe how you would cut a voice pipeline from three seconds to one.',
      'How do you handle a caller who interrupts mid-sentence?'
    ]
  },
  {
    slug: 'full-stack-engineer-ai-products',
    title: 'Full-Stack Engineer (AI Products)',
    team: 'Engineering',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    datePosted: '2026-08-18',
    blurb: 'Ship complete AI products, from streaming UI to the retrieval layer underneath.',
    description: 'Build AI products end to end. You will own the interface, the API and the model layer, and care about how the whole thing feels under real usage.',
    whatYoullDo: [
      'Build streaming, responsive interfaces for AI features',
      'Design and implement retrieval and grounding layers',
      'Build APIs and data models that scale past the demo',
      'Implement evaluation, monitoring and cost instrumentation',
      'Ship abuse controls and rate limiting on public surfaces',
      'Own features from design through production'
    ],
    whatYoullBring: [
      '3+ years full-stack development',
      'React and Next.js, plus Node.js or Python on the server',
      'PostgreSQL and comfort with data modelling',
      'Practical LLM integration experience',
      'Product instincts: you argue about the interaction, not just the endpoint'
    ],
    niceToHave: [
      'Vector search and RAG experience',
      'Streaming UI patterns and optimistic updates',
      'Experience owning cost per active user'
    ],
    roleQuestions: [
      'Show an AI feature you built and how you measured its quality.',
      'How do you make a slow model feel fast?'
    ]
  },

  {
    slug: 'llm-rag-engineer',
    title: 'LLM & RAG Engineer',
    team: 'AI/Data',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    datePosted: '2026-08-18',
    blurb: 'Build retrieval systems that keep model answers grounded in your data, and measure whether they are.',
    description: 'Own the grounding layer behind our AI products. You will build retrieval that actually finds the right passage, and the evaluation that proves it, because an ungrounded model is a liability with a confident voice.',
    whatYoullDo: [
      'Design chunking, embedding and hybrid retrieval strategies',
      'Build and tune vector search over real, messy document sets',
      'Implement citation and provenance so answers can be checked',
      'Build golden-set evaluation for groundedness and correctness',
      'Tune refusal behaviour so thin retrieval escalates instead of improvising',
      'Optimise token cost and latency per query'
    ],
    whatYoullBring: [
      '2+ years backend or ML engineering',
      'Strong Python and practical LLM API experience',
      'Hands-on with vector databases and embedding models',
      'Understanding of why hybrid search beats pure semantic search',
      'Evaluation instincts: you measure before you claim'
    ],
    niceToHave: [
      'pgvector, Pinecone or Weaviate in production',
      'Reranking and query-rewriting experience',
      'Multilingual retrieval experience'
    ],
    roleQuestions: [
      'Describe a retrieval system you built and how you measured its quality.',
      'How would you debug a RAG system that answers confidently and wrongly?'
    ]
  },
  {
    slug: 'mlops-ai-infrastructure',
    title: 'MLOps Engineer (AI Infrastructure)',
    team: 'AI/Data',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    datePosted: '2026-08-18',
    blurb: 'Run the infrastructure AI systems depend on: serving, monitoring, cost and model updates.',
    description: 'Own the platform our AI runs on. You will make deployment boring, cost visible, and model updates something we test rather than discover.',
    whatYoullDo: [
      'Build and operate model serving infrastructure',
      'Implement monitoring for quality drift, latency and spend',
      'Build CI pipelines that run evaluations before a model change ships',
      'Manage model registries and rollback paths',
      'Optimise inference cost through routing, caching and batching',
      'Support private and self-hosted deployments for regulated clients'
    ],
    whatYoullBring: [
      '2+ years in DevOps, platform or ML infrastructure',
      'Strong Docker and cloud experience on AWS or GCP',
      'Python and comfort with CI/CD tooling',
      'Understanding of GPU cost and capacity planning',
      'Monitoring and alerting instincts'
    ],
    niceToHave: [
      'vLLM, Ray or similar serving stacks',
      'Kubernetes in production',
      'Experience self-hosting open-weight models'
    ],
    roleQuestions: [
      'Describe how you would catch a silent model regression before users do.',
      'When does self-hosting beat an API on cost?'
    ]
  },
  {
    slug: 'ai-engineering-intern',
    title: 'AI Engineering Intern',
    team: 'Internships',
    location: 'Mumbai | Remote (India)',
    type: 'Internship',
    experienceLevel: 'Intern',
    datePosted: '2026-08-18',
    blurb: 'Six months building real AI features alongside engineers who ship them.',
    description: 'Work on production AI systems, not a side project. You will build features that reach real users, with review and mentorship from engineers who operate these systems daily.',
    whatYoullDo: [
      'Build and test features in our AI products under mentorship',
      'Write prompts, tools and evaluation cases for agent workflows',
      'Help build retrieval pipelines and measure their quality',
      'Investigate failures and turn them into test cases',
      'Present what you built at the end of the internship'
    ],
    whatYoullBring: [
      'Final-year student or recent graduate in CS, IT or a related field',
      'Solid Python or JavaScript fundamentals',
      'Curiosity about LLMs beyond having used ChatGPT',
      'Ability to read documentation and try things before asking',
      'Available for a 6-month full-time internship'
    ],
    niceToHave: [
      'Personal projects using LLM APIs',
      'Any open-source contribution',
      'Familiarity with Git and the command line'
    ],
    roleQuestions: [
      'Share a project you built with an AI API and what surprised you.',
      'Describe a bug you spent hours on and how you solved it.'
    ]
  },
  {
    slug: 'digital-marketing-intern',
    title: 'Digital Marketing Intern',
    team: 'Internships',
    location: 'Mumbai | Remote (India)',
    type: 'Internship',
    experienceLevel: 'Intern',
    datePosted: '2026-08-18',
    blurb: 'Six months running real campaigns and reporting real numbers.',
    description: 'Learn performance and content marketing on live accounts with real budgets, with someone senior checking your work before it ships.',
    whatYoullDo: [
      'Support paid campaign setup, monitoring and reporting',
      'Run keyword and competitor research',
      'Draft content briefs and marketing copy',
      'Build reports and pull the numbers behind them',
      'Help run social and email campaigns end to end'
    ],
    whatYoullBring: [
      'Final-year student or recent graduate in any discipline',
      'Strong written English',
      'Comfort with spreadsheets and basic analysis',
      'Genuine interest in how marketing is measured',
      'Available for a 6-month full-time internship'
    ],
    niceToHave: [
      'Any hands-on experience with ads, SEO or social',
      'Familiarity with Google Analytics',
      'A blog, newsletter or portfolio of writing'
    ],
    roleQuestions: [
      'Show something you wrote or a campaign you helped run.',
      'How would you tell whether a campaign worked?'
    ]
  },

  {
    slug: 'data-analyst-intern',
    title: 'Data Analyst Intern',
    team: 'Internships',
    location: 'Mumbai | Remote (India)',
    type: 'Internship',
    experienceLevel: 'Intern',
    datePosted: '2026-08-20',
    blurb: 'Six months turning campaign, product and CRM data into numbers people actually act on.',
    description: 'Learn analytics on live data with real consequences. You will build the dashboards our team and our clients use to make decisions, and be the person who says what the data does and does not support.',
    whatYoullDo: [
      'Build dashboards and reports across marketing, product and CRM data',
      'Run funnel, cohort and attribution analysis on live campaigns',
      'Write SQL against real datasets and check your own numbers',
      'Audit tracking implementations and find where data goes missing',
      'Automate a report that somebody currently rebuilds by hand every month',
      'Present findings clearly, including what is uncertain'
    ],
    whatYoullBring: [
      'Final-year student or recent graduate in any quantitative discipline',
      'SQL fundamentals, or the appetite to be fluent within a month',
      'Strong spreadsheet skills and comfort with large messy files',
      'Enough statistical literacy to know when a difference is not meaningful',
      'Available for a 6-month full-time internship'
    ],
    niceToHave: [
      'Familiarity with Google Analytics, Looker Studio or Power BI',
      'Python or R for analysis',
      'Any project where you drew a conclusion from data you collected yourself'
    ],
    roleQuestions: [
      'Show an analysis you did and the decision it changed.',
      'How would you explain to a client that their campaign result is not statistically meaningful?'
    ]
  },
  {
    slug: 'cyber-security-intern',
    title: 'Cyber Security Intern',
    team: 'Internships',
    location: 'Mumbai | Remote (India)',
    type: 'Internship',
    experienceLevel: 'Intern',
    datePosted: '2026-08-20',
    blurb: 'Six months securing AI systems: prompt injection, scoped access, audit trails and the boring controls that matter.',
    description: 'Security work on systems that are genuinely new. Our AI agents act inside real business systems, which means the interesting attack surface is not a login form, it is what happens when a model is persuaded to do something it should not.',
    whatYoullDo: [
      'Test AI agents and chatbots for prompt injection and jailbreaks',
      'Review credential scoping so a compromised component cannot reach far',
      'Help build and check audit logging on systems that take real actions',
      'Run dependency and configuration reviews across our apps',
      'Write up findings clearly enough for an engineer to act on them',
      'Help harden public endpoints against abuse and rate-limit evasion'
    ],
    whatYoullBring: [
      'Final-year student or recent graduate in CS, IT or a related field',
      'Understanding of common web vulnerabilities and how they are exploited',
      'Comfort in a terminal and reading code you did not write',
      'Curiosity: security is mostly asking what happens if I do the unexpected thing',
      'Available for a 6-month full-time internship'
    ],
    niceToHave: [
      'CTF participation or a security writeup you are proud of',
      'Familiarity with Burp Suite, OWASP ZAP or similar',
      'Any exposure to LLM security or AI red-teaming'
    ],
    roleQuestions: [
      'Describe a vulnerability you found or studied, and how you would fix it.',
      'How would you try to make an AI support agent do something it was told not to?'
    ]
  },

  // ── PAUSED (previous rotation) ──────────────────────────────────────
  // Engineering
  {
    slug: 'senior-backend-engineer-node',
    status: 'paused',
    title: 'Senior Backend Engineer (Node.js)',
    team: 'Engineering',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Senior',
    blurb: 'Design scalable APIs, caching, queues and data models for high-traffic apps.',
    description: 'Own the architecture and implementation of backend systems that power our products. You will design APIs that scale, implement caching strategies, and build data models that perform under load.',
    whatYoullDo: [
      'Design and implement scalable REST and GraphQL APIs',
      'Build robust microservices with proper observability',
      'Optimize database queries and implement caching strategies',
      'Design event-driven architectures with queues and streams',
      'Lead code reviews and mentor junior engineers',
      'Collaborate with frontend and DevOps teams on system design',
      'Write comprehensive tests and maintain high code quality standards'
    ],
    whatYoullBring: [
      '5+ years of backend development experience',
      'Strong proficiency in Node.js, TypeScript, and modern JavaScript',
      'Experience with databases (PostgreSQL, MongoDB, Redis)',
      'Knowledge of message queues (RabbitMQ, Apache Kafka)',
      'Understanding of microservices architecture patterns',
      'Experience with cloud platforms (AWS, Azure, or GCP)',
      'Strong problem-solving and debugging skills'
    ],
    niceToHave: [
      'Experience with container orchestration (Kubernetes)',
      'Knowledge of event sourcing and CQRS patterns',
      'Familiarity with performance monitoring tools',
      'Open source contributions'
    ],
    roleQuestions: [
      'How do you design idempotent APIs?',
      'Describe a time you improved query performance.',
      'What\'s your approach to retries, backoff and circuit breakers?'
    ]
  },
  {
    slug: 'backend-engineer-node',
    status: 'paused',
    title: 'Backend Engineer (Node.js)',
    team: 'Engineering',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    blurb: 'Build reliable services with tests, observability and CI/CD.',
    description: 'Join our backend team to build and maintain the services that power our applications. You\'ll work on API development, database optimization, and service reliability.',
    whatYoullDo: [
      'Develop and maintain RESTful APIs and services',
      'Implement database schemas and optimize queries',
      'Write comprehensive unit and integration tests',
      'Set up monitoring, logging, and alerting for services',
      'Participate in code reviews and team planning',
      'Debug and resolve production issues',
      'Collaborate with frontend developers on API contracts'
    ],
    whatYoullBring: [
      '2-4 years of backend development experience',
      'Proficiency in Node.js and TypeScript',
      'Experience with relational and NoSQL databases',
      'Understanding of RESTful API design principles',
      'Familiarity with testing frameworks (Jest, Mocha)',
      'Basic knowledge of containerization (Docker)',
      'Strong analytical and problem-solving skills'
    ],
    niceToHave: [
      'Experience with GraphQL',
      'Knowledge of caching strategies',
      'Familiarity with CI/CD pipelines',
      'Understanding of security best practices'
    ],
    roleQuestions: [
      'How do you design idempotent APIs?',
      'Describe a time you improved query performance.',
      'What\'s your approach to retries, backoff and circuit breakers?'
    ]
  },
  {
    slug: 'senior-frontend-engineer-react',
    status: 'paused',
    title: 'Senior Frontend Engineer (React/Next.js)',
    team: 'Engineering',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Senior',
    blurb: 'Own complex UIs, SSR/ISR and performance budgets.',
    description: 'Lead frontend architecture decisions and implement sophisticated user interfaces. You\'ll work with React, Next.js, and modern frontend technologies to create exceptional user experiences.',
    whatYoullDo: [
      'Design and implement complex React applications',
      'Optimize application performance and Core Web Vitals',
      'Implement SSR, SSG, and ISR strategies with Next.js',
      'Build reusable component libraries and design systems',
      'Lead frontend architecture decisions and code reviews',
      'Collaborate with designers to implement pixel-perfect UIs',
      'Mentor junior frontend developers'
    ],
    whatYoullBring: [
      '5+ years of frontend development experience',
      'Expert-level knowledge of React and Next.js',
      'Strong proficiency in TypeScript and modern JavaScript',
      'Experience with state management (Redux, Zustand, or similar)',
      'Knowledge of CSS-in-JS solutions and styling frameworks',
      'Understanding of web performance optimization techniques',
      'Experience with testing frameworks (Jest, React Testing Library)'
    ],
    niceToHave: [
      'Experience with micro-frontends architecture',
      'Knowledge of WebAssembly or advanced browser APIs',
      'Familiarity with design tools (Figma, Sketch)',
      'Open source contributions to frontend projects'
    ],
    roleQuestions: [
      'SSR vs. CSR vs. ISR - when to use which?',
      'How do you ensure accessibility (WCAG) in a complex UI?'
    ]
  },
  {
    slug: 'frontend-engineer-react',
    status: 'paused',
    title: 'Frontend Engineer (React/Next.js)',
    team: 'Engineering',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    blurb: 'Develop accessible, fast interfaces that users love.',
    description: 'Build engaging user interfaces with React and Next.js. You\'ll focus on creating accessible, performant, and user-friendly applications.',
    whatYoullDo: [
      'Develop responsive web applications with React/Next.js',
      'Implement designs from Figma/Sketch with attention to detail',
      'Ensure cross-browser compatibility and accessibility',
      'Optimize application performance and loading times',
      'Write unit and integration tests for UI components',
      'Collaborate with backend developers on API integration',
      'Participate in design reviews and provide technical input'
    ],
    whatYoullBring: [
      '2-4 years of frontend development experience',
      'Strong proficiency in React and Next.js',
      'Good understanding of HTML5, CSS3, and JavaScript',
      'Experience with responsive design and CSS frameworks',
      'Knowledge of version control systems (Git)',
      'Understanding of web accessibility principles',
      'Experience with package managers (npm, yarn)'
    ],
    niceToHave: [
      'Experience with TypeScript',
      'Knowledge of state management libraries',
      'Familiarity with design systems',
      'Understanding of SEO best practices'
    ],
    roleQuestions: [
      'SSR vs. CSR vs. ISR - when to use which?',
      'How do you ensure accessibility (WCAG) in a complex UI?'
    ]
  },
  {
    slug: 'full-stack-engineer-react-node',
    status: 'paused',
    title: 'Full-Stack Engineer (React + Node)',
    team: 'Engineering',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    blurb: 'Ship features end-to-end across web and APIs.',
    description: 'Own the full development lifecycle from database to user interface. You\'ll work across the stack to deliver complete features and maintain system reliability.',
    whatYoullDo: [
      'Develop end-to-end features from database to UI',
      'Build RESTful APIs with Node.js and React frontends',
      'Design database schemas and implement data models',
      'Implement authentication and authorization systems',
      'Write comprehensive tests across the entire stack',
      'Deploy and monitor applications in cloud environments',
      'Collaborate with designers and product managers on feature specification'
    ],
    whatYoullBring: [
      '3-5 years of full-stack development experience',
      'Proficiency in both React and Node.js ecosystems',
      'Experience with databases (PostgreSQL, MongoDB)',
      'Understanding of API design and integration',
      'Knowledge of authentication and security best practices',
      'Familiarity with cloud platforms and deployment',
      'Strong problem-solving and communication skills'
    ],
    niceToHave: [
      'Experience with TypeScript across the stack',
      'Knowledge of GraphQL',
      'Familiarity with containerization and orchestration',
      'Understanding of DevOps practices'
    ],
    roleQuestions: [
      'How do you design idempotent APIs?',
      'SSR vs. CSR vs. ISR - when to use which?',
      'What\'s your approach to retries, backoff and circuit breakers?'
    ]
  },
  {
    slug: 'mobile-engineer-flutter',
    status: 'paused',
    title: 'Mobile Engineer (Flutter)',
    team: 'Engineering',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    blurb: 'Build robust cross-platform apps and CI for mobile releases.',
    description: 'Develop cross-platform mobile applications using Flutter. You\'ll create smooth, native-feeling apps and implement robust CI/CD processes for mobile releases.',
    whatYoullDo: [
      'Develop cross-platform mobile apps with Flutter/Dart',
      'Implement native platform integrations (iOS/Android)',
      'Build offline-capable apps with local data storage',
      'Set up automated testing and CI/CD for mobile releases',
      'Optimize app performance and battery usage',
      'Collaborate with designers on mobile UI/UX implementation',
      'Manage app store submissions and release processes'
    ],
    whatYoullBring: [
      '3+ years of mobile development experience',
      'Strong proficiency in Flutter and Dart',
      'Experience with native iOS/Android development',
      'Knowledge of mobile app architecture patterns (BLoC, Provider)',
      'Understanding of mobile UI/UX design principles',
      'Experience with RESTful APIs and JSON parsing',
      'Familiarity with app store publishing processes'
    ],
    niceToHave: [
      'Experience with native modules and platform channels',
      'Knowledge of mobile security and encryption',
      'Familiarity with Firebase or similar backend services',
      'Understanding of mobile analytics and crash reporting'
    ]
  },
  {
    slug: 'qa-automation-engineer',
    status: 'paused',
    title: 'QA Automation Engineer',
    team: 'Engineering',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    blurb: 'Own test strategy, build e2e suites and shorten feedback loops.',
    description: 'Lead quality assurance through automated testing strategies. You\'ll design and implement comprehensive test suites that ensure product reliability and accelerate development cycles.',
    whatYoullDo: [
      'Design and implement automated test frameworks',
      'Build end-to-end test suites for web and mobile applications',
      'Create API testing strategies and performance tests',
      'Integrate automated tests into CI/CD pipelines',
      'Develop test data management and environment strategies',
      'Collaborate with developers on testability and quality metrics',
      'Maintain and optimize existing test automation infrastructure'
    ],
    whatYoullBring: [
      '3+ years of QA automation experience',
      'Proficiency in test automation tools (Selenium, Cypress, Playwright)',
      'Experience with API testing tools (Postman, REST Assured)',
      'Knowledge of programming languages (JavaScript, Python, Java)',
      'Understanding of CI/CD systems and test integration',
      'Experience with performance and load testing tools',
      'Strong analytical and problem-solving skills'
    ],
    niceToHave: [
      'Experience with mobile test automation (Appium)',
      'Knowledge of containerization for test environments',
      'Familiarity with security testing practices',
      'Understanding of accessibility testing'
    ]
  },
  {
    slug: 'security-engineer-appsec',
    status: 'paused',
    title: 'Security Engineer (AppSec)',
    team: 'Engineering',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Senior',
    blurb: 'Threat modeling, SAST/DAST, secure SDLC and hardening.',
    description: 'Implement security throughout the software development lifecycle. You\'ll conduct threat modeling, security assessments, and build security tooling to protect our applications and infrastructure.',
    whatYoullDo: [
      'Conduct threat modeling and security architecture reviews',
      'Implement SAST/DAST tools and security scanning pipelines',
      'Design and maintain secure coding standards and practices',
      'Perform security assessments and penetration testing',
      'Build security tooling and automation for development teams',
      'Respond to security incidents and conduct forensic analysis',
      'Train development teams on security best practices'
    ],
    whatYoullBring: [
      '4+ years of application security experience',
      'Strong knowledge of OWASP Top 10 and security frameworks',
      'Experience with security testing tools (Burp Suite, OWASP ZAP)',
      'Proficiency in at least one programming language',
      'Understanding of cloud security (AWS, Azure, GCP)',
      'Knowledge of cryptography and secure communication protocols',
      'Experience with compliance frameworks (SOC 2, ISO 27001)'
    ],
    niceToHave: [
      'Security certifications (CISSP, OSCP, CEH)',
      'Experience with container and Kubernetes security',
      'Knowledge of threat intelligence and incident response',
      'Familiarity with DevSecOps practices'
    ],
    roleQuestions: [
      'Threat model a typical web app; top mitigations.',
      'Your approach to secret management.'
    ]
  },

  // Cloud / DevOps / SRE
  {
    slug: 'devops-engineer',
    status: 'paused',
    title: 'DevOps Engineer',
    team: 'Cloud/DevOps',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    blurb: 'CI/CD pipelines, IaC, containers and release automation.',
    description: 'Build and maintain the infrastructure and deployment pipelines that power our applications. You\'ll work with modern DevOps tools to ensure reliable, scalable, and secure deployments.',
    whatYoullDo: [
      'Design and maintain CI/CD pipelines for multiple applications',
      'Implement Infrastructure as Code using Terraform or similar tools',
      'Manage containerized applications with Docker and Kubernetes',
      'Set up monitoring, logging, and alerting systems',
      'Automate deployment processes and rollback procedures',
      'Optimize cloud resource usage and costs',
      'Collaborate with development teams on deployment strategies'
    ],
    whatYoullBring: [
      '3+ years of DevOps or infrastructure experience',
      'Strong knowledge of cloud platforms (AWS, Azure, or GCP)',
      'Experience with containerization (Docker, Kubernetes)',
      'Proficiency in Infrastructure as Code (Terraform, CloudFormation)',
      'Knowledge of CI/CD tools (Jenkins, GitLab CI, GitHub Actions)',
      'Understanding of networking and security concepts',
      'Experience with monitoring tools (Prometheus, Grafana)'
    ],
    niceToHave: [
      'Experience with service mesh (Istio, Linkerd)',
      'Knowledge of GitOps practices and tools (ArgoCD, Flux)',
      'Familiarity with configuration management (Ansible, Chef)',
      'Understanding of compliance and governance frameworks'
    ],
    roleQuestions: [
      'Sketch a CI/CD pipeline for a monorepo.',
      'How do you define SLIs/SLOs and alerting without noise?'
    ]
  },
  {
    slug: 'site-reliability-engineer',
    status: 'paused',
    title: 'Site Reliability Engineer (SRE)',
    team: 'Cloud/DevOps',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Senior',
    blurb: 'SLIs/SLOs, incident response, reliability engineering.',
    description: 'Ensure the reliability, availability, and performance of our production systems. You\'ll design SLOs, implement monitoring strategies, and lead incident response efforts.',
    whatYoullDo: [
      'Define and implement SLIs, SLOs, and error budgets',
      'Design and maintain comprehensive monitoring and alerting systems',
      'Lead incident response and post-mortem processes',
      'Implement automation to reduce toil and improve reliability',
      'Conduct capacity planning and performance optimization',
      'Build tools for deployment, monitoring, and troubleshooting',
      'Collaborate with engineering teams on reliability requirements'
    ],
    whatYoullBring: [
      '5+ years of SRE or production operations experience',
      'Strong programming skills (Python, Go, or similar)',
      'Deep understanding of distributed systems and microservices',
      'Experience with observability tools (Prometheus, Jaeger, ELK)',
      'Knowledge of incident management and on-call practices',
      'Understanding of chaos engineering and reliability testing',
      'Experience with cloud platforms and auto-scaling'
    ],
    niceToHave: [
      'Experience with large-scale distributed systems',
      'Knowledge of performance engineering and optimization',
      'Familiarity with machine learning for operations (AIOps)',
      'Understanding of disaster recovery and business continuity'
    ],
    roleQuestions: [
      'How do you define SLIs/SLOs and alerting without noise?',
      'Sketch a CI/CD pipeline for a monorepo.'
    ]
  },
  {
    slug: 'cloud-architect-aws',
    status: 'paused',
    title: 'Cloud Architect (AWS)',
    team: 'Cloud/DevOps',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Senior',
    blurb: 'Landing zones, networking, security and cost optimization.',
    description: 'Design and implement cloud architecture solutions on AWS. You\'ll create secure, scalable, and cost-effective cloud environments that support our business objectives.',
    whatYoullDo: [
      'Design multi-account AWS landing zone architectures',
      'Implement secure networking and connectivity solutions',
      'Create cost optimization strategies and governance frameworks',
      'Design disaster recovery and business continuity plans',
      'Lead cloud migration projects and modernization efforts',
      'Establish security baselines and compliance frameworks',
      'Mentor teams on cloud best practices and architecture patterns'
    ],
    whatYoullBring: [
      '6+ years of cloud architecture experience',
      'AWS certifications (Solutions Architect Professional preferred)',
      'Deep knowledge of AWS services and architecture patterns',
      'Experience with large-scale cloud migrations',
      'Strong understanding of security and compliance requirements',
      'Knowledge of cost optimization and FinOps practices',
      'Experience with infrastructure automation and IaC'
    ],
    niceToHave: [
      'Multi-cloud experience (Azure, GCP)',
      'Experience with enterprise-scale transformations',
      'Knowledge of regulatory compliance (SOX, GDPR, etc.)',
      'Understanding of hybrid cloud architectures'
    ],
    roleQuestions: [
      'Design a secure multi-account AWS landing zone.',
      'Cost-optimization strategies for variable workloads?'
    ]
  },

  // AI / Data
  {
    slug: 'machine-learning-engineer-nlp',
    status: 'paused',
    title: 'Machine Learning Engineer (NLP/Chatbots)',
    team: 'AI/Data',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Senior',
    blurb: 'RAG, LLMOps and evaluation frameworks.',
    description: 'Build and deploy NLP models and chatbot systems. You\'ll work with LLMs, implement RAG architectures, and create evaluation frameworks for conversational AI systems.',
    whatYoullDo: [
      'Design and implement RAG (Retrieval-Augmented Generation) systems',
      'Build and fine-tune LLMs for specific use cases',
      'Develop chatbot architectures and conversation flows',
      'Implement model evaluation and monitoring frameworks',
      'Optimize model performance and reduce inference costs',
      'Create data pipelines for training and inference',
      'Collaborate with product teams on AI feature requirements'
    ],
    whatYoullBring: [
      '4+ years of ML engineering experience with focus on NLP',
      'Strong proficiency in Python and ML frameworks (PyTorch, TensorFlow)',
      'Experience with transformer models and large language models',
      'Knowledge of vector databases and semantic search',
      'Understanding of MLOps practices and model deployment',
      'Experience with cloud ML platforms (SageMaker, Vertex AI)',
      'Strong background in statistics and machine learning theory'
    ],
    niceToHave: [
      'Experience with prompt engineering and fine-tuning techniques',
      'Knowledge of multi-modal models (vision + language)',
      'Familiarity with reinforcement learning from human feedback (RLHF)',
      'Understanding of distributed training and model parallelism'
    ],
    roleQuestions: [
      'When to use RAG vs. fine-tuning?',
      'How do you evaluate LLM responses at scale?',
      'MLOps tooling you prefer and why?'
    ]
  },
  {
    slug: 'computer-vision-engineer',
    status: 'paused',
    title: 'Computer Vision Engineer',
    team: 'AI/Data',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Senior',
    blurb: 'Detection, OCR and model optimization for edge/cloud.',
    description: 'Develop computer vision systems for object detection, OCR, and image analysis. You\'ll optimize models for both edge devices and cloud deployment.',
    whatYoullDo: [
      'Design and implement computer vision models for various applications',
      'Build OCR systems and document processing pipelines',
      'Optimize models for edge devices and mobile deployment',
      'Develop real-time image and video processing systems',
      'Create data annotation and augmentation strategies',
      'Implement model compression and quantization techniques',
      'Collaborate with hardware teams on model deployment'
    ],
    whatYoullBring: [
      '4+ years of computer vision experience',
      'Strong proficiency in OpenCV, PyTorch, and TensorFlow',
      'Experience with object detection models (YOLO, R-CNN)',
      'Knowledge of image processing and feature extraction',
      'Understanding of model optimization and quantization',
      'Experience with edge deployment (TensorRT, ONNX)',
      'Strong background in mathematics and signal processing'
    ],
    niceToHave: [
      'Experience with 3D vision and SLAM',
      'Knowledge of medical imaging or satellite imagery',
      'Familiarity with GPU programming (CUDA)',
      'Understanding of augmented reality applications'
    ]
  },
  {
    slug: 'mlops-engineer',
    status: 'paused',
    title: 'MLOps Engineer',
    team: 'AI/Data',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    blurb: 'Model CI/CD, feature stores and monitoring for drift/bias.',
    description: 'Build the infrastructure and processes that enable machine learning at scale. You\'ll implement MLOps practices, create feature stores, and monitor models in production.',
    whatYoullDo: [
      'Design and implement ML pipelines and model deployment systems',
      'Build and maintain feature stores and data versioning',
      'Implement model monitoring for drift, bias, and performance',
      'Create automated retraining and model update workflows',
      'Set up experiment tracking and model registry systems',
      'Develop A/B testing frameworks for ML models',
      'Collaborate with data scientists on productionizing models'
    ],
    whatYoullBring: [
      '3+ years of MLOps or ML infrastructure experience',
      'Strong programming skills in Python and SQL',
      'Experience with ML platforms (Kubeflow, MLflow, SageMaker)',
      'Knowledge of containerization and orchestration (Docker, Kubernetes)',
      'Understanding of data engineering and pipeline tools',
      'Experience with monitoring and observability tools',
      'Familiarity with cloud platforms and ML services'
    ],
    niceToHave: [
      'Experience with feature engineering and selection',
      'Knowledge of model explainability and interpretability',
      'Familiarity with streaming data processing',
      'Understanding of federated learning or edge ML'
    ],
    roleQuestions: [
      'MLOps tooling you prefer and why?',
      'How do you evaluate LLM responses at scale?'
    ]
  },
  {
    slug: 'data-engineer',
    status: 'paused',
    title: 'Data Engineer',
    team: 'AI/Data',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    blurb: 'Pipelines, warehousing/lakehouse and data quality.',
    description: 'Build and maintain data infrastructure that powers analytics and ML workflows. You\'ll design data pipelines, implement data quality frameworks, and manage data warehousing solutions.',
    whatYoullDo: [
      'Design and implement scalable data ingestion pipelines',
      'Build and maintain data warehouse and lakehouse architectures',
      'Implement data quality monitoring and validation frameworks',
      'Create ETL/ELT processes for various data sources',
      'Optimize query performance and data storage costs',
      'Establish data governance and lineage tracking',
      'Collaborate with analysts and data scientists on data requirements'
    ],
    whatYoullBring: [
      '3+ years of data engineering experience',
      'Strong proficiency in SQL and Python',
      'Experience with data warehouse technologies (Snowflake, BigQuery, Redshift)',
      'Knowledge of data pipeline tools (Apache Airflow, Prefect)',
      'Understanding of data modeling and schema design',
      'Experience with cloud data services and streaming platforms',
      'Familiarity with data quality and testing frameworks'
    ],
    niceToHave: [
      'Experience with real-time data processing (Kafka, Spark Streaming)',
      'Knowledge of data mesh and modern data stack architectures',
      'Familiarity with dbt and analytics engineering',
      'Understanding of data privacy and compliance requirements'
    ],
    roleQuestions: [
      'ETL vs. ELT trade-offs; your go-to patterns.',
      'How do you ensure data quality and lineage?'
    ]
  },

  // Product / Design / Content
  {
    slug: 'product-manager-saas',
    status: 'paused',
    title: 'Product Manager (SaaS)',
    team: 'Product/Design',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    blurb: 'Outcome-driven roadmaps, discovery and delivery.',
    description: 'Lead product strategy and execution for our SaaS offerings. You\'ll drive product discovery, define roadmaps based on business outcomes, and work cross-functionally to deliver value to customers.',
    whatYoullDo: [
      'Define product strategy and outcome-driven roadmaps',
      'Conduct user research and customer discovery sessions',
      'Analyze product metrics and user behavior data',
      'Collaborate with engineering on technical feasibility and planning',
      'Write detailed product requirements and user stories',
      'Lead go-to-market planning and feature launches',
      'Work with sales and support teams on customer feedback and prioritization'
    ],
    whatYoullBring: [
      '3-5 years of product management experience, preferably in SaaS',
      'Strong analytical skills and data-driven decision making',
      'Experience with product discovery and user research methods',
      'Understanding of software development lifecycle and agile practices',
      'Excellent communication and stakeholder management skills',
      'Knowledge of product analytics tools (Mixpanel, Amplitude)',
      'Experience with roadmap planning and prioritization frameworks'
    ],
    niceToHave: [
      'Technical background or engineering experience',
      'Experience with B2B SaaS products and enterprise customers',
      'Knowledge of AI/ML products and data-driven features',
      'Familiarity with design thinking and UX principles'
    ],
    roleQuestions: [
      'Write a problem statement and measurable success metrics for a feature you shipped.',
      'Show a Figma prototype or doc link.'
    ]
  },
  {
    slug: 'ux-ui-designer',
    status: 'paused',
    title: 'UX/UI Designer',
    team: 'Product/Design',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    blurb: 'Design systems, prototypes and hand-offs with dev-ready specs.',
    description: 'Create exceptional user experiences across our products. You\'ll design user interfaces, build design systems, and collaborate closely with engineering teams to ensure seamless implementation.',
    whatYoullDo: [
      'Design user interfaces for web and mobile applications',
      'Create and maintain comprehensive design systems',
      'Conduct user research and usability testing',
      'Build interactive prototypes and wireframes',
      'Collaborate with product managers on user journey mapping',
      'Work closely with developers on design implementation',
      'Create design specifications and handoff documentation'
    ],
    whatYoullBring: [
      '3+ years of UX/UI design experience',
      'Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)',
      'Strong understanding of user-centered design principles',
      'Experience with design systems and component libraries',
      'Knowledge of accessibility standards and best practices',
      'Understanding of responsive design and mobile-first principles',
      'Strong communication and collaboration skills'
    ],
    niceToHave: [
      'Experience with user research and testing methodologies',
      'Knowledge of frontend technologies (HTML, CSS, JavaScript)',
      'Familiarity with design tokens and automated design systems',
      'Understanding of data visualization and dashboard design'
    ],
    roleQuestions: [
      'Write a problem statement and measurable success metrics for a feature you shipped.',
      'Show a Figma prototype or doc link.'
    ]
  },
  {
    slug: 'technical-writer',
    status: 'paused',
    title: 'Technical Writer',
    team: 'Product/Design',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    blurb: 'Clear docs, API references and release notes.',
    description: 'Create comprehensive documentation that helps users and developers succeed with our products. You\'ll write API documentation, user guides, and technical content that makes complex topics accessible.',
    whatYoullDo: [
      'Write and maintain API documentation and developer guides',
      'Create user manuals and help documentation',
      'Develop onboarding content and tutorials',
      'Write release notes and change log documentation',
      'Collaborate with engineering teams to understand technical features',
      'Establish documentation standards and style guides',
      'Maintain and improve existing documentation based on user feedback'
    ],
    whatYoullBring: [
      '3+ years of technical writing experience',
      'Strong writing and editing skills with attention to detail',
      'Experience with documentation tools (GitBook, Notion, Confluence)',
      'Understanding of API documentation and developer experience',
      'Familiarity with markup languages (Markdown, HTML)',
      'Ability to translate complex technical concepts into clear instructions',
      'Experience working with engineering and product teams'
    ],
    niceToHave: [
      'Background in software development or technical field',
      'Experience with docs-as-code workflows and version control',
      'Knowledge of information architecture and content strategy',
      'Familiarity with video creation and multimedia documentation'
    ]
  },

  // Go-to-Market / Customer
  {
    slug: 'solutions-architect',
    status: 'paused',
    title: 'Solutions Architect',
    team: 'Go-to-Market',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Senior',
    blurb: 'Pre-sales discovery, solution design and PoCs.',
    description: 'Bridge the gap between our technical capabilities and customer needs. You\'ll design solutions, conduct technical discovery, and build proof-of-concepts that demonstrate value to prospects.',
    whatYoullDo: [
      'Conduct technical discovery sessions with prospects',
      'Design custom solutions based on customer requirements',
      'Build and present proof-of-concepts and technical demonstrations',
      'Collaborate with sales teams on technical aspects of deals',
      'Create technical proposals and architecture documentation',
      'Support post-sales implementation and integration projects',
      'Gather customer feedback and requirements for product development'
    ],
    whatYoullBring: [
      '5+ years of solutions architecture or technical consulting experience',
      'Strong technical background in cloud platforms and software development',
      'Excellent presentation and communication skills',
      'Experience with pre-sales activities and customer-facing roles',
      'Understanding of enterprise software and integration patterns',
      'Knowledge of multiple technology stacks and platforms',
      'Ability to translate business requirements into technical solutions'
    ],
    niceToHave: [
      'Experience with AI/ML solutions and data platforms',
      'Background in professional services or consulting',
      'Industry certifications (AWS, Azure, Google Cloud)',
      'Understanding of compliance and security frameworks'
    ]
  },
  {
    slug: 'customer-success-manager',
    status: 'paused',
    title: 'Customer Success Manager',
    team: 'Go-to-Market',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    blurb: 'Onboarding, value realization and renewals.',
    description: 'Ensure customers achieve success with our products. You\'ll manage the customer lifecycle from onboarding through renewal, focusing on value realization and growth opportunities.',
    whatYoullDo: [
      'Lead customer onboarding and implementation processes',
      'Monitor customer health metrics and usage patterns',
      'Conduct regular business reviews and success planning sessions',
      'Identify expansion and upselling opportunities',
      'Coordinate with support teams on customer issues and escalations',
      'Develop customer success playbooks and best practices',
      'Drive renewal processes and contract negotiations'
    ],
    whatYoullBring: [
      '3+ years of customer success or account management experience',
      'Strong relationship building and communication skills',
      'Experience with SaaS products and subscription models',
      'Understanding of customer success metrics and KPIs',
      'Ability to analyze data and identify trends in customer behavior',
      'Experience with CRM and customer success platforms',
      'Problem-solving skills and customer-first mindset'
    ],
    niceToHave: [
      'Technical background or understanding of software products',
      'Experience with enterprise B2B customers',
      'Knowledge of project management methodologies',
      'Familiarity with data analysis and reporting tools'
    ]
  },
  {
    slug: 'technical-support-engineer-l2',
    status: 'paused',
    title: 'Technical Support Engineer (L2)',
    team: 'Go-to-Market',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    blurb: 'Troubleshoot, replicate issues and escalate effectively.',
    description: 'Provide advanced technical support to customers using our products. You\'ll troubleshoot complex issues, work with engineering teams on bug resolution, and ensure customer satisfaction.',
    whatYoullDo: [
      'Provide L2 technical support via email, chat, and phone',
      'Troubleshoot complex technical issues and system integrations',
      'Reproduce customer issues in test environments',
      'Collaborate with engineering teams on bug reports and feature requests',
      'Create and maintain knowledge base articles and troubleshooting guides',
      'Escalate critical issues and coordinate resolution efforts',
      'Mentor L1 support engineers and provide technical guidance'
    ],
    whatYoullBring: [
      '3+ years of technical support experience',
      'Strong troubleshooting and problem-solving skills',
      'Experience with APIs, databases, and web technologies',
      'Understanding of networking, security, and system administration',
      'Excellent communication skills and patience with customers',
      'Experience with ticketing systems and support tools',
      'Ability to work under pressure and manage multiple priorities'
    ],
    niceToHave: [
      'Programming experience in any language',
      'Knowledge of cloud platforms and DevOps tools',
      'Experience with enterprise software support',
      'Understanding of ITIL or other support frameworks'
    ]
  },

  // People / Ops / Finance / Legal
  {
    slug: 'talent-acquisition-specialist-tech',
    status: 'paused',
    title: 'Talent Acquisition Specialist (Tech)',
    team: 'People/Ops',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    blurb: 'Full-cycle recruiting and stakeholder alignment.',
    description: 'Lead technical recruiting efforts to build world-class engineering and technical teams. You\'ll manage full-cycle recruiting and partner with hiring managers to attract top talent.',
    whatYoullDo: [
      'Source and recruit candidates for technical roles',
      'Conduct initial screening and technical assessments',
      'Partner with hiring managers on role requirements and interview processes',
      'Build and maintain talent pipelines for key technical roles',
      'Develop recruiting strategies and employer branding initiatives',
      'Manage candidate experience throughout the hiring process',
      'Analyze recruiting metrics and optimize hiring processes'
    ],
    whatYoullBring: [
      '3+ years of technical recruiting experience',
      'Understanding of software development roles and technologies',
      'Experience with recruiting tools and applicant tracking systems',
      'Strong sourcing skills using LinkedIn, GitHub, and other platforms',
      'Excellent communication and relationship building skills',
      'Data-driven approach to recruiting and process improvement',
      'Knowledge of employment law and hiring best practices'
    ],
    niceToHave: [
      'Technical background or engineering experience',
      'Experience recruiting for startups or high-growth companies',
      'Knowledge of diversity and inclusion recruiting practices',
      'Familiarity with remote hiring and global talent acquisition'
    ],
    roleQuestions: [
      'How do you handle competing reqs or sensitive employee cases?',
      'Share a metric you improved and how.'
    ]
  },
  {
    slug: 'hr-business-partner',
    status: 'paused',
    title: 'HR Business Partner',
    team: 'People/Ops',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Senior',
    blurb: 'People programs, performance cycles and policy.',
    description: 'Partner with business leaders to drive people strategy and organizational effectiveness. You\'ll manage performance processes, employee relations, and strategic HR initiatives.',
    whatYoullDo: [
      'Partner with leadership on people strategy and organizational design',
      'Manage performance review cycles and calibration processes',
      'Handle employee relations issues and conflict resolution',
      'Design and implement people programs and policies',
      'Provide coaching and guidance to managers on people matters',
      'Analyze people data and metrics to inform decision making',
      'Lead change management initiatives and communication'
    ],
    whatYoullBring: [
      '5+ years of HR business partner or generalist experience',
      'Strong understanding of employment law and HR best practices',
      'Experience with performance management and employee development',
      'Excellent interpersonal and communication skills',
      'Data analysis skills and experience with HR metrics',
      'Ability to handle confidential and sensitive situations',
      'Change management and organizational development experience'
    ],
    niceToHave: [
      'Experience in technology or fast-growing companies',
      'Knowledge of compensation and benefits design',
      'Understanding of diversity, equity, and inclusion practices',
      'HR certification (SHRM, HRCI)'
    ],
    roleQuestions: [
      'How do you handle competing reqs or sensitive employee cases?',
      'Share a metric you improved and how.'
    ]
  },
  {
    slug: 'hr-operations-executive',
    status: 'paused',
    title: 'HR Operations Executive',
    team: 'People/Ops',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Entry',
    blurb: 'HRIS, onboarding and documentation.',
    description: 'Support HR operations and ensure smooth people processes. You\'ll manage HRIS systems, coordinate onboarding, and maintain HR documentation and compliance.',
    whatYoullDo: [
      'Maintain and update HRIS systems and employee records',
      'Coordinate new employee onboarding and offboarding processes',
      'Process HR transactions (promotions, transfers, leave requests)',
      'Generate HR reports and analytics for leadership team',
      'Ensure compliance with employment laws and regulations',
      'Manage benefits administration and employee communications',
      'Support HR projects and process improvement initiatives'
    ],
    whatYoullBring: [
      '1-3 years of HR operations or administrative experience',
      'Strong attention to detail and organizational skills',
      'Experience with HRIS systems and spreadsheet applications',
      'Understanding of employment law and HR compliance',
      'Excellent communication and customer service skills',
      'Ability to handle confidential information with discretion',
      'Process improvement mindset and problem-solving abilities'
    ],
    niceToHave: [
      'Experience with specific HRIS platforms (Workday, BambooHR)',
      'Knowledge of payroll processing and benefits administration',
      'Understanding of data privacy and security requirements',
      'HR certification or relevant educational background'
    ],
    roleQuestions: [
      'How do you handle competing reqs or sensitive employee cases?',
      'Share a metric you improved and how.'
    ]
  },
  {
    slug: 'employer-branding-manager',
    status: 'paused',
    title: 'Employer Branding Manager',
    team: 'People/Ops',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    blurb: 'Content, campaigns and university outreach.',
    description: 'Build and promote Stackbinary\'s employer brand to attract top talent. You\'ll create content, manage campaigns, and develop university partnerships to strengthen our talent pipeline.',
    whatYoullDo: [
      'Develop employer branding strategy and messaging',
      'Create content showcasing company culture and employee experiences',
      'Manage social media presence and recruitment marketing campaigns',
      'Build partnerships with universities and educational institutions',
      'Organize and execute campus recruiting and career fair activities',
      'Coordinate employee advocacy and referral programs',
      'Measure and analyze employer brand metrics and campaign effectiveness'
    ],
    whatYoullBring: [
      '3+ years of marketing, communications, or employer branding experience',
      'Strong content creation skills (writing, design, video)',
      'Experience with social media marketing and digital campaigns',
      'Understanding of talent acquisition and recruitment marketing',
      'Project management skills and ability to manage multiple campaigns',
      'Data analysis skills to measure campaign performance',
      'Creative thinking and brand storytelling abilities'
    ],
    niceToHave: [
      'Experience in technology or startup environments',
      'Knowledge of design tools (Canva, Adobe Creative Suite)',
      'Understanding of university recruiting and campus programs',
      'Experience with marketing automation and CRM tools'
    ]
  },
  {
    slug: 'learning-development-specialist',
    status: 'paused',
    title: 'Learning & Development Specialist',
    team: 'People/Ops',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    blurb: 'Curricula, learning paths and enablement.',
    description: 'Design and deliver learning programs that develop our team\'s skills and capabilities. You\'ll create curricula, manage training programs, and support career development initiatives.',
    whatYoullDo: [
      'Design and develop learning curricula and training programs',
      'Create learning paths for different roles and career levels',
      'Deliver training sessions and workshops (virtual and in-person)',
      'Manage learning management systems and training platforms',
      'Partner with subject matter experts to develop technical content',
      'Evaluate training effectiveness and gather learner feedback',
      'Support mentorship programs and career development initiatives'
    ],
    whatYoullBring: [
      '3+ years of learning and development or training experience',
      'Instructional design skills and adult learning principles',
      'Experience creating and delivering training content',
      'Strong presentation and facilitation skills',
      'Understanding of learning technologies and LMS platforms',
      'Project management skills and ability to manage multiple programs',
      'Data analysis skills to measure learning outcomes'
    ],
    niceToHave: [
      'Technical background or experience in technology companies',
      'Certification in instructional design or learning technologies',
      'Experience with e-learning development tools',
      'Understanding of competency frameworks and skill assessments'
    ]
  },
  {
    slug: 'finance-manager',
    status: 'paused',
    title: 'Finance Manager',
    team: 'People/Ops',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Senior',
    blurb: 'FP&A, billing, compliance and audits.',
    description: 'Lead financial planning, analysis, and operations to support business growth. You\'ll manage financial processes, ensure compliance, and provide strategic financial insights to leadership.',
    whatYoullDo: [
      'Prepare financial forecasts, budgets, and variance analysis',
      'Manage accounts payable, receivable, and billing processes',
      'Ensure compliance with accounting standards and tax regulations',
      'Coordinate external audits and financial reviews',
      'Analyze financial performance and provide business insights',
      'Manage cash flow forecasting and working capital optimization',
      'Support fundraising activities and investor reporting'
    ],
    whatYoullBring: [
      '5+ years of finance and accounting experience',
      'Strong knowledge of accounting principles and financial analysis',
      'Experience with financial planning and budgeting processes',
      'Proficiency in financial software and ERP systems',
      'Understanding of tax compliance and regulatory requirements',
      'Strong analytical and problem-solving skills',
      'Excellent communication and stakeholder management abilities'
    ],
    niceToHave: [
      'CPA, CFA, or other relevant professional certification',
      'Experience in technology or SaaS companies',
      'Knowledge of subscription business models and revenue recognition',
      'Understanding of international accounting and transfer pricing'
    ]
  },
  {
    slug: 'operations-manager',
    status: 'paused',
    title: 'Operations Manager',
    team: 'People/Ops',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Mid',
    blurb: 'Vendor management, SLAs and process improvement.',
    description: 'Optimize business operations and drive process improvements across the organization. You\'ll manage vendor relationships, establish SLAs, and implement operational excellence initiatives.',
    whatYoullDo: [
      'Manage vendor relationships and negotiate service agreements',
      'Establish and monitor SLAs for internal and external services',
      'Identify process improvement opportunities and implement solutions',
      'Coordinate cross-functional projects and operational initiatives',
      'Manage office operations and facilities (if applicable)',
      'Develop and maintain operational procedures and documentation',
      'Analyze operational metrics and report on performance'
    ],
    whatYoullBring: [
      '3+ years of operations or business process management experience',
      'Strong project management and organizational skills',
      'Experience with vendor management and contract negotiation',
      'Understanding of process improvement methodologies (Lean, Six Sigma)',
      'Data analysis skills and experience with operational metrics',
      'Excellent communication and stakeholder management abilities',
      'Problem-solving mindset and attention to detail'
    ],
    niceToHave: [
      'Experience in technology or fast-growing companies',
      'Knowledge of quality management systems and compliance frameworks',
      'Understanding of supply chain and procurement processes',
      'Project management certification (PMP, Agile)'
    ]
  },
  {
    slug: 'legal-compliance-associate',
    status: 'paused',
    title: 'Legal & Compliance Associate',
    team: 'People/Ops',
    location: 'Mumbai | Remote (India)',
    type: 'Full-time',
    experienceLevel: 'Entry',
    blurb: 'Contracts, data protection and policy reviews.',
    description: 'Support legal and compliance activities to ensure the company operates within regulatory requirements. You\'ll review contracts, manage compliance programs, and support policy development.',
    whatYoullDo: [
      'Review and draft contracts, agreements, and legal documents',
      'Support data protection and privacy compliance initiatives (GDPR, CCPA)',
      'Maintain compliance with employment laws and regulations',
      'Assist with intellectual property management and protection',
      'Conduct legal research and analyze regulatory requirements',
      'Support litigation management and dispute resolution',
      'Develop and update company policies and procedures'
    ],
    whatYoullBring: [
      '1-3 years of legal or compliance experience',
      'Law degree or equivalent legal education',
      'Understanding of contract law and commercial agreements',
      'Knowledge of data protection and privacy regulations',
      'Strong research and analytical skills',
      'Excellent written and verbal communication abilities',
      'Attention to detail and ability to work with complex documents'
    ],
    niceToHave: [
      'Bar admission or legal practice experience',
      'Experience in technology or software companies',
      'Knowledge of intellectual property law',
      'Understanding of international regulations and cross-border compliance'
    ]
  },

  // Internships
  {
    slug: 'software-engineer-intern',
    title: 'Software Engineer Intern',
    team: 'Internships',
    location: 'Mumbai | Remote (India)',
    type: 'Internship',
    experienceLevel: 'Intern',
    datePosted: '2026-08-18',
    blurb: 'Work on real features with mentorship and clear goals.',
    description: 'Join our engineering team as an intern and work on real projects that impact our products. You\'ll receive mentorship, gain hands-on experience, and contribute to meaningful features.',
    whatYoullDo: [
      'Work on real product features under the guidance of senior engineers',
      'Participate in code reviews and team development processes',
      'Learn about software development best practices and methodologies',
      'Attend team meetings and contribute to technical discussions',
      'Complete assigned projects with clear deliverables and timelines',
      'Collaborate with cross-functional teams on product development',
      'Present your work and learnings to the team'
    ],
    whatYoullBring: [
      'Currently pursuing or recently completed a degree in Computer Science or related field',
      'Basic programming knowledge in at least one language (JavaScript, Python, Java)',
      'Understanding of fundamental computer science concepts',
      'Eagerness to learn and work on challenging technical problems',
      'Good communication skills and ability to work in a team',
      'Problem-solving mindset and attention to detail',
      'Availability for 3-6 month internship period'
    ],
    niceToHave: [
      'Previous internship or project experience in software development',
      'Knowledge of web technologies (HTML, CSS, React)',
      'Familiarity with version control systems (Git)',
      'Understanding of databases and APIs'
    ]
  }
];

/**
 * Fallback posting date for roles that predate the `datePosted` field.
 *
 * Google requires datePosted on every JobPosting and treats listings older
 * than ~30 days as stale, dropping them from the Jobs experience. When a role
 * is genuinely re-opened or refreshed, bump its own datePosted rather than
 * moving this constant — this exists only so no listing is ever invalid.
 */
export const POSTED_DEFAULT = '2026-07-01';

/** ISO date for schema.org JobPosting.datePosted. */
export function jobDatePosted(job: Job): string {
  return job.datePosted || POSTED_DEFAULT;
}

/**
 * schema.org validThrough. Google expects an expiry; absent one, listings are
 * assumed stale after a while anyway. 90 days from posting is a reasonable
 * default for roles we keep genuinely open.
 */
export function jobValidThrough(job: Job): string {
  const posted = new Date(jobDatePosted(job));
  posted.setDate(posted.getDate() + 90);
  return posted.toISOString().slice(0, 10);
}

/** Roles currently advertised. Everything user-facing should use this. */
export function getOpenJobs(): Job[] {
  return JOBS.filter((j) => j.status !== 'paused');
}

export function isJobOpen(job: Job): boolean {
  return job.status !== 'paused';
}

export function getJobBySlug(slug: string): Job | undefined {
  return JOBS.find(job => job.slug === slug);
}

export function getJobsByTeam(team: string): Job[] {
  return JOBS.filter(job => job.team === team);
}

export function getAllTeams(): string[] {
  return Array.from(new Set(JOBS.map(job => job.team)));
}

export function getAllJobSlugs(): string[] {
  return JOBS.map(job => job.slug);
}

// Export jobs for backward compatibility
export const jobs = JOBS;