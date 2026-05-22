from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Application, User
from schemas import ApplicationCreate, ApplicationResponse, ApplicationUpdate
from typing import List
import uuid

router = APIRouter(prefix="/api/applications", tags=["applications"])

@router.post("/", response_model=ApplicationResponse)
def create_application(user_id: str, app_data: ApplicationCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Check if already applied
    existing = db.query(Application).filter(
        Application.user_id == user_id,
        Application.job_id == app_data.job_id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Already applied to this job")
    
    application = Application(
        id=str(uuid.uuid4()),
        user_id=user_id,
        job_id=app_data.job_id,
        job_title=app_data.job_title,
        company=app_data.company,
        status="applied"
    )
    db.add(application)
    db.commit()
    db.refresh(application)
    return application

@router.get("/", response_model=List[ApplicationResponse])
def list_applications(user_id: str, status: str = None, db: Session = Depends(get_db)):
    query = db.query(Application).filter(Application.user_id == user_id)
    if status:
        query = query.filter(Application.status == status)
    return query.all()

@router.get("/{app_id}", response_model=ApplicationResponse)
def get_application(app_id: str, db: Session = Depends(get_db)):
    app = db.query(Application).filter(Application.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    return app

@router.put("/{app_id}", response_model=ApplicationResponse)
def update_application(app_id: str, app_data: ApplicationUpdate, db: Session = Depends(get_db)):
    app = db.query(Application).filter(Application.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    
    if app_data.status:
        app.status = app_data.status
    
    db.commit()
    db.refresh(app)
    return app
