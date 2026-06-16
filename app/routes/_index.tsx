import type {Route} from './+types/_index';
import {Hero} from '~/components/ferrum/Hero';
import {Premise} from '~/components/ferrum/Premise';
import {Equation} from '~/components/ferrum/Equation';
import {ForgeSection} from '~/components/ferrum/ForgeSection';
import {Protocol} from '~/components/ferrum/Protocol';
import {OfferBox} from '~/components/ferrum/OfferBox';
import {Standards} from '~/components/ferrum/Standards';
import {Guarantee} from '~/components/ferrum/Guarantee';
import {Faq} from '~/components/ferrum/Faq';
import {OfferProvider} from '~/components/ferrum/OfferContext';
import {StickyBuyBar} from '~/components/ferrum/StickyBuyBar';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'FERRUM — Forged, not given.'},
    {
      name: 'description',
      content:
        'FERRUM. The Forge — FRM-01. The only muscle you can’t hide, engineered.',
    },
  ];
};

export async function loader() {
  return {};
}

export default function Homepage() {
  return (
    <OfferProvider>
      <div
        style={{
          background: 'var(--color-obsidian)',
          color: 'var(--color-bone)',
        }}
      >
        <Hero />
        <Premise />
        <Equation />
        <ForgeSection />
        <Protocol />
        <OfferBox />
        <Standards />
        <Guarantee />
        <Faq />
      </div>
      <StickyBuyBar />
    </OfferProvider>
  );
}
