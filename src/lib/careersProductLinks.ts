// Role → product-page links for the "What You'd Build" section on job pages.
//
// Why this exists: the careers pages are the site's most-visited, most-crawled
// pages (the Aug 2026 applicant flood), but they were dead ends — apply or
// leave. Linking each role to the products it would actually work on routes
// that crawl attention and traffic to the commercial pages, and gives serious
// candidates something concrete to evaluate. Links must stay honest: only
// products a person in that role would genuinely touch.
//
// Hrefs are the live martech page slugs from src/data/martechPages.js plus the
// /martech hub. If a page is ever removed there, remove its links here.

export interface ProductLink {
  title: string;
  href: string;
  note: string;
}

const HUB: ProductLink = {
  title: 'The StackBinary MarTech Suite',
  href: '/martech',
  note: 'The full product line — every system we ship, most with live demos.',
};

const CALL_CENTER: ProductLink = {
  title: 'AI Call Center & AI Receptionist',
  href: '/martech/ai-call-center',
  note: 'Voice AI that answers business calls in 11 languages and logs every conversation.',
};

const INFLUENCER: ProductLink = {
  title: 'Influencer Marketing Platform',
  href: '/martech/influencer-marketing',
  note: 'Scores every creator 0–100 against an ideal profile, replacing spreadsheet vetting.',
};

const LEAD_INTEL: ProductLink = {
  title: 'B2B Lead CRM',
  href: '/martech/lead-intelligence',
  note: 'Custom CRM with lead sync, email, calling and follow-ups — no per-contact pricing.',
};

const SALES_INTEL: ProductLink = {
  title: 'Sales Intelligence Engine',
  href: '/martech/sales-intelligence',
  note: 'Finds companies, people and numbers, then tells reps what to pitch.',
};

const AD_INTEL: ProductLink = {
  title: 'AI Ad Intelligence Platform',
  href: '/martech/ad-intelligence',
  note: 'Creative analytics, social automation and scraping unified under one AI layer.',
};

const AI_INTEGRATION: ProductLink = {
  title: 'AI Integration Services',
  href: '/martech/ai-integration',
  note: 'Wiring AI into existing stacks — the orchestration layer client work is built on.',
};

const linksBySlug: Record<string, ProductLink[]> = {
  // Backend / full-stack: the two heaviest server-side products.
  'senior-backend-engineer-node': [CALL_CENTER, LEAD_INTEL],
  'backend-engineer-node': [CALL_CENTER, LEAD_INTEL],
  'full-stack-engineer-react-node': [LEAD_INTEL, AD_INTEL],
  'software-engineer-intern': [CALL_CENTER, HUB],

  // Frontend: dashboard-heavy products.
  'senior-frontend-engineer-react': [AD_INTEL, INFLUENCER],
  'frontend-engineer-react': [AD_INTEL, INFLUENCER],
  'ux-ui-designer': [INFLUENCER, AD_INTEL],
  'mobile-engineer-flutter': [CALL_CENTER, HUB],

  // ML / AI: each maps to the product its specialty powers.
  'machine-learning-engineer-nlp': [CALL_CENTER, SALES_INTEL],
  'computer-vision-engineer': [AD_INTEL, INFLUENCER],
  'mlops-engineer': [CALL_CENTER, AD_INTEL],
  'data-engineer': [SALES_INTEL, LEAD_INTEL],

  // Infra: the products with the most demanding runtime footprint.
  'devops-engineer': [CALL_CENTER, AI_INTEGRATION],
  'site-reliability-engineer': [CALL_CENTER, AI_INTEGRATION],
  'cloud-architect-aws': [AI_INTEGRATION, CALL_CENTER],
  'security-engineer-appsec': [LEAD_INTEL, AI_INTEGRATION],
  'qa-automation-engineer': [AD_INTEL, CALL_CENTER],

  // Product / delivery-facing roles.
  'product-manager-saas': [HUB, AD_INTEL],
  'solutions-architect': [AI_INTEGRATION, HUB],
  'technical-writer': [HUB, AI_INTEGRATION],
  'customer-success-manager': [LEAD_INTEL, HUB],
  'technical-support-engineer-l2': [CALL_CENTER, LEAD_INTEL],
};

// Non-product roles (HR, finance, ops, legal…) still get the hub: candidates
// evaluating any role want to see what the company actually makes.
export function getProductLinksForJob(slug: string): ProductLink[] {
  return linksBySlug[slug] ?? [HUB];
}
