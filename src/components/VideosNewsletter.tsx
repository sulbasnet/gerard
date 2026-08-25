import Link from 'next/link';
import { featuredVideos } from '@/content/videos';
import { path, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/getDictionary';
import NewsletterForm from './NewsletterForm';
import Reveal from './Reveal';
import VideoGrid from './VideoGrid';

export default function VideosNewsletter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="band">
      <div className="container vn__grid">
        <Reveal>
          <div className="section-head">
            <h2 className="t-section">{dict.videos.title}</h2>
            <hr className="rule" />
          </div>

          {featuredVideos.length > 0 ? (
            <VideoGrid locale={locale} dict={dict} />
          ) : (
            <p className="vn__video-teaser measure">{dict.videos.channelTeaser}</p>
          )}

          {featuredVideos.length > 0 ? (
            <Link href={path(locale, 'videos')} className="arrow-link t-label">
              {dict.videos.link} <span className="arrow">→</span>
            </Link>
          ) : (
            <a
              href="https://www.youtube.com/@gerardfaureofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="arrow-link t-label"
            >
              {dict.videos.channelLink} <span className="arrow">↗</span>
            </a>
          )}
        </Reveal>

        <Reveal delayIndex={1}>
          <div className="section-head">
            <h2 className="t-section">{dict.newsletter.title}</h2>
            <hr className="rule" />
          </div>

          <p className="newsletter__sub">{dict.newsletter.subtitle}</p>

          <NewsletterForm locale={locale} dict={dict} />
        </Reveal>
      </div>
    </section>
  );
}
