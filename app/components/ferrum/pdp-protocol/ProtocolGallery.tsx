import {useState} from 'react';

type Plate = {
  url: string;
  alt: string;
  position: string;
  scrim: 'glow' | 'flow' | 'macro';
};

const FALLBACK_PLATES: Plate[] = [
  {
    url: '/images/bg-ember-glow.png',
    alt: 'The FERRUM Protocol — ember-glow cover plate.',
    position: '50% 55%',
    scrim: 'glow',
  },
  {
    url: '/images/ember-flow.png',
    alt: 'Ember flow — phase divider plate.',
    position: '50% 50%',
    scrim: 'flow',
  },
  {
    url: '/images/detail-macro.png',
    alt: 'Detail macro — the Forge surface alongside the Protocol pages.',
    position: '50% 50%',
    scrim: 'macro',
  },
];

type Props = {
  images?: Array<{
    url: string;
    altText?: string | null;
    id?: string | null;
    width?: number | null;
    height?: number | null;
  }> | null;
};

export function ProtocolGallery({images}: Props) {
  const live = images && images.length > 0;
  const plates: Plate[] = live
    ? images!.slice(0, 3).map((img, i) => ({
        url: img.url,
        alt: img.altText || 'The FERRUM Protocol.',
        position: '50% 50%',
        scrim: (['glow', 'flow', 'macro'] as const)[i] ?? 'glow',
      }))
    : FALLBACK_PLATES;

  const [active, setActive] = useState(0);
  const plate = plates[Math.min(active, plates.length - 1)];

  return (
    <div
      style={{
        display: 'grid',
        gap: '0.75rem',
        position: 'sticky',
        top: 'calc(var(--header-height) + 1.25rem)',
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
          src={plate.url}
          alt={plate.alt}
          width={1280}
          height={1600}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: plate.position,
            borderRadius: 0,
            filter:
              plate.scrim === 'macro'
                ? 'saturate(0.85) brightness(0.95)'
                : 'saturate(1.1) contrast(1.05)',
          }}
        />
        <ComplexionLayers scrim={plate.scrim} />
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
          <span>The Protocol · 30-day system</span>
          <span>Fe · 55.845</span>
        </figcaption>
      </figure>

      <div
        role="tablist"
        aria-label="Protocol gallery"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${plates.length}, minmax(0, 1fr))`,
          gap: '0.5rem',
        }}
      >
        {plates.map((p, i) => {
          const selected = i === active;
          return (
            <button
              key={p.url}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(i)}
              style={{
                position: 'relative',
                aspectRatio: '1 / 1',
                background: 'var(--color-graphite)',
                border: `1px solid ${
                  selected
                    ? 'var(--color-ember)'
                    : 'var(--color-steel-800)'
                }`,
                padding: 0,
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'border-color 150ms ease',
              }}
            >
              <img
                src={p.url}
                alt=""
                loading="lazy"
                decoding="async"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 0,
                  filter: 'saturate(1.05)',
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ComplexionLayers({scrim}: {scrim: Plate['scrim']}) {
  const styles = {
    glow:
      'radial-gradient(circle at 80% 110%, color-mix(in oklab, var(--color-ember) 32%, transparent) 0%, transparent 55%), linear-gradient(180deg, color-mix(in oklab, var(--color-obsidian) 25%, transparent) 0%, color-mix(in oklab, var(--color-obsidian) 75%, transparent) 100%)',
    flow:
      'linear-gradient(90deg, color-mix(in oklab, var(--color-obsidian) 70%, transparent) 0%, color-mix(in oklab, var(--color-obsidian) 35%, transparent) 35%, color-mix(in oklab, var(--color-obsidian) 70%, transparent) 100%)',
    macro:
      'linear-gradient(180deg, color-mix(in oklab, var(--color-obsidian) 40%, transparent) 0%, color-mix(in oklab, var(--color-obsidian) 88%, transparent) 100%)',
  };
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        background: styles[scrim],
        pointerEvents: 'none',
        mixBlendMode: 'multiply',
      }}
    />
  );
}
