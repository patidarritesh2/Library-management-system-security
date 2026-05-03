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
cp .env.example .env    # fill in your DB credentials
npm install
npm run dev             # runs on http://localhost:3000

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

---

## Interviewer Walkthrough Script

### "Tell me about the project structure"
> "I separated the backend into four layers: routes define the URL paths,
> controllers handle HTTP requests and responses, services contain the business logic,
> and the database config manages the MySQL connection pool.
> This keeps each layer single-responsibility and easy to test."

### "How does authentication work?"
> "When a user logs in, the backend validates their credentials against the
> bcrypt-hashed password in MySQL. On success, we create a JWT token signed with
> a secret key. The token contains the user's ID, username, and role.
> Every protected request must include this token in the Authorization header.
> A middleware function verifies the token before the request reaches the controller."

### "How do you handle role-based access?"
> "I have two middleware functions: `authenticateToken` checks for a valid JWT,
> and `requireAdmin` checks that the decoded role is 'admin'.
> Admin-only routes chain both: [authenticateToken, requireAdmin, controller].
> On the Angular side, the UI conditionally shows Edit/Delete/Add buttons
> based on the role stored in AuthService."

### "How does Angular communicate with the backend?"
> "I created an `AuthInterceptor` that intercepts every outgoing HTTP request and
> appends the JWT token as a Bearer header. This way, services like BookService
> don't need to manually attach headers — it's centralized in one place."

### "How do you store the JWT securely?"
> "I store it in localStorage for simplicity in this project. In production,
> HTTP-only cookies are more secure because JavaScript can't access them,
> preventing XSS attacks. The token expires after 24 hours."

---

