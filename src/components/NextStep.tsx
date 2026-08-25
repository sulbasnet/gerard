import Link from 'next/link';
import Reveal from './Reveal';

type NextStepProps = {
  eyebrow: string;
  title: string;
  label: string;
  href: string;
  email?: boolean;
  tone?: 'dark' | 'light';
};

export default function NextStep({
  eyebrow,
  title,
  label,
  href,
  email = false,
  tone = 'dark',
}: NextStepProps) {
  const content = (
    <>
      {label} <span className="arrow" aria-hidden="true">→</span>
    </>
  );

  return (
    <section
      className={`next-step${tone === 'light' ? ' next-step--light band--light' : ''}`}
      aria-label={eyebrow}
    >
      <div className="container">
        <Reveal className="next-step__inner">
          <div>
            <p className="t-eyebrow next-step__eyebrow">{eyebrow}</p>
            <h2 className="t-section next-step__title">{title}</h2>
          </div>
          {email ? (
            <a href={href} className="arrow-link t-label next-step__link">{content}</a>
          ) : (
            <Link href={href} className="arrow-link t-label next-step__link">{content}</Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}
