import {useState} from 'react';
import {GradedImage} from '../GradedImage';

type Plate = {
  url: string;
  alt: string;
  position: string;
  tint: number;
};

const FALLBACK_PLATES: Plate[] = [
  {
    url: '/images/bg-ember-glow.png',
    alt: 'The FERRUM Protocol — ember-glow cover plate.',
    position: '50% 55%',
    tint: 0.16,
  },
  {
    url: '/images/ember-flow.png',
    alt: 'Ember flow — phase divider plate.',
    position: '50% 50%',
    tint: 0.18,
  },
  {
    url: '/images/detail-macro.png',
    alt: 'Detail macro — the Forge surface alongside the Protocol pages.',
    position: '50% 50%',
    tint: 0.14,
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
    ? images!.slice(0, 3).map((img) => ({
        url: img.url,
        alt: img.altText || 'The FERRUM Protocol.',
        position: '50% 50%',
        tint: 0.16,
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
        <GradedImage
          src={plate.url}
          alt={plate.alt}
          width={1280}
          height={1600}
          priority
          tint={plate.tint}
          position={plate.position}
          style={{position: 'absolute', inset: 0}}
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
            zIndex: 2,
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
              <GradedImage
                src={p.url}
                alt=""
                decorative
                tint={0.14}
                style={{position: 'absolute', inset: 0}}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
