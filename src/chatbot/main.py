"""Multi-Agent Lead Generation System - Production Ready

This is the main production script for the Stack Binary lead generation system.
Built with LangGraph for orchestrating multiple specialized agents:
- RAG Agent: Answers questions about Stack Binary services
- Discovery Agent: Schedules discovery calls with calendar integration  
- Browsing Agent: Performs web searches for external information
- Lead Collector Agent: Collects missing contact information

The system's primary goal is lead qualification and discovery call scheduling.
"""

import os
import re
import httpx
import langdetect
from typing import TypedDict, Annotated, Sequence, Optional, Literal, Dict, Any, List
from dotenv import load_dotenv

from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from langchain_core.tools import tool
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.tools.tavily_search import TavilySearchResults

from langgraph.graph import StateGraph, END, START
from langgraph.prebuilt import create_react_agent
from langgraph.types import interrupt
from langgraph.graph.message import add_messages
from langgraph.types import Command

from pinecone import Pinecone
import dns.resolver
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import sqlite3
from datetime import datetime
import json

# Load environment variables
load_dotenv()

# ========================================
# PINECONE RAG TOOL
# ========================================

# Pinecone globals
pinecone_client = None
index = None
embeddings = None

def initialize_pinecone(pc_client, index_name: str):
    """Initialize Pinecone client, index and embeddings"""
    global pinecone_client, index, embeddings
    pinecone_client = pc_client
    host = os.getenv("PINECONE_HOST")
    if host:
        index = pc_client.Index(name=index_name, host=host)
    else:
        index = pc_client.Index(index_name)
    
    embeddings = OpenAIEmbeddings(
        model="text-embedding-3-small",
        dimensions=1024
    )

@tool
def rag_search(query: str) -> str:
    """Search the Pinecone knowledge base for Stack Binary information"""
    if not index or not embeddings:
        return "Error: Pinecone index or embeddings not initialized. Please contact support."
    
    try:
        query_embedding = embeddings.embed_query(query)
        results = index.query(
            vector=query_embedding,
            top_k=5,
            include_metadata=True,
            namespace=os.getenv("PINECONE_NAMESPACE", "")
        )
        
        min_score = 0.35
        filtered_matches = [match for match in results.matches if match.score >= min_score]
        
        if not filtered_matches:
            return f"No relevant information found above similarity threshold {min_score}."
        
        context_parts = []
        for i, match in enumerate(filtered_matches, 1):
            metadata = match.metadata or {}
            text = metadata.get("text", "") or metadata.get("content", "") or metadata.get("a", "")
            title = metadata.get("title", "") or metadata.get("service_type", "")
            source = metadata.get("source", "") or metadata.get("category", "Unknown")
            score = match.score
            
            if text:
                context_part = f"[Result {i} - Relevance: {score:.2f}]"
                if title:
                    context_part += f"\nTitle: {title}"
                if source and source != "Unknown":
                    context_part += f"\nCategory: {source}"
                context_part += f"\nContent: {text}\n"
                context_parts.append(context_part)
        
        return "\n".join(context_parts)
        
    except Exception as e:
        return f"Error searching knowledge base: {str(e)}. Please try again or contact support."

# ========================================
# WEB SEARCH TOOL  
# ========================================

tavily_search = TavilySearchResults(
    max_results=5,
    search_depth="advanced",
    include_answer=True,
    include_raw_content=False,
    include_images=False
)

@tool
def web_search(query: str) -> List[Dict[str, Any]]:
    """Search the web for information using Tavily API"""
    if not os.getenv("TAVILY_API_KEY"):
        return [{
            "error": "Tavily API key not configured",
            "success": False
        }]
    
    try:
        results = tavily_search.invoke({"query": query})
        formatted_results = []
        for result in results:
            formatted_results.append({
                "title": result.get("title", ""),
                "url": result.get("url", ""),
                "content": result.get("content", ""),
                "score": result.get("score", 0)
            })
        return formatted_results
        
    except Exception as e:
        return [{
            "error": f"Error performing web search: {str(e)}",
            "success": False
        }]

# ========================================
# LOCAL SQLITE DATABASE INTEGRATION
# ========================================

# Initialize SQLite database
DB_PATH = "leads.db"

def init_database():
    """Initialize SQLite database with leads table"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Create leads table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            project_details TEXT,
            alternate_contact TEXT,
            phone_number TEXT,
            contact_preference TEXT,
            call_arranged BOOLEAN,
            calendar_link TEXT,
            lead_status TEXT,
            created_at TIMESTAMP,
            thread_id TEXT,
            language_detected TEXT,
            UNIQUE(email)
        )
    ''')
    
    conn.commit()
    conn.close()
    print(f"✓ SQLite database initialized at {DB_PATH}")

# Initialize database on startup
init_database()

def save_lead_to_database(lead_data: dict) -> bool:
    """Save lead information to local SQLite database"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # Prepare lead data for database
        cursor.execute('''
            INSERT OR REPLACE INTO leads (
                name, email, project_details, alternate_contact,
                phone_number, contact_preference, call_arranged,
                calendar_link, lead_status, created_at, thread_id,
                language_detected
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            lead_data.get("person_name"),
            lead_data.get("email_address"),
            lead_data.get("meeting_agenda"),
            lead_data.get("alternate_contact"),
            lead_data.get("phone_number"),
            lead_data.get("contact_preference"),
            lead_data.get("call_arranged", False),
            lead_data.get("calendar_link"),
            lead_data.get("lead_status", "initial"),
            datetime.now().isoformat(),
            lead_data.get("thread_id"),
            lead_data.get("language_detected", "en")
        ))
        
        conn.commit()
        conn.close()
        
        print(f"✓ Lead saved to local database: {lead_data.get('person_name')} - {lead_data.get('email_address')}")
        return True
        
    except sqlite3.IntegrityError:
        print(f"⚠ Lead already exists in database: {lead_data.get('email_address')}")
        return False
    except Exception as e:
        print(f"❌ Error saving lead to database: {e}")
        return False

def get_all_leads() -> list:
    """Retrieve all leads from the database"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT * FROM leads ORDER BY created_at DESC
        ''')
        
        columns = [description[0] for description in cursor.description]
        leads = []
        for row in cursor.fetchall():
            leads.append(dict(zip(columns, row)))
        
        conn.close()
        return leads
        
    except Exception as e:
        print(f"❌ Error retrieving leads: {e}")
        return []

