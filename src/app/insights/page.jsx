import Link from "next/link";
import { getAllInsights } from "@/lib/insights";
import Banner from "@/components/Banner";

export const metadata = {
  title: "Insights, Practical Answers from 55+ Shipped Products | StackBinary™",
  description:
    "Build-vs-buy math, cost breakdowns and technical deep dives, written from real projects and real numbers, not theory.",
  alternates: { canonical: "https://stackbinary.io/insights" },
};

export const dynamic = "force-static";

export default function InsightsPage() {
  const insights = getAllInsights();

  return (
    <>
      <section>
        <div className="padding-global">
          <div className="w-layout-blockcontainer container w-container">
            <div className="hero-wrapper">
              <div className="hero-component">
                <div className="read-more-tag w-inline-block">
                  <div className="text-size-small text-weight-bold text-[#E0362C]">
                    Insights · From the Practice, Not the SERP
                  </div>
                </div>
                <div className="flex flex-col items-center gap-10">
                  <h1 className="heading-3 text-weight-bold max-w-5xl">
                    Practical Answers, Backed by Shipped Work
                  </h1>
                  <div className="max-w-4xl">
                    <p className="opacity-80">
                      Build-vs-buy math, real cost ranges and technical deep
                      dives, every article grounded in the 55+ products
                      we&apos;ve actually delivered.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="padding-global py-16">
          <div className="w-layout-blockcontainer container w-container">
            {insights.length === 0 ? (
              <p className="opacity-70 text-center">First articles landing soon.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {insights.map((insight) => (
                  <Link
                    key={insight.slug}
                    href={`/insights/${insight.slug}`}
                    className="border border-gray-200 rounded-lg p-8 bg-[#F7F7F5] hover:border-[#E0362C]/60 transition-colors duration-300 flex flex-col gap-3 group"
                  >
                    <div className="text-size-small opacity-40">
                      {new Date(insight.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <h2 className="text-size-large text-weight-medium">
                      {insight.title}
                    </h2>
                    <p className="text-size-small opacity-80">
                      {insight.description}
                    </p>
                    <span className="mt-auto pt-3 text-size-small text-[#E0362C] text-weight-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Read →
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <Banner
        bannerStyle={{ backgroundImage: "linear-gradient(180deg, #000000, #00000000)" }}
        title="Have the Question These Articles Answer?"
        description="Book a discovery call, we'll give you the specific answer for your case, from work we've already shipped."
        image="/banner-dev-team.jpg"
      />
    </>
  );
}
