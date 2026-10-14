import type { MetadataRoute } from "next";
import {
  getCaseStudies,
  getIndustries,
  getInsights,
  getJobs,
  getLegalDocs,
  getServices,
} from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, industries, studies, insights, jobs, legal] =
    await Promise.all([
      getServices(),
      getIndustries(),
      getCaseStudies(),
      getInsights(),
      getJobs(),
      getLegalDocs(),
    ]);

  const now = new Date();
  const staticRoutes = [
    "",
    "/platform",
    "/services",
    "/industries",
    "/case-studies",
    "/insights",
    "/company",
    "/trust",
    "/careers",
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
    ...industries.map((s) => ({
      url: absoluteUrl(`/industries/${s.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...studies.map((s) => ({
      url: absoluteUrl(`/case-studies/${s.slug}`),
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
    ...jobs.map((s) => ({
      url: `${absoluteUrl("/careers")}#${s.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...legal.map((s) => ({
      url: absoluteUrl(`/legal/${s.slug}`),
      lastModified: new Date(s.updated),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
