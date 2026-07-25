#!/usr/bin/env node
/**
 * GEO article generator — picks the top validated gap from the cluster store
 * and writes a grounded article into src/content/insights/.
 *
 * Grounding rule: source material is EXCLUSIVELY StackBinary's own data files
 * (caseStudies, martechPages, industries). Articles that can't cite >=3
 * proprietary facts are not written; the cluster is marked needs-human.
 *
 * Env: CHATGPT_API_KEY (or OPENAI_API_KEY)
 * Usage: node scripts/geo-generate.mjs [--dry] [--cluster <id>]
 * Prints "ARTICLE_FILE=<path>" on success (consumed by the GitHub Action).
 */

import fs from "node:fs";
import path from "node:path";

const OPENAI_KEY = process.env.CHATGPT_API_KEY || process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.error("CHATGPT_API_KEY missing");
  process.exit(1);
}

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const forcedCluster = args.includes("--cluster") ? args[args.indexOf("--cluster") + 1] : null;

const DATA_DIR = path.join("docs", "ai-seo", "data");
const CONTENT_DIR = path.join("src", "content", "insights");
fs.mkdirSync(CONTENT_DIR, { recursive: true });

const storeFile = path.join(DATA_DIR, "queries.json");
const store = JSON.parse(fs.readFileSync(storeFile, "utf8"));

// ---------- coverage check: does an existing page already answer this? ----------
const STOP = new Set("a an the in for of to and or best top with my me is are on at near company companies agency agencies india".split(" "));
const tokens = (q) => q.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter((t) => t && !STOP.has(t));
const overlap = (a, b) => {
  const B = new Set(b);
  return a.filter((t) => B.has(t)).length / (a.length || 1);
};

function sitePagesIndex() {
  const pages = [];
  const martech = fs.readFileSync(path.join("src", "data", "martechPages.js"), "utf8");
  for (const m of martech.matchAll(/seoTitle: "([^"]+)"/g)) pages.push(m[1]);
  const industries = fs.readFileSync(path.join("src", "data", "industries.js"), "utf8");
  for (const m of industries.matchAll(/seoTitle: "([^"]+)"/g)) pages.push(m[1]);
  pages.push(
    "custom martech development marketing stack",
    "case studies shipped products",
    "shopify ecommerce storefronts development",
    "hire developers dedicated team",
    "software development services AI cloud web mobile"
  );
  if (fs.existsSync(CONTENT_DIR))
    for (const f of fs.readdirSync(CONTENT_DIR))
      pages.push(f.replace(/\.md$/, "").replace(/-/g, " "));
  return pages.map(tokens);
}

// Client/partner brand names: never write articles about brand-specific
// queries, and never let these names appear in generated articles (work
// involving them was delivered in partnership, not solely by StackBinary).
const BRAND_BLOCKLIST = [
  "steve madden", "utsav", "dudalina", "koovs", "starstruck", "sunny leone",
  "bioderma", "sugar cosmetics", "shiseido", "the ordinary", "abbott",
  "sanofi", "philips", "kfc", "hyundai", "reliance", "sony", "mumbai indians",
  "quick heal", "bayer", "syngenta", "upl", "piramal", "future group",
  "wrogn", "healthspace", "afiya", "easecare", "ipatientcare", "medichat",
  "gurukul", "busokay", "canchello", "krooz", "ponttual", "stargaze",
  "zoniq", "aloki", "indu", "banksathi", "classpass", "kisna", "bigmuscles",
  "mymuse", "bajaao", "jaipur kurti", "prime engage", "yuvaah",
];
const mentionsBlockedBrand = (text) => {
  const t = text.toLowerCase();
  return BRAND_BLOCKLIST.filter((b) => t.includes(b));
};

// ---------- pick the gap ----------
const pagesIdx = sitePagesIndex();
const candidates = store.clusters
  .filter((c) =>
    forcedCluster
      ? c.id === forcedCluster
      : ["new", "gap"].includes(c.status) && c.days.length >= 3 && !c.citedUs
  )
  .filter((c) => !pagesIdx.some((p) => overlap(c.tokens, p) >= 0.6))
  .filter((c) => {
    const blocked = mentionsBlockedBrand(c.head + " " + c.variants.join(" "));
    if (blocked.length && c.status !== "rejected") {
      c.status = "rejected";
      c.rejectReason = `brand-specific query (${blocked[0]})`;
    }
    return !blocked.length;
  })
  .sort((a, b) => b.days.length - a.days.length || b.count - a.count);

