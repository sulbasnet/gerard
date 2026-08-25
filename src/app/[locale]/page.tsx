import { notFound } from 'next/navigation';

import AboutSection from '@/components/AboutSection';
import BooksSection from '@/components/BooksSection';
import Hero from '@/components/Hero';
import TimelineStrip from '@/components/TimelineStrip';
import VideosNewsletter from '@/components/VideosNewsletter';
import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const l = locale as Locale;
  const dict = getDictionary(l);

  return (
    <>
      <Hero locale={l} dict={dict} />
      <BooksSection locale={l} dict={dict} />
      <AboutSection locale={l} dict={dict} />
      <TimelineStrip locale={l} dict={dict} />
      <VideosNewsletter locale={l} dict={dict} />
    </>
  );
}
