import { Metadata } from 'next';
import { jobs } from '@/lib/careers';
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
  // This page is a LIST of roles, not a single role — but it used to declare
  // @type: JobPosting with no title, description or datePosted, which is
  // exactly the three "missing field" errors Search Console reported. A
  // listing page cannot satisfy JobPosting: those fields belong to individual
  // jobs, which each have their own page and their own valid markup.
  //
  // The correct shape is an ItemList pointing at the real postings. Google
  // reads the per-job pages for the Jobs experience; this just describes the
  // collection. It also fixed a second error nobody reported: the old markup
  // hardcoded Bengaluru, while every actual role is Mumbai or remote.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Open roles at StackBinary",
    "itemListElement": jobs.map((job, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://stackbinary.io/careers/${job.slug}`,
      "name": job.title
    }))
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