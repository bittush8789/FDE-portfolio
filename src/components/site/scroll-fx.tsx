"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ArrowUpIcon } from "./icons";

/**
 * Single scroll listener driving: nav fade-in, hero scroll-cue fade-out,
 * and the back-to-top button's visibility.
 */
export function ScrollFx() {
  const [cueHidden, setCueHidden] = useState(false);
  const [topVisible, setTopVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    function onScroll() {
      const y = window.scrollY;
      setCueHidden(y > 60);
      setTopVisible(y > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#about"
        aria-label="Scroll to About section"
        className={cn(
          "absolute left-1/2 bottom-8 max-md:bottom-5 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[0.66rem] tracking-[0.14em] uppercase text-[var(--brand-text-faint)] transition-opacity duration-400 hover:text-[var(--brand-text-dim)]",
          cueHidden ? "opacity-0 pointer-events-none" : "animate-fade-up"
        )}
        style={{ animationDelay: "1.3s" }}
      >
        <span>Scroll</span>
        <ChevronDownIcon className={cn("w-4 h-4", !reduceMotion && "animate-bounce-arrow")} />
      </a>

      <button
        aria-label="Back to top"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
        }
        className={cn(
          "fixed right-7 bottom-7 max-md:right-[18px] max-md:bottom-[18px] z-[180] w-[46px] h-[46px] max-md:w-[42px] max-md:h-[42px] rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_8px_24px_-8px_rgba(232,98,42,0.5)] transition-all duration-300 hover:bg-[#ff7238]",
          topVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        )}
      >
        <ArrowUpIcon className="w-5 h-5" />
      </button>
    </>
  );
}
