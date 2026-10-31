"use client";

import { Suspense, lazy, useState } from "react";
import { cn } from "@/lib/utils";

const Spline = lazy(() => import("@splinetool/react-spline"));

/**
 * The Spline runtime has no public playback-speed API — the robot's motion is
 * data driven, baked into the exported .splinecode:
 *
 * 1. "LookAt" tracking: every frame the head/upper body move only
 *    `1 / dampingFactor` of the way toward the cursor. The export ships with
 *    50 (upper body) and 10 (head), which reads as a slow, lagging follow.
 *    Lower value = snappier tracking.
 * 2. The intro (camera push-in, arm wave) is a set of state transitions whose
 *    duration/delay are stored on each tween runner. Shortening them right
 *    after the scene starts plays the intro at the same speed-up factor.
 */
const LOOK_AT_DAMPING: Record<string, number> = {
  "Top part": 12,
  Head: 3,
};
const TRANSITION_SPEED = 2;

type LookAtEvent = {
  object?: { name?: string };
  data?: { dampingFactor?: number };
  currentDampingFactor?: number;
};

type TweenRunner = { startTime?: number; delay?: number; duration?: number };

type StartEvent = {
  actions?: { Transition?: { tweens?: { runner?: TweenRunner }[] }[] };
};

type SplineAppInternals = {
  _eventManager?: {
    handlers?: {
      LookAt?: { events?: LookAtEvent[] };
      Start?: { eventsPerObject?: Map<unknown, StartEvent[]> };
    };
  };
};

/** Walks a private runtime object; every step is optional so a future runtime
 *  version just keeps Spline's default (slower) timing instead of throwing. */
function speedUpAnimation(app: unknown) {
  const handlers = (app as SplineAppInternals)._eventManager?.handlers;
  if (!handlers) return;

  for (const event of handlers.LookAt?.events ?? []) {
    const damping = LOOK_AT_DAMPING[event.object?.name ?? ""];
    if (damping === undefined || !event.data) continue;
    event.data.dampingFactor = damping;
    event.currentDampingFactor = damping;
  }

  const runners = new Set<TweenRunner>();
  for (const events of handlers.Start?.eventsPerObject?.values() ?? []) {
    for (const event of events ?? []) {
      for (const action of event.actions?.Transition ?? []) {
        for (const tween of action.tweens ?? []) {
          if (tween.runner) runners.add(tween.runner);
        }
      }
    }
  }

  // The same action can be registered twice, so scale each runner only once.
  for (const runner of runners) {
    if (typeof runner.duration !== "number" || typeof runner.delay !== "number") continue;
    runner.duration /= TRANSITION_SPEED;
    runner.delay /= TRANSITION_SPEED;
  }
}

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [ready, setReady] = useState(false);

  return (
    <div className={cn("relative", className)}>
      {/* Placeholder keeps the hero from looking empty while the runtime chunk
          downloads and the scene is parsed. Fades out once Spline is ready. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
          ready ? "opacity-0" : "opacity-100"
        )}
      >
        <span className="w-28 h-28 rounded-full bg-[var(--veil-3)] blur-2xl animate-pulse" />
      </div>

      <Suspense fallback={null}>
        <Spline
          scene={scene}
          onLoad={(app) => {
            speedUpAnimation(app);
            setReady(true);
          }}
          className={cn(
            "w-full h-full transition-opacity duration-700",
            ready ? "opacity-100" : "opacity-0"
          )}
        />
      </Suspense>
    </div>
  );
}
