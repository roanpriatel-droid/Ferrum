import {Section, Eyebrow, Display} from '../Section';

export function GuaranteeBand() {
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
            'linear-gradient(180deg, color-mix(in oklab, var(--color-obsidian) 78%, transparent) 0%, color-mix(in oklab, var(--color-obsidian) 40%, transparent) 60%, color-mix(in oklab, var(--color-obsidian) 92%, transparent) 100%)',
          pointerEvents: 'none',
        }}
      />
      <Section as="div" style={{position: 'relative', paddingTop: 'clamp(5rem, 10vw, 8rem)', paddingBottom: 'clamp(5rem, 10vw, 8rem)'}}>
        <div
          style={{
            display: 'grid',
            gap: '1.25rem',
            justifyItems: 'center',
            textAlign: 'center',
            maxWidth: '46rem',
            margin: '0 auto',
          }}
        >
          <Eyebrow style={{color: 'var(--color-steel-300)'}}>
            The 30-Day Forge Guarantee
          </Eyebrow>
          <Display as="h2" size="lg" style={{maxWidth: '18ch'}}>
            Train for 30 days. Or get every dollar back.
          </Display>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.05rem, 1.3vw, 1.2rem)',
              lineHeight: 1.55,
              color: 'var(--color-bone)',
              margin: 0,
            }}
          >
            Run the FERRUM Protocol for 30 days. If the forearm has not
            changed, return the Forge for a full refund. No questionnaires.
            No friction.
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
        </div>
      </Section>
    </section>
  );
}
