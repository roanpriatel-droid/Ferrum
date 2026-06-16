import {Section, Eyebrow, Display} from '../Section';

export function RevealTeaser() {
  return (
    <Section id="reveal">
      <div
        style={{
          position: 'relative',
          border: '1px solid var(--color-steel-800)',
          background: 'var(--color-graphite)',
          overflow: 'hidden',
          padding: 'clamp(2rem, 4vw, 3.5rem)',
          display: 'grid',
          gap: 'clamp(1.5rem, 3vw, 2rem)',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 92% 0%, color-mix(in oklab, var(--color-ember) 28%, transparent) 0%, transparent 55%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gap: '1rem',
            maxWidth: '40rem',
          }}
        >
          <Eyebrow>04 · The Reveal</Eyebrow>
          <Display as="h2" size="md">
            Surface the vein on demand.
          </Display>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.05rem, 1.3vw, 1.2rem)',
              lineHeight: 1.55,
              color: 'var(--color-steel-300)',
              margin: 0,
            }}
          >
            A 24-hour acute protocol bracketed by sodium, water, breath, and
            the Forge. The vein is not invented — it is uncovered. Not for
            daily use.
          </p>
        </div>
        <ul
          style={{
            position: 'relative',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1px',
            background: 'var(--color-steel-800)',
            border: '1px solid var(--color-steel-800)',
          }}
        >
          {[
            {hour: 'T-24', step: 'Carb taper'},
            {hour: 'T-12', step: 'Sodium load'},
            {hour: 'T-04', step: 'Forge crush block'},
            {hour: 'T-00', step: 'Vein up'},
          ].map((row) => (
            <li
              key={row.hour}
              style={{
                background: 'var(--color-graphite)',
                padding: '1.25rem 1.5rem',
                display: 'grid',
                gap: '0.5rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ember)',
                }}
              >
                {row.hour}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStretch: '125%',
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--color-bone)',
                }}
              >
                {row.step}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
