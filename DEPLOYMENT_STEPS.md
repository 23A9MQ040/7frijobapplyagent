# 🚀 Deployment Steps

## Step 1: Create GitHub Repository (MANUAL - 1 minute)

1. Go to: https://github.com/new
2. **Repository name**: `jobapplyagent`
3. **Visibility**: Keep as "Public"
4. Click **"Create repository"**

---

## Step 2: Push Code to GitHub (AUTOMATIC)

Once repository is created, run:

```powershell
cd e:\jobapply

# Verify main branch
git branch -M main

# Push code
git push -u origin main
```

**Expected Output**:
```
Enumerating objects: 51, done.
✅ To https://github.com/404errorhere/jobapplyagent.git
   * [new branch]      main -> main
```

---

## Step 3: Deploy Frontend (Vercel)

### Create Vercel Account & Deploy
1. Go to: https://vercel.com
2. Sign up with GitHub
3. Click "New Project" 
4. Import: `jobapplyagent`
5. **Root Directory**: `frontend`
6. Click "Deploy"

### After Deployment
Add environment variable in Vercel:
- Key: `NEXT_PUBLIC_API_URL`
- Value: `https://jobapplyagent-api.onrender.com`

**Frontend Live URL**: `https://jobapplyagent.vercel.app`

---

## Step 4: Deploy Backend (Render)

### Create Render Account & Resources

**A. PostgreSQL Database**
- Go to: https://render.com
- New → PostgreSQL
- Name: `jobapplyagent-postgres`
- Copy CONNECTION STRING → Save as `DATABASE_URL`

**B. Create Web Service**
- New → Web Service
- Connect GitHub repository: `jobapplyagent`
- Runtime: Python
- Root Directory: `backend`
- Build Command: `pip install -r requirements.txt`
- Start Command: `gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 0.0.0.0:$PORT`

**C. Environment Variables**
```
DATABASE_URL = (from PostgreSQL)
REDIS_URL = redis://localhost:6379
OPENAI_API_KEY = sk-...
CLAUDE_API_KEY = sk-ant-...
JWT_SECRET = (random string)
DEBUG = false
CORS_ORIGINS = ["https://jobapplyagent.vercel.app"]
```

**Backend Live URL**: `https://jobapplyagent-api.onrender.com`

---

## Live Links Summary

```
🎯 Frontend: https://jobapplyagent.vercel.app
🎯 Backend: https://jobapplyagent-api.onrender.com
🎯 GitHub: https://github.com/404errorhere/jobapplyagent
```

---

## Troubleshooting

### Push fails with "repository not found"
- Make sure GitHub repository exists first
- Check remote: `git remote -v`

### Vercel deployment fails
- Ensure `package.json` exists in `frontend/` folder
- Check build logs in Vercel dashboard

### Render deployment fails
- Verify `requirements.txt` exists in `backend/` folder
- Check environment variables are set correctly
- Review logs in Render dashboard

