import {Section, Eyebrow, Display} from './Section';
import {ImageBand} from './ImageBand';

type Lever = {
  index: string;
  symbol: string;
  name: string;
  caption: string;
  operator?: '×' | '÷';
};

const LEVERS: Lever[] = [
  {
    index: '01',
    symbol: 'M',
    name: 'Muscle',
    caption: 'Cross-section. Built under load.',
  },
  {
    index: '02',
    symbol: 'B',
    name: 'Blood Flow',
    caption: 'Vasodilation. Driven by occlusion + reps.',
    operator: '×',
  },
  {
    index: '03',
    symbol: 'F',
    name: 'Body Fat',
    caption: 'Subcutaneous layer. The veil.',
    operator: '÷',
  },
  {
    index: '04',
    symbol: 'S',
    name: 'State',
    caption: 'Heat, hydration, hormones, time of day.',
    operator: '×',
  },
];

export function Equation() {
  return (
    <>
      <ImageBand
        src="/images/texture-steel.png"
        decorative
        height="clamp(120px, 16vw, 200px)"
        tint={0.18}
        sideFade
        style={{
          borderTop: '1px solid var(--color-steel-800)',
          borderBottom: '1px solid var(--color-steel-800)',
        }}
      />

      <Section id="equation">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(2.5rem, 5vw, 3.5rem)',
          }}
        >
          <div style={{display: 'grid', gap: '1rem', maxWidth: '760px'}}>
            <Eyebrow>02 · The Equation</Eyebrow>
            <Display as="h2" size="md">
              Four levers. One outcome.
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
              Vascularity is not a wish. It is a product. Train each input on
              purpose.
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
            {LEVERS.map((lever) => (
              <LeverCell key={lever.symbol} lever={lever} />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

function LeverCell({lever}: {lever: Lever}) {
  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--color-graphite)',
        padding: 'clamp(1.5rem, 2.5vw, 2.25rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        minHeight: '220px',
      }}
    >
      {lever.operator && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translate(-50%, -50%)',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 2vw, 2rem)',
            color: 'var(--color-steel-500)',
            background: 'var(--color-obsidian)',
            padding: '0.25rem 0.5rem',
            lineHeight: 1,
          }}
        >
          {lever.operator}
        </span>
      )}
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
          {lever.index}
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
          {lever.symbol}
        </span>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontStretch: '125%',
            fontWeight: 600,
            fontSize: '1.05rem',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--color-bone)',
          }}
        >
          {lever.name}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            lineHeight: 1.45,
            color: 'var(--color-steel-300)',
          }}
        >
          {lever.caption}
        </span>
      </div>
    </div>
  );
}
