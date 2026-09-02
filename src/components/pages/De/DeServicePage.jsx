import Link from "next/link";
import { getDePage } from "@/data/dePages";

/**
 * German market template. Server component on purpose: no client state is
 * needed, FAQs use native <details>, and that keeps the page fully rendered
 * in the initial HTML for google.de.
 *
 * lang="de" sits on the wrapper because the root layout declares lang="en"
 * for the whole site and Next.js allows only one <html>; a scoped lang
 * attribute is the correct signal for screen readers and search engines.
 *
 * The CTA points at /contact-us (English form) for v1. A German form is a
 * follow-up once the sales colleague defines his lead routing.
 */
export default function DeServicePage({ slug }) {
  const page = getDePage(slug);
  if (!page) return null;

  return (
    <div lang="de">
      <section>
        <div className="padding-global">
          <div className="w-layout-blockcontainer container w-container">
            <div className="hero-wrapper">
              <div className="hero-component">
                <div className="read-more-tag w-inline-block">
                  <div className="text-size-small text-weight-bold text-[#E0362C]">
                    {page.badge}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-10">
                  <h1 className="heading-3 text-weight-bold max-w-5xl">
                    {page.h1}
                  </h1>
                  <div className="max-w-4xl flex flex-col gap-4">
                    {page.intro.map((p, i) => (
                      <p key={i} className="opacity-80">{p}</p>
                    ))}
                  </div>
                </div>
                <div className="double-button-component margin-top-button-hero">
                  <Link href="/de/kontakt" className="primary-button w-inline-block">
                    <div className="relative">
                      <div className="text-size-small text-weight-bold">
                        {page.ctaLabel || "Kostenloses Erstgespräch vereinbaren"}
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

      <section className="ink-section">
        <div className="padding-global py-16">
          <div className="w-layout-blockcontainer container w-container">
            <h2 className="heading-4 text-weight-medium mb-8">
              {page.leistungenHeading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {page.leistungen.map((l) => (
                <div
                  key={l.title}
                  className="border border-[#17171A]/10 rounded-lg p-8 bg-white flex flex-col gap-3"
                >
                  <h3 className="text-size-large text-weight-medium">{l.title}</h3>
                  <p className="text-size-small opacity-80">{l.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ink-section">
        <div className="padding-global py-16">
          <div className="w-layout-blockcontainer container w-container">
            <div className="border border-[#E0362C]/30 rounded-lg p-8 lg:p-12 bg-[#E0362C]/[0.04]">
              <h2 className="heading-5 text-weight-medium mb-6">{page.warumHeading}</h2>
              <ul className="flex flex-col gap-3">
                {page.warum.map((w, i) => (
                  <li key={i} className="flex gap-3 opacity-80">
                    <span className="text-[#E0362C]">✓</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="padding-global py-16">
          <div className="w-layout-blockcontainer container w-container">
            <h2 className="heading-4 text-weight-medium mb-6">{page.kostenHeading}</h2>
            <div className="max-w-4xl flex flex-col gap-4 mb-12">
              {page.kosten.map((p, i) => (
                <p key={i} className="opacity-80">{p}</p>
              ))}
            </div>

            <h2 className="heading-5 text-weight-medium mb-6">Häufige Fragen</h2>
            <div className="flex flex-col gap-3 max-w-4xl">
              {page.faqs.map((f) => (
                <details
                  key={f.q}
                  className="border border-[#17171A]/10 rounded-lg bg-white p-6"
                >
                  <summary className="text-weight-medium cursor-pointer">
                    {f.q}
                  </summary>
                  <p className="opacity-80 mt-4">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {page.related?.length > 0 && (
        <section>
          <div className="padding-global py-16">
            <div className="w-layout-blockcontainer container w-container">
              <h2 className="heading-5 text-weight-medium mb-6">Weitere Leistungen</h2>
              <div className="flex flex-wrap gap-4">
                {page.related.map((r) => {
                  const rel = getDePage(r);
                  if (!rel) return null;
                  return (
                    <Link key={r} href={`/de/${r}`} className="text-link text-weight-bold">
                      {rel.badge.split("·")[0].trim()} →
                    </Link>
                  );
                })}
                <Link href="/de" className="text-link text-weight-bold">
                  Alle Leistungen →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
