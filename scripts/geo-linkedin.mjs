#!/usr/bin/env node
/**
 * LinkedIn draft generator — produces post drafts into docs/ai-seo/linkedin-queue/.
 *
 * Sources (one per generated post):
 *   --insight <slug>       repurpose a published /insights article
 *   --topic "<text>"       opinion / build-in-public post on a topic
 *   --from-harvest         build-in-public post from this week's GEO findings
 *   --batch                Monday batch: up to 3 posts (new insights + harvest + topic rotation)
 *
 * Drafts have STATUS: draft. The posting script only publishes STATUS: approved
 * (approval happens by merging the drafts PR, or editing the file).
 *
 * Env: CHATGPT_API_KEY
 */

import fs from "node:fs";
import path from "node:path";

const OPENAI_KEY = process.env.CHATGPT_API_KEY || process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.error("CHATGPT_API_KEY missing");
  process.exit(1);
}

const QUEUE = path.join("docs", "ai-seo", "linkedin-queue");
fs.mkdirSync(QUEUE, { recursive: true });
const today = new Date().toISOString().slice(0, 10);

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

const OWN_FACTS = `StackBinary facts you may use (nothing else):
- Full-service tech agency (Mumbai): custom software, AI/ML, cloud, web/mobile, e-commerce AND martech — all service lines equal.
- Own products: Zyflus (influencer platform), AtoEmail (marketing automation, no per-contact pricing), B2B Lead CRM (WhatsApp+call+email capture, AI scoring, used daily by our own BD team), AI Call Center (11 languages), Meta Marketing Tool (multi-account ad-ops with AI), TRIBE v2 creative lab (five-lens video ad analysis), TradeToIndia (B2B enrichment), 29+ Shopify stores delivered.
- Pricing honesty: focused first release ₹5–15 Lakh in 6–12 weeks; larger platforms ₹15–40 Lakh+.
- We run a GEO pipeline that daily asks ChatGPT & Gemini buyer questions and logs which agencies/tools they recommend (fan-out queries, citations, share of voice).
- Public research citable with attribution: avg enterprise marketing stack 91 tools (Gartner), ~49% of licensed martech features used, ~1 in 4 new martech capabilities now built not bought.`;

async function generate(kind, source) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${OPENAI_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o",
      temperature: 0.85,
      messages: [
        {
          role: "system",
          content: `Write ONE LinkedIn post for Prateek, founder of StackBinary (Mumbai tech agency). Rules:
1. First line is the hook — must work standalone in ~200 chars, no "I'm excited to share".
2. Short lines. White space between thoughts. Personal founder voice, first person. Minimal emoji (0-2 max).
3. 900-1300 characters total. ONE idea only.
4. Facts ONLY from the provided material — never invent numbers, never name any client or company other than StackBinary's own products. Competitor SaaS may be named neutrally.
5. End with 3-5 hashtags mixing broad + niche.
6. If the post cites a stackbinary.io page, append ?utm_source=linkedin&utm_medium=post&utm_campaign=${today} to the URL.
7. If the post contains 2+ chartable numbers, also output a Chart.js config (bar or doughnut, colors #ed5145/#2a2a2a, title citing the numbers) — else CHART: none.
Output format:
HOOK_CHECK: <the first line, verbatim>
CHART: <one-line JSON config or "none">
---
<the post text>`,
        },
        { role: "user", content: `${OWN_FACTS}\n\nPost type: ${kind}\nSource material:\n${source}` },
      ],
    }),
  });
  if (!res.ok) throw new Error(`openai ${res.status}`);
  const raw = (await res.json()).choices[0].message.content;
  const chartM = raw.match(/^CHART:\s*(.+)$/m);
  const text = raw.split(/^---$/m).pop().trim();
  let chartUrl = null;
  if (chartM && chartM[1].trim() !== "none") {
    try {
      const cfg = JSON.parse(chartM[1]);
      const url = "https://quickchart.io/chart?w=800&h=450&bkg=%230a0a0a&c=" + encodeURIComponent(JSON.stringify(cfg));
      const check = await fetch(url, { method: "HEAD" });
      if (check.ok) chartUrl = url;
    } catch { /* best-effort */ }
  }
  return { text, chartUrl };
}

function save(kind, { text, chartUrl }) {
  const hits = BRAND_BLOCKLIST.filter((b) => text.toLowerCase().includes(b));
  if (hits.length) {
    console.error(`Draft (${kind}) mentions blocked brand(s): ${hits.join(", ")} — skipped.`);
    return null;
  }
  const n = fs.readdirSync(QUEUE).filter((f) => f.startsWith(today)).length + 1;
  const file = path.join(QUEUE, `${today}-${kind}-${n}.post.md`);
  fs.writeFileSync(
    file,
    `STATUS: draft\nKIND: ${kind}\nIMAGE: ${chartUrl || "none"}\nCREATED: ${today}\n---\n${text}\n`
  );
  console.log(`DRAFT=${file}`);
  return file;
}

const args = process.argv.slice(2);
const get = (f) => (args.includes(f) ? args[args.indexOf(f) + 1] : null);

const jobs = [];
if (get("--insight")) {
  const slug = get("--insight");
  const f = path.join("src", "content", "insights", `${slug}.md`);
  if (!fs.existsSync(f)) { console.error(`no insight ${slug}`); process.exit(1); }
  jobs.push(["repurpose", fs.readFileSync(f, "utf8").slice(0, 8000)]);
}
if (get("--topic")) jobs.push(["opinion", get("--topic")]);
if (args.includes("--from-harvest") || args.includes("--batch")) {
  const qf = path.join("docs", "ai-seo", "data", "queries.json");
  if (fs.existsSync(qf)) {
    const store = JSON.parse(fs.readFileSync(qf, "utf8"));
    const top = store.clusters.sort((a, b) => b.count - a.count).slice(0, 12)
      .map((c) => `"${c.head}" (${c.count} hits, cited us: ${c.citedUs ? "yes" : "no"})`).join("\n");
    jobs.push(["build-in-public", `This week our GEO pipeline asked ChatGPT & Gemini real buyer questions. Top queries they searched:\n${top}\nAngle: what buyers actually ask AI when looking for agencies/tools, and what that means.`]);
  }
}
if (args.includes("--batch")) {
  const insightsDir = path.join("src", "content", "insights");
  const latest = fs.existsSync(insightsDir)
    ? fs.readdirSync(insightsDir).filter((f) => f.endsWith(".md")).sort().pop()
    : null;
  if (latest) jobs.push(["repurpose", fs.readFileSync(path.join(insightsDir, latest), "utf8").slice(0, 8000)]);
  const topics = [
    "Why per-contact pricing in marketing SaaS punishes growth — and what owning your automation engine costs instead",
    "What building an 11-language AI call center taught us about voice AI in production",
    "The real math of a custom CRM for a WhatsApp-first sales team in India",
    "Build vs buy in 2026: AI-accelerated delivery changed the answer",
    "What we learned running every ad through five AI analysis lenses before spending on media",
    "Why we made our own BD team use the CRM we sell (dogfooding lessons)",
  ];
  jobs.push(["opinion", topics[new Date().getDate() % topics.length]]);
}

if (!jobs.length) {
  console.error("Nothing to generate. Use --insight <slug> | --topic \"...\" | --from-harvest | --batch");
  process.exit(1);
}

for (const [kind, source] of jobs.slice(0, 3)) {
  try {
    save(kind, await generate(kind, source));
  } catch (e) {
    console.error(`generate(${kind}) failed: ${e.message}`);
  }
}
