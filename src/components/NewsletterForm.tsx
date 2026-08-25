'use client';

import { useState } from 'react';
import Link from 'next/link';
import { path, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/getDictionary';
import { Lock } from './Icons';

/**
 * With no purchase links on the site, this is the conversion — see
 * OUTLINE.md §1. Wire the submit handler to Brevo/Mailchimp with a
 * per-locale list segment so subscribers get email in their own language.
 */
export default function NewsletterForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [email, setEmail] = useState('');

  return (
    <div>
      <form
        className="newsletter__form"
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: POST to the newsletter provider, tagged with `locale`
        }}
      >
        <label className="sr-only" htmlFor="newsletter-email">
          {dict.newsletter.emailLabel}
        </label>
        <input
          id="newsletter-email"
          className="newsletter__input"
          type="email"
          required
          autoComplete="email"
          placeholder={dict.newsletter.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Honeypot — bots fill it, people never see it. No CAPTCHA. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sr-only"
        />
        <button type="submit" className="btn btn--primary t-label">
          {dict.newsletter.button}
        </button>
      </form>

      <p className="newsletter__consent">
        <Lock />
        <span>
          {dict.newsletter.consentBefore}
          <Link href={path(locale, 'privacy')}>{dict.newsletter.consentLink}</Link>
          {dict.newsletter.consentAfter}
        </span>
      </p>
    </div>
  );
}
