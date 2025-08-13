import Banner from "@/components/Banner";
import FeaturesWrapper from "@/components/pages/Features/FeaturesWrapper";
import HeroSection from "@/components/pages/Features/HeroSection";
import { features } from "@/components/pages/Features/data";

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
      "https://linkedin.com/company/stackbinary",
      "https://twitter.com/stackbinary",
      "https://github.com/stackbinary"
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
