export const locales = ['fr', 'es', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

/** Native names — never flags. No flag correctly means "Spanish". */
export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  es: 'Español',
  en: 'English',
};

/**
 * Route segments per locale. The keys are stable across languages so the
 * language switcher can map any page to its translation.
 */
export const routes = {
  home: { fr: '', es: '', en: '' },
  author: { fr: 'auteur', es: 'autor', en: 'author' },
  books: { fr: 'livres', es: 'libros', en: 'books' },
  videos: { fr: 'videos', es: 'videos', en: 'videos' },
  contact: { fr: 'contact', es: 'contacto', en: 'contact' },
  legal: { fr: 'mentions-legales', es: 'aviso-legal', en: 'legal-notice' },
  privacy: { fr: 'confidentialite', es: 'privacidad', en: 'privacy' },
} as const;

export type RouteKey = keyof typeof routes;

/**
 * French is the editorial and geographic home of gerardfaure.fr, so it owns
 * the root URL. Other languages remain explicitly prefixed. Keeping this in
 * one helper makes navigation, canonicals, and the sitemap agree exactly.
 */
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? '' : `/${locale}`;
}

export function path(locale: Locale, key: RouteKey): string {
  const segment = routes[key][locale];
  const prefix = localePrefix(locale);
  return segment ? `${prefix}/${segment}` : prefix || '/';
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