# ========================================
# CALENDAR TOOL
# ========================================

@tool
def generate_calendar_link(
    email_address: Optional[str] = None,
    person_name: Optional[str] = None,
    meeting_agenda: Optional[str] = None
) -> str:
    """Generate a personalized Calendly link with user's email pre-filled"""
    
    # Check if required fields are provided
    if not email_address or not person_name or not meeting_agenda:
        missing = []
        if not email_address:
            missing.append("email address")
        if not person_name:
            missing.append("name")
        if not meeting_agenda:
            missing.append("project details")
        return f"Missing required information: {', '.join(missing)}. Please provide these details first."
    
    # Validate email format and DNS
    if not is_valid_email(email_address):
        return f"❌ Invalid email: '{email_address}'. Either the format is incorrect or the domain doesn't have a valid mail server. Please provide a valid business email address."
    
    # Get the base Calendly URL from environment
    calendly_url = os.getenv("CALENDLY_URL", "https://calendly.com/prateek-stackbinary")
    
    # Create personalized Calendly link with pre-filled email and name
    import urllib.parse
    
    # URL encode the parameters
    encoded_email = urllib.parse.quote(email_address)
    encoded_name = urllib.parse.quote(person_name)
    
    # Build the personalized Calendly link
    calendar_link = f"{calendly_url}?email={encoded_email}&name={encoded_name}"
    
    return f"✅ Personalized calendar link created! You can book your discovery call here: {calendar_link}\n\nI'll also send you an email with this link and all the details."

# ========================================
# EMAIL TOOL
# ========================================

@tool
def send_email_with_calendar(
    project_details: Optional[str] = None,
    email_address: Optional[str] = None,
    person_name: Optional[str] = None,
    calendar_link: Optional[str] = None
) -> str:
    """Send an email with calendar link and project details"""
    
    # Check if required fields are provided
    if not project_details or not email_address or not person_name or not calendar_link:
        missing = []
        if not project_details:
            missing.append("project details")
        if not email_address:
            missing.append("email address")
        if not person_name:
            missing.append("name")
        if not calendar_link:
            missing.append("calendar link")
        return f"Missing required information: {', '.join(missing)}. Cannot send email without these details."
    
    # Validate email format and DNS
    if not is_valid_email(email_address):
        return f"❌ Invalid email: '{email_address}'. Either the format is incorrect or the domain doesn't have a valid mail server. Please provide a valid business email address."
    
    # Use SMTP credentials instead of SendGrid API
    smtp_server = os.getenv("SMTP_SERVER")
    smtp_port = os.getenv("SMTP_PORT")
    smtp_username = os.getenv("SMTP_USERNAME")
    smtp_password = os.getenv("SMTP_PASSWORD")
    
    if not all([smtp_server, smtp_port, smtp_username, smtp_password]):
        return "❌ Email service not configured. Please contact our team directly for next steps."
    
    try:
        email_subject = f"Discovery Call Invitation - {person_name}"
        email_body = f"""Dear {person_name},

Thank you for your interest in Stack Binary! Based on our conversation, here are the project details we discussed:

{project_details}

To move forward, I'd like to schedule a discovery call with you to better understand your requirements and how we can help you achieve your goals.

Please use the following link to schedule a time that works best for you:
{calendar_link}

The call will be 30 minutes, and we'll discuss:
• Your specific requirements and goals
• How our platform can address your needs
• Next steps and timeline
• Any questions you may have

Looking forward to speaking with you soon!

Best regards,
Prateek Saini
Stack Binary Team
"""
        
        # Create message
        msg = MIMEMultipart()
        msg['From'] = smtp_username
        msg['To'] = email_address
        msg['Subject'] = email_subject
        
        # Add body to email
        msg.attach(MIMEText(email_body, 'plain'))
        
        # Gmail SMTP configuration
        server = smtplib.SMTP(smtp_server, int(smtp_port))
        server.starttls()  # Enable security
        server.login(smtp_username, smtp_password)
        text = msg.as_string()
        server.sendmail(smtp_username, email_address, text)
        server.quit()
        
        return f"✅ Perfect! I've sent a detailed email to {person_name} at {email_address} with:\n\n📧 Discovery call invitation\n🔗 Calendar booking link\n📋 Project details summary\n\nThey should receive it shortly and can book a convenient time for the discovery call!"
                
    except Exception as e:
        print(f"[DEBUG] send_email_with_calendar error: {str(e)}")
        return f"❌ Error sending email: {str(e)}. Please contact our team directly for next steps."

