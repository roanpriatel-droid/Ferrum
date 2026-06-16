import {Link} from 'react-router';
import {Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';
import {PDP_PATH} from '~/lib/ferrum-tiers';

type VariantLike = {
  id: string;
  title?: string | null;
  availableForSale: boolean;
  price: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
};

type Props = {
  selectedVariant: VariantLike | null;
};

export function ProtocolBuyBox({selectedVariant}: Props) {
  const {open} = useAside();
  const soldOut = !selectedVariant || !selectedVariant.availableForSale;

  return (
    <div style={{display: 'grid', gap: 'clamp(1.5rem, 2.5vw, 2rem)'}}>
      <div style={{display: 'grid', gap: '0.75rem'}}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'var(--color-ember)',
          }}
        >
          30-day digital system
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontStretch: '125%',
            fontWeight: 800,
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            color: 'var(--color-bone)',
            margin: 0,
          }}
        >
          The FERRUM Protocol
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
          The 30-day training and reveal system built around the Forge. Three
          phases, twelve movements, six named protocols, a nutrition
          framework, and the acute Reveal protocol.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          flexWrap: 'wrap',
          gap: '0.85rem',
          paddingTop: '0.25rem',
          borderTop: '1px solid var(--color-steel-800)',
        }}
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
          {selectedVariant ? <Money data={selectedVariant.price} /> : '—'}
        </span>
        {selectedVariant?.compareAtPrice && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              color: 'var(--color-steel-500)',
              textDecoration: 'line-through',
            }}
          >
            <Money data={selectedVariant.compareAtPrice} />
          </span>
        )}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-steel-500)',
          }}
        >
          Digital · one-time purchase
        </span>
      </div>

      <Pills />

      <div className="ferrum-protocol-atc">
        <AddToCartButton
          disabled={soldOut}
          onClick={() => open('cart')}
          lines={
            selectedVariant
              ? [
                  {
                    merchandiseId: selectedVariant.id,
                    quantity: 1,
                    selectedVariant: selectedVariant as unknown as never,
                    attributes: [
                      {key: 'Product', value: 'The FERRUM Protocol'},
                      {key: 'Delivery', value: 'Digital · email'},
                    ],
                  },
                ]
              : []
          }
        >
          {!selectedVariant
            ? 'Unavailable'
            : !selectedVariant.availableForSale
              ? 'Sold out'
              : 'Add to cart'}
        </AddToCartButton>
      </div>

      <FreeWithForgeCallout />

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem 1.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--color-steel-500)',
        }}
      >
        <span>Instant digital delivery</span>
        <span>Emailed as a PDF</span>
        <span>Lifetime updates</span>
        <span>30-day guarantee</span>
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
        Payment is processed by Shopify. The Protocol is delivered to the
        email used at checkout the moment the order clears. Read it for 30
        days. If it has not earned its place, request a refund — keep the
        Protocol either way.
      </p>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .ferrum-protocol-atc button {
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
            .ferrum-protocol-atc button:hover:not([disabled]) {
              filter: brightness(1.08);
            }
            .ferrum-protocol-atc button:disabled {
              opacity: 0.55;
              cursor: not-allowed;
              filter: grayscale(0.4);
            }
          `,
        }}
      />
    </div>
  );
}

function Pills() {
  const items = [
    'Three programmed phases',
    'Six named protocols + Reveal',
    'Nutrition framework',
  ];
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}
    >
      {items.map((label) => (
        <span
          key={label}
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
          {label}
        </span>
      ))}
    </div>
  );
}

function FreeWithForgeCallout() {
  return (
    <Link
      to={PDP_PATH}
      prefetch="intent"
      style={{
        display: 'grid',
        gap: '0.75rem',
        padding: 'clamp(1rem, 2vw, 1.5rem) clamp(1.1rem, 2.5vw, 1.75rem)',
        background: 'var(--color-obsidian)',
        border:
          '1px solid color-mix(in oklab, var(--color-ember) 50%, var(--color-steel-800))',
        position: 'relative',
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'border-color 150ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-ember)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor =
          'color-mix(in oklab, var(--color-ember) 50%, var(--color-steel-800))';
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 100% 100%, color-mix(in oklab, var(--color-ember) 18%, transparent) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--color-ember)',
          position: 'relative',
        }}
      >
        Or — the better deal
      </span>
      <strong
        style={{
          fontFamily: 'var(--font-display)',
          fontStretch: '125%',
          fontWeight: 700,
          fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          color: 'var(--color-bone)',
          position: 'relative',
          lineHeight: 1.2,
        }}
      >
        Get the Protocol free when you claim The Forge.
      </strong>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          lineHeight: 1.5,
          color: 'var(--color-steel-300)',
          margin: 0,
          position: 'relative',
        }}
      >
        The Protocol was built around the Forge. Buy the Forge and the
        Protocol ships with it at $0 — instrument and system together,
        priced as one.
      </p>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--color-ember)',
          position: 'relative',
        }}
      >
        Claim The Forge →
      </span>
    </Link>
  );
}
