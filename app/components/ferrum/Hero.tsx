import {FeTile} from './FeTile';
import {EmberCta} from './EmberCta';
import {ImageBand} from './ImageBand';
import {PDP_PATH} from '~/lib/ferrum-tiers';

export function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: 'min(100vh, 920px)',
        background: 'var(--color-obsidian)',
        color: 'var(--color-bone)',
        overflow: 'hidden',
      }}
    >
      <div style={{position: 'absolute', inset: 0}}>
        <ImageBand
          src="/images/hero.png"
          alt="The Forge — FRM-01 — rendered on dark marble under cold studio light."
          priority
          parallax={false}
          scrim="left"
          position="70% 50%"
          noTopFade
          style={{height: '100%'}}
        />
      </div>
      <div
        style={{
          position: 'relative',
          minHeight: 'inherit',
          maxWidth: '1320px',
          margin: '0 auto',
          padding:
            'clamp(5rem, 10vw, 8rem) clamp(1.25rem, 4vw, 3rem) clamp(4rem, 8vw, 6rem)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          alignItems: 'center',
        }}
        className="ferrum-hero-grid"
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(1.5rem, 2.5vw, 2.25rem)',
            maxWidth: '36rem',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: '1.25rem'}}>
            <FeTile size={88} />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontStretch: '125%',
                fontWeight: 800,
                fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-bone)',
              }}
            >
              Ferrum
            </span>
          </div>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--color-steel-300)',
            }}
          >
            FRM-01 · The Forge
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontStretch: '125%',
              fontWeight: 800,
              fontSize: 'clamp(3rem, 9vw, 7.5rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: 'var(--color-bone)',
              margin: 0,
            }}
          >
            Forged,
            <br />
            not given.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.1rem, 1.45vw, 1.4rem)',
              lineHeight: 1.45,
              color: 'var(--color-steel-300)',
              maxWidth: '34ch',
              margin: 0,
            }}
          >
            The only muscle you can&rsquo;t hide — engineered.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1rem 1.5rem',
            }}
          >
            <EmberCta href={PDP_PATH} size="lg">
              Claim the Forge
            </EmberCta>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'var(--color-steel-500)',
              }}
            >
              Free shipping · 30-day guarantee
            </span>
          </div>
        </div>
      </div>
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '1.5rem',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'var(--color-steel-500)',
        }}
      >
        Scroll · 26 · Fe · 55.845
      </span>
    </section>
  );
}
