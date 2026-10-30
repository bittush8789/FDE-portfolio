export type JobType = "Full-time" | "Part-time" | "Contract" | "Remote";

export const JOB_TYPES: JobType[] = ["Full-time", "Part-time", "Contract", "Remote"];
export const LOCATIONS = ["Remote", "New Delhi", "Bangalore", "Mumbai", "Delhi", "Custom"] as const;

export type Platform = "linkedin" | "indeed" | "naukri";

export const PLATFORMS: { id: Platform; label: string }[] = [
  { id: "linkedin", label: "LinkedIn" },
  { id: "indeed", label: "Indeed" },
  { id: "naukri", label: "Naukri" },
];

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  postedAt: string;
  /** ISO-ish date string used for chronological sorting; postedAt is the display string. */
  sortDate?: string;
  url: string;
  type: JobType;
  platform?: Platform;
  tags?: string[];
  /** Raw/trimmed job description text, used for skill-match scoring — not always shown. */
  description?: string;
};

/** Text to scan for skill-match scoring: title, tags, and description combined. */
export function jobMatchText(job: Job): string {
  return [job.title, job.tags?.join(" "), job.description].filter(Boolean).join(" ");
}

export type JobSearchParams = {
  query: string;
  location: string;
  types: JobType[];
  platform: Platform;
};

const SAVED_JOBS_KEY = "portfolio:saved-jobs";
const LAST_SEARCH_KEY = "portfolio:last-job-search";

/**
 * Live search — calls the server-side /api/jobs/search route, which holds the
 * Apify token and runs the actor for the chosen platform. Never call Apify
 * directly from the client; the token must never reach the browser.
 */
export async function searchJobs(params: JobSearchParams): Promise<Job[]> {
  const search = new URLSearchParams({
    platform: params.platform,
    query: params.query,
    location: params.location,
  });

  const res = await fetch(`/api/jobs/search?${search.toString()}`);

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || "Job search failed. Please try again.");
  }

  const { jobs } = (await res.json()) as { jobs: Job[] };

  return params.types.length ? jobs.filter((job) => params.types.includes(job.type)) : jobs;
}

export function loadSavedJobs(): Job[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SAVED_JOBS_KEY);
    return raw ? (JSON.parse(raw) as Job[]) : [];
  } catch {
    return [];
  }
}

export function persistSavedJobs(jobs: Job[]) {
  try {
    window.localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(jobs));
  } catch {
    // localStorage unavailable (private mode, quota) — saving is best-effort
  }
}

export type LastSearch = { query: string; location: string };

export function loadLastSearch(): LastSearch | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LAST_SEARCH_KEY);
    return raw ? (JSON.parse(raw) as LastSearch) : null;
  } catch {
    return null;
  }
}

export function persistLastSearch(search: LastSearch) {
  try {
    window.localStorage.setItem(LAST_SEARCH_KEY, JSON.stringify(search));
  } catch {
    // best-effort
  }
}
