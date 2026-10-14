import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { InsightCard } from "@/components/site/Cards";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { getInsights } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Insights",
  description:
    "Perspectives on governing AI at scale, zero-trust architecture, inference performance, and data sovereignty — written by the team building the platform.",
  path: "/insights",
});

export default async function InsightsPage() {
  const insights = await getInsights();
  const categories = Array.from(new Set(insights.map((i) => i.category)));

  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/insights", label: "Insights" },
        ]}
        eyebrow="Perspectives"
        title="Notes from building secure AI infrastructure."
        intro="Practical thinking for the people accountable for AI systems that have to survive procurement, audit, and production."
        aside={
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {categories.map((category) => (
              <li
                key={category}
                className="font-mono text-[0.62rem] uppercase tracking-label text-fg-subtle"
              >
                {category}
              </li>
            ))}
          </ul>
        }
      />

      <section className="mt-16">
        <Container>
          <div className="grid gap-x-16 md:grid-cols-2">
            {insights.map((insight, i) => (
              <Reveal key={insight.slug} delay={(i % 2) * 80}>
                <InsightCard insight={insight} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ])}
      />
    </>
  );
}
