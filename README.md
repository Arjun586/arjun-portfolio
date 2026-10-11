# Arjun — Developer Portfolio

A personal portfolio website built with React, TypeScript, and Tailwind CSS, deployed on Vercel with a serverless contact API backed by Resend.

---

## Live Demo
https://arjun-portfolio-lovat.vercel.app/

## Tech Stack

### Frontend

- React 19 with functional components and hooks
- TypeScript 6 (strict mode, `verbatimModuleSyntax`, `noUnusedLocals`)
- React Router DOM v7 (client-side routing, `<Outlet>` layout pattern)
- Tailwind CSS v4 via `@tailwindcss/vite` (custom `@theme` design tokens, `@utility` classes)
- Lucide React and React Icons (icon libraries)
- Self-hosted fonts via Fontsource: Bebas Neue (headings), IBM Plex Sans (body)

### Backend / API

- Vercel Serverless Functions (`@vercel/node`) — production contact endpoint at `api/contact.ts`
- Vite custom plugin middleware — mirrors the same handler during local development
- Resend SDK v6 — transactional email delivery
- Zod v4 — runtime schema validation and type inference for contact form payloads

### DevOps / Deployment

- Vite v8 — build tooling and dev server
- Vercel — hosting, serverless functions, and SPA rewrite rules
- ESLint v10 with `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`

---

## Architecture

The application follows a standard single-page application layout with one notable architectural pattern: the **shared contact handler**.

```
┌─────────────────────────────────────────────────────┐
│                    Browser (SPA)                    │
│  React Router  →  Page Components  →  Data Layer   │
└────────────────────────┬────────────────────────────┘
                         │ POST /api/contact
          ┌──────────────┴──────────────┐
          │  Development (Vite plugin)  │  Production (Vercel Function)
          │  vite.config.ts middleware  │  api/contact.ts
          └──────────────┬─────────────┘
                         │
                  lib/contact/handler.ts   (shared)
                  ├── schema.ts            (Zod validation)
                  ├── rateLimit.ts         (in-memory IP throttling)
                  └── sendEmail.ts         (Resend SDK)
```


## Project Structure

```
arjun586-portfolio/
├── api/
│   └── contact.ts              # Vercel serverless function (production)
├── lib/
│   └── contact/
│       ├── handler.ts          # Core request handler (shared)
│       ├── rateLimit.ts        # In-memory IP rate limiter
│       ├── schema.ts           # Zod schema + validation helpers
│       └── sendEmail.ts        # Resend email sender
├── public/
│   ├── robots.txt
│   ├── site.webmanifest
│   └── sitemap.xml
├── src/
│   ├── App.tsx                 # Router setup, lazy imports, InitialLoadGate
│   ├── main.tsx                # React entry point
│   ├── index.css               # Tailwind imports, design tokens, global styles
│   ├── assets/                 # Static assets (portrait image)
│   ├── components/
│   │   ├── about/              # AboutHero, AboutSection, OutsideTheCode
│   │   ├── contact/            # ContactForm, ContactMainSection
│   │   ├── experience/         # ExperienceHero, ExperienceMiddleSection, ExperienceSnapshot, WorkExperienceSection
│   │   ├── home/               # HeroSection, FeaturedProjects, SkillsSection, FooterSection
│   │   ├── layout/             # PageLayout (sidebar + outlet), ScrollToTop, MobileHeader
│   │   ├── projects/           # ProjectsHero, ProjectsContent, ProjectThumbnail, ProjectPreviewMotif
│   │   ├── skills/             # SkillsHero, SkillsGridSection
│   │   └── ui/                 # Reusable primitives: Button, PageLoader, SkillIcon, etc.
│   ├── data/
│   │   ├── about.ts            # Bio, journey, drives, approach steps
│   │   ├── contactPage.ts      # Contact details, social links, availability
│   │   ├── experience.ts       # Growth timeline, highlights, snapshot stats
│   │   ├── home.ts             # Hero bio, quote, featured tech stack, footer CTA
│   │   ├── projects.ts         # Project entries, filter config, type definitions
│   │   └── skillsPage.ts       # Skill categories, icon key types, CS foundations
│   ├── lib/
│   │   └── contact/
│   │       └── submitContactForm.ts  # Client-side fetch wrapper for /api/contact
│   └── pages/
│       ├── Home.tsx
│       ├── About.tsx
│       ├── Projects.tsx
│       ├── Experience.tsx
│       ├── Skills.tsx
│       ├── Resume.tsx
│       └── Contact.tsx
├── .env.example
├── eslint.config.js
├── index.html                  # SEO meta tags, OG tags, PWA manifest link
├── package.json
├── tsconfig.app.json
├── tsconfig.node.json
├── tsconfig.json
├── vercel.json                 # SPA rewrite rule
└── vite.config.ts              # Vite plugins + dev-server contact middleware
```

---

## Installation

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- A [Resend](https://resend.com) account and API key (required only for contact form functionality)

### Clone Repository

```bash
git clone https://github.com/Arjun586/portfolio.git
cd portfolio
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Copy the example file and populate the values:

```bash
cp .env.example .env
```

| Variable               | Required | Description                                                                 |
|------------------------|----------|-----------------------------------------------------------------------------|
| `RESEND_API_KEY`       | Yes      | API key from your Resend dashboard                                          |
| `CONTACT_RECEIVER_EMAIL` | Yes    | The email address that receives contact form submissions                    |
| `RESEND_FROM_EMAIL`    | No       | Sender display name and address. Defaults to `Portfolio Contact <onboarding@resend.dev>` |

> Note: `RESEND_FROM_EMAIL` defaults to Resend's onboarding address, which works without a verified domain during development. For production, configure a verified sending domain in Resend and update this value.

### Run Locally

```bash
npm run dev
```

The development server starts at `http://localhost:5173`. The contact API is served by the Vite plugin at `http://localhost:5173/api/contact`, with no separate server process required.

### Build for Production

```bash
npm run build
```

Output is written to `dist/`. Preview the production build locally:

```bash
npm run preview
```

---

## Author

**Arjun**
Full Stack Developer — CSE (AI & ML), B.Tech

- GitHub: [github.com/Arjun586](https://github.com/Arjun586)
- LinkedIn: [linkedin.com/in/arjun586](https://www.linkedin.com/in/arjun586)
- X: [x.com/Arjun88823705](https://x.com/Arjun88823705)
- Email: arjunofficial586@gmail.com
