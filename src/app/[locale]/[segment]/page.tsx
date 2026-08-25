import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import AuthorPage from '@/components/pages/AuthorPage';
import BooksPage from '@/components/pages/BooksPage';
import ContactPage from '@/components/pages/ContactPage';
import TextPage from '@/components/pages/TextPage';
import VideosPage from '@/components/pages/VideosPage';
import { isLocale, locales, path, routes, type Locale, type RouteKey } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';

const SITE = 'https://gerardfaure.fr';

/**
 * Route segments differ per language (`auteur` / `autor` / `author`), so the
 * folder is a dynamic `[segment]` and the segment is resolved back to a
 * stable RouteKey here. That keeps one page component per key instead of one
 * folder per language, and it is what lets the language switcher map any
 * page to its translation.
 */
type PageKey = Exclude<RouteKey, 'home'>;

function resolveKey(locale: Locale, segment: string): PageKey | null {
  const entry = (Object.keys(routes) as RouteKey[]).find(
    (key) => routes[key][locale] === segment,
  );
  // `home` has an empty segment and is served by [locale]/page.tsx
  return entry && entry !== 'home' ? (entry as PageKey) : null;
}

export function generateStaticParams() {
  const params: { locale: string; segment: string }[] = [];
  for (const locale of locales) {
    for (const key of Object.keys(routes) as RouteKey[]) {
      const segment = routes[key][locale];
      if (segment) params.push({ locale, segment });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; segment: string }>;
}): Promise<Metadata> {
  const { locale, segment } = await params;
  if (!isLocale(locale)) return {};
  const key = resolveKey(locale, segment);
  if (!key) return {};

  const dict = getDictionary(locale);
  const titles: Record<PageKey, string> = {
    author: dict.pages.author.title,
    books: dict.pages.books.title,
    videos: dict.pages.videos.title,
    contact: dict.pages.contact.title,
    legal: dict.pages.legal.title,
    privacy: dict.pages.privacy.title,
  };

  return {
    metadataBase: new URL(SITE),
    title: `${titles[key]} — Gérard Fauré`,
    description: dict.meta.description,
    alternates: {
      canonical: `${SITE}${path(locale, key)}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE}${path(l, key)}`]),
      ),
    },
    openGraph: {
      title: `${titles[key]} — Gérard Fauré`,
      description: dict.meta.description,
      url: `${SITE}${path(locale, key)}`,
      images: [{ url: `${SITE}/opengraph-image`, width: 1200, height: 630, alt: 'Gérard Fauré — Writer and witness' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${titles[key]} — Gérard Fauré`,
      description: dict.meta.description,
      images: [`${SITE}/opengraph-image`],
    },
  };
}

export default async function SegmentPage({
  params,
}: {
  params: Promise<{ locale: string; segment: string }>;
}) {
  const { locale, segment } = await params;
  if (!isLocale(locale)) notFound();

  const key = resolveKey(locale, segment);
  if (!key) notFound();

  const l = locale as Locale;
  const dict = getDictionary(l);

  switch (key) {
    case 'author':
      return <AuthorPage locale={l} dict={dict} />;
    case 'books':
      return <BooksPage locale={l} dict={dict} />;
    case 'videos':
      return <VideosPage locale={l} dict={dict} />;
    case 'contact':
      return <ContactPage locale={l} dict={dict} />;
    case 'legal':
      return <TextPage title={dict.pages.legal.title} sections={dict.pages.legal.sections} />;
    case 'privacy':
      return <TextPage title={dict.pages.privacy.title} sections={dict.pages.privacy.sections} />;
    default:
      notFound();
  }
}
