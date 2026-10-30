import type { Metadata } from "next";
import { JobsPageClient } from "./jobs-page-client";

export const metadata: Metadata = {
  title: "Job Market — Bittu Sharma",
  robots: { index: false, follow: false },
};

export default function JobsPage() {
  return <JobsPageClient />;
}
