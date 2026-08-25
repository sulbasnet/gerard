import { pressItems } from '@/content/videos';
import type { Locale } from '@/i18n/config';
import Reveal from './Reveal';

const localeTags: Record<Locale, string> = {
  fr: 'fr-FR',
  en: 'en-GB',
  es: 'es-ES',
};

export default function PressList({ locale }: { locale: Locale }) {
  const formatter = new Intl.DateTimeFormat(localeTags[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <ul className="press-list">
      {pressItems.map((item, i) => (
        <Reveal as="li" key={item.url} delayIndex={i} className="press-list__item">
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <span className="press-list__identity">
              <span className="press-list__mark" aria-hidden="true">{item.mark}</span>
              <span>
                <span className="press-list__outlet">{item.outlet}</span>
                <span className="press-list__format t-meta">{item.format[locale]}</span>
              </span>
            </span>
            <span className="press-list__story">
              <span className="press-list__title">{item.title[locale]}</span>
              <span className="press-list__byline">{item.byline}</span>
            </span>
            <time className="press-list__date t-meta" dateTime={item.date}>
              {formatter.format(new Date(`${item.date}T12:00:00Z`))}
            </time>
          </a>
        </Reveal>
      ))}
    </ul>
  );
}
