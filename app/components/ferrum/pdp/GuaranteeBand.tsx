import {Section, Eyebrow, Display} from '../Section';
import {ImageBand} from '../ImageBand';

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
      <div style={{position: 'absolute', inset: 0}}>
        <ImageBand
          src="/images/bg-ember-glow.png"
          decorative
          position="50% 65%"
          tint={0.18}
          scrim="bottom"
          style={{height: '100%'}}
        />
      </div>
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
