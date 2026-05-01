# EcoVistaLife — Frontend

Next.js 16 frontend for the EcoVistaLife construction company website.

## Tech Stack

- **Next.js 16** (App Router, SSG + SSR)
- **GSAP** (ScrollTrigger, Lenis smooth scroll)
- **CSS Modules** (vanilla CSS)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Pages

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Home — hero, stats, features, services, testimonials |
| `/about` | Static | About — values, vision, mission |
| `/services` | Static | Services — horizontal scroll, amenities |
| `/contact` | Static | Contact form + company info |
| `/projects` | ISR | Project listing from API |
| `/projects/[slug]` | SSG | Project detail with gallery |
| `/blog` | ISR | Blog listing with featured post |
| `/blog/[slug]` | SSG | Blog article with reading progress |
| `/admin/login` | Static | Admin authentication |
| `/admin` | Static | Admin dashboard with CRUD |

## Deployment (Vercel)

```bash
# Push to GitHub, import in Vercel
# Set env: NEXT_PUBLIC_API_URL=https://your-api-domain.com
```
