// Debug script to test environment variables locally
// Run with: node debug-env.js

console.log('=== LOCAL ENVIRONMENT DEBUG ===');
console.log('GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY);
console.log('GROQ_MODEL:', process.env.GROQ_MODEL);
console.log('PINECONE_API_KEY exists:', !!process.env.PINECONE_API_KEY);
console.log('PINECONE_INDEX:', process.env.PINECONE_INDEX);
console.log('PINECONE_NAMESPACE:', process.env.PINECONE_NAMESPACE);
console.log('EMAIL exists:', !!process.env.EMAIL);
console.log('EMAIL value:', process.env.EMAIL);
console.log('EMAIL_PASSWORD exists:', !!process.env.EMAIL_PASSWORD);

// Test if we can create clients
try {
  const { Groq } = require('groq-sdk');
  const { Pinecone } = require('@pinecone-database/pinecone');
  
  if (process.env.GROQ_API_KEY) {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    console.log('✅ Groq client created successfully');
  } else {
    console.log('❌ Cannot create Groq client - missing API key');
  }
  
  if (process.env.PINECONE_API_KEY) {
    const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    console.log('✅ Pinecone client created successfully');
  } else {
    console.log('❌ Cannot create Pinecone client - missing API key');
  }
  
} catch (error) {
  console.log('❌ Error creating clients:', error.message);
}