import type {Route} from './+types/pages.shipping';
import {LegalPage, LegalGroup} from '~/components/ferrum/LegalPage';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'FERRUM — Shipping'},
    {
      name: 'description',
      content:
        'Shipping windows, tracking, and delivery for the Forge. Free shipping on every order.',
    },
  ];
};

export default function ShippingPage() {
  return (
    <LegalPage
      eyebrow="Logistics"
      title={
        <>
          Shipping.
          <br />
          Clean and direct.
        </>
      }
      intro="Every Forge ships free, in protective packaging, to anywhere in the contiguous United States. No surprise fees at checkout."
      effective="2026-06-16"
    >
      <LegalGroup heading="Processing">
        <p>
          Orders are processed within one to two business days of payment. You
          will receive a shipping confirmation and tracking number the moment
          the order leaves the warehouse.
        </p>
        <p>
          The FERRUM Protocol is delivered to the same email used at checkout,
          sent on the day the Forge ships. It is yours to keep regardless of
          what happens next.
        </p>
      </LegalGroup>

      <LegalGroup heading="Delivery windows">
        <ul>
          <li>Domestic ground: three to five business days after dispatch.</li>
          <li>Domestic expedited: two business days after dispatch.</li>
          <li>
            International: ten to twenty business days, varies by destination
            and customs.
          </li>
        </ul>
        <p>
          Windows are estimates from the carrier. Weather and customs add days
          we cannot control.
        </p>
      </LegalGroup>

      <LegalGroup heading="Where we ship">
        <p>
          The Forge ships to the United States, Canada, the United Kingdom,
          the European Union, Australia, and New Zealand. If a destination is
          missing from checkout, it is not yet supported.
        </p>
      </LegalGroup>

      <LegalGroup heading="Tracking">
        <p>
          The tracking link in the confirmation email updates as the carrier
          scans the package. If tracking has not moved in seven business days,
          email{' '}
          <a href="mailto:support@ferrum.fit">support@ferrum.fit</a> with your
          order number and we will trace it.
        </p>
      </LegalGroup>

      <LegalGroup heading="Duties and taxes">
        <p>
          For destinations outside the United States, the customer is the
          importer of record. Duties, VAT, and customs fees are the
          customer&rsquo;s responsibility and are not included in the order
          total.
        </p>
      </LegalGroup>
    </LegalPage>
  );
}
