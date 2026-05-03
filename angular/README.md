# 📚 Library Management System — Frontend

Angular 17 application with JWT authentication, role-based UI, and TailwindCSS styling.

## Tech Stack
- **Framework**: Angular 17
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State**: Angular Services + BehaviorSubject (reactive)
- **HTTP**: Angular HttpClient with interceptor
- **Testing**: Jasmine + Karma

---

## Project Structure

```
src/app/
├── models/
│   └── index.ts                   # TypeScript interfaces
├── services/
│   ├── auth.service.ts            # Login, logout, user state
│   ├── book.service.ts            # HTTP calls to /books API
│   └── auth.interceptor.ts       # Attaches JWT to every request
├── guards/
│   └── auth.guard.ts             # Blocks /books if not logged in
├── components/
│   ├── login/                     # Login page
│   ├── navbar/                    # Top navigation bar
│   └── books/                     # Book list with modal form
└── app.module.ts                  # Root module (routes registered here)
```

---

## Setup Instructions

### 1. Prerequisites
- Node.js 18+
- Angular CLI: `npm install -g @angular/cli`

### 2. Install Dependencies
```bash
cd frontend
npm install
```

### 3. Configure API URL
Edit `src/environments/environment.ts`:
```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'  // your backend URL
};
```

### 4. Run Development Server
```bash
ng serve
# App available at http://localhost:4200
```

### 5. Run Tests
```bash
ng test
```

---

## Features by Role

| Feature | Regular User | Admin |
|---------|-------------|-------|
| View all books | ✅ | ✅ |
| Borrow / Return | ✅ | ✅ |
| Add book | ❌ | ✅ |
| Edit book | ❌ | ✅ |
| Delete book | ❌ | ✅ |

---

## How JWT Works in the Frontend
1. User logs in → backend returns a JWT token
2. Token saved to `localStorage`
3. `AuthInterceptor` adds `Authorization: Bearer <token>` to every HTTP request automatically
4. `AuthGuard` checks for a token before allowing access to `/books`
5. On logout, token is removed and user is redirected to `/login`
