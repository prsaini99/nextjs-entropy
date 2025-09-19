// app/api/chat/route.ts - LangGraph Multi-Agent Proxy
import { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const LANGGRAPH_API_URL = "https://stackbinary-chatbot-langgraph.onrender.com";

export async function POST(req: NextRequest) {
  let sessionId = "default";
  
  try {
    const { user, session_id } = (await req.json()) as { 
      user: string;
      session_id?: string;
    };

    if (!user || !user.trim()) {
      return new Response(JSON.stringify({ error: "Message is required" }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate session ID if not provided
    sessionId = session_id || `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

    console.log('Proxying to LangGraph API:', LANGGRAPH_API_URL);

    // Proxy request to LangGraph API
    const response = await fetch(`${LANGGRAPH_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: user,
        session_id: sessionId
      }),
    });

    if (!response.ok) {
      throw new Error(`LangGraph API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('LangGraph response:', data);

    // Save lead to Supabase if one was collected
    if (data.lead_collected && data.lead_data) {
      try {
        const leadData = {
          full_name: data.lead_data.name,
          work_email: data.lead_data.email,
          service: data.lead_data.project_details || 'AI/ML Consultation',
          timeline: 'TBD - to be discussed on call',
          phone: data.lead_data.phone_number,
          alternate_contact: data.lead_data.alternate_contact,
          contact_preference: data.lead_data.contact_preference,
          call_arranged: data.lead_data.call_arranged || false,
          calendar_link: data.lead_data.calendar_link,
          status: 'contacted', // Chat leads are automatically contacted
          thread_id: data.session_id,
          language_detected: data.lead_data.language_detected || 'en',
          lead_source: 'chat',
          privacy_consent: true,
          lead_score: 75,
          created_at: new Date().toISOString(),
          utm_source: null,
          utm_medium: null,
          utm_campaign: null,
          utm_term: null,
          utm_content: null
        };

        console.log('Saving lead to Supabase:', leadData);

        const { data: savedLead, error: supabaseError } = await supabaseAdmin
          .from('leads')
          .insert([leadData])
          .select('id')
          .single();

        if (supabaseError) {
          console.error('Supabase error:', supabaseError);
        } else {
          console.log('Lead saved successfully:', savedLead);
        }
      } catch (leadError) {
        console.error('Error saving lead:', leadError);
      }
    }

    // Return the response in the expected format for FloatingChat
    return Response.json({ 
      answer: data.response,
      session_id: data.session_id,
      lead_collected: data.lead_collected,
      lead_data: data.lead_data
    });

  } catch (error) {
    console.error('Chat API proxy error:', error);
    
    // Fallback response
    return Response.json({ 
      answer: "I'm experiencing technical difficulties. Please try again or contact us directly: https://stackbinary.io/contact-us",
      session_id: sessionId,
      lead_collected: false
    }, { status: 500 });
  }
}