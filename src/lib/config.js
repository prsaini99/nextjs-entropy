// Runtime configuration utility for environment variables
import getConfig from 'next/config';

// Get runtime config
const { serverRuntimeConfig } = getConfig() || {};

// Fallback to process.env if runtime config not available
export const config = {
  GROQ_API_KEY: serverRuntimeConfig?.GROQ_API_KEY || process.env.GROQ_API_KEY,
  GROQ_MODEL: serverRuntimeConfig?.GROQ_MODEL || process.env.GROQ_MODEL,
  PINECONE_API_KEY: serverRuntimeConfig?.PINECONE_API_KEY || process.env.PINECONE_API_KEY,
  PINECONE_HOST: serverRuntimeConfig?.PINECONE_HOST || process.env.PINECONE_HOST,
  PINECONE_INDEX: serverRuntimeConfig?.PINECONE_INDEX || process.env.PINECONE_INDEX,
  PINECONE_NAMESPACE: serverRuntimeConfig?.PINECONE_NAMESPACE || process.env.PINECONE_NAMESPACE,
  EMAIL: serverRuntimeConfig?.EMAIL || process.env.EMAIL,
  EMAIL_PASSWORD: serverRuntimeConfig?.EMAIL_PASSWORD || process.env.EMAIL_PASSWORD,
};

// Debug function
export function debugConfig() {
  console.log('=== CONFIG DEBUG ===');
  console.log('serverRuntimeConfig available:', !!serverRuntimeConfig);
  Object.keys(config).forEach(key => {
    if (key.includes('PASSWORD') || key.includes('KEY')) {
      console.log(`${key}:`, !!config[key]);
    } else {
      console.log(`${key}:`, config[key]);
    }
  });
}