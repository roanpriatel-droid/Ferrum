import {Section, Eyebrow, Display} from '../Section';

type Rank = {
  index: string;
  name: string;
  caption: string;
};

const RANKS: Rank[] = [
  {index: '00', name: 'Novice', caption: 'No measurable grip. Begins the work.'},
  {index: '01', name: 'Trained', caption: 'Visible vein in load. 30 days in.'},
  {index: '02', name: 'Forged', caption: 'Resting vascularity. Daily presence.'},
  {index: '03', name: 'Iron', caption: 'Branched, dense, permanent.'},
];

export function StandardsStrip() {
  return (
    <Section id="reviews">
      <div style={{display: 'grid', gap: 'clamp(2rem, 4vw, 3rem)'}}>
        <div style={{display: 'grid', gap: '1rem', maxWidth: '760px'}}>
          <Eyebrow>Standards</Eyebrow>
          <Display as="h2" size="md">
            Four ranks. One direction.
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
            FERRUM is measured against a standard, not against yesterday.
            Train, log, and move up.
          </p>
        </div>
        <ol
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1px',
            background: 'var(--color-steel-800)',
            border: '1px solid var(--color-steel-800)',
          }}
        >
          {RANKS.map((rank) => (
            <li
              key={rank.name}
              style={{
                background: 'var(--color-graphite)',
                padding: '1.5rem 1.5rem 1.75rem',
                display: 'grid',
                gap: '0.75rem',
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
                Rank {rank.index}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStretch: '125%',
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--color-bone)',
                }}
              >
                {rank.name}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  lineHeight: 1.5,
                  color: 'var(--color-steel-300)',
                }}
              >
                {rank.caption}
              </span>
            </li>
          ))}
        </ol>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-steel-500)',
            margin: 0,
          }}
        >
          Verified customer reviews · Pending · 2026
        </p>
      </div>
    </Section>
  );
}
