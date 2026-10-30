import { NextRequest, NextResponse } from "next/server";
import type { NewsArticle, NewsCategory } from "@/lib/news";

export const dynamic = "force-dynamic";

const CATEGORY_TERMS: Record<NewsCategory, string> = {
  All: "AI news latest",
  "AI Tools": "AI news latest AI tools",
  Automation: "AI news latest automation",
  LLMs: "AI news latest LLMs",
  "Business Tech": "AI news latest business technology",
};

function sourceFromUrl(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    const name = host.split(".")[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    return "Source";
  }
}

function twoSentences(text: string): string {
  const clean = (text || "").replace(/\s+/g, " ").trim();
  const sentences = clean.split(/(?<=[.!?])\s+/).slice(0, 2);
  return sentences.join(" ");
}

export async function GET(request: NextRequest) {
  const category = (request.nextUrl.searchParams.get("category") || "All") as NewsCategory;
  const query = CATEGORY_TERMS[category] ?? CATEGORY_TERMS.All;

  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Live news isn't configured yet — add TAVILY_API_KEY to the server environment." },
      { status: 503 }
    );
  }

  try {
    const tavilyRes = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        query,
        topic: "news",
        days: 1,
        max_results: 8,
      }),
      signal: AbortSignal.timeout(20_000),
    });

    if (!tavilyRes.ok) {
      return NextResponse.json(
        { error: "The news search failed upstream. Try again in a moment." },
        { status: 502 }
      );
    }

    const data = (await tavilyRes.json()) as { results?: Record<string, unknown>[] };

    const articles: NewsArticle[] = (data.results ?? []).map((item, i) => {
      const url = String(item.url ?? "#");
      return {
        id: `${category}-${i}-${url}`,
        headline: String(item.title ?? "Untitled"),
        url,
        source: sourceFromUrl(url),
        publishedAt: String(item.published_date ?? new Date().toISOString()),
        summary: twoSentences(String(item.content ?? "")),
      };
    });

    return NextResponse.json({ articles });
  } catch {
    return NextResponse.json(
      { error: "Couldn't reach the news service. Check your connection and try again." },
      { status: 502 }
    );
  }
}
