// Shared route machinery for the Dubai/UAE services pair, mirroring
// aiServiceRoute.js. Same template, different geo signals: areaServed is the
// UAE and the Gulf, plus LocalBusiness with the real Dubai presence the
// owner provided 2026-08-29: Park Lane Tower, Business Bay, +971 52 589
// 1213. The same details are visible in the page copy; schema only ever
// claims what the page shows.

import { getDubaiPage } from "@/data/dubaiPages";

const BASE = "https://stackbinary.io";

export function dubaiMetadata(slug) {
  const page = getDubaiPage(slug);
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

export function dubaiJsonLd(slug) {
  const page = getDubaiPage(slug);
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
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "City", name: "Dubai" },
        { "@type": "City", name: "Abu Dhabi" },
        { "@type": "Country", name: "Saudi Arabia" },
      ],
      serviceType: page.badge.split("·")[0].trim(),
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Stackbinary",
      url: BASE,
      telephone: "+971525891213",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Park Lane Tower, Business Bay",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "City", name: "Dubai" },
      ],
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
