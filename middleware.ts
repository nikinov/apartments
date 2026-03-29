import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";

const LOCALE_COOKIE = "NEXT_LOCALE";

function getPreferredLocale(request: NextRequest): Locale {
  // 1. Check cookie (user's explicit choice)
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  // 2. Check Vercel geo-detection header (automatic region detection)
  const country = request.headers.get("x-vercel-ip-country");
  if (country) {
    const countryToLocale: Record<string, Locale> = {
      // Spanish-speaking
      ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es",
      VE: "es", EC: "es", GT: "es", CU: "es", BO: "es", DO: "es",
      HN: "es", PY: "es", SV: "es", NI: "es", CR: "es", PA: "es",
      UY: "es", PR: "es",
      // Portuguese-speaking
      PT: "pt", BR: "pt", AO: "pt", MZ: "pt",
      // French-speaking
      FR: "fr", BE: "fr", CH: "fr", CA: "fr", SN: "fr", CI: "fr",
      ML: "fr", CM: "fr", MG: "fr", LU: "fr", MC: "fr",
      // Czech
      CZ: "cs",
      // German-speaking
      DE: "de", AT: "de", LI: "de",
      // Italian
      IT: "it", SM: "it", VA: "it",
      // Polish
      PL: "pl",
      // Dutch-speaking
      NL: "nl", SR: "nl",
      // Greek
      GR: "el", CY: "el",
      // Slovak
      SK: "sk",
      // Hungarian
      HU: "hu",
      // English-speaking (default)
      US: "en", GB: "en", AU: "en", NZ: "en", IE: "en", ZA: "en",
      IN: "en", NG: "en", KE: "en", GH: "en", JM: "en", TT: "en",
    };
    const geoLocale = countryToLocale[country];
    if (geoLocale) return geoLocale;
  }

  // 3. Parse Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const parsed = acceptLanguage
      .split(",")
      .map((part) => {
        const [lang, qPart] = part.trim().split(";");
        const q = qPart ? parseFloat(qPart.split("=")[1]) : 1;
        return { lang: lang.trim().toLowerCase(), q };
      })
      .sort((a, b) => b.q - a.q);

    for (const { lang } of parsed) {
      // Exact match (e.g., "cs")
      if (locales.includes(lang as Locale)) return lang as Locale;
      // Language prefix match (e.g., "en-US" -> "en")
      const prefix = lang.split("-")[0];
      if (locales.includes(prefix as Locale)) return prefix as Locale;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, api routes, and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/properties/") && pathname.match(/\.(png|jpg|jpeg|webp|avif|svg|ico)$/) ||
    pathname.match(/\.(png|jpg|jpeg|webp|avif|svg|ico|css|js|json|txt|xml|woff|woff2|ttf|eot)$/) ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a valid locale prefix
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameLocale) {
    // Already has locale - continue
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, pathnameLocale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  // No locale in path - detect and redirect
  const detectedLocale = getPreferredLocale(request);
  const newUrl = new URL(`/${detectedLocale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;

  const response = NextResponse.redirect(newUrl);
  response.cookies.set(LOCALE_COOKIE, detectedLocale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except static files
    "/((?!_next/static|_next/image|favicon.ico|properties/.*\\..+|.*\\.(?:png|jpg|jpeg|webp|avif|svg|ico|css|js|json|txt|xml|woff|woff2|ttf|eot)).*)",
  ],
};
