import { Reveal } from "./reveal";
import { SKILL_GROUPS as GROUPS } from "@/lib/profile";
import {
  Briefcase,
  Bot,
  ShieldCheck,
  Boxes,
  Cloud,
  Code2,
} from "lucide-react";

const GROUP_ICONS = [
  Briefcase,
  Bot,
  ShieldCheck,
  Boxes,
  Cloud,
  Code2,
];

export function Skills() {
  return (
    <section id="skills" className="py-24 max-md:py-16">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="font-mono text-[0.78rem] tracking-[0.14em] uppercase text-primary flex items-center gap-2.5 mb-4">
          <span className="w-[7px] h-[7px] rounded-full bg-primary shadow-[0_0_0_4px_var(--brand-accent-soft)]" />
          Toolkit
        </div>

        <div className="mb-10 max-md:mb-7 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <Reveal>
            <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] font-bold tracking-[-0.01em] m-0">
              Skills &amp; Tools
            </h2>
          </Reveal>
          <span className="font-mono text-[0.8rem] text-[var(--brand-text-dim)]">
            Core stack &amp; capabilities
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          {GROUPS.map((group, idx) => {
            const Icon = GROUP_ICONS[idx % GROUP_ICONS.length];
            const colSpan = "md:col-span-1 lg:col-span-2";

            return (
              <Reveal key={group.label} className={colSpan}>
                <div className="h-full flex flex-col bg-[var(--brand-bg-raised)] border border-[var(--veil-4)] rounded-xl p-5 sm:p-6 transition-all duration-200 hover:border-[var(--brand-accent-dim)] hover:bg-[var(--brand-bg-raised-2)] hover:shadow-[0_12px_32px_-16px_rgba(232,98,42,0.22)]">
                  <div className="flex items-center gap-2.5 mb-4 pb-3.5 border-b border-[var(--veil-4)]">
                    <div className="w-8 h-8 rounded-lg bg-[var(--brand-accent-soft)] text-primary flex items-center justify-center flex-none">
                      <Icon className="w-4 h-4" strokeWidth={2} />
                    </div>
                    <span className="font-mono text-[0.72rem] sm:text-[0.78rem] tracking-[0.06em] uppercase text-foreground font-semibold leading-snug break-words">
                      {group.label}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 flex-1 content-start">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 sm:gap-2 font-mono text-[0.76rem] sm:text-[0.8rem] text-foreground bg-[var(--veil-2)] border border-[var(--veil-4)] px-2.5 sm:px-3 py-1.5 rounded-md transition-all duration-150 hover:border-primary/60 hover:bg-[var(--brand-accent-soft)] hover:text-primary hover:-translate-y-0.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_0_2px_var(--brand-accent-soft)] flex-none" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
