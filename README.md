# Linkify

Modern full-stack link sharing platform inspired by Linktree, built with Next.js 15, Better Auth, Prisma, PostgreSQL, and TailwindCSS.

---

## Features

- Authentication with Better Auth
- Secure sign in / sign up flow
- Public customizable profile page
- Link management dashboard
- Profile analytics & statistics
- Responsive modern UI
- Dark mode design
- Form validation with Zod + React Hook Form
- Reusable UI components
- PostgreSQL database with Prisma ORM
- Type-safe architecture with TypeScript

---

## Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- TailwindCSS
- shadcn/ui
- React Hook Form
- Zod

### Backend

- Better Auth
- Prisma ORM
- PostgreSQL

### Tooling

- ESLint
- Prettier
- Turbopack

---

### Dashboard

- Account overview
- Link statistics
- Quick actions
- Profile management

### Public Profile

- Shareable public profile
- Social links
- Minimal modern design

---

## Getting Started

### 1. Clone repository

```bash
git clone https://github.com/mikuull/linkify.git
cd linkify
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create `.env` file:

```env
DATABASE_URL="postgresql://..."
BETTER_AUTH_SECRET="your-secret"
BETTER_AUTH_URL="http://localhost:3000"
```

### 4. Run database migrations

```bash
pnpx prisma migrate dev
```

### 5. Start development server

```bash
pnpm dev
```

Open:

```txt
http://localhost:3000
```
---

## License

MIT License
