import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Eyebrow } from "@/components/site/Eyebrow";
import { Rule } from "@/components/site/Rule";
import { RichText } from "@/components/site/RichText";
import { MetricRow } from "@/components/site/Metric";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { getCaseStudy, getCaseStudies, getService } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata(
  props: PageProps<"/case-studies/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const study = await getCaseStudy(slug);
  if (!study)
    return buildMetadata({
      title: "Case study",
      description: "",
      path: "/case-studies",
    });
  return buildMetadata({
    title: `${study.client}: ${study.title}`,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
    type: "article",
  });
}

export default async function CaseStudyPage(
  props: PageProps<"/case-studies/[slug]">,
) {
  const { slug } = await props.params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  const servicesUsed = (
    await Promise.all(study.services.map((s) => getService(s)))
  ).filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <section className="pt-16 lg:pt-24">
        <Container>
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/case-studies", label: "Customers" },
              { href: `/case-studies/${study.slug}`, label: study.client },
            ]}
            className="mb-10"
          />
          <div className="flex flex-col gap-6">
            <Eyebrow>{`${study.sector} · ${study.year}`}</Eyebrow>
            <h1 className="max-w-4xl font-display text-[clamp(2.4rem,5.4vw,4.5rem)] font-light leading-[1] tracking-tightest text-fg">
              {study.title}
            </h1>
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted">
              {study.summary}
            </p>
          </div>
        </Container>
      </section>

      <section className="mt-16">
        <Container>
          <MetricRow metrics={study.results} />
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="flex flex-col gap-5">
              <h2 className="font-mono text-[0.66rem] uppercase tracking-label text-accent-amber">
                The challenge
              </h2>
              <p className="text-pretty leading-relaxed text-fg-muted">
                {study.challenge}
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="font-mono text-[0.66rem] uppercase tracking-label text-accent-amber">
                The approach
              </h2>
              <ul className="flex flex-col gap-4">
                {study.approach.map((item) => (
                  <li key={item} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span className="text-sm leading-relaxed text-fg-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <figure className="max-w-4xl">
            <Rule />
            <blockquote className="py-12">
              <p className="font-display text-[clamp(1.6rem,3.4vw,2.75rem)] font-light leading-[1.15] tracking-tight text-fg">
                “{study.quote.text}”
              </p>
              <figcaption className="mt-8 font-mono text-[0.68rem] uppercase tracking-label text-fg-subtle">
                {study.quote.author} · {study.quote.role}
              </figcaption>
            </blockquote>
            <Rule quiet />
          </figure>
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <div className="max-w-2xl">
            <RichText blocks={study.detail} />
          </div>
        </Container>
      </section>

      {servicesUsed.length > 0 ? (
        <section className="mt-24">
          <Container>
            <div className="flex flex-col gap-6 border-t border-line pt-8 lg:flex-row lg:items-start lg:justify-between">
              <p className="font-mono text-[0.66rem] uppercase tracking-label text-fg-subtle">
                Capabilities used
              </p>
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {servicesUsed.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {service.title}
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent-amber"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ) : null}

      <CtaBand />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Customers", path: "/case-studies" },
          { name: study.client, path: `/case-studies/${study.slug}` },
        ])}
      />
    </>
  );
}
