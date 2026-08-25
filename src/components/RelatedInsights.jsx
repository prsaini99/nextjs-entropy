import Link from "next/link";
import { getAllInsights } from "@/lib/insights";

/**
 * Visible "further reading" strip linking to /insights articles.
 *
 * This exists for crawl reasons as much as reader ones. Search Console on
 * 2026-08-24 showed every page in the AI services cluster listing ONLY
 * sitemap.xml as its referring URL, all last crawled in a single batch on
 * Aug 16 and not revisited since, while /careers/ai-engineering-intern (which
 * carries a real external link) gets crawled several times a day. A sitemap
 * entry is an invitation Google can decline, and for /services/ai-agent-
 * development it did: that URL is still "unknown to Google" weeks after
 * launch. Links from pages Google already crawls often are the fix.
 *
 * Deliberately a server component: getAllInsights() reads the filesystem, and
 * both AIServicePage and MartechProductPage are client components, so this is
 * composed into the server route pages alongside them rather than inside them.
 *
 * Everything here renders visibly. A link a reader cannot see is a link Google
 * is entitled to distrust, and the whole point is that these are genuinely
 * useful next reads.
 */
export default function RelatedInsights({
  slugs = [],
  heading = "Further Reading",
  intro,
  limit = 3,
}) {
  const all = getAllInsights();

  // Named slugs first, in the order given, then fill from newest so a page
  // never renders a half-empty row if an article is renamed or removed.
  const picked = [];
  for (const slug of slugs) {
    const match = all.find((i) => i.slug === slug);
    if (match) picked.push(match);
  }
  for (const insight of all) {
    if (picked.length >= limit) break;
    if (!picked.some((p) => p.slug === insight.slug)) picked.push(insight);
  }

  const items = picked.slice(0, limit);
  if (!items.length) return null;

  return (
    <section>
      <div className="padding-global py-16">
        <div className="w-layout-blockcontainer container w-container">
          <div className="flex flex-col gap-2 mb-8">
            <div className="text-size-small text-weight-bold text-[#E0362C] uppercase tracking-wider">
              From Our Insights
            </div>
            <h2 className="heading-5 text-weight-medium">{heading}</h2>
            {intro && <p className="opacity-80 max-w-3xl">{intro}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {items.map((insight) => (
              <Link
                key={insight.slug}
                href={`/insights/${insight.slug}`}
                className="border border-gray-200 rounded-lg p-8 bg-[#F7F7F5] hover:border-[#E0362C]/60 transition-colors duration-300 flex flex-col gap-3 group"
              >
                <h3 className="text-size-large text-weight-medium">
                  {insight.title}
                </h3>
                <p className="text-size-small opacity-80">
                  {insight.description}
                </p>
                <span className="mt-auto pt-3 text-size-small text-[#E0362C] text-weight-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Read →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/insights" className="text-link text-weight-bold">
              See all insights →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
