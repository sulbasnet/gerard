'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { defaultLocale, isLocale, locales, localeNames, path, routes, type Locale, type RouteKey } from '@/i18n/config';
import type { Dictionary } from '@/i18n/getDictionary';
import { Chevron } from './Icons';

const NAV: { key: RouteKey; label: keyof Dictionary['nav'] }[] = [
  { key: 'home', label: 'home' },
  { key: 'author', label: 'author' },
  { key: 'books', label: 'books' },
  { key: 'videos', label: 'videos' },
  { key: 'contact', label: 'contact' },
];

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLangOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  // Treat the full-screen mobile menu like a dialog: move focus into it, keep
  // the keyboard inside its controls, lock the page, and return focus on close.
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const links = Array.from(mobileNavRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []);
    const controls = [burgerRef.current, ...links].filter(Boolean) as HTMLElement[];
    const focusTimer = window.setTimeout(() => links[0]?.focus(), 50);
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      burgerRef.current?.focus();
    };
  }, [menuOpen]);

  const focusLanguageItem = (index: number) => {
    const items = Array.from(langMenuRef.current?.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]') ?? []);
    if (!items.length) return;
    items[(index + items.length) % items.length]?.focus();
  };

  const openLanguageMenu = (index = 0) => {
    setLangOpen(true);
    requestAnimationFrame(() => focusLanguageItem(index));
  };

  /* Prefix match for sub-pages, so "Livres" stays lit on a book detail page.
     Home is exact-only, otherwise it would match everything. */
  const isActive = (key: RouteKey) => {
    const target = path(locale, key);
    if (key === 'home') return pathname === target;
    return pathname === target || pathname.startsWith(`${target}/`);
  };

  /* The wordmark duplicates the hero on the home page, where the name is
     already set enormous a few pixels below it. So it stays hidden there
     until the hero scrolls away — and is always present on every other page,
     where it is the branding and the way back home. Deleting it outright
     would have cost those pages both. */
  const onHome = pathname === path(locale, 'home');
  const showWordmark = !onHome || scrolled;

  /**
   * Keep the visitor on the same page when they change language.
   *
   * French lives at the root; English and Spanish are prefixed. The route
   * segment itself is localized (`livres` / `libros` / `books`), so it has to
   * be translated rather than carried across. Deeper parts (a book slug) are
   * locale-independent and pass through unchanged.
   */
  const swapLocale = (next: Locale) => {
    const parts = pathname.split('/').filter(Boolean);
    const sourceLocale = isLocale(parts[0] ?? '') ? parts.shift() as Locale : defaultLocale;
    const segment = parts.shift();
    if (!segment) return path(next, 'home');

    const key = (Object.keys(routes) as RouteKey[]).find(
      (k) => routes[k][sourceLocale] === segment,
    );
    // Unknown segment: send them to the home page of the target language
    // rather than to a URL we know is broken.
    if (!key) return path(next, 'home');

    const tail = parts.length ? `/${parts.join('/')}` : '';
    return `${path(next, key)}${tail}`;
  };

  return (
    <>
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header__inner">
          <Link
            href={path(locale, 'home')}
            className={`wordmark ${showWordmark ? '' : 'is-hidden'}`}
          >
            Gérard Fauré
          </Link>

          <nav className="nav t-label" aria-label={dict.nav.home}>
            {NAV.map(({ key, label }) => (
              <Link
                key={key}
                href={path(locale, key)}
                className={`nav__link ${isActive(key) ? 'is-active' : ''}`}
                aria-current={isActive(key) ? 'page' : undefined}
              >
                {dict.nav[label]}
              </Link>
            ))}
          </nav>

          <div className="header__right">
            <span className="header__divider" aria-hidden="true" />

            <div className={`lang ${langOpen ? 'is-open' : ''}`} ref={langRef}>
              <button
                className="lang__toggle t-label"
                aria-expanded={langOpen}
                aria-haspopup="menu"
                aria-controls="language-menu"
                aria-label={dict.nav.language}
                onClick={(e) => {
                  e.stopPropagation();
                  setLangOpen((v) => !v);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    openLanguageMenu(0);
                  } else if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    openLanguageMenu(-1);
                  }
                }}
              >
                {locale.toUpperCase()}
                <span className="lang__chevron">
                  <Chevron />
                </span>
              </button>

              {/* Native language names, never flags — no flag correctly
                  means "Spanish" for both Spain and Latin America. */}
              <div id="language-menu" className="lang__menu" role="menu" aria-label={dict.nav.language} ref={langMenuRef}>
                {locales.map((code, index) => (
                  <Link
                    key={code}
                    href={swapLocale(code)}
                    role="menuitem"
                    className={`lang__item ${code === locale ? 'is-current' : ''}`}
                    onClick={() => setLangOpen(false)}
                    onKeyDown={(event) => {
                      if (event.key === 'ArrowDown') {
                        event.preventDefault();
                        focusLanguageItem(index + 1);
                      } else if (event.key === 'ArrowUp') {
                        event.preventDefault();
                        focusLanguageItem(index - 1);
                      } else if (event.key === 'Home') {
                        event.preventDefault();
                        focusLanguageItem(0);
                      } else if (event.key === 'End') {
                        event.preventDefault();
                        focusLanguageItem(-1);
                      } else if (event.key === 'Escape') {
                        event.preventDefault();
                        setLangOpen(false);
                        langRef.current?.querySelector<HTMLButtonElement>('.lang__toggle')?.focus();
                      }
                    }}
                  >
                    <span className="lang__dot" aria-hidden="true" />
                    {localeNames[code]}
                  </Link>
                ))}
              </div>
            </div>

            <button
              ref={burgerRef}
              className={`burger ${menuOpen ? 'is-open' : ''}`}
              aria-label={menuOpen ? dict.nav.menuClose : dict.nav.menuOpen}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <m.nav
            key="mobile-navigation"
            id="mobile-navigation"
            ref={mobileNavRef}
            className="mobile-nav is-open"
            aria-label={dict.nav.home}
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              closed: { opacity: 0, pointerEvents: 'none', transition: { duration: 0.18, staggerChildren: 0.025, staggerDirection: -1 } },
              open: { opacity: 1, pointerEvents: 'auto', transition: { duration: 0.25, delayChildren: 0.06, staggerChildren: 0.06 } },
            }}
          >
            {NAV.map(({ key, label }) => (
              <m.div
                key={key}
                variants={{
                  closed: { opacity: 0, y: 10 },
                  open: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <Link href={path(locale, key)} onClick={() => setMenuOpen(false)}>
                  {dict.nav[label]}
                </Link>
              </m.div>
            ))}
          </m.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
