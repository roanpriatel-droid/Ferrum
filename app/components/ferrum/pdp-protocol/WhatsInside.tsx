import {Section, Eyebrow, Display} from '../Section';

type SpecItem = {value: string; label: string; caption: string};

const INSIDE: SpecItem[] = [
  {
    value: '3',
    label: 'Phases',
    caption: 'Prime → Forge → Etch. Each calibrated to a discrete adaptation.',
  },
  {
    value: '12',
    label: 'Movements',
    caption:
      'Four for crush, four for rotation, four for drive. Each filmed and notated.',
  },
  {
    value: '6',
    label: 'Named protocols',
    caption:
      'Anvil · Vise · Coil · Lash · Press · Reveal. Use them, do not invent them.',
  },
  {
    value: '1',
    label: 'Nutrition framework',
    caption:
      'Protein, carbohydrate, sodium, and water — bracketed for the work.',
  },
  {
    value: '1',
    label: 'Reveal protocol',
    caption:
      'A 24-hour acute method. Surfaces vascularity on demand. Not for daily use.',
  },
  {
    value: '∞',
    label: 'Updates',
    caption:
      'Versioned. Buyers receive every revision the Protocol ever ships.',
  },
];

export function WhatsInside() {
  return (
    <Section id="inside">
      <div style={{display: 'grid', gap: 'clamp(2rem, 4vw, 3rem)'}}>
        <div style={{display: 'grid', gap: '1rem', maxWidth: '760px'}}>
          <Eyebrow>01 · What is inside</Eyebrow>
          <Display as="h2" size="md">
            The system, on the table.
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
            A printed system delivered digitally. No course upsells, no
            membership, no community. Read it, train it, log the work.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1px',
            background: 'var(--color-steel-800)',
            border: '1px solid var(--color-steel-800)',
          }}
        >
          {INSIDE.map((item) => (
            <div
              key={item.label}
              style={{
                background: 'var(--color-graphite)',
                padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                display: 'grid',
                gap: '0.85rem',
                minHeight: '210px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStretch: '125%',
                  fontWeight: 800,
                  fontSize: 'clamp(2.75rem, 5vw, 4rem)',
                  lineHeight: 1,
                  color: 'var(--color-bone)',
                }}
              >
                {item.value}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ember)',
                }}
              >
                {item.label}
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  lineHeight: 1.5,
                  color: 'var(--color-steel-300)',
                  margin: 0,
                }}
              >
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
