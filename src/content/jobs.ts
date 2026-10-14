import type { Job } from "@/lib/types";

export const jobs: Job[] = [
  {
    slug: "staff-engineer-inference",
    title: "Staff Engineer, Inference Platform",
    department: "Engineering",
    location: "Singapore / Remote (APAC)",
    type: "Full-time",
    summary:
      "Design and scale the inference fabric that serves enterprise models with deterministic latency under sustained load.",
    responsibilities: [
      "Architect scheduling and routing for heterogeneous GPU fleets.",
      "Drive p99 latency and cost efficiency across regions.",
      "Partner with security to enforce isolation and attestation.",
    ],
    requirements: [
      "Deep experience with distributed systems and performance engineering.",
      "Fluency with low-level profiling and capacity modelling.",
      "Track record shipping in regulated environments.",
    ],
  },
  {
    slug: "security-engineer-zero-trust",
    title: "Security Engineer, Zero Trust",
    department: "Security",
    location: "London / Frankfurt",
    type: "Full-time",
    summary:
      "Build the policy and attestation systems that make every request a trust decision.",
    responsibilities: [
      "Implement workload identity and short-lived credential issuance.",
      "Develop policy-as-code frameworks and enforcement points.",
      "Wire detection signals into customer SOC workflows.",
    ],
    requirements: [
      "Strong background in identity, cryptography, and systems security.",
      "Experience operating security controls at scale.",
      "Clear written communication for controls and evidence.",
    ],
  },
  {
    slug: "compliance-solutions-architect",
    title: "Compliance Solutions Architect",
    department: "Compliance",
    location: "Singapore / New York",
    type: "Full-time",
    summary:
      "Translate frameworks such as DORA, HIPAA, and ISO 27001 into platform controls customers can adopt directly.",
    responsibilities: [
      "Maintain the unified control library and framework mappings.",
      "Support enterprise audit and assurance engagements.",
      "Advise product teams on regulatory implications.",
    ],
    requirements: [
      "Hands-on experience with enterprise compliance programmes.",
      "Ability to read regulation as an engineering specification.",
      "Strong stakeholder communication.",
    ],
  },
];

export function getLocalJob(slug: string) {
  return jobs.find((job) => job.slug === slug);
}
