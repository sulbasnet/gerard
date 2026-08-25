import PageBanner from '../PageBanner';
import Reveal from '../Reveal';

/** Legal notice and privacy policy — plain prose, one shared template. */
export default function TextPage({
  title,
  sections,
}: {
  title: string;
  sections: readonly { heading: string; body: string }[];
}) {
  return (
    <>
      <PageBanner title={title} />

      <section className="band band--light">
        <div className="container">
          <div className="textpage">
            {sections.map((s, i) => (
              <Reveal key={s.heading} delayIndex={i}>
                <h2 className="t-card textpage__heading">{s.heading}</h2>
                <p className="measure">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
