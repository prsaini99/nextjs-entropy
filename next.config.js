/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly define environment variables for runtime
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    GROQ_MODEL: process.env.GROQ_MODEL,
    PINECONE_API_KEY: process.env.PINECONE_API_KEY,
    PINECONE_HOST: process.env.PINECONE_HOST,
    PINECONE_INDEX: process.env.PINECONE_INDEX,
    PINECONE_NAMESPACE: process.env.PINECONE_NAMESPACE,
    EMAIL: process.env.EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  },
  
  // Ensure environment variables are available in API routes
  serverRuntimeConfig: {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    GROQ_MODEL: process.env.GROQ_MODEL,
    PINECONE_API_KEY: process.env.PINECONE_API_KEY,
    PINECONE_HOST: process.env.PINECONE_HOST,
    PINECONE_INDEX: process.env.PINECONE_INDEX,
    PINECONE_NAMESPACE: process.env.PINECONE_NAMESPACE,
    EMAIL: process.env.EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  },

  // Optimize for serverless deployment
  output: 'standalone',
  
  // Image optimization
  images: {
    unoptimized: false,
    domains: ['res.cloudinary.com', 'cdn.prod.website-files.com'],
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
      }
    ]
  },
};

module.exports = nextConfig;