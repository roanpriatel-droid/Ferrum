import type {Route} from './+types/pages.returns';
import {LegalPage, LegalGroup} from '~/components/ferrum/LegalPage';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'FERRUM — Returns and the 30-Day Forge Guarantee'},
    {
      name: 'description',
      content:
        'The 30-Day Forge Guarantee. Train for 30 days. If the forearm has not changed, return the Forge for a full refund.',
    },
  ];
};

export default function ReturnsPage() {
  return (
    <LegalPage
      eyebrow="The 30-Day Forge Guarantee"
      title={
        <>
          Run the Protocol.
          <br />
          If it does not work, return it.
        </>
      }
      intro="The Forge is a tool. Tools are judged by results. Train under the FERRUM Protocol for thirty days. If your forearm has not changed, return the Forge for a full refund."
      effective="2026-06-16"
    >
      <LegalGroup heading="The promise">
        <p>
          Within thirty days of the delivery date, return the Forge for a full
          refund of the order total. No questionnaires. No friction.
        </p>
        <p>
          You keep the FERRUM Protocol either way. The training plan is yours
          the moment the order ships.
        </p>
      </LegalGroup>

      <LegalGroup heading="How to start a return">
        <ol>
          <li>
            Email <a href="mailto:returns@ferrum.fit">returns@ferrum.fit</a>{' '}
            with your order number and the words &ldquo;Forge Guarantee.&rdquo;
          </li>
          <li>
            We respond within one business day with a prepaid return label and
            instructions.
          </li>
          <li>
            Pack the Forge in the original box. Drop it at the carrier.
          </li>
        </ol>
      </LegalGroup>

      <LegalGroup heading="Condition">
        <p>
          We expect the Forge to look used. The Guarantee is designed for
          devices that have been trained with, not collected. Cosmetic wear
          from honest work does not affect the refund.
        </p>
        <p>
          Damage from drops onto hard floors, water submersion, or
          modification voids the Guarantee.
        </p>
      </LegalGroup>

      <LegalGroup heading="Refund timing">
        <p>
          Refunds are issued to the original payment method within three
          business days of the Forge arriving at our warehouse. Card networks
          take an additional three to ten business days to post the credit.
        </p>
      </LegalGroup>

      <LegalGroup heading="Return shipping">
        <p>
          We pay return shipping for orders inside the United States.
          International returns are at the customer&rsquo;s cost via a tracked
          method. We refund the order total once the package is received.
        </p>
      </LegalGroup>

      <LegalGroup heading="Outside the window">
        <p>
          After thirty days, the Guarantee closes. Manufacturing defects are
          still covered for one year from purchase under a separate device
          warranty. Email{' '}
          <a href="mailto:support@ferrum.fit">support@ferrum.fit</a> with
          photos and we will replace the unit.
        </p>
      </LegalGroup>
    </LegalPage>
  );
}
