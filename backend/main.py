"""
HSER Backend API - Fixed with Google OAuth
"""
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import os
from datetime import datetime, timedelta
import jwt
import bcrypt
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from dotenv import load_dotenv

# Google OAuth imports
try:
    from google.oauth2 import id_token
    from google.auth.transport import requests as google_requests
    GOOGLE_AUTH_AVAILABLE = True
except ImportError:
    GOOGLE_AUTH_AVAILABLE = False
    print("⚠️  Google auth not installed. Run: pip install google-auth")

load_dotenv()

# ============================================================================
# CONFIGURATION
# ============================================================================
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production-minimum-32-characters")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")

# ============================================================================
# DATABASE SETUP
# ============================================================================
DATABASE_URL = "sqlite:///./hser.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ============================================================================
# DATABASE MODELS
# ============================================================================
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
    email = Column(String(255), unique=True, index=True)
    password = Column(String(255), nullable=True)
    organization = Column(String(255), nullable=True)
    user_type = Column(String(50), default="user")
    is_active = Column(Boolean, default=True)
    is_google_user = Column(Boolean, default=False)
    google_id = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

# ============================================================================
# PYDANTIC MODELS
# ============================================================================
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    organization: Optional[str] = None
    user_type: str = "user"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class GoogleAuthRequest(BaseModel):
    credential: str  # Changed from 'token' to 'credential' (Google's JWT format)
    user_type: str = "user"

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user_type: str
    name: str
    email: str

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ============================================================================
# FASTAPI APP
# ============================================================================
app = FastAPI(title="HSER API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.get("/")
async def root():
    return {
        "message": "HSER API - Human Skill Extinction Radar",
        "version": "1.0.0",
        "status": "running",
        "google_auth_available": GOOGLE_AUTH_AVAILABLE,
        "google_configured": bool(GOOGLE_CLIENT_ID)
    }

@app.post("/api/auth/register", response_model=TokenResponse)
async def register(user: UserRegister, db: Session = Depends(get_db)):
    try:
        existing_user = db.query(User).filter(User.email == user.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
        
        db_user = User(
            name=user.name,
            email=user.email,
            password=hashed_password.decode('utf-8'),
            organization=user.organization,
            user_type=user.user_type,
            is_google_user=False
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        
        access_token = create_access_token({"sub": user.email, "type": user.user_type})
        
        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            user_type=user.user_type,
            name=user.name,
            email=user.email
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Registration failed: {str(e)}")

@app.post("/api/auth/login", response_model=TokenResponse)
async def login(credentials: UserLogin, db: Session = Depends(get_db)):
    try:
        user = db.query(User).filter(User.email == credentials.email).first()
        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        if user.is_google_user:
            raise HTTPException(status_code=400, detail="Use Google Sign-In for this account")
        
        if not bcrypt.checkpw(credentials.password.encode('utf-8'), user.password.encode('utf-8')):
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        access_token = create_access_token({"sub": user.email, "type": user.user_type})
        
        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            user_type=user.user_type,
            name=user.name,
            email=user.email
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Login failed: {str(e)}")

@app.post("/api/auth/google", response_model=TokenResponse)
async def google_auth(google_data: GoogleAuthRequest, db: Session = Depends(get_db)):
    if not GOOGLE_AUTH_AVAILABLE:
        raise HTTPException(status_code=501, detail="Google auth not available. Install: pip install google-auth")
    
    if not GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=500, detail="Google Client ID not configured")
    
    try:
        # Verify Google ID token
        idinfo = id_token.verify_oauth2_token(
            google_data.credential,
            google_requests.Request(),
            GOOGLE_CLIENT_ID
        )
        
        # Extract user info
        email = idinfo.get('email')
        name = idinfo.get('name', email.split('@')[0])
        google_id = idinfo.get('sub')
        
        if not email:
            raise HTTPException(status_code=400, detail="Email not provided by Google")
        
        # Check if user exists
        user = db.query(User).filter(User.email == email).first()
        
        if not user:
            # Create new user
            user = User(
                name=name,
                email=email,
                password=None,
                organization=None,
                user_type=google_data.user_type,
                is_google_user=True,
                google_id=google_id
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        else:
            # Update existing user with Google info if not set
            if not user.is_google_user:
                user.is_google_user = True
                user.google_id = google_id
                db.commit()
        
        access_token = create_access_token({"sub": email, "type": user.user_type})
        
        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            user_type=user.user_type,
            name=user.name,
            email=user.email
        )
    
    except ValueError as e:
        raise HTTPException(status_code=401, detail=f"Invalid Google token: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Google auth failed: {str(e)}")

@app.get("/api/skills")
async def get_skills():
    """Return sample skills data"""
    skills = [
      {"id": 1, "name": "Manual SQL Reporting", "category": "Data", "automation": 0.85, "creativity": 0.2, "toolGrowth": 0.9, "adoption": 0.8},
      {"id": 2, "name": "CRUD Backend Development", "category": "Development", "automation": 0.7, "creativity": 0.3, "toolGrowth": 0.85, "adoption": 0.75},
      {"id": 3, "name": "Manual Software Testing", "category": "QA", "automation": 0.9, "creativity": 0.15, "toolGrowth": 0.95, "adoption": 0.85},
      {"id": 4, "name": "Excel Dashboarding", "category": "Analytics", "automation": 0.8, "creativity": 0.25, "toolGrowth": 0.8, "adoption": 0.7},
      {"id": 5, "name": "Frontend UI Coding (Basic)", "category": "Development", "automation": 0.65, "creativity": 0.4, "toolGrowth": 0.75, "adoption": 0.6},
      {"id": 6, "name": "Prompt Engineering", "category": "AI", "automation": 0.3, "creativity": 0.8, "toolGrowth": 0.95, "adoption": 0.7},
      {"id": 7, "name": "Data Labeling", "category": "Data", "automation": 0.75, "creativity": 0.2, "toolGrowth": 0.85, "adoption": 0.7},
      {"id": 8, "name": "API Integration", "category": "Development", "automation": 0.6, "creativity": 0.35, "toolGrowth": 0.7, "adoption": 0.65},
      {"id": 9, "name": "DevOps Automation", "category": "Operations", "automation": 0.5, "creativity": 0.5, "toolGrowth": 0.8, "adoption": 0.75},
      {"id": 10, "name": "System Debugging", "category": "Development", "automation": 0.4, "creativity": 0.7, "toolGrowth": 0.6, "adoption": 0.5},
      {"id": 11, "name": "Code Refactoring", "category": "Development", "automation": 0.55, "creativity": 0.6, "toolGrowth": 0.65, "adoption": 0.55},
      {"id": 12, "name": "ETL Data Pipelines", "category": "Data", "automation": 0.7, "creativity": 0.3, "toolGrowth": 0.75, "adoption": 0.7},
      {"id": 13, "name": "Cloud Infrastructure Setup", "category": "Operations", "automation": 0.6, "creativity": 0.4, "toolGrowth": 0.8, "adoption": 0.75},
      {"id": 14, "name": "Technical Documentation Writing", "category": "Documentation", "automation": 0.5, "creativity": 0.6, "toolGrowth": 0.7, "adoption": 0.6},
      {"id": 15, "name": "UI/UX Prototyping", "category": "Design", "automation": 0.45, "creativity": 0.75, "toolGrowth": 0.65, "adoption": 0.6},
      {"id": 16, "name": "Cybersecurity Monitoring", "category": "Security", "automation": 0.65, "creativity": 0.4, "toolGrowth": 0.75, "adoption": 0.7},
      {"id": 17, "name": "Database Administration", "category": "Data", "automation": 0.6, "creativity": 0.35, "toolGrowth": 0.7, "adoption": 0.65},
      {"id": 18, "name": "Machine Learning Model Training", "category": "AI", "automation": 0.5, "creativity": 0.7, "toolGrowth": 0.85, "adoption": 0.75},
      {"id": 19, "name": "Model Deployment (MLOps)", "category": "AI", "automation": 0.55, "creativity": 0.5, "toolGrowth": 0.8, "adoption": 0.7},
      {"id": 20, "name": "Low-Code / No-Code Development", "category": "Development", "automation": 0.8, "creativity": 0.3, "toolGrowth": 0.9, "adoption": 0.85},
      {"id": 21, "name": "Software Architecture Design", "category": "Development", "automation": 0.3, "creativity": 0.85, "toolGrowth": 0.5, "adoption": 0.4},
      {"id": 22, "name": "Performance Optimization", "category": "Development", "automation": 0.45, "creativity": 0.65, "toolGrowth": 0.6, "adoption": 0.55},
      {"id": 23, "name": "Code Review & Quality Assurance", "category": "QA", "automation": 0.6, "creativity": 0.5, "toolGrowth": 0.75, "adoption": 0.7},
      {"id": 24, "name": "Legacy System Maintenance", "category": "Operations", "automation": 0.4, "creativity": 0.55, "toolGrowth": 0.5, "adoption": 0.45},
      {"id": 25, "name": "Technical Support Engineering", "category": "Support", "automation": 0.7, "creativity": 0.35, "toolGrowth": 0.8, "adoption": 0.75},
      {"id": 26, "name": "Scripting & Automation", "category": "Development", "automation": 0.65, "creativity": 0.45, "toolGrowth": 0.7, "adoption": 0.65},
      {"id": 27, "name": "Data Visualization Engineering", "category": "Analytics", "automation": 0.5, "creativity": 0.6, "toolGrowth": 0.65, "adoption": 0.6},
      {"id": 28, "name": "Requirements Engineering", "category": "Documentation", "automation": 0.4, "creativity": 0.7, "toolGrowth": 0.55, "adoption": 0.5},
      {"id": 29, "name": "Software Estimation & Effort Planning", "category": "Management", "automation": 0.55, "creativity": 0.5, "toolGrowth": 0.6, "adoption": 0.55},
      {"id": 30, "name": "Version Control Management (Git Operations)", "category": "Development", "automation": 0.7, "creativity": 0.25, "toolGrowth": 0.75, "adoption": 0.8},
      {"id": 31, "name": "Build & Release Management", "category": "Operations", "automation": 0.75, "creativity": 0.3, "toolGrowth": 0.85, "adoption": 0.8},
      {"id": 32, "name": "Configuration Management", "category": "Operations", "automation": 0.7, "creativity": 0.35, "toolGrowth": 0.8, "adoption": 0.75},
      {"id": 33, "name": "Distributed Systems Engineering", "category": "Development", "automation": 0.35, "creativity": 0.8, "toolGrowth": 0.55, "adoption": 0.5},
      {"id": 34, "name": "Event-Driven Architecture Design", "category": "Development", "automation": 0.4, "creativity": 0.75, "toolGrowth": 0.6, "adoption": 0.55},
      {"id": 35, "name": "Message Queue Management (Kafka/RabbitMQ)", "category": "Operations", "automation": 0.55, "creativity": 0.45, "toolGrowth": 0.7, "adoption": 0.65},
      {"id": 36, "name": "System Reliability Engineering (SRE)", "category": "Operations", "automation": 0.5, "creativity": 0.6, "toolGrowth": 0.7, "adoption": 0.65},
      {"id": 37, "name": "Fault Tolerance Engineering", "category": "Development", "automation": 0.45, "creativity": 0.7, "toolGrowth": 0.65, "adoption": 0.6},
      {"id": 38, "name": "Data Cleaning & Preprocessing", "category": "Data", "automation": 0.8, "creativity": 0.25, "toolGrowth": 0.85, "adoption": 0.8},
      {"id": 39, "name": "Feature Engineering", "category": "AI", "automation": 0.6, "creativity": 0.55, "toolGrowth": 0.75, "adoption": 0.7},
      {"id": 40, "name": "Data Quality Assurance", "category": "Data", "automation": 0.7, "creativity": 0.35, "toolGrowth": 0.8, "adoption": 0.75},
      {"id": 41, "name": "Business Intelligence Report Development", "category": "Analytics", "automation": 0.75, "creativity": 0.3, "toolGrowth": 0.8, "adoption": 0.75},
      {"id": 42, "name": "Data Governance & Compliance", "category": "Data", "automation": 0.5, "creativity": 0.6, "toolGrowth": 0.65, "adoption": 0.6},
      {"id": 43, "name": "Identity & Access Management (IAM)", "category": "Security", "automation": 0.6, "creativity": 0.4, "toolGrowth": 0.7, "adoption": 0.65},
      {"id": 44, "name": "Vulnerability Assessment & Penetration Testing", "category": "Security", "automation": 0.55, "creativity": 0.6, "toolGrowth": 0.7, "adoption": 0.65},
      {"id": 45, "name": "Network Configuration & Monitoring", "category": "Operations", "automation": 0.65, "creativity": 0.35, "toolGrowth": 0.75, "adoption": 0.7},
      {"id": 46, "name": "Incident Response Engineering", "category": "Security", "automation": 0.5, "creativity": 0.65, "toolGrowth": 0.7, "adoption": 0.65},
      {"id": 47, "name": "Backup & Disaster Recovery Planning", "category": "Operations", "automation": 0.6, "creativity": 0.45, "toolGrowth": 0.7, "adoption": 0.65},
      {"id": 48, "name": "Product Requirement Documentation (PRD Writing)", "category": "Documentation", "automation": 0.55, "creativity": 0.6, "toolGrowth": 0.65, "adoption": 0.6},
      {"id": 49, "name": "Platform Integration Engineering", "category": "Development", "automation": 0.65, "creativity": 0.4, "toolGrowth": 0.75, "adoption": 0.7},
      {"id": 50, "name": "Customer Success Engineering", "category": "Support", "automation": 0.5, "creativity": 0.7, "toolGrowth": 0.65, "adoption": 0.6}
   ]
    return {"skills": skills}

if __name__ == "__main__":
    import uvicorn
    print("=" * 60)
    print("🚀 Starting HSER Backend API...")
    print(f"📊 Google Auth: {'✅ Available' if GOOGLE_AUTH_AVAILABLE else '❌ Not Available'}")
    print(f"🔑 Google Client ID: {'✅ Configured' if GOOGLE_CLIENT_ID else '❌ NOT SET'}")
    print(f"🌐 Server: http://localhost:8000")
    print(f"📚 API Docs: http://localhost:8000/docs")
    print("=" * 60)
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
