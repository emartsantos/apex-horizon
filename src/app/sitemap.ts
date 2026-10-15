import type { MetadataRoute } from "next";
import {
  getServices,
  getSpecialties,
  getProviders,
  getStories,
  getInsights,
  getLegalDocs,
} from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, specialties, providers, stories, insights, legal] =
    await Promise.all([
      getServices(),
      getSpecialties(),
      getProviders(),
      getStories(),
      getInsights(),
      getLegalDocs(),
    ]);

  const now = new Date();
  const staticRoutes = [
    "",
    "/services",
    "/specialties",
    "/providers",
    "/stories",
    "/insights",
    "/roles",
    "/how-it-works",
    "/trust",
    "/company",
    "/contact",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...specialties.map((s) => ({
      url: absoluteUrl(`/specialties/${s.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...providers.map((s) => ({
      url: absoluteUrl(`/providers/${s.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...stories.map((s) => ({
      url: absoluteUrl(`/stories/${s.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...insights.map((s) => ({
      url: absoluteUrl(`/insights/${s.slug}`),
      lastModified: new Date(s.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...legal.map((s) => ({
      url: absoluteUrl(`/legal/${s.slug}`),
      lastModified: new Date(s.updated),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