if (!candidates.length) {
  console.log("No validated gaps ready (need >=3 distinct days, uncited, uncovered). Skipping.");
  process.exit(0);
}
const gap = candidates[0];
console.log(`Selected gap ${gap.id}: "${gap.head}" (${gap.days.length} days, ${gap.count} hits)`);

// ---------- grounding corpus ----------
// Own products, capabilities, pricing and process ONLY. Client case studies
// and industry client rosters are deliberately EXCLUDED (partnership work).
const martechData = fs.readFileSync(path.join("src", "data", "martechPages.js"), "utf8");

const OWN_PRODUCTS = `StackBinary's OWN products and platforms (safe to cite as ours):
- Zyflus (zyflus.com): influencer marketing platform — creator discovery, AI vetting 0-100 match scores, DM outreach automation, negotiation pipeline.
- AtoEmail (atoemail.com): marketing automation/email platform — visual journey builder, campaigns, unified inbox, AMP email, developer API, no per-contact pricing.
- StackBinary B2B Lead CRM (lead.stackbinary.io, in daily production use by our own BD team): WhatsApp + call + email capture, multilingual transcription, AI lead scoring (score/temperature/next action), "Ask your CRM" assistant, AI-drafted proposals, Google Sheets sync.
- AI Call Center: real-time multilingual voice sales agent (11 languages), inbound + outbound, human handoff, CRM-logged transcripts, configured per company from one profile.
- Meta Marketing Tool: multi-account Meta ad-ops (10-20 accounts), AI analysis per ad, AI ad copy/creative generation, publishing via Meta Graph API, audit logs.
- Creative Intelligence Lab (TRIBE v2): five-lens AI video ad analysis — on-screen emotion, voice & tone, visuals & pacing, script intelligence, neural attention prediction with per-second curves.
- TradeToIndia DB: B2B enrichment engine — CSV in, live enrichment, verified emails/phones, credit-metered.
- Social bots & scrapers: Instagram/Facebook/Quora reply + follow-up bots, web scraping pipelines.
- 29+ live Shopify/D2C storefronts delivered.
Process: AI-accelerated delivery with senior-engineer review; free discovery/stack-audit call; weekly increments.`;

const PRICING = `Indicative StackBinary pricing (INR): focused first release ₹5–15 Lakh in 6–12 weeks; larger platforms ₹15–40 Lakh+; managed retainer available. Free discovery/stack-audit call.`;

const SITE_LINKS = `Internal pages to link (use 2-4, keyword-rich anchors, markdown links):
/martech (martech services), /martech/marketing-automation, /martech/influencer-marketing, /martech/ad-intelligence, /martech/creative-analysis, /martech/lead-intelligence, /martech/ai-call-center, /martech/social-automation, /martech/proposal-maker, /martech/ai-integration, /martech/shopify-websites, /industries, /industries/healthcare-pharma, /industries/retail-ecommerce, /case-studies, /services, /hire-developers, /contact-us`;

