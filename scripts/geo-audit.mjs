#!/usr/bin/env node
/**
 * GEO audit: run tracked buyer prompts through AI engines with web search,
 * harvest the fan-out queries they actually search, log which domains get
 * cited, and compute StackBinary's share of voice.
 *
 * Usage:
 *   OPENAI_API_KEY=... ANTHROPIC_API_KEY=... node scripts/geo-audit.mjs [--limit N] [--provider openai|anthropic|both]
 *
 * Providers with a missing key are skipped. Output:
 *   docs/ai-seo/reports/report-YYYY-MM-DD.md   (human summary)
 *   docs/ai-seo/reports/raw-YYYY-MM-DD.json    (full data)
 */

import fs from "node:fs";
import path from "node:path";

const OUR_DOMAIN = "stackbinary.io";
const args = process.argv.slice(2);
const limit = Number(args[args.indexOf("--limit") + 1]) || Infinity;
const providerArg = args.includes("--provider")
  ? args[args.indexOf("--provider") + 1]
  : "both";

const promptsFile = JSON.parse(
  fs.readFileSync(path.join("docs", "ai-seo", "buyer-prompts.json"), "utf8")
);
const prompts = promptsFile.prompts.slice(0, limit);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const domainOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
};

async function askOpenAI(prompt) {
  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.GEO_OPENAI_MODEL || "gpt-4o",
      input: prompt,
      tools: [{ type: "web_search_preview" }],
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();

  const queries = [];
  const citations = [];
  for (const item of data.output || []) {
    if (item.type === "web_search_call" && item.action?.query) {
      queries.push(item.action.query);
    }
    if (item.type === "message") {
      for (const part of item.content || []) {
        for (const ann of part.annotations || []) {
          if (ann.type === "url_citation" && ann.url) citations.push(ann.url);
        }
      }
    }
  }
  return { queries, citations };
}

async function askAnthropic(prompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.GEO_ANTHROPIC_MODEL || "claude-sonnet-5",
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
      tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 5 }],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();

  const queries = [];
  const citations = [];
  for (const block of data.content || []) {
    if (block.type === "server_tool_use" && block.input?.query) {
      queries.push(block.input.query);
    }
    if (block.type === "web_search_tool_result") {
      for (const r of block.content || []) {
        if (r.url) citations.push(r.url);
      }
    }
    for (const cit of block.citations || []) {
      if (cit.url) citations.push(cit.url);
    }
  }
  return { queries, citations };
}

const providers = [];
if (["both", "openai"].includes(providerArg) && process.env.OPENAI_API_KEY)
  providers.push({ name: "openai", ask: askOpenAI });
if (["both", "anthropic"].includes(providerArg) && process.env.ANTHROPIC_API_KEY)
  providers.push({ name: "anthropic", ask: askAnthropic });

if (!providers.length) {
  console.error(
    "No provider keys found. Set OPENAI_API_KEY and/or ANTHROPIC_API_KEY."
  );
  process.exit(1);
}

const results = [];
for (const p of prompts) {
  for (const provider of providers) {
    process.stdout.write(`[${provider.name}] ${p.id} … `);
    try {
      const { queries, citations } = await provider.ask(p.prompt);
      const domains = [...new Set(citations.map(domainOf).filter(Boolean))];
      const cited = domains.includes(OUR_DOMAIN);
      results.push({ ...p, provider: provider.name, queries, domains, cited });
      console.log(
        `${queries.length} fan-out queries, ${domains.length} domains${cited ? " ✓ CITED" : ""}`
      );
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
      results.push({ ...p, provider: provider.name, error: e.message });
    }
    await sleep(1500);
  }
}

// ---- Report ----
const date = new Date().toISOString().slice(0, 10);
const dir = path.join("docs", "ai-seo", "reports");
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, `raw-${date}.json`), JSON.stringify(results, null, 2));

const ok = results.filter((r) => !r.error);
const byProvider = {};
for (const r of ok) {
  byProvider[r.provider] ??= { total: 0, cited: 0 };
  byProvider[r.provider].total++;
  if (r.cited) byProvider[r.provider].cited++;
}

const queryCounts = {};
for (const r of ok) for (const q of r.queries) queryCounts[q] = (queryCounts[q] || 0) + 1;

const domainCounts = {};
for (const r of ok)
  for (const d of r.domains) domainCounts[d] = (domainCounts[d] || 0) + 1;

let md = `# GEO audit — ${date}\n\n## Share of voice\n\n`;
for (const [prov, s] of Object.entries(byProvider)) {
  md += `- **${prov}**: cited in ${s.cited}/${s.total} prompts (${Math.round((s.cited / s.total) * 100)}%)\n`;
}
md += `\n## Fan-out queries harvested (${Object.keys(queryCounts).length})\n\nAdd recurring ones to query-page-map.md.\n\n`;
for (const [q, n] of Object.entries(queryCounts).sort((a, b) => b[1] - a[1]))
  md += `- (${n}×) ${q}\n`;
md += `\n## Domains cited (competitor watch)\n\n`;
for (const [d, n] of Object.entries(domainCounts).sort((a, b) => b[1] - a[1]).slice(0, 30))
  md += `- (${n}×) ${d}${d === OUR_DOMAIN ? "  ← us" : ""}\n`;
md += `\n## Prompts where we were NOT cited\n\n`;
for (const r of ok.filter((r) => !r.cited))
  md += `- [${r.provider}] ${r.id}: ${r.prompt.slice(0, 90)}…\n`;

fs.writeFileSync(path.join(dir, `report-${date}.md`), md);
console.log(`\nReport written to docs/ai-seo/reports/report-${date}.md`);
