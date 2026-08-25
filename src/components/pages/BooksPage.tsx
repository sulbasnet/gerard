import Link from 'next/link';
import Image from 'next/image';
import { books } from '@/content/books';
import { path, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/getDictionary';
import PageBanner from '../PageBanner';
import Reveal from '../Reveal';
import NextStep from '../NextStep';

export default function BooksPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const b = dict.pages.books;
  const readingPath = [...books].sort((a, b) => a.readingOrder - b.readingOrder);

  return (
    <>
      <PageBanner title={b.title} lead={b.lead} className="books-page__banner" />

      <section className="band band--light editorial-paper-band books-page__path-band">
        <div className="container">
          <Reveal>
            <div className="books-page__reading-path">
              <p className="t-eyebrow">{b.readingPathTitle}</p>
              <p className="measure">{b.readingPathLead}</p>

              <ol className="books-page__path-list" aria-label={b.readingPathTitle}>
                {readingPath.map((book, i) => (
                  <li key={book.slug} className="books-page__path-item">
                    <Link href={`${path(locale, 'books')}/${book.slug}`}>
                      <span className="books-page__path-number" aria-hidden="true">{i + 1}</span>
                      <span className="books-page__path-copy">
                        <strong>{book.title}</strong>
                        <span className="t-meta">{book.year}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <div className="books-grid">
            {readingPath.map((book, i) => (
              <Reveal key={book.slug} delayIndex={i}>
                <Link href={`${path(locale, 'books')}/${book.slug}`} className="book-card">
                  <div className="book-card__cover">
                    <Image
                      src={book.cover}
                      alt={dict.books.coverAlt.replace('{title}', book.title)}
                      width={1000}
                      height={1500}
                      sizes="(max-width: 639px) 300px, (max-width: 999px) 316px, 240px"
                      priority={i === 0}
                    />
                  </div>
                  <div className="book-card__sequence t-meta">
                    {b.readingStep.replace('{number}', String(i + 1))}
                  </div>
                  <h2 className="t-card book-card__title">{book.title}</h2>
                  <div className="book-card__meta t-meta">
                    {book.year}
                    {dict.books.inFrench ? ` · ${dict.books.inFrench}` : ''}
                  </div>
                  <p className="book-card__blurb">{book.synopsis[locale][0]}</p>
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
        eyebrow={b.nextEyebrow}
        title={b.nextTitle}
        label={b.nextCta}
        href={path(locale, 'videos')}
        tone="light"
      />
    </>
  );
}