// ---------- generate ----------
async function chat(messages, model = "gpt-4o") {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${OPENAI_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model, temperature: 0.7, messages }),
  });
  if (!res.ok) throw new Error(`openai ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return (await res.json()).choices[0].message.content;
}

const system = `You write articles for StackBinary (stackbinary.io), an AI-native software & martech agency in Mumbai. HARD RULES:
1. Every factual claim (metric, price, timeline, capability) MUST come from the provided source data. NEVER invent numbers or capabilities.
2. NEVER mention any client brand, client project or campaign result. Do not name any company other than StackBinary and its own products (Zyflus, AtoEmail, TradeToIndia, the StackBinary CRM, AI Call Center, Meta Marketing Tool, TRIBE v2 lab) — competitor SaaS tools (HubSpot, Salesforce, Mailchimp) may be named neutrally in comparisons.
2b. Include at least 3 specific proprietary facts from the data (own-product capabilities, real pricing bands, real timelines, real product mechanics).
3. Structure: open with a 40-80 word direct answer to the head query (no heading above it). Then H2 sections answering the sub-queries. End with an FAQ section (### questions) covering long-tail variants, then a short CTA paragraph linking to /contact-us.
4. Include exactly one markdown table that helps the reader decide something (costs, comparison, checklist).
5. Voice: experienced practitioner, first-person plural ("we've shipped", "when we built"). Concrete over generic. No fluff, no "in today's digital landscape".
6. Use 2-4 internal links with keyword-rich anchor text from the provided list. No external links.
7. 900-1400 words. Output ONLY the article markdown (no frontmatter, no title heading - the title is rendered separately).`;

const user = `Head query (the article must directly answer this): "${gap.head}"
Query variants observed from real AI-engine searches (use as H2/FAQ material): ${gap.variants.join(" | ")}

SOURCE DATA (the only permitted facts):
--- OWN PRODUCTS ---
${OWN_PRODUCTS}
--- PRICING ---
${PRICING}
--- MARTECH PRODUCTS (JS — ignore any client/campaign references inside) ---
${martechData.slice(0, 16000)}
--- LINKS ---
${SITE_LINKS}

Also output, on the FIRST THREE LINES ONLY, exactly:
TITLE: <60-70 char title matching the head query language>
DESCRIPTION: <140-160 char meta description>
SLUG: <kebab-case-url-slug>
Then a blank line, then the article markdown.`;

const raw = await chat([
  { role: "system", content: system },
  { role: "user", content: user },
]);

const titleM = raw.match(/^TITLE:\s*(.+)$/m);
const descM = raw.match(/^DESCRIPTION:\s*(.+)$/m);
const slugM = raw.match(/^SLUG:\s*(.+)$/m);
const body = raw.replace(/^TITLE:.*$|^DESCRIPTION:.*$|^SLUG:.*$/gm, "").trim();

if (!titleM || !descM || !slugM || body.length < 2000) {
  console.error("Generation failed structural checks; marking needs-human.");
  gap.status = "needs-human";
  fs.writeFileSync(storeFile, JSON.stringify(store, null, 2));
  process.exit(0);
}

// ---------- grounding gate: >=3 proprietary (own-product) facts present ----------
const factMarkers = [
  "Zyflus", "AtoEmail", "TradeToIndia", "StackBinary CRM", "B2B Lead CRM",
  "AI Call Center", "Meta Marketing Tool", "TRIBE v2", "Creative Intelligence",
  "₹5", "₹15", "₹40", "11 languages", "0–100", "0-100", "29+", "per-contact",
  "6–12 weeks", "6-12 weeks", "stack audit", "lead.stackbinary.io",
];
const factsFound = [...new Set(factMarkers.filter((f) => body.includes(f)))];
if (factsFound.length < 3) {
  console.error(`Only ${factsFound.length} proprietary facts found; marking needs-human.`);
  gap.status = "needs-human";
  fs.writeFileSync(storeFile, JSON.stringify(store, null, 2));
  process.exit(0);
}

// ---------- brand gate: client/partner names must never appear ----------
const brandHits = mentionsBlockedBrand(body);
if (brandHits.length) {
  console.error(`Article mentions blocked brand(s): ${brandHits.join(", ")}; marking needs-human.`);
  gap.status = "needs-human";
  fs.writeFileSync(storeFile, JSON.stringify(store, null, 2));
  process.exit(0);
}

const slug = slugM[1].trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").slice(0, 80);
const file = path.join(CONTENT_DIR, `${slug}.md`);
const frontmatter = `---
title: "${titleM[1].trim().replace(/"/g, "'")}"
description: "${descM[1].trim().replace(/"/g, "'")}"
date: "${new Date().toISOString().slice(0, 10)}"
cluster: "${gap.id}"
headQuery: "${gap.head.replace(/"/g, "'")}"
groundedFacts: ${factsFound.length}
---

`;

if (dry) {
  console.log("[dry] would write", file);
  console.log(frontmatter + body.slice(0, 600));
  process.exit(0);
}

fs.writeFileSync(file, frontmatter + body + "\n");

// track status + add to llms.txt
gap.status = "article-open";
gap.articleSlug = slug;
fs.writeFileSync(storeFile, JSON.stringify(store, null, 2));

const llmsPath = path.join("public", "llms.txt");
let llms = fs.readFileSync(llmsPath, "utf8");
const line = `- [${titleM[1].trim()}](https://stackbinary.io/insights/${slug}): ${descM[1].trim()}`;
if (!llms.includes(`/insights/${slug}`)) {
  llms = llms.includes("## Insights")
    ? llms.replace("## Insights\n", `## Insights\n\n${line}\n`).replace(/\n\n\n/g, "\n\n")
    : llms.replace("## Optional", `## Insights\n\n${line}\n\n## Optional`);
  fs.writeFileSync(llmsPath, llms);
}

console.log(`ARTICLE_FILE=${file}`);
console.log(`ARTICLE_SLUG=${slug}`);
console.log(`ARTICLE_TITLE=${titleM[1].trim()}`);
