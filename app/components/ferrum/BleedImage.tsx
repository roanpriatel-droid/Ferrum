import {useEffect, useRef, useState, type CSSProperties} from 'react';

type Fit = 'cover' | 'contain';

type Props = {
  src: string;
  alt: string;
  height?: string;
  fit?: Fit;
  position?: string;
  scrim?: 'none' | 'soft' | 'strong' | 'left' | 'bottom';
  parallax?: boolean;
  scaleOnReveal?: boolean;
  eager?: boolean;
  width?: number;
  imgHeight?: number;
  className?: string;
  style?: CSSProperties;
};

function scrimCss(scrim: NonNullable<Props['scrim']>): string | undefined {
  switch (scrim) {
    case 'soft':
      return 'linear-gradient(180deg, color-mix(in oklab, var(--color-obsidian) 35%, transparent) 0%, color-mix(in oklab, var(--color-obsidian) 70%, transparent) 100%)';
    case 'strong':
      return 'linear-gradient(180deg, color-mix(in oklab, var(--color-obsidian) 55%, transparent) 0%, color-mix(in oklab, var(--color-obsidian) 92%, transparent) 100%)';
    case 'left':
      return 'linear-gradient(90deg, color-mix(in oklab, var(--color-obsidian) 88%, transparent) 0%, color-mix(in oklab, var(--color-obsidian) 60%, transparent) 38%, transparent 70%)';
    case 'bottom':
      return 'linear-gradient(180deg, transparent 0%, transparent 55%, color-mix(in oklab, var(--color-obsidian) 92%, transparent) 100%)';
    default:
      return undefined;
  }
}

export function BleedImage({
  src,
  alt,
  height = 'clamp(420px, 70vh, 720px)',
  fit = 'cover',
  position = '50% 50%',
  scrim = 'soft',
  parallax = false,
  scaleOnReveal = false,
  eager = false,
  width,
  imgHeight,
  className,
  style,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(eager);
  const [offset, setOffset] = useState(0);
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (eager) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setRevealed(true);
        }
      },
      {threshold: 0.15},
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  useEffect(() => {
    if (!parallax || reducedMotion) return;
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const center = rect.top + rect.height / 2;
      const delta = (center - vh / 2) / vh;
      setOffset(-delta * 40);
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
  }, [parallax, reducedMotion]);

  const imgScale =
    reducedMotion || !scaleOnReveal ? 1 : revealed ? 1 : 1.06;
  const imgOpacity = eager ? 1 : revealed ? 1 : 0;

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height,
        overflow: 'hidden',
        background: 'var(--color-obsidian)',
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={imgHeight}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        fetchPriority={eager ? 'high' : 'auto'}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: fit,
          objectPosition: position,
          transform: `translate3d(0, ${offset}px, 0) scale(${imgScale})`,
          opacity: imgOpacity,
          transition:
            'opacity 800ms ease, transform 1200ms cubic-bezier(0.2, 0.6, 0.2, 1)',
          borderRadius: 0,
        }}
      />
      {scrim !== 'none' && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: scrimCss(scrim),
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}
