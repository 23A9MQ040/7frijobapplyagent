# Architecture - 7FRIJOBAPPLYAGENT

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                       │
│  Dashboard • Job Search • Applications • Resume • Analytics      │
└──────────────┬──────────────────────────────────────────────────┘
               │ HTTP/WebSocket
               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     API Gateway / Load Balancer                  │
│                     (Nginx / Cloudflare)                         │
└──────────────┬──────────────────────────────────────────────────┘
               │
       ┌───────┼───────┐
       ▼       ▼       ▼
    ┌──────┬──────┬──────┐
    │ Backend APIs │
    │  (FastAPI)   │
    └──┬───────────┘
       │
   ┌───┴────────────────┬──────────────┬─────────────────┐
   │                    │              │                 │
   ▼                    ▼              ▼                 ▼
┌────────┐        ┌──────────┐   ┌─────────┐     ┌───────────┐
│   AI   │        │   Job    │   │ Resume  │     │ Recruiter │
│ Agents │        │  Search  │   │ Parser  │     │ Outreach  │
│        │        │ & Match  │   │ & ATS   │     │           │
└────────┘        └──────────┘   └─────────┘     └───────────┘
   │                 │              │                 │
   │          ┌──────┴──────┐       │                 │
   │          ▼             ▼       │                 │
   │      ┌─────────────────────┐  │                 │
   └─────►│   Automation Engine │  │                 │
          │ (Playwright/n8n)    │◄─┘                 │
          └─────────────────────┘                    │
                    │                                │
        ┌───────────┼───────────────────┐            │
        │           │                   │            │
        ▼           ▼                   ▼            ▼
    ┌────────┐ ┌────────┐          ┌──────────┐ ┌────────┐
    │LinkedIn│ │ Indeed │  ... DB  │ Vector   │ │External│
    │ Jobs   │ │ Scraper│          │  Memory  │ │ APIs   │
    └────────┘ └────────┘          └──────────┘ └────────┘
```

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS + ShadCN UI
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Charts**: Chart.js + react-chartjs-2
- **Animations**: Framer Motion

### Backend
- **Framework**: FastAPI
- **Server**: Uvicorn
- **ORM**: SQLAlchemy
- **Database**: PostgreSQL 14+
- **Cache**: Redis
- **Task Queue**: Celery (optional)

### AI & Automation
- **LLMs**: OpenAI GPT-4, Claude 3
- **Orchestration**: LangChain
- **Browser Automation**: Playwright
- **Vector DB**: Pinecone / ChromaDB
- **Web Scraping**: BeautifulSoup4

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **CI/CD**: GitHub Actions
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Render / Railway
- **Monitoring**: TBD

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  phone VARCHAR,
  linkedin_url VARCHAR,
  portfolio_url VARCHAR,
  github_url VARCHAR,
  auto_apply_mode BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Jobs Table
```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY,
  user_id UUID FOREIGN KEY,
  title VARCHAR NOT NULL,
  company VARCHAR NOT NULL,
  location VARCHAR,
  description TEXT,
  skills_required JSON,
  match_score FLOAT,
  interview_probability FLOAT,
  url VARCHAR UNIQUE,
  source VARCHAR,
  posted_at TIMESTAMP,
  found_at TIMESTAMP DEFAULT NOW()
);
```

### Applications Table
```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY,
  user_id UUID FOREIGN KEY,
  job_id UUID,
  status VARCHAR DEFAULT 'applied',
  resume_path VARCHAR,
  cover_letter TEXT,
  applied_at TIMESTAMP DEFAULT NOW(),
  last_updated TIMESTAMP DEFAULT NOW()
);
```

### Resumes Table
```sql
CREATE TABLE resumes (
  id UUID PRIMARY KEY,
  user_id UUID UNIQUE FOREIGN KEY,
  name VARCHAR,
  email VARCHAR,
  phone VARCHAR,
  skills JSON,
  experience JSON,
  education JSON,
  projects JSON,
  ai_score FLOAT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## API Architecture

### Request Flow
1. **Client Request** → Next.js Frontend
2. **Frontend** → FastAPI Backend `/api/*`
3. **Authentication** → JWT verification
4. **Routing** → Route handler
5. **Business Logic** → Agent execution
6. **Database** → SQLAlchemy ORM → PostgreSQL
7. **Cache** → Redis (optional)
8. **Response** → JSON

### Job Search Flow
```
Scheduled Job Search (every 30 min)
    ↓
Search Engines (LinkedIn, Indeed, Naukri, Glassdoor)
    ↓
Extract Job Details
    ↓
Job Matcher (Compute Match Score)
    ↓
Filter by Threshold (>60%)
    ↓
Store in Database
    ↓
Send Notifications
    ↓
Auto-Apply (if match_score > 75% and auto_apply_mode ON)
```

### Application Flow
```
User Uploads Resume
    ↓
Resume Parser (Extract Skills, Experience, Education)
    ↓
Store Resume + Compute AI Score
    ↓
User Selects Job
    ↓
ATS Optimizer (Tailor Resume + Generate Cover Letter)
    ↓
Auto-Apply Engine (Fill Forms + Submit)
    ↓
Track Application
    ↓
Update Status (Pending → Interview → Offer)
```

## Deployment Architecture

### Production Setup
```
User
  ↓
Vercel (Frontend CDN)
  ↓
Cloudflare (DNS + Cache)
  ↓
Render/Railway (Backend + API)
  ↓
AWS RDS (PostgreSQL)
  ↓
AWS ElastiCache (Redis)
```

### CI/CD Pipeline
```
Git Push
  ↓
GitHub Actions (Test + Build)
  ↓
Docker Build + Push
  ↓
Vercel Deploy (Frontend)
  ↓
Render Deploy (Backend)
  ↓
Run Migrations
  ↓
Smoke Tests
  ↓
Notify Team
```

## Scaling Considerations

### Current (MVP)
- Single backend instance
- Shared PostgreSQL
- Shared Redis
- Basic caching

### Growth (Production)
- Load balanced backend (multiple instances)
- Database replication + read replicas
- Redis cluster
- CDN for frontend
- Job queues (Celery)
- Microservices (optional)

## Security

- JWT authentication
- HTTPS/TLS encryption
- Password hashing (bcrypt)
- CORS protection
- Rate limiting
- SQL injection protection (SQLAlchemy)
- XSS protection (React)
- CSRF protection (Next.js)

## Monitoring & Logging

### Frontend
- Sentry for error tracking
- Google Analytics for user behavior
- Performance monitoring (Web Vitals)

### Backend
- Application logging (Python logging)
- Error tracking (Sentry)
- Database monitoring
- Redis monitoring
- API metrics (Prometheus)
- Uptime monitoring (StatusPage)
