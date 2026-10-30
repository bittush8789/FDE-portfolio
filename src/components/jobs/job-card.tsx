import type { Job } from "@/lib/jobs";
import { PLATFORMS, jobMatchText } from "@/lib/jobs";
import { scoreJobMatch, type MatchLabel } from "@/lib/profile";

function platformLabel(platform?: Job["platform"]) {
  return PLATFORMS.find((p) => p.id === platform)?.label;
}

const MATCH_STYLES: Record<MatchLabel, string> = {
  "Strong Match": "text-[var(--brand-live)] border-[var(--brand-live)]/40 bg-[var(--brand-live)]/10",
  "Good Match": "text-primary border-[var(--brand-accent-dim)] bg-[var(--brand-accent-soft)]",
  Explore: "text-[var(--brand-text-faint)] border-[var(--veil-5)] bg-[var(--veil-1)]",
};

export function MatchBadge({ job }: { job: Job }) {
  const { label } = scoreJobMatch(jobMatchText(job));
  return (
    <span
      className={`flex-none font-mono text-[0.68rem] tracking-[0.05em] uppercase border rounded-md px-2.5 py-1 ${MATCH_STYLES[label]}`}
    >
      {label}
    </span>
  );
}

export function JobCard({
  job,
  saved,
  onToggleSave,
}: {
  job: Job;
  saved: boolean;
  onToggleSave: (job: Job) => void;
}) {
  const platform = platformLabel(job.platform);

  return (
    <div className="group flex flex-col gap-4 bg-[var(--brand-bg-raised)] border border-[var(--veil-4)] rounded-xl p-6 transition-all duration-250 hover:border-[var(--brand-accent-dim)] hover:bg-[var(--brand-bg-raised-2)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[1.05rem] font-bold tracking-[-0.01em] mb-1">{job.title}</h3>
          <p className="text-[var(--brand-text-dim)] text-[0.88rem]">{job.company}</p>
        </div>
        <div className="flex flex-none flex-col items-end gap-1.5">
          <span className="font-mono text-[0.68rem] tracking-[0.08em] uppercase text-primary border border-[var(--brand-accent-dim)] rounded-md px-2.5 py-1">
            {job.type}
          </span>
          <MatchBadge job={job} />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 font-mono text-[0.76rem] text-[var(--brand-text-faint)]">
        <span>{job.location}</span>
        <span className="text-[var(--brand-border-strong)]">·</span>
        <span>{job.postedAt}</span>
        {platform && (
          <>
            <span className="text-[var(--brand-border-strong)]">·</span>
            <span>{platform}</span>
          </>
        )}
      </div>
      {job.tags && job.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[0.7rem] text-[var(--brand-text-dim)] bg-[var(--veil-2)] border border-[var(--veil-3)] rounded-full px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-3 mt-1">
        <a
          href={job.url}
          target="_blank"
          rel="noopener"
          className="font-mono text-[0.76rem] tracking-[0.05em] uppercase text-primary-foreground bg-primary px-4 py-2 rounded-md transition-opacity hover:opacity-90"
        >
          Apply
        </a>
        <button
          type="button"
          onClick={() => onToggleSave(job)}
          className="font-mono text-[0.76rem] tracking-[0.05em] uppercase text-[var(--brand-text-dim)] border border-[var(--veil-4)] px-4 py-2 rounded-md transition-colors hover:border-[var(--brand-accent-dim)] hover:text-primary"
        >
          {saved ? "Unsave" : "Save"}
        </button>
      </div>
    </div>
  );
}

export function JobCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 bg-[var(--brand-bg-raised)] border border-[var(--veil-4)] rounded-xl p-6 animate-pulse">
      <div className="h-4.5 w-2/3 bg-[var(--veil-3)] rounded" />
      <div className="h-3 w-1/3 bg-[var(--veil-3)] rounded" />
      <div className="h-3 w-1/2 bg-[var(--veil-3)] rounded" />
      <div className="h-8 w-24 bg-[var(--veil-3)] rounded-md mt-1" />
    </div>
  );
}
