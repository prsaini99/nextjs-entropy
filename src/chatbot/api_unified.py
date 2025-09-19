"""
Unified API for LangGraph Chat + Lead Management
Combines chat functionality with CRUD operations for leads
"""

from fastapi import FastAPI, HTTPException, Query, WebSocket, WebSocketDisconnect, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from passlib.context import CryptContext
import jwt
from datetime import timedelta
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import sqlite3
from datetime import datetime
import json
import asyncio
import os
import sys
import uvicorn
from pathlib import Path

# Add the current directory to Python path to import main.py
sys.path.append(str(Path(__file__).parent))

try:
    from main import app as langgraph_app, AgentState
    from langchain_core.messages import HumanMessage
    LANGGRAPH_AVAILABLE = True
except ImportError as e:
    print(f"Warning: Could not import LangGraph app: {e}")
    LANGGRAPH_AVAILABLE = False

app = FastAPI(title="Stack Binary - Unified Lead Generation API", version="1.0.0")

# Configure CORS for public access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# JWT Authentication for dashboard access
security = HTTPBearer(auto_error=False)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "stackbinary-jwt-secret-2024")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 480  # 8 hours

# Dashboard credentials (in production, store in database)
DASHBOARD_USERS = {
    "test@stackbinary.io": {
        "email": "test@stackbinary.io",
        "password": "$2b$12$y7xFYU/AcfTFTIRqj7HUO.vct7Q0eCg5VwYqrxEuy7L3nmlduRYPa",  # Hello@123
        "name": "Stack Binary Admin"
    }
}

DB_PATH = "leads.db"

