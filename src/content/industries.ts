import type { Industry } from "@/lib/types";

export const industries: Industry[] = [
  {
    slug: "financial-services",
    title: "Financial Services",
    tagline: "Regulated speed",
    summary:
      "Low-latency, evidence-rich infrastructure for banks, insurers, and market infrastructure operating under DORA and MAS obligations.",
    pressures: [
      "Operational resilience mandates with hard recovery objectives",
      "Model risk management applied to AI in production",
      "Strict data residency and cross-border transfer rules",
      "Latency budgets measured in single-digit milliseconds",
    ],
    approach: [
      "Region-pinned processing with contractual residency guarantees.",
      "Immutable model lineage and decision logs for risk review.",
      "Zero-trust access tied to trader, desk, and entitlement context.",
      "Resilience testing embedded in the platform, not bolted on.",
    ],
    outcomes: [
      { value: "3.8ms", label: "p99 decision path" },
      { value: "−62%", label: "Audit cycle effort" },
      { value: "100%", label: "In-region processing" },
    ],
    detail: [
      {
        kind: "p",
        text: "Financial institutions are asked to move at fintech speed while meeting some of the strictest operational and model-risk standards in any sector. Apex Horizon is designed for that tension.",
      },
      { kind: "h2", text: "Model risk, meet production" },
      {
        kind: "p",
        text: "Every model that reaches production carries its lineage, evaluation history, and approval chain. Risk teams review a live system of record rather than a static dossier.",
      },
      {
        kind: "list",
        items: [
          "Approval workflows mapped to your three-lines-of-defence model.",
          "Segregated environments for research, staging, and regulated production.",
          "Continuous control monitoring aligned to DORA and MAS TRM.",
        ],
      },
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    tagline: "Clinical intelligence, PHI-safe",
    summary:
      "Protected health data stays protected while clinicians gain AI-assisted insight at the point of care.",
    pressures: [
      "PHI handling under HIPAA and local health-privacy law",
      "Care-adjacent AI that must be explainable and reviewable",
      "Interoperability with entrenched clinical systems",
      "Availability expectations that mirror clinical operations",
    ],
    approach: [
      "De-identification and access controls enforced at the data layer.",
      "Retrieval grounded in curated clinical corpora with citations.",
      "FHIR-aligned integration without bulk data duplication.",
      "Auditable clinician-in-the-loop review paths.",
    ],
    outcomes: [
      { value: "0", label: "PHI used for training by default" },
      { value: "−34%", label: "Documentation time" },
      { value: "24/7", label: "Clinical-grade availability" },
    ],
    detail: [
      {
        kind: "p",
        text: "AI in healthcare only earns trust when privacy and explainability are structural. Apex Horizon keeps protected data inside the governed boundary and makes every recommendation reviewable.",
      },
      { kind: "h2", text: "Grounded, not generative guesswork" },
      {
        kind: "p",
        text: "Clinical assistance retrieves from approved sources and cites them. When evidence is thin, the system says so rather than inventing confidence.",
      },
      {
        kind: "list",
        items: [
          "Least-privilege access aligned to role and care team.",
          "Immutable audit trails for every data access.",
          "Configurable human-review gates before action.",
        ],
      },
    ],
  },
  {
    slug: "public-sector",
    title: "Public Sector",
    tagline: "Sovereign resilience",
    summary:
      "Citizen-grade reliability and data sovereignty for agencies and critical national infrastructure.",
    pressures: [
      "Sovereignty requirements that prohibit extraterritorial access",
      "Legacy estates with long modernisation horizons",
      "Heightened threat exposure and nation-state interest",
      "Procurement and assurance frameworks unique to government",
    ],
    approach: [
      "Sovereign regions with no foreign operational access.",
      "Hardened baselines mapped to government security frameworks.",
      "Incremental modernisation paths that respect legacy constraints.",
      "Transparent supply-chain and provenance reporting.",
    ],
    outcomes: [
      { value: "4", label: "Sovereign regions" },
      { value: "99.99%", label: "Availability commitment" },
      { value: "0", label: "Extraterritorial access" },
    ],
    detail: [
      {
        kind: "p",
        text: "Public-sector systems carry consequences measured in public trust. Apex Horizon provides the sovereignty, assurance, and resilience those systems demand.",
      },
      { kind: "h2", text: "Sovereignty you can demonstrate" },
      {
        kind: "p",
        text: "Data, keys, and operational access remain within the jurisdiction. Assurance artefacts are available to regulators and oversight bodies on demand.",
      },
      {
        kind: "list",
        items: [
          "Customer-managed keys with hardware-backed custody.",
          "Continuous compliance mapped to government frameworks.",
          "Resilience engineering with tested recovery objectives.",
        ],
      },
    ],
  },
];

export function getLocalIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
