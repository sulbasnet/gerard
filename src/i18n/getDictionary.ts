import type { Locale } from './config';
import fr from './dictionaries/fr.json';
import es from './dictionaries/es.json';
import en from './dictionaries/en.json';

/** FR is the source of truth for shape; ES and EN must match it key for key. */
export type Dictionary = typeof fr;

const dictionaries: Record<Locale, Dictionary> = {
  fr,
  es: es as Dictionary,
  en: en as Dictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
