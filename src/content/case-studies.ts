import type { CaseStudy } from "@/lib/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "meridian-bank",
    client: "Meridian Bank",
    sector: "Global banking",
    industrySlug: "financial-services",
    title: "Cutting model-review cycles from weeks to hours",
    summary:
      "A tier-one bank moved a dozen production models onto a governed inference fabric with full lineage and in-region processing.",
    year: "2025",
    services: ["enterprise-ai", "compliance-governance"],
    featured: true,
    challenge:
      "Model risk review had become the bottleneck. Every new model required a fresh, manual dossier, and cross-border data flows slowed approvals to a crawl. Data science teams were running parallel tooling outside the governed estate.",
    approach: [
      "Consolidated inference onto a single governed control plane across three regions.",
      "Wired model lineage and evaluation into the existing risk workflow.",
      "Enforced policy-based residency so data never left its jurisdiction.",
      "Introduced canary promotion with automatic rollback.",
    ],
    results: [
      { value: "−94%", label: "Model review cycle time" },
      { value: "12", label: "Models in governed production" },
      { value: "100%", label: "In-region data processing" },
      { value: "3", label: "Regions, one control plane" },
    ],
    quote: {
      text: "Risk, engineering, and the business finally review the same system of record. The conversation moved from evidence to outcomes.",
      author: "Chief Data Officer",
      role: "Meridian Bank",
    },
    detail: [
      {
        kind: "p",
        text: "Meridian needed to scale AI without weakening the controls that make a bank trustworthy. The constraint was never compute — it was the ability to prove that each model was safe, explainable, and properly governed.",
      },
      { kind: "h2", text: "From dossiers to a live system of record" },
      {
        kind: "p",
        text: "By making lineage, evaluation, and approval first-class platform data, the review process became continuous. Reviewers inspect the running system rather than reconstructing it after the fact.",
      },
    ],
  },
  {
    slug: "northwind-health",
    client: "Northwind Health",
    sector: "Hospital network",
    industrySlug: "healthcare",
    title: "Documentation time down a third, PHI never leaves the boundary",
    summary:
      "A twelve-hospital network deployed clinical assistance with retrieval grounded in approved sources and human review at every action.",
    year: "2025",
    services: ["enterprise-ai", "zero-trust-security"],
    featured: true,
    challenge:
      "Clinicians spent too much of every shift on documentation, while the network had to guarantee that protected health information never left its governed estate or trained third-party models.",
    approach: [
      "Deployed retrieval-augmented assistance over curated, approved clinical corpora.",
      "Enforced role- and care-team-scoped access at the data layer.",
      "Added human-review gates before any downstream action.",
      "Instrumented immutable audit trails for every access.",
    ],
    results: [
      { value: "−34%", label: "Documentation time" },
      { value: "0", label: "PHI used for training" },
      { value: "100%", label: "Actions human-reviewed" },
      { value: "12", label: "Hospitals live" },
    ],
    quote: {
      text: "Our clinicians trust it because it shows its sources and never acts alone. That is the whole design.",
      author: "Chief Medical Information Officer",
      role: "Northwind Health",
    },
    detail: [
      {
        kind: "p",
        text: "Trust in healthcare AI is earned through explainability and restraint. Northwind's deployment pairs useful automation with strict boundaries around what the system may do unattended.",
      },
      { kind: "h2", text: "Citations as a clinical safeguard" },
      {
        kind: "p",
        text: "Every suggestion is traceable to an approved source, and gaps in evidence are surfaced rather than filled. The result is assistance clinicians can reason about.",
      },
    ],
  },
  {
    slug: "civic-department",
    client: "National Digital Agency",
    sector: "Public sector",
    industrySlug: "public-sector",
    title: "Sovereign cloud for citizen services at national scale",
    summary:
      "A national agency consolidated fragmented systems onto sovereign regions with no extraterritorial access and continuous assurance.",
    year: "2024",
    services: ["cloud-platform", "compliance-governance"],
    featured: false,
    challenge:
      "Decades of fragmented systems created reliability risk, and sovereignty rules prohibited any foreign operational access. Assurance had to be demonstrable to oversight bodies on demand.",
    approach: [
      "Migrated priority services to sovereign regions with no foreign access.",
      "Hardened baselines mapped to national security frameworks.",
      "Automated continuous assurance and evidence collection.",
      "Established resilience engineering with tested recovery objectives.",
    ],
    results: [
      { value: "99.99%", label: "Availability" },
      { value: "0", label: "Extraterritorial access" },
      { value: "−58%", label: "Assurance preparation" },
      { value: "40+", label: "Services migrated" },
    ],
    quote: {
      text: "Assurance stopped being an annual event and became a property of the estate we can show at any time.",
      author: "Director of Technology Assurance",
      role: "National Digital Agency",
    },
    detail: [
      {
        kind: "p",
        text: "For public infrastructure, sovereignty and resilience are not features — they are the requirements. The agency now operates a modern estate that satisfies both without sacrificing reliability.",
      },
    ],
  },
];

export function getLocalCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
