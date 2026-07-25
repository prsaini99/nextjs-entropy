#!/usr/bin/env node
/**
 * GEO weekly report — aggregates the week's harvest into insights + a work
 * summary, writes docs/ai-seo/reports/weekly-YYYY-MM-DD.md, and (in CI)
 * the Action opens a GitHub issue with it so it lands in your notifications.
 *
 * Env: CHATGPT_API_KEY (optional — used for the narrative summary)
 */

import fs from "node:fs";
import path from "node:path";

const REPORTS_DIR = path.join("docs", "ai-seo", "reports");
const DATA_DIR = path.join("docs", "ai-seo", "data");
const OUR_DOMAIN = "stackbinary.io";
const OPENAI_KEY = process.env.CHATGPT_API_KEY || process.env.OPENAI_API_KEY;

const today = new Date();
const weekAgo = new Date(Date.now() - 7 * 86400000);
const dateStr = today.toISOString().slice(0, 10);

// gather the week's raw files
const rawFiles = fs
  .readdirSync(REPORTS_DIR)
  .filter((f) => f.startsWith("raw-") && f.endsWith(".json"))
  .filter((f) => {
    const d = new Date(f.slice(4, 14));
    return d >= weekAgo && d <= today;
  });

const runs = rawFiles.flatMap((f) =>
  JSON.parse(fs.readFileSync(path.join(REPORTS_DIR, f), "utf8"))
);
const ok = runs.filter((r) => !r.error);

// share of voice per engine
const sov = {};
for (const r of ok) {
  sov[r.engine] ??= { total: 0, cited: 0 };
  sov[r.engine].total++;
  if (r.citedUs) sov[r.engine].cited++;
}

// competitor domains
const domains = {};
for (const r of ok) for (const d of r.domains || []) domains[d] = (domains[d] || 0) + 1;

// clusters
const store = fs.existsSync(path.join(DATA_DIR, "queries.json"))
  ? JSON.parse(fs.readFileSync(path.join(DATA_DIR, "queries.json"), "utf8"))
  : { clusters: [] };
const newThisWeek = store.clusters.filter((c) => new Date(c.firstSeen) >= weekAgo);
const validatedGaps = store.clusters.filter(
  (c) => ["new", "gap"].includes(c.status) && c.days.length >= 3 && !c.citedUs
);
const needsHuman = store.clusters.filter((c) => c.status === "needs-human");
const articlesOpen = store.clusters.filter((c) => c.status === "article-open");

let md = `# GEO weekly report — ${dateStr}\n\n`;
md += `_Window: ${weekAgo.toISOString().slice(0, 10)} → ${dateStr} · ${ok.length} engine runs across ${rawFiles.length} harvest days_\n\n`;

md += `## Share of voice (were we cited?)\n\n`;
for (const [eng, s] of Object.entries(sov))
  md += `- **${eng}**: ${s.cited}/${s.total} (${Math.round((s.cited / s.total) * 100)}%)\n`;
if (!Object.keys(sov).length) md += `- no runs this week\n`;

md += `\n## Validated gaps ready for articles (${validatedGaps.length})\n\n`;
for (const c of validatedGaps.slice(0, 10))
  md += `- "${c.head}" — seen ${c.days.length} days, ${c.count} hits, engines: ${c.engines.join("+")}\n`;

md += `\n## New query clusters discovered this week (${newThisWeek.length})\n\n`;
for (const c of newThisWeek.slice(0, 15)) md += `- "${c.head}" (${c.count} hits)\n`;

md += `\n## Articles in flight\n\n`;
for (const c of articlesOpen) md += `- PR open: /insights/${c.articleSlug} (cluster: "${c.head}")\n`;
if (!articlesOpen.length) md += `- none\n`;

md += `\n## Needs your input (couldn't ground in our data)\n\n`;
for (const c of needsHuman) md += `- "${c.head}" — add proof/facts to the data files, or reject\n`;
if (!needsHuman.length) md += `- none\n`;

md += `\n## Top cited domains (competitor watch)\n\n`;
for (const [d, n] of Object.entries(domains).sort((a, b) => b[1] - a[1]).slice(0, 15))
  md += `- (${n}×) ${d}${d === OUR_DOMAIN ? " ← us" : ""}\n`;

// LLM narrative: insights gained + recommendations (never auto-applied)
if (OPENAI_KEY && ok.length) {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${OPENAI_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.4,
        messages: [
          {
            role: "user",
            content: `You are an SEO analyst. Based on this weekly GEO data, write (1) "What we learned this week" — 3-5 bullet insights in plain language, (2) "Recommended changes to main pages" — only if strongly supported by the data, else say "none this week". Keep under 250 words. Data:\n${md.slice(0, 9000)}`,
          },
        ],
      }),
    });
    if (res.ok) {
      const data = await res.json();
      md += `\n## Analyst summary\n\n${data.choices[0].message.content}\n`;
    }
  } catch {
    // narrative is best-effort
  }
}

md += `\n---\n_Main-page content is never changed automatically — only via the recommendations above, applied by a human._\n`;

const out = path.join(REPORTS_DIR, `weekly-${dateStr}.md`);
fs.writeFileSync(out, md);
console.log(`REPORT_FILE=${out}`);
