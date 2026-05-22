# Setup Guide - 7FRIJOBAPPLYAGENT

## Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org))
- **Python** 3.10+ ([Download](https://www.python.org))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org))
- **Redis** ([Download](https://redis.io))
- **Docker** (optional, for containerized setup)
- **Git**

## Local Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/23A9MQ040/7frijobapplyagent.git
cd 7frijobapplyagent
```

### 2. Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your values:
- OpenAI API key (for resume optimization)
- Claude API key (for analysis)
- Database credentials
- Social profile URLs

### 3. Setup Database

```bash
# Create PostgreSQL database
psql -U postgres -c "CREATE DATABASE jobapply;"
```

### 4. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`

### 5. Setup Backend

```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
alembic upgrade head

# Start server
python -m uvicorn main:app --reload --port 8000
```

Backend API at `http://localhost:8000`

### 6. Redis Setup (Optional)

```bash
# macOS (with Homebrew)
brew install redis
brew services start redis

# Linux
redis-server

# Windows (via Docker)
docker run -d -p 6379:6379 redis:7
```

## Docker Setup

### Full Stack with Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Services:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## Testing

### Backend Tests

```bash
cd backend
pytest
pytest --cov  # With coverage
```

### Frontend Tests

```bash
cd frontend
npm test
npm test -- --coverage
```

## Verification

1. **Check Backend Health**
```bash
curl http://localhost:8000/health
```

2. **Check Frontend**
Open `http://localhost:3000` in browser

3. **Check API Docs**
Visit `http://localhost:8000/docs` for Swagger UI

## Troubleshooting

### Port Already in Use

```bash
# Kill process using port 3000 (frontend)
lsof -ti:3000 | xargs kill -9

# Kill process using port 8000 (backend)
lsof -ti:8000 | xargs kill -9
```

### Database Connection Error

```bash
# Check PostgreSQL is running
psql -U postgres -d jobapply -c "SELECT 1"

# Check connection string in .env
```

### Redis Connection Error

```bash
# Check Redis is running
redis-cli ping
# Should return: PONG
```

## Next Steps

1. **Upload Resume**: Go to Settings → Upload Resume
2. **Configure Preferences**: Set job preferences and notification channels
3. **Start Job Search**: Dashboard will auto-search for jobs
4. **Enable Auto Apply**: Turn on auto-apply for jobs matching criteria
5. **Track Applications**: Monitor applications on dashboard

## Documentation

- [API Documentation](../docs/API.md)
- [Architecture Guide](../docs/ARCHITECTURE.md)
- [Deployment Guide](../docs/DEPLOYMENT.md)
- [Contributing Guide](../CONTRIBUTING.md)

## Support

Having issues? 
1. Check logs: `docker-compose logs`
2. Create GitHub issue
3. Check FAQ: [docs/FAQ.md](../docs/FAQ.md)
