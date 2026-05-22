from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

# User Schemas
class UserCreate(BaseModel):
    email: EmailStr
    name: str
    password: str
    phone: Optional[str] = None

class UserUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    github_url: Optional[str] = None
    auto_apply_mode: Optional[bool] = None

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    phone: Optional[str]
    linkedin_url: Optional[str]
    portfolio_url: Optional[str]
    github_url: Optional[str]
    auto_apply_mode: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Resume Schemas
class ResumeUpload(BaseModel):
    name: str
    email: str
    phone: str
    skills: List[str]

class ResumeResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    skills: List[str]
    ai_score: float
    created_at: datetime

    class Config:
        from_attributes = True

# Job Schemas
class JobCreate(BaseModel):
    title: str
    company: str
    location: str
    description: str
    skills_required: List[str]
    url: str
    source: str

class JobResponse(BaseModel):
    id: str
    title: str
    company: str
    location: str
    match_score: float
    interview_probability: float
    skills_required: List[str]
    url: str
    posted_at: datetime

    class Config:
        from_attributes = True

# Application Schemas
class ApplicationCreate(BaseModel):
    job_id: str
    job_title: str
    company: str

class ApplicationUpdate(BaseModel):
    status: Optional[str] = None

class ApplicationResponse(BaseModel):
    id: str
    job_title: str
    company: str
    status: str
    applied_at: datetime
    last_updated: datetime

    class Config:
        from_attributes = True

# Analytics Schemas
class DashboardStats(BaseModel):
    total_jobs: int
    total_applications: int
    pending_applications: int
    interviews: int
    offers: int
    avg_match_score: float
    avg_interview_probability: float
