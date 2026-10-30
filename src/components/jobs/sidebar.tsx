"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGrid, Search, Compass, Bookmark, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type PanelId = "overview" | "find" | "discover" | "saved";

const NAV_ITEMS: { id: PanelId; label: string; icon: typeof LayoutGrid }[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "find", label: "Find Jobs", icon: Search },
  { id: "discover", label: "Discover more jobs", icon: Compass },
  { id: "saved", label: "Saved Jobs", icon: Bookmark },
];

export function DashboardSidebar({
  active,
  onSelect,
  savedCount,
  mobileOpen,
  onMobileClose,
}: {
  active: PanelId;
  onSelect: (id: PanelId) => void;
  savedCount: number;
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <>
      {mobileOpen && (
        <div
          aria-hidden="true"
          onClick={onMobileClose}
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
        />
      )}

      <nav
        className={cn(
          "fixed md:sticky top-0 h-screen z-40 shrink-0 flex flex-col border-r border-[var(--veil-4)] bg-[var(--brand-bg-raised)] transition-transform duration-300 ease-in-out",
          "w-64",
          "md:transition-[width] md:duration-300 md:ease-in-out",
          open ? "md:w-60" : "md:w-[68px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="h-[72px] flex items-center px-4 border-b border-[var(--veil-4)]">
          <Link href="/" className="font-mono text-sm font-medium text-foreground whitespace-nowrap overflow-hidden">
            bittu<span className="text-primary">.</span>
            <span className={open ? "" : "md:hidden"}>sharma</span>
          </Link>
        </div>

        <div
          className={cn(
            "px-4 pt-4 pb-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase text-[var(--brand-text-faint)]",
            !open && "md:hidden"
          )}
        >
          Job Market
        </div>

        <div className="flex-1 flex flex-col gap-1 px-2 pt-2">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            const badge = id === "saved" && savedCount > 0 ? savedCount : null;
            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  onSelect(id);
                  onMobileClose();
                }}
                className={cn(
                  "relative flex h-11 items-center rounded-md transition-colors",
                  isActive
                    ? "bg-[var(--brand-accent-soft)] text-primary"
                    : "text-[var(--brand-text-dim)] hover:bg-[var(--veil-2)] hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2px] rounded-full bg-primary transition-opacity",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                />
                <span className="grid w-12 h-full place-content-center flex-none">
                  <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                </span>
                <span className={cn("font-mono text-[0.8rem] tracking-[0.02em] whitespace-nowrap", !open && "md:hidden")}>
                  {label}
                </span>
                {badge !== null && (
                  <span
                    className={cn(
                      "ml-auto mr-3 font-mono text-[0.68rem] rounded-full bg-primary text-primary-foreground w-5 h-5 grid place-content-center",
                      !open && "md:hidden"
                    )}
                  >
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="hidden md:flex h-12 items-center border-t border-[var(--veil-4)] text-[var(--brand-text-dim)] hover:bg-[var(--veil-2)] hover:text-foreground transition-colors"
        >
          <span className="grid w-12 h-full place-content-center flex-none">
            {open ? (
              <ChevronsLeft className="w-[18px] h-[18px]" strokeWidth={1.75} />
            ) : (
              <ChevronsRight className="w-[18px] h-[18px]" strokeWidth={1.75} />
            )}
          </span>
          {open && <span className="font-mono text-[0.76rem] tracking-[0.05em] uppercase">Collapse</span>}
        </button>
      </nav>
    </>
  );
}
