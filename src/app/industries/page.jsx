import IndustriesHub from "@/components/pages/Industries/IndustriesHub";
import Banner from "@/components/Banner";

export const metadata = {
  title: "Industries We Serve, Software Development Across 8 Sectors | StackBinary™",
  description:
    "Healthcare, retail & e-commerce, agriculture, mobility & energy, education, media, travel and SaaS, 55+ shipped products for brands like Abbott, Philips, KFC, Hyundai and Mumbai Indians.",
  alternates: { canonical: "https://stackbinary.io/industries" },
  openGraph: {
    title: "Industries We Serve | StackBinary™",
    description:
      "55+ shipped products across 8 industries, pick yours and see what we've built for companies like yours.",
    url: "https://stackbinary.io/industries",
    siteName: "StackBinary",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function IndustriesPage() {
  return (
    <>
      <IndustriesHub />
      <Banner
        bannerStyle={{
          backgroundImage: "linear-gradient(180deg, #000000, #00000000)",
        }}
        title="Tell Us Your Industry, We'll Show You What We'd Build"
        description="Book a discovery call and we'll walk you through the closest systems we've already shipped for companies like yours."
        image="/banner-dev-team.jpg"
      />
    </>
  );
}
