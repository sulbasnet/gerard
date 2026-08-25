'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { path, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/getDictionary';

export default function ContactForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.pages.contact;
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });

      if (!response.ok) throw new Error('Contact request failed');

      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form
      className="cform"
      onSubmit={handleSubmit}
      aria-busy={status === 'sending'}
    >
      <div className="cform__row">
        <label className="cform__label" htmlFor="cf-name">{c.name}</label>
        <input className="cform__input" id="cf-name" name="name" type="text" required minLength={2} maxLength={100} autoComplete="name" />
      </div>

      <div className="cform__row">
        <label className="cform__label" htmlFor="cf-email">{c.email}</label>
        <input className="cform__input" id="cf-email" name="email" type="email" required maxLength={254} autoComplete="email" />
      </div>

      <div className="cform__row">
        <label className="cform__label" htmlFor="cf-subject">{c.subject}</label>
        <select className="cform__input" id="cf-subject" name="subject" defaultValue="reader">
          <option value="press">{c.subjectPress}</option>
          <option value="event">{c.subjectEvent}</option>
          <option value="reader">{c.subjectReader}</option>
          <option value="other">{c.subjectOther}</option>
        </select>
      </div>

      <div className="cform__row">
        <label className="cform__label" htmlFor="cf-message">{c.message}</label>
        <textarea className="cform__input cform__textarea" id="cf-message" name="message" rows={6} required minLength={10} maxLength={5000} />
      </div>

      {/* Honeypot — bots fill it, people never see it */}
      <div className="cform__honeypot" aria-hidden="true">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="cform__consent">
        <input type="checkbox" name="consent" required />
        <span>
          {c.consentBefore}
          <Link href={path(locale, 'privacy')}>{c.consentLink}</Link>
          {c.consentAfter}
        </span>
      </label>

      <button type="submit" className="btn btn--primary t-label cform__submit" disabled={status === 'sending'}>
        {status === 'sending' ? c.sending : c.send}
      </button>

      <div className="cform__feedback" aria-live="polite" aria-atomic="true">
        {status === 'sent' ? (
          <p className="cform__sent t-meta">{c.sent}</p>
        ) : null}
        {status === 'error' ? (
          <p className="cform__error" role="alert">
            {c.error} <a href="mailto:hello@gerardfaure.fr">hello@gerardfaure.fr</a>
          </p>
        ) : null}
      </div>
    </form>
  );
}