# Pydantic models
class LeadBase(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    project_details: Optional[str] = None
    alternate_contact: Optional[str] = None
    phone_number: Optional[str] = None
    contact_preference: Optional[str] = None
    call_arranged: Optional[bool] = False
    calendar_link: Optional[str] = None
    lead_status: Optional[str] = "initial"
    language_detected: Optional[str] = "en"

class LeadCreate(LeadBase):
    email: str

class LeadUpdate(LeadBase):
    pass

class LeadResponse(LeadBase):
    id: int
    created_at: str
    thread_id: Optional[str] = None

class ChatMessage(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str
    lead_collected: bool = False
    lead_data: Optional[Dict] = None

class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: Dict[str, str]

# Connection manager for WebSocket connections
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.sessions: Dict[str, Dict] = {}

    async def connect(self, websocket: WebSocket, session_id: str):
        await websocket.accept()
        self.active_connections.append(websocket)
        if session_id not in self.sessions:
            self.sessions[session_id] = {
                "messages": [],
                "state": {},
                "websocket": websocket
            }

    def disconnect(self, websocket: WebSocket, session_id: str):
        self.active_connections.remove(websocket)
        if session_id in self.sessions:
            del self.sessions[session_id]

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

manager = ConnectionManager()

# Database helper functions
def get_db_connection():
    """Create a database connection"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def lead_to_dict(row):
    """Convert a database row to dictionary"""
    return dict(row) if row else None

def verify_password(plain_password, hashed_password):
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    """Hash a password"""
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Verify JWT token for dashboard access"""
    if not credentials:
        raise HTTPException(
            status_code=401,
            detail="Authentication required"
        )
    
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return email
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Initialize database
def init_database():
    """Initialize SQLite database with leads table"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
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

# Initialize on startup
init_database()

# Authentication Endpoints
@app.post("/api/login", response_model=LoginResponse)
def login(login_request: LoginRequest):
    """Login endpoint for dashboard access"""
    user = DASHBOARD_USERS.get(login_request.email)
    if not user or not verify_password(login_request.password, user["password"]):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "email": user["email"],
            "name": user["name"]
        }
    }

# Public Chat Endpoints
@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": "Stack Binary Lead Generation System",
        "chat_endpoint": "/chat",
        "websocket": "/ws/{session_id}",
        "dashboard": "/api/leads (requires login)",
        "login": "/api/login",
        "docs": "/docs"
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(chat_message: ChatMessage):
    """Public chat endpoint for lead generation"""
    if not LANGGRAPH_AVAILABLE:
        return ChatResponse(
            response="Chat service is currently unavailable. Please try again later.",
            session_id=chat_message.session_id or "default",
            lead_collected=False
        )
    
    try:
        session_id = chat_message.session_id or f"session_{datetime.now().timestamp()}"
        
        # Get or create session state
        if session_id not in manager.sessions:
            manager.sessions[session_id] = {
                "messages": [],
                "state": AgentState(
                    messages=[],
                    email_address=None,
                    person_name=None,
                    meeting_agenda=None,
                    calendar_link=None,
                    lead_status="initial",
                    call_arranged=False,
                    next=None,
                    reasoning=None,
                    step_count=0,
                    contact_preference=None,
                    alternate_contact=None,
                    phone_number=None,
                    phone_collection_attempts=0
                ),
                "websocket": None
            }
        
        session = manager.sessions[session_id]
        
        # Add user message to state
        user_message = HumanMessage(content=chat_message.message)
        session["state"]["messages"].append(user_message)
        
        # Run the LangGraph app
        result = await asyncio.to_thread(
            langgraph_app.invoke,
            session["state"]
        )
        
        # Update session state
        session["state"] = result
        
        # Get the latest AI response
        ai_response = ""
        for message in reversed(result.get("messages", [])):
            if hasattr(message, "content") and message.content:
                ai_response = message.content
                break
        
        # Check if lead was collected
        lead_collected = bool(
            result.get("person_name") and 
            (result.get("email_address") or result.get("alternate_contact")) and
            result.get("meeting_agenda")
        )
        
        lead_data = None
        if lead_collected:
            lead_data = {
                "name": result.get("person_name"),
                "email": result.get("email_address"),
                "project_details": result.get("meeting_agenda"),
                "phone_number": result.get("phone_number"),
                "alternate_contact": result.get("alternate_contact"),
                "contact_preference": result.get("contact_preference"),
                "call_arranged": result.get("call_arranged", False),
                "lead_status": result.get("lead_status", "engaged"),
                "thread_id": session_id
            }
        
        return ChatResponse(
            response=ai_response or "I'm here to help! How can I assist you today?",
            session_id=session_id,
            lead_collected=lead_collected,
            lead_data=lead_data
        )
        
    except Exception as e:
        print(f"Chat error: {e}")
        return ChatResponse(
            response="I apologize, but I'm having technical difficulties. Please try again.",
            session_id=chat_message.session_id or "default",
            lead_collected=False
        )

@app.websocket("/ws/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str):
    """WebSocket endpoint for real-time chat"""
    await manager.connect(websocket, session_id)
    
    try:
        while True:
            # Receive message from client
            data = await websocket.receive_text()
            message_data = json.loads(data)
            
            # Process through chat endpoint
            chat_message = ChatMessage(
                message=message_data["message"],
                session_id=session_id
            )
            
            response = await chat_endpoint(chat_message)
            
            # Send response back to client
            await manager.send_personal_message(
                json.dumps({
                    "response": response.response,
                    "session_id": response.session_id,
                    "lead_collected": response.lead_collected,
                    "lead_data": response.lead_data
                }),
                websocket
            )
            
    except WebSocketDisconnect:
        manager.disconnect(websocket, session_id)

# Protected Dashboard Endpoints (require login)
@app.get("/api/leads", response_model=List[LeadResponse])
def get_all_leads(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    search: Optional[str] = None,
    status: Optional[str] = None,
    current_user: str = Depends(verify_token)
):
    """Get all leads with optional filtering (requires API key)"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        query = "SELECT * FROM leads WHERE 1=1"
        params = []
        
        if search:
            query += " AND (name LIKE ? OR email LIKE ? OR project_details LIKE ?)"
            search_param = f"%{search}%"
            params.extend([search_param, search_param, search_param])
        
        if status:
            query += " AND lead_status = ?"
            params.append(status)
        
        query += " ORDER BY created_at DESC LIMIT ? OFFSET ?"
        params.extend([limit, skip])
        
        cursor.execute(query, params)
        leads = [lead_to_dict(row) for row in cursor.fetchall()]
        conn.close()
        
        return leads
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/leads/{lead_id}", response_model=LeadResponse)
def get_lead(lead_id: int, current_user: str = Depends(verify_token)):
    """Get a specific lead by ID (requires API key)"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT * FROM leads WHERE id = ?", (lead_id,))
        lead = cursor.fetchone()
        conn.close()
        
        if not lead:
            raise HTTPException(status_code=404, detail="Lead not found")
        
        return lead_to_dict(lead)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/leads/{lead_id}", response_model=LeadResponse)
def update_lead(lead_id: int, lead: LeadUpdate, current_user: str = Depends(verify_token)):
    """Update an existing lead (requires API key)"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Check if lead exists
        cursor.execute("SELECT * FROM leads WHERE id = ?", (lead_id,))
        existing_lead = cursor.fetchone()
        
        if not existing_lead:
            conn.close()
            raise HTTPException(status_code=404, detail="Lead not found")
        
        # Build dynamic update query
        update_fields = []
        params = []
        
        for field, value in lead.dict(exclude_unset=True).items():
            if value is not None:
                update_fields.append(f"{field} = ?")
                params.append(value)
        
        if update_fields:
            query = f"UPDATE leads SET {', '.join(update_fields)} WHERE id = ?"
            params.append(lead_id)
            cursor.execute(query, params)
            conn.commit()
        
        # Fetch updated lead
        cursor.execute("SELECT * FROM leads WHERE id = ?", (lead_id,))
        updated_lead = cursor.fetchone()
        conn.close()
        
        return lead_to_dict(updated_lead)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/leads/{lead_id}")
def delete_lead(lead_id: int, current_user: str = Depends(verify_token)):
    """Delete a lead (requires API key)"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Check if lead exists
        cursor.execute("SELECT * FROM leads WHERE id = ?", (lead_id,))
        lead = cursor.fetchone()
        
        if not lead:
            conn.close()
            raise HTTPException(status_code=404, detail="Lead not found")
        
        # Delete the lead
        cursor.execute("DELETE FROM leads WHERE id = ?", (lead_id,))
        conn.commit()
        conn.close()
        
        return {"message": "Lead deleted successfully", "id": lead_id}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/leads/stats/summary")
def get_lead_stats(current_user: str = Depends(verify_token)):
    """Get lead statistics (requires API key)"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Total leads
        cursor.execute("SELECT COUNT(*) as total FROM leads")
        total = cursor.fetchone()["total"]
        
        # Leads by status
        cursor.execute("""
            SELECT lead_status, COUNT(*) as count 
            FROM leads 
            GROUP BY lead_status
        """)
        status_breakdown = {row["lead_status"]: row["count"] for row in cursor.fetchall()}
        
        # Leads with calls arranged
        cursor.execute("SELECT COUNT(*) as count FROM leads WHERE call_arranged = 1")
        calls_arranged = cursor.fetchone()["count"]
        
        # Recent leads (last 7 days)
        cursor.execute("""
            SELECT COUNT(*) as count 
            FROM leads 
            WHERE datetime(created_at) > datetime('now', '-7 days')
        """)
        recent_leads = cursor.fetchone()["count"]
        
        conn.close()
        
        return {
            "total_leads": total,
            "status_breakdown": status_breakdown,
            "calls_arranged": calls_arranged,
            "recent_leads": recent_leads
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Health check endpoint
@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "langgraph_available": LANGGRAPH_AVAILABLE,
        "database": "connected"
    }

if __name__ == "__main__":
    import os
    port = int(os.getenv("PORT", 8000))
    print("🚀 Starting Stack Binary Unified API")
    print(f"📝 Chat Endpoint: http://0.0.0.0:{port}/api/chat")
    print(f"🌐 WebSocket: ws://0.0.0.0:{port}/ws/{{session_id}}")
    print(f"📊 Dashboard API: http://0.0.0.0:{port}/api/leads")
    print(f"📖 Documentation: http://0.0.0.0:{port}/docs")
    
    # Run uvicorn server
    uvicorn.run(
        "api_unified:app", 
        host="0.0.0.0", 
        port=port, 
        reload=False,
        access_log=True
    )