import Link from "next/link";
import { getAllDeSlugs, getDePage } from "@/data/dePages";

export const dynamic = "force-static";

export const metadata = {
  title: "Software und KI Entwicklung für den deutschen Markt | Stackbinary",
  description:
    "Individualsoftware, KI Entwicklung, KI-Agenten und KI im Kundenservice: Engineering-Team mit 55+ ausgelieferten Produkten, deutschsprachiger Ansprechpartner.",
  alternates: { canonical: "https://stackbinary.io/de" },
  // Viewable but unindexed until the German sales colleague has reviewed the
  // copy (see DE-REVIEW.md). Delete this line and restore the sitemap block
  // in sitemap.js together, in one commit.
  robots: { index: false },
  openGraph: {
    title: "Software und KI Entwicklung für den deutschen Markt | Stackbinary",
    description:
      "Individualsoftware, KI Entwicklung, KI-Agenten und KI im Kundenservice mit deutschsprachigem Ansprechpartner.",
    url: "https://stackbinary.io/de",
    siteName: "Stackbinary",
    locale: "de_DE",
    type: "website",
  },
};

export default function DeHub() {
  const slugs = getAllDeSlugs();
  return (
    <div lang="de">
      <section>
        <div className="padding-global">
          <div className="w-layout-blockcontainer container w-container">
            <div className="hero-wrapper">
              <div className="hero-component">
                <div className="read-more-tag w-inline-block">
                  <div className="text-size-small text-weight-bold text-[#E0362C]">
                    Für Unternehmen in Deutschland, Österreich und der Schweiz
                  </div>
                </div>
                <div className="flex flex-col items-center gap-10">
                  <h1 className="heading-3 text-weight-bold max-w-5xl">
                    Software und KI, entwickelt wie für den Mittelstand gemacht
                  </h1>
                  <div className="max-w-4xl">
                    <p className="opacity-80">
                      Stackbinary ist ein Engineering-Team mit über 55
                      ausgelieferten Produkten. Wir entwickeln Individualsoftware,
                      KI-Systeme und Automatisierung zu etwa der Hälfte der in
                      Deutschland üblichen Agentursätze, mit deutschsprachigem
                      Ansprechpartner von Erstgespräch bis Betrieb. Der Quellcode
                      gehört am Ende Ihnen.
                    </p>
                  </div>
                </div>
                <div className="double-button-component margin-top-button-hero">
                  <Link href="/contact-us" className="primary-button w-inline-block">
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
        </div>
      </section>

      <section>
        <div className="padding-global py-16">
          <div className="w-layout-blockcontainer container w-container">
            <h2 className="heading-4 text-weight-medium mb-8">Unsere Leistungen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {slugs.map((slug) => {
                const p = getDePage(slug);
                return (
                  <Link
                    key={slug}
                    href={`/de/${slug}`}
                    className="border border-gray-200 rounded-lg p-8 bg-[#F7F7F5] hover:border-[#E0362C]/60 transition-colors duration-300 flex flex-col gap-3 group"
                  >
                    <div className="text-size-small text-weight-bold text-[#E0362C] uppercase tracking-wider">
                      {p.badge.split("·")[0].trim()}
                    </div>
                    <h3 className="text-size-large text-weight-medium">{p.h1}</h3>
                    <p className="text-size-small opacity-80">{p.metaDescription}</p>
                    <span className="mt-auto pt-3 text-size-small text-[#E0362C] text-weight-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Mehr erfahren →
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
