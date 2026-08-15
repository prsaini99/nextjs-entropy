// Shared route machinery for the AI services cluster (/services/ai-*).
//
// These are STATIC route folders rather than entries in /services/[slug]
// on purpose: the existing dynamic route derives its slugs and content from
// the Features data and its thin template, while these pages carry a much
// richer content shape. Static segments take precedence over [slug] in the
// App Router, so each cluster folder's page.jsx is a few lines calling into
// here.

import { getAiServicePage } from "@/data/aiServicesPages";

const BASE = "https://stackbinary.io";

export function aiServiceMetadata(slug) {
  const page = getAiServicePage(slug);
  if (!page) return {};
  return {
    title: `${page.seoTitle} | Stackbinary`,
    description: page.seoDescription,
    alternates: { canonical: `${BASE}/services/${slug}` },
    openGraph: {
      title: `${page.seoTitle} | Stackbinary`,
      description: page.seoDescription,
      url: `${BASE}/services/${slug}`,
      siteName: "Stackbinary",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${page.seoTitle} | Stackbinary`,
      description: page.seoDescription,
    },
  };
}

// FAQPage + Service + BreadcrumbList structured data. 12 of the 22
// competitor pages holding our target SERPs carry FAQ schema (teardown
// 2026-08-15); Service with areaServed US is the geo signal for a page that
// deliberately has no /us/ URL.
export function aiServiceJsonLd(slug) {
  const page = getAiServicePage(slug);
  if (!page) return [];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.seoTitle,
      description: page.seoDescription,
      url: `${BASE}/services/${slug}`,
      provider: {
        "@type": "Organization",
        name: "Stackbinary",
        url: BASE,
      },
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "Australia" },
      ],
      serviceType: page.badge.split("·")[0].trim(),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Services", item: `${BASE}/services` },
        {
          "@type": "ListItem",
          position: 2,
          name: page.badge.split("·")[0].trim(),
          item: `${BASE}/services/${slug}`,
        },
      ],
    },
  ];

  if (page.faqs?.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return schemas;
}
