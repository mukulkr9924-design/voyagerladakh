import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, splitLocale } from "@/lib/i18n";

// Every site page lives under app/[lang]. English keeps its prefix-free addresses: /about is served
// from /en/about without the visitor seeing it, and /en/about redirects to /about so each page has
// one address. French and Hebrew pages (/fr/…, /he/…) pass straight through.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (splitLocale(pathname).locale !== DEFAULT_LOCALE) return;

  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Not the Studio, API routes, Next's own files, or files like /sitemap.xml and /favicon-32.png.
  matcher: ["/((?!api/|studio|_next/|_vercel/|.*\\.[\\w]+$).*)"],
};
