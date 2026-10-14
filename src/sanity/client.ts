import "server-only";
import { createClient } from "next-sanity";
import {
  apiVersion,
  dataset,
  isSanityConfigured,
  projectId,
  readToken,
} from "./env";

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: false,
  token: readToken,
});

export { isSanityConfigured };
