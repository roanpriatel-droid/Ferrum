import type {CSSProperties, ReactNode} from 'react';

// The FERRUM Complexion — one unified grade applied to every image on the
// site so eleven separately-generated source plates read as one world.
//
// Stack of layers, top to bottom:
//   img → desaturated, raised contrast, slightly darker
//   ember soft-light → warms cool plates into the ember family
//   obsidian multiply → locks shadows to the page background
//   vignette → premium edge falloff
//   fine grain → film cohesion across the whole site
//
// The grain layer is one URL-encoded SVG turbulence shared across every
// rendered image; the browser caches and decodes it once.

const NOISE_URL =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='220' height='220' filter='url(%23n)' opacity='0.55'/></svg>\")";

const IMG_FILTER = 'saturate(0.85) contrast(1.14) brightness(0.92)';

type Fit = 'cover' | 'contain';

type Props = {
  src: string;
  alt: string;
  /** ember soft-light opacity (warmth dial). Default 0.16. Cool plates: 0.22+. */
  tint?: number;
  /** eager + high fetch priority for above-fold imagery */
  priority?: boolean;
  width?: number;
  height?: number;
  /** explicit object-position string (e.g. "70% 50%") */
  position?: string;
  /** object-fit, default cover */
  fit?: Fit;
  /** outer container className */
  className?: string;
  /** outer container styles */
  style?: CSSProperties;
  /** styles applied directly to the <img> (e.g. additional transform) */
  imgStyle?: CSSProperties;
  /** overlay content rendered above all grade layers (e.g. figcaption) */
  children?: ReactNode;
  /** image is decorative; suppresses alt + adds aria-hidden */
  decorative?: boolean;
};

export function GradedImage({
  src,
  alt,
  tint = 0.16,
  priority = false,
  width,
  height,
  position = '50% 50%',
  fit = 'cover',
  className,
  style,
  imgStyle,
  children,
  decorative,
}: Props) {
  return (
    <span
      className={className}
      style={{
        position: 'relative',
        display: 'block',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: 'var(--color-obsidian)',
        ...style,
      }}
    >
      <img
        src={src}
        alt={decorative ? '' : alt}
        aria-hidden={decorative ? true : undefined}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: fit,
          objectPosition: position,
          filter: IMG_FILTER,
          borderRadius: 0,
          ...imgStyle,
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--color-ember)',
          mixBlendMode: 'soft-light',
          opacity: tint,
          pointerEvents: 'none',
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--color-obsidian)',
          mixBlendMode: 'multiply',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(11,11,13,0.55) 100%)',
          pointerEvents: 'none',
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: NOISE_URL,
          backgroundSize: '220px 220px',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
          opacity: 0.05,
          pointerEvents: 'none',
        }}
      />
      {children}
    </span>
  );
}
