"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Reveal } from "./reveal";
import {
  NEWS_CATEGORIES,
  fetchNews,
  loadCachedNews,
  persistCachedNews,
  relativeTime,
  type NewsArticle,
  type NewsCategory,
} from "@/lib/news";

function NewsCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 bg-[var(--brand-bg-raised)] border-l-2 border-l-primary border-y border-r border-[var(--veil-4)] rounded-lg p-5 sm:p-6 animate-pulse">
      <div className="h-4.5 w-5/6 bg-[var(--veil-3)] rounded" />
      <div className="h-4.5 w-1/2 bg-[var(--veil-3)] rounded" />
      <div className="h-3 w-1/3 bg-[var(--veil-3)] rounded mt-1" />
      <div className="h-3 w-full bg-[var(--veil-3)] rounded" />
      <div className="h-3 w-4/5 bg-[var(--veil-3)] rounded" />
      <div className="h-8 w-36 bg-[var(--veil-3)] rounded-md mt-1" />
    </div>
  );
}

function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <div className="flex flex-col gap-3 bg-[var(--brand-bg-raised)] border-l-2 border-l-primary border-y border-r border-[var(--veil-4)] rounded-lg p-5 sm:p-6 transition-colors hover:bg-[var(--brand-bg-raised-2)]">
      <h3 className="text-[1rem] font-bold tracking-[-0.01em] leading-snug line-clamp-2">{article.headline}</h3>
      <p className="font-mono text-[0.74rem] text-[var(--brand-text-faint)]">
        {article.source} · {relativeTime(article.publishedAt)}
      </p>
      <p className="text-[var(--brand-text-dim)] text-[0.88rem] leading-[1.55]">{article.summary}</p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener"
        className="self-start mt-1 font-mono text-[0.76rem] tracking-[0.05em] uppercase text-primary-foreground bg-primary px-4 py-2 rounded-md transition-opacity hover:opacity-90 active:scale-95"
      >
        Read Full Article
      </a>
    </div>
  );
}

export type NewsFeedHandle = { refresh: () => void };

/**
 * Remounted (via `key={category}`) whenever the category changes, so per-category
 * state resets cleanly. State always starts empty/loading (matching the server-
 * rendered skeleton) — sessionStorage is only read inside the effect below, never
 * during render, since reading it during a lazy initializer would make the
 * client's first render diverge from SSR and break hydration.
 */
const NewsFeed = forwardRef<NewsFeedHandle, { category: NewsCategory; onLoadingChange: (loading: boolean) => void }>(
  function NewsFeed({ category, onLoadingChange }, ref) {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    function setLoadingBoth(value: boolean) {
      setLoading(value);
      onLoadingChange(value);
    }

    function refresh() {
      setLoadingBoth(true);
      setError(null);
      fetchNews(category)
        .then((results) => {
          setArticles(results);
          persistCachedNews(category, results);
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : "Couldn't load the latest news.");
        })
        .finally(() => setLoadingBoth(false));
    }

    useImperativeHandle(ref, () => ({ refresh }));

    useEffect(() => {
      const cached = loadCachedNews(category);
      if (cached) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setArticles(cached);
        setLoadingBoth(false);
        return;
      }

      let cancelled = false;
      onLoadingChange(true);
      fetchNews(category)
        .then((results) => {
          if (cancelled) return;
          setArticles(results);
          persistCachedNews(category, results);
        })
        .catch((err) => {
          if (cancelled) return;
          setError(err instanceof Error ? err.message : "Couldn't load the latest news.");
        })
        .finally(() => {
          if (!cancelled) setLoadingBoth(false);
        });

      return () => {
        cancelled = true;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    if (error) {
      return (
        <div className="text-center py-16 border border-dashed border-[var(--veil-4)] rounded-xl px-4">
          <p className="text-[var(--brand-text-dim)] text-[0.95rem] mb-4">{error}</p>
          <button
            type="button"
            onClick={refresh}
            className="font-mono text-[0.8rem] tracking-[0.05em] uppercase text-primary-foreground bg-primary px-5 py-2.5 rounded-md transition-opacity hover:opacity-90 active:scale-95"
          >
            Retry
          </button>
        </div>
      );
    }

    if (!loading && articles.length === 0) {
      return (
        <div className="text-center py-16 border border-dashed border-[var(--veil-4)] rounded-xl px-4">
          <p className="text-[var(--brand-text-dim)] text-[0.95rem]">
            No recent articles found for this category.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <NewsCardSkeleton key={i} />)
          : articles.map((article) => <NewsCard key={article.id} article={article} />)}
      </div>
    );
  }
);

export function AIPulse() {
  const [category, setCategory] = useState<NewsCategory>("All");
  const [loading, setLoading] = useState(false);
  const feedRef = useRef<NewsFeedHandle>(null);

  return (
    <section id="ai-pulse" className="py-24 max-md:py-16">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="font-mono text-[0.78rem] tracking-[0.14em] uppercase text-primary flex items-center gap-2.5 mb-4">
          <span className="w-[7px] h-[7px] rounded-full bg-primary shadow-[0_0_0_4px_var(--brand-accent-soft)]" />
          Live feed
        </div>

        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2 sm:mb-3">
                <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] font-bold tracking-[-0.01em] m-0">AI Pulse</h2>
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.66rem] tracking-[0.08em] uppercase text-[var(--brand-danger)] border border-[var(--brand-danger)]/30 bg-[var(--brand-danger-soft)] rounded-full px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-danger)] animate-pulse-dot-danger" />
                  Live
                </span>
              </div>
              <p className="text-[var(--brand-text-dim)] text-[0.92rem] sm:text-[0.95rem]">Latest in AI — updated on load</p>
            </div>
            <button
              type="button"
              onClick={() => feedRef.current?.refresh()}
              disabled={loading}
              className="flex-none font-mono text-[0.76rem] sm:text-[0.78rem] tracking-[0.05em] uppercase text-[var(--brand-text-dim)] border border-[var(--veil-4)] px-4 py-2 sm:py-2.5 rounded-md transition-colors hover:border-[var(--brand-accent-dim)] hover:text-primary active:scale-95 disabled:opacity-60"
            >
              {loading ? "Refreshing…" : "Refresh News"}
            </button>
          </div>
        </Reveal>

        <div className="flex flex-wrap gap-2 mb-8">
          {NEWS_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`font-mono text-[0.74rem] sm:text-[0.78rem] tracking-[0.05em] uppercase px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-colors active:scale-95 ${
                category === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-[var(--veil-4)] text-[var(--brand-text-dim)] hover:border-[var(--brand-accent-dim)] hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <NewsFeed key={category} ref={feedRef} category={category} onLoadingChange={setLoading} />
      </div>
    </section>
  );
}
