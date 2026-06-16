import type {ReactNode, ElementType, CSSProperties} from 'react';

type SectionProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  bleed?: boolean;
  style?: CSSProperties;
  id?: string;
};

export function Section({
  children,
  className = '',
  as: Tag = 'section',
  bleed = false,
  style,
  id,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={className}
      style={{
        borderTop: bleed ? 'none' : '1px solid var(--color-steel-800)',
        paddingTop: bleed ? 0 : 'clamp(4rem, 8vw, 8rem)',
        paddingBottom: bleed ? 0 : 'clamp(4rem, 8vw, 8rem)',
        paddingLeft: 'clamp(1.25rem, 4vw, 3rem)',
        paddingRight: 'clamp(1.25rem, 4vw, 3rem)',
        ...style,
      }}
    >
      <div style={{maxWidth: '1200px', margin: '0 auto', width: '100%'}}>
        {children}
      </div>
    </Tag>
  );
}

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function Eyebrow({children, className = '', style}: EyebrowProps) {
  return (
    <span
      className={className}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--color-steel-500)',
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

type DisplayProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  style?: CSSProperties;
};

const displaySizes: Record<NonNullable<DisplayProps['size']>, string> = {
  sm: 'clamp(1.75rem, 3vw, 2.5rem)',
  md: 'clamp(2.5rem, 5vw, 4rem)',
  lg: 'clamp(3.5rem, 7vw, 6rem)',
  xl: 'clamp(4.5rem, 11vw, 9rem)',
};

export function Display({
  children,
  className = '',
  as: Tag = 'h2',
  size = 'lg',
  style,
}: DisplayProps) {
  return (
    <Tag
      className={className}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: displaySizes[size],
        fontStretch: '125%',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        lineHeight: 0.95,
        textTransform: 'uppercase',
        color: 'var(--color-bone)',
        margin: 0,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
