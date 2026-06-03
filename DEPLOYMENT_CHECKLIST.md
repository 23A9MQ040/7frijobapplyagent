# 🚀 DEPLOYMENT CHECKLIST - Frontend & Backend

## ✅ STEP 1: Deploy Frontend to Vercel (5-7 minutes)

### 1.1 Go to Vercel Import Page
- [ ] Open: https://vercel.com/new
- [ ] You should see the "New Project" page

### 1.2 Enter Your Repository URL  
- [ ] Look for the textbox: "Ask v0 to build or enter a Git repository URL"
- [ ] **Paste**: `https://github.com/23A9MQ040/7frijobapplyagent`
- [ ] Click the **"Deploy"** button on the right

### 1.3 Configure Git Settings
- [ ] **Git Scope**: Should auto-select `23A9MQ040` (your GitHub account)
- [ ] **Repository Name**: Auto-filled as `7frijobapplyagent` ✅
- [ ] **Vercel Team**: Should show `saivarma's projects` ✅
- [ ] Click **"Create"**

### 1.4 Vercel Auto-Detection (Monorepo)
- [ ] If Vercel asks about monorepo:
  - [ ] Select `frontend/` as the **Root Directory**
  - [ ] Click **"Continue"**

### 1.5 Environment Variables
- [ ] Vercel may ask for environment variables
- [ ] **For now**, click **"Deploy"** without adding variables
- [ ] **(Later)** You can add `NEXT_PUBLIC_API_URL` after backend is deployed

### 1.6 Wait for Build & Deployment
- [ ] Watch the deployment logs
- [ ] Should see: "✅ Deployment Successful"
- [ ] **Copy your Frontend URL** (e.g., `https://7frijobapplyagent.vercel.app`)

✅ **Frontend URL**: https://7frijobapplyagent.vercel.app (you'll get this after deployment)

---

## ✅ STEP 2: Deploy Backend to Render (10-15 minutes)

### 2.1 Create PostgreSQL Database on Render

#### Go to Render
- [ ] Open: https://render.com  
- [ ] Click **"New +"** (top right)
- [ ] Select **"PostgreSQL"**

#### Configure Database
- [ ] **Name**: `7frijobapplyagent-db`
- [ ] **Database**: `7frijobapplyagent_db`
- [ ] **User**: `postgres`
- [ ] **Region**: Pick closest to you (e.g., `ohio` or `northern-california`)
- [ ] **PostgreSQL Version**: 15
- [ ] Click **"Create Database"**

#### Save Database URL
- [ ] **WAIT** for database to be created (takes ~2 mins, shows "Available")
- [ ] Click on your database
- [ ] Copy the **"Internal Database URL"** (starts with `postgres://`)
  ```
  postgres://user:password@dpg-xxx.internal:5432/dbname
  ```
