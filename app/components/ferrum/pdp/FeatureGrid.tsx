import {Section, Eyebrow, Display} from '../Section';

type Feature = {
  index: string;
  title: string;
  body: string;
};

const FEATURES: Feature[] = [
  {
    index: '01',
    title: 'Five independent pegs',
    body: 'Each finger fires on its own column. Weak digits get exposed; strong ones learn to lead.',
  },
  {
    index: '02',
    title: 'Faceted shell',
    body: 'A multi-plane grip surface that holds at any wrist angle. No slip, no wrap.',
  },
  {
    index: '03',
    title: 'Multi-axis load path',
    body: 'Compression, torsion, and translation in one device. Three trainers in one footprint.',
  },
  {
    index: '04',
    title: 'Matte, oxide-black build',
    body: 'Bead-blast finish on a polymer-steel chassis. 0.74 kg in the hand, indifferent to sweat.',
  },
  {
    index: '05',
    title: 'No batteries, no app',
    body: 'A mechanical instrument. Reps, time, breath — that is the loop.',
  },
  {
    index: '06',
    title: 'Calibrated for the forearm',
    body: 'Tuned to the load curves that build vascularity, not novelty. The work is the point.',
  },
];

export function FeatureGrid() {
  return (
    <Section id="features">
      <div style={{display: 'grid', gap: 'clamp(2rem, 4vw, 3rem)'}}>
        <div style={{display: 'grid', gap: '1rem', maxWidth: '760px'}}>
          <Eyebrow>Specifications</Eyebrow>
          <Display as="h2" size="md">
            Engineered for the forearm.
          </Display>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1px',
            background: 'var(--color-steel-800)',
            border: '1px solid var(--color-steel-800)',
          }}
        >
          {FEATURES.map((f) => (
            <FeatureCell key={f.index} feature={f} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function FeatureCell({feature}: {feature: Feature}) {
  return (
    <div
      style={{
        background: 'var(--color-graphite)',
        padding: 'clamp(1.5rem, 2.5vw, 2rem)',
        display: 'grid',
        gap: '0.75rem',
        minHeight: '180px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.22em',
          color: 'var(--color-steel-500)',
          textTransform: 'uppercase',
        }}
      >
        {feature.index}
      </span>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontStretch: '125%',
          fontWeight: 600,
          fontSize: '1.05rem',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: 'var(--color-bone)',
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {feature.title}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          lineHeight: 1.5,
          color: 'var(--color-steel-300)',
          margin: 0,
        }}
      >
        {feature.body}
      </p>
    </div>
  );
}
