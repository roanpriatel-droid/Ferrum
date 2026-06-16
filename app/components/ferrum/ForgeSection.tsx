import {Section, Eyebrow, Display} from './Section';
import {FeTile} from './FeTile';

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
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: 'clamp(2.5rem, 5vw, 4rem)',
          alignItems: 'start',
        }}
        className="forge-grid"
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
        </div>
        <ForgeProductSlot />
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (min-width: 900px) {
              .forge-grid { grid-template-columns: 1fr 1fr !important; }
            }
          `,
        }}
      />
    </Section>
  );
}

function ForgeProductSlot() {
  // TODO: real product photography. This placeholder uses the FeTile as a
  // brand-consistent stand-in until photography ships.
  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '1 / 1',
        background: 'var(--color-graphite)',
        border: '1px solid var(--color-steel-800)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      aria-label="Product photography placeholder"
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-ember) 12%, transparent) 0%, transparent 60%)',
        }}
      />
      <FeTile size={260} />
      <span
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--color-steel-500)',
        }}
      >
        FRM-01 · Render pending
      </span>
    </div>
  );
}
