import Link from 'next/link';
import Image from 'next/image';
import { books } from '@/content/books';
import { path, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/getDictionary';
import Reveal from './Reveal';

export default function BooksSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="band band--light editorial-paper-band">
      <div className="container books__grid">
        <Reveal>
          <p className="t-eyebrow">{dict.books.eyebrow}</p>
          <h2 className="t-display books__headline">{dict.books.headline}</h2>
          <Link href={path(locale, 'books')} className="arrow-link t-label">
            {dict.books.link} <span className="arrow">→</span>
          </Link>
        </Reveal>

        <div className="books__covers">
          {books.map((book, i) => (
            <Reveal key={book.slug} delayIndex={i}>
              <Link
                href={`${path(locale, 'books')}/${book.slug}`}
                className="book-card books__card"
              >
                <div className="book-card__cover">
                  <Image
                    src={book.cover}
                    alt={dict.books.coverAlt.replace('{title}', book.title)}
                    width={1000}
                    height={1500}
                    sizes="(max-width: 599px) min(56vw, 220px), (max-width: 899px) 33vw, 28vw"
                  />
                </div>
                {/* `inFrench` is deliberately empty in fr.json — a French
                    reader needs no note that the book is in French. It is not
                    a missing translation. */}
                <div className="book-card__meta t-meta">
                  {book.year}
                  {dict.books.inFrench ? ` · ${dict.books.inFrench}` : ''}
                  <span className="books__cardCue" aria-hidden="true">→</span>
                </div>
                <span className="book-card__read-more t-label">
                  {dict.books.readMore} <span className="arrow">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
