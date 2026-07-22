import ShopifyShowcase from "@/components/pages/Martech/ShopifyShowcase";
import Banner from "@/components/Banner";

export const metadata = {
  title: "Shopify Websites & E-Commerce Stores | StackBinary™ MarTech",
  description:
    "29+ live Shopify and D2C storefronts we've built — diamond jewellery, sports nutrition, wellness, designer fashion and more. Stores that convert, wired into the marketing stack that fills them.",
  alternates: { canonical: "https://stackbinary.io/martech/shopify-websites" },
  openGraph: {
    title: "Shopify Websites & E-Commerce Stores | StackBinary™ MarTech",
    description:
      "29+ live Shopify and D2C storefronts we've built — from diamond jewellery to D2C wellness.",
    url: "https://stackbinary.io/martech/shopify-websites",
    siteName: "StackBinary",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function ShopifyWebsitesPage() {
  return (
    <>
      <ShopifyShowcase />
      <Banner
        bannerStyle={{
          backgroundImage: "linear-gradient(180deg, #000000, #00000000)",
        }}
        ctaHref="/martech#martech-lead-form"
        ctaLabel="Get a Store & Stack Quote"
        title="Want a Store That Sells?"
        description="Storefront + email automation + ad intelligence + loyalty in one connected system — the store fills the funnel, the stack converts it."
        image="/banner-dev-team.jpg"
      />
    </>
  );
}
