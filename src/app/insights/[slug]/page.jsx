import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { getAllInsightSlugs, getInsight } from "@/lib/insights";
import Banner from "@/components/Banner";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return {
    title: `${insight.title} | StackBinary™`,
    description: insight.description,
    alternates: { canonical: `https://stackbinary.io/insights/${slug}` },
    openGraph: {
      title: `${insight.title} | StackBinary™`,
      description: insight.description,
      url: `https://stackbinary.io/insights/${slug}`,
      siteName: "StackBinary",
      type: "article",
      publishedTime: insight.date,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function InsightPage({ params }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const html = marked.parse(insight.content);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.description,
    datePublished: insight.date,
    dateModified: insight.updated || insight.date,
    author: { "@type": "Organization", name: "StackBinary", url: "https://stackbinary.io" },
    publisher: { "@type": "Organization", name: "StackBinary", url: "https://stackbinary.io" },
    mainEntityOfPage: `https://stackbinary.io/insights/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section>
        <div className="padding-global">
          <div className="w-layout-blockcontainer container w-container">
            <div className="max-w-3xl mx-auto pt-10">
              <div className="text-size-small opacity-40 mb-4">
                <Link href="/insights" className="text-link">
                  Insights
                </Link>{" "}
                ·{" "}
                {new Date(insight.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <h1 className="heading-4 text-weight-bold mb-4">{insight.title}</h1>
              <p className="opacity-80 mb-10">{insight.description}</p>
              <article
                className="insight-article"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        </div>
      </section>
      <Banner
        bannerStyle={{ backgroundImage: "linear-gradient(180deg, #000000, #00000000)" }}
        title="Want the Answer for Your Specific Case?"
        description="Book a discovery call — we'll map this to your situation with numbers from work we've already shipped."
        image="/banner-dev-team.jpg"
      />
    </>
  );
}
