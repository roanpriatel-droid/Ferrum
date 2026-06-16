// TODO: legal review before scaling spend
import type {Route} from './+types/pages.terms';
import {LegalPage, LegalGroup} from '~/components/ferrum/LegalPage';
import {Link} from 'react-router';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'FERRUM — Terms of Service'},
    {
      name: 'description',
      content:
        'Terms governing purchases of the Forge and use of the FERRUM site.',
    },
  ];
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms of Service"
      title="Terms of Service."
      intro="By placing an order or using this site, you agree to these terms. Read them. They are short."
      effective="2026-06-16"
    >
      <LegalGroup heading="The agreement">
        <p>
          These terms form a binding agreement between you and FERRUM. They
          cover purchases of the Forge, the FERRUM Protocol, and any other
          item sold through this site.
        </p>
      </LegalGroup>

      <LegalGroup heading="Orders and acceptance">
        <p>
          Placing an order is an offer to purchase. Acceptance occurs when we
          send a shipping confirmation. We may decline or cancel any order at
          our discretion, including for pricing errors, fraud signals, or
          unavailable inventory. If an order is cancelled, the charge is
          refunded in full.
        </p>
      </LegalGroup>

      <LegalGroup heading="Pricing and payment">
        <p>
          Prices are listed in United States dollars unless stated otherwise.
          Pricing can change at any time, but no change applies to orders
          already accepted. Payment is processed by Shopify at checkout. By
          submitting payment information, you authorize the charge.
        </p>
      </LegalGroup>

      <LegalGroup heading="Shipping and risk of loss">
        <p>
          Title and risk of loss pass to you when the carrier scans the
          package as delivered. Carrier handling after that point is between
          you and the carrier, with our assistance.
        </p>
        <p>
          See the <Link to="/pages/shipping">shipping policy</Link> for
          windows, destinations, and tracking.
        </p>
      </LegalGroup>

      <LegalGroup heading="Returns">
        <p>
          Returns are governed by the{' '}
          <Link to="/pages/returns">30-Day Forge Guarantee</Link> and the
          one-year device warranty described there. Those terms are
          incorporated into this agreement by reference.
        </p>
      </LegalGroup>

      <LegalGroup heading="Intellectual property">
        <p>
          All content on this site, including the FERRUM marks, the periodic
          element tile, the Forge industrial design, and the FERRUM Protocol,
          is owned by FERRUM or its licensors. You may not reproduce, copy,
          resell, or create derivative works without written permission.
        </p>
        <p>
          The Protocol is licensed to the original purchaser for personal use.
          It is not transferable.
        </p>
      </LegalGroup>

      <LegalGroup heading="Acceptable use">
        <p>
          The Forge is a strength-training device. Do not modify it. Do not
          use it in ways inconsistent with the Protocol. You are responsible
          for your own training decisions and for consulting a clinician if
          you have an injury or medical condition.
        </p>
      </LegalGroup>

      <LegalGroup heading="Disclaimers">
        <p>
          The Forge and the Protocol are provided as-is. We disclaim all
          implied warranties to the maximum extent permitted by law, including
          the implied warranties of merchantability and fitness for a
          particular purpose, except where required by your local consumer
          law. The express written warranty and the 30-Day Forge Guarantee
          are the only warranties FERRUM offers.
        </p>
      </LegalGroup>

      <LegalGroup heading="Limitation of liability">
        <p>
          To the maximum extent permitted by law, FERRUM&rsquo;s total
          liability for any claim arising out of an order or your use of the
          site is limited to the amount you paid for the order. We are not
          liable for indirect, incidental, or consequential damages.
        </p>
      </LegalGroup>

      <LegalGroup heading="Governing law">
        <p>
          These terms are governed by the laws of the State of Delaware,
          United States, without regard to its conflict of laws principles.
          Disputes are resolved in the state and federal courts located in
          Delaware, and you consent to that jurisdiction.
        </p>
      </LegalGroup>

      <LegalGroup heading="Changes">
        <p>
          We may update these terms. The current version is the one posted
          here with the effective date above. Continued use of the site after
          a change constitutes acceptance.
        </p>
      </LegalGroup>

      <LegalGroup heading="Contact">
        <p>
          Questions: email{' '}
          <a href="mailto:support@ferrum.fit">support@ferrum.fit</a> or use
          the <Link to="/pages/contact">contact form</Link>.
        </p>
      </LegalGroup>
    </LegalPage>
  );
}
