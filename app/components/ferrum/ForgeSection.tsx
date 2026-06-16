import {Section, Eyebrow, Display} from './Section';
import {EmberCta} from './EmberCta';

type Spec = {label: string; value: string};

const SPECS: Spec[] = [
  {label: 'SKU', value: 'FRM-01'},
  {label: 'Material', value: 'Matte steel + polymer'},
  {label: 'Mass', value: '0.74 kg'},
  {label: 'Axes', value: '3D rotational'},
  {label: 'Trains', value: 'Crush · Rotation · Forearm'},
  {label: 'Finish', value: 'Bead-blast, oxide black'},
];

export function ForgeSection() {
  return (
    <Section id="forge">
      <div
        className="ferrum-forge-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: 'clamp(2.5rem, 5vw, 4.5rem)',
          alignItems: 'center',
        }}
      >
        <div style={{display: 'grid', gap: '1.5rem'}}>
          <Eyebrow>03 · The Device</Eyebrow>
          <Display as="h2" size="lg">
            The Forge.
          </Display>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
              lineHeight: 1.55,
              color: 'var(--color-steel-300)',
              margin: 0,
              maxWidth: '46ch',
            }}
          >
            A 3D rotational grip and forearm instrument. One device, three
            planes of load. Built to drive crush strength, rotational torque,
            and forearm hypertrophy on a single axis of work.
          </p>
          <dl
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1px',
              background: 'var(--color-steel-800)',
              border: '1px solid var(--color-steel-800)',
              margin: 0,
            }}
          >
            {SPECS.map((spec) => (
              <div
                key={spec.label}
                style={{
                  background: 'var(--color-graphite)',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                }}
              >
                <dt
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--color-steel-500)',
                    margin: 0,
                  }}
                >
                  {spec.label}
                </dt>
                <dd
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    color: 'var(--color-bone)',
                    margin: 0,
                  }}
                >
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
          <div style={{paddingTop: '0.5rem'}}>
            <EmberCta href="#offer">Claim the Forge</EmberCta>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gap: 'clamp(1rem, 1.5vw, 1.5rem)',
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
              src="/images/forge-glow.png"
              alt="The Forge — FRM-01 — beauty shot with ember glow."
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
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--color-steel-300)',
              }}
            >
              <span>FRM-01</span>
              <span>26 · Fe · 55.845</span>
            </figcaption>
          </figure>

          <figure
            style={{
              position: 'relative',
              margin: 0,
              border: '1px solid var(--color-steel-800)',
              background: 'var(--color-graphite)',
              overflow: 'hidden',
              aspectRatio: '16 / 9',
            }}
          >
            <img
              src="/images/detail-macro.png"
              alt="Macro detail — faceted grip surface, oxide-black finish."
              width={1920}
              height={1080}
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
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '55%',
                background:
                  'linear-gradient(90deg, color-mix(in oklab, var(--color-obsidian) 78%, transparent) 0%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />
            <figcaption
              style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                right: '1rem',
                display: 'grid',
                gap: '0.35rem',
                maxWidth: '20rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'var(--color-steel-300)',
                }}
              >
                Grip texture
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStretch: '125%',
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: 'var(--color-bone)',
                  lineHeight: 1.1,
                }}
              >
                Faceted under load.
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (min-width: 900px) {
              .ferrum-forge-grid { grid-template-columns: 1fr 1fr !important; }
            }
          `,
        }}
      />
    </Section>
  );
}
