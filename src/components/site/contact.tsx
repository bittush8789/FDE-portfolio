"use client";

import { useState } from "react";
import { Reveal } from "./reveal";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    e.currentTarget.reset();
  }

  return (
    <section id="contact" className="py-24 max-md:py-16">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="font-mono text-[0.78rem] tracking-[0.14em] uppercase text-primary flex items-center gap-2.5 mb-4">
          <span className="w-[7px] h-[7px] rounded-full bg-primary shadow-[0_0_0_4px_var(--brand-accent-soft)]" />
          Get in touch
        </div>
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16">
          <Reveal>
            <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] font-bold tracking-[-0.01em] m-0 mb-4">
              Let&apos;s work together
            </h2>
            <p className="text-[var(--brand-text-dim)] text-[0.95rem] max-w-[380px]">
              Open to AI consulting, speaking, and collaboration. Reach out directly or use the
              form.
            </p>
            <a
              href="mailto:bittush9534@gmail.com"
              className="inline-block mt-3 font-mono text-[0.92rem] sm:text-base text-primary border-b border-[var(--brand-accent-dim)] pb-0.5"
            >
              bittush9534@gmail.com
            </a>
          </Reveal>

          <Reveal>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block font-mono text-[0.72rem] tracking-[0.1em] uppercase text-[var(--brand-text-faint)] mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="w-full bg-transparent border-0 border-b border-[var(--veil-4)] text-foreground text-base py-2 px-0.5 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-[0.72rem] tracking-[0.1em] uppercase text-[var(--brand-text-faint)] mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full bg-transparent border-0 border-b border-[var(--veil-4)] text-foreground text-base py-2 px-0.5 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block font-mono text-[0.72rem] tracking-[0.1em] uppercase text-[var(--brand-text-faint)] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full bg-transparent border-0 border-b border-[var(--veil-4)] text-foreground text-base py-2 px-0.5 focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="self-start mt-2 bg-primary text-primary-foreground font-mono text-[0.82rem] sm:text-[0.85rem] tracking-[0.06em] uppercase font-medium px-6 sm:px-7 py-3 sm:py-3.5 rounded-md transition-all hover:bg-[#ff7238] hover:-translate-y-0.5 active:scale-95"
              >
                Send message
              </button>
              <div
                className={`font-mono text-[0.78rem] text-[var(--brand-live)] transition-opacity duration-300 ${
                  submitted ? "opacity-100 -mt-2" : "opacity-0 h-0"
                }`}
                aria-live="polite"
              >
                Thanks — I&apos;ll get back to you soon.
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
