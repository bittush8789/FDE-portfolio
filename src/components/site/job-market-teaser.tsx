import Link from "next/link";
import { Reveal } from "./reveal";

export function JobMarketTeaser() {
  return (
    <section id="job-market" className="py-24 max-md:py-16">
      <div className="max-w-[1100px] mx-auto px-8 max-md:px-5">
        <div className="font-mono text-[0.78rem] tracking-[0.14em] uppercase text-primary flex items-center gap-2.5 mb-4">
          <span className="w-[7px] h-[7px] rounded-full bg-primary shadow-[0_0_0_4px_var(--brand-accent-soft)]" />
          Job market
        </div>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 bg-[var(--brand-bg-raised)] border border-[var(--veil-4)] rounded-xl p-10 max-md:p-7">
            <div className="max-w-[520px]">
              <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] font-bold tracking-[-0.01em] mb-3">
                A private job search dashboard
              </h2>
              <p className="text-[var(--brand-text-dim)] text-[0.95rem] leading-[1.6]">
                Search and track AI roles in one place — kept behind a passcode since it&apos;s a
                personal tool, not part of the public site.
              </p>
            </div>
            <Link
              href="/jobs"
              className="flex-none font-mono text-[0.85rem] tracking-[0.05em] uppercase text-primary-foreground bg-primary px-7 py-3.5 rounded-md transition-opacity hover:opacity-90"
            >
              Open dashboard →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
