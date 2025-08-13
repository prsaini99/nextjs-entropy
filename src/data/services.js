import { features } from '@/components/pages/Features/data';
import { getServiceSlug } from '@/utils/slugify';

export const services = features.map((feature, index) => ({
    ...feature,
    id: index + 1,
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