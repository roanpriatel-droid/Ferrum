import {Section, Eyebrow, Display} from './Section';

export function Premise() {
  return (
    <Section id="premise">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          maxWidth: '900px',
        }}
      >
        <Eyebrow>01 · Premise</Eyebrow>
        <Display as="h2" size="lg">
          The forearm is the only muscle worn in public.
        </Display>
        <div
          style={{
            display: 'grid',
            gap: '1.25rem',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
            lineHeight: 1.55,
            color: 'var(--color-steel-300)',
          }}
        >
          <p style={{margin: 0}}>
            Chest, back, legs — covered. The forearm carries the watch, the
            handshake, the sleeve roll. It is the one piece of the body that
            reports for duty every day.
          </p>
          <p style={{margin: 0}}>
            Veins are not genetic luck. Vascularity is a function of muscle
            density, blood flow, body fat, and state. Each lever can be moved.
            Each is engineered, not gifted.
          </p>
          <p
            style={{
              margin: 0,
              color: 'var(--color-bone)',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              fontSize: '0.85rem',
            }}
          >
            Veins are earned. Forged, not given.
          </p>
        </div>
      </div>
    </Section>
  );
}
