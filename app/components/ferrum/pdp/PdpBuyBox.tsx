import {useNavigate} from 'react-router';
import {Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';
import {getVariantUrl} from '~/lib/variants';
import {
  TIER_PRESENTATION,
  TIER_ORDER,
  inferTier,
  type TierKey,
  type TierPresentation,
} from '~/lib/ferrum-tiers';

type VariantLike = {
  id: string;
  title?: string | null;
  availableForSale: boolean;
  price: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
  selectedOptions: Array<{name: string; value: string}>;
};

type Props = {
  productTitle: string;
  productHandle: string;
  selectedVariant: VariantLike | null;
  variants: VariantLike[];
};

type TierBinding = {
  tier: TierPresentation;
  variant: VariantLike;
};

function bindVariantsToTiers(variants: VariantLike[]): TierBinding[] {
  const taken = new Set<TierKey>();
  const bound: TierBinding[] = [];

  variants.forEach((variant, idx) => {
    let key = inferTier(variant, idx);
    if (taken.has(key)) {
      // De-dup: walk to next free tier slot
      const fallback = TIER_ORDER.find((k) => !taken.has(k));
      if (!fallback) return;
      key = fallback;
    }
    taken.add(key);
    bound.push({tier: TIER_PRESENTATION[key], variant});
  });

  // Sort by tier index so the UI is always Solo → Duo → Arsenal
  return bound.sort((a, b) => a.tier.index - b.tier.index);
}

function formatPerUnit(price: MoneyV2, qty: number): string {
  const amount = Number(price.amount) / qty;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currencyCode,
    maximumFractionDigits: 2,
  }).format(amount);
}

function savings(
  price: MoneyV2,
  compareAt?: MoneyV2 | null,
): {amount: number; formatted: string} | null {
  if (!compareAt) return null;
  const delta = Number(compareAt.amount) - Number(price.amount);
  if (delta <= 0) return null;
  return {
    amount: delta,
    formatted: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currencyCode,
      maximumFractionDigits: 2,
    }).format(delta),
  };
}

