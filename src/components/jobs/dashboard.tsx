"use client";

import { useState } from "react";
import { LockKeyhole, Menu } from "lucide-react";
import {
  loadLastSearch,
  loadSavedJobs,
  persistLastSearch,
  persistSavedJobs,
  type Job,
  type LastSearch,
} from "@/lib/jobs";
import { DashboardSidebar, type PanelId } from "./sidebar";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { OverviewPanel } from "./overview-panel";
import { FindJobsPanel } from "./find-jobs-panel";
import { DiscoverJobsPanel } from "./discover-jobs-panel";
import { SavedJobsPanel } from "./saved-jobs-panel";

const PANEL_TITLES: Record<PanelId, { title: string; subtitle: string }> = {
  overview: { title: "Overview", subtitle: "Your job search at a glance" },
  find: { title: "Find Jobs", subtitle: "Browse and rank roles already scraped from LinkedIn, Indeed & Naukri" },
  discover: { title: "Discover more jobs", subtitle: "Run a live search for roles beyond the scraped list" },
  saved: { title: "Saved Jobs", subtitle: "Roles you've bookmarked for later" },
};

export function JobsDashboard({ onLock }: { onLock: () => void }) {
  const [panel, setPanel] = useState<PanelId>("overview");
  const [savedJobs, setSavedJobs] = useState<Job[]>(() => loadSavedJobs());
  const [lastSearch, setLastSearch] = useState<LastSearch | null>(() => loadLastSearch());
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function isSaved(jobId: string) {
    return savedJobs.some((j) => j.id === jobId);
  }

  function toggleSave(job: Job) {
    setSavedJobs((prev) => {
      const next = prev.some((j) => j.id === job.id)
        ? prev.filter((j) => j.id !== job.id)
        : [...prev, job];
      persistSavedJobs(next);
      return next;
    });
  }

  function handleSearch(query: string, location: string) {
    const next = { query: query || "All roles", location };
    setLastSearch(next);
    persistLastSearch(next);
  }

  const { title, subtitle } = PANEL_TITLES[panel];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <DashboardSidebar
        active={panel}
        onSelect={setPanel}
        savedCount={savedJobs.length}
        mobileOpen={mobileNavOpen}
        onMobileClose={() => setMobileNavOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-[72px] flex-none flex items-center justify-between gap-4 px-8 max-md:px-5 border-b border-[var(--veil-4)]">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
              className="md:hidden flex-none flex items-center justify-center w-9 h-9 rounded-md border border-[var(--veil-4)] text-[var(--brand-text-dim)] hover:text-foreground hover:border-[var(--brand-accent-dim)] transition-colors"
            >
              <Menu className="w-4 h-4" strokeWidth={1.75} />
            </button>
            <div className="min-w-0">
              <h1 className="text-[1.15rem] font-bold tracking-[-0.01em] truncate">{title}</h1>
              <p className="text-[var(--brand-text-dim)] text-[0.82rem] truncate">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-none">
            <ThemeToggle className="flex items-center justify-center w-9 h-9 rounded-md border border-[var(--veil-4)] text-[var(--brand-text-dim)] hover:text-foreground hover:border-[var(--brand-accent-dim)] transition-colors" />
            <button
              type="button"
              onClick={onLock}
              className="flex items-center gap-2 font-mono text-[0.74rem] tracking-[0.05em] uppercase text-[var(--brand-text-dim)] border border-[var(--veil-4)] px-3.5 py-2 rounded-md transition-colors hover:border-[var(--brand-accent-dim)] hover:text-primary"
            >
              <LockKeyhole className="w-3.5 h-3.5" strokeWidth={1.75} />
              Lock
            </button>
          </div>
        </header>

        <main className="flex-1 p-8 max-md:p-5 overflow-auto">
          {panel === "overview" && (
            <OverviewPanel
              savedJobs={savedJobs}
              lastSearch={lastSearch}
              onGoToFind={() => setPanel("find")}
            />
          )}
          {panel === "find" && <FindJobsPanel isSaved={isSaved} onToggleSave={toggleSave} />}
          {panel === "discover" && (
            <DiscoverJobsPanel isSaved={isSaved} onToggleSave={toggleSave} onSearch={handleSearch} />
          )}
          {panel === "saved" && <SavedJobsPanel savedJobs={savedJobs} onToggleSave={toggleSave} />}
        </main>
      </div>
    </div>
  );
}
