'use client';

import type { Dictionary } from '@/i18n/getDictionary';
import * as m from 'motion/react-m';
import { timelineIcons } from './Icons';
import Reveal from './Reveal';

/** Compact horizontal timeline on desktop, vertical reading path on smaller
 * screens. Separate animated connectors let each orientation draw along its
 * natural axis without relying on viewport JavaScript. */
export default function Timeline({ dict }: { dict: Dictionary }) {
  return (
    <ol className="vtimeline">
      {dict.timeline.items.map((item, i) => {
        const Icon = timelineIcons[i] ?? timelineIcons[0];
        return (
          <Reveal as="li" key={item.label} delayIndex={i} className="vtimeline__item">
            <span className="vtimeline__marker" aria-hidden="true">
              <Icon />
            </span>
            {i < dict.timeline.items.length - 1 ? (
              <span className="vtimeline__connector vtimeline__connector--mobile" aria-hidden="true">
                <m.span
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            ) : null}
            {i < dict.timeline.items.length - 1 ? (
              <span className="vtimeline__connector vtimeline__connector--desktop" aria-hidden="true">
                <m.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            ) : null}
            <div className="vtimeline__body">
              <span className="vtimeline__label">{item.label}</span>
              <p className="vtimeline__text">{item.text}</p>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
