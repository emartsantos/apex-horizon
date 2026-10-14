import { defineArrayMember, defineField, defineType } from "sanity";

export const richBlock = defineType({
  name: "richBlock",
  title: "Content block",
  type: "object",
  fields: [
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Paragraph", value: "p" },
          { title: "Heading", value: "h2" },
          { title: "Quote", value: "quote" },
          { title: "List", value: "list" },
        ],
        layout: "radio",
      },
      initialValue: "p",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 3,
      hidden: ({ parent }) => parent?.kind === "list",
    }),
    defineField({
      name: "attribution",
      title: "Quote attribution",
      type: "string",
      hidden: ({ parent }) => parent?.kind !== "quote",
    }),
    defineField({
      name: "items",
      title: "List items",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      hidden: ({ parent }) => parent?.kind !== "list",
    }),
  ],
  preview: {
    select: { title: "text", subtitle: "kind" },
    prepare: ({ title, subtitle }) => ({
      title: title || "(no text)",
      subtitle,
    }),
  },
});

export const metric = defineType({
  name: "metric",
  title: "Metric",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "note", title: "Note", type: "string" }),
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
});

export const capability = defineType({
  name: "capability",
  title: "Capability",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "detail",
      title: "Detail",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
  ],
});

export const navItem = defineType({
  name: "navItem",
  title: "Nav item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Href",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", title: "Description", type: "string" }),
  ],
});

export const navGroup = defineType({
  name: "navGroup",
  title: "Nav group",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Href",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [defineArrayMember({ type: "navItem" })],
    }),
  ],
});

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Href",
      type: "url",
      validation: (rule) => rule.required(),
    }),
  ],
});

export const footerColumn = defineType({
  name: "footerColumn",
  title: "Footer column",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [defineArrayMember({ type: "navItem" })],
    }),
  ],
});

export const objectTypes = [
  richBlock,
  metric,
  capability,
  navItem,
  navGroup,
  socialLink,
  footerColumn,
];
