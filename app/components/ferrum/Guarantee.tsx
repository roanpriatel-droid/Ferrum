import {Section, Eyebrow, Display} from './Section';

export function Guarantee() {
  return (
    <Section id="guarantee">
      <div
        style={{
          background: 'var(--color-graphite)',
          border: '1px solid var(--color-steel-800)',
          padding: 'clamp(2rem, 5vw, 3.5rem)',
          display: 'grid',
          gap: '1.25rem',
          maxWidth: '820px',
        }}
      >
        <Eyebrow>07 · Guarantee</Eyebrow>
        <Display as="h2" size="md">
          The 30-Day Forge Guarantee.
        </Display>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
            lineHeight: 1.55,
            color: 'var(--color-steel-300)',
            margin: 0,
          }}
        >
          Run the FERRUM Protocol for 30 days. If your forearm hasn&rsquo;t
          changed, return the Forge for a full refund. No questionnaires. No
          friction.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-ember)',
            margin: 0,
          }}
        >
          Keep the Protocol either way.
        </p>
      </div>
    </Section>
  );
}
