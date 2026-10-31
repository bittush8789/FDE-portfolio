import { Reveal } from "./reveal";

type Status = "live" | "progress" | "planned";

type Project = {
  status: Status;
  statusLabel: string;
  name: string;
  description: string;
  points?: string[];
  focus?: string;
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
    status: "live",
    statusLabel: "Live",
    name: "LLM Agents into E-Commerce Systems — FDE Role",
    description:
      "An established retailer runs a legacy e-commerce monolith where customers can't find products without endless filter clicking, and the system is too risky to rewrite from scratch. This engagement takes the enterprise codebase from discovery to a production AI shopping assistant:",
    points: [
      "Discovery: Mapped the client's existing FastAPI + MongoDB store — catalog, cart, checkout, accounts, admin — as the integration baseline (branch 01-store-only).",
      "Standalone POC: Proved the AI idea in isolation — a Pydantic AI chatbot answering natural-language queries like \"men's shirts under ₹2000\" with real catalog fetches, wrapped in safety guardrails (branch 02-chatbot-poc).",
      "Production Integration: Merged the POC into the monolith as one unified FastAPI app — AI assistant surfaced on every page, no rewrite.",
      "Safety Guardrails: Input/output guardrails block prompt-injection and unsafe content before the agent ever touches the product database.",
      "Evals & Observability: Pydantic Evals evaluate every real chat live plus an offline suite; Logfire traces the full assistant pipeline.",
      "Enterprise Delivery: Single container deployed on Google Cloud Run via Google Cloud Build — automated CI/CD with the full FDE story documented in docs/STORY.md.",
    ],
    focus: "FDE Focus — Client Discovery · POC De-Risking · Production Integration · Safety Guardrails · Evals & Observability · Cloud Deployment",
    tech: ["FastAPI", "Pydantic AI", "Groq", "HTML5", "CSS3", "JavaScript", "Python", "MongoDB Atlas", "GPT-OSS 20B", "Llama Prompt Guard 2", "Docker", "Google Cloud Run", "Google Cloud Build", "Artifact Registry"],
    view: { label: "View on GitHub →", href: "https://github.com/bittush8789/ecom-store-gcp" },
  },
  {
    status: "live",
    statusLabel: "Live",
    name: "ReturnGuard — AI Ecommerce Refund Solution with Governed AI Agents",
    description:
      "Retail businesses struggle with manual return processing, refund fraud, product image verification, and customers with suspicious return histories — raising operational costs, delaying refund decisions, and hurting customer experience. ReturnGuard automates return processing, refund validation, and fraud detection with a governed, human-in-the-loop agent pipeline:",
    points: [
      "Image Classification: Verify returned products and identify product mismatches using deep learning.",
      "Customer Behavior Analysis: Analyze historical return patterns and transaction behavior to identify suspicious customers.",
      "Intelligent Fraud Detection: Assess fraud risks and flag potentially fraudulent refund requests.",
      "Automated Decision-Making: Coordinate AI agents to validate return requests and recommend refund decisions.",
      "Policy Validation: Ensure every return request follows business rules and return policies.",
      "Human-in-the-Loop: Route high-risk cases for manual review and approval.",
    ],
    focus: "FDE Focus — Business Problem Discovery · Solution Design · AI Solution Engineering · Enterprise Workflow Automation · System Integration · End-to-End Solution Delivery",
    tech: ["FastAPI", "LangChain", "Groq", "Python", "Hugging Face", "Scikit-learn", "Docker", "Redis", "WebSocket", "SQL", "Qdrant", "Keycloak", "Langfuse", "Prometheus", "Grafana"],
    view: { label: "View on GitHub →", href: "https://github.com/bittush8789/Retail-FDE-Project" },
  },
  {
    status: "live",
    statusLabel: "Live",
    name: "MedGuide AI — Enterprise Agentic Medical Assistant",
    description:
      "Hospitals face a widening gap: patients arrive with clinical questions long before and between doctor visits, general-purpose chatbots answer them unreliably — with hallucination, wrong-dosage, and drug-interaction risk — and regulated patient data cannot safely reach third-party models or go clinically unreviewed. MedGuide AI is an enterprise-grade clinical AI platform on a LangGraph state machine that makes every answer safe, grounded, and clinically supervised:",
    points: [
      "Grounded Hybrid RAG: Pinecone dense + BM25 sparse retrieval with Reciprocal Rank Fusion and Cohere cross-encoder reranking over the Gale Encyclopedia of Medicine — answers stay anchored to trusted clinical text, not model guesses.",
      "Deterministic Guardrails (NVIDIA NeMo): emergency symptoms trigger immediate 911 escalation, prescription-dosage interception, and prompt-injection defense.",
      "HIPAA PII Protection (Microsoft Presidio): all 18 Safe Harbor identifiers are de-identified before any outbound model call.",
      "Human-in-the-Loop Doctor Review: high-risk dosage and drug-interaction questions route to an authenticated doctor review queue — no clinical answer ships without oversight.",
      "MCP Clinical Tools + LangMem Memory: BMI, kidney staging (GFR), polypharmacy interaction checks, and cross-session patient memory via LangGraph, MCP, and LangMem.",
      "Enterprise Delivery: Keycloak OAuth2/RBAC (Patient/Nurse/Clinician/Admin), LiteLLM multi-model gateway with circuit-breaker fallback, OpenTelemetry + Prometheus/Grafana + Langfuse observability — deployed on AWS EKS via Terraform IaC with automated DevSecOps CI/CD.",
    ],
    focus: "FDE Focus — Clinical Problem Discovery · Solution Design · AI Solution Engineering · Regulatory Compliance · Human-in-the-Loop Supervision · Enterprise Delivery",
    tech: ["LangGraph", "Pinecone + BM25", "Cohere Rerank", "NeMo Guardrails", "Presidio", "MCP", "Python", "FastAPI", "LangChain", "LiteLLM", "PostgreSQL", "Redis", "Keycloak", "Langfuse", "Ragas", "DeepEval", "OpenTelemetry", "Prometheus", "Grafana", "Docker", "Kubernetes", "AWS EKS", "ECR", "S3", "Terraform", "Helm", "GitHub Actions"],
    view: { label: "View on GitHub →", href: "https://github.com/bittush8789/Medical-Agentic-Platform" },
  },
  {
    status: "live",
    statusLabel: "Live",
    name: "Enterprise IT-Support Agentic RAG Copilot — Evaluation Harness",
    description:
      "Enterprise IT support teams drown in repetitive tickets, while generic LLM demos hallucinate — no routing logic, no evidence grading, no evaluation story. Turning an Agentic RAG prototype into a shippable product is where most AI projects fail. This FDE copilot productizes the workflow:",
    points: [
      "Intelligent Query Routing: A LangGraph state machine classifies and routes every request, scoring 100% routing accuracy on a 9-scenario benchmark.",
      "Self-Reflective RAG: Evidence grading over Pinecone Serverless with Tavily web fallback when internal docs come back weak, plus loop-guarded query rewriting.",
      "Enterprise Product Package: Full PRD/TRD/SRD specs plus an admin drag-and-drop document ingestion UI for non-technical ops teams.",
      "Auditability: SQLite audit logging of every workflow decision — every answer is traceable back to its evidence.",
      "Evaluation Harness: 38 passing tests plus a benchmark CLI measuring routing accuracy, retrieval quality, and answer faithfulness.",
      "Delivery: Production FastAPI service on Groq gpt-oss-120b, benchmarked and documented for enterprise rollout.",
    ],
    focus: "FDE Focus — Problem Discovery · Product Spec (PRD/TRD/SRD) · Agentic RAG Engineering · Evaluation Benchmarking · Enterprise Documentation",
    tech: ["LangGraph", "FastAPI", "Pinecone", "Python", "OpenAI", "Tavily", "RAGAS", "DeepEval", "Claude", "HTML5", "CSS3", "JavaScript"],
    view: { label: "View on GitHub →", href: "https://github.com/bittush8789/Enterprise-IT-Support-Agentic-RAG-Evaluation-Harness" },
  },
  {
    status: "live",
    statusLabel: "Live",
    name: "GitHub PR-Review Agent with Guardrails",
    description:
      "AI code reviewers flood pull requests with noise — comments on unchanged lines, duplicate findings, and prompt-injection payloads hidden inside PR diffs make automated review untrustworthy for real security work. This agent pairs deterministic scanners with Google Gemini under strict guardrails:",
    points: [
      "Deterministic Secret Scanner: Flags AWS keys, GitHub/Slack tokens, private keys, and high-entropy passwords before any AI model is called.",
      "Terraform & Supply-Chain Scanning: Catches dangerous IaC (0.0.0.0/0 ingress, public S3 buckets, disabled encryption) and known CVEs plus unpinned dependencies in requirements.txt and package.json.",
      "Gemini Structured Analysis: Schema-validated JSON findings on logic, bugs, and edge cases — no freeform noise.",
      "Anti-Noise Guardrails: Comments only on changed lines, capped at 5 per PR, deduplicated across AI and rule-based findings.",
      "Prompt-Injection Defense: Untrusted PR diffs isolated in unforgeable delimiters; stale-PR protection aborts if new commits land mid-review.",
      "Least-Privilege + 1-Click Fixes: The agent can never merge, approve, or push — and posts native GitHub suggestion blocks developers commit in one click. Ships with a GitHub Actions workflow that reviews every PR.",
    ],
    focus: "FDE Focus — Threat Modeling · Guardrail Design · Secure Agent Architecture · CI/CD Integration · Developer Experience",
    tech: ["LangGraph", "FastAPI", "Pinecone", "Python", "OpenAI", "Tavily", "RAGAS", "DeepEval", "Claude", "HTML5", "CSS3", "JavaScript"],
    view: { label: "View on GitHub →", href: "https://github.com/bittush8789/pr-review-agent-guardrails" },
  },
  {
    status: "live",
    statusLabel: "Live",
    name: "Enterprise IT-Support Agentic RAG Copilot — AI Observability",
    description:
      "Shipping an Agentic RAG copilot is only half the job — without tracing, teams can't see which step failed, what each reply cost, or why latency spiked, so AI systems drift in production with zero visibility. This hardens the IT-support copilot into LLMOps territory:",
    points: [
      "Full LLM Traceability: Langfuse traces every LLM call — token counts, step-by-step waterfall latency, and exact inputs/outputs.",
      "Cost Tracking: Exact model spend per request surfaced in the UI via a real-time observability status endpoint.",
      "Prometheus & Grafana: System metrics and dashboards added to the monitoring stack alongside Langfuse tracing.",
      "Decision Visibility: Every routing, retrieval-grading, and rewrite decision is traceable to pinpoint exactly which step failed.",
      "Same FDE Product Package: 43 passing tests, benchmark CLI scoring 100% routing accuracy, PRD/TRD/SRD specs, and admin ingestion.",
      "Enterprise Readiness: An observability-first design that turns a demo into an operationally owned production system.",
    ],
    focus: "FDE Focus — LLMOps · Observability Engineering · Cost Governance · Production Reliability · Operations Handoff",
    tech: ["LangGraph", "Langfuse", "Prometheus", "Groq", "Python", "FastAPI", "LangChain", "Pinecone", "HuggingFace Embeddings", "Tavily", "Grafana", "Docker", "Docker Compose", "SQLite", "HTML5", "CSS3", "JavaScript", "Pytest"],
    view: { label: "View on GitHub →", href: "https://github.com/bittush8789/Enterprise-IT-Support-AI-Observability" },
  },
  {
    status: "live",
    statusLabel: "Live",
    name: "AI Code Reviewer — GitHub App on AWS EKS",
    description:
      "This project is an intelligent, event-driven GitHub Pull Request review system designed to automatically trigger on PR events using GitHub Webhooks. It processes code diffs through a multi-agent AI pipeline built with LangGraph and powered by OpenAI GPT-4o-mini. The system runs four parallel review agents — Static Analysis, Security (aligned with OWASP Top 10), Architecture, and Code Style — which collaboratively analyze the code and merge their findings into structured, actionable feedback. The backend architecture leverages FastAPI-based microservices, with Celery and Redis handling asynchronous task queuing, while PostgreSQL (using asyncpg and SQLAlchemy) manages data persistence. Additionally, a self-improving Learner service continuously refines style patterns based on merged pull requests, enabling personalized and evolving code reviews over time. For observability, the system integrates Prometheus and Grafana for metrics monitoring, along with Langfuse for detailed LLM tracing and performance insights.",
    points: [
      "Event-Driven Gateway: HMAC-verified GitHub App webhooks queue PRs in Celery/Redis for reliable, async review under load.",
      "Four Parallel AI Agents: A LangGraph orchestrator runs static analysis, security (OWASP Top 10 + hardcoded secrets), style, and architecture reviews in parallel.",
      "Inline Review Delivery: Findings post as inline PR comments while a learner service captures patterns from every merge.",
      "Five Microservices on AWS: EKS pods, RDS PostgreSQL, ElastiCache Redis, ECR, and S3 — all provisioned by Terraform IaC.",
      "Automated Pipelines: Per-service GitHub Actions pipelines (test → build → deploy) plus Prometheus/Grafana dashboards and Langfuse tracing.",
      "Continuous Quality Gate: A weekly RAGAS evaluation enforces faithfulness ≥ 0.7 so review quality never silently degrades.",
    ],
    focus: "FDE Focus — Product Discovery · Multi-Agent Architecture · Kubernetes Delivery · DevSecOps CI/CD · Evaluation Loops",
    tech: ["Kubernetes", "GitHub", "FastAPI", "AWS", "Terraform", "GitHub Actions", "SQL", "Celery", "Redis", "Grafana", "Langfuse"],
    view: { label: "View on GitHub →", href: "https://github.com/bittush8789/GitHub-PR-CodeAI-Reviewer" },
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, idx) => {
            const s = STATUS_STYLES[project.status];
            return (
              <Reveal
                key={project.name}
                className={PROJECTS.length % 2 === 1 && idx === PROJECTS.length - 1 ? "md:col-span-2" : ""}
              >
                <div className="group h-full flex flex-col bg-[var(--brand-bg-raised)] border border-[var(--veil-4)] rounded-xl p-5 sm:p-7 max-md:p-5 transition-all duration-250 hover:-translate-y-1.5 hover:border-[var(--brand-accent-dim)] hover:bg-[var(--brand-bg-raised-2)] hover:shadow-[0_0_0_1px_var(--brand-accent-dim),0_24px_48px_-24px_rgba(232,98,42,0.35),0_0_32px_-8px_rgba(232,98,42,0.18)]">
                  <span
                    className={`inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.08em] uppercase mb-4 ${s.text}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full flex-none ${s.dot} ${s.shadow} ${s.pulse ? "animate-pulse-dot" : ""}`} />
                    {project.statusLabel}
                  </span>
                  <h3 className="text-[1.12rem] sm:text-[1.18rem] font-bold tracking-[-0.01em] mb-2.5">{project.name}</h3>
                  <p className="text-[var(--brand-text-dim)] text-[0.86rem] sm:text-[0.88rem] leading-[1.55] mb-4 transition-colors group-hover:text-[#a8a6a1]">
                    {project.description}
                  </p>
                  {project.points && project.points.length > 0 && (
                    <ul className="space-y-[0.4rem] text-[0.8rem] sm:text-[0.82rem] leading-[1.5] text-[var(--brand-text-dim)] mb-4">
                      {project.points.map((point) => {
                        const colon = point.indexOf(": ");
                        const hasLabel = colon > 0 && colon < 40;
                        return (
                          <li key={point} className="flex gap-2">
                            <span className="font-mono text-primary text-[0.65rem] leading-[1.5] mt-[2px] flex-none">
                              ▸
                            </span>
                            <span>
                              {hasLabel ? (
                                <>
                                  <span className="text-foreground">{point.slice(0, colon)}</span>
                                  {point.slice(colon)}
                                </>
                              ) : (
                                point
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {project.focus && (
                    <p className="font-mono text-[0.68rem] leading-[1.6] mb-5">
                      {project.focus.startsWith("FDE Focus") ? (
                        <>
                          <span className="text-primary">FDE Focus</span>
                          <span className="text-[var(--brand-text-dim)]">{project.focus.slice("FDE Focus".length)}</span>
                        </>
                      ) : (
                        <span className="text-[var(--brand-text-dim)]">{project.focus}</span>
                      )}
                    </p>
                  )}
                  <div className="mt-auto flex flex-wrap gap-1.5 font-mono text-[0.72rem] mb-4">
                    {project.tech.map((t, i) => (
                      <span
                        key={t}
                        className={`inline-flex items-center px-2.5 py-1 rounded-md border whitespace-nowrap transition-all duration-150 hover:-translate-y-0.5 ${
                          i < 3
                            ? "text-primary bg-[var(--brand-accent-soft)] border-[var(--brand-accent-dim)]"
                            : "text-[var(--brand-text-dim)] bg-[var(--veil-2)] border-[var(--veil-4)] hover:border-[var(--brand-border-strong)] hover:text-foreground"
                        }`}
                      >
                        {t}
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
