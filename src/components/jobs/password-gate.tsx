"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const UNLOCK_KEY = "portfolio:jobs-unlocked";
// Client-side gate only — good enough to keep this dashboard off casual
// visitors' radar, not a real auth boundary. Don't put anything sensitive here.
const PASSCODE = "0000";

export function PasswordGate({ children }: { children: (lock: () => void) => React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      setUnlocked(window.sessionStorage.getItem(UNLOCK_KEY) === "true");
    } finally {
      setChecked(true);
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value === PASSCODE) {
      try {
        window.sessionStorage.setItem(UNLOCK_KEY, "true");
      } catch {
        // best-effort
      }
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setValue("");
      inputRef.current?.focus();
    }
  }

  function handleLock() {
    try {
      window.sessionStorage.removeItem(UNLOCK_KEY);
    } catch {
      // best-effort
    }
    setUnlocked(false);
  }

  if (!checked) return null;

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="w-full max-w-[380px]">
          <div className="font-mono text-[0.85rem] text-[var(--brand-text-dim)] mb-6 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-live)] shadow-[0_0_0_4px_var(--brand-live-soft)] animate-pulse-dot" />
            bittu@ai:~/jobs$ authenticate
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              ref={inputRef}
              type="password"
              inputMode="numeric"
              autoFocus
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(false);
              }}
              placeholder="Enter passcode"
              className={cn(
                "bg-[var(--brand-bg-raised)] border rounded-md px-4 py-3.5 text-[0.95rem] tracking-[0.3em] text-center outline-none transition-colors",
                error
                  ? "border-[var(--destructive)]"
                  : "border-[var(--veil-4)] focus:border-[var(--brand-accent-dim)]"
              )}
            />
            {error && (
              <p className="font-mono text-[0.76rem] text-[var(--destructive)] text-center">
                Incorrect passcode — try again.
              </p>
            )}
            <button
              type="submit"
              className="font-mono text-[0.85rem] tracking-[0.05em] uppercase text-primary-foreground bg-primary px-6 py-3.5 rounded-md transition-opacity hover:opacity-90"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children(handleLock)}</>;
}
