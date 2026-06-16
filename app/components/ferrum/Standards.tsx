import {Section, Eyebrow, Display} from './Section';
import {EmberCta} from './EmberCta';

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

type Testimonial = {
  quote: string;
  attribution: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Awaiting verified customer review.',
    attribution: 'Pending · 2026',
  },
  {
    quote: 'Awaiting verified customer review.',
    attribution: 'Pending · 2026',
  },
  {
    quote: 'Awaiting verified customer review.',
    attribution: 'Pending · 2026',
  },
];

export function Standards() {
  return (
    <Section id="standards">
      <div style={{display: 'grid', gap: 'clamp(2.5rem, 5vw, 4rem)'}}>
        <div
          className="ferrum-standards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            alignItems: 'center',
          }}
        >
          <figure
            style={{
              position: 'relative',
              margin: 0,
              border: '1px solid var(--color-steel-800)',
              background: 'var(--color-graphite)',
              overflow: 'hidden',
              aspectRatio: '4 / 5',
            }}
          >
            <img
              src="/images/forearm.png"
              alt="A vascular forearm at rest beside the Forge — the standard."
              width={1280}
              height={1600}
              loading="lazy"
              decoding="async"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: '50% 50%',
                borderRadius: 0,
              }}
            />
            <figcaption
              style={{
                position: 'absolute',
                left: '1rem',
                bottom: '1rem',
                right: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--color-steel-300)',
              }}
            >
              Result · Rank 02 · Forged
            </figcaption>
          </figure>

          <div style={{display: 'grid', gap: '1.5rem', maxWidth: '38rem'}}>
            <Eyebrow>06 · Standards</Eyebrow>
            <Display as="h2" size="md">
              Four ranks.
              <br />
              One direction.
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
              The progression is linear. The work is not. Track where you
              stand against the standard, not against yesterday.
            </p>
            <div style={{paddingTop: '0.25rem'}}>
              <EmberCta href="#offer">Claim the Forge</EmberCta>
            </div>
          </div>
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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <blockquote
              key={i}
              style={{
                margin: 0,
                padding: '1.5rem',
                background: 'var(--color-graphite)',
                border: '1px solid var(--color-steel-800)',
                display: 'grid',
                gap: '1rem',
                minHeight: '140px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  lineHeight: 1.5,
                  color: 'var(--color-steel-300)',
                  fontStyle: 'italic',
                  margin: 0,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-steel-500)',
                }}
              >
                {t.attribution}
              </span>
            </blockquote>
          ))}
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (min-width: 900px) {
              .ferrum-standards-grid { grid-template-columns: 1fr 1.1fr !important; }
            }
          `,
        }}
      />
    </Section>
  );
}
