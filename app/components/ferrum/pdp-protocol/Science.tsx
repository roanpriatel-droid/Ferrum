import {Section, Eyebrow, Display} from '../Section';
import {ImageBand} from '../ImageBand';

export function Science() {
  return (
    <>
      <Band src="/images/bg-industrial.png" intensity="strong" />
      <Section id="science">
        <div style={{display: 'grid', gap: 'clamp(2rem, 4vw, 3rem)'}}>
          <div style={{display: 'grid', gap: '1rem', maxWidth: '760px'}}>
            <Eyebrow>03 · The science</Eyebrow>
            <Display as="h2" size="md">
              Vascularity is a product.
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
              Visible veins are not genetic luck. They are the output of four
              levers, multiplied and divided.
            </p>
          </div>
          <Equation />
          <Levers />
        </div>
      </Section>
    </>
  );
}

function Equation() {
  const term = (sym: string, name: string) => (
    <div
      style={{
        display: 'grid',
        gap: '0.35rem',
        textAlign: 'center',
        minWidth: '6.5rem',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontStretch: '125%',
          fontWeight: 700,
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          lineHeight: 1,
          color: 'var(--color-bone)',
        }}
      >
        {sym}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--color-steel-500)',
        }}
      >
        {name}
      </span>
    </div>
  );

  const op = (sym: string) => (
    <span
      aria-hidden="true"
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
        color: 'var(--color-ember)',
        lineHeight: 1,
        padding: '0 0.25rem',
      }}
    >
      {sym}
    </span>
  );

  return (
    <div
      style={{
        background: 'var(--color-graphite)',
        border: '1px solid var(--color-steel-800)',
        padding: 'clamp(1.75rem, 3vw, 2.5rem)',
        display: 'grid',
        gap: '1.25rem',
        justifyItems: 'center',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--color-steel-500)',
        }}
      >
        The Vascularity Equation
      </span>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(0.5rem, 1.5vw, 1rem)',
        }}
      >
        {term('V', 'Visible Veins')}
        {op('=')}
        {term('M', 'Muscle')}
        {op('×')}
        {term('B', 'Blood Flow')}
        {op('÷')}
        {term('F', 'Body Fat')}
        {op('×')}
        {term('S', 'State')}
      </div>
    </div>
  );
}

const LEVERS = [
  {
    name: 'Muscle',
    what: 'Cross-section of the forearm under load.',
    how: 'Forge phase. Eight to twelve high-density blocks per week.',
  },
  {
    name: 'Blood Flow',
    what: 'Vasodilation and capillary recruitment.',
    how: 'Occlusion finishers. Reveal protocol. Tempo control.',
  },
  {
    name: 'Body Fat',
    what: 'The subcutaneous veil between vein and skin.',
    how: 'Nutrition framework. Sodium and water bracketed for Etch.',
  },
  {
    name: 'State',
    what: 'Heat, hydration, hormones, time of day.',
    how: 'Daily timing and the 24-hour Reveal protocol.',
  },
];

function Levers() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1px',
        background: 'var(--color-steel-800)',
        border: '1px solid var(--color-steel-800)',
      }}
    >
      {LEVERS.map((l) => (
        <div
          key={l.name}
          style={{
            background: 'var(--color-graphite)',
            padding: 'clamp(1.5rem, 2.5vw, 2rem)',
            display: 'grid',
            gap: '0.75rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontStretch: '125%',
              fontWeight: 700,
              fontSize: '1.05rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--color-bone)',
            }}
          >
            {l.name}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              lineHeight: 1.5,
              color: 'var(--color-steel-300)',
            }}
          >
            {l.what}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              lineHeight: 1.5,
              letterSpacing: '0.04em',
              color: 'var(--color-ember)',
              paddingTop: '0.5rem',
              borderTop: '1px solid var(--color-steel-800)',
            }}
          >
            {l.how}
          </span>
        </div>
      ))}
    </div>
  );
}

function Band({
  src,
  intensity = 'soft',
}: {
  src: string;
  intensity?: 'soft' | 'strong';
}) {
  return (
    <ImageBand
      src={src}
      decorative
      height="clamp(120px, 16vw, 200px)"
      tint={intensity === 'strong' ? 0.22 : 0.18}
      sideFade
      style={{
        borderTop: '1px solid var(--color-steel-800)',
        borderBottom: '1px solid var(--color-steel-800)',
      }}
    />
  );
}
