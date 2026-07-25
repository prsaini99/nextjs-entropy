import { notFound } from "next/navigation";
import { getAllIndustrySlugs, getIndustry } from "@/data/industries";
import IndustryDetail from "@/components/pages/Industries/IndustryDetail";
import Banner from "@/components/Banner";

export function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return {
    title: `${industry.seoTitle} | StackBinary™`,
    description: industry.blurb,
    alternates: { canonical: `https://stackbinary.io/industries/${slug}` },
    openGraph: {
      title: `${industry.seoTitle} | StackBinary™`,
      description: industry.blurb,
      url: `https://stackbinary.io/industries/${slug}`,
      siteName: "StackBinary",
      type: "website",
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function IndustryPage({ params }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  return (
    <>
      <IndustryDetail industry={industry} />
      <Banner
        bannerStyle={{
          backgroundImage: "linear-gradient(180deg, #000000, #00000000)",
        }}
        title={`Building in ${industry.name}?`}
        description="Book a discovery call — we'll map your problem to the closest system we've already shipped."
        image="/banner-dev-team.jpg"
      />
    </>
  );
}
