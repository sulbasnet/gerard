import Reveal from './Reveal';

export default function PageBanner({
  title,
  lead,
  className = '',
}: {
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <section className={`page-banner ${className}`.trim()}>
      <div className="container">
        <Reveal>
          <h1 className="t-display">{title}</h1>
          <hr className="rule page-banner__rule" />
          {lead ? <p className="t-body-lg page-banner__lead measure">{lead}</p> : null}
        </Reveal>
      </div>
    </section>
  );
}
