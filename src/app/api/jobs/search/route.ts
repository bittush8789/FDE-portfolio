import { NextRequest, NextResponse } from "next/server";
import type { Job, JobType, Platform } from "@/lib/jobs";

export const dynamic = "force-dynamic";

const ACTOR_IDS: Record<Platform, string> = {
  linkedin: "curious_coder~linkedin-jobs-scraper",
  indeed: "borderline~indeed-scraper",
  naukri: "muhammetakkurtt~naukri-job-scraper",
};

function buildInput(platform: Platform, query: string, location: string) {
  switch (platform) {
    case "linkedin":
      return {
        keywords: query,
        location: location || "India",
        datePosted: "pastMonth",
        limitPerSource: 20,
        scrapeCompany: false,
      };
    case "indeed":
      return {
        query,
        location: location || "India",
        country: "in",
        fromDays: "14",
        maxRows: 20,
        sort: "date",
      };
    case "naukri":
      return {
        jobBoard: "naukri",
        keyword: query,
        maxJobs: 50,
        freshness: "15",
        sortBy: "date",
      };
  }
}

function guessType(remote: boolean, employmentType?: string): JobType {
  if (remote) return "Remote";
  const normalized = (employmentType || "").toLowerCase();
  if (normalized.includes("contract") || normalized.includes("temporary")) return "Contract";
  if (normalized.includes("part")) return "Part-time";
  return "Full-time";
}

function mapItems(platform: Platform, items: Record<string, unknown>[]): Job[] {
  switch (platform) {
    case "linkedin":
      return items.map((item, i) => ({
        id: `linkedin-${item.id ?? i}`,
        title: String(item.title ?? "Untitled role"),
        company: String(item.companyName ?? "Unknown company"),
        location: String(item.location ?? "India"),
        postedAt: String(item.postedAt ?? ""),
        sortDate: String(item.postedAt ?? ""),
        url: String(item.link ?? "#"),
        type: guessType(false, String(item.employmentType ?? "")),
        platform,
        description: String(item.descriptionText ?? "").slice(0, 800),
      }));
    case "indeed":
      return items.map((item, i) => {
        const location = item.location as Record<string, unknown> | undefined;
        return {
          id: `indeed-${item.jobKey ?? i}`,
          title: String(item.title ?? "Untitled role"),
          company: String(item.companyName ?? "Unknown company"),
          location: String(location?.formattedAddressShort ?? "India"),
          postedAt: String(item.age ?? item.datePublished ?? ""),
          sortDate: String(item.datePublished ?? ""),
          url: String(item.jobUrl ?? "#"),
          type: guessType(Boolean(item.isRemote)),
          platform,
          description: String(item.descriptionText ?? "").slice(0, 800),
        };
      });
    case "naukri":
      return items.map((item, i) => ({
        id: `naukri-${item.jobId ?? i}`,
        title: String(item.title ?? "Untitled role"),
        company: String(item.companyName ?? "Unknown company"),
        location: String(item.location ?? "India"),
        postedAt: String(item.createdDate ?? ""),
        sortDate: String(item.createdDate ?? ""),
        url: String(item.jdURL ?? "#"),
        type: guessType(String(item.location ?? "").toLowerCase() === "remote"),
        platform,
        description: String(item.jobDescription ?? "").slice(0, 800),
      }));
  }
}

export async function GET(request: NextRequest) {
  const platform = request.nextUrl.searchParams.get("platform") as Platform | null;
  const query = request.nextUrl.searchParams.get("query") || "";
  const location = request.nextUrl.searchParams.get("location") || "";

  if (!platform || !ACTOR_IDS[platform]) {
    return NextResponse.json({ error: "Unknown platform." }, { status: 400 });
  }

  const token = process.env.APIFY_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Live search isn't configured yet — add APIFY_TOKEN to the server environment." },
      { status: 503 }
    );
  }

  const actorId = ACTOR_IDS[platform];
  const input = buildInput(platform, query, location);

  try {
    const apifyRes = await fetch(
      `https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items?token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
        signal: AbortSignal.timeout(60_000),
      }
    );

    if (!apifyRes.ok) {
      return NextResponse.json(
        { error: `The ${platform} search failed upstream. Try again in a moment.` },
        { status: 502 }
      );
    }

    const items = (await apifyRes.json()) as Record<string, unknown>[];
    const jobs = mapItems(platform, items).slice(0, 20);

    return NextResponse.json({ jobs });
  } catch {
    return NextResponse.json(
      { error: "Couldn't reach the job search service. Check your connection and try again." },
      { status: 502 }
    );
  }
}
