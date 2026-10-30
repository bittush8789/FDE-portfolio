# Personal Portfolio Website

Bittu Sharma's personal site — a dark, terminal-flavored portfolio built with
Next.js, plus two small tools bolted onto the back of it that turned it into
more of a command centre than a brochure.

**Live areas:**

- **Portfolio** — hero (with an interactive 3D Spline scene), about, skills,
  projects, and contact, all in one dark/orange design system.
- **Job Market dashboard** (`/jobs`, passcode-gated) — a real dashboard for
  tracking an AI job search: jobs already scraped from LinkedIn, Indeed, and
  Naukri via **Apify** actors, each scored against the site owner's skill
  profile (Strong Match / Good Match / Explore), sortable by match score or
  date, plus a "Discover more jobs" tab that runs a live Apify search on
  demand.
- **AI Pulse** (on the homepage) — a live AI/tech news feed powered by the
  **Tavily** search API, filterable by category (AI Tools, Automation, LLMs,
  Business Tech), cached client-side for 30 minutes so it doesn't re-fetch on
  every tab reopen.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme`, no config file)
- **Apify** — LinkedIn / Indeed / Naukri job scraping, called from server-side
  API routes so the API token never reaches the browser
- **Tavily** — real-time news search, same server-side-only pattern
- `next/font` (DM Sans + DM Mono), `@splinetool/react-spline` for the hero's
  3D scene, `lucide-react` icons

## Project structure

```
src/
  app/
    page.tsx              Homepage (Hero, About, Skills, Projects, Job Market
                           teaser, AI Pulse, Contact)
    jobs/                  Passcode-gated job dashboard
    api/jobs/search/       Server route: live Apify job search
    api/news/               Server route: live Tavily news search
  components/
    site/                  Homepage sections (hero, skills, ai-pulse, ...)
    jobs/                  Dashboard UI (sidebar, panels, job cards)
  lib/
    jobs.ts, curated-jobs.ts   Job types + a static snapshot of scraped roles
    news.ts                    News types + sessionStorage caching
    profile.ts                  Skill list + job match-scoring logic
```

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. The `/jobs` dashboard is behind a client-side
passcode gate (`0000`) — good enough to keep it off casual visitors' radar,
not a real auth boundary.

### Environment variables

Live search features need their own API keys, set as **server-side** env
vars (create a `.env.local`, never commit it):

```
APIFY_TOKEN=...      # apify.com — powers /jobs "Discover more jobs"
TAVILY_API_KEY=...   # tavily.com — powers the homepage "AI Pulse" section
```

Without these, both features degrade gracefully: `/jobs` still shows the
statically-scraped job list and match scores, and AI Pulse shows a friendly
"not configured" message with a retry button, instead of erroring.

## Deployment

Built for Vercel — the two API routes (`/api/jobs/search`, `/api/news`) need
a Node server, not a static export. Add `APIFY_TOKEN` and `TAVILY_API_KEY` in
the Vercel project's Environment Variables before deploying.
