import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BookDetailPage from '@/components/pages/BookDetailPage';
import JsonLd from '@/components/JsonLd';
import { books, getBook } from '@/content/books';
import { isLocale, locales, path, routes, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';

const SITE = 'https://gerardfaure.fr';

/** Only the books segment has children, so anything else 404s. */
function isBooksSegment(locale: Locale, segment: string) {
  return routes.books[locale] === segment;
}

export function generateStaticParams() {
  const params: { locale: string; segment: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const book of books) {
      params.push({ locale, segment: routes.books[locale], slug: book.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; segment: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, segment, slug } = await params;
  if (!isLocale(locale) || !isBooksSegment(locale, segment)) return {};

  const book = getBook(slug);
  if (!book) return {};

  return {
    metadataBase: new URL(SITE),
    title: `${book.title} — Gérard Fauré`,
    description: book.synopsis[locale][0],
    alternates: {
      canonical: `${SITE}${path(locale, 'books')}/${slug}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE}${path(l, 'books')}/${slug}`]),
      ),
    },
    openGraph: {
      title: `${book.title} — Gérard Fauré`,
      description: book.synopsis[locale][0],
      url: `${SITE}${path(locale, 'books')}/${slug}`,
      images: [{ url: `${SITE}${book.cover}`, width: 1000, height: 1500, alt: `Cover of ${book.title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${book.title} — Gérard Fauré`,
      description: book.synopsis[locale][0],
      images: [`${SITE}${book.cover}`],
    },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ locale: string; segment: string; slug: string }>;
}) {
  const { locale, segment, slug } = await params;
  if (!isLocale(locale)) notFound();

  const l = locale as Locale;
  if (!isBooksSegment(l, segment)) notFound();

  const book = getBook(slug);
  if (!book) notFound();

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Book',
          '@id': `${SITE}${path(l, 'books')}/${slug}#book`,
          name: book.title,
          url: `${SITE}${path(l, 'books')}/${slug}`,
          image: `${SITE}${book.cover}`,
          datePublished: String(book.year),
          isbn: book.isbn,
          numberOfPages: book.pages,
          publisher: { '@type': 'Organization', name: book.publisher },
          inLanguage: 'fr',
          author: { '@id': `${SITE}/#gerard-faure` },
        }}
      />
      <BookDetailPage book={book} locale={l} dict={getDictionary(l)} />
    </>
  );
}
