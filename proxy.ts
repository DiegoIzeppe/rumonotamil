import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "rn1000_session";

const PUBLIC_PATHS = ["/sign-in", "/api/auth/login", "/landing.html", "/checkout"];

const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
};

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const res = NextResponse.next();
  Object.entries(SECURITY_HEADERS).forEach(([k, v]) => res.headers.set(k, v));

  // Allow public paths, static assets, stripe webhook
  if (
    pathname === "/" ||
    PUBLIC_PATHS.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/stripe/webhook") ||
    pathname.match(/\.(ico|png|svg|jpg|jpeg|css|js|woff|woff2)$/)
  ) {
    return res;
  }

  // Protect dashboard pages — cookie presence check (HMAC validated in API routes)
  if (!pathname.startsWith("/api")) {
    const hasCookie = !!req.cookies.get(AUTH_COOKIE)?.value;
    if (!hasCookie) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
