import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getJobBySlug, jobs, jobDatePosted, jobValidThrough, isJobOpen } from '@/lib/careers';
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
    title: `${job.title} - ${job.team} | Stackbinary Careers`,
    description: `${job.blurb} Join our ${job.team} team in ${job.location}. ${job.type} position for ${job.experienceLevel} level professionals.`,
    keywords: `${job.title}, ${job.team}, ${job.location}, ${job.type}, careers, jobs, Stackbinary`,
    alternates: { canonical: `https://stackbinary.io/careers/${job.slug}` },
    openGraph: {
      title: `${job.title} - ${job.team} | Stackbinary Careers`,
      description: `${job.blurb} Join our ${job.team} team in ${job.location}.`,
      url: `https://stackbinary.io/careers/${job.slug}`,
      siteName: 'Stackbinary',
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

  // A paused role keeps its page and its indexed URL, but must not emit
  // JobPosting markup or a JSON-LD block: advertising a role we are not
  // currently filling is what gets a site pulled from Google Jobs.
  const open = isJobOpen(job);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    // datePosted is REQUIRED by Google; without it the listing is ineligible
    // for the Jobs experience in Search. validThrough is strongly recommended,
    // since undated listings get treated as stale.
    "datePosted": jobDatePosted(job),
    "validThrough": jobValidThrough(job),
    // Applications are taken on our own site, not a third-party board.
    "directApply": true,
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Stackbinary",
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
      {open && <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />}
      {!open && (
        <section>
          <div className="padding-global pt-28 pb-0">
            <div className="w-layout-blockcontainer container w-container">
              <div className="border border-[#E0362C]/30 rounded-lg p-6 lg:p-8 bg-[#E0362C]/[0.05]">
                <div className="text-size-small text-weight-bold text-[#E0362C] uppercase tracking-wider mb-2">
                  Applications closed
                </div>
                <p className="opacity-80 text-size-medium">
                  We are not accepting applications for this role at the moment.
                  The description stays up so you know what we hire for, and the
                  role reopens in a future round. See what is open right now on
                  our <a href="/careers" className="text-link text-weight-bold">careers page</a>.
                </p>
                {/* LinkedIn's documented opt-out for Limited Listings. The
                    description text is still on this page for SEO, so absence
                    from the sitemap alone is not an explicit enough signal. */}
                <span className="sr-only">#LI-DNI</span>
              </div>
            </div>
          </div>
        </section>
      )}
      <JobDetailsPage job={job} />
    </>
  );
}