# ========================================
# PINECONE SETUP
# ========================================

def setup_pinecone():
    """Initialize Pinecone for RAG functionality"""
    try:
        pinecone_api_key = os.getenv("PINECONE_API_KEY")
        pinecone_index_name = os.getenv("PINECONE_INDEX_NAME", "stackbinary-kb")
        if pinecone_api_key:
            pc = Pinecone(api_key=pinecone_api_key)
            initialize_pinecone(pc, pinecone_index_name)
            print(f"✓ Pinecone initialized with index: {pinecone_index_name}")
    except Exception as e:
        print(f"⚠ Pinecone initialization skipped: {e}")

setup_pinecone()

# ========================================
# STATE SCHEMA
# ========================================

class AgentState(TypedDict):
    """State schema for lead qualification system"""
    messages: Annotated[Sequence[BaseMessage], add_messages]
    # Lead qualification fields
    email_address: Optional[str]
    person_name: Optional[str]
    meeting_agenda: Optional[str]
    calendar_link: Optional[str]
    lead_status: Optional[str]
    call_arranged: Optional[bool]  # Primary goal - true when discovery call is scheduled
    # Control fields
    next: Optional[str]  # Next agent to route to
    reasoning: Optional[str]  # Reasoning for routing
    step_count: Optional[int]  # Track number of iterations to prevent infinite loops
    contact_preference: Optional[str]  # 'self-schedule' or 'team-reach-out'
    alternate_contact: Optional[str]  # phone/WhatsApp/LinkedIn or any other contact
    phone_number: Optional[str]  # Dedicated phone number field
    phone_collection_attempts: Optional[int]  # Track how many times we've asked for phone
    
# ========================================
# LEAD VALIDATION HELPERS
# ========================================

def is_valid_email(email: Optional[str]) -> bool:
    if not email:
        return False
    if not re.match(r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$", email):
        return False
    try:
        domain = email.split('@')[1]
        mx_records = dns.resolver.resolve(domain, 'MX')
        return len(mx_records) > 0
    except (dns.resolver.NXDOMAIN, dns.resolver.NoAnswer, Exception):
        return False

@tool
def validate_email_address(email: str) -> dict:
    """
    Validate if an email address is properly formatted and has a valid domain.
    Use this tool to check if an email provided by the user is valid before asking them to provide it again.
    
    Args:
        email: The email address to validate
    
    Returns:
        Dictionary with validation result and feedback message
    """
    result = {
        "email": email,
        "is_valid": False,
        "feedback": ""
    }
    
    if not email or not email.strip():
        result["feedback"] = "No email address provided"
        return result
        
    email = email.strip()
    
    # Basic format validation
    if not re.match(r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$", email):
        result["feedback"] = "Invalid email format. Please provide a valid email like user@domain.com"
        return result
    
    # DNS MX record check
    try:
        domain = email.split('@')[1]
        mx_records = dns.resolver.resolve(domain, 'MX')
        if len(mx_records) > 0:
            result["is_valid"] = True
            result["feedback"] = "Valid email address"
        else:
            result["feedback"] = f"Domain '{domain}' does not appear to accept emails"
    except (dns.resolver.NXDOMAIN, dns.resolver.NoAnswer):
        result["feedback"] = f"Domain '{domain}' does not exist or cannot receive emails"
    except Exception as e:
        result["feedback"] = f"Could not verify domain '{domain}' - please double-check the email address"
    
    return result


def missing_lead_fields(state: dict) -> list:
    """Return list of keys missing from the lead info.
    Always require some form of contact (email OR alternate contact)."""
    missing = []
    if not state.get("person_name"):
        missing.append("person_name")
    
    # Check contact information
    has_valid_email = is_valid_email(state.get("email_address"))
    has_alt_contact = bool(state.get("alternate_contact"))
    is_team_reach_out = state.get("contact_preference") == "team-reach-out"
    
    # Require contact information based on preference
    if is_team_reach_out:
        # For team reach-out, require alternate contact if no email
        if not has_valid_email and not has_alt_contact:
            missing.append("alternate_contact")
    else:
        # For self-scheduling, require email (alternate contact can substitute)
        if not has_valid_email and not has_alt_contact:
            missing.append("email_address")
    
    if not state.get("meeting_agenda"):
        missing.append("meeting_agenda")
    return missing

# ========================================
# LLM CLASSIFIER FOR LEAD INPUTS (Structured)
# ========================================
class LeadReply(TypedDict):
    status: Literal["value", "declined", "unclear", "invalid"]
    value: Optional[str]


def classify_lead_input(field: Literal["person_name", "email_address", "meeting_agenda", "alternate_contact", "phone_number"], text: str) -> LeadReply:
    """Use the LLM to classify a user's reply for a requested field.
    Returns a structured status and a normalized value (when appropriate).
    - status: one of {value, declined, unclear, invalid}
    - value: normalized string if status == value
    Notes:
    - For email, we still apply regex validation after LLM classification for safety.
    - For meeting_agenda, a clear refusal like "no"/"prefer to discuss" etc. should be detected by the LLM (no hardcoded list).
    """
    sys = (
        "You are an expert input classifier for a lead-intake bot.\n"
        "Given the user's latest reply and which field was requested,\n"
        "return a short structured judgement with one of: value, declined, unclear, invalid.\n\n"
        "Rules by field:\n"
        "- person_name: Look for ANY name patterns including: 'NAME here', 'I am NAME', 'My name is NAME', 'This is NAME', 'NAME calling', 'Hi I'm NAME', or standalone names like 'John', 'Sarah', etc. Extract the first name and return VALUE.\n"
        "- email_address: If it's not an email or they refuse, mark INVALID or DECLINED accordingly.\n"
        "- meeting_agenda: If they refuse (e.g., no details now), mark DECLINED. If they provide even a short summary, mark VALUE with that summary.\n"
        "- alternate_contact: Look for phone numbers, WhatsApp, LinkedIn, Slack, or any contact method other than email. Extract and return VALUE.\n"
        "- phone_number: Look specifically for phone numbers in any format (123-456-7890, +1 123 456 7890, etc.). If they decline, mark DECLINED. Extract and return VALUE.\n"
        "Keep outputs minimal."
    )
    usr = f"Field: {field}\nUser reply: {text}"
    schema = LeadReply
    try:
        result = supervisor_llm.with_structured_output(schema).invoke([
            {"role": "system", "content": sys},
            {"role": "user", "content": usr},
        ])
        # Ensure required keys exist
        status = result.get("status", "unclear")
        value = result.get("value")
        
        # Add debug logging
        print(f"[DEBUG] classify_lead_input: field={field}, text='{text[:50]}...', status={status}, value={value}")
        
        return {"status": status, "value": value}
    except Exception as e:
        print(f"[DEBUG] classify_lead_input error: {e}")
        # Fallback to a conservative default
        return {"status": "unclear", "value": None}

# ========================================
# LLM INITIALIZATION
# ========================================

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
supervisor_llm = ChatOpenAI(model="gpt-4o", temperature=0)
lead_collector_llm = ChatOpenAI(model="gpt-4o", temperature=0.3)  # Slightly more creative for natural conversation

# ========================================
# LANGUAGE DETECTION FUNCTIONS
# ========================================

def detect_language(text: str) -> str:
    """Detect the language of user input"""
    try:
        return langdetect.detect(text)
    except:
        return 'en'  # Default to English if detection fails

def get_language_instruction(lang_code: str) -> str:
    """Get instruction for agents to respond in detected language"""
    language_map = {
        'hi': 'हिंदी', 'es': 'Spanish', 'fr': 'French', 'de': 'German', 
        'it': 'Italian', 'pt': 'Portuguese', 'ru': 'Russian', 'ja': 'Japanese',
        'ko': 'Korean', 'zh': 'Chinese', 'ar': 'Arabic', 'en': 'English'
    }
    if lang_code in language_map and lang_code != 'en':
        return f"\n\n**IMPORTANT**: The user is communicating in {language_map[lang_code]}. Please respond in {language_map[lang_code]} to match their language preference."
    return ""

# ========================================
# AGENT CREATION
# ========================================

def create_agent(llm, tools, system_prompt):
    """Create an agent with tools and system prompt"""
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("placeholder", "{messages}"),
    ])
    agent = create_react_agent(model=llm, tools=tools, prompt=prompt)
    return agent

