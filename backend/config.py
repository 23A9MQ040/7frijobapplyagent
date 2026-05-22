import os
from dotenv import load_dotenv
from functools import lru_cache

load_dotenv()

class Settings:
    # App
    APP_NAME = "7FRIJOBAPPLYAGENT"
    APP_VERSION = "1.0.0"
    DEBUG = os.getenv("DEBUG", False)
    
    # Database
    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/jobapply")
    
    # Redis
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
    
    # JWT
    JWT_SECRET = os.getenv("JWT_SECRET", "change-me-in-production")
    JWT_ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days
    
    # AI APIs
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    CLAUDE_API_KEY = os.getenv("CLAUDE_API_KEY")
    
    # Job Sources
    LINKEDIN_API_KEY = os.getenv("LINKEDIN_API_KEY")
    INDEED_API_KEY = os.getenv("INDEED_API_KEY")
    
    # Vector DB
    PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
    PINECONE_ENVIRONMENT = os.getenv("PINECONE_ENVIRONMENT", "production")
    
    # Automation
    PLAYWRIGHT_HEADLESS = os.getenv("PLAYWRIGHT_HEADLESS", "true").lower() == "true"
    PLAYWRIGHT_TIMEOUT = int(os.getenv("PLAYWRIGHT_TIMEOUT", "30000"))
    
    # Job Search
    JOB_SEARCH_INTERVAL_MINUTES = int(os.getenv("JOB_SEARCH_INTERVAL_MINUTES", "30"))
    
    # Feature Flags
    ENABLE_AUTO_APPLY = os.getenv("ENABLE_AUTO_APPLY", "true").lower() == "true"
    ENABLE_RECRUITER_OUTREACH = os.getenv("ENABLE_RECRUITER_OUTREACH", "true").lower() == "true"
    
    # CORS
    CORS_ORIGINS = [
        "http://localhost:3000",
        "http://localhost:8000",
        "https://7frijobapplyagent.vercel.app",
    ]

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()
