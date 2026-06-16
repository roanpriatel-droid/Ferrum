import {Eyebrow, Display} from './Section';
import {EmberCta} from './EmberCta';
import {PDP_PATH} from '~/lib/ferrum-tiers';

export function Premise() {
  return (
    <section
      id="premise"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--color-steel-800)',
        borderBottom: '1px solid var(--color-steel-800)',
        background: 'var(--color-obsidian)',
      }}
    >
      <img
        src="/images/bg-industrial.png"
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
          objectPosition: '50% 35%',
          opacity: 0.55,
          borderRadius: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, color-mix(in oklab, var(--color-obsidian) 55%, transparent) 0%, color-mix(in oklab, var(--color-obsidian) 80%, transparent) 100%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          padding:
            'clamp(6rem, 12vw, 10rem) clamp(1.25rem, 4vw, 3rem)',
          display: 'grid',
          gap: 'clamp(2rem, 4vw, 3rem)',
          maxInlineSize: '1200px',
        }}
      >
        <div style={{display: 'grid', gap: '1.5rem', maxWidth: '900px'}}>
          <Eyebrow>01 · Premise</Eyebrow>
          <Display as="h2" size="lg">
            The forearm
            <br />
            is the only muscle
            <br />
            worn in public.
          </Display>
        </div>
        <div
          style={{
            display: 'grid',
            gap: '1.4rem',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.1rem, 1.4vw, 1.35rem)',
            lineHeight: 1.55,
            color: 'var(--color-bone)',
            maxWidth: '46rem',
          }}
        >
          <p style={{margin: 0}}>
            Chest, back, legs — covered. The forearm carries the watch, the
            handshake, the sleeve roll. It is the one piece of the body that
            reports for duty every day.
          </p>
          <p style={{margin: 0, color: 'var(--color-steel-300)'}}>
            Veins are not genetic luck. Vascularity is a function of muscle
            density, blood flow, body fat, and state. Each lever can be moved.
            Each is engineered, not gifted.
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1.25rem 2rem',
            paddingTop: '0.5rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              fontSize: '0.85rem',
              color: 'var(--color-ember)',
            }}
          >
            Veins are earned.
          </span>
          <EmberCta href={PDP_PATH} variant="ghost">
            Claim the Forge
          </EmberCta>
        </div>
      </div>
    </section>
  );
}
