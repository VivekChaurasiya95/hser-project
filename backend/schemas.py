from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str
    organization: Optional[str] = None

class UserCreate(UserBase):
    password: str
    user_type: str = "user"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    user_type: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str
    user_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Skill Schemas
class SkillAttribute(BaseModel):
    automation: float
    creativity: float
    toolGrowth: float
    adoption: float

class SkillData(BaseModel):
    id: int
    name: str
    category: str
    automation: float
    creativity: float
    toolGrowth: float
    adoption: float

class SkillMetrics(BaseModel):
    id: int
    name: str
    category: str
    rfs: float
    ps: float
    extinction_risk: float
    half_life: float
    risk_level: str

class SkillDetailResponse(BaseModel):
    skill: SkillData
    metrics: dict
    explanation: dict
    timestamp: str

# Tracked Skill Schemas
class TrackedSkillCreate(BaseModel):
    skill_id: int
    skill_name: str
    notes: Optional[str] = None

class TrackedSkillResponse(BaseModel):
    id: int
    skill_id: int
    skill_name: str
    tracked_at: datetime
    last_risk_value: Optional[float]
    
    class Config:
        from_attributes = True

# Alert Schemas
class AlertResponse(BaseModel):
    id: int
    skill_name: str
    alert_type: str
    message: str
    severity: str
    is_read: bool
    created_at: datetime
    
    class Config:
        from_attributes = True