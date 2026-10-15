import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ProviderCard } from "@/components/site/Cards";
import { Rule } from "@/components/site/Rule";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { getProviders } from "@/lib/content";
import { absoluteUrl, buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Provider directory",
  description:
    "Meet the licensed clinicians of Lumina Health & Wellness. Search by name or specialty, and filter for clinicians accepting new patients.",
  path: "/providers",
});

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default function ProvidersPage(props: PageProps<"/providers">) {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/providers", label: "Providers" },
        ]}
        eyebrow="Provider directory"
        title="Licensed clinicians, ready when you are."
        intro="Every Lumina clinician is licensed and credentialed. Search by name or specialty, or filter to clinicians who are accepting new patients."
      />

      <Suspense fallback={<DirectorySkeleton />}>
        <ProviderDirectory searchParams={props.searchParams} />
      </Suspense>

      <CtaBand />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Providers", path: "/providers" },
        ])}
      />
    </>
  );
}

function DirectorySkeleton() {
  return (
    <section className="mt-16">
      <Container>
        <div className="border border-line bg-ink-raised p-6">
          <div className="h-11 w-full animate-pulse bg-ink-2" />
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-48 animate-pulse border border-line bg-ink-raised"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

async function ProviderDirectory({
  searchParams,
}: {
  searchParams: PageProps<"/providers">["searchParams"];
}) {
  const resolved = await searchParams;
  const providers = await getProviders();

  const query = first(resolved.q).trim();
  const specialtyFilter = first(resolved.specialty);
  const acceptingOnly = first(resolved.accepting) === "1";

  const allSpecialties = Array.from(
    new Set(providers.map((provider) => provider.specialty)),
  ).sort();
  const allLanguages = Array.from(
    new Set(providers.flatMap((provider) => provider.languages)),
  ).sort();

  const needle = query.toLowerCase();
  const filtered = providers.filter((provider) => {
    if (specialtyFilter && provider.specialty !== specialtyFilter) return false;
    if (acceptingOnly && !provider.acceptingNew) return false;
    if (needle) {
      const haystack = [
        provider.displayName,
        provider.specialty,
        provider.credentials,
        provider.languages.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
    return true;
  });

  const buildHref = (overrides: {
    specialty?: string | null;
    accepting?: boolean | null;
    q?: string | null;
  }): string => {
    const params = new URLSearchParams();
    const nextQuery = overrides.q === undefined ? query : overrides.q;
    const nextSpecialty =
      overrides.specialty === undefined ? specialtyFilter : overrides.specialty;
    const nextAccepting =
      overrides.accepting === undefined ? acceptingOnly : overrides.accepting;
    if (nextQuery) params.set("q", nextQuery);
    if (nextSpecialty) params.set("specialty", nextSpecialty);
    if (nextAccepting) params.set("accepting", "1");
    const qs = params.toString();
    return qs ? `/providers?${qs}` : "/providers";
  };

  return (
    <>
      <section className="mt-16">
        <Container>
          <form
            method="get"
            action="/providers"
            role="search"
            aria-label="Filter the provider directory"
            className="border border-line bg-ink-raised p-6"
          >
            <div className="grid gap-6 md:grid-cols-[2fr_1fr_auto] md:items-end">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="provider-search"
                  className="font-mono text-[0.66rem] uppercase tracking-label text-fg-muted"
                >
                  Search by name or specialty
                </label>
                <input
                  id="provider-search"
                  name="q"
                  type="search"
                  defaultValue={query}
                  placeholder="e.g. Okafor or mental health"
                  className="h-11 w-full rounded-none border border-control bg-ink-raised px-3 text-sm text-fg placeholder:text-fg-subtle transition-colors focus:border-accent focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="provider-specialty"
                  className="font-mono text-[0.66rem] uppercase tracking-label text-fg-muted"
                >
                  Specialty
                </label>
                <select
                  id="provider-specialty"
                  name="specialty"
                  defaultValue={specialtyFilter}
                  className="h-11 w-full appearance-none rounded-none border border-control bg-ink-raised px-3 text-sm text-fg transition-colors focus:border-accent focus:outline-none"
                >
                  <option value="">All specialties</option>
                  {allSpecialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="h-11 rounded-none bg-paper px-6 font-mono text-[0.72rem] uppercase tracking-label text-ink transition-colors hover:bg-accent"
              >
                Apply filters
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <label className="flex items-center gap-3 text-sm text-fg-muted">
                <input
                  type="checkbox"
                  name="accepting"
                  value="1"
                  defaultChecked={acceptingOnly}
                  className="h-4 w-4 shrink-0 rounded-none border border-control bg-ink-raised accent-accent"
                />
                Only show clinicians accepting new patients
              </label>
              <Link
                href="/providers"
                className="font-mono text-[0.66rem] uppercase tracking-label text-fg-subtle transition-colors hover:text-fg"
              >
                Clear all
              </Link>
            </div>
          </form>
        </Container>
      </section>

      <section className="mt-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_2.6fr] lg:gap-16">
            <aside className="flex flex-col gap-10">
              <nav aria-label="Filter by specialty" className="flex flex-col gap-4">
                <h2 className="font-mono text-[0.66rem] uppercase tracking-label text-fg-subtle">
                  Specialties
                </h2>
                <ul className="flex flex-col">
                  {allSpecialties.map((specialty) => {
                    const active = specialtyFilter === specialty;
                    return (
                      <li key={specialty}>
                        <Link
                          href={buildHref({ specialty: active ? null : specialty })}
                          aria-current={active ? "true" : undefined}
                          className={`flex items-center justify-between border-t border-line py-3 text-sm transition-colors ${
                            active ? "text-fg" : "text-fg-muted hover:text-fg"
                          }`}
                        >
                          {specialty}
                          {active ? (
                            <span className="font-mono text-[0.6rem] uppercase tracking-label text-accent-amber">
                              Clear
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="flex flex-col gap-4">
                <h2 className="font-mono text-[0.66rem] uppercase tracking-label text-fg-subtle">
                  Languages
                </h2>
                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                  {allLanguages.map((language) => (
                    <li
                      key={language}
                      className="font-mono text-[0.64rem] uppercase tracking-label text-fg-muted"
                    >
                      {language}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div>
              <p
                aria-live="polite"
                className="font-mono text-[0.66rem] uppercase tracking-label text-fg-subtle"
              >
                Showing {filtered.length} of {providers.length} clinicians
              </p>

              {filtered.length > 0 ? (
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {filtered.map((provider, i) => (
                    <Reveal key={provider.slug} delay={(i % 2) * 80}>
                      <ProviderCard provider={provider} />
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div className="mt-8 flex flex-col gap-4 rounded-sm border border-line bg-ink-raised p-8">
                  <h2 className="font-display text-2xl font-light tracking-tight text-fg">
                    No clinicians match your filters.
                  </h2>
                  <p className="max-w-md text-sm leading-relaxed text-fg-muted">
                    Try a different specialty or search term, or clear your filters
                    to see the whole directory.
                  </p>
                  <Link
                    href="/providers"
                    className="w-fit font-mono text-[0.68rem] uppercase tracking-label text-accent-amber transition-colors hover:text-fg"
                  >
                    Clear filters →
                  </Link>
                </div>
              )}

              <div className="mt-10">
                <Rule quiet />
              </div>
              <p className="mt-6 max-w-2xl text-xs leading-relaxed text-fg-subtle">
                Availability can change. If you don&apos;t see a clinician
                accepting new patients right now, contact us and a care
                coordinator will help you find the right fit.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Providers", path: "/providers" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Lumina Health & Wellness provider directory",
          numberOfItems: providers.length,
          itemListElement: providers.map((provider, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: provider.displayName,
            url: absoluteUrl(`/providers/${provider.slug}`),
          })),
        }}
      />
    </>
  );
}
