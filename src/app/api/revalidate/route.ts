import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const ALLOWED_TAGS = new Set([
  "services",
  "specialties",
  "stories",
  "insights",
  "providers",
  "roles",
  "legal",
  "site-settings",
]);

function isAuthorized(request: Request): boolean {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return false;

  const url = new URL(request.url);
  const fromQuery = url.searchParams.get("secret");
  const header = request.headers.get("authorization");
  const fromHeader = header?.replace(/^Bearer\s+/i, "");

  return fromQuery === secret || fromHeader === secret;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let payload: { tags?: unknown } = {};
  try {
    payload = await request.json();
  } catch {
    payload = {};
  }

  const requested = Array.isArray(payload.tags)
    ? payload.tags.filter(
        (tag): tag is string => typeof tag === "string" && ALLOWED_TAGS.has(tag),
      )
    : [];

  if (requested.length === 0) {
    return NextResponse.json(
      { message: "No valid cache tags provided", revalidated: [] },
      { status: 200 },
    );
  }

  for (const tag of requested) {
    revalidateTag(tag, "max");
  }

  return NextResponse.json({ revalidated: requested, now: Date.now() });
}
