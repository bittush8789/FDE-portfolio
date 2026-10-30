"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./icons";

const THEME_KEY = "theme";

export function ThemeToggle({ className }: { className?: string }) {
  // Starts false to match the server-rendered markup; the theme-init script
  // (beforeInteractive, in layout.tsx) has already set the real class on
  // <html> by the time this mounts, so this effect only ever reads that
  // resolved DOM state once — it doesn't derive-and-exit synchronously.
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      window.localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      // best-effort
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={
        className ??
        "flex items-center justify-center w-9 h-9 max-md:w-8 max-md:h-8 rounded-full border border-[var(--veil-4)] bg-[var(--brand-bg-raised)] text-[var(--brand-text-dim)] transition-all hover:text-primary hover:border-[var(--brand-accent-dim)] hover:-translate-y-0.5"
      }
    >
      {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
    </button>
  );
}
