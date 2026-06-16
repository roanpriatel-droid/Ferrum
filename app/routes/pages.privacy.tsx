// TODO: legal review before scaling spend
import type {Route} from './+types/pages.privacy';
import {LegalPage, LegalGroup} from '~/components/ferrum/LegalPage';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'FERRUM — Privacy Policy'},
    {
      name: 'description',
      content:
        'How FERRUM collects, uses, and protects your data. Payments are processed by Shopify.',
    },
  ];
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="Privacy Policy."
      intro="This policy describes what FERRUM collects, why, where it goes, and the rights you hold over your information."
      effective="2026-06-16"
    >
      <LegalGroup heading="What we collect">
        <p>
          When you place an order or contact support, we collect the
          information you provide directly: name, email, shipping address,
          billing address, phone number if given, and the contents of any
          message you send.
        </p>
        <p>
          When you visit the site, our servers and analytics tools collect
          standard request data: IP address, device and browser type, pages
          viewed, referring URLs, and timestamps. Cookies and similar
          technologies are used for session state and analytics.
        </p>
      </LegalGroup>

      <LegalGroup heading="How we use it">
        <ul>
          <li>To fulfill orders and deliver the FERRUM Protocol.</li>
          <li>To respond to support and warranty inquiries.</li>
          <li>To detect fraud and protect the store.</li>
          <li>
            To improve the site and product through aggregated analytics.
          </li>
          <li>
            To send transactional email about orders. We do not send marketing
            email without explicit opt-in.
          </li>
        </ul>
      </LegalGroup>

      <LegalGroup heading="Payment processing">
        <p>
          Payments are processed by Shopify. FERRUM does not see or store full
          card numbers. Shopify&rsquo;s handling of payment data is governed
          by its own privacy and PCI-DSS commitments.
        </p>
      </LegalGroup>

      <LegalGroup heading="Third parties">
        <p>
          We share data with the minimum number of services required to
          operate: Shopify for storefront and payments, shipping carriers for
          delivery, email service providers for transactional mail, and
          analytics providers for aggregate site usage. Each receives only
          what its role requires.
        </p>
      </LegalGroup>

      <LegalGroup heading="Cookies and analytics">
        <p>
          The site uses first-party and third-party cookies for cart state,
          checkout, and analytics. You can disable cookies in your browser;
          checkout will not function without them.
        </p>
      </LegalGroup>

      <LegalGroup heading="Your rights">
        <p>
          You may request a copy of the personal data we hold about you,
          correct it, or ask us to delete it. Residents of California, the
          European Union, and the United Kingdom have additional rights under
          local law, including the right to object and the right to lodge a
          complaint with a supervisory authority.
        </p>
        <p>
          To exercise any right, email{' '}
          <a href="mailto:privacy@ferrum.fit">privacy@ferrum.fit</a>. We
          respond within thirty days.
        </p>
      </LegalGroup>

      <LegalGroup heading="Retention">
        <p>
          Order records are retained for seven years for tax and warranty
          purposes. Support messages are retained for two years. Analytics
          data is retained in aggregate.
        </p>
      </LegalGroup>

      <LegalGroup heading="Children">
        <p>
          FERRUM does not knowingly collect data from children under sixteen.
          If you believe a minor has provided us data, contact us and we will
          delete it.
        </p>
      </LegalGroup>

      <LegalGroup heading="Changes">
        <p>
          Material changes to this policy will be posted here with a new
          effective date. Continued use of the site after the change
          constitutes acceptance.
        </p>
      </LegalGroup>

      <LegalGroup heading="Contact">
        <p>
          Questions about this policy: email{' '}
          <a href="mailto:privacy@ferrum.fit">privacy@ferrum.fit</a>.
        </p>
      </LegalGroup>
    </LegalPage>
  );
}
