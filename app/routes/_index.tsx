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
  // The Forge does not exist in the catalog yet. The page renders entirely
  // from local offer config; no Storefront product query is required for
  // first paint. Add product loading here once FRM-01 is created in admin.
  return {};
}

export default function Homepage() {
  return (
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
  );
}
