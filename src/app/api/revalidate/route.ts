import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const typeToTag: Record<string, string> = {
  siteSettings: "site-settings",
  service: "services",
  industry: "industries",
  caseStudy: "case-studies",
  insight: "insights",
  leader: "leaders",
  job: "jobs",
  legalDoc: "legal",
};

function isAuthorized(request: Request): boolean {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
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

  let payload: { _type?: string; tags?: string[] } = {};
  try {
    payload = await request.json();
  } catch {
    payload = {};
  }

  const tags = new Set<string>(payload.tags ?? []);
  if (payload._type && typeToTag[payload._type]) {
    tags.add(typeToTag[payload._type]);
  }

  if (tags.size === 0) {
    return NextResponse.json(
      { message: "No matching cache tags in payload", revalidated: [] },
      { status: 200 },
    );
  }

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  return NextResponse.json({
    revalidated: [...tags],
    now: Date.now(),
  });
}
