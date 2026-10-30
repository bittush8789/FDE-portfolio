export type NewsCategory = "All" | "AI Tools" | "Automation" | "LLMs" | "Business Tech";

export const NEWS_CATEGORIES: NewsCategory[] = ["All", "AI Tools", "Automation", "LLMs", "Business Tech"];

export type NewsArticle = {
  id: string;
  headline: string;
  url: string;
  source: string;
  publishedAt: string;
  summary: string;
};

const CACHE_TTL_MS = 30 * 60 * 1000;
const CACHE_PREFIX = "portfolio:ai-pulse:";

type CacheEntry = { fetchedAt: number; articles: NewsArticle[] };

export function loadCachedNews(category: NewsCategory): NewsArticle[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(CACHE_PREFIX + category);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    if (Date.now() - entry.fetchedAt > CACHE_TTL_MS) return null;
    return entry.articles;
  } catch {
    return null;
  }
}

export function persistCachedNews(category: NewsCategory, articles: NewsArticle[]) {
  try {
    window.sessionStorage.setItem(
      CACHE_PREFIX + category,
      JSON.stringify({ fetchedAt: Date.now(), articles } satisfies CacheEntry)
    );
  } catch {
    // sessionStorage unavailable (private mode, quota) — caching is best-effort
  }
}

export async function fetchNews(category: NewsCategory): Promise<NewsArticle[]> {
  const res = await fetch(`/api/news?category=${encodeURIComponent(category)}`);

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || "Couldn't load the latest news.");
  }

  const { articles } = (await res.json()) as { articles: NewsArticle[] };
  return articles;
}

export function relativeTime(iso: string): string {
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return "";
  const diffMs = Date.now() - then;
  const mins = Math.round(diffMs / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}
