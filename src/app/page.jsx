import HeroSection from "@/components/pages/Home/HeroSection";
import Pictures from "@/components/pages/Home/Pictures";
import TransformBussiness from "@/components/pages/Home/TransformBussiness";
import Transformative from "@/components/pages/Home/Transformative";
import IgnitePotential from "@/components/pages/Home/IgnitePotential";
import ElevetBussiness from "@/components/pages/Home/ElevetBussiness";

export const metadata = {
  title: "StackBinary | AI, Cloud & Custom Software Development Company",
  description: "Build faster with AI, cloud and custom software. StackBinary designs, ships and scales secure web & mobile apps, DevOps pipelines, data analytics and chatbots.",
  alternates: { canonical: 'https://stackbinary.io/' },
  openGraph: {
    title: 'StackBinary | AI, Cloud & Custom Software',
    description: 'AI, cloud and custom software that ship and scale.',
    url: 'https://stackbinary.io/',
    siteName: 'StackBinary',
    images: [{ url: '/og-home.jpg' }],
    type: 'website'
  },
  twitter: { card: 'summary_large_image' }
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "StackBinary",
        "url": "https://stackbinary.io/",
        "logo": "https://stackbinary.io/logo.png"
      },
      {
        "@type": "WebSite",
        "url": "https://stackbinary.io/",
        "name": "StackBinary"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do you offer post-launch support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes—managed services, SLAs and iterative improvements."
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
      <HeroSection />
      <Pictures />
      <TransformBussiness />
      <Transformative />
      <IgnitePotential />
      <ElevetBussiness />
    </>
  );
}