# Create specialized agents
browsing_agent = create_agent(
    llm=llm,
    tools=[web_search],
    system_prompt="""You are a browsing agent specialized in searching the web for information.
    Always provide accurate, up-to-date information with sources."""
)

discovery_agent = create_agent(
    llm=llm,
    tools=[generate_calendar_link, send_email_with_calendar],
    system_prompt="""You are a discovery agent responsible for scheduling discovery calls.
    
    CRITICAL: First check if call_arranged is already True in the state. If it is, DO NOT use any tools or schedule another call. 
    Instead, acknowledge that the call is already scheduled and answer their question or provide helpful follow-up information.
    
    IMPORTANT: The state contains the user's information:
    - email_address: The user's email
    - person_name: The user's name
    - meeting_agenda: The project details/agenda
    - call_arranged: Boolean indicating if call is already scheduled
    
    Your job:
    1. Check if call_arranged is already True:
       - If TRUE: Respond conversationally, acknowledge existing call, answer questions, provide support
       - DO NOT use any tools if call_arranged is True
    2. Only if call_arranged is False or missing:
       a. First, use generate_calendar_link with the state information to create a calendar link
       b. Then, use send_email_with_calendar to send the details to the user
    
    Always pass the state values to your tools:
    - email_address from state
    - person_name from state  
    - meeting_agenda from state
    
    Remember: Once a call is arranged (call_arranged=True), your role becomes conversational support, not scheduling."""
)

rag_agent = create_agent(
    llm=llm,
    tools=[rag_search],
    system_prompt="""You are a helpful assistant for Stack Binary, a company that provides software development and technology solutions.
    
    INSTRUCTIONS:
    1. Use the rag_search tool to find relevant information about Stack Binary services
    2. Answer the user's questions comprehensively but concisely
    3. ALWAYS end your response by asking: "Would you like to schedule a discovery call to discuss how Stack Binary can help with your specific project?"
    4. If the user agrees to schedule, respond positively like "Great! I'll help you schedule that call."
    5. Be professional, friendly, and helpful
    6. NEVER ask for specific times or dates - the system will provide a calendar link where users can choose their preferred time
    7. NEVER ask for contact details like email or name - the system handles that separately
    8. **LANGUAGE SUPPORT**: Always respond in the same language the user is using. If they write in Hindi, respond in Hindi. If in English, respond in English, etc.
    
    Remember: Your goal is to answer questions AND invite them to schedule a discovery call. Once they agree, the system will handle all scheduling details."""
)

