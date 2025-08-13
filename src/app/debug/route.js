// Debug endpoint to check environment variables
// Access at: https://your-site.amplifyapp.com/api/debug

export async function GET() {
  return Response.json({
    message: 'Environment Variables Debug',
    env: {
      GROQ_API_KEY: !!process.env.GROQ_API_KEY,
      GROQ_MODEL: process.env.GROQ_MODEL,
      PINECONE_API_KEY: !!process.env.PINECONE_API_KEY,
      PINECONE_INDEX: process.env.PINECONE_INDEX,
      PINECONE_NAMESPACE: process.env.PINECONE_NAMESPACE,
      EMAIL: !!process.env.EMAIL,
      EMAIL_VALUE: process.env.EMAIL,
      EMAIL_PASSWORD: !!process.env.EMAIL_PASSWORD,
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      AWS_REGION: process.env.AWS_REGION
    }
  });
}