import { Reveal } from "./reveal";
import { Award, ExternalLink } from "lucide-react";

// Add or remove credentials here — the section renders this array as-is.
type Certificate = {
  name: string;
  issuer: string;
  issued: string;
  credentialId?: string;
  href?: string;
};

const CERTIFICATES: Certificate[] = [
  {
    name: "AI Forward Deployed Engineer",
    issuer: "Escbash Labs",
    issued: "Sep 2026",
    credentialId: "ESC-FDE-23F7FB84FE",
    href: "https://www.escbash.com/certificates/ESC-FDE-23F7FB84FE",
  },
  {
    name: "Oracle Cloud Infrastructure 2025 Certified DevOps Professional",
    issuer: "Oracle",
    issued: "Sep 2025",
    credentialId: "34AC35A9AEA21083794F856492091CE23B71B82C30060C6E29685DD4C9E591AD",
    href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=34AC35A9AEA21083794F856492091CE23B71B82C30060C6E29685DD4C9E591AD",
  },
  {
    name: "Forward Deployed AI Engineer",
    issuer: "Udemy",
    issued: "Aug 2026",
    credentialId: "UC-c61dffc5-5fb0-46aa-8189-60c9e28c536e",
    href: "https://www.udemy.com/certificate/UC-c61dffc5-5fb0-46aa-8189-60c9e28c536e/",
  },
  {
    name: "RAG (Retrieval-Augmented Generation)",
    issuer: "Escbash Labs",
    issued: "Sep 2026",
    credentialId: "ESC-RAG-D5AF2988E8",
    href: "https://www.escbash.com/certificates/ESC-RAG-D5AF2988E8",
  },
  {
    name: "Claude Code Fundamentals",
    issuer: "Escbash Labs",
    issued: "Sep 2026",
    credentialId: "ESC-CCF-9C3B4E0DD6",
    href: "https://www.escbash.com/certificates/ESC-CCF-9C3B4E0DD6",
  },
  {
    name: "AI Fundamentals",
    issuer: "Escbash Labs",
    issued: "Sep 2026",
    credentialId: "ESC-AI-D144AF3412",
    href: "https://www.escbash.com/certificates/ESC-AI-D144AF3412",
  },
  {
    name: "Scientific Computing with Python",
    issuer: "freeCodeCamp",
    issued: "Oct 2023",
    href: "https://www.freecodecamp.org/certification/bittush8789/scientific-computing-with-python-v7",
  },
  {
    name: "Docker — Level 1 (Gold)",
    issuer: "KodeKloud",
    issued: "Jan 2026",
    credentialId: "72aaa4dd-7c9c-47a4-903d-7eab4e4b76bd",
    href: "https://engineer.kodekloud.com/certificate-verification/72aaa4dd-7c9c-47a4-903d-7eab4e4b76bd",
  },
  {
    name: "Introduction to Kubernetes (LFS158)",
    issuer: "The Linux Foundation",
    issued: "Jan 2026",
    credentialId: "e2f258f4-aa57-48f6-924c-4d8aa0283ee3",
    href: "https://www.credly.com/badges/e2f258f4-aa57-48f6-924c-4d8aa0283ee3/linked_in_profile",
  },
  {
    name: "Introduction to AI/ML Toolkits with Kubeflow (LFS147)",
    issuer: "The Linux Foundation",
    issued: "Jan 2026",
    credentialId: "ff921ead-00e2-46c5-a45d-e733b4a08138",
    href: "https://www.credly.com/badges/ff921ead-00e2-46c5-a45d-e733b4a08138/linked_in_profile",
  },
  {
    name: "Introduction to GitOps (LFS169)",
    issuer: "The Linux Foundation",
    issued: "Jan 2026",
    credentialId: "52c7256d-e681-4f8e-b167-f489605ea6a9",
    href: "https://www.credly.com/badges/52c7256d-e681-4f8e-b167-f489605ea6a9/linked_in_profile",
  },
];

export function Certificates() {
  return (
    <section id="certificates" className="py-24 max-md:py-16">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="font-mono text-[0.78rem] tracking-[0.14em] uppercase text-primary flex items-center gap-2.5 mb-4">
          <span className="w-[7px] h-[7px] rounded-full bg-primary shadow-[0_0_0_4px_var(--brand-accent-soft)]" />
          Credentials
        </div>

        <div className="mb-10 max-md:mb-7 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <Reveal>
            <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] font-bold tracking-[-0.01em] m-0">
              Certificates
            </h2>
          </Reveal>
          <span className="font-mono text-[0.8rem] text-[var(--brand-text-dim)]">
            Verified learning &amp; certifications
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATES.map((cert, idx) => (
            <Reveal key={cert.name}>
              <div className="group h-full flex flex-col bg-[var(--brand-bg-raised)] border border-[var(--veil-4)] rounded-xl p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--brand-accent-dim)] hover:bg-[var(--brand-bg-raised-2)] hover:shadow-[0_12px_32px_-16px_rgba(232,98,42,0.28)]">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[var(--brand-accent-soft)] text-primary flex items-center justify-center flex-none">
                    <Award className="w-4.5 h-4.5" strokeWidth={2} />
                  </div>
                  <span className="font-mono text-[0.72rem] text-[var(--brand-text-faint)]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-[1.02rem] sm:text-[1.08rem] font-semibold leading-[1.4] tracking-[-0.01em] mb-2">
                  {cert.name}
                </h3>

                <p className="font-mono text-[0.78rem] text-primary mb-1">{cert.issuer}</p>
                <p className="font-mono text-[0.74rem] text-[var(--brand-text-dim)]">
                  Issued {cert.issued}
                </p>
                {cert.credentialId ? (
                  <p
                    className="font-mono text-[0.72rem] text-[var(--brand-text-faint)] truncate"
                    title={`Credential ID: ${cert.credentialId}`}
                  >
                    ID {cert.credentialId}
                  </p>
                ) : null}

                <div className="mt-auto pt-4 border-t border-[var(--veil-4)] flex items-center justify-between gap-3">
                  <span className="font-mono text-[0.72rem] tracking-[0.08em] uppercase text-[var(--brand-live)] inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-live)] shadow-[0_0_0_3px_var(--brand-live-soft)]" />
                    Certified
                  </span>
                  {cert.href ? (
                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1.5 font-mono text-[0.76rem] text-[var(--brand-text-dim)] hover:text-primary transition-colors"
                    >
                      Verify
                      <ExternalLink className="w-3 h-3" strokeWidth={2} />
                    </a>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
