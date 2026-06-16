import {Section, Eyebrow, Display} from '../Section';

type Phase = {
  index: string;
  name: string;
  days: string;
  goal: string;
  caption: string;
};

const PHASES: Phase[] = [
  {
    index: '01',
    name: 'Prime',
    days: 'Days 1 – 8',
    goal: 'Calibration',
    caption:
      'Map your starting grip. Set the loads. Build the breath pattern that runs the rest of the work.',
  },
  {
    index: '02',
    name: 'Forge',
    days: 'Days 9 – 24',
    goal: 'Hypertrophy',
    caption:
      'High-density rotation and drive blocks. Forearm circumference moves here. Occlusion finishers, optional.',
  },
  {
    index: '03',
    name: 'Etch',
    days: 'Days 25 – 30',
    goal: 'Vascularity',
    caption:
      'Low body-fat positioning and the Reveal protocol. The vein surfaces because the work and the state agree.',
  },
];

export function ThreePhases() {
  return (
    <Section id="phases">
      <div style={{display: 'grid', gap: 'clamp(2rem, 4vw, 3rem)'}}>
        <div style={{display: 'grid', gap: '1rem', maxWidth: '760px'}}>
          <Eyebrow>02 · Three phases</Eyebrow>
          <Display as="h2" size="md">
            Prime → Forge → Etch.
          </Display>
        </div>
        <div
          className="ferrum-protocol-phase-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
          }}
        >
          {PHASES.map((phase) => (
            <PhaseCard key={phase.index} phase={phase} />
          ))}
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (min-width: 760px) {
              .ferrum-protocol-phase-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
            }
          `,
        }}
      />
    </Section>
  );
}

function PhaseCard({phase}: {phase: Phase}) {
  return (
    <article
      style={{
        background: 'var(--color-graphite)',
        border: '1px solid var(--color-steel-800)',
        padding: 'clamp(1.75rem, 3vw, 2.25rem)',
        display: 'grid',
        gap: '1rem',
        minHeight: '320px',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-steel-500)',
          }}
        >
          {phase.index}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-steel-300)',
          }}
        >
          {phase.days}
        </span>
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontStretch: '125%',
          fontWeight: 700,
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          lineHeight: 1,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          color: 'var(--color-bone)',
          margin: 0,
        }}
      >
        {phase.name}
      </h3>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--color-ember)',
        }}
      >
        {phase.goal}
      </span>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          lineHeight: 1.55,
          color: 'var(--color-steel-300)',
          margin: 0,
        }}
      >
        {phase.caption}
      </p>
    </article>
  );
}