lead_collector_agent = create_agent(
    llm=llm,
    tools=[],
    system_prompt="""You are a friendly lead collector for Stack Binary's discovery call scheduling.

Your goal is to collect the missing information needed to schedule a discovery call:
1) Full name
2) Work email address  
3) Brief project description

IMPORTANT INSTRUCTIONS:
- Look at the conversation history to see what information has already been provided
- Only ask for information that is still missing
- Ask for ONE missing item at a time in a friendly, conversational way
- If the user provides multiple pieces of information at once, acknowledge all of them
- Once you have all three pieces of information, confirm the details and say you're ready to schedule the call
- Keep responses brief and professional"""
)

# ========================================
# NODE DEFINITIONS
# ========================================

def browsing_node(state: AgentState) -> Command:
    """Browsing agent node for web searches"""
    result = browsing_agent.invoke(state)
    last_message = result["messages"][-1] if result.get("messages") else None
    
    return Command(
        update={
            "messages": [AIMessage(content=last_message.content, name="browsing_agent")],
            "lead_status": "engaged"
        },
        goto=END  # End after providing search results
    )

def discovery_node(state: AgentState) -> Command:
    """Discovery agent node for scheduling calls"""
    
    # Ensure we have all required details before attempting to schedule
    if missing_lead_fields(state):
        return Command(
            update={
                "messages": [AIMessage(content="Let's grab a couple of quick details before scheduling.", name="discovery_agent")]
            },
            goto="lead_collector"
        )
    
    # Final email validation check before scheduling
    email = state.get("email_address")
    if email and not is_valid_email(email):
        return Command(
            update={
                "messages": [AIMessage(content=f"The email address '{email}' appears to be invalid or the domain doesn't have a mail server. Please provide a valid business email address.", name="discovery_agent")],
                "email_address": None  # Clear invalid email from state
            },
            goto="lead_collector"
        )
    
    # Debug logging
    print(f"[DEBUG] discovery_node: Starting with state - name={state.get('person_name')}, email={state.get('email_address')}, agenda={state.get('meeting_agenda')[:50] if state.get('meeting_agenda') else None}")
    
    # Now we have all the required information, let's use it to schedule
    # The discovery agent will invoke the tools with the state information
    enhanced_state = {**state}
    # Add a clear message to help the agent understand what to do
    enhanced_state["messages"] = state.get("messages", []) + [
        HumanMessage(content=f"Please schedule a discovery call using the following information:\n"
                           f"Name: {state.get('person_name')}\n"
                           f"Email: {state.get('email_address')}\n"
                           f"Project Details: {state.get('meeting_agenda')}")
    ]
    
    result = discovery_agent.invoke(enhanced_state)
    last_message = result["messages"][-1] if result.get("messages") else None
    
    # Check if calendar was already created by looking at state values
    was_already_arranged = state.get("call_arranged") == True
    
    # If call was already arranged, just pass through the message without creating new calendar
    if was_already_arranged:
        return Command(
            update={
                "messages": [last_message] if last_message else [],
                "next": "router"  # Continue conversation normally
            },
            goto="router"
        )
    
    # If not already arranged, assume this call succeeded in creating calendar
    calendar_created = True
    
    print(f"[DEBUG] discovery_node: was_already_arranged={was_already_arranged}, calendar_created={calendar_created}")
    print(f"[DEBUG] discovery_node: Message content: '{last_message.content[:200] if last_message and last_message.content else 'No content'}...'")
    
    # If call was successfully scheduled, save lead to database and ask for phone number (with retry limit)
    if calendar_created:
        # Save lead to local SQLite database
        try:
            save_success = save_lead_to_database(state)
            if save_success:
                print("[DEBUG] Lead successfully saved to local database")
            else:
                print("[DEBUG] Failed to save lead to local database")
        except Exception as e:
            print(f"[DEBUG] Error saving lead to database: {str(e)}")
        
        phone_attempts = state.get("phone_collection_attempts", 0)
        has_phone = bool(state.get("phone_number"))
        max_attempts = 2  # Try asking 2 times max
        
        if not has_phone and phone_attempts < max_attempts:
            # Ask for phone number politely
            if phone_attempts == 0:
                phone_message = (f"{last_message.content}\n\n"
                               "One quick thing - it would be helpful to have your phone number as well, "
                               "just in case we need to reach you directly about the call. "
                               "Could you please share your phone number?")
            else:
                phone_message = ("I understand if you prefer not to share it, but having your phone number "
                               "would really help us coordinate better. Would you mind sharing it?")
            
            return Command(
                update={
                    "messages": [AIMessage(content=phone_message, name="discovery_agent")],
                    "lead_status": "call_arranged",
                    "calendar_link": "generated",
                    "call_arranged": True,
                    "phone_collection_attempts": phone_attempts + 1
                },
                goto=END  # End and wait for phone number response
            )
    
    return Command(
        update={
            "messages": [AIMessage(content=last_message.content, name="discovery_agent")],
            "lead_status": "call_arranged" if calendar_created else state.get("lead_status"),
            "calendar_link": "generated" if calendar_created else state.get("calendar_link"),
            "call_arranged": calendar_created  # Primary goal achieved
        },
        goto=END  # End after scheduling attempt
    )

