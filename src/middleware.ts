import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, locales } from './i18n/config';

/**
 * gerardfaure.fr is the French canonical site. French is served at the root,
 * while English and Spanish remain explicitly prefixed. The pages continue to
 * render through the existing [locale] route tree via an internal rewrite.
 *
 * Prefixed French URLs are intentionally unavailable: this site has not been
 * published with /fr URLs, so there is no legacy traffic or search equity to
 * migrate. Returning 404 prevents duplicate French pages from being indexed.
 * Do not auto-redirect the root from Accept-Language: visitors and crawlers
 * should receive the canonical French homepage at /.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // French has no public prefix. It is important not to let the internal
  // [locale] route make /fr/... available as duplicate public content.
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    return new NextResponse(null, { status: 404 });
  }

  // English and Spanish are public, locale-prefixed routes.
  const isNonDefaultLocale = locales
    .filter((locale) => locale !== defaultLocale)
    .some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  if (isNonDefaultLocale) return NextResponse.next();

  // All remaining matched paths are canonical French URLs. Rewrite internally
  // rather than redirecting so the visible URL remains clean.
  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

/**
 * Excludes:
 *  - api, _next, images, favicon.ico, anything with a file extension
 *  - Next's metadata-route special files that have NO extension:
 *    opengraph-image, apple-icon, icon, twitter-image. Without this,
 *    the middleware rewrote /opengraph-image → /fr/opengraph-image,
 *    which 404s — breaking every social-share preview on the site
 *    (found 24 Aug 2026 while checking production deployability).
 */
export const config = {
  matcher: ['/((?!api|_next|images|favicon\\.ico|opengraph-image|apple-icon|icon|twitter-image|.*\\..*).*)'],
};
