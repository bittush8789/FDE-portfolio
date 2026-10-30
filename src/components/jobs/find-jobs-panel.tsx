"use client";

import { useMemo, useState } from "react";
import { JOB_TYPES, PLATFORMS, jobMatchText, type Job, type JobType, type Platform } from "@/lib/jobs";
import { CURATED_JOBS, CURATED_JOBS_FETCHED_AT } from "@/lib/curated-jobs";
import { scoreJobMatch } from "@/lib/profile";
import { JobCard } from "./job-card";

type SortMode = "match" | "date";

const MATCH_RANK = { "Strong Match": 2, "Good Match": 1, Explore: 0 } as const;

function sortDateValue(job: Job) {
  const t = Date.parse(job.sortDate ?? job.postedAt);
  return Number.isNaN(t) ? 0 : t;
}

export function FindJobsPanel({
  isSaved,
  onToggleSave,
}: {
  isSaved: (jobId: string) => boolean;
  onToggleSave: (job: Job) => void;
}) {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<Platform | "all">("all");
  const [selectedTypes, setSelectedTypes] = useState<JobType[]>([]);
  const [sort, setSort] = useState<SortMode>("match");

  function toggleType(type: JobType) {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let jobs = CURATED_JOBS.filter((job) => {
      if (platform !== "all" && job.platform !== platform) return false;
      if (selectedTypes.length && !selectedTypes.includes(job.type)) return false;
      if (!q) return true;
      return (
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.tags?.some((t) => t.toLowerCase().includes(q))
      );
    });

    jobs = [...jobs].sort((a, b) => {
      if (sort === "date") return sortDateValue(b) - sortDateValue(a);
      const matchA = MATCH_RANK[scoreJobMatch(jobMatchText(a)).label];
      const matchB = MATCH_RANK[scoreJobMatch(jobMatchText(b)).label];
      return matchB - matchA || sortDateValue(b) - sortDateValue(a);
    });

    return jobs;
  }, [query, platform, selectedTypes, sort]);

  return (
    <div>
      <div className="flex flex-col gap-5 mb-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setPlatform("all")}
            className={`font-mono text-[0.78rem] tracking-[0.05em] uppercase px-4 py-2 rounded-full border transition-colors ${
              platform === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "border-[var(--veil-4)] text-[var(--brand-text-dim)] hover:border-[var(--brand-accent-dim)] hover:text-foreground"
            }`}
          >
            All platforms
          </button>
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlatform(p.id)}
              className={`font-mono text-[0.78rem] tracking-[0.05em] uppercase px-4 py-2 rounded-full border transition-colors ${
                platform === p.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-[var(--veil-4)] text-[var(--brand-text-dim)] hover:border-[var(--brand-accent-dim)] hover:text-foreground"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="flex gap-3 max-md:flex-col">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by title, company, or tag (e.g. LangChain)"
            className="flex-1 bg-transparent border border-[var(--veil-4)] rounded-md px-4 py-3 text-[0.95rem] outline-none transition-colors focus:border-[var(--brand-accent-dim)]"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
            className="bg-background border border-[var(--veil-4)] rounded-md px-4 py-3 text-[0.95rem] outline-none transition-colors focus:border-[var(--brand-accent-dim)] max-md:w-full"
          >
            <option value="match">Sort by Match Score</option>
            <option value="date">Sort by Date Posted</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {JOB_TYPES.map((type) => {
            const active = selectedTypes.includes(type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleType(type)}
                className={`font-mono text-[0.78rem] tracking-[0.05em] uppercase px-4 py-2 rounded-full border transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-[var(--veil-4)] text-[var(--brand-text-dim)] hover:border-[var(--brand-accent-dim)] hover:text-foreground"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      <p className="font-mono text-[0.74rem] tracking-[0.03em] text-[var(--brand-text-faint)] mb-8">
        Showing {results.length} of {CURATED_JOBS.length} jobs scraped from LinkedIn, Indeed &amp; Naukri —
        snapshot from {CURATED_JOBS_FETCHED_AT}
      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {results.map((job) => (
          <JobCard key={job.id} job={job} saved={isSaved(job.id)} onToggleSave={onToggleSave} />
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-16 border border-dashed border-[var(--veil-4)] rounded-xl">
          <p className="text-[var(--brand-text-dim)] text-[0.95rem]">
            No jobs found — try a different keyword, platform, or type.
          </p>
        </div>
      )}
    </div>
  );
}
