# 🚀 QUICK START GUIDE - 7FRIJOBAPPLYAGENT

## 1️⃣ Local Development (5 minutes)

### Prerequisites
- Node.js 18+ and Python 3.10+
- PostgreSQL & Redis running

### Setup

```bash
# Clone & navigate
cd e:\jobapply

# Setup environment
cp .env.example .env

# Install & Run Frontend
cd frontend && npm install && npm run dev

# In new terminal - Install & Run Backend
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000

# In new terminal - Run Database
# Make sure PostgreSQL is running
psql -U postgres -c "CREATE DATABASE jobapply;"
```

**Dashboard**: http://localhost:3000
**API Docs**: http://localhost:8000/docs

---

## 2️⃣ Docker Setup (1 command)

```bash
docker-compose -f docker/docker-compose.yml up -d
```

All services running:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Database: PostgreSQL at localhost:5432
- Cache: Redis at localhost:6379

---

## 3️⃣ Deploy to Production

### Frontend (Vercel)
1. Push to GitHub
2. Connect repo to Vercel
3. Set `NEXT_PUBLIC_API_URL` environment variable
4. Deploy (automatic)

### Backend (Render)
1. Create new Web Service on Render
2. Connect GitHub repo (select `backend` root dir)
3. Add PostgreSQL database
4. Add Redis cache
5. Set environment variables
6. Deploy

**Total deployment time**: ~5-10 minutes

---

## 4️⃣ Key Features

✅ **Job Search** - Scans 8+ job sources every 30 minutes
✅ **Resume Parser** - Extracts skills, experience, projects
✅ **ATS Optimizer** - Tailors resume for each job
✅ **Auto-Apply** - Submits applications automatically
✅ **Recruiter Outreach** - Finds & contacts recruiters
✅ **Dashboard** - Real-time analytics & tracking
✅ **Mobile Responsive** - Works on all devices

---

## 5️⃣ Next Steps

1. **Upload Resume**
   - Settings → Upload Resume (PDF)
   - System extracts skills automatically

2. **Configure Preferences**
   - Select job titles, skills, locations
   - Set auto-apply threshold (default: 75%)
   - Configure notification channels

3. **Start Job Search**
   - Dashboard will scan jobs automatically
   - Get notified when matches found
   - Applications submitted automatically

4. **Track Progress**
   - View all applications
   - See interview invitations
   - Track offer conversion rate

---

## 6️⃣ Architecture

```
Frontend (Next.js)
     ↓
API (FastAPI)
     ↓
Jobs DB (PostgreSQL) ← Job Search
Resume Cache (Redis)
Vector Memory (ChromaDB)
     ↓
AI Agents (LLM Integration)
     ↓
Auto-Apply Engine (Playwright)
Recruiter Outreach (LinkedIn)
```

---

## 7️⃣ API Examples

### Get User
```bash
curl -X GET http://localhost:8000/api/users/user-id \
  -H "Authorization: Bearer <token>"
```

### List Jobs
```bash
curl -X GET "http://localhost:8000/api/jobs?user_id=user-id" \
  -H "Authorization: Bearer <token>"
```

### Submit Application
```bash
curl -X POST http://localhost:8000/api/applications?user_id=user-id \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "job_id": "job-123",
    "job_title": "AI Engineer",
    "company": "Google"
  }'
```

Full API Docs: http://localhost:8000/docs

---

## 8️⃣ File Structure

```
7frijobapplyagent/
├── frontend/          # Next.js dashboard
├── backend/           # FastAPI API
├── agents/            # AI agents (job hunter, resume, etc.)
├── automation/        # Playwright scripts
├── docker/            # Docker configs
├── .github/workflows/ # CI/CD pipelines
├── docs/              # Documentation
└── README.md
```

---

## 9️⃣ Environment Variables

Key variables (see `.env.example`):
```
OPENAI_API_KEY=sk-...
CLAUDE_API_KEY=sk-ant-...
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=your-secret-key
```

---

## 🔟 Support & Docs

- **Setup Guide**: [docs/SETUP.md](docs/SETUP.md)
- **API Docs**: [docs/API.md](docs/API.md)
- **Architecture**: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Deployment**: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
- **Contributing**: [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📊 Status Dashboard

**Frontend**: ✅ Ready
**Backend**: ✅ Ready
**Database**: ⚙️ Configure
**AI APIs**: ⚙️ Add keys
**Deployment**: 📋 Instructions ready

---

**Built with ❤️ for AI job hunters**
**Status**: LIVE • AUTONOMOUS • AI JOB HUNTER • READY TO DEPLOY 🚀
