import MumbaiLanding from "@/components/pages/Mumbai/MumbaiLanding";
import Banner from "@/components/Banner";

export const metadata = {
  title: "Software Development Company in Mumbai | StackBinary™ — AI, Web, Mobile & MarTech",
  description:
    "Mumbai-based software development company in Kandivali East. 55+ products shipped for Mumbai Indians, Reliance Entertainment, Sony Pictures, Piramal and global brands. AI, web, mobile, e-commerce and marketing technology.",
  alternates: { canonical: "https://stackbinary.io/software-development-company-mumbai" },
  openGraph: {
    title: "Software Development Company in Mumbai | StackBinary™",
    description:
      "Mumbai-based, AI-native software studio — 55+ products for Mumbai Indians, Reliance, Sony and global brands.",
    url: "https://stackbinary.io/software-development-company-mumbai",
    siteName: "StackBinary",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function MumbaiPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://stackbinary.io/#mumbai-office",
        name: "StackBinary",
        description:
          "AI-native software development and marketing technology company in Mumbai — web, mobile, AI/ML, e-commerce and martech engineering.",
        url: "https://stackbinary.io/software-development-company-mumbai",
        email: "contact@stackbinary.io",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Spring Grove Towers, Kandivali East",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          postalCode: "400101",
          addressCountry: "IN",
        },
        geo: { "@type": "GeoCoordinates", latitude: 19.2095, longitude: 72.8712 },
        areaServed: [
          { "@type": "City", name: "Mumbai" },
          { "@type": "Country", name: "India" },
        ],
        knowsAbout: [
          "Custom software development",
          "Marketing technology",
          "AI and machine learning",
          "E-commerce development",
          "Mobile app development",
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://stackbinary.io/" },
          {
            "@type": "ListItem",
            position: 2,
            name: "Software Development Company in Mumbai",
            item: "https://stackbinary.io/software-development-company-mumbai",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Which software development company in Mumbai has worked with big brands?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "StackBinary has shipped products for Mumbai Indians, Reliance Entertainment, Sony Pictures, Piramal and Future Group, alongside global brands like Abbott, Philips, KFC and Steve Madden — 55+ products across 8 industries.",
            },
          },
          {
            "@type": "Question",
            name: "What does custom software development cost in Mumbai?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A focused first release typically starts around ₹5–15 Lakh and ships in 6–12 weeks; larger platforms range ₹15–40 Lakh and above, scoped precisely after a free discovery call.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <MumbaiLanding />
      <Banner
        bannerStyle={{
          backgroundImage: "linear-gradient(180deg, #000000, #00000000)",
        }}
        title="Building Something in Mumbai?"
        description="Book a discovery call — at our Kandivali East office or yours. We'll show you the closest thing we've already shipped."
        image="/banner-dev-team.jpg"
      />
    </>
  );
}
