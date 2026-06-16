import {Section, Eyebrow, Display} from './Section';

const PROTOCOL_POINTS = [
  '30 days of programmed sessions',
  'Crush, rotation, and forearm splits',
  'Occlusion-style finishers for vascularity',
  'Auto-regulated load progression',
];

export function Protocol() {
  return (
    <Section id="protocol">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: 'clamp(2rem, 4vw, 3rem)',
          alignItems: 'start',
        }}
        className="protocol-grid"
      >
        <div style={{display: 'grid', gap: '1.25rem'}}>
          <Eyebrow>04 · Included</Eyebrow>
          <Display as="h2" size="md">
            The FERRUM Protocol.
          </Display>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
              lineHeight: 1.55,
              color: 'var(--color-steel-300)',
              margin: 0,
              maxWidth: '46ch',
            }}
          >
            A 30-day digital program. Delivered with every Forge. Engineered
            to move all four levers in sequence — not in theory.
          </p>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gap: '0.75rem',
            }}
          >
            {PROTOCOL_POINTS.map((point) => (
              <li
                key={point}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.25rem 1fr',
                  gap: '0.75rem',
                  alignItems: 'baseline',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--color-bone)',
                  lineHeight: 1.5,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-steel-500)',
                    fontSize: '0.8rem',
                  }}
                >
                  +
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
        <aside
          style={{
            background: 'var(--color-graphite)',
            border: '1px solid var(--color-steel-800)',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            display: 'grid',
            gap: '1rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-steel-500)',
            }}
          >
            Value
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontStretch: '125%',
              fontWeight: 700,
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              lineHeight: 1,
              color: 'var(--color-bone)',
            }}
          >
            $39
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-ember)',
            }}
          >
            Free with every Forge
          </span>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              lineHeight: 1.5,
              color: 'var(--color-steel-300)',
              margin: 0,
            }}
          >
            Sent to your inbox the moment the order ships. Yours to keep.
          </p>
        </aside>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (min-width: 900px) {
              .protocol-grid { grid-template-columns: 1.4fr 1fr !important; }
            }
          `,
        }}
      />
    </Section>
  );
}
