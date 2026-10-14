import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { Rule } from "@/components/site/Rule";
import { Reveal } from "@/components/site/Reveal";
import { ButtonLink } from "@/components/site/Button";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { getSiteSettings } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Trust & security",
  description:
    "Security posture, compliance certifications, data residency, and assurance practices for the Apex Horizon enterprise cloud platform.",
  path: "/trust",
});

const controls = [
  {
    title: "Encryption",
    detail:
      "AES-256 at rest, TLS 1.3 in transit, with optional customer-managed keys held in hardware security modules.",
  },
  {
    title: "Access",
    detail:
      "Continuous, context-aware authorisation. No standing production access for personnel without time-boxed approval.",
  },
  {
    title: "Residency",
    detail:
      "Region-pinned storage and processing with no extraterritorial operational access by default.",
  },
  {
    title: "Monitoring",
    detail:
      "24/7 security operations, behavioural anomaly detection, and immutable audit logging streamed to your SIEM.",
  },
  {
    title: "Resilience",
    detail:
      "Multi-AZ by default, tested recovery objectives, and transparent incident reporting.",
  },
  {
    title: "Supply chain",
    detail:
      "Vetted dependencies, signed artefacts, and SBOMs available to enterprise customers.",
  },
];

const practices = [
  {
    label: "Certifications",
    value: "SOC 2 Type II · ISO 27001 · ISO 42001",
  },
  { label: "Privacy", value: "GDPR · CCPA · HIPAA-eligible" },
  { label: "Resilience", value: "99.99% availability SLA" },
  { label: "Disclosure", value: "Coordinated vulnerability programme" },
];

export default async function TrustPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/trust", label: "Trust & security" },
        ]}
        eyebrow="Trust centre"
        title="Security you can verify, not just trust."
        intro="Every control on this page is enforced by the platform and produces evidence you can hand to an auditor. If it isn't provable, we don't claim it."
        aside={
          <ButtonLink href="/contact" variant="outline" size="md" arrow>
            Request assurance pack
          </ButtonLink>
        }
      />

      <section className="mt-20">
        <Container>
          <Reveal className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {controls.map((control) => (
              <div
                key={control.title}
                className="flex flex-col gap-3 bg-ink-raised p-8"
              >
                <h2 className="font-mono text-[0.68rem] uppercase tracking-label text-accent-amber">
                  {control.title}
                </h2>
                <p className="text-sm leading-relaxed text-fg-muted">
                  {control.detail}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-light leading-tight tracking-tight text-fg">
              Assurance at a glance.
            </h2>
            <dl className="flex flex-col">
              {settings.certifications.length > 0
                ? practices.map((row) => (
                    <div
                      key={row.label}
                      className="flex flex-col gap-1 border-t border-line py-5 sm:flex-row sm:items-baseline sm:justify-between"
                    >
                      <dt className="font-mono text-[0.66rem] uppercase tracking-label text-fg-subtle">
                        {row.label}
                      </dt>
                      <dd className="text-sm text-fg-muted">{row.value}</dd>
                    </div>
                  ))
                : null}
            </dl>
          </div>
          <div className="mt-10">
            <Rule quiet />
          </div>
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-fg-subtle">
            Security questionnaires, penetration-test summaries, and compliance
            reports are available to customers and prospects under NDA. We aim to
            design and test against WCAG 2.2 AA and do not claim formal
            certification beyond the standards listed above.
          </p>
        </Container>
      </section>

      <CtaBand
        eyebrow="Due diligence"
        title="Get the details your reviewers need."
        intro="Request our security and compliance documentation, or book a session with our security team."
      />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Trust & security", path: "/trust" },
        ])}
      />
    </>
  );
}
