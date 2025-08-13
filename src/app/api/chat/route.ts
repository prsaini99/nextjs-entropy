// app/api/chat/route.ts
import { NextRequest } from "next/server";
import { Groq } from "groq-sdk";
import { Pinecone } from "@pinecone-database/pinecone";

const SYSTEM_PROMPT = `
You are StackBinary's assistant.

RULES:
• Answer ONLY using the provided CONTEXT.
• If the CONTEXT does not contain the answer, output exactly: NO_ANSWER
• If you do answer, keep it to 1–2 short sentences, professional and natural, and end with:
  "Book a discovery call here: https://stackbinary.io/contact-us"
• Do NOT ask for personal details. Do NOT mention using a knowledge base.
• Do NOT invent or generalize beyond the CONTEXT.
`.trim();

const FALLBACK =
  "I don't have that info yet. Let's cover it on a quick call: https://stackbinary.io/contact-us";

// --- clients
const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;
const pc = process.env.PINECONE_API_KEY ? new Pinecone({ apiKey: process.env.PINECONE_API_KEY }) : null;

// Initialize index properly for serverless
const index = pc && process.env.PINECONE_INDEX ? pc.index(process.env.PINECONE_INDEX) : null;

export async function POST(req: NextRequest) {
  try {
    // Debug logging for environment variables
    console.log('=== CHAT API DEBUG ===');
    console.log('GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY);
    console.log('GROQ_MODEL:', process.env.GROQ_MODEL);
    console.log('PINECONE_API_KEY exists:', !!process.env.PINECONE_API_KEY);
    console.log('PINECONE_INDEX:', process.env.PINECONE_INDEX);
    console.log('PINECONE_NAMESPACE:', process.env.PINECONE_NAMESPACE);
    console.log('groq client initialized:', !!groq);
    console.log('pc client initialized:', !!pc);
    console.log('index initialized:', !!index);
    
    // Check if required services are configured
    if (!groq || !pc || !index) {
      console.log('Chat services not configured, returning fallback');
      return Response.json({ answer: FALLBACK });
    }

    const { user } = (await req.json()) as { user: string };
    if (!user || !user.trim()) {
      return new Response(JSON.stringify({ error: "Message is required" }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 1) Embed the query using the SAME model you indexed with
    const embedRes = await pc.inference.embed(
      "llama-text-embed-v2",
      [user],
      {
        inputType: "query",
        truncate: "END"
      }
    );
    
    console.log('Embed response:', JSON.stringify(embedRes, null, 2));
    
    // Handle different response structures
    let vector;
    if (embedRes && Array.isArray(embedRes) && embedRes.length > 0 && embedRes[0].values) {
      vector = embedRes[0].values; // 1024-dim
    } else if (embedRes && (embedRes as any).data && Array.isArray((embedRes as any).data) && (embedRes as any).data.length > 0) {
      vector = (embedRes as any).data[0].values || (embedRes as any).data[0].embedding;
    } else if (embedRes && (embedRes as any).values) {
      vector = (embedRes as any).values;
    } else {
      throw new Error('Invalid embedding response structure');
    }

    // 2) Similarity search with threshold gate
    const queryOptions: any = {
      vector,
      topK: 4,
      includeMetadata: true
    };
    
    // Use the namespace method if provided
    const indexToQuery = process.env.PINECONE_NAMESPACE 
      ? index.namespace(process.env.PINECONE_NAMESPACE)
      : index;
    
    const res = await indexToQuery.query(queryOptions);

    console.log('Query results:', JSON.stringify(res, null, 2));
    
    const THRESHOLD = 0.40; // Lowered to 0.40 for testing knowledge base content
    const matches = (res.matches ?? []).filter(m => (m.score ?? 0) >= THRESHOLD);
    
    console.log('Filtered matches:', matches.length, 'with threshold:', THRESHOLD);

    if (!matches.length) {
      return Response.json({ answer: FALLBACK });
    }

    // 3) Build concise CONTEXT from metadata fields you stored
    const context = matches
      .map(m => {
        const meta = m.metadata || {};
        const text =
          (meta.text || meta.pageContent || meta.content || "").toString();
        const title = (meta.title || meta.slug || "").toString();
        return title ? `${title}: ${text}` : text;
      })
      .filter(Boolean)
      .join("\n---\n");

    // 4) Ask Groq (non-streaming so we can enforce NO_ANSWER)
    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL!,
      temperature: 0.2,
      max_tokens: 160,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `CONTEXT:\n${context}\n\nQUESTION:\n${user}` }
      ],
    });

    const answer = completion.choices?.[0]?.message?.content?.trim() || "";
    if (!answer || answer === "NO_ANSWER") {
      return Response.json({ answer: FALLBACK });
    }

    return Response.json({ answer });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ 
      answer: "I'm experiencing technical difficulties. Please try again or contact us directly: https://stackbinary.io/contact-us" 
    }, { status: 500 });
  }
}