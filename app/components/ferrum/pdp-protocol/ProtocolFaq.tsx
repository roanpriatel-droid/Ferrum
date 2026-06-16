import {Section, Eyebrow, Display} from '../Section';

const ITEMS: Array<{q: string; a: string}> = [
  {
    q: 'How is the Protocol delivered?',
    a: 'A versioned PDF and a companion web reader. Sent to the email used at checkout the moment payment clears. No app, no login wall.',
  },
  {
    q: 'Do I need the Forge to use it?',
    a: 'The Protocol is calibrated to the Forge. The phases assume you train on the device. Buy them together for the full system.',
  },
  {
    q: 'Do I need a gym?',
    a: 'No. Every session is hand-held and runs eight to twelve minutes. Train at a desk, on a couch, in a hotel room.',
  },
  {
    q: 'I am a beginner. Is this for me?',
    a: 'Yes. Phase 01 (Prime) calibrates against your starting grip and walks the work up. The Protocol auto-regulates load and rest.',
  },
  {
    q: 'Do I need occlusion bands?',
    a: 'No. Occlusion is offered as an optional finisher in the Forge phase. The rest of the system runs without it.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Yes. Thirty-day guarantee. If the Protocol has not earned its place, email returns@ferrum.fit and the purchase is refunded.',
  },
];

export function ProtocolFaq() {
  return (
    <Section id="protocol-faq">
      <div style={{display: 'grid', gap: 'clamp(2rem, 4vw, 3rem)'}}>
        <div style={{display: 'grid', gap: '1rem', maxWidth: '720px'}}>
          <Eyebrow>05 · FAQ</Eyebrow>
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
