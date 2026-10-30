import { Reveal } from "./reveal";

type Status = "live" | "progress" | "planned";

type Project = {
  status: Status;
  statusLabel: string;
  name: string;
  description: string;
  tech: string[];
  view: { label: string; href?: string };
};

const STATUS_STYLES: Record<Status, { text: string; dot: string; shadow: string; pulse: boolean }> = {
  live: {
    text: "text-[var(--brand-live)]",
    dot: "bg-[var(--brand-live)]",
    shadow: "shadow-[0_0_0_3px_var(--brand-live-soft)]",
    pulse: true,
  },
  progress: {
    text: "text-primary",
    dot: "bg-primary",
    shadow: "shadow-[0_0_0_3px_var(--brand-accent-soft)]",
    pulse: false,
  },
  planned: {
    text: "text-[var(--brand-text-dim)]",
    dot: "bg-[var(--brand-text-dim)]",
    shadow: "shadow-[0_0_0_3px_rgba(140,138,134,0.14)]",
    pulse: false,
  },
};

const PROJECTS: Project[] = [
  {
    status: "progress",
    statusLabel: "In Progress",
    name: "Stealth AI Startup",
    description:
      "Co-founder & CTO building a new AI product from the ground up — early days, more to share soon.",
    tech: ["Claude Code", "LangChain", "Python"],
    view: { label: "Coming soon" },
  },
  {
    status: "live",
    statusLabel: "Live",
    name: "Assess AI",
    description:
      "AI-powered assessment automation at Mindtickle — cut assessment creation time from hours to 5 minutes, adopted by CISCO and Henkel.",
    tech: ["Python", "Flask", "OpenAI APIs"],
    view: { label: "Internal product" },
  },
  {
    status: "live",
    statusLabel: "Live",
    name: "Tech Blog — bittublog.hashnode.dev",
    description: "Technical articles on Agentic AI, RAG architectures, AWS cloud, and DevOps practices.",
    tech: ["Technical Writing", "Agentic AI", "AWS & DevOps"],
    view: { label: "Read Blog →", href: "https://bittublog.hashnode.dev/" },
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 max-md:py-16">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="font-mono text-[0.78rem] tracking-[0.14em] uppercase text-primary flex items-center gap-2.5 mb-4">
          <span className="w-[7px] h-[7px] rounded-full bg-primary shadow-[0_0_0_4px_var(--brand-accent-soft)]" />
          Selected work
        </div>
        <div className="mb-10 max-md:mb-7">
          <Reveal>
            <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] font-bold tracking-[-0.01em] m-0">
              Featured projects
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, idx) => {
            const s = STATUS_STYLES[project.status];
            return (
              <Reveal key={project.name} className={idx === 2 ? "md:col-span-2 lg:col-span-1" : ""}>
                <div className="group h-full flex flex-col bg-[var(--brand-bg-raised)] border border-[var(--veil-4)] rounded-xl p-6 sm:p-8 max-md:p-6 transition-all duration-250 hover:-translate-y-1.5 hover:border-[var(--brand-accent-dim)] hover:bg-[var(--brand-bg-raised-2)] hover:shadow-[0_0_0_1px_var(--brand-accent-dim),0_24px_48px_-24px_rgba(232,98,42,0.35),0_0_32px_-8px_rgba(232,98,42,0.18)]">
                  <span
                    className={`inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.08em] uppercase mb-5 ${s.text}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full flex-none ${s.dot} ${s.shadow} ${s.pulse ? "animate-pulse-dot" : ""}`} />
                    {project.statusLabel}
                  </span>
                  <h3 className="text-[1.25rem] sm:text-[1.3rem] font-bold tracking-[-0.01em] mb-3">{project.name}</h3>
                  <p className="text-[var(--brand-text-dim)] text-[0.92rem] sm:text-[0.94rem] leading-[1.6] mb-5 flex-1 transition-colors group-hover:text-[#a8a6a1]">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-[0.74rem] text-[var(--brand-text-faint)] mb-6">
                    {project.tech.map((t, i) => (
                      <span key={t} className="flex items-center gap-1.5">
                        {i > 0 && <span className="text-[var(--brand-border-strong)]">·</span>}
                        <span className="whitespace-nowrap">{t}</span>
                      </span>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-[var(--veil-4)]">
                    {project.view.href ? (
                      <a
                        href={project.view.href}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-1.5 font-mono text-[0.8rem] text-primary hover:text-[#ff7238] transition-colors"
                      >
                        {project.view.label}
                      </a>
                    ) : (
                      <span className="font-mono text-[0.78rem] text-[var(--brand-text-faint)]">
                        {project.view.label}
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
