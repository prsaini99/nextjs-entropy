import { getAllServiceSlugs } from '@/data/services'
import { getAllAiServiceSlugs } from '@/data/aiServicesPages'
import { getAllMartechSlugs } from '@/data/martechPages'
import { getAllIndustrySlugs } from '@/data/industries'
import { getAllInsightSlugs } from '@/lib/insights'
import { getOpenJobs } from '@/lib/careers'
import { getAllDeSlugs } from '@/data/dePages'

export default function sitemap() {
  const baseUrl = 'https://stackbinary.io'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ai-automation`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/martech`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ]
  
  // Service pages
  const serviceSlugs = getAllServiceSlugs()
  const servicePages = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // US-targeted AI services cluster. Priority 0.9: these are the pages the
  // ranking program is measured on (GSC decision gate ~6 weeks after launch).
  const aiServicePages = getAllAiServiceSlugs().map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  // Martech product pages
  const martechPages = [...getAllMartechSlugs(), 'shopify-websites'].map((slug) => ({
    url: `${baseUrl}/martech/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Industry pages + top-level case studies
  const industryPages = [
    { url: `${baseUrl}/industries`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/case-studies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...getAllIndustrySlugs().map((slug) => ({
      url: `${baseUrl}/industries/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ]

  // Insights articles
  const insightPages = [
    { url: `${baseUrl}/insights`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...getAllInsightSlugs().map((slug) => ({
      url: `${baseUrl}/insights/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ]

  // Career pages
  const careerPages = getOpenJobs().map((job) => ({
    url: `${baseUrl}/careers/${job.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))
  
  // German market cluster. Impressum and Datenschutz stay out on purpose:
  // both are noindex until legally reviewed.
  const dePages = [
    { url: `${baseUrl}/de`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...getAllDeSlugs().map((slug) => ({
      url: `${baseUrl}/de/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })),
  ]

  return [...staticPages, ...servicePages, ...aiServicePages, ...martechPages, ...industryPages, ...insightPages, ...careerPages, ...dePages]
}