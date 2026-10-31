"use client";

import { useEffect, useState } from "react";
import { ScrollFx } from "./scroll-fx";
import { SplineScene } from "@/components/ui/splite";

const TAGLINE = "I make AI work for you";
// Self-hosted so the 1.3 MB scene is served from our own origin with a long
// immutable cache header instead of waiting on prod.spline.design each reload.
const SPLINE_SCENE = "/scene/robot.splinecode";

export function Hero() {
  const [typed, setTyped] = useState("");
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    // Fully unmount the 3D scene below `lg` rather than just CSS-hiding it —
    // the Spline render loop keeps running against a zero-size canvas
    // otherwise, spamming WebGPU errors and burning GPU on mobile.
    const mql = window.matchMedia("(min-width: 1024px)");
    const update = () => setShowScene(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setTyped(TAGLINE);
      return;
    }

    let i = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const startTimeout = setTimeout(function type() {
      if (i <= TAGLINE.length) {
        setTyped(TAGLINE.slice(0, i));
        i++;
        timeoutId = setTimeout(type, 45);
      }
    }, 200);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-[72px] max-md:pt-[76px] max-md:min-h-[92vh] overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 60% 50% at 15% 15%, rgba(232,98,42,.10), transparent 60%), radial-gradient(ellipse 50% 40% at 85% 85%, rgba(232,98,42,.05), transparent 60%)",
      }}
    >
      {showScene && (
        <div
          aria-hidden="true"
          className="absolute top-[10%] bottom-[8%] right-[8%] w-[34vw] max-w-[520px] opacity-0 animate-fade-up [mask-image:linear-gradient(to_bottom,black_78%,transparent_100%)]"
          style={{ animationDelay: "0.4s" }}
        >
          <SplineScene scene={SPLINE_SCENE} className="w-full h-full" />
        </div>
      )}

        <div className="relative z-10 max-w-[1100px] mx-auto px-5 sm:px-8 w-full">
          <div
            className="font-mono text-[0.8rem] sm:text-[0.85rem] text-[var(--brand-text-dim)] tracking-wide mb-6 opacity-0 animate-fade-up leading-relaxed"
            style={{ animationDelay: "0.1s" }}
          >
            New Delhi, India — Forward Deployed Engineer · Agentic AI · AWS &amp; DevOps
          </div>

        <h1
          className="font-extrabold tracking-[-0.035em] leading-[0.94] mb-8 opacity-0 animate-fade-up text-[clamp(3.4rem,11.5vw,10.5rem)]"
          style={{ animationDelay: "0.25s" }}
        >
          Bittu
          <br />
          Sharma
          <span className="text-[var(--brand-text-faint)]">.</span>
        </h1>

        <div
          className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[clamp(0.85rem,2.4vw,1.2rem)] bg-[var(--brand-bg-raised)] border border-[var(--veil-4)] rounded-lg px-4 sm:px-5 py-3 sm:py-3.5 opacity-0 animate-fade-up max-w-full"
          style={{ animationDelay: "0.55s" }}
          aria-live="polite"
        >
          <span className="w-2 h-2 rounded-full flex-none bg-[var(--brand-live)] shadow-[0_0_0_4px_var(--brand-live-soft)] animate-pulse-dot" />
          <span className="text-primary whitespace-nowrap flex-none">bittu@ai:~$</span>
          <span className="whitespace-pre-wrap break-words flex-shrink min-w-0">{typed}</span>
          <span className="inline-block w-[9px] h-[1.1em] bg-primary ml-0.5 align-middle animate-blink flex-none" />
        </div>

        <p
          className="mt-7 text-[var(--brand-text-dim)] text-[0.96rem] sm:text-[1.05rem] max-w-[520px] max-md:max-w-full opacity-0 animate-fade-up leading-relaxed"
          style={{ animationDelay: "0.8s" }}
        >
          Ex-<strong className="text-foreground font-semibold">EXL Service</strong>, now
          building, integrating, and deploying end-to-end AI solutions to solve
          real-world business problems.
        </p>

        <div
          className="mt-10 flex flex-wrap items-center gap-x-3.5 gap-y-2 font-mono text-[0.74rem] sm:text-[0.78rem] text-[var(--brand-text-faint)] opacity-0 animate-fade-up"
          style={{ animationDelay: "1s" }}
        >
          <span className="whitespace-nowrap">AI Projects Built</span>
          <span className="opacity-60">·</span>
          <span className="whitespace-nowrap">Agentic AI &amp; RAG</span>
          <span className="opacity-60">·</span>
          <span className="whitespace-nowrap">Cloud-Native Deployments</span>
        </div>
      </div>

      <ScrollFx />
    </section>
  );
}
