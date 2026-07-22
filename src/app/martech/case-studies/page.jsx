import CaseStudiesShowcase from "@/components/pages/Martech/CaseStudiesShowcase";
import Banner from "@/components/Banner";

export const metadata = {
  title: "Case Studies | StackBinary™ MarTech - Real Products, Real Numbers",
  description:
    "37 shipped products and campaigns: celebrity beauty marketing (3.8x ROAS), $100M+ commerce platforms, healthcare AI, fintech fraud detection and more — with the numbers from the work.",
  alternates: { canonical: "https://stackbinary.io/martech/case-studies" },
  openGraph: {
    title: "Case Studies | StackBinary™ MarTech - Real Products, Real Numbers",
    description:
      "37 shipped products and campaigns across beauty, e-commerce, healthcare, fintech and more.",
    url: "https://stackbinary.io/martech/case-studies",
    siteName: "StackBinary",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <CaseStudiesShowcase />
      <Banner
        bannerStyle={{
          backgroundImage: "linear-gradient(180deg, #000000, #00000000)",
        }}
        ctaHref="/martech#martech-lead-form"
        ctaLabel="Start My Project"
        title="Your Project Could Be the Next One Here"
        description="Tell us what you're building — we'll show you the closest thing we've already shipped."
        image="/banner-dev-team.jpg"
      />
    </>
  );
}