export function PdpBuyBox({
  productTitle,
  productHandle,
  selectedVariant,
  variants,
}: Props) {
  const navigate = useNavigate();
  const {open} = useAside();
  const bound = bindVariantsToTiers(variants);

  const active =
    selectedVariant ??
    bound.find((b) => b.tier.key === 'duo')?.variant ??
    bound[0]?.variant ??
    null;

  const activeBinding =
    bound.find((b) => b.variant.id === active?.id) ?? bound[0] ?? null;
  const activeTier = activeBinding?.tier;
  const activeVariant = activeBinding?.variant ?? active;

  const saved =
    activeVariant && activeVariant.compareAtPrice
      ? savings(activeVariant.price, activeVariant.compareAtPrice)
      : null;

  return (
    <div style={{display: 'grid', gap: 'clamp(1.5rem, 2.5vw, 2rem)'}}>
      <div style={{display: 'grid', gap: '0.75rem'}}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--color-steel-500)',
          }}
        >
          FRM-01 · 26 · Fe · 55.845
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontStretch: '125%',
            fontWeight: 800,
            fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            color: 'var(--color-bone)',
            margin: 0,
          }}
        >
          {productTitle || 'The Forge'}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.02rem, 1.3vw, 1.18rem)',
            lineHeight: 1.5,
            color: 'var(--color-steel-300)',
            margin: 0,
            maxWidth: '34rem',
          }}
        >
          A 3D rotational grip instrument. Crush, rotate, and drive — engineered
          into one device. Ships with the 30-day FERRUM Protocol.
        </p>
      </div>

      <div
        role="radiogroup"
        aria-label="Choose tier"
        style={{
          display: 'grid',
          gap: '0.75rem',
          gridTemplateColumns: 'minmax(0, 1fr)',
        }}
        className="ferrum-pdp-tiers"
      >
        {bound.length === 0 && (
          <PlaceholderTier
            note="Variants will appear here once the Forge product is configured in Shopify."
          />
        )}
        {bound.map(({tier, variant}) => {
          const isActive = variant.id === activeVariant?.id;
          return (
            <TierCard
              key={variant.id}
              tier={tier}
              variant={variant}
              active={isActive}
              onSelect={() => {
                if (isActive) return;
                const url = getVariantUrl({
                  handle: productHandle,
                  pathname: `/products/${productHandle}`,
                  searchParams: new URLSearchParams(),
                  selectedOptions: variant.selectedOptions,
                });
                void navigate(url, {
                  replace: true,
                  preventScrollReset: true,
                });
              }}
            />
          );
        })}
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: '1rem',
          paddingTop: '0.5rem',
          borderTop: '1px solid var(--color-steel-800)',
        }}
      >
        <div style={{display: 'grid', gap: '0.25rem'}}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-steel-500)',
            }}
          >
            Total · {activeTier?.label ?? '—'}
          </span>
          <div
            style={{display: 'flex', alignItems: 'baseline', gap: '0.75rem'}}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontStretch: '125%',
                fontWeight: 800,
                fontSize: 'clamp(2.25rem, 3.8vw, 3rem)',
                color: 'var(--color-bone)',
                lineHeight: 1,
              }}
            >
              {activeVariant ? <Money data={activeVariant.price} /> : '—'}
            </span>
            {activeVariant?.compareAtPrice && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1rem',
                  color: 'var(--color-steel-500)',
                  textDecoration: 'line-through',
                }}
              >
                <Money data={activeVariant.compareAtPrice} />
              </span>
            )}
          </div>
        </div>
        {saved && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-ember)',
            }}
          >
            You save {saved.formatted}
          </span>
        )}
      </div>

      <Pills>
        <Pill>Free shipping</Pill>
        <Pill>Protocol included · $39 value</Pill>
        <Pill>30-day Forge Guarantee</Pill>
      </Pills>

      <div className="ferrum-pdp-atc">
        <AddToCartButton
          disabled={!activeVariant || !activeVariant.availableForSale}
          onClick={() => open('cart')}
          lines={
            activeVariant
              ? [
                  {
                    merchandiseId: activeVariant.id,
                    quantity: 1,
                    selectedVariant: activeVariant as unknown as never,
                    attributes: [
                      {key: 'Tier', value: activeTier?.label ?? ''},
                      {key: 'Pack quantity', value: String(activeTier?.qty ?? 1)},
                    ],
                  },
                ]
              : []
          }
        >
          {!activeVariant
            ? 'Unavailable'
            : !activeVariant.availableForSale
              ? 'Sold out'
              : `Claim the Forge · ${activeTier?.label ?? ''}`}
        </AddToCartButton>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '0.75rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--color-steel-500)',
        }}
      >
        <span>Secure checkout · Shopify</span>
        {/* TODO: confirm fulfillment origin before launch */}
        <span>Ships from [TODO]</span>
        <span>Ships in 3–5 business days</span>
      </div>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.88rem',
          lineHeight: 1.55,
          color: 'var(--color-steel-300)',
          margin: 0,
          maxWidth: '40rem',
        }}
      >
        Payment is processed by Shopify. Card details are never stored on
        FERRUM servers. Train under the FERRUM Protocol for 30 days. If your
        forearm has not changed, return the Forge for a full refund — keep the
        Protocol either way.
      </p>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .ferrum-pdp-atc button {
              width: 100%;
              padding: 1.15rem 2rem;
              background: var(--color-ember);
              color: var(--color-obsidian);
              border: none;
              font-family: var(--font-mono);
              font-size: 0.9rem;
              letter-spacing: 0.24em;
              text-transform: uppercase;
              cursor: pointer;
              transition: filter 200ms ease;
            }
            .ferrum-pdp-atc button:hover:not([disabled]) {
              filter: brightness(1.08);
            }
            .ferrum-pdp-atc button:disabled {
              opacity: 0.55;
              cursor: not-allowed;
              filter: grayscale(0.4);
            }
            @media (min-width: 640px) {
              .ferrum-pdp-tiers { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
            }
          `,
        }}
      />
    </div>
  );
}

function TierCard({
  tier,
  variant,
  active,
  onSelect,
}: {
  tier: TierPresentation;
  variant: VariantLike;
  active: boolean;
  onSelect: () => void;
}) {
  const soldOut = !variant.availableForSale;
  const saved = savings(variant.price, variant.compareAtPrice);

  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onSelect}
      disabled={soldOut}
      style={{
        position: 'relative',
        textAlign: 'left',
        padding: '1.25rem 1.25rem 1.5rem',
        background: active
          ? 'color-mix(in oklab, var(--color-ember) 6%, var(--color-graphite))'
          : 'var(--color-graphite)',
        border: `1px solid ${
          active ? 'var(--color-ember)' : 'var(--color-steel-800)'
        }`,
        color: 'var(--color-bone)',
        cursor: soldOut ? 'not-allowed' : 'pointer',
        opacity: soldOut ? 0.55 : 1,
        display: 'grid',
        gap: '0.45rem',
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
            fontSize: '0.62rem',
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
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-steel-500)',
          }}
        >
          {tier.qty}× Forge
        </span>
        {soldOut && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-steel-500)',
            }}
          >
            Sold out
          </span>
        )}
      </div>
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontStretch: '125%',
          fontWeight: 700,
          fontSize: '1.35rem',
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
          marginTop: '0.15rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontStretch: '125%',
            fontWeight: 700,
            fontSize: '1.55rem',
            color: 'var(--color-bone)',
          }}
        >
          <Money data={variant.price} />
        </span>
        {variant.compareAtPrice && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--color-steel-500)',
              textDecoration: 'line-through',
            }}
          >
            <Money data={variant.compareAtPrice} />
          </span>
        )}
      </div>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.04em',
          color: 'var(--color-steel-300)',
        }}
      >
        {formatPerUnit(variant.price, tier.qty)} ea · {tier.blurb}
      </span>
      {saved && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-ember)',
          }}
        >
          Save {saved.formatted}
        </span>
      )}
    </button>
  );
}

function Pills({children}: {children: React.ReactNode}) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  );
}

function Pill({children}: {children: React.ReactNode}) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--color-bone)',
        padding: '0.4rem 0.75rem',
        border: '1px solid var(--color-steel-800)',
        background: 'var(--color-obsidian)',
      }}
    >
      {children}
    </span>
  );
}

function PlaceholderTier({note}: {note: string}) {
  return (
    <div
      style={{
        gridColumn: '1 / -1',
        padding: '1.25rem',
        border: '1px dashed var(--color-steel-800)',
        background: 'var(--color-graphite)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--color-steel-500)',
        lineHeight: 1.6,
      }}
    >
      {note}
    </div>
  );
}
