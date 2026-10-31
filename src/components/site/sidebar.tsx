"use client";

import { useEffect, useState } from "react";
import { MailIcon, LinkedInIcon, GitHubIcon, HashnodeIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "mailto:bittush9534@gmail.com", label: "Email", Icon: MailIcon, external: false },
  { href: "https://www.linkedin.com/in/bittu-kumar-54ab13254/", label: "LinkedIn", Icon: LinkedInIcon, external: true },
  { href: "https://github.com/bittush8789", label: "GitHub", Icon: GitHubIcon, external: true },
  { href: "https://bittublog.hashnode.dev/", label: "Blog", Icon: HashnodeIcon, external: true },
];

export function Sidebar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        // The dock only floats on small screens; on desktop it stays pinned.
        if (window.innerWidth < 768) {
          setHidden(y > lastY && y > 120);
        } else {
          setHidden(false);
        }
        lastY = y;
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside
      aria-label="Social links and theme settings"
      aria-hidden={hidden || undefined}
      className={cn(
        "fixed z-[190] flex items-center transition-all duration-300",
        // Mobile / Tablet portrait: sleek floating dock at bottom center
        "max-md:bottom-4 max-md:left-1/2 max-md:-translate-x-1/2 max-md:flex-row max-md:justify-center max-md:gap-3 max-md:px-4 max-md:py-2",
        "max-md:bg-[var(--scrim-1)] max-md:backdrop-blur-xl max-md:border max-md:border-[var(--veil-4)] max-md:rounded-full max-md:shadow-2xl",
        // Slide the dock out of the way while scrolling down so it never sits on top of content
        hidden && "max-md:translate-y-[150%] max-md:opacity-0 max-md:pointer-events-none",
        // Desktop / Laptop: vertical bar pinned to the right
        "md:right-6 lg:right-7 md:top-1/2 md:-translate-y-1/2 md:flex-col md:bg-transparent md:backdrop-blur-none md:border-none md:p-0 md:rounded-none md:shadow-none"
      )}
    >
      <div className="hidden md:block w-px h-9 bg-[var(--brand-border-strong)] mb-1" />
      <ul className="flex items-center gap-3 md:gap-[22px] list-none m-0 p-0 md:flex-col">
        {LINKS.map(({ href, label, Icon, external }) => (
          <li key={label} className="relative flex items-center group">
            <a
              href={href}
              aria-label={label}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener" : undefined}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-[var(--veil-4)] bg-[var(--brand-bg-raised)] text-[var(--brand-text-dim)] transition-all hover:text-primary hover:border-[var(--brand-accent-dim)] hover:-translate-y-0.5 active:scale-95"
            >
              <Icon className="w-4 h-4" />
            </a>
            <span className="hidden md:block absolute right-[46px] top-1/2 -translate-y-1/2 translate-x-1.5 whitespace-nowrap font-mono text-[0.68rem] tracking-[0.1em] uppercase text-[var(--brand-text-dim)] bg-[var(--brand-bg-raised)] border border-[var(--veil-4)] px-2.5 py-1 rounded opacity-0 pointer-events-none transition-all group-hover:opacity-100 group-hover:translate-x-0">
              {label}
            </span>
          </li>
        ))}
        <li className="relative flex items-center group">
          <ThemeToggle />
          <span className="hidden md:block absolute right-[46px] top-1/2 -translate-y-1/2 translate-x-1.5 whitespace-nowrap font-mono text-[0.68rem] tracking-[0.1em] uppercase text-[var(--brand-text-dim)] bg-[var(--brand-bg-raised)] border border-[var(--veil-4)] px-2.5 py-1 rounded opacity-0 pointer-events-none transition-all group-hover:opacity-100 group-hover:translate-x-0">
            Theme
          </span>
        </li>
      </ul>
      <div className="hidden md:block w-px h-9 bg-[var(--brand-border-strong)] mt-1" />
    </aside>
  );
}
