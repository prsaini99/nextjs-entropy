import { features } from '@/components/pages/Features/data';
import { getServiceSlug } from '@/utils/slugify';

export const services = features.map((feature, index) => ({
    ...feature,
    id: index + 1,
    // Two slug vocabularies exist and must both survive:
    //   - `slug` (computed from the title) is the ROUTE — these URLs are
    //     indexed by Google and must not change.
    //   - `contentKey` preserves the hand-written short slug from
    //     Features/data.js, which is what serviceContent.js is keyed by.
    // The spread above would otherwise let the computed slug clobber the
    // short one, which broke serviceContent lookups for every service whose
    // two slugs diverge (e.g. data-analytics-bi vs
    // data-analytics-business-intelligence) — pages rendered without their
    // detailed content, and /services cards 404'd. Caught by a Clarity
    // recording of a paid visitor, 2026-08-03.
    contentKey: feature.slug,
    slug: getServiceSlug(feature.title),
    // Enhanced SEO data
    seoTitle: feature.title.length > 60 ? feature.title.substring(0, 57) + '...' : feature.title,
    seoDescription: feature.description.length > 160 ? feature.description.substring(0, 157) + '...' : feature.description,
    keywords: feature.checks.slice(0, 5).join(', '), // Use first 5 checks as keywords
}));

export const getServiceBySlug = (slug) => {
    return services.find(service => service.slug === slug);
};

export const getAllServiceSlugs = () => {
    return services.map(service => service.slug);
};