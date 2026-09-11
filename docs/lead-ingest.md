# Lead ingest for the product sites

The product landing pages on ichneo.com, auspicely.com and prowlwise.com send
their demo requests to stackbinary.io, where they land in the same `leads`
table the admin dashboard reads, get the same lead score, and trigger the same
notification email to contact@stackbinary.io. The dashboard shows them under
the product name in the Source column and the Lead Source filter.

## Endpoint

    POST https://stackbinary.io/api/leads/ingest
    Authorization: Bearer <LEAD_INGEST_KEY>
    Content-Type: application/json

One key per product. The product is decided by which key matched, so a key can
only create leads for its own product. Keys are set on stackbinary.io as
`LEAD_INGEST_KEYS` (comma-separated `product:key` pairs) and on each product
site as `LEAD_INGEST_KEY`. Rotate one product by replacing its pair.

The route sends no CORS headers on purpose: a browser cannot call it. The
product site must call it from a server-side route handler, never from
client-side JavaScript, or the key would ship to every visitor.

## Payload

Required: `full_name`, `work_email`. Everything else optional.

    {
      "full_name": "Jane Doe",
      "work_email": "jane@company.com",
      "company_website": "company.com",
      "phone": "+1 555 0100",
      "message": "We run 40 SDRs and want to see the demo.",
      "budget": "₹15 – ₹40 Lakh",
      "timeline": "Within a month",
      "privacy_consent": true,
      "landing_page": "/",
      "referrer": "https://www.google.com/",
      "utm_source": "google", "utm_medium": "cpc", "utm_campaign": "...",
      "gclid": "...", "fbclid": "..."
    }

`service` defaults to `<Product>: Demo Request` and `timeline` to
`Exploring options`. Responses: `201 {id, lead_score, product}`, `400` on a
bad body, `401` on a bad key, `413` over 32KB, `500` if the store fails.

## Product-site handler (Next.js App Router)

Put this at `app/api/demo/route.ts` on the product site and point the form at
`/api/demo`. It validates locally, forwards with the key, and never exposes it.

    import { NextResponse } from "next/server";

    const INGEST_URL = process.env.LEAD_INGEST_URL!;
    const INGEST_KEY = process.env.LEAD_INGEST_KEY!;

    export async function POST(req: Request) {
      const form = await req.json().catch(() => null);
      if (!form?.full_name || !form?.work_email) {
        return NextResponse.json({ message: "Name and work email are required." }, { status: 400 });
      }
      if (form.website_confirm) return NextResponse.json({ ok: true }); // honeypot

      const res = await fetch(INGEST_URL, {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${INGEST_KEY}` },
        body: JSON.stringify({
          full_name: form.full_name,
          work_email: form.work_email,
          company_website: form.company,
          phone: form.phone,
          message: form.message,
          privacy_consent: form.privacy_consent === true,
          landing_page: form.landing_page,
          referrer: form.referrer,
          utm_source: form.utm_source, utm_medium: form.utm_medium,
          utm_campaign: form.utm_campaign, utm_term: form.utm_term, utm_content: form.utm_content,
          gclid: form.gclid, fbclid: form.fbclid,
        }),
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("lead ingest failed", res.status, await res.text());
        return NextResponse.json({ message: "Could not send your request. Please email contact@stackbinary.io." }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }

Environment on each product site (Vercel, Production and Preview):

    LEAD_INGEST_URL=https://stackbinary.io/api/leads/ingest
    LEAD_INGEST_KEY=<that product's key>

## Testing a key

    curl -s -X POST https://stackbinary.io/api/leads/ingest \
      -H "authorization: Bearer $LEAD_INGEST_KEY" -H "content-type: application/json" \
      -d '{"full_name":"Ingest Test","work_email":"test@example.com","message":"delete me"}'

Delete the test row from the dashboard afterwards.
