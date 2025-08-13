import { getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { notFound } from 'next/navigation';

// Generate static params for all service pages
export function generateStaticParams() {
    return getAllServiceSlugs().map((slug) => ({
        slug: slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);
    
    if (!service) {
        return {
            title: 'Service Not Found - Stackbinary.io',
            description: 'The requested service could not be found.',
        };
    }

    return {
        title: `${service.seoTitle} | Stackbinary.io`,
        description: service.seoDescription,
        keywords: service.keywords,
        openGraph: {
            title: `${service.seoTitle} | Stackbinary.io`,
            description: service.seoDescription,
            images: [service.imageSrc],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${service.seoTitle} | Stackbinary.io`,
            description: service.seoDescription,
            images: [service.imageSrc],
        },
    };
}

export default async function ServicePage({ params }) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    return <ServicePageTemplate service={service} />;
}