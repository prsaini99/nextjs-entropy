// Debug endpoint to check environment variables
// Access at: https://your-site.amplifyapp.com/debug

import { config, debugConfig } from '@/lib/config';

export async function GET() {
  // Debug to console
  debugConfig();
  
  return Response.json({
    message: 'Environment Variables Debug v2',
    processEnv: {
      GROQ_API_KEY: !!process.env.GROQ_API_KEY,
      GROQ_MODEL: process.env.GROQ_MODEL,
      PINECONE_API_KEY: !!process.env.PINECONE_API_KEY,
      PINECONE_INDEX: process.env.PINECONE_INDEX,
      PINECONE_NAMESPACE: process.env.PINECONE_NAMESPACE,
      EMAIL: !!process.env.EMAIL,
      EMAIL_VALUE: process.env.EMAIL,
      EMAIL_PASSWORD: !!process.env.EMAIL_PASSWORD,
      NODE_ENV: process.env.NODE_ENV,
      AWS_REGION: process.env.AWS_REGION
    },
    configUtil: {
      GROQ_API_KEY: !!config.GROQ_API_KEY,
      GROQ_MODEL: config.GROQ_MODEL,
      PINECONE_API_KEY: !!config.PINECONE_API_KEY,
      PINECONE_INDEX: config.PINECONE_INDEX,
      PINECONE_NAMESPACE: config.PINECONE_NAMESPACE,
      EMAIL: !!config.EMAIL,
      EMAIL_VALUE: config.EMAIL,
      EMAIL_PASSWORD: !!config.EMAIL_PASSWORD,
    }
  });
}