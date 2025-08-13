export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://stackbinary.io/sitemap.xml',
  }
}