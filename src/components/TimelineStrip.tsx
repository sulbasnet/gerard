import Link from 'next/link';
import { path, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/getDictionary';
import { timelineIcons } from './Icons';
import Reveal from './Reveal';

/**
 * Home-page teaser for the biography. The full vertical timeline lives on
 * the Author page; this is the five-milestone summary that links to it.
 * Horizontal on desktop, stacked on mobile — nothing is ever hidden in a
 * horizontal scroll the visitor has to discover.
 */
export default function TimelineStrip({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="band band--light">
      <div className="container">
        <Reveal>
          <div className="timeline__head">
            <h2 className="t-section">{dict.timeline.title}</h2>
            <hr className="rule" />
          </div>
        </Reveal>

        <ol className="timeline__list">
          {dict.timeline.items.map((item, i) => {
            const Icon = timelineIcons[i] ?? timelineIcons[0];
            return (
              <Reveal as="li" key={item.label} delayIndex={i} className="timeline__item">
                <span className="timeline__icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="timeline__label">{item.label}</span>
                <p className="timeline__text">{item.text}</p>
              </Reveal>
            );
          })}
        </ol>

        <Reveal>
          <div className="timeline__foot">
            <Link href={path(locale, 'author')} className="arrow-link t-label">
              {dict.timeline.link} <span className="arrow">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