def rag_node(state: AgentState) -> Command:
    """RAG agent node for Stack Binary knowledge queries"""
    result = rag_agent.invoke(state)
    last_message = result["messages"][-1] if result.get("messages") else None
    
    # Check if the RAG agent is asking about scheduling
    content_lower = last_message.content.lower() if last_message else ""
    asking_about_scheduling = "schedule a discovery call" in content_lower or "would you like to schedule" in content_lower
    
    # If asking about scheduling and call not yet arranged, end the run to wait for user response
    if asking_about_scheduling and not state.get("call_arranged"):
        return Command(
            update={
                "messages": [AIMessage(content=last_message.content, name="rag_agent")],
                "lead_status": "awaiting_scheduling_response"
            },
            goto=END  # End here to wait for user's response
        )
    
    # For all other cases, end the conversation after providing the response
    return Command(
        update={
            "messages": [AIMessage(content=last_message.content, name="rag_agent")]
        },
        goto=END  # End after providing response
    )

# Lead collector agent with email validation tool
lead_collector_tools = [validate_email_address]
lead_collector_agent = llm.bind_tools(lead_collector_tools)

def lead_collector_node(state: AgentState) -> Command:
    """Smart lead collector with email validation: Uses LLM to naturally collect missing information"""
    
    # Check what's still missing
    still_missing = missing_lead_fields(state)
    
    # If nothing is missing, provide summary and route to supervisor
    if not still_missing:
        summary = (
            f"Perfect! I have all the details I need:\n"
            f"• Name: {state.get('person_name')}\n"
            f"• Email: {state.get('email_address')}\n"
            f"• Project: {(state.get('meeting_agenda') or '')[:100]}{'...' if len(state.get('meeting_agenda', '')) > 100 else ''}\n\n"
            f"Let me schedule your discovery call now!"
        )
        return Command(
            update={"messages": [AIMessage(content=summary, name="lead_collector")]}, 
            goto="supervisor"
        )
    
    # Get last user message for context
    last_user_msg = ""
    for msg in reversed(state.get("messages", [])):
        if isinstance(msg, HumanMessage):
            last_user_msg = msg.content if isinstance(msg.content, str) else str(msg.content[0]) if msg.content else ""
            break
    
    # Use LLM to craft natural request for missing information
    lang_code = detect_language(last_user_msg) if last_user_msg else 'en'
    language_instruction = get_language_instruction(lang_code)
    
    lead_prompt = f"""You are a friendly lead collector for Stack Binary. The user has expressed interest in scheduling a discovery call.

CURRENT STATE:
- Name: {state.get('person_name', 'Not provided')}
- Email: {state.get('email_address', 'Not provided')}
- Project Details: {state.get('meeting_agenda', 'Not provided')}

MISSING INFORMATION: {', '.join(still_missing)}

USER'S LAST MESSAGE: "{last_user_msg}"

AVAILABLE TOOLS:
- validate_email_address: Use this to check if an email address is valid before asking the user to provide it again

Your task: Ask for the missing information in a natural, conversational way. Don't be robotic or use templates.

IMPORTANT INSTRUCTIONS:
- If user provides an email address, FIRST use the validate_email_address tool to check if it's valid
- If the email is invalid, politely explain why and ask for a correct email
- If user seems to have provided an email in their message, extract it and validate it first
- Be warm and professional
- Ask for only the most important missing field first
- Explain why you need the information (for scheduling/contact purposes)
- Make it feel like a natural conversation, not an interrogation
- If user just provided some information, acknowledge it positively first

{language_instruction}"""
    
    # Build message history for the agent
    messages = [
        {"role": "system", "content": lead_prompt}
    ]
    
    # Add recent conversation history
    for msg in state.get("messages", [])[-5:]:  # Last 5 messages for context
        if isinstance(msg, HumanMessage):
            messages.append({"role": "user", "content": str(msg.content)})
        elif isinstance(msg, AIMessage):
            messages.append({"role": "assistant", "content": str(msg.content)})
    
    # If no user message yet, add default
    if not any(msg["role"] == "user" for msg in messages[1:]):
        messages.append({"role": "user", "content": last_user_msg or "I'm interested in scheduling a call."})
    
    # Get response from agent with tools
    response = lead_collector_agent.invoke(messages)
    
    # Handle tool calls if any
    tool_calls = getattr(response, 'tool_calls', [])
    if tool_calls:
        # Execute tool calls and get results
        tool_messages = []
        for tool_call in tool_calls:
            if tool_call['name'] == 'validate_email_address':
                result = validate_email_address.invoke(tool_call['args'])
                tool_messages.append({
                    "role": "tool", 
                    "content": str(result),
                    "tool_call_id": tool_call['id']
                })
        
        # Get final response after tool execution
        if tool_messages:
            messages.extend([
                {"role": "assistant", "content": response.content, "tool_calls": tool_calls},
                *tool_messages
            ])
            response = lead_collector_agent.invoke(messages)
    
    return Command(
        update={"messages": [AIMessage(content=response.content, name="lead_collector")]}, 
        goto=END  # End here to wait for user's response
    )


# ========================================
# SUPERVISOR ROUTING
# ========================================

class Router(TypedDict):
    """Routing decision schema"""
    next: Literal["browsing_agent", "discovery_agent", "rag_agent", "lead_collector"]
    reasoning: str

