import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { services } from "@/content/services";
import { specialties } from "@/content/specialties";
import { stories } from "@/content/stories";
import { insights as localInsights } from "@/content/insights";
import { providers as localProviders } from "@/content/providers";
import { roles } from "@/content/roles";
import { legalDocs } from "@/content/legal";
import { siteSettings } from "@/content/site";
import { isDatabaseConfigured, prisma } from "@/lib/db/prisma";
import type {
  Insight,
  LegalDoc,
  Provider,
  RichBlock,
  Role,
  Service,
  SiteSettings,
  Specialty,
  Story,
} from "@/lib/types";

export async function getSiteSettings(): Promise<SiteSettings> {
  "use cache";
  cacheLife("max");
  return siteSettings;
}

export async function getCopyrightYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function getServices(): Promise<Service[]> {
  "use cache";
  cacheLife("days");
  cacheTag("services");
  return [...services].sort((a, b) => a.order - b.order);
}

export async function getService(slug: string): Promise<Service | undefined> {
  const all = await getServices();
  return all.find((service) => service.slug === slug);
}

export async function getSpecialties(): Promise<Specialty[]> {
  "use cache";
  cacheLife("days");
  cacheTag("specialties");
  return specialties;
}

export async function getSpecialty(
  slug: string,
): Promise<Specialty | undefined> {
  const all = await getSpecialties();
  return all.find((specialty) => specialty.slug === slug);
}

export async function getStories(): Promise<Story[]> {
  "use cache";
  cacheLife("days");
  cacheTag("stories");
  return stories;
}

export async function getStory(slug: string): Promise<Story | undefined> {
  const all = await getStories();
  return all.find((story) => story.slug === slug);
}

export async function getInsights(): Promise<Insight[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("insights");

  let data: Insight[] = localInsights;

  if (isDatabaseConfigured()) {
    try {
      const rows = await prisma.article.findMany({
        where: { status: "PUBLISHED", publishedAt: { not: null } },
        orderBy: { publishedAt: "desc" },
      });
      if (rows.length > 0) {
        data = rows.map((row) => ({
          slug: row.slug,
          title: row.title,
          category: row.category,
          excerpt: row.excerpt,
          publishedAt: (row.publishedAt ?? row.createdAt).toISOString(),
          readingMinutes: row.readingMinutes,
          featured: row.featured,
          authorSlug: row.authorSlug ?? "",
          detail: (row.bodyJson as RichBlock[]) ?? [],
        }));
      }
    } catch {
      data = localInsights;
    }
  }

  return [...data].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
}

export async function getInsight(slug: string): Promise<Insight | undefined> {
  const all = await getInsights();
  return all.find((insight) => insight.slug === slug);
}

export async function getProviders(): Promise<Provider[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("providers");

  let data: Provider[] = localProviders;

  if (isDatabaseConfigured()) {
    try {
      const rows = await prisma.provider.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { sortOrder: "asc" },
      });
      if (rows.length > 0) {
        data = rows.map((row) => ({
          slug: row.slug,
          displayName: row.displayName,
          credentials: row.credentials,
          specialty: row.specialty,
          languages: row.languages,
          bio: row.bio,
          photoUrl: row.photoUrl ?? undefined,
          location: row.location,
          acceptingNew: row.acceptingNew,
          order: row.sortOrder,
        }));
      }
    } catch {
      data = localProviders;
    }
  }

  return [...data].sort((a, b) => a.order - b.order);
}

export async function getProvider(slug: string): Promise<Provider | undefined> {
  const all = await getProviders();
  return all.find((provider) => provider.slug === slug);
}

export async function getRoles(): Promise<Role[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("roles");
  return roles;
}

export async function getRole(slug: string): Promise<Role | undefined> {
  const all = await getRoles();
  return all.find((role) => role.slug === slug);
}

export async function getLegalDocs(): Promise<LegalDoc[]> {
  "use cache";
  cacheLife("max");
  cacheTag("legal");
  return legalDocs;
}

export async function getLegalDoc(
  slug: string,
): Promise<LegalDoc | undefined> {
  const all = await getLegalDocs();
  return all.find((doc) => doc.slug === slug);
}
