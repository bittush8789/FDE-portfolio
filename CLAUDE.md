# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # next dev --webpack   (localhost:3000)
npm run build    # next build --webpack (must pass before shipping — see notes below)
npm run start    # next start (serve the production build)
npm run lint     # eslint
```

There is no test suite configured. Webpack is forced explicitly on `dev`/`build` (`--webpack` flag) because `next.config.ts` registers a webpack-only plugin (see below) — do not remove the flag or switch to Turbopack without also porting that config.

## Architecture

This is a single Next.js 16 App Router app that is actually three things bolted together:

1. **A personal portfolio homepage** (`src/app/page.tsx`) — Hero (with a 3D Spline scene), About, Skills, Projects, a Job Market teaser, AI Pulse, Contact.
2. **A passcode-gated job dashboard** at `/jobs` (`src/app/jobs/`) — not real auth, just a client-side sessionStorage gate (`src/components/jobs/password-gate.tsx`, hardcoded passcode `"0000"`). Never put anything actually sensitive behind it.
3. **An "AI Pulse" news feed** embedded on the homepage (`src/components/site/ai-pulse.tsx`).

### The server-route-holds-the-secret pattern

Both live-data features follow the same shape, and any new integration should too:

- `/api/jobs/search/route.ts` and `/api/news/route.ts` are the **only** places `APIFY_TOKEN` / `TAVILY_API_KEY` are read (`process.env`). Both call the third-party REST API directly with `fetch` — not via any MCP/connector — and both are marked `export const dynamic = "force-dynamic"`.
- Client code (`src/lib/jobs.ts`'s `searchJobs`, `src/lib/news.ts`'s `fetchNews`) only ever calls these same-origin `/api/*` routes, never the third-party APIs directly. Secrets must never reach the browser.
- Both routes return `503` with a plain-English "not configured" message when the env var is missing, instead of erroring — the UI is built to render that state gracefully rather than crash. Preserve this contract if you touch either route.
- Env vars go in `.env.local` (git-ignored) locally, and must be added separately in the Vercel project's Environment Variables for deploys — nothing propagates automatically.

### Jobs dashboard data flow

- `src/lib/curated-jobs.ts` holds a static, pre-scraped snapshot of jobs (LinkedIn/Indeed/Naukri) that seeds the dashboard's "Find Jobs" / "Overview" views instantly and client-side, without hitting Apify on every page load.
- The "Discover more jobs" sidebar panel (`discover-jobs-panel.tsx`) is the only surface that triggers a *live* Apify call, via `searchJobs()` → `/api/jobs/search`.
- `src/app/api/jobs/search/route.ts` maps three different Apify actors (LinkedIn/Indeed/Naukri, see `ACTOR_IDS`) to a single normalized `Job` shape (`src/lib/jobs.ts`) — each platform has its own `buildInput()` request shape and its own `mapItems()` response mapping, since the actors' schemas don't match each other.
- Match scoring (`src/lib/profile.ts`) is pure keyword matching against `SKILL_GROUPS` — no LLM call — run over `jobMatchText()` (title + tags + description). `PROFILE_SKILL_KEYWORDS` is derived from `SKILL_GROUPS`, so edit skills there rather than adding a second list.
- Saved jobs and last search params persist to `localStorage` (`portfolio:saved-jobs`, `portfolio:last-job-search` in `src/lib/jobs.ts`); AI Pulse caches to `sessionStorage` instead (`portfolio:ai-pulse:{category}`, 30 min TTL, in `src/lib/news.ts`) — don't conflate the two storages when adding new persisted state.

### AI Pulse: never read sessionStorage during render

`src/components/site/ai-pulse.tsx`'s `NewsFeed` always starts state empty/loading (matching the server-rendered skeleton) and only reads `loadCachedNews()` inside `useEffect`, never in a lazy `useState` initializer. Reading client-only storage during render makes the client's first render diverge from SSR and breaks hydration (React discards and re-renders the whole tree, which is disruptive and surfaces confusing unrelated console errors). The cache-hit branch of the effect needs an `eslint-disable-next-line react-hooks/set-state-in-effect` — that's expected here since the whole point is reflecting a client-only value after mount, not a "derive and exit" anti-pattern. `key={category}` on `NewsFeed` still remounts it per category to reset state cleanly.

### Spline / webpack config

`next.config.ts` adds a webpack `IgnorePlugin` for `@splinetool/runtime`'s optional Draco/boolean-op `.wasm` helpers, which aren't published in the installed version and would otherwise break the build. If you upgrade `@splinetool/runtime` or add another Spline scene, re-check whether this ignore is still needed.


To see the history of the changes, refer to @MEMORY.md