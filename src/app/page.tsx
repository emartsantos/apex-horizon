import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { Rule } from "@/components/site/Rule";
import { Eyebrow } from "@/components/site/Eyebrow";
import { ButtonLink } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ServiceCard, CaseStudyCard, InsightCard } from "@/components/site/Cards";
import { MetricRow } from "@/components/site/Metric";
import { CtaBand } from "@/components/site/CtaBand";
import {
  getCaseStudies,
  getIndustries,
  getInsights,
  getServices,
  getSiteSettings,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Secure cloud for enterprise AI",
  description:
    "Apex Horizon is the secure, high-performance cloud platform engineered for enterprise AI — one control plane for compute, data, zero-trust security, and continuous compliance.",
  path: "/",
});

const axis = [
  { label: "Compute", status: "Elastic", value: "99.99%" },
  { label: "Data", status: "Resident", value: "5 regions" },
  { label: "Identity", status: "Continuous", value: "<60s MTTC" },
  { label: "Inference", status: "Governed", value: "11ms p50" },
];

export default async function HomePage() {
  const [services, studies, insights, industries, settings] = await Promise.all([
    getServices(),
    getCaseStudies(),
    getInsights(),
    getIndustries(),
    getSiteSettings(),
  ]);

  const featured = studies.filter((s) => s.featured).slice(0, 2);
  const latest = insights.slice(0, 3);
  const platformMetrics = [
    { value: "99.99%", label: "Availability SLA" },
    { value: "11ms", label: "Inference overhead (p50)" },
    { value: "5", label: "Regions, one control plane" },
    { value: "0", label: "Standing secrets" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 lg:pt-24">
        <div
          aria-hidden="true"
          className="grid-veil pointer-events-none absolute inset-0"
          style={{
            maskImage:
              "radial-gradient(120% 80% at 70% 0%, black 20%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(120% 80% at 70% 0%, black 20%, transparent 72%)",
          }}
        />
        <Container className="relative">
          <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
            <Reveal className="flex flex-col gap-8">
              <Eyebrow>Enterprise cloud · AI infrastructure</Eyebrow>
              <h1 className="max-w-[16ch] font-display text-[clamp(2.75rem,6.6vw,5.75rem)] font-light leading-[0.96] tracking-tightest text-fg">
                The secure cloud for enterprise{" "}
                <em className="not-italic text-horizon">AI</em>.
              </h1>
              <p className="max-w-xl text-pretty text-lg leading-relaxed text-fg-muted">
                One control plane for compute, data, and zero-trust security — so
                your teams ship AI to production without renegotiating residency,
                latency, or compliance.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <ButtonLink href="/contact" variant="primary" size="lg" arrow>
                  Book a demo
                </ButtonLink>
                <ButtonLink href="/platform" variant="outline" size="lg">
                  Explore the platform
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-sm border border-line-strong bg-ink-raised/70 backdrop-blur-sm">
                <div className="horizon-rule" />
                <div className="flex items-center justify-between px-5 py-3">
                  <span className="font-mono text-[0.62rem] uppercase tracking-label text-fg-subtle">
                    Control plane
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-label text-accent-amber">
                    <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent-amber" />
                    Nominal
                  </span>
                </div>
                <ul className="divide-y divide-line">
                  {axis.map((row) => (
                    <li
                      key={row.label}
                      className="flex items-center justify-between px-5 py-4"
                    >
                      <span className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="h-4 w-px bg-line-strong"
                        />
                        <span className="text-sm text-fg">{row.label}</span>
                      </span>
                      <span className="flex items-center gap-4">
                        <span className="font-mono text-[0.62rem] uppercase tracking-label text-fg-subtle">
                          {row.status}
                        </span>
                        <span className="font-mono text-[0.66rem] tracking-tight text-fg">
                          {row.value}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-16 flex flex-col gap-4">
            <Rule quiet />
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 py-2">
              <li className="font-mono text-[0.62rem] uppercase tracking-label text-fg-subtle">
                Trusted controls
              </li>
              {settings.certifications.map((cert) => (
                <li
                  key={cert}
                  className="font-mono text-[0.66rem] uppercase tracking-label text-fg-muted"
                >
                  {cert}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Positioning */}
      <section className="mt-32">
        <Container>
          <Reveal className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <h2 className="font-display text-[clamp(1.9rem,3.6vw,3rem)] font-light leading-[1.08] tracking-tighter text-fg">
              Most AI programmes stall between the notebook and production. We
              remove the gap by treating governance, residency, and latency as
              platform primitives — not integration projects.
            </h2>
            <div className="flex flex-col gap-8 lg:pt-2">
              {[
                {
                  title: "Secured by default",
                  body: "Zero-trust decisions at the request layer, with workload identity and no standing secrets.",
                },
                {
                  title: "Evidenced continuously",
                  body: "One control set mapped across SOC 2, ISO, GDPR, HIPAA, and DORA — evidence on demand.",
                },
                {
                  title: "Fast where it counts",
                  body: "Inference that stays on-region, within single-digit-millisecond overhead.",
                },
              ].map((item) => (
                <div key={item.title} className="border-t border-line pt-5">
                  <h3 className="font-mono text-[0.68rem] uppercase tracking-label text-accent-amber">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Platform metrics */}
      <section className="mt-32">
        <Container>
          <Reveal>
            <MetricRow metrics={platformMetrics} />
          </Reveal>
        </Container>
      </section>

      {/* Services */}
      <section className="mt-32" aria-labelledby="services-heading">
        <Container>
          <Reveal>
            <SectionHeader
              index="01"
              eyebrow="Capabilities"
              title="Four disciplines, one platform."
              intro="Each is a first-class capability of the control plane, and each works better because the others do."
              align="wide"
              action={
                <ButtonLink href="/services" variant="ghost" size="md" arrow>
                  All services
                </ButtonLink>
              }
            />
          </Reveal>
          <div className="mt-14 grid gap-x-16 md:grid-cols-2">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 80}>
                <ServiceCard service={service} index={i} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Case studies */}
      <section className="mt-32" aria-labelledby="customers-heading">
        <Container>
          <Reveal>
            <SectionHeader
              index="02"
              eyebrow="Customers"
              title="Evidence, not adjectives."
              intro="How enterprises in regulated sectors moved AI into governed production."
              align="wide"
              action={
                <ButtonLink href="/case-studies" variant="ghost" size="md" arrow>
                  All case studies
                </ButtonLink>
              }
            />
          </Reveal>
          <div className="mt-10">
            {featured.map((study) => (
              <Reveal key={study.slug}>
                <CaseStudyCard study={study} featured />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section className="mt-32" aria-labelledby="industries-heading">
        <Container>
          <Reveal>
            <SectionHeader
              index="03"
              eyebrow="Industries"
              title="Built for the sectors where failure is expensive."
            />
          </Reveal>
          <Reveal className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group flex items-baseline gap-3 font-display text-[clamp(1.4rem,3vw,2.4rem)] font-light tracking-tight text-fg-muted transition-colors hover:text-fg"
              >
                {industry.title}
                <span
                  aria-hidden="true"
                  className="text-sm text-fg-subtle transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent-amber"
                >
                  →
                </span>
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Insights */}
      <section className="mt-32" aria-labelledby="insights-heading">
        <Container>
          <Reveal>
            <SectionHeader
              index="04"
              eyebrow="Insights"
              title="Perspectives from the field."
              align="wide"
              action={
                <ButtonLink href="/insights" variant="ghost" size="md" arrow>
                  All insights
                </ButtonLink>
              }
            />
          </Reveal>
          <div className="mt-10 grid gap-x-16 md:grid-cols-3">
            {latest.map((insight, i) => (
              <Reveal key={insight.slug} delay={i * 80}>
                <InsightCard insight={insight} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
