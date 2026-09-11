import { timingSafeEqual } from "node:crypto";
import { buildMailTransport, mailConfigured } from "@/lib/mailer";
import { calculateLeadScore } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { applyCareersVetting } from "@/lib/careers-vetting";
import { NOTIFY_EMAIL, MAIL_FROM } from "@/constants/contact";

/**
 * POST /api/leads/ingest
 *
 * Server-to-server lead intake for the product landing pages that live on
 * their own domains (ichneo.com, auspicely.com, prowlwise.com, adsboys.com,
 * oyehello.com). Each product
 * site validates its own form, then forwards the lead here from a route
 * handler with a per-product secret. The lead is stored in the same `leads`
 * table the admin dashboard reads, scored the same way, and announced to the
 * same inbox, so nothing downstream needs to know it came from another domain.
 *
 * Auth: `Authorization: Bearer <key>`. Keys live in LEAD_INGEST_KEYS as a
 * comma-separated list of `product:key` pairs, e.g.
 *   LEAD_INGEST_KEYS="ichneo:abc...,auspicely:def...,prowlwise:ghi..."
 * The product is derived from WHICH key matched, never from the payload, so
 * a key can only ever create leads tagged with its own product. Compare is
 * constant-time. There is deliberately no CORS header: a browser cannot call
 * this route, only a server holding a key can.
 *
 * Why not hand the product sites the Supabase service key: that key can read
 * and delete every table. This key can do exactly one thing, insert a lead
 * for one product, and can be revoked per product without touching the rest.
 */

const PRODUCTS = {
  ichneo: { label: "Ichneo", service: "Ichneo: Demo Request" },
  auspicely: { label: "Auspicely", service: "Auspicely: Demo Request" },
  prowlwise: { label: "Prowlwise", service: "Prowlwise: Demo Request" },
  adsboys: { label: "Adsboys", service: "Adsboys: Demo Request" },
  oyehello: { label: "Oye Hello", service: "Oye Hello: Demo Request" },
};

const MAX_BODY_BYTES = 32 * 1024;
const MAX_FIELD = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function parseKeys() {
  const raw = process.env.LEAD_INGEST_KEYS || "";
  const out = [];
  for (const pair of raw.split(",")) {
    const idx = pair.indexOf(":");
    if (idx < 1) continue;
    const product = pair.slice(0, idx).trim().toLowerCase();
    const key = pair.slice(idx + 1).trim();
    if (PRODUCTS[product] && key.length >= 24) out.push({ product, key });
  }
  return out;
}

function safeEqual(a, b) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) {
    // Still burn a compare so length is not a timing oracle.
    timingSafeEqual(ba, ba);
    return false;
  }
  return timingSafeEqual(ba, bb);
}

function authenticate(request) {
  const header = request.headers.get("authorization") || "";
  const m = header.match(/^Bearer\s+(.+)$/i);
  if (!m) return null;
  const presented = m[1].trim();
  let matched = null;
  // Check every key so timing does not reveal which product matched.
  for (const entry of parseKeys()) {
    if (safeEqual(presented, entry.key)) matched = entry.product;
  }
  return matched;
}

const str = (v) => (typeof v === "string" ? v.trim().slice(0, MAX_FIELD) : "");
const opt = (v) => (str(v) ? str(v) : null);

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

export async function POST(request) {
  const product = authenticate(request);
  if (!product) return json(401, { message: "Invalid or missing API key." });

  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_BODY_BYTES) return json(413, { message: "Payload too large." });

  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, { message: "Body must be JSON." });
  }
  if (!body || typeof body !== "object") return json(400, { message: "Body must be an object." });

  const fullName = str(body.full_name ?? body.fullName ?? body.name);
  const workEmail = str(body.work_email ?? body.workEmail ?? body.email).toLowerCase();
  if (!fullName || !workEmail) return json(400, { message: "full_name and work_email are required." });
  if (!EMAIL_RE.test(workEmail)) return json(400, { message: "work_email is not a valid address." });

  const meta = PRODUCTS[product];
  const consent = body.privacy_consent ?? body.privacyConsent;

  const leadData = {
    full_name: fullName,
    work_email: workEmail,
    service: opt(body.service) || meta.service,
    budget: opt(body.budget),
    timeline: opt(body.timeline) || "Exploring options",
    project_summary: opt(body.project_summary ?? body.message ?? body.projectSummary),
    company_website: opt(body.company_website ?? body.company ?? body.companyWebsite),
    phone: opt(body.phone),
    privacy_consent: consent === true || consent === "true",
    utm_source: opt(body.utm_source),
    utm_medium: opt(body.utm_medium),
    utm_campaign: opt(body.utm_campaign),
    utm_term: opt(body.utm_term),
    utm_content: opt(body.utm_content),
    landing_page: opt(body.landing_page),
    referrer: opt(body.referrer),
    // The product is the source. Set from the key, not the payload.
    lead_source: product,
    gclid: opt(body.gclid),
    gbraid: opt(body.gbraid),
    wbraid: opt(body.wbraid),
    fbclid: opt(body.fbclid),
    msclkid: opt(body.msclkid),
    click_id_captured_at: opt(body.click_id_captured_at),
    attribution_data:
      body.attribution_data && typeof body.attribution_data === "object"
        ? body.attribution_data
        : null,
  };

  leadData.lead_score = calculateLeadScore(leadData);
  try {
    await applyCareersVetting(leadData);
  } catch (e) {
    console.error("ingest: careers vetting failed, storing unvetted", e);
  }

  const { data: saved, error } = await supabaseAdmin
    .from("leads")
    .insert([leadData])
    .select("id, lead_score")
    .single();

  if (error) {
    console.error("ingest: insert failed", error);
    return json(500, { message: "Could not store the lead." });
  }

  // Notification is best-effort; the row is already stored.
  if (mailConfigured()) {
    try {
      const lines = [
        `New ${meta.label} demo request`,
        "",
        `Name: ${fullName}`,
        `Email: ${workEmail}`,
        leadData.phone ? `Phone: ${leadData.phone}` : null,
        leadData.company_website ? `Company: ${leadData.company_website}` : null,
        `Service: ${leadData.service}`,
        leadData.budget ? `Budget: ${leadData.budget}` : null,
        `Timeline: ${leadData.timeline}`,
        leadData.project_summary ? `\nMessage:\n${leadData.project_summary}` : null,
        "",
        `Source: ${product}${leadData.landing_page ? ` (${leadData.landing_page})` : ""}`,
        `Lead score: ${saved.lead_score}/100`,
        `Dashboard: https://stackbinary.io/admin/leads/${saved.id}`,
      ].filter((l) => l !== null);
      await buildMailTransport().sendMail({
        from: MAIL_FROM,
        to: NOTIFY_EMAIL,
        subject: `${meta.label.toUpperCase()} DEMO REQUEST from ${fullName}`,
        text: lines.join("\n"),
      });
    } catch (e) {
      console.error("ingest: notification failed", e);
    }
  }

  return json(201, { id: saved.id, lead_score: saved.lead_score, product });
}

export async function GET() {
  return json(405, { message: "POST only." });
}
