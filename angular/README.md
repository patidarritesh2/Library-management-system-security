# 📚 Library Management System — Frontend

Angular 17 application with JWT authentication, role-based UI, and CSS styling.

## Tech Stack
- **Framework**: Angular 17
- **Language**: TypeScript
- **Styling**: CSS
- **State**: Angular Services + BehaviorSubject (reactive)
- **HTTP**: Angular HttpClient with interceptor

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
│   └── register/                  # Register user to system
└── app.module.ts                  # Root module
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

