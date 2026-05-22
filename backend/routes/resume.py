from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from sqlalchemy.orm import Session
from database import get_db
from models import Resume, User
from schemas import ResumeResponse
import uuid
import os

router = APIRouter(prefix="/api/resume", tags=["resume"])

UPLOAD_DIR = "uploads/resumes"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload", response_model=ResumeResponse)
async def upload_resume(user_id: str, file: UploadFile = File(...), db: Session = Depends(get_db)):
    """Upload and parse resume"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Save file
    file_name = f"{user_id}_{uuid.uuid4()}.pdf"
    file_path = os.path.join(UPLOAD_DIR, file_name)
    
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    
    # TODO: Parse resume with OCR/PDF parser
    resume_data = {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "skills": ["Python", "FastAPI", "React", "Machine Learning"],
    }
    
    # Store in DB
    resume = Resume(
        id=str(uuid.uuid4()),
        user_id=user_id,
        file_path=file_path,
        **resume_data
    )
    db.add(resume)
    db.commit()
    db.refresh(resume)
    
    # Update user's resume reference
    user.resume_id = resume.id
    db.commit()
    
    return resume

@router.get("/{user_id}", response_model=ResumeResponse)
def get_resume(user_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user or not user.resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    return user.resume
