import {useEffect, useRef, useState} from 'react';
import type {CSSProperties, ReactNode} from 'react';
import {GradedImage} from './GradedImage';

type Scrim = 'left' | 'right' | 'bottom' | 'top' | 'none';

type Props = {
  src: string;
  alt?: string;
  /** explicit container height (CSS length or clamp()). Default 'auto' if children control it. */
  height?: string;
  /** min-height for hero bands */
  minHeight?: string;
  /** object-position */
  position?: string;
  /** ember soft-light opacity for this band. Default 0.16. */
  tint?: number;
  /** directional text-scrim that keeps overlaid copy legible. Default 'none'. */
  scrim?: Scrim;
  /** add a soft side-fade into obsidian on left/right edges */
  sideFade?: boolean;
  /** above-fold? */
  priority?: boolean;
  /** slow scale 1.0 → 1.06 on scroll; auto-disabled for reduced motion */
  parallax?: boolean;
  /** strip the top fade (useful when band sits flush against another band) */
  noTopFade?: boolean;
  /** strip the bottom fade */
  noBottomFade?: boolean;
  /** band is decorative — image alt is suppressed */
  decorative?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

const FADE = 'var(--color-obsidian)';

export function ImageBand({
  src,
  alt = '',
  height,
  minHeight,
  position = '50% 50%',
  tint = 0.16,
  scrim = 'none',
  sideFade = false,
  priority = false,
  parallax = true,
  noTopFade = false,
  noBottomFade = false,
  decorative,
  className,
  style,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!parallax) return;
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced) return;

    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when band center is at viewport top, 1 when at viewport bottom
      const center = rect.top + rect.height / 2;
      const t = Math.max(0, Math.min(1, center / vh));
      // 1.0 at the very top of the pass, 1.06 at the very bottom
      const next = 1 + t * 0.06;
      setScale(next);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [parallax]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height,
        minHeight,
        overflow: 'hidden',
        background: 'var(--color-obsidian)',
        ...style,
      }}
    >
      <div
        aria-hidden={decorative ? true : undefined}
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${scale})`,
          transition: 'transform 240ms cubic-bezier(0.22, 0.61, 0.36, 1)',
          willChange: parallax ? 'transform' : undefined,
        }}
      >
        <GradedImage
          src={src}
          alt={alt}
          tint={tint}
          priority={priority}
          position={position}
          decorative={decorative}
        />
      </div>

      {!noTopFade && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, ${FADE} 0%, transparent 16%)`,
            pointerEvents: 'none',
          }}
        />
      )}
      {!noBottomFade && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(0deg, ${FADE} 0%, transparent 16%)`,
            pointerEvents: 'none',
          }}
        />
      )}
      {sideFade && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(90deg, ${FADE} 0%, transparent 12%, transparent 88%, ${FADE} 100%)`,
            pointerEvents: 'none',
          }}
        />
      )}
      {scrim !== 'none' && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: scrimCss(scrim),
            pointerEvents: 'none',
          }}
        />
      )}

      {children && (
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            height: '100%',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function scrimCss(scrim: Exclude<Scrim, 'none'>): string {
  switch (scrim) {
    case 'left':
      return 'linear-gradient(90deg, rgba(11,11,13,0.85) 0%, rgba(11,11,13,0.2) 45%, transparent 70%)';
    case 'right':
      return 'linear-gradient(270deg, rgba(11,11,13,0.85) 0%, rgba(11,11,13,0.2) 45%, transparent 70%)';
    case 'bottom':
      return 'linear-gradient(0deg, rgba(11,11,13,0.85) 0%, rgba(11,11,13,0.2) 45%, transparent 70%)';
    case 'top':
      return 'linear-gradient(180deg, rgba(11,11,13,0.85) 0%, rgba(11,11,13,0.2) 45%, transparent 70%)';
  }
}
