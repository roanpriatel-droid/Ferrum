// TODO: swap for the real Forge variant ID from Shopify admin once the
// product is created. Until then, Add-to-Cart will fail against the live
// Storefront API — the page renders and the cart wiring is intact.
export const FORGE_VARIANT_ID =
  'gid://shopify/ProductVariant/REPLACE_AFTER_CREATING_PRODUCT';

export type TierKey = 'solo' | 'duo' | 'arsenal';

export type Tier = {
  key: TierKey;
  id: string;
  label: string;
  qty: number;
  price: number;
  compareAt: number | null;
  blurb: string;
  badge?: string;
};

export const TIERS: Record<TierKey, Tier> = {
  solo: {
    key: 'solo',
    id: 'FRM-01',
    label: 'Solo',
    qty: 1,
    price: 3999,
    compareAt: null,
    blurb: '1× Forge + Protocol',
  },
  duo: {
    key: 'duo',
    id: 'FRM-02',
    label: 'Duo',
    qty: 2,
    price: 6999,
    compareAt: 7998,
    blurb: '2× Forge · $34.99 ea',
    badge: 'Most Chosen',
  },
  arsenal: {
    key: 'arsenal',
    id: 'FRM-03',
    label: 'Arsenal',
    qty: 3,
    price: 9499,
    compareAt: 11997,
    blurb: '3× Forge · $31.66 ea',
  },
};

export const TIER_ORDER: TierKey[] = ['solo', 'duo', 'arsenal'];

export const DEFAULT_TIER: TierKey = 'duo';

export function formatUsd(cents: number): string {
  const dollars = cents / 100;
  return `$${dollars.toFixed(2)}`;
}

export function perUnit(tier: Tier): string {
  return formatUsd(Math.round(tier.price / tier.qty));
}

export function savings(tier: Tier): number {
  if (!tier.compareAt) return 0;
  return tier.compareAt - tier.price;
}
