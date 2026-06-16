import {Section, Eyebrow, Display} from '../Section';

type Item = {q: string; a: string};

const ITEMS: Item[] = [
  {
    q: 'How is the Forge different from a hand gripper?',
    a: 'A hand gripper loads one plane: crush. The Forge loads three — crush, rotation, and drive — on a single instrument. The pegs expose each finger; the shell rotates against true torque; the body of the device moves in concentric and eccentric paths the gripper cannot.',
  },
  {
    q: 'What ships in the box?',
    a: 'The Forge (FRM-01) in a protective case, a printed quick-start card, and the FERRUM Protocol delivered to your inbox the day the order ships.',
  },
  {
    q: 'Do I need a gym?',
    a: 'No. The Forge is hand-held and the Protocol sessions run 8 to 12 minutes. Train at a desk, on a couch, in a hotel room. Reps, time, breath.',
  },
  {
    q: 'I am a beginner. Is this for me?',
    a: 'Yes. The Protocol auto-regulates load and rest. Phase 1 (Prime) calibrates against your starting grip and walks the work up from there. There is no equipment to swap.',
  },
  {
    q: 'When will I see vascularity?',
    a: 'Forearm circumference typically moves at 14 days. Resting vascularity follows at 30 to 45 days for most. Body composition determines how much surfaces.',
  },
  {
    q: 'What if it does not work?',
    a: 'The 30-Day Forge Guarantee. Train under the Protocol for 30 days. If the forearm has not changed, return the Forge for a full refund. Keep the Protocol either way.',
  },
];

export function PdpFaq() {
  return (
    <Section id="faq">
      <div style={{display: 'grid', gap: 'clamp(2rem, 4vw, 3rem)'}}>
        <div style={{display: 'grid', gap: '1rem', maxWidth: '720px'}}>
          <Eyebrow>FAQ</Eyebrow>
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
                  fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
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
