# Deployment Guide - 7FRIJOBAPPLYAGENT

## Deployment Options

### Option 1: Vercel (Frontend) + Render (Backend) [Recommended]

#### Step 1: Deploy Frontend to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repo
   - Set root directory: `frontend`
   - Add environment variables:
     ```
     NEXT_PUBLIC_API_URL=https://jobapply-api.onrender.com
     ```
   - Click "Deploy"

3. **Get Vercel URL** (e.g., https://7frijobapplyagent.vercel.app)

#### Step 2: Deploy Backend to Render

1. **Sign up at** [render.com](https://render.com)

2. **Create New Web Service**
   - Connect GitHub repo
   - Select `backend` as root directory
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Set Environment Variables**
   - `DATABASE_URL`: (PostgreSQL connection string)
   - `REDIS_URL`: (Redis connection string)
   - `OPENAI_API_KEY`: (Your key)
   - `CLAUDE_API_KEY`: (Your key)
   - `JWT_SECRET`: (Generate: `python -c "import secrets; print(secrets.token_urlsafe(32))"`)

4. **Add PostgreSQL Database**
   - Click "Create Database"
   - Select "PostgreSQL"
   - Copy connection string to `DATABASE_URL`

5. **Add Redis Cache**
   - Click "Create Redis"
   - Copy connection string to `REDIS_URL`

6. **Run Migrations**
   - In Render dashboard, go to web service
   - Click "Shell" tab
   - Run: `alembic upgrade head`

#### Step 3: Update Frontend Environment

Update `frontend/.env.production`:
```
NEXT_PUBLIC_API_URL=https://jobapply-api.onrender.com
```

Deploy changes to Vercel:
```bash
git add frontend/.env.production
git commit -m "Update API URL"
git push origin main
```

---

### Option 2: Docker + Docker Swarm/Kubernetes

#### Build Docker Images

```bash
# Backend
docker build -f docker/Dockerfile.backend -t jobapply-backend:latest .

# Frontend
docker build -f docker/Dockerfile.frontend -t jobapply-frontend:latest .

# Push to Docker Hub
docker tag jobapply-backend:latest yourusername/jobapply-backend:latest
docker push yourusername/jobapply-backend:latest

docker tag jobapply-frontend:latest yourusername/jobapply-frontend:latest
docker push yourusername/jobapply-frontend:latest
```

#### Deploy with Docker Compose (Production)

```bash
# SSH into production server
ssh user@your-server.com

# Clone repo
git clone https://github.com/23A9MQ040/7frijobapplyagent.git
cd 7frijobapplyagent

# Set production environment
cp .env.example .env.production
# Edit with production values

# Start services
docker-compose -f docker/docker-compose.yml up -d

# Check status
docker-compose ps
```

---

### Option 3: Railway (Simple Deployment)

1. Go to [railway.app](https://railway.app)
2. Click "Deploy Now"
3. Select your GitHub repo
4. Configure environment variables
5. Click "Deploy"

---

## Database Migrations

### Create Migration
```bash
cd backend
alembic revision --autogenerate -m "Add new table"
```

### Apply Migrations
```bash
alembic upgrade head
```

### Rollback
```bash
alembic downgrade -1
```

---

## SSL/HTTPS Setup

### Render (Automatic)
- Render automatically provides SSL certificates

### Self-Hosted
```bash
# Using Let's Encrypt
sudo certbot certonly --standalone -d yourdomain.com
```

---

## Monitoring & Logging

### Frontend Monitoring
- **Sentry**: Error tracking
- **Google Analytics**: User behavior
- **Vercel Analytics**: Performance

### Backend Monitoring
- **Application Logs**: `docker logs jobapply-backend`
- **Database Logs**: Render dashboard
- **Redis Monitoring**: Render dashboard

### Set up Sentry (Optional)
```bash
# Install
pip install sentry-sdk

# Add to backend
import sentry_sdk
sentry_sdk.init(dsn="your-sentry-dsn")
```

---

## Scaling Strategies

### Phase 1: MVP (Current)
- Single backend instance
- Single database
- Shared Redis

### Phase 2: Growth
```bash
# Scale backend replicas
docker-compose scale backend=3

# Use load balancer (nginx)
docker-compose -f docker/docker-compose-lb.yml up -d
```

### Phase 3: Production
- Kubernetes cluster
- Distributed database
- Redis cluster
- CDN for assets
- Message queue (RabbitMQ/Kafka)

---

## Backup & Recovery

### Database Backup
```bash
# Manual backup
pg_dump -U jobapply jobapply > backup.sql

# Restore
psql -U jobapply jobapply < backup.sql

# Automated (Render)
- Render automatically backs up databases
- Access from Render dashboard
```

### Application Backup
```bash
# Git backup (automatic with GitHub)
# Additional backup
tar -czf app-backup.tar.gz .
```

---

## Troubleshooting Deployment

### Frontend not connecting to Backend
- Check `NEXT_PUBLIC_API_URL` in Vercel environment
- Verify backend is running: `curl https://api-url/health`
- Check CORS settings in backend

### Database connection errors
- Verify `DATABASE_URL` format
- Check database is accessible from backend
- Run migrations: `alembic upgrade head`

### Redis connection errors
- Verify `REDIS_URL` format
- Check Redis is running
- Test connection: `redis-cli -u <url> ping`

### High memory usage
- Check for memory leaks: `docker stats`
- Reduce worker processes
- Clear old data/logs

---

## Performance Optimization

### Frontend
```bash
# Enable Gzip compression
# Already enabled in Next.js

# Optimize images
npm install next-image-export-optimizer

# Code splitting
# Automatic in Next.js
```

### Backend
```bash
# Use Gunicorn instead of Uvicorn for production
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

---

## Monitoring Dashboard

### Create Monitoring Dashboard

```bash
# Using Prometheus + Grafana
docker-compose -f docker/docker-compose-monitoring.yml up -d

# Access at http://localhost:3001
```

---

## Post-Deployment Checklist

- [ ] Frontend accessible at vercel URL
- [ ] Backend health check passes
- [ ] Database migrations completed
- [ ] Environment variables set
- [ ] SSL/HTTPS enabled
- [ ] Monitoring configured
- [ ] Backups configured
- [ ] Error tracking enabled
- [ ] Logs aggregation setup
- [ ] CDN cache configured
- [ ] Rate limiting enabled
- [ ] CORS properly configured

---

## Support

Issues with deployment? Check:
1. Render/Vercel dashboard logs
2. Backend logs: `docker logs`
3. Database logs: Render dashboard
4. Network connectivity: `curl` tests
5. Environment variables: Verify all set
