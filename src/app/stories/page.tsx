import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { StoryCard } from "@/components/site/Cards";
import { Rule } from "@/components/site/Rule";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { getStories } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Patient stories",
  description:
    "Real experiences of care with Lumina Health & Wellness — shared with permission and anonymized to protect patient privacy.",
  path: "/stories",
});

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/stories", label: "Patient stories" },
        ]}
        eyebrow="Patient stories"
        title="Care, in patients' own words."
        intro="Every story below is shared with permission and anonymized. Some details are changed to protect privacy, and names are abbreviated or omitted. Stories reflect individual experiences and are not a promise of outcomes."
      />

      <section className="mt-16">
        <Container>
          {stories.map((story) => (
            <Reveal key={story.slug}>
              <StoryCard story={story} featured={story.featured} />
            </Reveal>
          ))}
          <div className="mt-10">
            <Rule quiet />
          </div>
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-fg-subtle">
            We publish patient stories only with consent. If you are a Lumina
            patient and would like to share your experience, or ask us to remove a
            story, contact us at any time.
          </p>
        </Container>
      </section>

      <CtaBand />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Patient stories", path: "/stories" },
        ])}
      />
    </>
  );
}
