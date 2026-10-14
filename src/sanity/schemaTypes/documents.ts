import { defineArrayMember, defineField, defineType } from "sanity";

const richBlocks = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [defineArrayMember({ type: "richBlock" })],
  });

const slugField = defineField({
  name: "slug",
  title: "Slug",
  type: "slug",
  options: { source: "title", maxLength: 96 },
  validation: (rule) => rule.required(),
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "legalName", title: "Legal name", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "url", title: "Site URL", type: "url" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "hq", title: "Headquarters", type: "string" }),
    defineField({
      name: "regions",
      title: "Regions",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "social",
      title: "Social links",
      type: "array",
      of: [defineArrayMember({ type: "socialLink" })],
    }),
    defineField({
      name: "nav",
      title: "Primary navigation",
      type: "array",
      of: [defineArrayMember({ type: "navGroup" })],
    }),
    defineField({
      name: "footer",
      title: "Footer columns",
      type: "array",
      of: [defineArrayMember({ type: "footerColumn" })],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    slugField,
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
    defineField({
      name: "capabilities",
      title: "Capabilities",
      type: "array",
      of: [defineArrayMember({ type: "capability" })],
    }),
    defineField({
      name: "outcomes",
      title: "Outcomes",
      type: "array",
      of: [defineArrayMember({ type: "metric" })],
    }),
    richBlocks("detail", "Detail"),
  ],
  orderings: [
    {
      title: "Order",
      name: "order",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});

export const industry = defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  fields: [
    slugField,
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({
      name: "pressures",
      title: "Pressures",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "approach",
      title: "Approach",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "outcomes",
      title: "Outcomes",
      type: "array",
      of: [defineArrayMember({ type: "metric" })],
    }),
    richBlocks("detail", "Detail"),
  ],
});

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  fields: [
    slugField,
    defineField({ name: "client", title: "Client", type: "string" }),
    defineField({ name: "sector", title: "Sector", type: "string" }),
    defineField({
      name: "industrySlug",
      title: "Industry slug",
      description: "Matches an industry document slug (e.g. financial-services)",
      type: "string",
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "challenge", title: "Challenge", type: "text", rows: 4 }),
    defineField({
      name: "approach",
      title: "Approach",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "results",
      title: "Results",
      type: "array",
      of: [defineArrayMember({ type: "metric" })],
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "object",
      fields: [
        defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
        defineField({ name: "author", title: "Author", type: "string" }),
        defineField({ name: "role", title: "Role", type: "string" }),
      ],
    }),
    richBlocks("detail", "Detail"),
  ],
});

export const insight = defineType({
  name: "insight",
  title: "Insight",
  type: "document",
  fields: [
    slugField,
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({ name: "readingMinutes", title: "Reading minutes", type: "number" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({
      name: "authorSlug",
      title: "Author slug",
      description: "Matches a leader document slug",
      type: "string",
    }),
    richBlocks("detail", "Detail"),
  ],
  orderings: [
    {
      title: "Published (newest)",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});

export const leader = defineType({
  name: "leader",
  title: "Leader",
  type: "document",
  fields: [
    slugField,
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "focus", title: "Focus", type: "string" }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 4 }),
  ],
});

export const job = defineType({
  name: "job",
  title: "Job",
  type: "document",
  fields: [
    slugField,
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "department", title: "Department", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "type", title: "Type", type: "string" }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({
      name: "responsibilities",
      title: "Responsibilities",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "requirements",
      title: "Requirements",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
});

export const legalDoc = defineType({
  name: "legalDoc",
  title: "Legal document",
  type: "document",
  fields: [
    slugField,
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "updated", title: "Last updated", type: "date", validation: (r) => r.required() }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    richBlocks("detail", "Detail"),
  ],
});

export const documentTypes = [
  siteSettings,
  service,
  industry,
  caseStudy,
  insight,
  leader,
  job,
  legalDoc,
];
