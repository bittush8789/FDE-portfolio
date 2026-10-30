"use client";

import { useState } from "react";
import { JOB_TYPES, LOCATIONS, PLATFORMS, searchJobs, type Job, type JobType, type Platform } from "@/lib/jobs";
import { JobCard, JobCardSkeleton } from "./job-card";

export function DiscoverJobsPanel({
  isSaved,
  onToggleSave,
  onSearch,
}: {
  isSaved: (jobId: string) => boolean;
  onToggleSave: (job: Job) => void;
  onSearch: (query: string, location: string) => void;
}) {
  const [platform, setPlatform] = useState<Platform>("linkedin");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState<string>("Remote");
  const [customLocation, setCustomLocation] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<JobType[]>([]);

  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  function toggleType(type: JobType) {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  async function runSearch() {
    setLoading(true);
    setError(null);
    const effectiveLocation = location === "Custom" ? customLocation : location;
    try {
      const jobs = await searchJobs({ query, location: effectiveLocation, types: selectedTypes, platform });
      setResults(jobs);
      onSearch(query, effectiveLocation);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Job search failed. Please try again.");
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    await runSearch();
  }

  const activePlatform = PLATFORMS.find((p) => p.id === platform)!;

  return (
    <div>
      <p className="text-[var(--brand-text-dim)] text-[0.9rem] mb-6 max-w-[560px]">
        Runs a live search against LinkedIn, Indeed, or Naukri right now — for roles that
        haven&apos;t made it into the scraped list on Find Jobs yet.
      </p>

      <form onSubmit={handleSearch} className="flex flex-col gap-5 mb-3">
        <div className="flex flex-wrap gap-2">
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
            placeholder="Job title or keywords (e.g. AI Engineer)"
            className="flex-1 bg-transparent border border-[var(--veil-4)] rounded-md px-4 py-3 text-[0.95rem] outline-none transition-colors focus:border-[var(--brand-accent-dim)]"
          />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-background border border-[var(--veil-4)] rounded-md px-4 py-3 text-[0.95rem] outline-none transition-colors focus:border-[var(--brand-accent-dim)] max-md:w-full"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          {location === "Custom" && (
            <input
              type="text"
              value={customLocation}
              onChange={(e) => setCustomLocation(e.target.value)}
              placeholder="Enter a location"
              className="flex-1 bg-transparent border border-[var(--veil-4)] rounded-md px-4 py-3 text-[0.95rem] outline-none transition-colors focus:border-[var(--brand-accent-dim)]"
            />
          )}
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

        <button
          type="submit"
          disabled={loading}
          className="self-start font-mono text-[0.85rem] tracking-[0.05em] uppercase text-primary-foreground bg-primary px-7 py-3.5 rounded-md transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Searching…" : "Search Jobs"}
        </button>
      </form>

      <p className="font-mono text-[0.74rem] tracking-[0.03em] text-[var(--brand-text-faint)] mb-8">
        Results from {activePlatform.label} Jobs
      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {loading && Array.from({ length: 3 }).map((_, i) => <JobCardSkeleton key={i} />)}

        {!loading &&
          !error &&
          hasSearched &&
          results.map((job) => (
            <JobCard key={job.id} job={job} saved={isSaved(job.id)} onToggleSave={onToggleSave} />
          ))}
      </div>

      {!loading && error && (
        <div className="text-center py-16 border border-dashed border-[var(--veil-4)] rounded-xl">
          <p className="text-[var(--brand-text-dim)] text-[0.95rem] mb-4">{error}</p>
          <button
            type="button"
            onClick={runSearch}
            className="font-mono text-[0.8rem] tracking-[0.05em] uppercase text-primary-foreground bg-primary px-5 py-2.5 rounded-md transition-opacity hover:opacity-90"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && hasSearched && results.length === 0 && (
        <div className="text-center py-16 border border-dashed border-[var(--veil-4)] rounded-xl">
          <p className="text-[var(--brand-text-dim)] text-[0.95rem]">
            No jobs found — try a different keyword or location.
          </p>
        </div>
      )}

      {!hasSearched && (
        <div className="text-center py-16 border border-dashed border-[var(--veil-4)] rounded-xl">
          <p className="text-[var(--brand-text-dim)] text-[0.95rem]">
            Pick a platform and search above to see open roles.
          </p>
        </div>
      )}
    </div>
  );
}
