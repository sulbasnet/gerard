import Link from 'next/link';
import Image from 'next/image';
import { path, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/getDictionary';
import { ArrowDown } from './Icons';
import Reveal from './Reveal';

/**
 * The portrait is the only full-colour image on the site.
 *
 * The source is 1200×630 with the subject centred and a bright stone wall
 * behind him. Two things follow, both handled in CSS: the media layer is
 * inset from the left on desktop so he sits right of the headline instead of
 * behind it, and the image is darkened so the cream navigation stays legible
 * over the wall. See globals.css §9.
 */
export default function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="hero">
      <div className="hero__media">
        <Image
          src="/images/hero-portrait.webp"
          alt={dict.hero.portraitAlt}
          className="hero__img"
          fill
          priority
          // The original is already a compact WebP. 85 produces a visually
          // indistinguishable responsive derivative while avoiding an
          // unnecessarily expensive hero-image encode and download.
          quality={85}
          sizes="(max-width: 899px) 100vw, 70vw"
        />
      </div>
      <div className="hero__scrim" />

      <div className="container hero__inner">
        <div className="hero__content">
          {/* Name first, descriptor second. On a site whose whole subject is
              one person, the name is the headline and the keyword line reads
              as its subtitle — an eyebrow above would delay the strongest
              element on the page. */}
          <Reveal>
            <h1 className="t-hero">
              {dict.hero.firstName}
              <br />
              {dict.hero.lastName}
            </h1>
          </Reveal>

          <Reveal delayIndex={1}>
            <hr className="rule hero__rule" />
            <p className="hero__eyebrow t-eyebrow">{dict.hero.eyebrow}</p>
          </Reveal>

          <Reveal delayIndex={2}>
            <p className="t-body-lg hero__tagline measure">{dict.hero.tagline}</p>
          </Reveal>

          <Reveal delayIndex={3}>
            <div className="hero__actions">
              <Link href={path(locale, 'author')} className="btn btn--primary t-label">
                {dict.hero.primaryCta}
              </Link>
              <Link href={path(locale, 'books')} className="btn btn--ghost t-label">
                {dict.hero.secondaryCta}
              </Link>
            </div>

            <span className="hero__scroll t-meta">
              <ArrowDown />
              {dict.hero.scroll}
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
