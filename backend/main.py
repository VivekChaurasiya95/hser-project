# HSER Backend API - Complete Implementation
# File: main.py

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import jwt
import bcrypt
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import json

# Initialize FastAPI app
app = FastAPI(
    title="HSER API",
    description="Human Skill Extinction Radar - Predict skill obsolescence",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
DATABASE_URL = "sqlite:///./hser.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# JWT Configuration
SECRET_KEY = "your-secret-key-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Database Models
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    organization = Column(String, nullable=True)
    user_type = Column(String, default="user")
    created_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

# Pydantic Models
class SkillAttribute(BaseModel):
    automation_level: float
    creativity_requirement: float
    tool_growth_speed: float
    adoption_velocity: float

class SkillData(BaseModel):
    id: int
    name: str
    category: str
    attributes: SkillAttribute

class SkillMetrics(BaseModel):
    skill_id: int
    skill_name: str
    replacement_force_score: float
    protection_score: float
    extinction_risk: float
    skill_half_life: float
    risk_level: str
    explanation: dict

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    organization: Optional[str] = None
    user_type: str = "user"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user_type: str

# Skill Dataset - 50 Software & IT Skills
SKILLS_DATA = [
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
    {"id": 50, "name": "Customer Success Engineering", "category": "Support", "automation": 0.5, "creativity": 0.7, "toolGrowth": 0.65, "adoption": 0.6},
]

# Helper Functions
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def calculate_skill_metrics(skill: dict) -> dict:
    """Calculate all metrics for a skill"""
    automation = skill['automation']
    creativity = skill['creativity']
    tool_growth = skill['toolGrowth']
    adoption = skill['adoption']
    
    # A. Replacement Force Score (RFS)
    rfs = (automation + tool_growth + adoption) / 3
    
    # B. Protection Score (PS)
    ps = creativity
    
    # C. Skill Extinction Risk (%)
    extinction_risk = rfs * (1 - ps) * 100
    
    # D. Skill Half-Life (years)
    half_life = 5 / tool_growth if tool_growth > 0 else 10
    
    # E. Risk Level
    if extinction_risk >= 70:
        risk_level = "critical"
    elif extinction_risk >= 50:
        risk_level = "high"
    elif extinction_risk >= 30:
        risk_level = "medium"
    else:
        risk_level = "low"
    
    return {
        "rfs": round(rfs, 2),
        "ps": round(ps, 2),
        "extinction_risk": round(extinction_risk, 1),
        "half_life": round(half_life, 1),
        "risk_level": risk_level
    }

def generate_explanation(skill: dict, metrics: dict) -> dict:
    """Generate human-readable explanation"""
    reasons = []
    
    if skill['automation'] > 0.7:
        reasons.append("high automation capability")
    if skill['toolGrowth'] > 0.8:
        reasons.append("rapid AI tool growth")
    if skill['adoption'] > 0.7:
        reasons.append("fast industry adoption")
    if skill['creativity'] < 0.3:
        reasons.append("low creative requirement")
    
    why = f"This skill is at {metrics['risk_level']} extinction risk due to {', '.join(reasons)}."
    
    how = f"AI-powered tools and automation platforms are increasingly capable of handling {skill['name']} tasks with minimal human intervention."
    
    when = f"Based on current trends, this skill's relevance may decline significantly within {metrics['half_life']} years."
    
    return {
        "why": why,
        "how": how,
        "when": when
    }

# API Endpoints

@app.get("/")
async def root():
    return {
        "message": "HSER API - Human Skill Extinction Radar",
        "version": "1.0.0",
        "endpoints": {
            "skills": "/api/skills",
            "skill_detail": "/api/skills/{skill_id}",
            "categories": "/api/categories",
            "risk_analysis": "/api/analysis/risk",
            "auth": "/api/auth/*"
        }
    }

@app.post("/api/auth/register", response_model=Token)
async def register(user: UserRegister, db: Session = Depends(get_db)):
    """Register new user"""
    # Check if user exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash password
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    
    # Create user
    db_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password.decode('utf-8'),
        organization=user.organization,
        user_type=user.user_type
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Create token
    access_token = create_access_token(data={"sub": user.email, "type": user.user_type})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_type": user.user_type
    }

@app.post("/api/auth/login", response_model=Token)
async def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """Login user"""
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or not bcrypt.checkpw(credentials.password.encode('utf-8'), user.password.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user.email, "type": user.user_type})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_type": user.user_type
    }

@app.get("/api/skills")
async def get_all_skills(category: Optional[str] = None):
    """Get all skills with calculated metrics"""
    skills = SKILLS_DATA.copy()
    
    if category:
        skills = [s for s in skills if s['category'].lower() == category.lower()]
    
    result = []
    for skill in skills:
        metrics = calculate_skill_metrics(skill)
        result.append({
            **skill,
            **metrics
        })
    
    return {
        "total": len(result),
        "skills": result
    }

@app.get("/api/skills/{skill_id}")
async def get_skill_detail(skill_id: int):
    """Get detailed analysis for a specific skill"""
    skill = next((s for s in SKILLS_DATA if s['id'] == skill_id), None)
    
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    
    metrics = calculate_skill_metrics(skill)
    explanation = generate_explanation(skill, metrics)
    
    return {
        "skill": skill,
        "metrics": metrics,
        "explanation": explanation,
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/api/categories")
async def get_categories():
    """Get all unique categories with skill counts"""
    categories = {}
    for skill in SKILLS_DATA:
        cat = skill['category']
        if cat not in categories:
            categories[cat] = {"name": cat, "count": 0, "avg_risk": 0}
        categories[cat]['count'] += 1
    
    # Calculate average risk per category
    for cat_name in categories:
        cat_skills = [s for s in SKILLS_DATA if s['category'] == cat_name]
        avg_risk = np.mean([calculate_skill_metrics(s)['extinction_risk'] for s in cat_skills])
        categories[cat_name]['avg_risk'] = round(avg_risk, 1)
    
    return {"categories": list(categories.values())}

@app.get("/api/analysis/risk")
async def get_risk_analysis():
    """Get overall risk analysis"""
    all_metrics = [calculate_skill_metrics(s) for s in SKILLS_DATA]
    
    risk_distribution = {
        "critical": len([m for m in all_metrics if m['risk_level'] == 'critical']),
        "high": len([m for m in all_metrics if m['risk_level'] == 'high']),
        "medium": len([m for m in all_metrics if m['risk_level'] == 'medium']),
        "low": len([m for m in all_metrics if m['risk_level'] == 'low'])
    }
    
    avg_extinction_risk = np.mean([m['extinction_risk'] for m in all_metrics])
    avg_half_life = np.mean([m['half_life'] for m in all_metrics])
    
    return {
        "risk_distribution": risk_distribution,
        "average_extinction_risk": round(avg_extinction_risk, 1),
        "average_half_life": round(avg_half_life, 1),
        "total_skills": len(SKILLS_DATA)
    }

@app.post("/api/compare")
async def compare_skills(skill_ids: List[int]):
    """Compare multiple skills"""
    if len(skill_ids) != 2:
        raise HTTPException(status_code=400, detail="Exactly 2 skills required for comparison")
    
    skills = [next((s for s in SKILLS_DATA if s['id'] == sid), None) for sid in skill_ids]
    
    if None in skills:
        raise HTTPException(status_code=404, detail="One or more skills not found")
    
    comparison = []
    for skill in skills:
        metrics = calculate_skill_metrics(skill)
        comparison.append({
            **skill,
            **metrics
        })
    
    return {"comparison": comparison}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
