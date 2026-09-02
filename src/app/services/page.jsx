import Link from "next/link";
import Banner from "@/components/Banner";
import FeaturesWrapper from "@/components/pages/Features/FeaturesWrapper";
import HeroSection from "@/components/pages/Features/HeroSection";
import { features } from "@/components/pages/Features/data";
import { getAllAiServiceSlugs, getAiServicePage, aiServiceAnchors } from "@/data/aiServicesPages";

export const metadata = {
  title: "Services Built for Impact - Custom Software, Cloud, AI & More | Stackbinary.io",
  description: "We help you launch faster and operate reliably with AI, cloud, custom software, data analytics, DevOps and more. Expert technology solutions that drive business growth.",
  keywords: "custom software development, cloud migration, cybersecurity, AI machine learning, data analytics, DevOps, automation, web development, IT consulting, blockchain development",
  openGraph: {
    title: "Services Built for Impact | Stackbinary.io",
    description: "We help you launch faster and operate reliably with AI, cloud, custom software, data analytics, DevOps and more.",
    type: "website",
    url: "https://stackbinary.io/services",
    images: [
      {
        url: "https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/sevices/ngnwgqkwckycyz6ms1wz",
        width: 1200,
        height: 630,
        alt: "Stackbinary IT Services - Custom Software, Cloud, AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services Built for Impact | Stackbinary.io",
    description: "We help you launch faster and operate reliably with AI, cloud, custom software, data analytics, DevOps and more.",
    images: ["https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/sevices/ngnwgqkwckycyz6ms1wz"],
  },
  alternates: {
    canonical: "https://stackbinary.io/services",
  },
};

export default function ServicesPage() {
  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Stackbinary",
    "url": "https://stackbinary.io",
    "logo": "https://stackbinary.io/logo.png",
    "description": "We help you launch faster and operate reliably with AI, cloud, custom software, data analytics, DevOps and more.",
    "sameAs": [
      "https://www.linkedin.com/company/stackbinary",
      "https://www.crunchbase.com/organization/stackbinary-7edb",
      "https://www.goodfirms.co/company/stackbinary",
      "https://clutch.co/profile/stackbinary"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "IT Services",
      "itemListElement": features.map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.description,
          "provider": {
            "@type": "Organization",
            "name": "Stackbinary"
          },
          "url": `https://stackbinary.io/services/${service.slug}`,
          "image": service.imageSrc,
          "category": index < 6 ? "Primary Services" : "Specialized Solutions"
        }
      }))
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-XXX-XXX-XXXX",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />

      {/* AI practice cluster. This block is the primary internal-link path
          into the US-targeted AI pages: keyword-bearing anchors from a
          priority page, which matters as much as the sitemap for indexing. */}
      <section>
        <div className="padding-global py-16">
          <div className="w-layout-blockcontainer container w-container">
            <div className="about-features-wrapper">
              <div className="about-features-header">
                <div className="header">
                  <div className="text-size-small text-weight-bold text-[#E0362C] uppercase tracking-wider mb-4">
                    The AI Practice
                  </div>
                  <h2 className="heading-4 text-weight-medium">
                    AI Development, From Strategy to Production
                  </h2>
                  <div className="opacity-80">
                    <div className="max-w-4xl">
                      <p>
                        We design, build and operate AI systems: agents, apps, chatbots,
                        voice and integrations, backed by systems we run in production ourselves.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
                {getAllAiServiceSlugs().map((slug) => {
                  const page = getAiServicePage(slug);
                  return (
                    <Link
                      key={slug}
                      href={`/services/${slug}`}
                      className="border border-[#17171A]/10 rounded-lg p-6 bg-white hover:border-[#E0362C]/60 transition-colors duration-300 flex flex-col gap-2 group"
                    >
                      <span className="text-size-medium text-weight-medium">
                        {aiServiceAnchors[slug]}
                      </span>
                      <span className="text-size-small opacity-70">
                        {page.badge.split("·")[1]?.trim() || ""}
                      </span>
                      <span className="text-[#E0362C] opacity-40 group-hover:opacity-100 transition-opacity mt-auto">
                        →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturesWrapper />
      <Banner
        image="https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/sevices/ngnwgqkwckycyz6ms1wz"
        title="Because first impressions matter, and loading spinners don't."
        description="Our solutions are designed to deliver measurable results and drive growth. Start your journey now and experience the future of technology."
        subDescription="And yes, we'll make sure the tech jargon comes with subtitles."
      />
    </>
  );
}
