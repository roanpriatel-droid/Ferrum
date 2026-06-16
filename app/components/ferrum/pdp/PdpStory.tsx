import {Section, Eyebrow, Display} from '../Section';

export function PdpStory({descriptionHtml}: {descriptionHtml?: string | null}) {
  return (
    <Section id="story">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: 'clamp(2rem, 4vw, 3rem)',
          alignItems: 'start',
        }}
        className="ferrum-pdp-story-grid"
      >
        <div style={{display: 'grid', gap: '1rem', maxWidth: '20rem'}}>
          <Eyebrow>The story</Eyebrow>
          <Display as="h2" size="md">
            Veins are earned.
          </Display>
        </div>

        {descriptionHtml ? (
          <div
            className="ferrum-prose"
            dangerouslySetInnerHTML={{__html: descriptionHtml}}
          />
        ) : (
          <FallbackStory />
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (min-width: 900px) {
              .ferrum-pdp-story-grid { grid-template-columns: 1fr 2fr !important; }
            }
            .ferrum-prose {
              display: grid;
              gap: 1rem;
              max-width: 46rem;
              font-family: var(--font-body);
              color: var(--color-bone);
              line-height: 1.65;
              font-size: 1.02rem;
            }
            .ferrum-prose h2,
            .ferrum-prose h3 {
              font-family: var(--font-display);
              font-stretch: 125%;
              font-weight: 700;
              font-size: 1.25rem;
              letter-spacing: 0.02em;
              text-transform: uppercase;
              color: var(--color-bone);
              margin: 1.5rem 0 0;
              line-height: 1.2;
            }
            .ferrum-prose p { margin: 0; }
            .ferrum-prose ul,
            .ferrum-prose ol {
              margin: 0;
              padding-left: 1.25rem;
              display: grid;
              gap: 0.4rem;
            }
            .ferrum-prose li::marker { color: var(--color-ember); }
            .ferrum-prose strong { color: var(--color-bone); font-weight: 600; }
            .ferrum-prose a {
              color: var(--color-ember);
              text-decoration: none;
              border-bottom: 1px solid color-mix(in oklab, var(--color-ember) 50%, transparent);
            }
          `,
        }}
      />
    </Section>
  );
}

function FallbackStory() {
  return (
    <div className="ferrum-prose">
      <p>
        Chest, back, legs — covered. The forearm is the one piece of the body
        worn in public every day. The watch, the handshake, the rolled
        sleeve. It reports for duty whether the rest of the kit is dressed
        or not.
      </p>
      <p>
        The Forge is built around a single observation: vascularity is not
        genetic luck. Visible veins are a function of muscle density, blood
        flow, body fat, and state. Four levers, all moveable, all engineered
        — none of them trained by curl machines or rubber tube grippers.
      </p>
      <h3>One instrument, three planes</h3>
      <p>
        Crush. Rotate. Drive. A 3D rotational grip device that loads the
        forearm in compression, torsion, and translation on a single axis of
        work. Five independent pegs expose every finger. A faceted shell
        holds at any wrist angle. The Forge weighs 0.74 kg, makes no sound,
        and asks for nothing but reps.
      </p>
      <h3>Why the device is half the answer</h3>
      <p>
        A tool without a system is a paperweight. Every Forge ships with the
        <strong> FERRUM Protocol</strong> — a 30-day digital program that
        moves all four levers in sequence. Five sessions a week, eight to
        twelve minutes each. The Protocol is delivered the day the order
        ships and is yours to keep, even on a return.
      </p>
      <h3>How you know it worked</h3>
      <p>
        Forearm circumference moves in 14 days. Resting vascularity follows
        at 30 to 45 days for most. Body composition determines the rest.
        Train for thirty days. If the forearm has not changed, return the
        Forge for a full refund. Keep the Protocol either way.
      </p>
    </div>
  );
}
