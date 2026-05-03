# 📚 Library Management System
**Full Stack: Node.js + Angular + MySQL**

A complete library management system with JWT authentication, role-based access control,
and full CRUD operations for books.

---

## Quick Start

```bash
# 1. Set up database
mysql -u root -p < database/schema.sql

# 2. Start backend
cd backend
cp .env.example .env   
npm install
npm run dev            

# 3. Start frontend
cd frontend
npm install
ng serve                # runs on http://localhost:4200
```

---

## Architecture Overview

```
┌─────────────────────┐         ┌──────────────────────────┐
│   Angular Frontend  │  HTTP   │   Express Backend        │
│   (port 4200)       │◄───────►│   (port 3000)            │
│                     │  + JWT  │                          │
│  - Login Page       │         │  POST /auth/login        │
│  - Books List       │         │  POST /auth/register     │
│  - Add/Edit Modal   │         │  GET  /books             │
│  - Role-based UI    │         │  POST /books (admin)     │
└─────────────────────┘         │  PUT  /books/:id (admin) │
                                │  DELETE /books/:id       │
                                │  PATCH /books/:id/status │
                                └──────────┬───────────────┘
                                           │ SQL queries
                                           ▼
                                ┌──────────────────────────┐
                                │   MySQL Database         │
                                │   - users table          │
                                │   - books table          │
                                └──────────────────────────┘
```

---

## How the Authentication Flow Works

```
1. User enters username + password in Angular login form
       │
       ▼
2. Angular sends POST /auth/login to Express
       │
       ▼
3. Express looks up user in MySQL
   - If found: compares password against bcrypt hash
   - If match: creates a JWT token signed with secret key
       │
       ▼
4. JWT token returned to Angular
       │
       ▼
5. Angular stores token in localStorage
       │
       ▼
6. Every subsequent HTTP request:
   AuthInterceptor automatically adds header:
   "Authorization: Bearer eyJhbGci..."
       │
       ▼
7. Express middleware (authenticateToken) verifies the JWT
   - Valid → reads user role from token, passes request through
   - Invalid/Expired → returns 401 Unauthorized
```

---

## Role-Based Access (RBAC)

```
Route            | No Token | user role | admin role
-----------------+----------+-----------+-----------
GET /books       | ❌ 401   | ✅        | ✅
POST /books      | ❌ 401   | ❌ 403    | ✅
PUT /books/:id   | ❌ 401   | ❌ 403    | ✅
DELETE /books/:id| ❌ 401   | ❌ 403    | ✅
PATCH /:id/status| ❌ 401   | ✅        | ✅
```


