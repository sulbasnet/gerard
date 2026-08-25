import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const attempts = new Map<string, { count: number; resetsAt: number }>();
const subjects = new Set(['press', 'event', 'reader', 'other']);
const locales = new Set(['fr', 'en', 'es']);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRateLimited(key: string) {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || entry.resetsAt <= now) {
    attempts.set(key, { count: 1, resetsAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

function text(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const clientKey = forwardedFor || request.headers.get('x-real-ip') || 'unknown';

  if (isRateLimited(clientKey)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Silently accept honeypot submissions so automated senders receive no clue.
  if (text(body.company)) return NextResponse.json({ ok: true });

  const name = text(body.name);
  const email = text(body.email).toLowerCase();
  const subject = text(body.subject);
  const message = text(body.message);
  const locale = text(body.locale);

  if (
    name.length < 2 || name.length > 100 ||
    email.length > 254 || !emailPattern.test(email) ||
    !subjects.has(subject) ||
    message.length < 10 || message.length > 5000 ||
    !locales.has(locale)
  ) {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || 'hello@gerardfaure.fr';
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    console.error('Contact email is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL.');
    return NextResponse.json({ error: 'Email service unavailable' }, { status: 503 });
  }

  const labels: Record<string, string> = {
    press: 'Press',
    event: 'Signing or event',
    reader: 'Reader message',
    other: 'Other',
  };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'gerardfaure.fr/contact-form',
      'Idempotency-Key': crypto.randomUUID(),
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `[gerardfaure.fr] ${labels[subject]} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nLanguage: ${locale}\nSubject: ${labels[subject]}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    console.error('Email provider rejected a contact submission.', response.status);
    return NextResponse.json({ error: 'Unable to send email' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
