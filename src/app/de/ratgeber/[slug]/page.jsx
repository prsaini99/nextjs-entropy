import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { getAllDeRatgeberSlugs, getDeRatgeber } from "@/lib/deRatgeber";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllDeRatgeberSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const artikel = getDeRatgeber(slug);
  if (!artikel) return {};
  return {
    title: `${artikel.title} | Stackbinary`,
    description: artikel.description,
    alternates: { canonical: `https://stackbinary.io/de/ratgeber/${slug}` },
    // Indexed on the owner's instruction 2026-08-29; like the /de launch, the
    // sales colleague's review continues on the live articles and corrections
    // are applied as they come.
    openGraph: {
      title: `${artikel.title} | Stackbinary`,
      description: artikel.description,
      url: `https://stackbinary.io/de/ratgeber/${slug}`,
      siteName: "Stackbinary",
      locale: "de_DE",
      type: "article",
      publishedTime: artikel.date,
    },
  };
}

export default async function DeRatgeberPage({ params }) {
  const { slug } = await params;
  const artikel = getDeRatgeber(slug);
  if (!artikel) notFound();

  const html = marked.parse(artikel.content);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artikel.title,
    description: artikel.description,
    datePublished: artikel.date,
    dateModified: artikel.updated || artikel.date,
    inLanguage: "de",
    author: { "@type": "Organization", name: "Stackbinary", url: "https://stackbinary.io" },
    publisher: { "@type": "Organization", name: "Stackbinary", url: "https://stackbinary.io" },
    mainEntityOfPage: `https://stackbinary.io/de/ratgeber/${slug}`,
  };

  return (
    <div lang="de">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section>
        <div className="padding-global">
          <div className="w-layout-blockcontainer container w-container">
            <div className="max-w-3xl mx-auto mt-[15vh]">
              <div className="text-size-small opacity-40 mb-4">
                <Link href="/de" className="text-link">
                  Ratgeber
                </Link>{" "}
                ·{" "}
                {new Date(artikel.date).toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <h1 className="heading-4 text-weight-bold mb-4">{artikel.title}</h1>
              <p className="opacity-80 mb-10">{artikel.description}</p>
              <article
                className="insight-article"
                dangerouslySetInnerHTML={{ __html: html }}
              />
              <div className="border border-[#E0362C]/30 rounded-lg p-8 bg-[#E0362C]/[0.04] mt-12">
                <div className="text-size-large text-weight-medium mb-2">
                  Sprechen Sie mit uns über Ihr Vorhaben
                </div>
                <p className="opacity-80 mb-6">
                  Im kostenlosen Erstgespräch rechnen wir die Zahlen aus diesem
                  Artikel auf Ihren konkreten Fall um. Deutschsprachiger
                  Ansprechpartner, Antwort innerhalb eines Werktags.
                </p>
                <Link href="/de/kontakt" className="primary-button w-inline-block">
                  <div className="relative">
                    <div className="text-size-small text-weight-bold">
                      Kostenloses Erstgespräch vereinbaren
                    </div>
                  </div>
                  <div className="button-elipse"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
