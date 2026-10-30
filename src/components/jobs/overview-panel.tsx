import type { Job, LastSearch } from "@/lib/jobs";
import { PLATFORMS, jobMatchText } from "@/lib/jobs";
import { CURATED_JOBS, CURATED_JOBS_FETCHED_AT } from "@/lib/curated-jobs";
import { scoreJobMatch } from "@/lib/profile";

const MATCH_RANK = { "Strong Match": 2, "Good Match": 1, Explore: 0 } as const;

const TOP_MATCHES = [...CURATED_JOBS]
  .sort((a, b) => MATCH_RANK[scoreJobMatch(jobMatchText(b)).label] - MATCH_RANK[scoreJobMatch(jobMatchText(a)).label])
  .slice(0, 6);

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[var(--brand-bg-raised)] border border-[var(--veil-4)] rounded-xl p-6">
      <p className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-[var(--brand-text-faint)] mb-2">
        {label}
      </p>
      <p className="text-[1.5rem] font-bold tracking-[-0.01em]">{value}</p>
    </div>
  );
}

function platformLabel(platform?: Job["platform"]) {
  return PLATFORMS.find((p) => p.id === platform)?.label;
}

export function OverviewPanel({
  savedJobs,
  lastSearch,
  onGoToFind,
}: {
  savedJobs: Job[];
  lastSearch: LastSearch | null;
  onGoToFind: () => void;
}) {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid sm:grid-cols-3 gap-4">
        <StatTile label="Saved jobs" value={String(savedJobs.length)} />
        <StatTile label="Last search" value={lastSearch?.query || "None yet"} />
        <StatTile label="Preferred location" value={lastSearch?.location || "Not set"} />
      </div>

      {savedJobs.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-[var(--veil-4)] rounded-xl">
          <p className="text-[var(--brand-text-dim)] text-[0.95rem] mb-4">
            No activity yet — search for a role to get started.
          </p>
          <button
            type="button"
            onClick={onGoToFind}
            className="font-mono text-[0.8rem] tracking-[0.05em] uppercase text-primary-foreground bg-primary px-5 py-2.5 rounded-md transition-opacity hover:opacity-90"
          >
            Find Jobs
          </button>
        </div>
      ) : (
        <div>
          <h3 className="font-mono text-[0.72rem] tracking-[0.14em] uppercase text-[var(--brand-text-faint)] mb-3">
            Recently saved
          </h3>
          <div className="flex flex-col gap-2">
            {savedJobs.slice(0, 5).map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between gap-4 bg-[var(--brand-bg-raised)] border border-[var(--veil-4)] rounded-lg px-4 py-3"
              >
                <div>
                  <p className="text-[0.92rem] font-medium">{job.title}</p>
                  <p className="text-[var(--brand-text-dim)] text-[0.8rem]">{job.company}</p>
                </div>
                <span className="font-mono text-[0.68rem] tracking-[0.08em] uppercase text-primary border border-[var(--brand-accent-dim)] rounded-md px-2.5 py-1 flex-none">
                  {job.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
          <h3 className="font-mono text-[0.72rem] tracking-[0.14em] uppercase text-[var(--brand-text-faint)]">
            Top matches for your profile
          </h3>
          <p className="font-mono text-[0.7rem] text-[var(--brand-text-faint)]">
            Snapshot from {CURATED_JOBS_FETCHED_AT} — not live, ask Claude to refresh
          </p>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          {TOP_MATCHES.map((job) => {
            const { label } = scoreJobMatch(jobMatchText(job));
            return (
              <a
                key={job.id}
                href={job.url}
                target="_blank"
                rel="noopener"
                className="group flex flex-wrap items-center justify-between gap-3 bg-[var(--brand-bg-raised)] border border-[var(--veil-4)] rounded-lg px-4 py-3 transition-colors hover:border-[var(--brand-accent-dim)]"
              >
                <div className="min-w-0">
                  <p className="text-[0.92rem] font-medium truncate group-hover:text-primary transition-colors">
                    {job.title}
                  </p>
                  <p className="text-[var(--brand-text-dim)] text-[0.8rem] truncate">
                    {job.company} · {job.location}
                  </p>
                </div>
                <div className="flex flex-none flex-wrap items-center gap-1.5">
                  <span className="font-mono text-[0.68rem] tracking-[0.05em] uppercase text-[var(--brand-text-dim)] border border-[var(--veil-5)] rounded-md px-2 py-1">
                    {label}
                  </span>
                  <span className="font-mono text-[0.68rem] tracking-[0.05em] uppercase text-primary border border-[var(--brand-accent-dim)] rounded-md px-2 py-1">
                    {platformLabel(job.platform)}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
        <button
          type="button"
          onClick={onGoToFind}
          className="font-mono text-[0.8rem] tracking-[0.05em] uppercase text-primary-foreground bg-primary px-5 py-2.5 rounded-md transition-opacity hover:opacity-90"
        >
          View all {CURATED_JOBS.length} scraped jobs
        </button>
      </div>
    </div>
  );
}
