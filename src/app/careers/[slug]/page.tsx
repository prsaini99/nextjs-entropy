import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getJobBySlug, jobs } from '@/lib/careers';
import JobDetailsPage from '@/components/careers/JobDetailsPage';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    return {
      title: 'Job Not Found',
    };
  }

  return {
    title: `${job.title} - ${job.team} | StackBinary Careers`,
    description: `${job.blurb} Join our ${job.team} team in ${job.location}. ${job.type} position for ${job.experienceLevel} level professionals.`,
    keywords: `${job.title}, ${job.team}, ${job.location}, ${job.type}, careers, jobs, StackBinary`,
    alternates: { canonical: `https://stackbinary.io/careers/${job.slug}` },
    openGraph: {
      title: `${job.title} - ${job.team} | StackBinary Careers`,
      description: `${job.blurb} Join our ${job.team} team in ${job.location}.`,
      url: `https://stackbinary.io/careers/${job.slug}`,
      siteName: 'StackBinary',
      type: 'website'
    },
    twitter: { card: 'summary_large_image' }
  };
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "hiringOrganization": {
      "@type": "Organization",
      "name": "StackBinary",
      "sameAs": "https://stackbinary.io"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location === "Remote (India)" ? "India" : job.location,
        "addressCountry": "IN"
      }
    },
    "employmentType": job.type === "Full-time" ? "FULL_TIME" : "PART_TIME",
    "experienceRequirements": job.experienceLevel,
    "jobBenefits": "Flexible hours, Remote-friendly, Learning budget, High-ownership projects, Pragmatic engineering culture",
    "url": `https://stackbinary.io/careers/${job.slug}`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <JobDetailsPage job={job} />
    </>
  );
}