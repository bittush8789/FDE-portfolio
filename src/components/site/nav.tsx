"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "certificates", label: "certificates" },
  { id: "contact", label: "contact" },
];

export function Nav() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      const hero = document.getElementById("hero");
      if (!hero) return;
      setVisible(window.scrollY > hero.offsetHeight * 0.7);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 h-[64px] md:h-[72px] z-[200] flex items-center bg-[var(--scrim-1)] backdrop-blur-md border-b transition-all duration-400",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto border-[var(--veil-4)]"
          : "opacity-0 -translate-y-2 pointer-events-none border-transparent"
      )}
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 w-full flex items-center justify-between">
        <a href="#hero" onClick={() => setOpen(false)} className="font-mono text-xs sm:text-sm font-medium text-foreground flex-shrink-0">
          bittu<span className="text-primary">.</span>sharma
        </a>
        <ul className="hidden sm:flex items-center gap-3 sm:gap-6 md:gap-8 list-none m-0 p-0">
          {LINKS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="font-mono text-[0.68rem] sm:text-[0.72rem] tracking-[0.08em] sm:tracking-[0.12em] uppercase text-[var(--brand-text-dim)] hover:text-foreground transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden flex flex-col items-center justify-center gap-[5px] w-9 h-9 -mr-2 text-foreground"
        >
          <span className={cn("block w-5 h-[1.5px] bg-current transition-transform duration-200", open && "translate-y-[6.5px] rotate-45")} />
          <span className={cn("block w-5 h-[1.5px] bg-current transition-opacity duration-200", open && "opacity-0")} />
          <span className={cn("block w-5 h-[1.5px] bg-current transition-transform duration-200", open && "-translate-y-[6.5px] -rotate-45")} />
        </button>
      </div>
      <div
        className={cn(
          "sm:hidden absolute top-full left-0 right-0 bg-[var(--scrim-1)] backdrop-blur-md border-b border-[var(--veil-4)] transition-all duration-300",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <ul className="list-none m-0 p-0 px-4 pb-2">
          {LINKS.map(({ id, label }) => (
            <li key={id} className="border-b border-[var(--veil-3)] last:border-b-0">
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="block py-3 font-mono text-[0.78rem] tracking-[0.12em] uppercase text-[var(--brand-text-dim)] hover:text-foreground transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
