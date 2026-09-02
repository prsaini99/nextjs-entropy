import CaseStudiesShowcase from "@/components/pages/Martech/CaseStudiesShowcase";
import Banner from "@/components/Banner";

export const metadata = {
  title: "Case Studies, 32 Shipped Products with Real Numbers | Stackbinary",
  description:
    "Software case studies across healthcare, e-commerce, fintech, education and AI: $100M+ commerce platforms, $25M+ fraud prevented, 300,000+ teleconsultations and 500,000+ medical images analysed.",
  alternates: { canonical: "https://stackbinary.io/case-studies" },
  openGraph: {
    title: "Case Studies | Stackbinary, Real Products, Real Numbers",
    description:
      "32 shipped products across 6 categories, with the numbers from the work.",
    url: "https://stackbinary.io/case-studies",
    siteName: "Stackbinary",
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
          backgroundImage: "linear-gradient(180deg, #17171A, #17171A00)",
        }}
        title="Your Project Could Be the Next One Here"
        description="Tell us what you're building, we'll show you the closest thing we've already shipped."
        image="/banner-dev-team.jpg"
      />
    </>
  );
}
