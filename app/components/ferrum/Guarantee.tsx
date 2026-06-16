import {Eyebrow, Display} from './Section';
import {EmberCta} from './EmberCta';
import {PDP_PATH} from '~/lib/ferrum-tiers';

export function Guarantee() {
  return (
    <section
      id="guarantee"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--color-steel-800)',
        borderBottom: '1px solid var(--color-steel-800)',
        background: 'var(--color-obsidian)',
      }}
    >
      <img
        src="/images/bg-ember-glow.png"
        alt=""
        width={1536}
        height={2048}
        loading="lazy"
        decoding="async"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '50% 65%',
          borderRadius: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, color-mix(in oklab, var(--color-obsidian) 78%, transparent) 0%, color-mix(in oklab, var(--color-obsidian) 40%, transparent) 60%, color-mix(in oklab, var(--color-obsidian) 88%, transparent) 100%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'relative',
          maxWidth: '1100px',
          margin: '0 auto',
          padding:
            'clamp(7rem, 14vw, 11rem) clamp(1.25rem, 4vw, 3rem)',
          display: 'grid',
          gap: 'clamp(1.5rem, 3vw, 2.25rem)',
          justifyItems: 'center',
          textAlign: 'center',
        }}
      >
        <Eyebrow style={{color: 'var(--color-steel-300)'}}>
          07 · Guarantee
        </Eyebrow>
        <Display as="h2" size="xl" style={{maxWidth: '18ch'}}>
          The 30-Day
          <br />
          Forge Guarantee.
        </Display>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
            lineHeight: 1.5,
            color: 'var(--color-bone)',
            margin: 0,
            maxWidth: '46ch',
          }}
        >
          Run the FERRUM Protocol for 30 days. If your forearm hasn&rsquo;t
          changed, return the Forge for a full refund. No questionnaires. No
          friction.
        </p>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--color-ember)',
          }}
        >
          Keep the Protocol either way.
        </span>
        <div style={{paddingTop: '1.25rem'}}>
          <EmberCta href={PDP_PATH} size="lg">
            Claim the Forge
          </EmberCta>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--color-steel-500)',
          }}
        >
          Free shipping · Ships in 3–5 business days
        </span>
      </div>
    </section>
  );
}
