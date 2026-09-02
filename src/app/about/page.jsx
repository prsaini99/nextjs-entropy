import HeroSection from "@/components/pages/About/HeroSection";
import TrustedByAbout from "@/components/pages/About/TrustedByAbout";
import AboutFeatures from "@/components/pages/About/AboutFeatures";
import Team from "@/components/pages/About/Team";
import Banner from "@/components/Banner";
import PhaseCards from "@/components/pages/About/PhaseCards";
import WhyBussinessesTrustUs from "@/components/pages/About/WhyBussinessTrustUs";

export const metadata = {
  title: "About Stackbinary | Engineering-Led AI, Cloud & Software Team",
  description: "Meet the engineering-led team behind Stackbinary. We build AI, cloud and custom software that ships fast, scales reliably and stays secure.",
  alternates: { canonical: 'https://stackbinary.io/about' },
  openGraph: {
    title: 'About Stackbinary | Engineering-Led AI, Cloud & Software Team',
    description: 'Meet the engineering-led team behind Stackbinary. We build AI, cloud and custom software that ships fast, scales reliably and stays secure.',
    url: 'https://stackbinary.io/about',
    siteName: 'Stackbinary',
    type: 'website'
  },
  twitter: { card: 'summary_large_image' }
};

export default function About() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "name": "About Stackbinary",
        "url": "https://stackbinary.io/about",
        "description": "Engineering-led team delivering AI, cloud, DevOps, data analytics and custom software."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://stackbinary.io/"},
          {"@type": "ListItem", "position": 2, "name": "About", "item": "https://stackbinary.io/about"}
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
      <TrustedByAbout />
      <AboutFeatures />
      <PhaseCards />
      {/* <Team /> */}
      <WhyBussinessesTrustUs />
      <Banner
        bannerStyle={{
          backgroundImage: "linear-gradient(180deg, #17171A, #17171A00)"
          // background: 
        }}
        title="Ready to get started?"
        description="Let's build software that ships fast, scales reliably and proves its value in production."
        image="https://res.cloudinary.com/ddnydyvlf/image/upload/f_auto,q_auto/v1/stack-binary-live/about-sec5"
      // subDescription=""Our process is a lot like a great recipe—precise, consistent, and guaranteed to impress (without burning anything).""
      />
    </>
  );
}
