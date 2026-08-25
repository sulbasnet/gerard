import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import JsonLd from '@/components/JsonLd';
import MotionProvider from '@/components/MotionProvider';
import { isLocale, locales, path, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import '@/styles/globals.css';

const SITE = 'https://gerardfaure.fr';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(SITE),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `${SITE}${path(locale, 'home')}`,
      languages: {
        fr: `${SITE}/`,
        es: `${SITE}/es`,
        en: `${SITE}/en`,
        'x-default': `${SITE}/`,
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${SITE}${path(locale, 'home')}`,
      siteName: 'Gérard Fauré',
      locale,
      type: 'website',
      images: [{ url: `${SITE}/opengraph-image`, width: 1200, height: 630, alt: 'Gérard Fauré — Writer and witness' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
      images: [`${SITE}/opengraph-image`],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale as Locale);

  return (
    // lang must be set per locale or screen readers pronounce the page wrong
    <html lang={locale}>
      <body>
        <a className="skip-link" href="#main-content">{dict.nav.skipToContent}</a>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': `${SITE}/#website`,
                url: SITE,
                name: 'Gérard Fauré',
                inLanguage: locale,
              },
              {
                '@type': 'Person',
                '@id': `${SITE}/#gerard-faure`,
                name: 'Gérard Fauré',
                url: SITE,
                image: `${SITE}/images/portrait-square.jpg`,
                jobTitle: 'Writer',
                description: dict.meta.description,
              },
            ],
          }}
        />
        {/* Unsharp mask for the hero portrait. The source is a 1200x630 file
            at 0.26 bits/pixel, so it is both small and heavily compressed;
            being upscaled to fill the hero softens it further. CSS has no
            sharpen primitive, so this SVG convolution supplies one.
            Kernel sums to 1 so overall brightness is unchanged, and sRGB
            interpolation stops the filter shifting the colour grade. */}
        <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
          <filter id="portrait-sharpen" colorInterpolationFilters="sRGB">
            <feConvolveMatrix
              order="3"
              preserveAlpha="true"
              kernelMatrix="0 -0.38 0 -0.38 2.52 -0.38 0 -0.38 0"
            />
          </filter>
        </svg>

        <MotionProvider>
          <Header locale={locale as Locale} dict={dict} />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer locale={locale as Locale} dict={dict} />
        </MotionProvider>
      </body>
    </html>
  );
}
