"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "ai-pulse", label: "AI Pulse" },
  { id: "contact", label: "Contact" },
];

export function DotNav() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top <= b.boundingClientRect.top ? a : b));
        setActiveId(topMost.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="hidden xl:flex fixed right-[4.5rem] 2xl:right-[4.75rem] top-1/2 -translate-y-1/2 z-[150] flex-col gap-4"
    >
      {SECTIONS.map(({ id, label }) => {
        const active = id === activeId;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            aria-current={active ? "true" : undefined}
            className="relative flex items-center justify-center w-4 h-4 group"
          >
            <span
              className={cn(
                "block rounded-full transition-all duration-300",
                active
                  ? "w-2.5 h-2.5 bg-primary shadow-[0_0_0_3px_var(--brand-accent-soft)]"
                  : "w-1.5 h-1.5 bg-[var(--brand-text-faint)] group-hover:bg-[var(--brand-text-dim)]"
              )}
            />
            <span
              className={cn(
                "hidden 2xl:block absolute right-6 top-1/2 -translate-y-1/2 translate-x-1.5 whitespace-nowrap font-mono text-[0.68rem] tracking-[0.1em] uppercase px-2 py-0.5 rounded border pointer-events-none transition-all duration-150",
                active
                  ? "opacity-100 translate-x-0 text-foreground bg-[var(--brand-bg-raised)] border-[var(--brand-accent-dim)]"
                  : "opacity-0 text-[var(--brand-text-dim)] bg-[var(--brand-bg-raised)] border-[var(--veil-4)] group-hover:opacity-100 group-hover:translate-x-0"
              )}
            >
              {label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
