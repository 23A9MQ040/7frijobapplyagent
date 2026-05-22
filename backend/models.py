from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime, Boolean, Text, JSON, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    phone = Column(String, nullable=True)
    hashed_password = Column(String)
    
    linkedin_url = Column(String, nullable=True)
    portfolio_url = Column(String, nullable=True)
    github_url = Column(String, nullable=True)
    
    auto_apply_mode = Column(Boolean, default=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    resume = relationship("Resume", back_populates="user", uselist=False)
    applications = relationship("Application", back_populates="user")
    jobs = relationship("Job", back_populates="user")

class Resume(Base):
    __tablename__ = "resumes"
    
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), index=True)
    
    name = Column(String)
    email = Column(String)
    phone = Column(String)
    
    skills = Column(JSON, default=[])
    experience = Column(JSON, default=[])
    education = Column(JSON, default=[])
    projects = Column(JSON, default=[])
    certifications = Column(JSON, default=[])
    
    ai_score = Column(Float, default=0.0)
    
    file_path = Column(String, nullable=True)
    raw_text = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="resume")

class Job(Base):
    __tablename__ = "jobs"
    
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), index=True)
    
    title = Column(String)
    company = Column(String)
    location = Column(String)
    description = Column(Text)
    
    skills_required = Column(JSON, default=[])
    salary_min = Column(Float, nullable=True)
    salary_max = Column(Float, nullable=True)
    salary_currency = Column(String, default="USD")
    
    url = Column(String, unique=True, index=True)
    source = Column(String)  # linkedin, indeed, naukri, etc.
    
    match_score = Column(Float, default=0.0)
    interview_probability = Column(Float, default=0.0)
    
    posted_at = Column(DateTime)
    found_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="jobs")

class Application(Base):
    __tablename__ = "applications"
    
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), index=True)
    job_id = Column(String, index=True)
    
    job_title = Column(String)
    company = Column(String)
    
    status = Column(String, default="applied")  # applied, pending, interview, rejected, offer
    
    resume_path = Column(String, nullable=True)
    cover_letter = Column(Text, nullable=True)
    tailored_resume = Column(String, nullable=True)
    
    applied_at = Column(DateTime, default=datetime.utcnow)
    last_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="applications")

class Recruiter(Base):
    __tablename__ = "recruiters"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    company = Column(String)
    linkedin_url = Column(String, nullable=True)
    
    contacted = Column(Boolean, default=False)
    contacted_at = Column(DateTime, nullable=True)
    
    response_received = Column(Boolean, default=False)
    response_at = Column(DateTime, nullable=True)
    response_text = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
