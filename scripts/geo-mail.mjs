#!/usr/bin/env node
/**
 * GEO weekly mailer — emails the latest weekly report to the team, with the
 * markdown report and a clusters CSV attached.
 *
 * Env: EMAIL, EMAIL_PASSWORD (Gmail app password)
 * Optional: GEO_REPORT_TO (default prateek@stackbinary.io)
 */

import fs from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";
import { marked } from "marked";

const TO = process.env.GEO_REPORT_TO || "prateek@stackbinary.io";
const { EMAIL, EMAIL_PASSWORD } = process.env;
if (!EMAIL || !EMAIL_PASSWORD) {
  console.error("EMAIL / EMAIL_PASSWORD missing");
  process.exit(1);
}

const REPORTS_DIR = path.join("docs", "ai-seo", "reports");
const DATA_DIR = path.join("docs", "ai-seo", "data");

// latest weekly report
const weekly = fs
  .readdirSync(REPORTS_DIR)
  .filter((f) => f.startsWith("weekly-") && f.endsWith(".md"))
  .sort()
  .pop();
if (!weekly) {
  console.error("No weekly report found — run geo-weekly.mjs first.");
  process.exit(1);
}
const reportMd = fs.readFileSync(path.join(REPORTS_DIR, weekly), "utf8");
const date = weekly.slice(7, 17);

// share-of-voice headline for the subject
const sovLines = [...reportMd.matchAll(/\*\*(openai|gemini)\*\*: (\d+)\/(\d+) \((\d+)%\)/g)];
const sovSummary = sovLines.length
  ? sovLines.map((m) => `${m[1]} ${m[4]}%`).join(" · ")
  : "no runs";

// clusters CSV attachment
let csv = "id,head_query,status,hits,days_seen,engines,cited_us,first_seen,last_seen\n";
if (fs.existsSync(path.join(DATA_DIR, "queries.json"))) {
  const store = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "queries.json"), "utf8"));
  for (const c of store.clusters) {
    const esc = (s) => `"${String(s).replace(/"/g, '""')}"`;
    csv += [
      c.id, esc(c.head), c.status, c.count, c.days.length,
      esc(c.engines.join("+")), c.citedUs ? "yes" : "no", c.firstSeen, c.lastSeen,
    ].join(",") + "\n";
  }
}

// branded HTML wrapper around the rendered report
const ACCENT = "#ed5145";
const html = `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0a0a0a;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:28px 14px;">
<tr><td align="center">
<table role="presentation" width="680" cellpadding="0" cellspacing="0" style="max-width:680px;width:100%;font-family:Arial,Helvetica,sans-serif;">
  <tr><td align="center" style="padding-bottom:22px;">
    <img src="https://stackbinary.io/stack-logo.png" width="150" alt="StackBinary" style="display:block;border:0;" />
  </td></tr>
  <tr><td style="background:#141414;border:1px solid #2a2a2a;border-radius:12px;padding:28px 30px;">
    <div style="display:inline-block;border:1px solid ${ACCENT};border-radius:999px;padding:5px 13px;font-size:11px;letter-spacing:1.5px;color:${ACCENT};font-weight:bold;text-transform:uppercase;">GEO Weekly Report · ${date}</div>
    <div style="color:#ededed;font-size:14px;line-height:1.7;padding-top:14px;" class="report">
      ${marked.parse(reportMd)
        .replace(/<h1/g, '<h1 style="color:#fff;font-size:22px;margin:18px 0 8px;"')
        .replace(/<h2/g, '<h2 style="color:#fff;font-size:17px;margin:22px 0 6px;border-left:3px solid ' + ACCENT + ';padding-left:10px;"')
        .replace(/<ul>/g, '<ul style="margin:6px 0 12px 20px;padding:0;">')
        .replace(/<li>/g, '<li style="margin-bottom:4px;color:#c9c9c9;">')
        .replace(/<p>/g, '<p style="margin:6px 0 10px;color:#c9c9c9;">')
        .replace(/<strong>/g, '<strong style="color:#fff;">')
        .replace(/<em>/g, '<em style="color:#9a9a9a;">')}
    </div>
  </td></tr>
  <tr><td align="center" style="padding:18px 0 6px;color:#9a9a9a;font-size:11px;">
    Full data attached (report .md + clusters .csv) · Generated automatically by the StackBinary GEO pipeline
  </td></tr>
</table>
</td></tr></table>
</body></html>`;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: EMAIL, pass: EMAIL_PASSWORD },
});

await transporter.sendMail({
  from: `"StackBinary GEO Pipeline" <${EMAIL}>`,
  to: TO,
  subject: `GEO Weekly — ${sovSummary} — ${date}`,
  text: reportMd,
  html,
  attachments: [
    { filename: weekly, content: reportMd, contentType: "text/markdown" },
    { filename: `query-clusters-${date}.csv`, content: csv, contentType: "text/csv" },
  ],
});

console.log(`Report emailed to ${TO} (${weekly}, ${csv.split("\n").length - 2} clusters attached)`);
