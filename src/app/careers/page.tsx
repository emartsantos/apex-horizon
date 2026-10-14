import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { Rule } from "@/components/site/Rule";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { getJobs } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description:
    "Join the team building the secure, high-performance cloud platform for enterprise AI — across engineering, security, and compliance.",
  path: "/careers",
});

const reasons = [
  {
    title: "Hard problems, real stakes",
    body: "Sovereignty, inference latency, and continuous assurance for enterprises that cannot afford to be wrong.",
  },
  {
    title: "Craft over process",
    body: "We write our controls down and expect the same rigour in the code we ship.",
  },
  {
    title: "Distributed by default",
    body: "Teams across APAC, EMEA, and the Americas, with asynchronous, written-first collaboration.",
  },
];

export default async function CareersPage() {
  const jobs = await getJobs();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/careers", label: "Careers" },
        ]}
        eyebrow="Careers"
        title="Build infrastructure that has to be right."
        intro="We hire engineers, security practitioners, and compliance specialists who care about the difference between claimed and proven."
      />

      <section className="mt-20">
        <Container>
          <Reveal className="grid gap-x-16 gap-y-10 md:grid-cols-3">
            {reasons.map((reason) => (
              <div key={reason.title} className="border-t border-line pt-5">
                <h2 className="font-mono text-[0.68rem] uppercase tracking-label text-accent-amber">
                  {reason.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {reason.body}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <Reveal>
            <SectionHeader
              index="01"
              eyebrow="Open roles"
              title={`${jobs.length} positions open.`}
            />
          </Reveal>
          <ul className="mt-10 flex flex-col">
            {jobs.map((job) => (
              <li key={job.slug}>
                <Link
                  href={`/careers#${job.slug}`}
                  className="group flex flex-col gap-3 border-t border-line py-8 transition-colors hover:border-line-strong lg:flex-row lg:items-center lg:justify-between"
                >
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-xl font-light tracking-tight text-fg transition-colors group-hover:text-accent-amber">
                      {job.title}
                    </h3>
                    <p className="max-w-xl text-sm leading-relaxed text-fg-muted">
                      {job.summary}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.64rem] uppercase tracking-label text-fg-subtle">
                    <span>{job.department}</span>
                    <span>{job.location}</span>
                    <span>{job.type}</span>
                    <span
                      aria-hidden="true"
                      className="text-fg-subtle transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent-amber"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Rule quiet />
          </div>
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-fg-subtle">
            Don’t see your role? Send a concise note and a link to something you
            have built to careers@apexhorizon.com.
          </p>
        </Container>
      </section>

      <CtaBand
        eyebrow="Hiring"
        title="Think you belong on this team?"
        intro="We read every application ourselves and respond to the ones we can act on."
      />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />
    </>
  );
}
