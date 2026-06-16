import type {CSSProperties, ReactNode} from 'react';

type Variant = 'solid' | 'ghost';
type Size = 'md' | 'lg';

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  block?: boolean;
  style?: CSSProperties;
};

const PAD: Record<Size, string> = {
  md: '1rem 2rem',
  lg: '1.35rem 2.75rem',
};

const FONT: Record<Size, string> = {
  md: '0.82rem',
  lg: '0.95rem',
};

export function EmberCta({
  href,
  children,
  variant = 'solid',
  size = 'md',
  block = false,
  style,
}: Props) {
  const solid = variant === 'solid';
  const base: CSSProperties = {
    display: block ? 'flex' : 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
    padding: PAD[size],
    fontFamily: 'var(--font-mono)',
    fontSize: FONT[size],
    letterSpacing: '0.24em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    border: solid ? 'none' : '1px solid var(--color-ember)',
    background: solid ? 'var(--color-ember)' : 'transparent',
    color: solid ? 'var(--color-obsidian)' : 'var(--color-ember)',
    cursor: 'pointer',
    transition: 'filter 200ms ease, transform 200ms ease, background 200ms ease',
    width: block ? '100%' : undefined,
    ...style,
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      style={base}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = 'brightness(1.08)';
        if (!solid) {
          e.currentTarget.style.background =
            'color-mix(in oklab, var(--color-ember) 12%, transparent)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = 'none';
        if (!solid) e.currentTarget.style.background = 'transparent';
      }}
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}
