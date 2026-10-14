import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CaseStudyCard } from "@/components/site/Cards";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { getCaseStudies } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Customers",
  description:
    "How banks, health networks, and public agencies moved AI into governed production with Apex Horizon — measured by outcomes, not adjectives.",
  path: "/case-studies",
});

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/case-studies", label: "Customers" },
        ]}
        eyebrow="Evidence"
        title="Outcomes we can put a number on."
        intro="Every engagement below reached governed production. We report what changed, and by how much."
      />

      <section className="mt-16">
        <Container>
          {studies.map((study) => (
            <Reveal key={study.slug}>
              <CaseStudyCard study={study} featured={study.featured} />
            </Reveal>
          ))}
        </Container>
      </section>

      <CtaBand />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Customers", path: "/case-studies" },
        ])}
      />
    </>
  );
}
