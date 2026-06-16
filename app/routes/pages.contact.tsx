import {Form, useActionData, useNavigation} from 'react-router';
import type {Route} from './+types/pages.contact';
import {Section, Eyebrow, Display} from '~/components/ferrum/Section';
import {EmberCta} from '~/components/ferrum/EmberCta';
import {PDP_PATH} from '~/lib/ferrum-tiers';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'FERRUM — Contact'},
    {
      name: 'description',
      content:
        'Contact FERRUM support. Replies within one business day.',
    },
  ];
};

type ActionData =
  | {status: 'ok'; name: string}
  | {status: 'error'; errors: Partial<Record<'name' | 'email' | 'message', string>>};

export async function action({request}: Route.ActionArgs): Promise<ActionData> {
  const form = await request.formData();
  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const message = String(form.get('message') ?? '').trim();

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Name is required.';
  if (!email) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!message) errors.message = 'Message is required.';
  else if (message.length < 12) {
    errors.message = 'Tell us a little more so we can help.';
  }

  if (Object.keys(errors).length > 0) {
    return {status: 'error', errors};
  }

  // TODO: connect to support inbox (Postmark / Resend / Shopify Inbox)
  // and persist to a CRM or ticketing system before launch.

  return {status: 'ok', name};
}

export default function ContactPage() {
  const actionData = useActionData<typeof action>();
  const nav = useNavigation();
  const submitting = nav.state === 'submitting';
  const errors =
    actionData?.status === 'error' ? actionData.errors : undefined;

  if (actionData?.status === 'ok') {
    return <Confirmation name={actionData.name} />;
  }

  return (
    <article>
      <Section as="header">
        <div style={{display: 'grid', gap: '1.5rem', maxWidth: '46rem'}}>
          <Eyebrow>Contact</Eyebrow>
          <Display as="h1" size="lg">
            Talk to us.
          </Display>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.05rem, 1.3vw, 1.2rem)',
              lineHeight: 1.55,
              color: 'var(--color-steel-300)',
              margin: 0,
            }}
          >
            One inbox, one human. Replies inside one business day.
          </p>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-ember)',
            }}
          >
            support@ferrum.fit
          </span>
        </div>
      </Section>

      <Section>
        <Form
          method="post"
          noValidate
          style={{
            display: 'grid',
            gap: '1.25rem',
            maxWidth: '40rem',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            background: 'var(--color-graphite)',
            border: '1px solid var(--color-steel-800)',
          }}
        >
          <Field
            label="Name"
            name="name"
            type="text"
            autoComplete="name"
            error={errors?.name}
          />
          <Field
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            error={errors?.email}
          />
          <TextArea
            label="Message"
            name="message"
            error={errors?.message}
          />
          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: '1rem 2rem',
              background: 'var(--color-ember)',
              color: 'var(--color-obsidian)',
              border: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              cursor: submitting ? 'progress' : 'pointer',
              opacity: submitting ? 0.7 : 1,
              transition: 'filter 200ms ease',
            }}
            onMouseEnter={(e) => {
              if (!submitting) e.currentTarget.style.filter = 'brightness(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'none';
            }}
          >
            {submitting ? 'Sending…' : 'Send message'}
          </button>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-steel-500)',
              margin: 0,
            }}
          >
            For order issues, include the order number.
          </p>
        </Form>
      </Section>
    </article>
  );
}

function Confirmation({name}: {name: string}) {
  return (
    <article>
      <Section as="header">
        <div style={{display: 'grid', gap: '1.5rem', maxWidth: '46rem'}}>
          <Eyebrow>Received</Eyebrow>
          <Display as="h1" size="lg">
            Thank you, {name}.
          </Display>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.05rem, 1.3vw, 1.2rem)',
              lineHeight: 1.55,
              color: 'var(--color-steel-300)',
              margin: 0,
            }}
          >
            Your message is in the queue. A human will respond from{' '}
            <span style={{color: 'var(--color-ember)'}}>support@ferrum.fit</span>{' '}
            inside one business day.
          </p>
        </div>
      </Section>
      <Section>
        <div style={{display: 'grid', gap: '1.25rem', justifyItems: 'start'}}>
          <Eyebrow>Next</Eyebrow>
          <Display as="h2" size="md">
            Back to the work.
          </Display>
          <EmberCta href={PDP_PATH} size="lg">
            Claim the Forge
          </EmberCta>
        </div>
      </Section>
    </article>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.85rem 1rem',
  background: 'var(--color-obsidian)',
  border: '1px solid var(--color-steel-800)',
  color: 'var(--color-bone)',
  fontFamily: 'var(--font-body)',
  fontSize: '0.95rem',
  borderRadius: 0,
  outline: 'none',
  transition: 'border-color 150ms ease',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.7rem',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--color-steel-500)',
};

function Field({
  label,
  name,
  type,
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <label style={{display: 'grid', gap: '0.5rem'}}>
      <span style={labelStyle}>{label}</span>
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        style={{
          ...inputStyle,
          borderColor: error
            ? 'var(--color-ember)'
            : 'var(--color-steel-800)',
        }}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </label>
  );
}

function TextArea({
  label,
  name,
  error,
}: {
  label: string;
  name: string;
  error?: string;
}) {
  return (
    <label style={{display: 'grid', gap: '0.5rem'}}>
      <span style={labelStyle}>{label}</span>
      <textarea
        name={name}
        rows={6}
        aria-invalid={error ? true : undefined}
        style={{
          ...inputStyle,
          resize: 'vertical',
          minHeight: '8rem',
          fontFamily: 'var(--font-body)',
          borderColor: error
            ? 'var(--color-ember)'
            : 'var(--color-steel-800)',
        }}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </label>
  );
}

function ErrorText({children}: {children: React.ReactNode}) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--color-ember)',
      }}
    >
      {children}
    </span>
  );
}
