import ShopifyShowcase from "@/components/pages/Martech/ShopifyShowcase";
import Banner from "@/components/Banner";
import MartechLeadForm from "@/components/pages/Martech/MartechLeadForm";

export const metadata = {
  title: "Shopify Websites & E-Commerce Stores | Stackbinary MarTech",
  description:
    "29+ live Shopify and D2C storefronts we've built, diamond jewellery, sports nutrition, wellness, designer fashion and more. Stores that convert, wired into the marketing stack that fills them.",
  alternates: { canonical: "https://stackbinary.io/martech/shopify-websites" },
  openGraph: {
    title: "Shopify Websites & E-Commerce Stores | Stackbinary MarTech",
    description:
      "29+ live Shopify and D2C storefronts we've built, from diamond jewellery to D2C wellness.",
    url: "https://stackbinary.io/martech/shopify-websites",
    siteName: "Stackbinary",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function ShopifyWebsitesPage() {
  return (
    <>
      <ShopifyShowcase />
      {/* On-page form so the CTAs scroll rather than navigate to /martech. */}
      <section>
        <div className="padding-global py-16">
          <div className="w-layout-blockcontainer container w-container">
            <div className="max-w-3xl mx-auto">
              <MartechLeadForm
                defaultService="Shopify / E-Commerce Store"
                source="martech/shopify-websites"
                heading="Get a Quote for Your Store"
                subheading="Tell us what you need and we'll come back with scope, timeline and cost."
                submitLabel="Get My Store Quote →"
              />
            </div>
          </div>
        </div>
      </section>
      <Banner
        bannerStyle={{
          backgroundImage: "linear-gradient(180deg, #17171A, #17171A00)",
        }}
        ctaHref="#martech-lead-form"
        ctaLabel="Get a Store & Stack Quote"
        title="Want a Store That Sells?"
        description="Storefront + email automation + ad intelligence + loyalty in one connected system, the store fills the funnel, the stack converts it."
        image="/banner-dev-team.jpg"
      />
    </>
  );
}
