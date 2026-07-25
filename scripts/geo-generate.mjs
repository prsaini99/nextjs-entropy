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

// ---------- pick the gap ----------
const pagesIdx = sitePagesIndex();
const candidates = store.clusters
  .filter((c) =>
    forcedCluster
      ? c.id === forcedCluster
      : ["new", "gap"].includes(c.status) && c.days.length >= 3 && !c.citedUs
  )
  .filter((c) => !pagesIdx.some((p) => overlap(c.tokens, p) >= 0.6))
  .sort((a, b) => b.days.length - a.days.length || b.count - a.count);

if (!candidates.length) {
  console.log("No validated gaps ready (need >=3 distinct days, uncited, uncovered). Skipping.");
  process.exit(0);
}
const gap = candidates[0];
console.log(`Selected gap ${gap.id}: "${gap.head}" (${gap.days.length} days, ${gap.count} hits)`);

// ---------- grounding corpus ----------
const caseStudies = fs.readFileSync(path.join("src", "data", "caseStudies.js"), "utf8");
const martechData = fs.readFileSync(path.join("src", "data", "martechPages.js"), "utf8");
const industriesData = fs.readFileSync(path.join("src", "data", "industries.js"), "utf8");

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
1. Every factual claim (client, metric, price, timeline, capability) MUST come from the provided source data. NEVER invent clients, numbers or capabilities.
2. Include at least 3 specific proprietary facts from the data (named projects with their metrics, real pricing bands, real timelines).
3. Structure: open with a 40-80 word direct answer to the head query (no heading above it). Then H2 sections answering the sub-queries. End with an FAQ section (### questions) covering long-tail variants, then a short CTA paragraph linking to /contact-us.
4. Include exactly one markdown table that helps the reader decide something (costs, comparison, checklist).
5. Voice: experienced practitioner, first-person plural ("we've shipped", "when we built"). Concrete over generic. No fluff, no "in today's digital landscape".
6. Use 2-4 internal links with keyword-rich anchor text from the provided list. No external links.
7. 900-1400 words. Output ONLY the article markdown (no frontmatter, no title heading - the title is rendered separately).`;

const user = `Head query (the article must directly answer this): "${gap.head}"
Query variants observed from real AI-engine searches (use as H2/FAQ material): ${gap.variants.join(" | ")}

SOURCE DATA (the only permitted facts):
--- PRICING ---
${PRICING}
--- CASE STUDIES (JS) ---
${caseStudies.slice(0, 24000)}
--- MARTECH PRODUCTS (JS) ---
${martechData.slice(0, 16000)}
--- INDUSTRIES (JS) ---
${industriesData.slice(0, 10000)}
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

// ---------- grounding gate: >=3 proprietary facts present ----------
const factMarkers = [
  "Steve Madden", "Utsav", "StarStruck", "Bioderma", "Zyflus", "AtoEmail",
  "TradeToIndia", "SolarProposal", "Gurukul", "BusOkay", "Canchello", "KROOZ",
  "Ponttual", "ComplyAny", "Cowfit", "HealthSpace", "EaseCare", "iPatientCare",
  "₹5", "₹15", "₹40", "3.8x", "292%", "$100M", "$25M", "300,000", "200,000",
  "11 languages", "29+", "55+", "6–12 weeks", "6-12 weeks",
];
const factsFound = [...new Set(factMarkers.filter((f) => body.includes(f)))];
if (factsFound.length < 3) {
  console.error(`Only ${factsFound.length} proprietary facts found; marking needs-human.`);
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
