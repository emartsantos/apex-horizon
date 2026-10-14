import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    slug: "enterprise-ai",
    title: "Enterprise AI",
    tagline: "Private model serving, measured in milliseconds",
    summary:
      "Run frontier and fine-tuned models inside your own trust boundary with deterministic latency, full lineage, and no data egress.",
    order: 1,
    capabilities: [
      {
        title: "Private model serving",
        detail:
          "Dedicated inference fabric with per-tenant isolation, GPU scheduling, and predictable p99 latency under sustained load.",
      },
      {
        title: "Retrieval with provenance",
        detail:
          "Grounded retrieval over governed corpora, where every answer carries a citable source and an auditable access trail.",
      },
      {
        title: "Evaluation & guardrails",
        detail:
          "Continuous evaluation suites, policy filters, and red-team harnesses that ship with each model release.",
      },
      {
        title: "Model lifecycle",
        detail:
          "Versioned promotion, canary rollouts, drift detection, and instant rollback across regions.",
      },
    ],
    outcomes: [
      { value: "11ms", label: "p50 inference overhead" },
      { value: "0", label: "Data leaving your boundary" },
      { value: "4×", label: "Faster time to production" },
    ],
    detail: [
      {
        kind: "p",
        text: "Most enterprise AI programmes stall at the same point: the model works in a notebook, then meets procurement, residency, and audit requirements. Apex Horizon closes that gap by treating inference as a first-class platform primitive rather than an integration project.",
      },
      { kind: "h2", text: "One control plane for every model" },
      {
        kind: "p",
        text: "Frontier APIs, open-weight models, and your own fine-tunes are governed through a single policy surface. Identity, data classification, and residency rules apply uniformly, so teams can move quickly without creating a shadow AI footprint.",
      },
      {
        kind: "list",
        items: [
          "Per-tenant isolation on dedicated capacity, with confidential-computing options.",
          "Token-level accounting and chargeback mapped to cost centres.",
          "Immutable prompt and response lineage for regulated review.",
        ],
      },
      {
        kind: "quote",
        text: "We stopped negotiating with our own infrastructure and started shipping. The audit trail was the unlock.",
        attribution: "VP Platform Engineering, global insurer",
      },
      { kind: "h2", text: "Performance without compromise" },
      {
        kind: "p",
        text: "Inference runs close to your data in our Singapore, Frankfurt, London, and US regions. Smart routing keeps requests on-region by default, and every hop is observable end to end.",
      },
    ],
  },
  {
    slug: "zero-trust-security",
    title: "Zero-Trust Security",
    tagline: "Assume breach, verify everything, prove it",
    summary:
      "Continuous identity, workload attestation, and least-privilege access enforced at the request layer — not just at the perimeter.",
    order: 2,
    capabilities: [
      {
        title: "Continuous verification",
        detail:
          "Every request is authorised against device posture, identity, and workload context — never a one-time perimeter check.",
      },
      {
        title: "Workload identity",
        detail:
          "Short-lived, cryptographically attested credentials for services, eliminating long-lived secrets.",
      },
      {
        title: "Microsegmentation",
        detail:
          "Policy-defined east-west segmentation that isolates workloads by default and shrinks blast radius.",
      },
      {
        title: "Detection & response",
        detail:
          "Behavioural baselines, anomaly detection, and automated containment wired into your existing SOC.",
      },
    ],
    outcomes: [
      { value: "98%", label: "Reduction in standing secrets" },
      { value: "<60s", label: "Mean time to contain" },
      { value: "24/7", label: "Global security operations" },
    ],
    detail: [
      {
        kind: "p",
        text: "Perimeter security assumes a boundary that no longer exists. Apex Horizon enforces trust decisions at the point of every request, using identity, device posture, and workload attestation together.",
      },
      { kind: "h2", text: "Secrets that expire before they matter" },
      {
        kind: "p",
        text: "Static credentials are replaced with short-lived tokens bound to attested workloads. Rotate, revoke, and reason about access without a change-management queue.",
      },
      {
        kind: "list",
        items: [
          "Policy-as-code reviewed through the same pull-request workflow as your application.",
          "Step-up authentication for sensitive data paths.",
          "Immutable decision logs exported to your SIEM.",
        ],
      },
      { kind: "h2", text: "Built to be evidenced" },
      {
        kind: "p",
        text: "Every control emits machine-readable evidence. Map it once to SOC 2, ISO 27001, and DORA obligations and reuse it across audit cycles.",
      },
    ],
  },
  {
    slug: "compliance-governance",
    title: "Compliance & Governance",
    tagline: "Controls that produce evidence, not paperwork",
    summary:
      "Continuous compliance across frameworks, with policy mapped once and evidence generated automatically for auditors and regulators.",
    order: 3,
    capabilities: [
      {
        title: "Unified control mapping",
        detail:
          "Map a single control to SOC 2, ISO 27001, GDPR, HIPAA, and DORA simultaneously and track coverage in one view.",
      },
      {
        title: "Automated evidence",
        detail:
          "Continuous collection of configuration, access, and change evidence with tamper-evident storage.",
      },
      {
        title: "Data residency & sovereignty",
        detail:
          "Region-pinned processing and storage with contractual and technical guarantees.",
      },
      {
        title: "Audit workspace",
        detail:
          "Scoped, time-boxed auditor access with full activity logging and no lateral visibility.",
      },
    ],
    outcomes: [
      { value: "70%", label: "Less audit preparation" },
      { value: "1", label: "Control set, many frameworks" },
      { value: "365d", label: "Continuous, not annual" },
    ],
    detail: [
      {
        kind: "p",
        text: "Compliance fails when it is a scramble before an audit. Apex Horizon turns it into a continuous, observable property of the platform, so evidence exists the moment it is requested.",
      },
      { kind: "h2", text: "Map once, satisfy many" },
      {
        kind: "p",
        text: "A shared control library expresses each safeguard against the frameworks that reference it. When regulation changes, you update the mapping — not every runbook.",
      },
      {
        kind: "list",
        items: [
          "Framework coverage dashboards for security and compliance teams.",
          "Retention and deletion policies enforced at the storage layer.",
          "Regulator-ready reporting with consistent data lineage.",
        ],
      },
    ],
  },
  {
    slug: "cloud-platform",
    title: "Cloud Platform",
    tagline: "Sovereign, high-performance compute",
    summary:
      "A resilient, region-aware foundation for regulated workloads — elastic where you want it, isolated where it matters.",
    order: 4,
    capabilities: [
      {
        title: "Elastic compute",
        detail:
          "Autoscaling CPU, GPU, and memory-optimised capacity with committed floor and burst ceiling controls.",
      },
      {
        title: "Global delivery",
        detail:
          "Anycast edge, private interconnect, and on-region processing for latency-sensitive and regulated data.",
      },
      {
        title: "Resilience engineering",
        detail:
          "Multi-AZ by default, with tested failover objectives and transparent status and incident reporting.",
      },
      {
        title: "Cost governance",
        detail:
          "Budgets, anomaly alerts, and per-team attribution so platform spend stays legible.",
      },
    ],
    outcomes: [
      { value: "99.99%", label: "Platform availability SLA" },
      { value: "5", label: "Regions, one control plane" },
      { value: "−41%", label: "Median compute spend" },
    ],
    detail: [
      {
        kind: "p",
        text: "The cloud platform is built for teams that cannot trade control for elasticity. You get the economics of shared infrastructure with the isolation and residency guarantees of a dedicated estate.",
      },
      { kind: "h2", text: "Regions as a first-class primitive" },
      {
        kind: "p",
        text: "Place compute, storage, and inference by policy. Residency is enforced, not merely documented, and it follows workloads automatically as they scale.",
      },
      {
        kind: "list",
        items: [
          "Private connectivity to your existing networks and identity providers.",
          "Deterministic performance tiers with published latency envelopes.",
          "Zero-downtime upgrades across the managed control plane.",
        ],
      },
    ],
  },
];

export function getLocalService(slug: string) {
  return services.find((service) => service.slug === slug);
}
