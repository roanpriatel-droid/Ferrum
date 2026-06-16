import {Section, Eyebrow, Display} from './Section';

type Item = {q: string; a: string};

const ITEMS: Item[] = [
  {
    q: 'When will I see results?',
    a: 'Forearm circumference moves in 14 days under the FERRUM Protocol. Resting vascularity follows at 30 to 45 days for most. Body composition determines the rest.',
  },
  {
    q: 'How often do I train, and can I overtrain?',
    a: 'Five sessions of 8 to 12 minutes per week. The Protocol auto-regulates load and rest. Forearms recover fast — under the prescription, overtraining is not the limiting factor.',
  },
  {
    q: 'Does it fit my current training?',
    a: 'Yes. The Forge is a finisher, not a replacement. Slot the prescribed sessions after lifts, before cardio, or as standalone work. Five minutes is enough.',
  },
  {
    q: 'What is included?',
    a: 'One Forge per unit ordered, the 30-day FERRUM Protocol delivered digitally on ship date, and free shipping. No subscriptions. No upsells at checkout.',
  },
];

export function Faq() {
  return (
    <Section id="faq">
      <div style={{display: 'grid', gap: 'clamp(2rem, 4vw, 3rem)'}}>
        <div style={{display: 'grid', gap: '1rem', maxWidth: '720px'}}>
          <Eyebrow>08 · FAQ</Eyebrow>
          <Display as="h2" size="md">
            Common questions.
          </Display>
        </div>
        <div
          style={{
            borderTop: '1px solid var(--color-steel-800)',
            borderBottom: '1px solid var(--color-steel-800)',
          }}
        >
          {ITEMS.map((item, i) => (
            <details
              key={item.q}
              style={{
                borderBottom:
                  i === ITEMS.length - 1
                    ? 'none'
                    : '1px solid var(--color-steel-800)',
                padding: '1.5rem 0',
              }}
            >
              <summary
                style={{
                  cursor: 'pointer',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  fontFamily: 'var(--font-display)',
                  fontStretch: '125%',
                  fontWeight: 600,
                  fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: 'var(--color-bone)',
                }}
              >
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.25rem',
                    color: 'var(--color-steel-500)',
                  }}
                >
                  +
                </span>
              </summary>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: 'var(--color-steel-300)',
                  margin: '1rem 0 0',
                  maxWidth: '60ch',
                }}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