- [ ] **Save this as `DATABASE_URL`** (you'll need it in a moment!)

✅ **DATABASE_URL**: (Copy from Render dashboard)

---

### 2.2 Deploy Backend Web Service on Render

#### Create Web Service
- [ ] Go back to Render dashboard
- [ ] Click **"New +"** → **"Web Service"**
- [ ] Choose **"Build and deploy from a Git repository"**
- [ ] Click **"Connect GitHub repository"**
- [ ] Search for: `7frijobapplyagent` 
- [ ] Select: `23A9MQ040/7frijobapplyagent`
- [ ] Click **"Connect"**

#### Configure Web Service
- [ ] **Name**: `7frijobapplyagent-api`
- [ ] **Region**: **Same as database above** (important!)
- [ ] **Branch**: `main`
- [ ] **Root Directory**: `backend` ← **IMPORTANT!**
- [ ] **Runtime**: `Python 3.11`
- [ ] **Build Command**: `pip install -r requirements.txt`
- [ ] **Start Command**: 
  ```
  gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 0.0.0.0:$PORT
  ```

#### Add Environment Variables
- [ ] Scroll down to **"Environment"**
- [ ] Click **"Add Environment Variable"** for each of these:

| Name | Value | Where to find |
|------|-------|---|
| `DATABASE_URL` | `postgres://...` | From step 2.1 above |
| `CORS_ORIGINS` | `["https://7frijobapplyagent.vercel.app"]` | Your Vercel frontend URL |
| `DEBUG` | `false` | Literal value |
| `JWT_SECRET` | (random string) | Run in terminal: `python -c "import secrets; print(secrets.token_urlsafe(32))"` |
| `OPENAI_API_KEY` | `sk-...` | Get from https://platform.openai.com/api-keys |
| `CLAUDE_API_KEY` | `sk-ant-...` | Get from https://console.anthropic.com |

#### Deploy
- [ ] Click **"Create Web Service"**
- [ ] **WAIT** for build (takes ~5-10 mins)
- [ ] Should see: **"Live"** (green) when done
- [ ] Copy your **Backend URL** from the deployment page
  ```
  https://7frijobapplyagent-api.onrender.com
  ```

✅ **Backend URL**: https://7frijobapplyagent-api.onrender.com (you'll get this after deployment)

---

## ✅ STEP 3: Update Frontend with Backend URL

### 3.1 Update Vercel Environment Variable
- [ ] Go to: https://vercel.com/dashboard
- [ ] Click your project: `7frijobapplyagent`
- [ ] Go to **"Settings"** → **"Environment Variables"**
- [ ] Find or create: `NEXT_PUBLIC_API_URL`
- [ ] Update value to: `https://7frijobapplyagent-api.onrender.com`
- [ ] Click **"Save"**

### 3.2 Trigger Redeploy
- [ ] Vercel will auto-redeploy, OR
- [ ] Click **"Deployments"** → Click **"..."** → **"Redeploy"**

### 3.3 Test Your Application
- [ ] Visit: https://7frijobapplyagent.vercel.app
- [ ] Try these features:
  - [ ] Sign up / Login
  - [ ] Search for jobs
  - [ ] Upload resume
  - [ ] Check if data is being saved
- [ ] **If you see API errors**:
  - [ ] Open Developer Console: **F12**
  - [ ] Check "Console" tab for error messages
  - [ ] Verify `NEXT_PUBLIC_API_URL` is correct in Vercel settings

---

## 📋 SUMMARY - Your Live Links

```
✅ FRONTEND: https://7frijobapplyagent.vercel.app
✅ BACKEND:  https://7frijobapplyagent-api.onrender.com
✅ GITHUB:   https://github.com/23A9MQ040/7frijobapplyagent
```

---

## 🆘 TROUBLESHOOTING

### Frontend Won't Load
- [ ] Check if Vercel deployment succeeded (should show "Ready")
- [ ] Try hard refresh: **Ctrl+Shift+R**

### Backend Won't Deploy on Render
- [ ] Check **Build Logs** for errors
- [ ] Common issues:
  - Missing `gunicorn` in `requirements.txt`
  - Python version mismatch
  - Environment variables not set
- [ ] Click **"Manual Deploy"** to retry

### API Connection Errors
- [ ] Check browser console (F12)
- [ ] Verify `NEXT_PUBLIC_API_URL` is correct
- [ ] Check Render backend logs to see if requests are arriving
- [ ] Ensure `CORS_ORIGINS` in backend includes your Vercel URL

### Database Connection Error on Render
- [ ] Verify `DATABASE_URL` is correctly pasted
- [ ] Check database is "Available" (green) on Render
- [ ] Restart the web service: Click "..." → "Restart"

---

## 🎯 After Successful Deployment

1. **Test all features** in your app
2. **Set up monitoring**:
   - Vercel: Analytics & Speed Insights
   - Render: Metrics & Logs
3. **Backup database** (Render → PostgreSQL → "Backups")
4. **Set up custom domain** (optional, add in Vercel & Render settings)
5. **Enable auto-deploys** (already configured via GitHub!)

---

**✅ Status**: Ready to deploy! Follow the steps above. 🚀

You can do this! The application is 100% ready. Just follow each step and you'll be live in ~20 minutes!

