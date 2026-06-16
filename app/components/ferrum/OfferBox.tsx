'use client';

import {useState} from 'react';
import {CartForm} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {Section, Eyebrow, Display} from './Section';
import {TierSelector} from './TierSelector';
import {
  DEFAULT_TIER,
  FORGE_VARIANT_ID,
  TIERS,
  type TierKey,
  formatUsd,
  savings,
} from '~/lib/ferrum-offer';

export function OfferBox() {
  const [selected, setSelected] = useState<TierKey>(DEFAULT_TIER);
  const tier = TIERS[selected];
  const saved = savings(tier);
  const {open} = useAside();

  return (
    <Section id="offer">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: 'clamp(2rem, 4vw, 3rem)',
        }}
      >
        <div style={{display: 'grid', gap: '1.25rem', maxWidth: '700px'}}>
          <Eyebrow>05 · The Offer</Eyebrow>
          <Display as="h2" size="lg">
            Claim the Forge.
          </Display>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              lineHeight: 1.55,
              color: 'var(--color-steel-300)',
              margin: 0,
            }}
          >
            One device. Three configurations. Pick the one that matches the
            work ahead.
          </p>
        </div>

        <div
          style={{
            background: 'var(--color-graphite)',
            border: '1px solid var(--color-steel-800)',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            display: 'grid',
            gap: '1.75rem',
          }}
        >
          <div style={{paddingTop: '0.5rem'}}>
            <TierSelector selected={selected} onSelect={setSelected} />
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              alignItems: 'center',
              paddingTop: '0.25rem',
            }}
          >
            <Pill>Free shipping</Pill>
            <Pill>FERRUM Protocol included · $39</Pill>
            <Pill>30-day Forge Guarantee</Pill>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--color-steel-800)',
              paddingTop: '1.25rem',
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
                Total · {tier.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStretch: '125%',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  color: 'var(--color-bone)',
                  lineHeight: 1,
                }}
              >
                {formatUsd(tier.price)}
              </span>
            </div>
            {saved > 0 && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ember)',
                }}
              >
                You save {formatUsd(saved)}
              </span>
            )}
          </div>

          <CartForm
            route="/cart"
            action={CartForm.ACTIONS.LinesAdd}
            inputs={{
              lines: [
                {
                  merchandiseId: FORGE_VARIANT_ID,
                  quantity: tier.qty,
                  attributes: [
                    {key: 'Tier', value: tier.label},
                    {key: 'Tier SKU', value: tier.id},
                  ],
                },
              ],
            }}
          >
            {(fetcher) => (
              <button
                type="submit"
                onClick={() => open('cart')}
                disabled={fetcher.state !== 'idle'}
                style={{
                  width: '100%',
                  padding: '1.15rem 2rem',
                  background: 'var(--color-ember)',
                  color: 'var(--color-obsidian)',
                  border: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  cursor: fetcher.state !== 'idle' ? 'progress' : 'pointer',
                  opacity: fetcher.state !== 'idle' ? 0.7 : 1,
                  transition: 'filter 200ms ease',
                }}
              >
                {fetcher.state !== 'idle' ? 'Sending…' : 'Add to cart'}
              </button>
            )}
          </CartForm>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-steel-500)',
              textAlign: 'center',
              margin: 0,
            }}
          >
            Ships in 3–5 business days · USD
          </p>
        </div>
      </div>
    </Section>
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
