import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '@/constants/language';
import { routeTranslations } from '@/constants/routes';
import { allowedOrigins, corsHeaders } from "./configs/sites";
import {
  API_AUTH_PREFIX,
  AUTH_ROUTE_PREFIX,
  PUBLIC_ROUTES,
  USER_PROTECTED_ROUTES,
  ADMIN_PROTECTED_ROUTES,
  AUTH_SIGNOUT_ROUTES,
} from "./configs/routes";

export async function middleware(req: NextRequest) {
  const url = new URL(req.url);
  let pathname = url.pathname;
  let response = NextResponse.next();

  // Skip middleware for static and API routes early
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/monitoring') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname.startsWith('/admin')
  ) {
    return response;
  }

  // CORS handling
  const requestOrigin = req.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.some((allowed) => {
    if (typeof allowed !== 'string') return false;
    if (allowed.includes("*")) {
      const regex = new RegExp("^" + allowed.replace("*", ".*") + "$");
      return regex.test(requestOrigin);
    }
    return allowed === requestOrigin;
  });

  if (isAllowedOrigin && requestOrigin) {
    response.headers.set("Access-Control-Allow-Origin", requestOrigin);
    // If credentials are needed, allow them:
    response.headers.set("Access-Control-Allow-Credentials", "true");
  } else {
    response.headers.set("Access-Control-Allow-Origin", "*");
  }

  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  if (req.method === "OPTIONS") {
    return response;
  }

  // Normalize URL: remove trailing slash (except for root)
  if (pathname.endsWith("/") && pathname !== "/") {
    pathname = pathname.slice(0, -1);
    const newUrl = new URL(pathname, req.url);
    newUrl.search = url.search;
    return NextResponse.redirect(newUrl);
  }

  // Language and deep slug translation handling
  try {
    const segments = pathname.split('/').filter(Boolean);

    // Check if the first segment is a supported language.
    const langSegment = segments[0];
    if (!SUPPORTED_LANGUAGES.includes(langSegment)) {
      // Unsupported or missing language - redirect to URL with default language
      const newPath = pathname === "/" ? `/${DEFAULT_LANGUAGE}` : `/${DEFAULT_LANGUAGE}${pathname}`;
      const newUrl = new URL(newPath, req.url);
      newUrl.search = url.search;
      console.log(`Redirecting unsupported language to default: ${newUrl.toString()}`);
      return NextResponse.redirect(newUrl);
    }

    // Current language from the URL.
    const currentLang = langSegment;
    let changed = false;

    // Iterate over every segment after the language segment.
    for (let i = 1; i < segments.length; i++) {
      const originalSeg = segments[i];
      let correctedSeg = originalSeg;

      // Check against all other supported languages.
      for (const otherLang of SUPPORTED_LANGUAGES) {
        if (otherLang === currentLang) continue;

        const translations = routeTranslations[otherLang] || {};
        // Loop over each translation key for the other language.
        for (const [key, value] of Object.entries(translations)) {
          if (value === originalSeg) {
            // If the current language has a translation for this key, use it.
            const candidate = routeTranslations[currentLang]?.[key];
            if (candidate && candidate !== originalSeg) {
              correctedSeg = candidate;
              break;
            }
          }
        }
        if (correctedSeg !== originalSeg) break;
      }

      if (correctedSeg !== originalSeg) {
        console.log(`Segment ${i} translated from "${originalSeg}" to "${correctedSeg}"`);
        segments[i] = correctedSeg;
        changed = true;
      }
    }

    // If any segment was changed, redirect to the correct URL.
    if (changed) {
      const newPathname = '/' + segments.join('/');
      const newUrl = new URL(newPathname, req.url);
      newUrl.search = url.search;
      return NextResponse.redirect(newUrl);
    }
  } catch (error) {
    console.error('Language/slug redirect error:', error);
    return response;
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files, images, favicon, admin, and API routes
    '/((?!_next/static|_next/image|favicon.ico|admin|api/payload|monitoring).*)',
  ],
};
