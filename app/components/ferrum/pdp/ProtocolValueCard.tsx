import {Section, Eyebrow, Display} from '../Section';
import {EmberCta} from '../EmberCta';
import {PROTOCOL_PATH} from '~/lib/ferrum-tiers';

export function ProtocolValueCard() {
  return (
    <Section id="protocol-included">
      <div
        style={{
          position: 'relative',
          border: '1px solid var(--color-steel-800)',
          background: 'var(--color-graphite)',
          padding: 'clamp(2rem, 4vw, 3.5rem)',
          overflow: 'hidden',
          display: 'grid',
          gap: 'clamp(1.5rem, 3vw, 2.25rem)',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 88% 110%, color-mix(in oklab, var(--color-ember) 24%, transparent) 0%, transparent 58%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gap: '1rem',
            maxWidth: '36rem',
          }}
        >
          <Eyebrow>Included free with every Forge</Eyebrow>
          <Display as="h2" size="md">
            The FERRUM Protocol
            <br />
            ($39 value) — yours at $0.
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
            A 30-day digital program built around the Forge. Three phases,
            twelve movements, six named protocols, a nutrition framework, and
            the acute Reveal protocol. Sold separately for $39 — bundled
            free with every Forge.
          </p>
        </div>

        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1.25rem 1.75rem',
          }}
        >
          <EmberCta href={PROTOCOL_PATH} size="md">
            Read the Protocol
          </EmberCta>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-steel-500)',
            }}
          >
            Phases · Prime / Forge / Etch
          </span>
        </div>
      </div>
    </Section>
  );
}
