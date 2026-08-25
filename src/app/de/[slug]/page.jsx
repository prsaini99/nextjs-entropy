import { notFound } from "next/navigation";
import { getDePage, getAllDeSlugs } from "@/data/dePages";
import DeServicePage from "@/components/pages/De/DeServicePage";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllDeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getDePage(slug);
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.metaDescription,
    alternates: { canonical: `https://stackbinary.io/de/${slug}` },
    // Viewable but unindexed until the DE review is done; flip together with
    // the hub page and the sitemap block.
    robots: { index: false },
    openGraph: {
      title: page.seoTitle,
      description: page.metaDescription,
      url: `https://stackbinary.io/de/${slug}`,
      siteName: "Stackbinary",
      locale: "de_DE",
      type: "website",
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const page = getDePage(slug);
  if (!page) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: page.h1,
        description: page.metaDescription,
        inLanguage: "de",
        areaServed: ["DE", "AT", "CH"],
        provider: {
          "@type": "Organization",
          name: "Stackbinary",
          url: "https://stackbinary.io",
        },
        url: `https://stackbinary.io/de/${slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Start", item: "https://stackbinary.io/" },
          { "@type": "ListItem", position: 2, name: "Leistungen (DE)", item: "https://stackbinary.io/de" },
          { "@type": "ListItem", position: 3, name: page.h1, item: `https://stackbinary.io/de/${slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        inLanguage: "de",
        mainEntity: page.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DeServicePage slug={slug} />
    </>
  );
}
