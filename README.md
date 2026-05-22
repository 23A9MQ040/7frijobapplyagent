# 🚀 7FRIJOBAPPLYAGENT

**AI-Powered Autonomous Job Application SaaS Platform**

Find, analyze, optimize, and apply for AI-related jobs **24/7** like a real AI startup platform.

---

## 👤 User Profile

- **Name**: POTTHURI CHITTI SAI SUMANTH VARMA
- **Role**: AI Job Applicant / AI Engineer Candidate
- **Status**: LIVE • AUTONOMOUS • AI JOB HUNTER • RUNNING

### Links
- 🔗 [LinkedIn](https://www.linkedin.com/in/sumanth-varma-potturi-697479290/)
- 🌐 [Portfolio](https://23a9mq040.github.io/myportofilowebsite/)
- 💻 [GitHub](https://github.com/23A9MQ040)

---

## 🎯 Core Features

### 🔍 Live Job Search Engine
- Scans LinkedIn Jobs, Indeed, Naukri, Glassdoor, Wellfound every 30 minutes
- Focuses on: AI Engineer, GenAI Engineer, ML Engineer, Prompt Engineer, LLM Engineer
- Extracts job details, computes match scores, predicts interview probability

### 📊 AI-Powered Job Matching
- Computes match score % for each job
- Identifies skill gaps
- Prioritizes roles with 80%+ match
- Ignores jobs < 60% match

### 📝 ATS Resume Optimizer
- Tailors resume per job
- Injects ATS keywords
- Generates cover letters
- Creates HR outreach messages

### 🤖 Auto-Apply Engine
- Automatically fills job forms
- Uploads tailored resume & cover letter
- Answers screening questions
- Submits applications (if match > 75%)
- Prevents duplicate applications

### 💬 Recruiter Outreach
- Finds relevant recruiters
- Generates personalized messages
- Sends connection requests
- Tracks follow-ups (3-5 days)

### 📅 Application Tracking
- Real-time dashboard
- Applied, Pending, Interviews, Rejected, Offers
- Daily reports (Email, Telegram, Discord, Slack)
- Application metrics & trends

---

## 🏗️ Architecture

```
7frijobapplyagent/
├── frontend/              # Next.js Dashboard UI
│   ├── app/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── package.json
├── backend/               # FastAPI Backend
│   ├── agents/
│   ├── routes/
│   ├── models/
│   ├── utils/
│   └── main.py
├── agents/                # AI Agents
│   ├── job_hunter.py
│   ├── resume_optimizer.py
│   ├── recruiter_outreach.py
│   └── interview_prep.py
├── resume-parser/         # Resume Parser & OCR
│   ├── parser.py
│   ├── extractor.py
│   └── validators.py
├── vector-memory/         # Vector Database Integration
│   ├── embeddings.py
│   ├── storage.py
│   └── chromadb/
├── automation/            # Playwright & Puppeteer
│   ├── form_filler.py
│   ├── job_scraper.py
│   └── browser_automation.py
├── workflows/             # n8n Automation Workflows
│   ├── job_search_workflow.json
│   ├── auto_apply_workflow.json
│   └── recruiter_outreach_workflow.json
├── docker/                # Docker Configuration
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── docker-compose.yml
├── .github/workflows/     # CI/CD Pipelines
│   ├── test.yml
│   ├── build.yml
│   └── deploy.yml
├── docs/                  # Documentation
│   ├── SETUP.md
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── ARCHITECTURE.md
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- PostgreSQL 14+
- Redis
- Docker (optional)

### Installation

1. **Clone the repo**
```bash
git clone https://github.com/23A9MQ040/7frijobapplyagent.git
cd 7frijobapplyagent
```

2. **Setup environment**
```bash
cp .env.example .env
# Edit .env with your API keys and credentials
```

3. **Install dependencies**
```bash
npm install
cd frontend && npm install
cd ../backend && pip install -r requirements.txt
```

4. **Setup database**
```bash
psql -c "CREATE DATABASE jobapply;"
# Run migrations
cd backend && alembic upgrade head
```

5. **Start development**
```bash
npm run dev
```

Frontend will be at `http://localhost:3000`
Backend API at `http://localhost:8000`

---

## 📊 Tech Stack

### Frontend
- **Next.js** - React framework
- **React** - UI components
- **Tailwind CSS** - Styling
- **ShadCN UI** - Component library
- **Chart.js** - Analytics & dashboards

### Backend
- **FastAPI** - Python API framework
- **PostgreSQL** - Primary database
- **Redis** - Caching & job queue
- **SQLAlchemy** - ORM
- **Alembic** - Database migrations

### AI & Automation
- **OpenAI API** - GPT-4 for resume optimization
- **Claude API** - Analysis & reasoning
- **LangChain** - LLM orchestration
- **Playwright** - Web automation
- **Puppeteer** - Browser automation
- **Pinecone / ChromaDB** - Vector database

### DevOps
- **Docker** - Containerization
- **GitHub Actions** - CI/CD
- **Vercel** - Frontend hosting
- **Render/Railway** - Backend hosting

---

## 🔐 Security

- ✅ No fake experience
- ✅ No illegal scraping (respects robots.txt & ToS)
- ✅ No hallucinated job data
- ✅ JWT + OAuth authentication
- ✅ HTTPS encryption
- ✅ Rate limiting on all APIs
- ✅ Secure credential storage

---

## 📈 Metrics & Analytics

Track:
- Jobs found (daily)
- Applications submitted
- Recruiter responses
- Interview probability score
- ATS score improvements
- Skill gap analysis
- Job match trends

---

## 📝 API Documentation

See [docs/API.md](docs/API.md) for:
- Job Search endpoints
- Resume Parser API
- Application Tracker
- Recruiter Outreach API
- Analytics endpoints

---

## 🛠️ Deployment

### Deploy to Vercel (Frontend)
```bash
npm run deploy
```

### Deploy Backend
See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for:
- Render deployment
- Railway deployment
- Docker deployment
- GitHub Actions setup

---

## 📊 Daily Report

Every day you get:
- Jobs found (with match scores)
- Applications submitted
- Recruiter responses
- Interview opportunities
- Skill gaps identified
- Recommendations

**Channels**: Email, Telegram, Discord, Slack

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repo
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

---

## 📄 License

MIT License - See LICENSE file

---

## 💬 Support

Questions? Issues?
- Create a GitHub issue
- Check [docs/FAQ.md](docs/FAQ.md)
- Email: your-email@gmail.com

---

**Built with ❤️ for AI job hunters | Powered by LLMs & Automation**

**Status**: LIVE • AUTONOMOUS • AI JOB HUNTER • RUNNING 🚀
