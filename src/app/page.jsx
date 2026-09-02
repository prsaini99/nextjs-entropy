import LandingV2 from "@/components/v2/LandingV2";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";

export const metadata = {
  title: "Stackbinary | AI, Cloud & Custom Software Development Company",
  description: "Build faster with AI, cloud and custom software. Stackbinary designs, ships and scales secure web & mobile apps, DevOps pipelines, data analytics and chatbots.",
  alternates: { canonical: 'https://stackbinary.io/' },
  openGraph: {
    title: 'Stackbinary | AI, Cloud & Custom Software',
    description: 'AI, cloud and custom software that ship and scale.',
    url: 'https://stackbinary.io/',
    siteName: 'Stackbinary',
    images: [{ url: '/og-home.jpg' }],
    type: 'website'
  },
  twitter: { card: 'summary_large_image' }
};

// The scroll-film landing ("The Thread") is the production homepage as of
// 2026-09-02. It composes its own chrome: ConditionalLayout renders "/"
// bare, the film owns the viewport, and the Footer sits on a solid layer
// so the fixed video cannot bleed through.
export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://stackbinary.io/#organization",
        "name": "Stackbinary",
        "url": "https://stackbinary.io/",
        "logo": "https://stackbinary.io/logo.png",
        "email": "contact@stackbinary.io",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Spring Grove Towers, Kandivali East",
          "addressLocality": "Mumbai",
          "addressRegion": "Maharashtra",
          "postalCode": "400101",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.linkedin.com/company/stackbinary",
          "https://www.crunchbase.com/organization/stackbinary-7edb",
          "https://www.goodfirms.co/company/stackbinary",
          "https://clutch.co/profile/stackbinary"
        ]
      },
      {
        "@type": "WebSite",
        "url": "https://stackbinary.io/",
        "name": "Stackbinary"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do you offer post-launch support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, managed services, SLAs and iterative improvements."
            }
          },
          {
            "@type": "Question",
            "name": "Which stacks/clouds do you support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Node.js, Python, Java, React/Next.js, Flutter; AWS, Azure, GCP."
            }
          },
          {
            "@type": "Question",
            "name": "How do projects start?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "With a discovery call and a short workshop to define scope, timeline and success metrics."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LandingV2 />
      <div style={{ position: "relative", zIndex: 3, background: "#FAF8F4" }}>
        <Footer />
      </div>
      <FloatingChat />
    </>
  );
}
