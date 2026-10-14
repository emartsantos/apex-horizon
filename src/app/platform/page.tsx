import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { Eyebrow } from "@/components/site/Eyebrow";
import { Rule } from "@/components/site/Rule";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { MetricRow } from "@/components/site/Metric";
import { ButtonLink } from "@/components/site/Button";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { getServices } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Platform",
  description:
    "One control plane for enterprise AI: elastic compute, governed data, continuous identity, and sovereign inference — with an evidence trail by default.",
  path: "/platform",
});

const layers = [
  {
    name: "Experience",
    detail:
      "Console, API, and policy surfaces used by platform, security, and compliance teams.",
  },
  {
    name: "Control plane",
    detail:
      "Identity, policy, residency, and approval decisions enforced at the request layer.",
  },
  {
    name: "Data plane",
    detail:
      "Compute, storage, and inference fabric — isolated per tenant, placed by policy.",
  },
  {
    name: "Evidence",
    detail:
      "Immutable logs, lineage, and control evidence streamed to your systems of record.",
  },
];

const steps = [
  {
    title: "Connect",
    body: "Federate your identity provider and declare residency, classification, and approval policy. Nothing is migrated blind.",
  },
  {
    title: "Govern",
    body: "Policy applies to every workload and model by default. Controls map once across the frameworks you report against.",
  },
  {
    title: "Operate",
    body: "Ship models and services with canary promotion, continuous evaluation, and evidence that regenerates itself.",
  },
];

export default async function PlatformPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/platform", label: "Platform" },
        ]}
        eyebrow="Platform overview"
        title="One control plane. Every constraint respected."
        intro="Apex Horizon separates what you build from how it is governed. Teams move quickly on a foundation where residency, security, and compliance are enforced by architecture rather than negotiated case by case."
        aside={
          <ButtonLink href="/contact" variant="primary" size="md" arrow>
            See it live
          </ButtonLink>
        }
      />

      <section className="mt-24">
        <Container>
          <MetricRow
            metrics={[
              { value: "99.99%", label: "Availability SLA" },
              { value: "5", label: "Regions, one plane" },
              { value: "11ms", label: "Inference p50 overhead" },
              { value: "365d", label: "Continuous assurance" },
            ]}
          />
        </Container>
      </section>

      {/* Architecture */}
      <section className="mt-32">
        <Container>
          <Reveal>
            <SectionHeader
              index="01"
              eyebrow="Architecture"
              title="Layered so responsibility is unambiguous."
              intro="Each layer has one job. Governance decisions never depend on application code, and application code never depends on a specific region."
            />
          </Reveal>
          <div className="mt-14 grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <Reveal className="flex flex-col">
              {layers.map((layer, i) => (
                <div
                  key={layer.name}
                  className="flex gap-6 border-t border-line py-6"
                >
                  <span className="font-mono text-[0.62rem] tracking-label text-accent-amber">
                    {String(layers.length - i).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-sm font-medium uppercase tracking-label text-fg">
                      {layer.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-fg-muted">
                      {layer.detail}
                    </p>
                  </div>
                </div>
              ))}
            </Reveal>

            <Reveal delay={120}>
              <div className="grid-veil rounded-sm border border-line-strong bg-ink-raised p-8">
                <div className="horizon-rule" />
                <div className="mt-6 flex flex-col gap-3">
                  {layers.map((layer) => (
                    <div
                      key={layer.name}
                      className="flex items-center justify-between rounded-xs border border-line bg-ink px-4 py-3"
                    >
                      <span className="font-mono text-[0.62rem] uppercase tracking-label text-fg-muted">
                        {layer.name}
                      </span>
                      <span className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-label text-accent-amber">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-amber" />
                        Enforced
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-label text-fg-subtle">
                  Request path · policy evaluated once · evidence emitted always
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="mt-32">
        <Container>
          <Reveal>
            <SectionHeader
              index="02"
              eyebrow="Capabilities"
              title="What the platform gives your teams."
              align="wide"
            />
          </Reveal>
          <div className="mt-12 grid gap-x-16 md:grid-cols-2">
            {services.map((service) => (
              <Reveal key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex flex-col gap-4 border-t border-line py-8 transition-colors hover:border-line-strong"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-light tracking-tight text-fg">
                      {service.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="text-fg-subtle transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent-amber"
                    >
                      →
                    </span>
                  </div>
                  <p className="max-w-md text-sm leading-relaxed text-fg-muted">
                    {service.summary}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="mt-32">
        <Container>
          <Reveal>
            <SectionHeader
              index="03"
              eyebrow="Adoption"
              title="From first connection to governed production."
            />
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="flex flex-col gap-4 bg-ink-raised p-8">
                <Eyebrow index={String(i + 1).padStart(2, "0")}>
                  {step.title}
                </Eyebrow>
                <p className="text-sm leading-relaxed text-fg-muted">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Rule quiet />
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Architecture review"
        title="Map the platform to your environment."
        intro="We'll walk through your identity, data, and residency constraints and show exactly how each is enforced."
      />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Platform", path: "/platform" },
        ])}
      />
    </>
  );
}
