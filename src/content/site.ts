import type { SiteSettings } from "@/lib/types";

export const siteSettings: SiteSettings = {
  name: "Apex Horizon Technologies",
  legalName: "Apex Horizon Technologies Pte. Ltd.",
  description:
    "Enterprise cloud engineered for secure, high-performance AI — a single control plane for compute, data, and zero-trust security.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://apex-horizon.vercel.app",
  email: "enterprise@apexhorizon.com",
  phone: "+65 6812 4400",
  hq: "One Raffles Quay, Singapore",
  regions: ["Singapore", "London", "Frankfurt", "New York", "Tokyo"],
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "GitHub", href: "https://github.com" },
    { label: "X", href: "https://x.com" },
  ],
  nav: [
    {
      label: "Platform",
      href: "/platform",
      items: [
        {
          label: "Platform overview",
          href: "/platform",
          description: "The unified control plane",
        },
        {
          label: "Trust & security",
          href: "/trust",
          description: "Posture, compliance, assurance",
        },
      ],
    },
    {
      label: "Services",
      href: "/services",
      items: [
        {
          label: "Enterprise AI",
          href: "/services/enterprise-ai",
          description: "Private model serving at scale",
        },
        {
          label: "Zero-trust security",
          href: "/services/zero-trust-security",
          description: "Continuous identity & access",
        },
        {
          label: "Compliance & governance",
          href: "/services/compliance-governance",
          description: "Evidence you can hand to auditors",
        },
        {
          label: "Cloud platform",
          href: "/services/cloud-platform",
          description: "Sovereign, high-performance compute",
        },
      ],
    },
    {
      label: "Industries",
      href: "/industries",
      items: [
        {
          label: "Financial services",
          href: "/industries/financial-services",
          description: "Regulated, low-latency workloads",
        },
        {
          label: "Healthcare",
          href: "/industries/healthcare",
          description: "PHI-safe clinical intelligence",
        },
        {
          label: "Public sector",
          href: "/industries/public-sector",
          description: "Sovereign, citizen-grade resilience",
        },
      ],
    },
    { label: "Customers", href: "/case-studies" },
    { label: "Insights", href: "/insights" },
    {
      label: "Company",
      href: "/company",
      items: [
        { label: "About", href: "/company", description: "Mission and team" },
        { label: "Careers", href: "/careers", description: "Open roles" },
        { label: "Contact", href: "/contact", description: "Book a demo" },
      ],
    },
  ],
  footer: [
    {
      title: "Platform",
      items: [
        { label: "Overview", href: "/platform" },
        { label: "Trust & security", href: "/trust" },
        { label: "Enterprise AI", href: "/services/enterprise-ai" },
        { label: "Zero-trust security", href: "/services/zero-trust-security" },
      ],
    },
    {
      title: "Solutions",
      items: [
        { label: "Services", href: "/services" },
        { label: "Industries", href: "/industries" },
        { label: "Customers", href: "/case-studies" },
        { label: "Insights", href: "/insights" },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "About", href: "/company" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
        { label: "Book a demo", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      items: [
        { label: "Privacy", href: "/legal/privacy" },
        { label: "Terms", href: "/legal/terms" },
        { label: "Data processing", href: "/legal/data-processing" },
        { label: "Accessibility", href: "/legal/accessibility" },
      ],
    },
  ],
  certifications: ["SOC 2 Type II", "ISO 27001", "ISO 42001", "GDPR", "HIPAA"],
};
