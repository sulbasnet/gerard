import Link from 'next/link';
import { locales, localeNames, path, type Locale, type RouteKey } from '@/i18n/config';
import type { Dictionary } from '@/i18n/getDictionary';
import { Facebook, Instagram, TikTok, YouTube } from './Icons';

const NAV: { key: RouteKey; label: keyof Dictionary['nav'] }[] = [
  { key: 'home', label: 'home' },
  { key: 'author', label: 'author' },
  { key: 'books', label: 'books' },
  { key: 'videos', label: 'videos' },
  { key: 'contact', label: 'contact' },
];

const SOCIALS = [
  { name: 'YouTube', href: 'https://www.youtube.com/@gerardfaureofficial', Icon: YouTube },
  { name: 'Instagram', href: 'https://www.instagram.com/gerardfaureofficial', Icon: Instagram },
  { name: 'TikTok', href: 'https://www.tiktok.com/@gerardfaureofficial', Icon: TikTok },
  { name: 'Facebook', href: 'https://www.facebook.com/people/G%C3%A9rard-Faur%C3%A9/61593260326104/', Icon: Facebook },
];

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <span className="wordmark">Gérard Fauré</span>
          <p className="footer__tagline t-meta">{dict.footer.tagline}</p>
          <div className="footer__social">
            {SOCIALS.map(({ name, href, Icon }) => (
              <a key={name} href={href} aria-label={name} target="_blank" rel="noopener noreferrer">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <span className="footer__colTitle">{dict.footer.navigation}</span>
          <ul className="footer__list">
            {NAV.map(({ key, label }) => (
              <li key={key}>
                <Link href={path(locale, key)}>{dict.nav[label]}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {/* Only the two pages that are legally required. No CGV (nothing is
              sold) and no cookie policy (analytics are cookieless). */}
          <span className="footer__colTitle">{dict.footer.information}</span>
          <ul className="footer__list">
            <li><Link href={path(locale, 'legal')}>{dict.footer.legal}</Link></li>
            <li><Link href={path(locale, 'privacy')}>{dict.footer.privacy}</Link></li>
          </ul>
        </div>

        <div>
          <span className="footer__colTitle">{dict.footer.languages}</span>
          <ul className="footer__list">
            {locales.map((code) => (
              <li key={code}>
                <Link
                  href={path(code, 'home')}
                  className={code === locale ? 'is-current' : ''}
                  hrefLang={code}
                >
                  {localeNames[code]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <blockquote className="footer__quote">
          <span className="footer__quoteMark" aria-hidden="true">&ldquo;</span>
          <p className="footer__quoteText">{dict.footer.quote}</p>
          <cite className="t-meta">— {dict.footer.quoteAuthor}</cite>
        </blockquote>
      </div>

      <div className="container footer__bottom t-meta">
        <span>© {new Date().getFullYear()} Gérard Fauré. {dict.footer.rights}</span>
        <span>gerardfaure.fr</span>
      </div>
    </footer>
  );
}
