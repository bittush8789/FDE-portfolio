"use client";

import { PasswordGate } from "@/components/jobs/password-gate";
import { JobsDashboard } from "@/components/jobs/dashboard";

export function JobsPageClient() {
  return <PasswordGate>{(lock) => <JobsDashboard onLock={lock} />}</PasswordGate>;
}
