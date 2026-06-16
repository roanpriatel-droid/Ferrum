import {Section, Eyebrow, Display} from '../Section';

type Dim = {
  index: string;
  symbol: string;
  name: string;
  caption: string;
  trains: string;
};

const DIMENSIONS: Dim[] = [
  {
    index: '01',
    symbol: 'C',
    name: 'Crush',
    caption: 'Five independent pegs collapse under load.',
    trains: 'Grip strength · finger flexors',
  },
  {
    index: '02',
    symbol: 'R',
    name: 'Rotate',
    caption: 'Wrist and forearm against true torque.',
    trains: 'Pronation · supination · brachioradialis',
  },
  {
    index: '03',
    symbol: 'D',
    name: 'Drive',
    caption: 'Concentric and eccentric, on one axis.',
    trains: 'Forearm hypertrophy · vein density',
  },
];

export function ThreeDimensions() {
  return (
    <Section id="three-dimensions">
      <div
        style={{
          display: 'grid',
          gap: 'clamp(2rem, 4vw, 3rem)',
        }}
      >
        <div style={{display: 'grid', gap: '1rem', maxWidth: '760px'}}>
          <Eyebrow>The Build</Eyebrow>
          <Display as="h2" size="md">
            Built in three dimensions.
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
            One device, three planes of load. The Forge trains crush,
            rotation, and drive on a single axis of work — no swap, no rack,
            no excuses.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1px',
            background: 'var(--color-steel-800)',
            border: '1px solid var(--color-steel-800)',
          }}
        >
          {DIMENSIONS.map((dim) => (
            <DimCell key={dim.symbol} dim={dim} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function DimCell({dim}: {dim: Dim}) {
  return (
    <div
      style={{
        background: 'var(--color-graphite)',
        padding: 'clamp(1.5rem, 2.5vw, 2.25rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        minHeight: '240px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
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
          {dim.index}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
            fontStretch: '125%',
            fontWeight: 700,
            lineHeight: 1,
            color: 'var(--color-bone)',
          }}
        >
          {dim.symbol}
        </span>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontStretch: '125%',
            fontWeight: 600,
            fontSize: '1.1rem',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--color-bone)',
          }}
        >
          {dim.name}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            lineHeight: 1.5,
            color: 'var(--color-steel-300)',
          }}
        >
          {dim.caption}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.04em',
            lineHeight: 1.5,
            color: 'var(--color-ember)',
            paddingTop: '0.5rem',
            borderTop: '1px solid var(--color-steel-800)',
            marginTop: 'auto',
          }}
        >
          {dim.trains}
        </span>
      </div>
    </div>
  );
}
