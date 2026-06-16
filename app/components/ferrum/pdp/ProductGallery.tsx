import {useState} from 'react';

export type GalleryImage = {
  id?: string | null;
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};

const FALLBACK: GalleryImage[] = [
  {url: '/images/forge-glow.png', altText: 'The Forge — FRM-01, ember-lit beauty shot.'},
  {url: '/images/detail-macro.png', altText: 'The Forge grip — faceted, matte oxide-black finish.'},
  {url: '/images/forge-concrete.png', altText: 'The Forge laid on raw concrete — the studio setting.'},
  {url: '/images/arsenal-trio.png', altText: 'Arsenal — three Forge units.'},
];

type Props = {
  images?: GalleryImage[] | null;
  title?: string;
};

export function ProductGallery({images, title = 'The Forge'}: Props) {
  const set = images && images.length > 0 ? images : FALLBACK;
  const [activeIdx, setActiveIdx] = useState(0);
  const active = set[Math.min(activeIdx, set.length - 1)];

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
          src={active.url}
          alt={active.altText || title}
          width={active.width || 1280}
          height={active.height || 1600}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
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

      {set.length > 1 && (
        <div
          role="tablist"
          aria-label="Product images"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(set.length, 6)}, minmax(0, 1fr))`,
            gap: '0.5rem',
          }}
        >
          {set.slice(0, 6).map((img, i) => {
            const selected = i === activeIdx;
            return (
              <button
                key={img.id ?? img.url}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveIdx(i)}
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
                  src={img.url}
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
                  }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
