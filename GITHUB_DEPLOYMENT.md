# 🚀 GitHub Deployment & Live Project Guide

## Step 1: Create GitHub Repository

### Option A: Using GitHub CLI (Recommended)

```bash
# Install GitHub CLI if needed: https://cli.github.com

# Login to GitHub
gh auth login

# Create new repository
gh repo create 7frijobapplyagent --source=. --remote=origin --push
```

### Option B: Manual GitHub Setup

1. Go to [GitHub.com](https://github.com/new)
2. Create new repository named `7frijobapplyagent`
3. **Do NOT** initialize with README (we already have files)
4. Click "Create repository"

Then in terminal:

```bash
cd e:\jobapply

# Add GitHub remote
git remote add origin https://github.com/YOUR-USERNAME/7frijobapplyagent.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Step 2: Verify Repository on GitHub

After pushing, check:
- ✅ All 49 files visible on GitHub
- ✅ Commit history shows "Initial commit"
- ✅ README.md displays properly
- ✅ `.github/workflows/` shows CI/CD pipelines

Visit: `https://github.com/YOUR-USERNAME/7frijobapplyagent`

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Connect Vercel to GitHub

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Import Git Repository"
4. Find your `7frijobapplyagent` repo
5. Click "Import"

### 3.2 Configure Vercel

**Root Directory**: `frontend`

**Environment Variables**:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```
(Or your live backend URL after Step 4)

**Framework**: Next.js

**Build Command**: `npm run build`

**Output Directory**: `.next`

### 3.3 Deploy

- Click "Deploy"
- Wait for deployment (2-3 minutes)
- Get Vercel URL: `https://7frijobapplyagent.vercel.app`

**✅ Frontend is now LIVE!**

---

## Step 4: Deploy Backend to Render

### 4.1 Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New"
4. Select "Web Service"

### 4.2 Configure Backend Service

**Settings**:
- **Repository**: Select `7frijobapplyagent`
- **Branch**: `main`
- **Root Directory**: `backend`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 0.0.0.0:$PORT`

### 4.3 Add Environment Variables

Go to "Environment" tab and add:

```
DATABASE_URL=postgresql://...     # From PostgreSQL database
REDIS_URL=redis://...             # From Redis instance
OPENAI_API_KEY=sk-...
CLAUDE_API_KEY=sk-ant-...
JWT_SECRET=<generate-secret>
DEBUG=false
CORS_ORIGINS=["https://7frijobapplyagent.vercel.app","http://localhost:3000"]
```

### 4.4 Create PostgreSQL Database

1. In Render, click "New" → "PostgreSQL"
2. Name: `jobapply-postgres`
3. Copy connection string to `DATABASE_URL`

### 4.5 Create Redis Cache

1. In Render, click "New" → "Redis"
2. Name: `jobapply-redis`
3. Copy connection string to `REDIS_URL`

### 4.6 Deploy

- Click "Create Web Service"
- Wait for deployment (5-10 minutes)
- Get Backend URL: `https://jobapply-api.onrender.com`

**✅ Backend is now LIVE!**

---

## Step 5: Update Frontend with Live API URL

Now that backend is deployed, update frontend to use live URL:

```bash
# In frontend/.env.production or Vercel settings
NEXT_PUBLIC_API_URL=https://jobapply-api.onrender.com
```

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add: `NEXT_PUBLIC_API_URL=https://jobapply-api.onrender.com`
5. Redeploy: Click "Deployments" → "Redeploy"

---

## Step 6: Test Live Project

### 6.1 Test Frontend
```bash
# Visit in browser
https://7frijobapplyagent.vercel.app
```

✅ Should see:
- Dashboard UI loading
- Header with notifications
- Sidebar with navigation
- Application tracker with sample data

### 6.2 Test Backend API

```bash
# Health check
curl https://jobapply-api.onrender.com/health

# Response should be:
{
  "status": "healthy",
  "app": "7FRIJOBAPPLYAGENT",
  "version": "1.0.0"
}
```

### 6.3 Test API Documentation

```
https://jobapply-api.onrender.com/docs
```

✅ Should see interactive Swagger UI with all endpoints

### 6.4 Test Database Connection

In Render backend logs, should see:
```
Application startup complete
```

---

## Step 7: Configure GitHub Actions CI/CD

Your workflows are already created in `.github/workflows/`:

- **test.yml** - Runs on every push/PR
- **deploy.yml** - Deploys on push to main

### 7.1 Enable GitHub Actions

1. Go to GitHub repo
2. Click "Actions" tab
3. Workflows should auto-enable
4. Verify `.github/workflows/*.yml` files show up

### 7.2 Check Workflow Runs

1. Make a test commit:
```bash
cd e:\jobapply
echo "# Updated README" >> README.md
git add README.md
git commit -m "Test CI/CD pipeline"
git push
```

2. Watch GitHub Actions:
   - Go to repo → "Actions" tab
   - See workflow running
   - Verify: ✅ Tests pass
   - Verify: ✅ Build succeeds

---

## Step 8: Live Monitoring

### GitHub Actions
- View test results: https://github.com/YOUR-USERNAME/7frijobapplyagent/actions
- See deployment status
- Check logs for errors

### Render Dashboard
- Monitor backend uptime
- View logs in real-time
- Check resource usage

### Vercel Dashboard
- Monitor frontend performance
- View analytics
- Check deployment history

---

## ✅ Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] All 49 files visible on GitHub
- [ ] Frontend deployed on Vercel
- [ ] Backend deployed on Render
- [ ] PostgreSQL database created
- [ ] Redis cache created
- [ ] Environment variables configured
- [ ] Frontend connects to live backend
- [ ] API health check passes
- [ ] Swagger docs accessible
- [ ] GitHub Actions CI/CD working
- [ ] Live URL accessible publicly

---

## 📊 Live Project URLs

Once everything is deployed:

| Service | URL | Status |
|---------|-----|--------|
| **GitHub** | https://github.com/YOUR-USERNAME/7frijobapplyagent | Public repo |
| **Frontend** | https://7frijobapplyagent.vercel.app | Live |
| **Backend API** | https://jobapply-api.onrender.com | Live |
| **API Docs** | https://jobapply-api.onrender.com/docs | Swagger UI |
| **GitHub Actions** | https://github.com/.../actions | Auto CI/CD |

---

## 🔄 Making Updates

After initial deployment, updates are automatic:

### Frontend Update
```bash
git add frontend/
git commit -m "feat: Update dashboard"
git push origin main
# → Vercel auto-deploys (1-2 min)
```

### Backend Update
```bash
git add backend/
git commit -m "feat: Add new API endpoint"
git push origin main
# → Render auto-deploys (3-5 min)
```

### View Deployment Status
- **Vercel**: Dashboard → Deployments
- **Render**: Dashboard → Backend → Deploys

---

## 🔐 Security Checklist

Before going truly public:

- [ ] All secrets in environment variables (not in code)
- [ ] `.env.example` has no real keys
- [ ] `JWT_SECRET` changed from default
- [ ] CORS origins limited to your domain
- [ ] Database backups enabled
- [ ] Monitoring & alerts configured
- [ ] Rate limiting enabled
- [ ] HTTPS enforced (automatic on Vercel/Render)

---

## 🐛 Troubleshooting

### Frontend not connecting to backend
```bash
# Check environment variable
echo $NEXT_PUBLIC_API_URL

# Update in Vercel settings
# Redeploy after update
```

### Backend giving 502 errors
```bash
# Check Render logs
# View in Render Dashboard → Logs

# Verify database connection
# Check DATABASE_URL in environment
```

### GitHub Actions failing
```bash
# Click "Actions" tab
# Select failing workflow
# View logs to see error
# Common: Missing dependencies, wrong path
```

### Database connection timeout
```bash
# Increase Render's database timeout
# Or use PgBouncer for connection pooling
```

---

## 📈 Next Steps for Production

1. **Domain Setup**
   ```
   yourcompany.com → Vercel (frontend)
   api.yourcompany.com → Render (backend)
   ```

2. **Email Notifications**
   - SendGrid integration
   - Email on new job matches
   - Interview reminders

3. **Analytics**
   - Google Analytics (frontend)
   - Sentry (error tracking)
   - Datadog (monitoring)

4. **Scaling**
   - Load balancing
   - Database replicas
   - Redis cluster

---

## 📞 Support Commands

```bash
# Check git status
git status

# View recent commits
git log --oneline

# View GitHub remotes
git remote -v

# Pull latest from GitHub
git pull origin main

# View deployed branches
git branch -a
```

---

**Now your 7FRIJOBAPPLYAGENT is LIVE and accessible from anywhere! 🚀**

**Status: DEPLOYED • MONITORING • READY FOR USERS**
