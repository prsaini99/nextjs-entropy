#!/usr/bin/env node
/**
 * GEO harvest v2 — daily fan-out query harvesting across OpenAI + Gemini.
 *
 * Panel design: a stable core (buyer-prompts.json) sampled in rotating thirds
 * per day (recurrence signal), plus fresh LLM-generated exploration prompts
 * (discovery). Results append to a cumulative cluster store used by the gap
 * detector (geo-generate.mjs).
 *
 * Env: CHATGPT_API_KEY (or OPENAI_API_KEY), GEMINI_SEO_KEY (or GEMINI_API_KEY)
 * Usage: node scripts/geo-audit.mjs [--mode daily|full] [--explore N] [--limit N]
 *
 * Outputs:
 *   docs/ai-seo/reports/raw-YYYY-MM-DD.json  (this run's raw data)
 *   docs/ai-seo/data/queries.json            (cumulative clusters)
 */

import fs from "node:fs";
import path from "node:path";

const OPENAI_KEY = process.env.CHATGPT_API_KEY || process.env.OPENAI_API_KEY;
const GEMINI_KEY = process.env.GEMINI_SEO_KEY || process.env.GEMINI_API_KEY;
const OUR_DOMAIN = "stackbinary.io";

const args = process.argv.slice(2);
const flag = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : dflt;
};
const mode = flag("mode", "daily");
const exploreCount = Number(flag("explore", "10"));
const limit = Number(flag("limit", "Infinity")) || Infinity;

const DATA_DIR = path.join("docs", "ai-seo", "data");
const REPORTS_DIR = path.join("docs", "ai-seo", "reports");
fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(REPORTS_DIR, { recursive: true });

const today = new Date().toISOString().slice(0, 10);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const domainOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
};

// ---------- prompt panel ----------
const promptsFile = JSON.parse(
  fs.readFileSync(path.join("docs", "ai-seo", "buyer-prompts.json"), "utf8")
);
const stable = promptsFile.prompts;

// rotating third of the stable panel by day-of-year (full set every 3 days)
const dayOfYear = Math.floor(
  (Date.now() - Date.parse(new Date().getFullYear() + "-01-01")) / 86400000
);
const todaysStable =
  mode === "full" ? stable : stable.filter((_, i) => i % 3 === dayOfYear % 3);

async function generateExplorationPrompts(n) {
  if (!OPENAI_KEY || n <= 0) return [];
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 1.1,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: `Generate ${n} realistic prompts that potential BUYERS of a software/martech agency would type into ChatGPT or Gemini. Vary buyer persona (founder, CMO, ops head), industry (healthcare, D2C, media, fintech, education, agri), geography (India, Mumbai, global) and situation (tool sprawl, scaling, cost, hiring). They must sound like real people asking for help choosing/finding an agency or tool — NOT keyword strings. Return JSON: {"prompts": ["...", ...]}`,
        },
      ],
    }),
  });
  if (!res.ok) return [];
  try {
    const data = await res.json();
    const parsed = JSON.parse(data.choices[0].message.content);
    return (parsed.prompts || []).map((p, i) => ({
      id: `exp-${today}-${i + 1}`,
      group: "exploration",
      prompt: p,
    }));
  } catch {
    return [];
  }
}

// ---------- engines ----------
async function askOpenAI(prompt) {
  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.GEO_OPENAI_MODEL || "gpt-4o",
      input: prompt,
      tools: [{ type: "web_search_preview" }],
    }),
  });
  if (!res.ok) throw new Error(`openai ${res.status}: ${(await res.text()).slice(0, 150)}`);
  const data = await res.json();
  const queries = [];
  const citations = [];
  for (const item of data.output || []) {
    if (item.type === "web_search_call" && item.action?.query) queries.push(item.action.query);
    if (item.type === "message")
      for (const part of item.content || [])
        for (const ann of part.annotations || [])
          if (ann.type === "url_citation" && ann.url) citations.push(ann.url);
  }
  return { queries, citations };
}

async function askGemini(prompt) {
  const model = process.env.GEO_GEMINI_MODEL || "gemini-flash-latest";
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        tools: [{ google_search: {} }],
      }),
    }
  );
  if (!res.ok) throw new Error(`gemini ${res.status}: ${(await res.text()).slice(0, 150)}`);
  const data = await res.json();
  const meta = data.candidates?.[0]?.groundingMetadata || {};
  const queries = meta.webSearchQueries || [];
  const citations = (meta.groundingChunks || [])
    .map((c) => c.web?.uri)
    .filter(Boolean);
  // grounding redirect URLs hide the domain; resolve via title when present
  const titles = (meta.groundingChunks || []).map((c) => c.web?.title).filter(Boolean);
  return { queries, citations, sourceTitles: titles };
}

