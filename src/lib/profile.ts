export const SKILL_GROUPS = [
  {
    label: "FDE & SOLUTION CONSULTING",
    skills: [
      "Problem Discovery",
      "Requirements Analysis",
      "Solution Design",
      "Technical Consulting",
      "Stakeholder Collaboration",
      "Delivery",
    ],
  },
  {
    label: "AGENTIC AI & RAG",
    skills: [
      "Agentic AI",
      "Multi-Agent Systems",
      "RAG",
      "LangGraph",
      "LangChain",
      "LangSmith",
      "Langfuse",
      "MCP",
      "LangMem",
      "Pinecone",
      "Qdrant",
    ],
  },
  {
    label: "AI SECURITY",
    skills: [
      "LLM Security",
      "NeMo Guardrails",
      "DeepEvals",
      "RAGAS",
      "Agent Governance Toolkit",
      "Microsoft Presidio",
      "AI Governance",
    ],
  },
  {
    label: "ENTERPRISE AI & INTEGRATIONS",
    skills: [
      "LLM Integration",
      "LiteLLM",
      "Enterprise APIs",
      "Workflow Automation",
      "AI Evaluation",
      "AgentOps",
    ],
  },
  {
    label: "CLOUD & DEVOPS",
    skills: [
      "AWS",
      "Docker",
      "Kubernetes",
      "EKS",
      "Terraform",
      "CI/CD",
      "Argo CD",
      "Prometheus",
      "Grafana",
      "OpenTelemetry",
    ],
  },
  {
    label: "SOFTWARE ENGINEERING",
    skills: [
      "Python",
      "FastAPI",
      "REST APIs",
      "PostgreSQL",
      "Microservices",
      "Legacy Systems",
    ],
  },
];

/**
 * Flattened skill keywords used for job matching, including both full phrases
 * and parts split on separators (e.g. "CI/CD" or "FastAPI").
 */
export const PROFILE_SKILL_KEYWORDS = Array.from(
  new Set(
    SKILL_GROUPS.flatMap((group) => group.skills).flatMap((skill) => [
      skill,
      ...skill.split(/\s*[/&]\s*/).map((s) => s.trim()),
    ])
  )
);

export type MatchLabel = "Strong Match" | "Good Match" | "Explore";

export function scoreJobMatch(text: string): { label: MatchLabel; matchedSkills: string[] } {
  const haystack = text.toLowerCase();
  const matchedSkills = PROFILE_SKILL_KEYWORDS.filter((skill) =>
    haystack.includes(skill.toLowerCase())
  );
  const label: MatchLabel =
    matchedSkills.length >= 2 ? "Strong Match" : matchedSkills.length === 1 ? "Good Match" : "Explore";
  return { label, matchedSkills };
}
