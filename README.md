# GitScope

GitScope is an AI-powered GitHub repository and issue analysis platform designed to help developers, especially beginners, understand open-source projects and contribute effectively. It analyzes repositories, explains project structure, evaluates issues, and provides AI-generated contribution guidance.

## Overview

Many developers struggle while starting open-source contributions because they find it difficult to understand large codebases, identify beginner-friendly issues, and decide where to start.

GitScope solves this problem by using AI to analyze GitHub repositories and issues. It provides repository insights, difficulty estimation, relevant files, and a step-by-step roadmap for contribution.

## Features

### Repository Analysis

- Analyze any public GitHub repository using its URL
- Generate AI-powered repository summaries
- Identify technologies and frameworks used
- Understand project architecture
- View repository folder structure
- Get contribution guidance for new developers

### Issue Analysis

- Analyze GitHub issues using AI
- Understand the problem statement clearly
- Identify possible root causes
- Get issue difficulty classification
- Estimate required implementation time
- Suggest files related to the issue
- Generate step-by-step contribution roadmap

### Explore Repositories

- Discover popular GitHub repositories
- View repository details:
  - Stars
  - Forks
  - Programming language
  - Description
- Analyze repositories directly from Explore
- Pagination support for better performance

### Issue Discovery

- Browse trending GitHub issues
- Find beginner-friendly good first issues
- Search issues across GitHub
- Analyze issues before contributing
- Dedicated issue analysis pages

### Authentication

- Email and password authentication
- JWT-based authorization
- GitHub OAuth authentication
- Email OTP verification
- Secure cookie-based session handling

### Performance Optimization

- Redis caching for frequently accessed data
- Cached repository analysis
- Cached issue analysis
- Cached trending repositories
- Cached trending issues
- Cached search results
- Redis-based API rate limiting

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Axios
- Context API

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- MySQL
- Redis

### Authentication and Security

- JWT
- Passport.js
- GitHub OAuth
- Nodemailer
- Email OTP Verification
- Redis Rate Limiting

### AI and APIs

- Groq AI
- GitHub REST API
- Octokit

## System Architecture

```
Client (Next.js)
        |
        |
Express.js API Server
        |
        |
--------------------------------
|              |               |
MySQL        Redis          External APIs
Prisma       Cache          GitHub API
Database     Layer          Groq AI
```

## Backend Architecture

```
src
|
├── config
│   ├── database configuration
│   ├── redis configuration
│   └── passport configuration
│
├── controllers
│   ├── authentication
│   ├── repositories
│   └── issues
│
├── services
│   ├── github services
│   ├── AI services
│   └── cache services
│
├── middlewares
│   ├── authentication middleware
│   └── rate limiter middleware
│
├── routes
│
├── utils
│
└── prisma
```

## API Features

### Authentication APIs

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/send-otp
POST /api/auth/verify-otp
GET  /api/auth/github
```

### Repository APIs

```
POST /api/repository/analyze

GET /api/explore/repositories?page=1
```

### Issue APIs

```
GET /api/issues/trending?page=1

GET /api/issues/good-first?page=1

GET /api/issues/search?q=react&page=1

POST /api/issues/analyze
```

## Redis Implementation

Redis is used to improve application performance and reduce external API usage.

Cached data:

```
repository:{owner}:{repo}

issue:{owner}:{repo}:{issueNumber}

explore:repositories:{page}

issues:trending:{page}

issues:good-first:{page}

issues:search:{query}:{page}
```

Benefits:

- Faster API responses
- Reduced GitHub API calls
- Reduced AI API usage
- Better scalability

## Installation

Clone the repository:

```bash
git clone https://github.com/username/GitScope.git
```

Install dependencies:

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd backend
npm install
```

## Environment Variables

Backend:

```env
DATABASE_URL=

JWT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

GITHUB_TOKEN=

GROQ_API_KEY=

REDIS_URL=redis://localhost:6379

EMAIL_USER=
EMAIL_PASSWORD=
```

Frontend:

```env
NEXT_PUBLIC_API_URL=
```

## Running Redis with Docker

```bash
docker run -d --name GitScope-redis -p 6379:6379 redis:7
```

Verify Redis:

```bash
docker exec -it GitScope-redis redis-cli ping
```

Expected output:

```bash
PONG
```

## Running the Application

Start backend:

```bash
npm run dev
```

Start frontend:

```bash
npm run dev
```

## Future Enhancements

- Dockerize complete application
- Add Swagger API documentation
- Add automated testing
- Add CI/CD pipeline
- Advanced repository recommendations
- Personalized contribution suggestions

## Purpose

GitScope aims to make open-source contribution easier by reducing the time developers spend understanding repositories and issues. It helps contributors focus more on solving problems and building meaningful contributions.
