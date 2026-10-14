import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { Rule } from "@/components/site/Rule";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ButtonLink } from "@/components/site/Button";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { getLeaders, getSiteSettings } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Company",
  description:
    "Apex Horizon Technologies builds the secure, high-performance cloud platform for enterprise AI. Meet the team and the principles behind the platform.",
  path: "/company",
});

const values = [
  {
    title: "Evidence over assertion",
    body: "We claim only what we can demonstrate, and we make the evidence available.",
  },
  {
    title: "Boundaries as features",
    body: "Residency, isolation, and least privilege are product surfaces, not fine print.",
  },
  {
    title: "Performance is a control",
    body: "Fast systems are safer systems. Latency budgets are engineering commitments.",
  },
  {
    title: "Boring where it counts",
    body: "We innovate on capability and stay conservative on the foundations.",
  },
];

export default async function CompanyPage() {
  const [leaders, settings] = await Promise.all([
    getLeaders(),
    getSiteSettings(),
  ]);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/company", label: "Company" },
        ]}
        eyebrow="About"
        title="Infrastructure for the enterprises that can’t afford to guess."
        intro="Apex Horizon was founded by operators who spent their careers inside regulated infrastructure. We build the platform we wished we had: fast, sovereign, and provable by default."
      />

      <section className="mt-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <h2 className="font-display text-[clamp(1.7rem,3vw,2.6rem)] font-light leading-[1.1] tracking-tighter text-fg">
              Most platforms ask you to trade control for velocity. We built one
              where the two reinforce each other — governance enforced by
              architecture, and scale that doesn’t cost you the audit trail.
            </h2>
            <div className="flex flex-col gap-4 lg:pt-2">
              <p className="text-sm leading-relaxed text-fg-muted">
                Our teams operate across {settings.regions.length} regions, from{" "}
                {settings.hq} and beyond. We work with enterprises in financial
                services, healthcare, and the public sector — sectors where the
                cost of getting security wrong is measured in public trust.
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                <ButtonLink href="/careers" variant="ghost" size="md" arrow>
                  Join the team
                </ButtonLink>
                <ButtonLink href="/trust" variant="ghost" size="md" arrow>
                  Trust centre
                </ButtonLink>
              </div>
            </div>
          </div>
          <div className="mt-14">
            <Rule />
          </div>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <Reveal>
            <SectionHeader
              index="01"
              eyebrow="Leadership"
              title="Operators, not theorists."
            />
          </Reveal>
          <div className="mt-12 grid gap-x-16 gap-y-14 md:grid-cols-2">
            {leaders.map((leader, i) => (
              <Reveal key={leader.slug} delay={(i % 2) * 80}>
                <article className="flex flex-col gap-4 border-t border-line pt-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl font-light tracking-tight text-fg">
                      {leader.name}
                    </h3>
                    <span className="shrink-0 font-mono text-[0.62rem] uppercase tracking-label text-fg-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="font-mono text-[0.66rem] uppercase tracking-label text-accent-amber">
                    {leader.role}
                  </p>
                  <p className="font-mono text-[0.6rem] uppercase tracking-label text-fg-subtle">
                    Focus · {leader.focus}
                  </p>
                  <p className="max-w-lg text-sm leading-relaxed text-fg-muted">
                    {leader.bio}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="mt-28">
        <Container>
          <Reveal>
            <SectionHeader
              index="02"
              eyebrow="Principles"
              title="How we work."
              align="wide"
            />
          </Reveal>
          <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="border-t border-line pt-5">
                <h3 className="font-mono text-[0.68rem] uppercase tracking-label text-accent-amber">
                  {value.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-fg-muted">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Company", path: "/company" },
        ])}
      />
    </>
  );
}
