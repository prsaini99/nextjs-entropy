import MartechHero from "@/components/pages/Martech/MartechHero";
import MartechBrands from "@/components/pages/Martech/MartechBrands";
import MartechCaseStudies from "@/components/pages/Martech/MartechCaseStudies";
import MartechShopify from "@/components/pages/Martech/MartechShopify";
import MartechServices from "@/components/pages/Martech/MartechServices";
import FlagshipProducts from "@/components/pages/Martech/FlagshipProducts";
import WhyCustom from "@/components/pages/Martech/WhyCustom";
import MartechProcess from "@/components/pages/Martech/MartechProcess";
import MartechFAQ from "@/components/pages/Martech/MartechFAQ";
import Banner from "@/components/Banner";

export const metadata = {
  title: "MarTech Engineering | StackBinary™ - Own Your Marketing Stack",
  description:
    "Custom marketing technology: ad-ops automation, email infrastructure, influencer platforms, lead-gen engines, loyalty programs and neural ad creative pre-testing (TRIBE v2). Replace SaaS sprawl with software you own.",
  alternates: { canonical: "https://stackbinary.io/martech" },
  openGraph: {
    title: "MarTech Engineering | StackBinary™ - Own Your Marketing Stack",
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
        name: "MarTech Engineering - StackBinary",
        url: "https://stackbinary.io/martech",
        description:
          "Custom marketing technology engineering: ad-ops automation, email infrastructure, influencer marketing platforms, lead generation, loyalty programs and AI video creative analysis.",
      },
      {
        "@type": "Service",
        serviceType: "Marketing Technology Engineering",
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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <MartechHero />
      <MartechBrands />
      <MartechServices />
      <FlagshipProducts />
      <MartechCaseStudies />
      <MartechShopify />
      <WhyCustom />
      <MartechProcess />
      <MartechFAQ />
      <Banner
        bannerStyle={{
          backgroundImage: "linear-gradient(180deg, #000000, #00000000)",
        }}
        ctaHref="#martech-lead-form"
        ctaLabel="Get My Free Stack Audit"
        title="Ready to Own Your Marketing Stack?"
        description="Start with a free stack audit — we'll map your tools, spend and data flows, and show you exactly what to build first."
        image="/banner-dev-team.jpg"
      />
    </>
  );
}
