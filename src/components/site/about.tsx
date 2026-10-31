import { Reveal } from "./reveal";

const PHOTO = "/bittu.jpg";

const FACTS = [
  {
    num: "01",
    title: "Understanding Business Needs",
    desc: "Identifying real-world business challenges and translating them into clear solution requirements.",
  },
  {
    num: "02",
    title: "End-to-End Solution Ownership",
    desc: "Taking ownership of projects from initial discovery and planning through implementation and delivery.",
  },
  {
    num: "03",
    title: "Driving Business Impact",
    desc: "Building solutions that improve operational efficiency, streamline workflows, and solve business challenges.",
  },
  {
    num: "04",
    title: "Business & Engineering Collaboration",
    desc: "Bridging the gap between business stakeholders and engineering teams to deliver meaningful outcomes.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 max-md:py-16">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="font-mono text-[0.78rem] tracking-[0.14em] uppercase text-primary flex items-center gap-2.5 mb-[18px]">
          <span className="w-[7px] h-[7px] rounded-full bg-primary shadow-[0_0_0_4px_var(--brand-accent-soft)]" />
          About
        </div>
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          <Reveal className="space-y-5">
            {/* Profile photo — local copy so it is cached with the rest of the assets */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTO}
              alt="Bittu Sharma"
              className="w-32 h-32 rounded-full object-cover border border-[var(--veil-4)] bg-[var(--brand-bg-raised)] mx-auto md:mx-0"
            />
            <p className="text-[clamp(1.1rem,2.8vw,1.35rem)] leading-[1.55] font-medium text-foreground">
              I&apos;m a <span className="text-primary">DevOps Engineer</span> with professional experience at{" "}
              <strong className="text-foreground font-semibold">EXL Service</strong> and hands-on experience in{" "}
              <span className="text-primary">Forward Deployed Engineering</span> through end-to-end AI projects.
            </p>
            <p className="text-[var(--brand-text-dim)] text-[0.96rem] sm:text-[1rem] leading-[1.65]">
              I work at the intersection of business and technology, translating complex business requirements into
              practical AI solutions. My focus includes{" "}
              <span className="text-foreground font-medium">Agentic AI</span>,{" "}
              <span className="text-foreground font-medium">RAG</span>, enterprise integrations,{" "}
              <span className="text-foreground font-medium">AWS</span>,{" "}
              <span className="text-foreground font-medium">Kubernetes</span>, and AI observability, from solution design to deployment.
            </p>
            <Reveal>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 self-start font-mono text-[0.76rem] tracking-[0.1em] uppercase text-[var(--brand-text-dim)] border border-[var(--veil-4)] rounded-lg px-4 py-2.5 transition-colors hover:text-primary hover:border-[var(--brand-accent-dim)]"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Download Résumé
              </a>
            </Reveal>
          </Reveal>
          <Reveal className="flex flex-col gap-5 max-md:gap-4">
            {FACTS.map((fact, i) => (
              <div
                key={fact.num}
                className={`flex gap-3 sm:gap-4 pb-[18px] ${
                  i !== FACTS.length - 1 ? "border-b border-[var(--veil-4)]" : ""
                }`}
              >
                <span className="font-mono text-primary text-[0.85rem] flex-none w-[26px] pt-0.5">
                  {fact.num}
                </span>
                <div className="flex flex-col gap-1">
                  <strong className="text-foreground font-semibold text-[0.95rem] sm:text-[0.98rem]">
                    {fact.title}
                  </strong>
                  <span className="text-[var(--brand-text-dim)] text-[0.9rem] sm:text-[0.92rem] leading-[1.55]">
                    {fact.desc}
                  </span>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
