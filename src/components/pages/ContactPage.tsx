import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/getDictionary';
import ContactForm from '../ContactForm';
import PageBanner from '../PageBanner';
import Reveal from '../Reveal';
import { Facebook, Instagram, TikTok, YouTube } from '../Icons';
import NextStep from '../NextStep';

const SOCIALS = [
  { name: 'YouTube', href: 'https://www.youtube.com/@gerardfaureofficial', Icon: YouTube },
  { name: 'Instagram', href: 'https://www.instagram.com/gerardfaureofficial', Icon: Instagram },
  { name: 'TikTok', href: 'https://www.tiktok.com/@gerardfaureofficial', Icon: TikTok },
  { name: 'Facebook', href: 'https://www.facebook.com/people/G%C3%A9rard-Faur%C3%A9/61593260326104/', Icon: Facebook },
];

export default function ContactPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.pages.contact;

  return (
    <>
      <PageBanner title={c.title} lead={c.lead} />

      <section className="band contact-page__content">
        <div className="container contact__grid">
          <Reveal className="contact__formPanel">
            <ContactForm locale={locale} dict={dict} />
          </Reveal>

          <Reveal delayIndex={1} className="contact__aside">
            <h2 className="t-section">{c.directTitle}</h2>
            <hr className="rule contact__rule" />

            {/* Addresses go live once the domain's mailboxes exist —
                see OUTLINE.md §7. */}
            <dl className="contact__list">
              <div>
                <dt className="t-meta">{c.pressLabel}</dt>
                <dd><a href="mailto:presse@gerardfaure.fr">presse@gerardfaure.fr</a></dd>
              </div>
              <div>
                <dt className="t-meta">{c.generalLabel}</dt>
                <dd><a href="mailto:contact@gerardfaure.fr">contact@gerardfaure.fr</a></dd>
              </div>
            </dl>

            <span className="t-meta contact__socialLabel">{c.socialLabel}</span>
            <div className="footer__social contact__social">
              {SOCIALS.map(({ name, href, Icon }) => (
                <a key={name} href={href} aria-label={name} target="_blank" rel="noopener noreferrer">
                  <Icon />
                </a>
              ))}
            </div>

            <p className="contact__note">{c.readerNote}</p>
          </Reveal>
        </div>
      </section>

      <NextStep
        eyebrow={c.nextEyebrow}
        title={c.nextTitle}
        label={c.nextCta}
        href="mailto:hello@gerardfaure.fr"
        email
        tone="light"
      />
    </>
  );
}
