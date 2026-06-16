type FeTileProps = {
  size?: number;
  className?: string;
};

export function FeTile({size = 240, className = ''}: FeTileProps) {
  const padding = size * 0.08;
  const numberSize = size * 0.11;
  const symbolSize = size * 0.5;
  const footerSize = size * 0.075;
  const glow = size * 0.6;

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        position: 'relative',
        background: 'var(--color-graphite)',
        border: '1px solid var(--color-steel-800)',
        color: 'var(--color-bone)',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 60%, color-mix(in oklab, var(--color-ember) 22%, transparent) 0%, transparent ${glow}px)`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: padding,
          left: padding,
          fontFamily: 'var(--font-mono)',
          fontSize: numberSize,
          lineHeight: 1,
          letterSpacing: '0.04em',
          color: 'var(--color-steel-300)',
        }}
      >
        26
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontSize: symbolSize,
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          color: 'var(--color-bone)',
          textTransform: 'none',
        }}
      >
        Fe
      </div>
      <div
        style={{
          position: 'absolute',
          left: padding,
          right: padding,
          bottom: padding,
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)',
          fontSize: footerSize,
          lineHeight: 1,
          letterSpacing: '0.18em',
          color: 'var(--color-steel-500)',
          textTransform: 'uppercase',
        }}
      >
        <span>Ferrum</span>
        <span style={{letterSpacing: '0.04em', textTransform: 'none'}}>
          55.845
        </span>
      </div>
    </div>
  );
}
