/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: there is deliberately no `env` block here.
  //
  // It used to list EMAIL, EMAIL_PASSWORD and the (now removed) GROQ/PINECONE
  // keys. Next's `env` config does not forward variables — it *inlines* them as
  // literals at build time. Verified by building with a canary value: the literal
  // appeared inside .next/server/app/api/contact/route.js.
  //
  // That turns every `process.env.EMAIL` read into a build-time constant, so a
  // value present only in the runtime environment can never take effect. Any
  // build that ran without EMAIL set produced a bundle with `undefined` baked in
  // permanently — which is the likely cause of contact-form notifications
  // silently not sending.
  //
  // Server code reads process.env natively at runtime. Nothing needs this block.
  //
  // `serverRuntimeConfig` is also gone: it is a Pages Router API, inert under the
  // App Router, and its only consumer (src/lib/config.js) was dead code.

  // Optimize for serverless deployment
  output: 'standalone',

  // /privacy was a duplicate policy page, deleted July 2026 in favour of
  // /privacy-policy (the URL the footer and consent line always linked). It had
  // been in the sitemap since Dec 2025, so search engines may hold the URL —
  // redirect rather than 404 it.
  async redirects() {
    return [
      {
        source: '/privacy',
        destination: '/privacy-policy',
        permanent: true,
      },
    ];
  },

  // Image optimization. `domains` is deprecated in favour of remotePatterns,
  // which already covers both hosts.
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
