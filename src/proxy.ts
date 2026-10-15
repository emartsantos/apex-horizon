import { NextResponse, type NextRequest } from "next/server";
import { getAuth0, isAuth0Configured } from "@/lib/auth0";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const configured = isAuth0Configured();

  if (pathname.startsWith("/auth")) {
    if (!configured) {
      return NextResponse.redirect(new URL("/setup", request.url));
    }
    return getAuth0().middleware(request);
  }

  const response = configured
    ? await getAuth0().middleware(request)
    : NextResponse.next();

  if (pathname.startsWith("/admin")) {
    if (!configured) {
      return NextResponse.redirect(new URL("/setup", request.url));
    }

    const session = await getAuth0().getSession(request);
    if (!session?.user) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("returnTo", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff|woff2)).*)",
  ],
};
