import { notFound } from "next/navigation";
import { getAllMartechSlugs, getMartechPage } from "@/data/martechPages";
import MartechProductPage from "@/components/pages/Martech/MartechProductPage";
import TribeLiveDemo from "@/components/pages/Martech/TribeLiveDemo";
import Banner from "@/components/Banner";

export function generateStaticParams() {
  return getAllMartechSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getMartechPage(slug);
  if (!page) return {};
  const title = page.seoTitle
    ? `${page.seoTitle} | StackBinary™`
    : `${page.badge.split("·")[0].trim()} | StackBinary™ MarTech`;
  return {
    title,
    description: page.tagline,
    alternates: { canonical: `https://stackbinary.io/martech/${slug}` },
    openGraph: {
      title,
      description: page.tagline,
      url: `https://stackbinary.io/martech/${slug}`,
      siteName: "StackBinary",
      type: "website",
    },
  };
}

export default async function MartechSlugPage({ params }) {
  const { slug } = await params;
  const page = getMartechPage(slug);
  if (!page) notFound();

  return (
    <>
      <MartechProductPage
        page={page}
        afterHero={slug === "creative-analysis" ? <TribeLiveDemo /> : null}
      />
      <Banner
        bannerStyle={{
          backgroundImage: "linear-gradient(180deg, #000000, #00000000)",
        }}
        ctaHref="/martech#martech-lead-form"
        ctaLabel="Get My Free Stack Audit"
        title="Want This Running for Your Brand?"
        description="Book a discovery call — we'll walk you through the live product and map it to your workflow."
        image="/banner-dev-team.jpg"
      />
    </>
  );
}
