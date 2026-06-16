import {createContext, useContext, useState, type ReactNode} from 'react';
import {DEFAULT_TIER, type TierKey} from '~/lib/ferrum-offer';

type OfferCtx = {
  selected: TierKey;
  setSelected: (t: TierKey) => void;
};

const Ctx = createContext<OfferCtx | null>(null);

export function OfferProvider({children}: {children: ReactNode}) {
  const [selected, setSelected] = useState<TierKey>(DEFAULT_TIER);
  return <Ctx.Provider value={{selected, setSelected}}>{children}</Ctx.Provider>;
}

export function useOffer(): OfferCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error('useOffer must be used inside <OfferProvider>');
  return v;
}
