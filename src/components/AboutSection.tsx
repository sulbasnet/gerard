import Link from 'next/link';
import Image from 'next/image';
import { path, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/getDictionary';
import Reveal from './Reveal';

export default function AboutSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="band about">
      <div className="about__grid">
        {/* The portrait is used here as an introduction to the Author page.
            It remains in its original colour treatment throughout the site. */}
        <div className="about__media">
          <Image
            src="/images/portrait-color.jpg"
            alt={dict.about.photoAlt}
            fill
            sizes="(max-width: 899px) min(100vw, 400px), 460px"
          />
        </div>

        <div className="about__body">
          <Reveal>
            <p className="t-eyebrow">{dict.about.eyebrow}</p>
            <h2 className="t-display about__headline">{dict.about.headline}</h2>
            <p className="about__text measure">{dict.about.body}</p>
            <Link href={path(locale, 'author')} className="arrow-link t-label">
              {dict.about.link} <span className="arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
