import { Metadata } from 'next';
import CareersHeroSection from '@/components/careers/CareersHeroSection';
import WhyJoinUs from '@/components/careers/WhyJoinUs';
import OpenRoles from '@/components/careers/OpenRoles';
import HiringProcess from '@/components/careers/HiringProcess';

export const metadata: Metadata = {
  title: "Careers at StackBinary | Join Our Engineering Team",
  description: "We hire builders who love shipping, care about reliability and sweat the details. Join our team building AI, cloud and modern software solutions.",
  keywords: "careers, jobs, engineering, software developer, AI engineer, cloud architect, remote work, Bengaluru jobs",
  alternates: { canonical: 'https://stackbinary.io/careers' },
  openGraph: {
    title: 'Careers at StackBinary | Join Our Engineering Team',
    description: 'We hire builders who love shipping, care about reliability and sweat the details. Join our team building AI, cloud and modern software solutions.',
    url: 'https://stackbinary.io/careers',
    siteName: 'StackBinary',
    type: 'website'
  },
  twitter: { card: 'summary_large_image' }
};

export default function CareersPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "StackBinary",
      "sameAs": "https://stackbinary.io"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bengaluru",
        "addressCountry": "IN"
      }
    },
    "employmentType": "FULL_TIME",
    "jobBenefits": "Flexible hours, Remote-friendly, Learning budget, High-ownership projects, Pragmatic engineering culture"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CareersHeroSection />
      <WhyJoinUs />
      <OpenRoles />
      <HiringProcess />
    </>
  );
}