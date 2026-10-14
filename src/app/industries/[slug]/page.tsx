import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { RichText } from "@/components/site/RichText";
import { MetricRow } from "@/components/site/Metric";
import { Rule } from "@/components/site/Rule";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import {
  getCaseStudies,
  getIndustry,
  getIndustries,
} from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  const industries = await getIndustries();
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata(
  props: PageProps<"/industries/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const industry = await getIndustry(slug);
  if (!industry)
    return buildMetadata({ title: "Industry", description: "", path: "/industries" });
  return buildMetadata({
    title: industry.title,
    description: industry.summary,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage(
  props: PageProps<"/industries/[slug]">,
) {
  const { slug } = await props.params;
  const [industry, studies] = await Promise.all([
    getIndustry(slug),
    getCaseStudies(),
  ]);
  if (!industry) notFound();

  const related = studies.filter((s) => s.industrySlug === industry.slug);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/industries", label: "Industries" },
          { href: `/industries/${industry.slug}`, label: industry.title },
        ]}
        eyebrow={industry.tagline}
        title={industry.title}
        intro={industry.summary}
      />

      <section className="mt-16">
        <Container>
          <MetricRow metrics={industry.outcomes} />
        </Container>
      </section>

      <section className="mt-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="flex flex-col gap-8">
              <h2 className="font-mono text-[0.66rem] uppercase tracking-label text-accent-amber">
                What we hear
              </h2>
              <ul className="flex flex-col">
                {industry.pressures.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-5 border-t border-line py-5"
                  >
                    <span className="font-mono text-[0.62rem] tracking-label text-fg-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-fg-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-8">
              <h2 className="font-mono text-[0.66rem] uppercase tracking-label text-accent-amber">
                How we respond
              </h2>
              <ul className="flex flex-col gap-4">
                {industry.approach.map((item) => (
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
          <div className="max-w-2xl">
            <RichText blocks={industry.detail} />
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="mt-24">
          <Container>
            <Rule quiet />
            <h2 className="mt-8 font-mono text-[0.66rem] uppercase tracking-label text-fg-subtle">
              Related work
            </h2>
            <ul className="mt-6 flex flex-col">
              {related.map((study) => (
                <li key={study.slug}>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="group flex flex-col gap-2 border-t border-line py-6 transition-colors hover:border-line-strong"
                  >
                    <span className="font-mono text-[0.62rem] uppercase tracking-label text-fg-subtle">
                      {study.client}
                    </span>
                    <span className="font-display text-xl font-light tracking-tight text-fg transition-colors group-hover:text-accent-amber">
                      {study.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CtaBand />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.title, path: `/industries/${industry.slug}` },
        ])}
      />
    </>
  );
}
