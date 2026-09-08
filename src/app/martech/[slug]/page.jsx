import { notFound } from "next/navigation";
import { getAllMartechSlugs, getMartechPage } from "@/data/martechPages";
import { getMartechFaqs } from "@/data/martechFaqs";
import MartechProductPage from "@/components/pages/Martech/MartechProductPage";
import TribeLiveDemo from "@/components/pages/Martech/TribeLiveDemo";
import Banner from "@/components/Banner";
import RelatedInsights from "@/components/RelatedInsights";

// Per-product further reading; unknown products fall back to the newest
// articles inside RelatedInsights.
const RELATED = {
  "ai-call-center": ["voice-ai-pricing-per-minute-2026", "ai-answering-service-small-business-cost", "ai-calling-agent-pricing-india"],
  "marketing-automation": ["whatsapp-business-api-pricing-india", "n8n-vs-zapier-cost-comparison", "best-ai-agent-builder-for-business"],
  "social-automation": ["best-ai-agent-builder-for-business", "n8n-pricing-explained", "whatsapp-business-api-pricing-india"],
};

export function generateStaticParams() {
  return getAllMartechSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getMartechPage(slug);
  if (!page) return {};
  const title = page.seoTitle
    ? `${page.seoTitle} | Stackbinary`
    : `${page.badge.split("·")[0].trim()} | Stackbinary MarTech`;
  return {
    title,
    description: page.tagline,
    alternates: { canonical: `https://stackbinary.io/martech/${slug}` },
    openGraph: {
      title,
      description: page.tagline,
      url: `https://stackbinary.io/martech/${slug}`,
      siteName: "Stackbinary",
      type: "website",
    },
  };
}

export default async function MartechSlugPage({ params }) {
  const { slug } = await params;
  const page = getMartechPage(slug);
  if (!page) notFound();

  const faqs = getMartechFaqs(slug);

  // FAQPage structured data. Without this the FAQs can't surface as rich
  // results and are far less likely to be pulled into AI answers — which is
  // most of the reason for writing them in the buyer's own phrasing.
  const faqSchema = faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <MartechProductPage
        page={{ ...page, faqs }}
        slug={slug}
        afterHero={slug === "creative-analysis" ? <TribeLiveDemo /> : null}
      />
      <RelatedInsights
        slugs={RELATED[slug] || []}
        heading="What the alternatives cost, verified this month"
      />
      <Banner
        bannerStyle={{
          backgroundImage: "linear-gradient(180deg, #17171A, #17171A00)",
        }}
        ctaHref="#martech-lead-form"
        ctaLabel="Get My Build Quote"
        title="Want This Running for Your Brand?"
        description="Book a discovery call, we'll walk you through the live product and map it to your workflow."
        image="/media/banner-dev-team.webp"
      />
    </>
  );
}
