# Forum - Full-Stack Forum Platform

A modern forum platform built with Next.js 15, TypeScript, and PostgreSQL.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Prisma](https://img.shields.io/badge/Prisma-6.12-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13-336791?style=for-the-badge&logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## Features

- **Authentication** - Secure user registration and login
- **Discussions** - Create and manage forum discussions
- **Rich Content** - Markdown editor with live preview
- **Search & Filter** - Advanced search with multiple filters
- **Mobile Responsive** - Optimized for all devices
- **Real-time Updates** - Optimistic UI updates

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js Server Actions, Prisma ORM
- **Database**: PostgreSQL
- **Auth**: Session-based with Argon2 hashing
- **UI**: Radix UI components, Framer Motion

## Quick Start

```bash
# Clone and install
git clone <your-repo-url>
cd final-forum
npm install

# Setup environment
cp .env.example .env.local
# Add your database URL

# Setup database
npx prisma generate
npx prisma db push
npx prisma db seed

# Start development
npm run dev
```

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
├── features/           # Feature-based modules
│   ├── auth/          # Authentication
│   ├── discussions/   # Forum discussions
│   ├── posts/         # Posts and replies
│   └── topics/        # Topic management
├── lib/               # Utilities and configurations
└── utils/             # Helper functions
```

---

*Built with Next.js 15, TypeScript, and modern web technologies.*
