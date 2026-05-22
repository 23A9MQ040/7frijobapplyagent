# API Documentation - 7FRIJOBAPPLYAGENT

## Base URL

```
http://localhost:8000/api
Production: https://api.7frijobapplyagent.com
```

## Authentication

All endpoints (except `/health` and `/`) require JWT token in header:

```bash
Authorization: Bearer <YOUR_JWT_TOKEN>
```

## User Endpoints

### Register User
```http
POST /users/register
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "phone": "+1234567890",
  "password": "secure_password"
}

Response: 201
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "created_at": "2024-01-01T00:00:00Z"
}
```

### Get User Profile
```http
GET /users/{user_id}
Authorization: Bearer <token>

Response: 200
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "auto_apply_mode": true,
  "created_at": "2024-01-01T00:00:00Z"
}
```

### Update User Profile
```http
PUT /users/{user_id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "auto_apply_mode": false,
  "linkedin_url": "https://linkedin.com/in/jane-doe"
}

Response: 200
```

## Job Endpoints

### List Jobs
```http
GET /jobs?skip=0&limit=20&user_id=<user_id>
Authorization: Bearer <token>

Response: 200
[
  {
    "id": "uuid",
    "title": "AI Engineer",
    "company": "Google",
    "location": "Mountain View, CA",
    "match_score": 0.92,
    "interview_probability": 0.85,
    "skills_required": ["Python", "ML", "TensorFlow"],
    "url": "https://...",
    "posted_at": "2024-01-01T00:00:00Z"
  }
]
```

### Get Job Details
```http
GET /jobs/{job_id}
Authorization: Bearer <token>

Response: 200
{
  "id": "uuid",
  "title": "AI Engineer",
  "company": "Google",
  "description": "...",
  "match_score": 0.92,
  "interview_probability": 0.85
}
```

### Get Trending Jobs
```http
GET /jobs/trending?skip=0&limit=20
Authorization: Bearer <token>

Response: 200
[
  {
    "id": "uuid",
    "title": "GenAI Engineer",
    "company": "OpenAI",
    "match_score": 0.88
  }
]
```

## Resume Endpoints

### Upload Resume
```http
POST /resume/upload?user_id=<user_id>
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <resume.pdf>

Response: 201
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "skills": ["Python", "React", "AWS"],
  "ai_score": 0.85,
  "created_at": "2024-01-01T00:00:00Z"
}
```

### Get Resume
```http
GET /resume/{user_id}
Authorization: Bearer <token>

Response: 200
{
  "id": "uuid",
  "name": "John Doe",
  "skills": ["Python", "React", "AWS"],
  "ai_score": 0.85
}
```

## Application Endpoints

### Submit Application
```http
POST /applications?user_id=<user_id>
Authorization: Bearer <token>
Content-Type: application/json

{
  "job_id": "uuid",
  "job_title": "AI Engineer",
  "company": "Google"
}

Response: 201
{
  "id": "uuid",
  "job_title": "AI Engineer",
  "company": "Google",
  "status": "applied",
  "applied_at": "2024-01-01T00:00:00Z"
}
```

### List Applications
```http
GET /applications?user_id=<user_id>&status=applied
Authorization: Bearer <token>

Response: 200
[
  {
    "id": "uuid",
    "job_title": "AI Engineer",
    "company": "Google",
    "status": "applied",
    "applied_at": "2024-01-01T00:00:00Z"
  }
]
```

### Update Application Status
```http
PUT /applications/{app_id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "interview"
}

Response: 200
{
  "id": "uuid",
  "status": "interview",
  "last_updated": "2024-01-02T00:00:00Z"
}
```

## Health Check

```http
GET /health

Response: 200
{
  "status": "healthy",
  "app": "7FRIJOBAPPLYAGENT",
  "version": "1.0.0"
}
```

## Error Responses

```json
{
  "detail": "Error message",
  "status_code": 400
}
```

### Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Rate Limiting

- 100 requests per minute per user
- Headers returned:
  - `X-RateLimit-Limit: 100`
  - `X-RateLimit-Remaining: 99`
  - `X-RateLimit-Reset: 1234567890`

## Webhooks (Future)

Subscribe to events:
- `job.matched` - New job match found
- `application.submitted` - Application submitted
- `recruiter.responded` - Recruiter response received
- `interview.scheduled` - Interview scheduled
