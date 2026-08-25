import Link from 'next/link';
import Image from 'next/image';
import { books, type Book } from '@/content/books';
import { path, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/getDictionary';
import Reveal from '../Reveal';

export default function BookDetailPage({
  book,
  locale,
  dict,
}: {
  book: Book;
  locale: Locale;
  dict: Dictionary;
}) {
  const b = dict.pages.books;
  const readingPath = [...books].sort((a, b) => a.readingOrder - b.readingOrder);
  const currentIndex = readingPath.findIndex((x) => x.slug === book.slug);
  const previousBook = currentIndex > 0 ? readingPath[currentIndex - 1] : undefined;
  const nextBook = currentIndex < readingPath.length - 1 ? readingPath[currentIndex + 1] : undefined;
  const others = readingPath.filter((x) => x.slug !== book.slug);

  const details: { label: string; value: string }[] = [
    { label: b.year, value: String(book.year) },
    { label: b.publisher, value: book.publisher },
    { label: b.isbn, value: book.isbn },
    { label: b.pages, value: book.pages },
    { label: b.language, value: b.languageValue },
  ];

  return (
    <>
      <section className="band book-detail">
        <div className="container">
          <Reveal>
            <Link href={path(locale, 'books')} className="arrow-link t-label book-detail__back">
              <span className="arrow arrow--back">←</span> {b.backToBooks}
            </Link>
          </Reveal>

          <div className="book-detail__grid">
            <Reveal className="book-detail__cover">
              <Image
                src={book.cover}
                alt={dict.books.coverAlt.replace('{title}', book.title)}
                width={1000}
                height={1500}
                sizes="(max-width: 899px) 220px, 240px"
                priority
              />
            </Reveal>

            <Reveal delayIndex={1} className="book-detail__body">
              <h1 className="t-display">{book.title}</h1>
              <hr className="rule book-detail__rule" />

              <h2 className="t-eyebrow book-detail__eyebrow">{b.synopsis}</h2>
              {book.synopsis[locale].map((p, i) => (
                <p key={i} className="measure">{p}</p>
              ))}

              {book.excerpt?.[locale] ? (
                <blockquote className="book-detail__excerpt">
                  {book.excerpt[locale]}
                </blockquote>
              ) : null}

              <section className="book-detail__info" aria-labelledby="book-details">
                <h2 id="book-details" className="t-eyebrow book-detail__infoTitle">{b.details}</h2>
                <dl className="book-detail__details">
                  {details.map((d) => (
                    <div key={d.label}>
                      <dt className="t-meta">{d.label}</dt>
                      <dd>{d.value}</dd>
                    </div>
                  ))}
                </dl>

                <a
                  className="book-detail__source t-meta"
                  href={book.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {b.bibliographicSource}: {book.sourceName} <span aria-hidden="true">↗</span>
                </a>

                <div className="book-detail__buy">
                  <h3 className="t-eyebrow">{b.buyTitle}</h3>
                  <p className="book-detail__buyBody">{b.buyBody}</p>
                  <div className="book-detail__buyOptions">
                    {book.buyOptions.map((option, index) => (
                      <a
                        key={option.url}
                        className={`btn ${index === 0 ? 'btn--primary' : 'btn--ghost'}`}
                        href={option.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {b.buyFrom.replace('{seller}', option.name)} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            </Reveal>
          </div>

          <Reveal>
            <nav className="book-detail__journey" aria-label={b.bookNavigation}>
              {previousBook ? (
                <Link
                  href={`${path(locale, 'books')}/${previousBook.slug}`}
                  className="book-detail__journey-link book-detail__journey-link--previous"
                >
                  <span className="t-meta">← {b.previousBook}</span>
                  <strong>{previousBook.title}</strong>
                </Link>
              ) : <span aria-hidden="true" />}

              {nextBook ? (
                <Link
                  href={`${path(locale, 'books')}/${nextBook.slug}`}
                  className="book-detail__journey-link book-detail__journey-link--next"
                >
                  <span className="t-meta">{b.nextBook} →</span>
                  <strong>{nextBook.title}</strong>
                </Link>
              ) : null}
            </nav>
          </Reveal>
        </div>
      </section>

      <section className="band band--light editorial-paper-band">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <h2 className="t-section">{b.others}</h2>
              <hr className="rule" />
            </div>
          </Reveal>

          <div className="books__covers book-detail__others">
            {others.map((o, i) => (
              <Reveal key={o.slug} delayIndex={i}>
                <Link href={`${path(locale, 'books')}/${o.slug}`} className="book-card">
                  <div className="book-card__cover">
                    <Image
                      src={o.cover}
                      alt={dict.books.coverAlt.replace('{title}', o.title)}
                      width={1000}
                      height={1500}
                      sizes="(max-width: 599px) min(56vw, 220px), 230px"
                    />
                  </div>
                  <h3 className="t-card book-card__title">{o.title}</h3>
                  <div className="book-card__meta t-meta">{o.year}</div>
                  <span className="book-card__read-more t-label">
                    {dict.books.readMore} <span className="arrow">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
