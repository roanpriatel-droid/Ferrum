import {FeTile} from './FeTile';
import {Eyebrow} from './Section';

export function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--color-obsidian)',
        color: 'var(--color-bone)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(3rem, 8vw, 7rem) clamp(1.25rem, 4vw, 3rem)',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 65%, color-mix(in oklab, var(--color-ember) 10%, transparent) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'relative',
          maxWidth: '1100px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 'clamp(1.75rem, 3vw, 2.75rem)',
        }}
      >
        <FeTile size={140} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'clamp(0.75rem, 1.5vw, 1.25rem)',
          }}
        >
          <Eyebrow>FRM-01 · The Forge</Eyebrow>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontStretch: '125%',
              fontWeight: 800,
              fontSize: 'clamp(3.5rem, 12vw, 9rem)',
              lineHeight: 0.9,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--color-bone)',
              margin: 0,
            }}
          >
            Ferrum
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.875rem, 1vw, 1rem)',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'var(--color-steel-300)',
              margin: 0,
            }}
          >
            Forged, not given.
          </p>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.05rem, 1.4vw, 1.35rem)',
            lineHeight: 1.45,
            color: 'var(--color-steel-300)',
            maxWidth: '42ch',
            margin: 0,
          }}
        >
          The only muscle you can&rsquo;t hide — engineered.
        </p>
        <a
          href="#offer"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('offer');
            if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            padding: '1.1rem 2.25rem',
            background: 'var(--color-ember)',
            color: 'var(--color-obsidian)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 200ms ease, filter 200ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = 'brightness(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = 'none';
          }}
        >
          Claim the Forge
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
