// TODO: confirm handle matches the Shopify product
export const FORGE_HANDLE = 'the-forge';
export const THE_PROTOCOL_HANDLE = 'the-protocol';

export const PDP_PATH = `/products/${FORGE_HANDLE}`;
export const PROTOCOL_PATH = `/products/${THE_PROTOCOL_HANDLE}`;
export const REVIEWS_PATH = '/reviews';

export type TierKey = 'solo' | 'duo' | 'arsenal';

export type TierPresentation = {
  key: TierKey;
  label: string;
  qty: number;
  badge?: string;
  blurb: string;
  index: number;
};

export const TIER_PRESENTATION: Record<TierKey, TierPresentation> = {
  solo: {
    key: 'solo',
    label: 'Solo',
    qty: 1,
    blurb: '1× Forge + Protocol',
    index: 0,
  },
  duo: {
    key: 'duo',
    label: 'Duo',
    qty: 2,
    blurb: '2× Forge · Most chosen split',
    badge: 'Most Chosen',
    index: 1,
  },
  arsenal: {
    key: 'arsenal',
    label: 'Arsenal',
    qty: 3,
    blurb: '3× Forge · Full kit',
    index: 2,
  },
};

export const TIER_ORDER: TierKey[] = ['solo', 'duo', 'arsenal'];

export const DEFAULT_TIER_KEY: TierKey = 'duo';

const TIER_OPTION_NAME_PATTERNS =
  /pack|quantity|qty|size|tier|bundle|option/i;

type InferenceInput = {
  title?: string | null;
  selectedOptions?: Array<{name: string; value: string}> | null;
};

/**
 * Infer which marketing tier a Shopify variant corresponds to.
 *
 * Supports either layout I might set up in admin:
 *  (a) one product with a "Pack"/"Quantity"/"Size" option whose values are
 *      Solo/Duo/Arsenal or 1/2/3 (with or without the word "pack"), or
 *  (b) one product whose variants are simply titled Solo / Duo / Arsenal.
 *
 * Falls back to ordinal index if neither signal is present, so a product
 * with three untitled variants still renders three tier cards in order.
 */
export function inferTier(
  variant: InferenceInput,
  fallbackIndex: number,
): TierKey {
  const candidates: string[] = [];

  if (variant.selectedOptions) {
    for (const opt of variant.selectedOptions) {
      if (TIER_OPTION_NAME_PATTERNS.test(opt.name)) {
        candidates.push(opt.value);
      }
    }
  }
  if (variant.title && variant.title !== 'Default Title') {
    candidates.push(variant.title);
  }

  for (const raw of candidates) {
    const v = raw.toLowerCase();
    if (v.includes('arsenal')) return 'arsenal';
    if (v.includes('duo')) return 'duo';
    if (v.includes('solo')) return 'solo';
    if (/(^|\D)3(\s|$|\D)/.test(v)) return 'arsenal';
    if (/(^|\D)2(\s|$|\D)/.test(v)) return 'duo';
    if (/(^|\D)1(\s|$|\D)/.test(v)) return 'solo';
  }

  return TIER_ORDER[fallbackIndex] ?? 'solo';
}
