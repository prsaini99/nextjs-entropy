import HeroSection from "@/components/pages/HireDevelopers/HeroSection";
import EngagementModels from "@/components/pages/HireDevelopers/EngagementModels";
import ExpertiseFeatures from "@/components/pages/HireDevelopers/ExpertiseFeatures";
import ProcessCards from "@/components/pages/HireDevelopers/ProcessCards";
import Banner from "@/components/Banner";

export const metadata = {
  title: "Hire Developers | StackBinary™ - Scale Your Development Team",
  description: "Get access to skilled developers for your projects. Flexible engagement models from project-based to long-term partnerships.",
  alternates: { canonical: 'https://stackbinary.io/hire-developers' },
  openGraph: {
    title: 'Hire Developers | StackBinary™ - Scale Your Development Team',
    description: 'Get access to skilled developers for your projects. Flexible engagement models from project-based to long-term partnerships.',
    url: 'https://stackbinary.io/hire-developers',
    siteName: 'StackBinary',
    type: 'website'
  },
  twitter: { card: 'summary_large_image' }
};

export default function HireDevelopersPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": "Hire Developers - StackBinary",
        "url": "https://stackbinary.io/hire-developers",
        "description": "Scale your development team with skilled developers. Flexible engagement models for all project types."
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://stackbinary.io/"},
          {"@type": "ListItem", "position": 2, "name": "Hire Developers", "item": "https://stackbinary.io/hire-developers"}
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

      <EngagementModels />

      <ExpertiseFeatures />

      <ProcessCards />

      <Banner
        bannerStyle={{
          backgroundImage: "linear-gradient(180deg, #000000, #00000000)"
        }}
        title="Ready to Scale Your Development?"
        description="Let's discuss how our skilled developers can help accelerate your project and bring your vision to life."
        image="/banner-dev-team.jpg"
      />
    </>
  );
}