from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Job, User
from schemas import JobResponse
from typing import List

router = APIRouter(prefix="/api/jobs", tags=["jobs"])

@router.get("/", response_model=List[JobResponse])
def list_jobs(user_id: str, skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    jobs = db.query(Job).filter(Job.user_id == user_id).offset(skip).limit(limit).all()
    return jobs

@router.get("/trending", response_model=List[JobResponse])
def get_trending_jobs(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    """Get trending jobs across all users"""
    jobs = db.query(Job).order_by(Job.match_score.desc()).offset(skip).limit(limit).all()
    return jobs

@router.get("/{job_id}", response_model=JobResponse)
def get_job(job_id: str, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job
