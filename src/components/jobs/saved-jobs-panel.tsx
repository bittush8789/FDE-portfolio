import type { Job } from "@/lib/jobs";
import { JobCard } from "./job-card";

export function SavedJobsPanel({
  savedJobs,
  onToggleSave,
}: {
  savedJobs: Job[];
  onToggleSave: (job: Job) => void;
}) {
  if (savedJobs.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-[var(--veil-4)] rounded-xl">
        <p className="text-[var(--brand-text-dim)] text-[0.95rem]">
          No saved jobs yet — save a job from the Find Jobs tab to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
      {savedJobs.map((job) => (
        <JobCard key={job.id} job={job} saved onToggleSave={onToggleSave} />
      ))}
    </div>
  );
}
