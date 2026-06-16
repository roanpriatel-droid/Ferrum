type Props = {
  value: number;
  size?: number;
  label?: string;
};

export function StarRating({value, size = 14, label}: Props) {
  const rounded = Math.max(0, Math.min(5, value));
  const stars = Array.from({length: 5}, (_, i) => i + 1);

  return (
    <span
      role="img"
      aria-label={label ?? `${rounded.toFixed(1)} out of 5 stars`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size * 0.15,
        lineHeight: 1,
      }}
    >
      {stars.map((i) => {
        const fill =
          rounded >= i ? 1 : rounded >= i - 0.5 ? 0.5 : 0;
        return <Star key={i} size={size} fill={fill} />;
      })}
    </span>
  );
}

function Star({size, fill}: {size: number; fill: number}) {
  const color =
    fill === 0 ? 'var(--color-steel-800)' : 'var(--color-ember)';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      aria-hidden="true"
      style={{display: 'block'}}
    >
      <defs>
        <linearGradient id={`g${size}${fill}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset={`${fill * 100}%`} stopColor="var(--color-ember)" />
          <stop offset={`${fill * 100}%`} stopColor="var(--color-steel-800)" />
        </linearGradient>
      </defs>
      <path
        d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.78L10 14.77 4.8 17.5l.99-5.78L1.58 7.62l5.82-.85L10 1.5z"
        fill={fill > 0 && fill < 1 ? `url(#g${size}${fill})` : color}
      />
    </svg>
  );
}
