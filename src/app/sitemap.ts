import type { MetadataRoute } from 'next';

import { books } from '@/content/books';
import { locales, path } from '@/i18n/config';

const SITE = 'https://gerardfaure.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push(
      { url: `${SITE}${path(locale, 'home')}`, lastModified, changeFrequency: 'weekly', priority: 1 },
      { url: `${SITE}${path(locale, 'author')}`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
      { url: `${SITE}${path(locale, 'books')}`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
      { url: `${SITE}${path(locale, 'videos')}`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
      { url: `${SITE}${path(locale, 'contact')}`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
      { url: `${SITE}${path(locale, 'legal')}`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
      { url: `${SITE}${path(locale, 'privacy')}`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    );

    for (const book of books) {
      entries.push({
        url: `${SITE}${path(locale, 'books')}/${book.slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return entries;
}
