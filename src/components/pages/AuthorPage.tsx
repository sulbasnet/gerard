import Link from 'next/link';
import Image from 'next/image';
import { books } from '@/content/books';
import { path, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/getDictionary';
import Reveal from '../Reveal';
import Timeline from '../Timeline';
import NextStep from '../NextStep';
import ArchiveGallery from '../ArchiveGallery';
import PressList from '../PressList';

export default function AuthorPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const a = dict.pages.author;

  return (
    <>
      <section className="band author">
        <div className="container">
          <Reveal className="author__intro">
            <h1 className="t-display">{a.title}</h1>
            <hr className="rule" />
          </Reveal>

          <div className="author__grid">
            <Reveal className="author__text">
              <p className="t-body-lg author__lead measure">{a.lead}</p>
              {a.body.map((p, i) => (
                <p key={i} className="measure">{p}</p>
              ))}

            </Reveal>

            {/* Sticky on desktop so the portrait stays with the reader.
                The source is 450x600 — exactly the 3:4 frame, so it fills
                without cropping and without being upscaled sideways. */}
            <Reveal delayIndex={1} className="author__media">
              <Image
                src="/images/portrait-color.jpg"
                alt={dict.about.photoAlt}
                fill
                sizes="(max-width: 899px) 100vw, 35vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="band band--light editorial-paper-band author__timeline-band">
        <div className="container">
          <Reveal>
            <div className="timeline__head">
              <h2 className="t-section">{a.timelineTitle}</h2>
              <hr className="rule" />
            </div>
          </Reveal>
          <Timeline dict={dict} />
        </div>
      </section>

      <section className="band author-archive-band">
        <div className="container">
          <Reveal>
            <div className="section-head author-archive__head">
              <h2 className="t-section">{a.archiveTitle}</h2>
              <hr className="rule" />
            </div>
          </Reveal>

          <ArchiveGallery dict={dict} />
        </div>
      </section>

      <section className="band band--light editorial-paper-band author__press-band">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <h2 className="t-section">{a.pressTitle}</h2>
              <hr className="rule" />
            </div>
          </Reveal>
          <PressList locale={locale} />
        </div>
      </section>

      <section className="band">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <h2 className="t-section">{a.booksTitle}</h2>
              <hr className="rule" />
            </div>
          </Reveal>

          <div className="books__covers author__books">
            {books.map((book, i) => (
              <Reveal key={book.slug} delayIndex={i}>
                <Link href={`${path(locale, 'books')}/${book.slug}`} className="book-card">
                  <div className="book-card__cover">
                    <Image
                      src={book.cover}
                      alt={dict.books.coverAlt.replace('{title}', book.title)}
                      width={1000}
                      height={1500}
                      sizes="(max-width: 599px) min(56vw, 220px), 200px"
                    />
                  </div>
                  <div className="book-card__meta t-meta">{book.year}</div>
                  <span className="book-card__read-more t-label">
                    {dict.books.readMore} <span className="arrow">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <NextStep
        eyebrow={a.nextEyebrow}
        title={a.nextTitle}
        label={a.nextCta}
        href={path(locale, 'books')}
        tone="light"
      />
    </>
  );
}
