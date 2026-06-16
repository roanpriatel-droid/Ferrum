import {
  TIERS,
  TIER_ORDER,
  type TierKey,
  formatUsd,
  perUnit,
  savings,
} from '~/lib/ferrum-offer';

type Props = {
  selected: TierKey;
  onSelect: (key: TierKey) => void;
};

export function TierSelector({selected, onSelect}: Props) {
  return (
    <div
      role="radiogroup"
      aria-label="Choose tier"
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr)',
        gap: '0.75rem',
      }}
      className="ferrum-tier-grid"
    >
      {TIER_ORDER.map((key) => {
        const tier = TIERS[key];
        const isSelected = key === selected;
        return (
          <TierOption
            key={key}
            tier={tier}
            isSelected={isSelected}
            onClick={() => onSelect(key)}
          />
        );
      })}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (min-width: 720px) {
              .ferrum-tier-grid { grid-template-columns: repeat(3, 1fr) !important; }
            }
          `,
        }}
      />
    </div>
  );
}

function TierOption({
  tier,
  isSelected,
  onClick,
}: {
  tier: (typeof TIERS)[TierKey];
  isSelected: boolean;
  onClick: () => void;
}) {
  const cents = savings(tier);
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={onClick}
      style={{
        position: 'relative',
        textAlign: 'left',
        padding: '1.25rem 1.25rem 1.5rem',
        background: isSelected
          ? 'color-mix(in oklab, var(--color-ember) 6%, var(--color-graphite))'
          : 'var(--color-graphite)',
        border: `1px solid ${isSelected ? 'var(--color-ember)' : 'var(--color-steel-800)'}`,
        color: 'var(--color-bone)',
        cursor: 'pointer',
        display: 'grid',
        gap: '0.5rem',
        minHeight: '160px',
        transition: 'border-color 150ms ease, background 150ms ease',
        fontFamily: 'var(--font-body)',
      }}
    >
      {tier.badge && (
        <span
          style={{
            position: 'absolute',
            top: '-0.6rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--color-ember)',
            color: 'var(--color-obsidian)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            padding: '0.25rem 0.6rem',
            whiteSpace: 'nowrap',
          }}
        >
          {tier.badge}
        </span>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-steel-500)',
          }}
        >
          {tier.id}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-steel-500)',
          }}
        >
          {tier.qty}× Forge
        </span>
      </div>
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontStretch: '125%',
          fontWeight: 700,
          fontSize: '1.4rem',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {tier.label}
      </span>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.5rem',
          marginTop: '0.25rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontStretch: '125%',
            fontWeight: 700,
            fontSize: '1.75rem',
            color: 'var(--color-bone)',
          }}
        >
          {formatUsd(tier.price)}
        </span>
        {tier.compareAt && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--color-steel-500)',
              textDecoration: 'line-through',
            }}
          >
            {formatUsd(tier.compareAt)}
          </span>
        )}
      </div>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
          color: 'var(--color-steel-300)',
        }}
      >
        {perUnit(tier)} ea · {tier.blurb}
      </span>
      {cents > 0 && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-ember)',
          }}
        >
          Save {formatUsd(cents)}
        </span>
      )}
    </button>
  );
}
