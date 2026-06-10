# AI Test Failure Analyzer

An AI-powered platform that analyzes automated test execution failures and generates intelligent Root Cause Analysis (RCA) using Large Language Models (LLMs).

The application allows teams to upload test execution reports, extract failures, analyze logs and stack traces, and receive actionable insights to reduce debugging time and improve test reliability.

## Features

### Authentication

* User registration and login
* JWT-based authentication
* Secure password hashing using bcrypt

### Test Report Management

* Upload test execution reports
* Store report metadata in MongoDB
* Track execution history by build ID

### Failure Analysis

* Parse test reports (JUnit XML, Cucumber JSON, etc.)
* Extract failed test cases
* Capture stack traces and error messages
* Identify recurring failures

### AI-Powered Root Cause Analysis

* Analyze failures using OpenAI/Claude APIs
* Generate probable root causes
* Provide confidence scores
* Suggest remediation steps

### Historical Insights

* Store previous analyses
* Detect recurring patterns
* Build a searchable failure knowledge base

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT
* bcryptjs

### AI Integration

* OpenAI API / Claude API

### Additional Tools

* Multer (File Uploads)
* Swagger (API Documentation)
* Winston (Logging)
* BullMQ (Background Jobs - Planned)
* Redis (Caching & Queues - Planned)

## Project Structure

```text
src/
│
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
└── uploads/
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd ai-test-failure-analyzer
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/ai-analyzer
JWT_SECRET=your-secret-key
OPENAI_API_KEY=your-api-key
```

### Run Application

Development Mode:

```bash
npm run dev
```

Production Mode:

```bash
npm start
```

## API Endpoints

### Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

### Reports

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | /api/report/upload   |
| GET    | /api/report/:buildId |

## Future Enhancements

* JUnit XML parser
* Cucumber report parser
* AI-powered RCA generation
* Failure trend dashboard
* Slack / Microsoft Teams notifications
* Elasticsearch integration
* Kubernetes deployment
* Multi-tenant support
* Failure similarity detection
* AI knowledge base for recurring issues

## Use Cases

* QA Automation Teams
* DevOps Engineers
* SDET Engineers
* CI/CD Pipelines
* Release Validation Workflows

## Why This Project?

Debugging failed automated tests often consumes significant engineering time. This platform accelerates failure triage by combining automated report parsing with AI-generated root cause analysis, helping teams identify and resolve issues faster.

---

Built with Node.js, MongoDB, and AI to streamline automated test failure investigations.