const engines = [];
if (OPENAI_KEY) engines.push({ name: "openai", ask: askOpenAI });
if (GEMINI_KEY) engines.push({ name: "gemini", ask: askGemini });
if (!engines.length) {
  console.error("No keys found (CHATGPT_API_KEY / GEMINI_SEO_KEY).");
  process.exit(1);
}

// ---------- clustering ----------
const STOP = new Set("a an the in for of to and or best top with my me is are on at near".split(" "));
const tokens = (q) =>
  q.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter((t) => t && !STOP.has(t));
const jaccard = (a, b) => {
  const A = new Set(a), B = new Set(b);
  const inter = [...A].filter((x) => B.has(x)).length;
  return inter / (A.size + B.size - inter || 1);
};

function loadClusters() {
  const file = path.join(DATA_DIR, "queries.json");
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : { clusters: [] };
}

function addToClusters(store, query, meta) {
  const qt = tokens(query);
  let best = null, bestScore = 0;
  for (const c of store.clusters) {
    const s = jaccard(qt, c.tokens);
    if (s > bestScore) { bestScore = s; best = c; }
  }
  if (best && bestScore >= 0.55) {
    if (!best.variants.includes(query)) best.variants.push(query);
    best.count++;
    if (!best.days.includes(today)) best.days.push(today);
    best.engines = [...new Set([...best.engines, meta.engine])];
    best.citedUs = best.citedUs || meta.citedUs;
    best.lastSeen = today;
  } else {
    store.clusters.push({
      id: `c${store.clusters.length + 1}`,
      head: query,
      tokens: qt,
      variants: [query],
      count: 1,
      days: [today],
      engines: [meta.engine],
      citedUs: meta.citedUs,
      firstSeen: today,
      lastSeen: today,
      status: "new", // new | gap | covered | article-open | article-published | rejected | needs-human
    });
  }
}

// ---------- run ----------
const exploration = await generateExplorationPrompts(exploreCount);
const panel = [...todaysStable, ...exploration].slice(0, limit);
console.log(
  `Panel: ${todaysStable.length} stable + ${exploration.length} exploration across ${engines.map((e) => e.name).join("+")}`
);

const results = [];
for (const p of panel) {
  for (const engine of engines) {
    process.stdout.write(`[${engine.name}] ${p.id} … `);
    try {
      const out = await engine.ask(p.prompt);
      const domains = [...new Set(out.citations.map(domainOf).filter(Boolean))];
      const citedUs =
        domains.includes(OUR_DOMAIN) ||
        (out.sourceTitles || []).some((t) => t.includes(OUR_DOMAIN));
      results.push({ ...p, engine: engine.name, queries: out.queries, domains, citedUs });
      console.log(`${out.queries.length}q ${domains.length}d${citedUs ? " ✓CITED" : ""}`);
    } catch (e) {
      results.push({ ...p, engine: engine.name, error: e.message });
      console.log(`ERR ${e.message.slice(0, 80)}`);
    }
    await sleep(1200);
  }
}

// update cluster store
const store = loadClusters();
for (const r of results.filter((r) => !r.error))
  for (const q of r.queries)
    addToClusters(store, q, { engine: r.engine, citedUs: r.citedUs });
store.updated = today;
fs.writeFileSync(path.join(DATA_DIR, "queries.json"), JSON.stringify(store, null, 2));

// raw log (merge if the day already has one)
const rawFile = path.join(REPORTS_DIR, `raw-${today}.json`);
const prev = fs.existsSync(rawFile) ? JSON.parse(fs.readFileSync(rawFile, "utf8")) : [];
fs.writeFileSync(rawFile, JSON.stringify([...prev, ...results], null, 2));

const ok = results.filter((r) => !r.error);
const cited = ok.filter((r) => r.citedUs).length;
console.log(
  `\nDone: ${ok.length} runs, cited in ${cited} (${ok.length ? Math.round((cited / ok.length) * 100) : 0}%). Clusters: ${store.clusters.length}`
);
