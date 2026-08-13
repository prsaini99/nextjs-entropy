import CaseStudiesShowcase from "@/components/pages/Martech/CaseStudiesShowcase";
import Banner from "@/components/Banner";

export const metadata = {
  title: "Case Studies, 37 Shipped Products with Real Numbers | StackBinary™",
  description:
    "Software and marketing case studies across healthcare, e-commerce, fintech, education and AI: $100M+ commerce platforms, $25M+ fraud prevented, 300,000+ teleconsultations, 3.8x ROAS campaigns.",
  alternates: { canonical: "https://stackbinary.io/case-studies" },
  openGraph: {
    title: "Case Studies | StackBinary™, Real Products, Real Numbers",
    description:
      "37 shipped products and campaigns across 9 categories, with the numbers from the work.",
    url: "https://stackbinary.io/case-studies",
    siteName: "StackBinary",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <CaseStudiesShowcase general />
      <Banner
        bannerStyle={{
          backgroundImage: "linear-gradient(180deg, #000000, #00000000)",
        }}
        title="Your Project Could Be the Next One Here"
        description="Tell us what you're building, we'll show you the closest thing we've already shipped."
        image="/banner-dev-team.jpg"
      />
    </>
  );
}
