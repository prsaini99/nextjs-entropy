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
6. Output: first line "TITLE: <title>", then blank line, then the post markdown.`,
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
const body = raw.replace(/^TITLE:.*$/m, "").trim();

const hits = BRAND_BLOCKLIST.filter((b) => body.toLowerCase().includes(b));
if (hits.length) {
  console.error(`Draft mentions blocked brand(s): ${hits.join(", ")} — not queued.`);
  process.exit(1);
}

const outDir = path.join("docs", "ai-seo", "medium-queue");
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, `${slug}.medium.md`);

const header = `<!--
MEDIUM DRAFT — publish checklist:
1. If repurposing: medium.com/p/import with https://stackbinary.io/insights/${slug}
   (sets rel=canonical automatically). Otherwise paste this draft.
2. Tags (max 5): pick from Marketing, Martech, AI, Software Development, Startup, India.
3. Publish under the StackBinary publication. Every 4th post: submit to a guest publication.
Original: https://stackbinary.io/insights/${slug}
-->

# ${titleM ? titleM[1].trim() : slug}

`;

fs.writeFileSync(outFile, header + body + "\n");
console.log(`MEDIUM_DRAFT=${outFile}`);
