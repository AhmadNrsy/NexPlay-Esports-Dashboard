# NexPlay Esports Dashboard

## Project Overview

NexPlay Esports Dashboard adalah sistem manajemen rental setup gaming berbasis web.

Frontend menggunakan:

- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM

Backend menggunakan:

- CodeIgniter 4 REST API
- MySQL
- Bearer Token Authentication

Deadline UAS:
19 Juni

---

## Backend Information

Base URL:

http://localhost:8080/api

Backend Location:

C:\xampp\htdocs\NexPlay-Esports-CI4

Framework:

CodeIgniter 4

Architecture:

Frontend (React Vite)
↓
CodeIgniter 4 REST API
↓
MySQL Database

---

## Authentication

### Login

POST

/api/auth/login

Request Body:

```json
{
  "username": "string",
  "password": "string"
}
```

Success Response:

```json
{
  "status": true,
  "message": "Login successful",
  "data": {
    "token": "TOKEN_HERE",
    "expired_at": "DATE_HERE"
  }
}
```

### Logout

POST

/api/auth/logout

Header:

Authorization: Bearer <token>

---

## API Modules

### Users

GET /users

GET /users/{id}

POST /users

PUT /users/{id}

DELETE /users/{id}

---

### Gaming Rooms

GET /gaming-rooms

GET /gaming-rooms/{id}

POST /gaming-rooms

PUT /gaming-rooms/{id}

DELETE /gaming-rooms/{id}

---

### PC Setups

GET /pc-setups

GET /pc-setups/{id}

POST /pc-setups

PUT /pc-setups/{id}

DELETE /pc-setups/{id}

---

### Bookings

GET /bookings

GET /bookings/{id}

POST /bookings

PUT /bookings/{id}

DELETE /bookings/{id}

---

### Payments

GET /payments

GET /payments/{id}

POST /payments

PUT /payments/{id}

DELETE /payments/{id}

---

### Statistics

GET /stats/active-bookings

GET /stats/available-rooms

GET /stats/revenue

GET /stats/total-bookings

---

## Authentication Rules

All endpoints require:

Authorization: Bearer <token>

Except:

POST /auth/login

---

## Frontend Rules

Do not hardcode API URLs.

Use:

src/config/api.js

Example:

```javascript
export const API_BASE_URL = "http://localhost:8080/api";
```

All service files must use API_BASE_URL.

Store token in localStorage.

Send Bearer Token automatically using Axios interceptor.

---

## Current Priority

1. Frontend Integration
2. Authentication Flow
3. Protected Routes
4. CRUD Integration
5. Dashboard Statistics
6. UI Refinement

---

## Current Objective

Migrate all existing frontend API calls from the old PHP Native API to the new CodeIgniter 4 REST API.

Before modifying code:

1. Scan all frontend files.
2. Identify old endpoints.
3. Produce migration report.
4. Replace endpoints with CI4 endpoints.
5. Keep existing UI unchanged.
6. Preserve authentication flow.
7. Use centralized API configuration.

Focus on functionality and successful integration first.

---

## AI Development Workflow

Gemini CLI Responsibilities:

- Backend Integration
- API Integration
- Authentication
- React Context
- Axios Services
- CRUD Operations
- Route Protection
- Data Fetching
- Error Handling
- Refactoring

Do NOT prioritize UI redesign.

Do NOT make major visual layout changes unless explicitly requested.

Primary objective:

Connect React frontend with CodeIgniter 4 backend successfully.

Claude Responsibilities:

- UI Design
- UX Improvements
- Layout Refinement
- Dashboard Appearance
- Component Styling
- Responsive Design

Integration and functionality take priority over visual enhancements.
