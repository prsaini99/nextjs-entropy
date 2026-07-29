import MartechHero from "@/components/pages/Martech/MartechHero";
import MartechBrands from "@/components/pages/Martech/MartechBrands";
import MartechCaseStudies from "@/components/pages/Martech/MartechCaseStudies";
import MartechShopify from "@/components/pages/Martech/MartechShopify";
import MartechServices from "@/components/pages/Martech/MartechServices";
import FlagshipProducts from "@/components/pages/Martech/FlagshipProducts";
import WhyCustom from "@/components/pages/Martech/WhyCustom";
import MartechProcess from "@/components/pages/Martech/MartechProcess";
import MartechFAQ from "@/components/pages/Martech/MartechFAQ";
import MartechStickyCTA from "@/components/pages/Martech/MartechStickyCTA";
import martechFaqs from "@/data/martechFaqs";
import Banner from "@/components/Banner";

export const metadata = {
  title: "AI Marketing Agency & MarTech Stack Builders | StackBinary™",
  // Targets "ai marketing agency" (500 India / 5,000 global) and "martech
  // stack" (100–1K). The old copy led with "MarTech Engineering" — accurate,
  // but zero search demand across 2,546 keyword ideas.
  description:
    "An AI marketing agency that builds the stack and runs the marketing: marketing automation, influencer platforms, AI calling agents, lead-gen engines and WhatsApp automation you own outright. 55+ products shipped.",
  alternates: { canonical: "https://stackbinary.io/martech" },
  openGraph: {
    title: "AI Marketing Agency & MarTech Stack Builders | StackBinary™",
    description:
      "Custom marketing technology: ad-ops automation, email infrastructure, influencer platforms, lead-gen engines, loyalty programs and neural ad creative pre-testing.",
    url: "https://stackbinary.io/martech",
    siteName: "StackBinary",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function MartechPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "AI Marketing Agency & MarTech Stack Builders - StackBinary",
        url: "https://stackbinary.io/martech",
        description:
          "An AI marketing agency that builds and runs the stack: marketing automation, influencer marketing platforms, AI calling agents, WhatsApp automation, lead generation and AI video creative analysis.",
      },
      {
        "@type": "Service",
        serviceType: "AI Marketing Automation Agency",
        provider: { "@type": "Organization", name: "StackBinary" },
        areaServed: "Worldwide",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "MarTech Services",
          itemListElement: [
            "Ad-Ops & Campaign Automation",
            "Email Marketing Infrastructure",
            "Influencer & Creator Platforms",
            "Lead Generation & Sales Intelligence",
            "Loyalty & Ambassador Programs",
            "Proposal & Document Automation",
            "Neural Creative Pre-Testing (TRIBE v2)",
          ].map((name, i) => ({
            "@type": "Offer",
            position: i + 1,
            itemOffered: { "@type": "Service", name },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://stackbinary.io/" },
          { "@type": "ListItem", position: 2, name: "MarTech", item: "https://stackbinary.io/martech" },
        ],
      },
      // Lets the FAQ answers surface as rich results and be pulled into AI
      // answers — the reason they're written in the buyer's own phrasing.
      {
        "@type": "FAQPage",
        mainEntity: martechFaqs.hub.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <MartechStickyCTA />
      <MartechHero />
      <MartechBrands />
      {/* Products before services: the H1 claims we build AI, so the proof —
          four shipped products you can click — comes before the service menu. */}
      <FlagshipProducts />
      <MartechServices />
      <MartechCaseStudies />
      <WhyCustom />
      <MartechProcess />
      {/* Shopify sits after the AI narrative rather than interrupting it. No
          martech ad group targets Shopify buyers, so it serves organic and
          browsing visitors here; paid Shopify traffic gets its own ad group
          pointing at /martech/shopify-websites. */}
      <MartechShopify />
      <MartechFAQ />
      <Banner
        bannerStyle={{
          backgroundImage: "linear-gradient(180deg, #000000, #00000000)",
        }}
        ctaHref="#martech-lead-form"
        ctaLabel="Get My Free Stack Audit"
        title="Ready to Own Your Marketing Stack?"
        description="Start with a free stack audit. We'll map your tools, spend and data flows, and show you exactly what to build first."
        image="/banner-dev-team.jpg"
      />
    </>
  );
}