def supervisor_node(state: AgentState) -> Command:
    """Supervisor that routes requests and extracts lead information"""
    
    # PRIMARY GOAL: Schedule discovery call (call_arranged = true)
    call_arranged = state.get("call_arranged") or False
    # First user turn: always start with RAG (answer from KB and invite to schedule)
    current_steps = state.get("step_count", 0) or 0
    if current_steps == 0:
        return Command(
            goto="rag_agent",
            update={"step_count": 1, "reasoning": "Initial turn → RAG: answer from KB and suggest scheduling."}
        )

    # After a successful booking, check if we need to collect phone number
    if call_arranged:
        phone_attempts = state.get("phone_collection_attempts", 0)
        has_phone = bool(state.get("phone_number"))
        max_attempts = 2
        
        # If we're still collecting phone number, continue with supervisor for extraction
        if not has_phone and phone_attempts > 0 and phone_attempts <= max_attempts:
            # Let supervisor extract phone from user's response and route back to discovery
            if phone_attempts < max_attempts:
                return Command(
                    goto="discovery_agent",
                    update={
                        "reasoning": "Call arranged, attempting phone number collection."
                    }
                )
        
        # Otherwise switch to FAQ mode
        return Command(
            goto="rag_agent",
            update={
                "reasoning": "Discovery call scheduled; switching to FAQ/small-talk (RAG) mode."
            }
        )
    
    # Step counting to prevent infinite loops (fallback safety)
    max_steps = 10  # Increased from 6 to allow for more complex interactions
    
    # AUTO-TERMINATE if we've hit the step limit, but prioritize scheduling first
    if current_steps >= max_steps:
        # Check if all details are collected but call not arranged - try discovery first
        missing_fields = missing_lead_fields(state)
        if len(missing_fields) == 0 and not call_arranged:
            return Command(
                goto="discovery_agent",
                update={
                    "step_count": current_steps + 1,
                    "reasoning": f"Step limit reached but all details collected - attempting discovery call scheduling"
                }
            )
        return Command(
            goto=END,
            update={
                "step_count": current_steps + 1,
                "reasoning": f"Auto-terminated after {max_steps} steps to prevent infinite loop"
            }
        )
    
    # Get the last user message (not agent message)
    last_user_message = ""
    for msg in reversed(state.get("messages", [])):
        if isinstance(msg, HumanMessage):
            # Handle both string content and list content (LangChain can have both formats)
            if isinstance(msg.content, str):
                last_user_message = msg.content
            elif isinstance(msg.content, list) and len(msg.content) > 0:
                # Extract text from list format (usually first item is text)
                last_user_message = str(msg.content[0]) if msg.content[0] else ""
            break
    
    print(f"\n[DEBUG] supervisor_node: STEP {current_steps} - call_arranged={call_arranged}")
    print(f"[DEBUG] supervisor_node: State - name='{state.get('person_name')}', email='{state.get('email_address')}', agenda='{state.get('meeting_agenda')[:50] if state.get('meeting_agenda') else None}'")
    print(f"[DEBUG] supervisor_node: User message: '{last_user_message[:100]}...' if last_user_message else 'No message'")
    
    # PROACTIVE INFORMATION EXTRACTION: Extract user info from the message and update state
    extraction_updates = {}
    
    if last_user_message:
        # Extract name if not already in state
        if not state.get("person_name"):
            judged = classify_lead_input("person_name", last_user_message)
            if judged.get("status") == "value" and judged.get("value"):
                extraction_updates["person_name"] = judged["value"][:80]
        
        # Extract email if not already in state
        if not state.get("email_address"):
            judged = classify_lead_input("email_address", last_user_message)
            if judged.get("status") == "value" and judged.get("value"):
                if is_valid_email(judged["value"]):
                    extraction_updates["email_address"] = judged["value"]
                    print(f"[DEBUG] supervisor_node: Valid email extracted: {judged['value']}")
                else:
                    print(f"[DEBUG] supervisor_node: Invalid email rejected (format/DNS): {judged['value']}")
                    # Don't store invalid email, just skip it
            elif judged.get("status") == "declined":
                extraction_updates["contact_preference"] = "team-reach-out"
        
        # Extract project details if not already in state
        if not state.get("meeting_agenda"):
            judged = classify_lead_input("meeting_agenda", last_user_message)
            if judged.get("status") == "value" and judged.get("value"):
                extraction_updates["meeting_agenda"] = judged["value"][:400]
            elif judged.get("status") == "declined":
                extraction_updates["meeting_agenda"] = "TBD (to be discussed on call)"
        
        # Extract alternate contact if not already in state
        if not state.get("alternate_contact"):
            judged = classify_lead_input("alternate_contact", last_user_message)
            if judged.get("status") == "value" and judged.get("value"):
                extraction_updates["alternate_contact"] = judged["value"][:200]
                print(f"[DEBUG] supervisor_node: Alternate contact extracted: {judged['value']}")
        
        # Extract phone number if not already in state (for post-scheduling collection)
        if not state.get("phone_number"):
            judged = classify_lead_input("phone_number", last_user_message)
            if judged.get("status") == "value" and judged.get("value"):
                extraction_updates["phone_number"] = judged["value"][:50]
                print(f"[DEBUG] supervisor_node: Phone number extracted: {judged['value']}")
            elif judged.get("status") == "declined":
                # Stop asking if user declines
                extraction_updates["phone_collection_attempts"] = 999  # Set high to stop asking
    
    # Apply extracted information to state
    if extraction_updates:
        print(f"[DEBUG] supervisor_node: Extracted updates - {extraction_updates}")
        state = {**state, **extraction_updates}
    else:
        print(f"[DEBUG] supervisor_node: No extractions from message: '{last_user_message[:50]}...' Current state: name={state.get('person_name')}, email={state.get('email_address')}")
    
    # Check missing fields first
    missing_fields = missing_lead_fields(state)
    all_details_collected = len(missing_fields) == 0
    
    # Build context-aware routing prompt with field status information
    missing_fields_info = ""
    if missing_fields:
        missing_fields_info = f"MISSING REQUIRED FIELDS: {', '.join(missing_fields)}"
    else:
        missing_fields_info = "ALL LEAD DETAILS COLLECTED ✅"

    system_prompt = f"""You are a smart routing supervisor for Stack Binary's lead generation system.

CURRENT CONVERSATION STATE:
- Step: {current_steps}
- Call Scheduled: {state.get('call_arranged', False)}
- Lead Fields: {missing_fields_info}
  * Name: {state.get('person_name', 'Missing')}
  * Email: {state.get('email_address', 'Missing')}  
  * Project: {state.get('meeting_agenda', 'Missing')[:50] if state.get('meeting_agenda') else 'Missing'}

USER'S LAST MESSAGE: "{last_user_message}"

AVAILABLE AGENTS:
- rag_agent: Answers questions about Stack Binary services, capabilities, pricing. Use when user is asking questions.
- lead_collector: Collects missing lead information (name, email, project details). Use when user agrees to schedule but info is missing.
- discovery_agent: Books the actual discovery call. Use when all lead details are collected and ready to schedule.
- browsing_agent: Searches web for current information. Use for real-time data needs.

SMART ROUTING GUIDELINES:

🎯 PRIMARY GOAL: Natural conversation flow leading to scheduled discovery calls

📋 ROUTING LOGIC:
1. Questions about services/capabilities → rag_agent
2. User agrees to schedule + missing fields → lead_collector  
3. All fields collected + ready to book → discovery_agent
4. Already scheduled → rag_agent (FAQ mode)
5. Need current info → browsing_agent

🧠 CONVERSATION CONTEXT MATTERS:
- If user just provided information, consider what they shared
- Don't immediately jump to lead_collector unless user expressed scheduling interest
- Allow natural Q&A flow before pushing scheduling
- Respect conversation momentum

Make the routing decision based on what feels most natural for the conversation flow."""
    
    # Add debugging info about field status
    print(f"[DEBUG] supervisor_node: Field status: {missing_fields_info}")
    print(f"[DEBUG] supervisor_node: all_details_collected={all_details_collected}")
    
    # Get routing decision from supervisor LLM
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": last_user_message}
    ]
    
    response = supervisor_llm.with_structured_output(Router).invoke(messages)
    goto = response["next"]
    print(f"[DEBUG] supervisor_node: LLM routing decision: {goto}, reasoning: {response.get('reasoning', 'No reasoning')}")

    # TRUST LLM ROUTING - Remove deterministic overrides
    print(f"[DEBUG] supervisor_node: LLM wants to route to: {goto}")
    print(f"[DEBUG] supervisor_node: LLM reasoning: {response.get('reasoning', 'No reasoning')}")
    
    # Only gentle guidance in debug, don't override the LLM's smart decision
    if missing_fields and goto == "rag_agent":
        print(f"[DEBUG] supervisor_node: NOTE - Missing fields {missing_fields} but LLM chose rag_agent (natural conversation flow)")
    elif all_details_collected and not call_arranged and goto == "lead_collector":
        print(f"[DEBUG] supervisor_node: NOTE - All details collected but LLM chose lead_collector (respecting conversation flow)")
    elif call_arranged and goto != "rag_agent":
        print(f"[DEBUG] supervisor_node: NOTE - Call arranged but LLM chose {goto} (may need follow-up)")
        
    # The LLM handles the routing logic based on conversation context
    
    # Handle termination
    if goto == "FINISH" or goto == END:
        goto = END
        print(f"[DEBUG] supervisor_node: Terminating conversation - goto={goto}")

    # Return command with state updates, including any extracted user information
    final_updates = {
        "next": goto,
        "reasoning": response["reasoning"],
        "step_count": current_steps + 1
    }
    
    # Add any extracted user information to the updates
    if extraction_updates:
        final_updates.update(extraction_updates)
    
    print(f"[DEBUG] supervisor_node: FINAL ROUTING: {goto} (step {current_steps + 1})")
    print(f"[DEBUG] supervisor_node: Reasoning: {response['reasoning']}\n")
    
    return Command(
        goto=goto,
        update=final_updates
    )

# ========================================
# GRAPH CONSTRUCTION
# ========================================

# Build the state graph
builder = StateGraph(AgentState)

# Add nodes to the graph
builder.add_node("supervisor", supervisor_node)
builder.add_node("browsing_agent", browsing_node)
builder.add_node("discovery_agent", discovery_node)
builder.add_node("rag_agent", rag_node)
builder.add_node("lead_collector", lead_collector_node)

# Add edges to define flow
builder.add_edge(START, "supervisor")
# Note: Agents use Command.goto to determine next node dynamically
# No hardcoded edges needed since we're using Command returns

# Compile the graph
app = builder.compile()

# Export for LangGraph UI
__all__ = ["app"]

if __name__ == "__main__":
    print("Stack Binary Lead Generation System")
    print("====================================")
    print("Multi-agent system for lead qualification and discovery call scheduling")
    print("Agents: RAG, Discovery, Browsing, Lead Collector")
    print("Primary Goal: Schedule discovery calls (call_arranged = true)")
    print("Ready for deployment!")