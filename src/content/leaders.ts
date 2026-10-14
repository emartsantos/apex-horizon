import type { Leader } from "@/lib/types";

export const leaders: Leader[] = [
  {
    slug: "lian-zhou",
    name: "Lian Zhou",
    role: "Chief Executive Officer",
    focus: "Platform strategy, enterprise AI",
    bio: "Lian spent fifteen years building regulated infrastructure before founding Apex Horizon, most recently leading platform engineering for a global payments network. She writes and speaks on treating governance as architecture rather than process.",
  },
  {
    slug: "prisha-nair",
    name: "Prisha Nair",
    role: "Chief Information Security Officer",
    focus: "Zero trust, sovereign assurance",
    bio: "Prisha led national critical-infrastructure security programmes across two continents. At Apex Horizon she owns the trust posture behind every deployment, from cryptographic key custody to continuous assurance.",
  },
  {
    slug: "daniel-okafor",
    name: "Daniel Okafor",
    role: "Chief Technology Officer",
    focus: "Inference performance, resilience",
    bio: "Daniel built low-latency trading systems before turning to enterprise AI infrastructure. He is responsible for the inference fabric and the resilience engineering that underpins the platform's availability commitments.",
  },
  {
    slug: "mei-tanaka",
    name: "Mei Tanaka",
    role: "Chief Compliance Officer",
    focus: "Global frameworks, data protection",
    bio: "Mei advises regulators and enterprises on technology risk. At Apex Horizon she leads the control library that maps a single control set across SOC 2, ISO, GDPR, HIPAA, and DORA obligations.",
  },
];

export function getLocalLeader(slug: string) {
  return leaders.find((leader) => leader.slug === slug);
}
