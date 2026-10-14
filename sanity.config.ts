"use client";

import { defineConfig } from "sanity";
import { structureTool, type StructureResolver } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

const singletonTypes = new Set(["siteSettings"]);

const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.has(item.getId() ?? ""),
      ),
    ]);

export default defineConfig({
  name: "apex-horizon",
  title: "Apex Horizon",
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  basePath: "/studio",
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure }), visionTool()],
});
