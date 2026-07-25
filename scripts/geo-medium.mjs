#!/usr/bin/env node
/**
 * Medium variant generator — converts a published /insights article into a
 * Medium-ready draft in docs/ai-seo/medium-queue/.
 *
 * The variant gets a different title/angle (so it never competes with the
 * original for the same query), a personal Medium-style opening, and a
 * UTM-tagged CTA. The header reminds the publisher to use Medium's import
 * tool so rel=canonical points at stackbinary.io.
 *
 * Env: CHATGPT_API_KEY
 * Usage: node scripts/geo-medium.mjs <insight-slug>
 */

import fs from "node:fs";
import path from "node:path";

const OPENAI_KEY = process.env.CHATGPT_API_KEY || process.env.OPENAI_API_KEY;
const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node scripts/geo-medium.mjs <insight-slug>");
  process.exit(1);
}
if (!OPENAI_KEY) {
  console.error("CHATGPT_API_KEY missing");
  process.exit(1);
}

const srcFile = path.join("src", "content", "insights", `${slug}.md`);
if (!fs.existsSync(srcFile)) {
  console.error(`No such insight: ${srcFile} (must be a published article)`);
  process.exit(1);
}
const source = fs.readFileSync(srcFile, "utf8");

// same client/partner brand blocklist as the article generator
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

const utm = `?utm_source=medium&utm_medium=article&utm_campaign=${slug}`;

const res = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: { Authorization: `Bearer ${OPENAI_KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "gpt-4o",
    temperature: 0.8,
    messages: [
      {
        role: "system",
        content: `Rewrite the given article as a Medium post for StackBinary's publication. Rules:
1. NEW title — a different angle from the original (personal, curiosity or opinion-led; Medium style, not SEO style). Never reuse the original title.
2. Open with 2-3 personal, first-person sentences (practitioner voice: "we build these systems", "a founder asked us last week") — Medium rewards human openings, not definitions.
3. Keep all facts EXACTLY as in the source — no new claims, no invented numbers, no client or company names other than StackBinary's own products.
4. Keep it 800-1200 words, subheadings, one table max.
5. End with exactly one italic CTA line linking to the most relevant stackbinary.io page from the source article, appending this query string to the URL: ${utm}
6. Output format — first FOUR lines exactly:
TITLE: <title>
TAGS: <5 Medium tags, comma-separated, chosen from: Marketing, Martech, SaaS, AI, Software Development, Startup, India, CRM, Ecommerce, Advertising, Data Science, Programming, Business, Technology, Entrepreneurship>
COVER: <2-4 word photo search phrase that visually matches the article's metaphor>
CHARTS: <JSON array of 1-2 Chart.js configs charting ONLY numbers that literally appear in the article (type bar or doughnut; include a plugins.title.text citing what the numbers are; use colors #ed5145 and #2a2a2a; if a chart is illustrative say "illustrative" in its title) — or [] if the article has no chartable numbers>
Then a blank line, then the post markdown.`,
      },
      { role: "user", content: source },
    ],
  }),
});
if (!res.ok) {
  console.error(`openai ${res.status}: ${(await res.text()).slice(0, 200)}`);
  process.exit(1);
}
const raw = (await res.json()).choices[0].message.content;
const titleM = raw.match(/^TITLE:\s*(.+)$/m);
const tagsM = raw.match(/^TAGS:\s*(.+)$/m);
const coverM = raw.match(/^COVER:\s*(.+)$/m);
const chartsM = raw.match(/^CHARTS:\s*(.+)$/m);
const body = raw.replace(/^(TITLE|TAGS|COVER|CHARTS):.*$/gm, "").trim();

// build + verify QuickChart URLs for the model's chart configs
const chartUrls = [];
if (chartsM) {
  try {
    const configs = JSON.parse(chartsM[1]);
    for (const cfg of configs.slice(0, 2)) {
      const url =
        "https://quickchart.io/chart?w=800&h=450&bkg=%230a0a0a&c=" +
        encodeURIComponent(JSON.stringify(cfg));
      const check = await fetch(url, { method: "HEAD" });
      if (check.ok) chartUrls.push({ title: cfg?.options?.plugins?.title?.text || "chart", url });
    }
  } catch {
    // charts are best-effort; the draft ships without them
  }
}

const hits = BRAND_BLOCKLIST.filter((b) => body.toLowerCase().includes(b));
if (hits.length) {
  console.error(`Draft mentions blocked brand(s): ${hits.join(", ")} — not queued.`);
  process.exit(1);
}

const outDir = path.join("docs", "ai-seo", "medium-queue");
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, `${slug}.medium.md`);

const chartLines = chartUrls.length
  ? chartUrls.map((c, i) => `${i + 2}. CHART "${c.title}" (download PNG, place near the numbers it charts):\n   ${c.url}`).join("\n")
  : "(no chartable numbers in this article)";

const header = `<!--
MEDIUM DRAFT — publish checklist:

TAGS (5): ${tagsM ? tagsM[1].trim() : "Marketing, Martech, AI, Software Development, Startup"}

IMAGES (download, then upload into the story):
1. COVER — pick + download a free photo matching the theme:
   https://unsplash.com/s/photos/${encodeURIComponent((coverM ? coverM[1].trim() : "software office").replace(/\s+/g, "-"))}
${chartLines}

1. If repurposing: medium.com/p/import with https://stackbinary.io/insights/${slug}
   (sets rel=canonical automatically). Otherwise paste this draft.
2. Add the tags + images above.
3. Publish under the StackBinary publication. Every 4th post: submit to a guest publication.
Original: https://stackbinary.io/insights/${slug}
-->

# ${titleM ? titleM[1].trim() : slug}

`;

fs.writeFileSync(outFile, header + body + "\n");
console.log(`MEDIUM_DRAFT=${outFile}`);
