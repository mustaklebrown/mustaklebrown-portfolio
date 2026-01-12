# Project Prompt: Personal Web Developer Portfolio

## 📋 Project Overview

**Project Name**: Personal Web Developer Portfolio
**Type**: Web App
**Target Audience**: Potential clients, employers, and other developers
**Primary Goal**: To serve as a professional marketing tool that showcases my skills, experience, and projects to attract new opportunities.

---

## 🎯 Core Objectives

1. **Marketing Myself**: Create a compelling personal brand that highlights my unique value proposition and professional identity.
2. **Showcasing Projects**: Display my portfolio of work with detailed case studies, live demos, and code repositories to demonstrate practical expertise.
3. **Demonstrating Expertise**: Clearly present my technical skills, technology stack, and professional experience to build trust and credibility.

---

## 🛠️ Technology Stack

### Frontend

- **Framework**: Next.js 16.1 (App Router)
- **Styling**: TailwindCSS (v4 if stable, or v3 with latest features), Shadcn UI
- **UI Library**: Shadcn UI, Framer Motion (for animations)
- **State Management**: React Context / Hooks
- **Form Handling**: React Hook Form
- **Validation**: Zod

### Backend

- **Runtime**: Bun
- **Framework**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Better-Auth (for admin dashboard to manage content)

### DevOps & Tooling

- **Package Manager**: Bun
- **Build Tool**: Turbopack
- **Deployment**: Vercel
- **Testing**: Jest

---

## 📊 Data Model

### Entity: Project

```prisma
model Project {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String
  content     String   // Markdown or rich text
  imageUrl    String?
  demoUrl     String?
  repoUrl     String?
  tags        String[] // Array of strings for tech stack
  featured    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Entity: Experience

```prisma
model Experience {
  id          String   @id @default(cuid())
  company     String
  position    String
  startDate   DateTime
  endDate     DateTime? // Null if current
  description String
  location    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Entity: Skill

```prisma
model Skill {
  id          String   @id @default(cuid())
  name        String
  category    String   // e.g., "Frontend", "Backend", "Tools"
  icon        String?
  proficiency Int?     // 1-100 (optional)
}
```

---

## 🎨 Design Requirements

### Visual Aesthetics

- **Color Scheme**: Modern Dark Mode with rich Gradients.
  - **Primary**: Indigo
  - **Secondary**: Orange (for accents/highlights)
- **Typography**: Roboto (Sans-serif) for headings and body.
- **Design Style**: **Glassmorphism** (translucent backgrounds, blur effects, subtle borders).
- **Animation**: Extensive use of simple page transitions and micro-interactions to create a fluid, premium feel.

### User Experience

- **Responsive**: **Mobile-First** approach. Ensure the mobile experience is as polished as desktop.
- **Accessibility**: High contrast text, keyboard navigation support.
- **Performance**: instant page loads, optimized images.
- **Offline Support**: **PWA** (Progressive Web App) enabled for offline installability and caching.

---

## 📁 Project Structure

```
project-root/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public facing portfolio pages
│   │   ├── page.tsx       # Landing page (computed/ISR)
│   │   ├── projects/      # Project listing and details
│   │   ├── about/         # Detailed about/experience
│   │   └── contact/       # Contact form
│   ├── (admin)/           # Protected admin routes (CMS)
│   │   ├── dashboard/     # Manage content
│   │   └── login/         # Admin login
│   ├── api/               # API routes
│   └── globals.css        # Global styles with Tailwind @theme
├── components/
│   ├── ui/                # Shadcn primitives (modified for glassmorphism)
│   ├── sections/          # Landing page sections (Hero, Projects, etc.)
│   └── shared/            # Common elements (Navbar, Footer)
├── lib/
│   ├── db.ts              # Prisma client (singleton)
│   └── auth.ts            # Better-Auth configuration
├── prisma/
│   └── schema.prisma      # DB Schema
└── public/                # Static assets (images, icons)
```

---

## 🔐 Authentication & Authorization

### User Roles

- **Admin**: Full access to create/edit/delete projects and experience entries.
- **Public**: Read-only access to portfolio content.

### Protected Routes

- `/admin/*` - Requires authentication via Better-Auth.

---

## ✨ Key Features

### Feature 1: Dynamic Project Showcase

**Description**: A filterable grid of projects that links to detailed case study pages.
**User Story**: As a visitor, I want to filter projects by technology so I can see relevant work samples.
**Acceptance Criteria**:

- [ ] Masonry or Grid layout for project cards.
- [ ] Filter buttons (All, React, Backend, Design, etc.).
- [ ] Hover effects on cards (scale, glow, generic glassmorphism).

### Feature 2: Interactive Experience Timeline

**Description**: A vertical timeline showing professional history.
**User Story**: As a recruiter, I want to quickly see the candidate's career progression.
**Acceptance Criteria**:

- [ ] Vertical timeline layout.
- [ ] Collapsible/Expandable details for each role.
- [ ] Tailwind animations for entry (fade-in on scroll).

### Feature 3: Contact Form with Validation

**Description**: A functional contact form that sends emails or stores messages.
**User Story**: As a potential client, I want to easily get in touch.
**Acceptance Criteria**:

- [ ] Fields: Name, Email, Subject, Message.
- [ ] Zod validation (required fields, valid email).
- [ ] Success/Error toast notifications.

---

## 🌐 Internationalization (i18n)

**Supported Languages**:

- English (Primary)
- [Optional: Add French/Other if needed later]

---

## 🧪 Testing Strategy

### Unit Tests

- Jest configuration for utility functions and core components.

---

## 📱 PWA Configuration

- **Manifest**: Correctly configured `manifest.json` for installability.
- **Service Worker**: Caching strategies for static assets and API responses (offline-first).
- **Icons**: Standard set of generic PWA icons.

---

## 🚀 Deployment & Environment

### Environment Variables

```env
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=...
NEXT_PUBLIC_APP_URL=...
```

### Deployment

- Deploy to Vercel.
- Configure Postgres database (e.g., Neon, Vercel Postgres, or Supabase).

---

## 🤝 Agent Instructions

1. **Aesthetics First**: Focus heavily on the "Wow" factor. The Glassmorphism effect should be implemented cleanly using Tailwind's `backdrop-blur` and `bg-opacity`.
2. **Smooth Motion**: Use Framer Motion for page transitions and element entry animations. Nothing should just "appear" abruptly.
3. **Clean Code**: Keep components small and reusable. Use strict TypeScript.
4. **Mobile Polish**: Check the mobile view frequently. Hamburger menus, touch targets, and stack order must be perfect.
