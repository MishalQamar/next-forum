# Final Forum - Full-Featured Forum Platform

A modern, full-featured forum platform built with **Next.js 15**, featuring React Server Components, Server Actions, and advanced search capabilities. Includes rich markdown editing with syntax highlighting, topic categorization, and mobile-responsive design.

![Forum Platform](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.12-2D3748?style=for-the-badge&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🚀 Features

### 🔐 Authentication & Security
- **Secure User Authentication** with email/password signup and signin
- **Session Management** with secure token-based sessions
- **Password Hashing** using Argon2 for enhanced security
- **Protected Routes** with automatic redirects for unauthenticated users
- **Session Persistence** with automatic token refresh

### 💬 Discussion Management
- **Create Discussions** with rich markdown content
- **Topic Categorization** for organized content structure
- **Threaded Replies** with nested comment support
- **Best Answer Marking** - mark posts as solutions
- **Discussion Ownership** with owner-specific actions
- **Participant Tracking** - track who's engaged in discussions

### ✍️ Rich Content Creation
- **Markdown Editor** with live preview toggle
- **Syntax Highlighting** for code blocks with VS Code Dark theme
- **Markdown Toolbar** with formatting shortcuts (bold, italic, code, links)
- **Real-time Preview** - switch between edit and preview modes
- **Code Block Support** with language-specific highlighting

### 🔍 Advanced Search & Filtering
- **Full-Text Search** across discussion titles and content
- **Topic-based Filtering** - filter by specific categories
- **Advanced Filters**:
  - No replies discussions
  - Solved/Unsolved discussions
  - My discussions
  - Participating discussions
- **Search Persistence** with URL state management
- **Case-insensitive Search** for better user experience

### 📱 Mobile-Responsive Design
- **Responsive Layout** that adapts to all screen sizes
- **Mobile-First Design** with touch-friendly interfaces
- **Collapsible Sidebar** with mobile sheet overlay
- **Keyboard Shortcuts** (Cmd/Ctrl + B to toggle sidebar)
- **Touch-Optimized** navigation and interactions

### 📄 Pagination & Navigation
- **Smart Pagination** with metadata tracking
- **URL State Management** for shareable links
- **Breadcrumb Navigation** for easy content discovery
- **Auto-scroll to Posts** with anchor links
- **Pagination Reset** on search/filter changes

### 🎨 Modern UI/UX
- **Radix UI Components** for accessible, customizable components
- **Tailwind CSS** for utility-first styling
- **Dark/Light Theme Support** with next-themes
- **Smooth Animations** with Framer Motion
- **Loading States** with skeleton components
- **Toast Notifications** with Sonner
- **Form Validation** with Zod schema validation

### 🗄️ Database & Data Management
- **PostgreSQL Database** with Prisma ORM
- **Type-safe Database Queries** with Prisma Client
- **Database Migrations** for schema versioning
- **Seed Data** for development and testing
- **Optimized Queries** with proper indexing

### 🔧 Developer Experience
- **TypeScript** for type safety and better DX
- **ESLint** with custom rules for code quality
- **Turbopack** for faster development builds
- **Hot Reload** for instant feedback
- **Error Boundaries** for graceful error handling

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript 5.8** - Type-safe JavaScript
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Framer Motion** - Animation library

### Backend & Database
- **Next.js Server Actions** - Server-side form handling
- **Prisma 6.12** - Type-safe database ORM
- **PostgreSQL** - Reliable relational database
- **Argon2** - Secure password hashing
- **Zod** - Schema validation

### Content & Markdown
- **React Markdown** - Markdown rendering
- **React Syntax Highlighter** - Code syntax highlighting
- **GitHub Markdown Toolbar** - Markdown editing tools
- **Rehype Highlight** - Syntax highlighting for markdown

### State Management & Utilities
- **Zustand** - Lightweight state management
- **React Query States** - URL state management
- **Date-fns** - Date manipulation utilities
- **Class Variance Authority** - Component variant management

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/final-forum.git
   cd final-forum
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your database URL and other required environment variables.

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Railway** - Easy PostgreSQL + Next.js deployment
- **Netlify** - Static site hosting
- **AWS** - Full cloud infrastructure

## 📁 Project Structure

```
final-forum/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/         # Main forum pages
│   │   ├── sign-in/          # Authentication pages
│   │   └── sign-up/
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Radix UI components
│   │   └── form/             # Form-related components
│   ├── features/             # Feature-based modules
│   │   ├── auth/             # Authentication
│   │   ├── discussions/      # Discussion management
│   │   ├── posts/            # Post management
│   │   └── topics/           # Topic management
│   ├── lib/                  # Utility libraries
│   └── hooks/                # Custom React hooks
├── prisma/                   # Database schema and migrations
├── public/                   # Static assets
└── components.json           # UI component configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for the deployment platform
- **Radix UI** for accessible components
- **Tailwind CSS** for the utility-first CSS framework
- **Prisma** for the type-safe database toolkit

---

Built with ❤️ using Next.js 15, TypeScript, and modern web technologies.
