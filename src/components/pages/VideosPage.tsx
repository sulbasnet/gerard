import { featuredVideos, pressItems } from '@/content/videos';
import { path, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/getDictionary';
import PageBanner from '../PageBanner';
import Reveal from '../Reveal';
import VideoGrid from '../VideoGrid';
import NextStep from '../NextStep';
import PressList from '../PressList';

export default function VideosPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const v = dict.pages.videos;

  return (
    <>
      <PageBanner title={v.title} lead={v.lead} />

      <section className="band videos-page__content">
        <div className="container videos-page">
          {featuredVideos.length > 0 ? (
            <VideoGrid locale={locale} dict={dict} />
          ) : (
            <Reveal className="videos-page__channel">
              <p className="t-eyebrow">{v.channelEyebrow}</p>
              <h2 className="t-section">{v.channelTitle}</h2>
              <p className="measure">{v.channelBody}</p>
              <a
                className="btn btn--primary"
                href="https://www.youtube.com/@gerardfaureofficial"
                target="_blank"
                rel="noopener noreferrer"
              >
                {v.channelCta} <span aria-hidden="true">↗</span>
              </a>
            </Reveal>
          )}
        </div>
      </section>

      {pressItems.length > 0 ? (
        <section className="band band--light editorial-paper-band videos-page__press-band">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <h2 className="t-section">{v.pressTitle}</h2>
                <hr className="rule" />
              </div>
            </Reveal>

            <PressList locale={locale} />
          </div>
        </section>
      ) : null}

      <NextStep
        eyebrow={v.nextEyebrow}
        title={v.nextTitle}
        label={v.nextCta}
        href={path(locale, 'author')}
      />
    </>
  );
}
