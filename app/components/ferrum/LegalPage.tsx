import type {ReactNode} from 'react';
import {Section, Eyebrow, Display} from './Section';
import {EmberCta} from './EmberCta';
import {PDP_PATH} from '~/lib/ferrum-tiers';

type LegalPageProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  effective?: string;
  children: ReactNode;
};

export function LegalPage({
  eyebrow,
  title,
  intro,
  effective,
  children,
}: LegalPageProps) {
  return (
    <article>
      <Section as="header">
        <div style={{display: 'grid', gap: '1.5rem', maxWidth: '46rem'}}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Display as="h1" size="lg">
            {title}
          </Display>
          {intro && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.05rem, 1.3vw, 1.2rem)',
                lineHeight: 1.55,
                color: 'var(--color-steel-300)',
                margin: 0,
              }}
            >
              {intro}
            </p>
          )}
          {effective && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-steel-500)',
              }}
            >
              Effective {effective}
            </span>
          )}
        </div>
      </Section>

      <Section>
        <div className="ferrum-prose">{children}</div>
        <style
          dangerouslySetInnerHTML={{
            __html: PROSE_STYLES,
          }}
        />
      </Section>

      <Section>
        <div
          style={{
            display: 'grid',
            gap: '1.5rem',
            justifyItems: 'start',
            borderTop: '1px solid var(--color-steel-800)',
            paddingTop: 'clamp(2rem, 4vw, 3rem)',
          }}
        >
          <Eyebrow>Next</Eyebrow>
          <Display as="h2" size="md">
            Claim the Forge.
          </Display>
          <EmberCta href={PDP_PATH} size="lg">
            Claim the Forge
          </EmberCta>
        </div>
      </Section>
    </article>
  );
}

export function LegalGroup({
  heading,
  children,
}: {
  heading: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="ferrum-prose-group">
      <h2>{heading}</h2>
      <div className="ferrum-prose-body">{children}</div>
    </section>
  );
}

const PROSE_STYLES = `
  .ferrum-prose {
    display: grid;
    gap: clamp(2rem, 4vw, 3rem);
    max-width: 46rem;
    font-family: var(--font-body);
    color: var(--color-bone);
    line-height: 1.65;
    font-size: 1.02rem;
  }
  .ferrum-prose-group {
    display: grid;
    gap: 1rem;
    padding-top: clamp(1.5rem, 3vw, 2.25rem);
    border-top: 1px solid var(--color-steel-800);
  }
  .ferrum-prose-group:first-child {
    padding-top: 0;
    border-top: none;
  }
  .ferrum-prose h2 {
    font-family: var(--font-display);
    font-stretch: 125%;
    font-weight: 700;
    font-size: clamp(1.35rem, 2vw, 1.65rem);
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--color-bone);
    margin: 0;
    line-height: 1.15;
  }
  .ferrum-prose h3 {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--color-steel-300);
    margin: 1.25rem 0 0.25rem;
    font-weight: 500;
  }
  .ferrum-prose p {
    margin: 0;
    color: var(--color-bone);
  }
  .ferrum-prose p + p {
    margin-top: 0.85rem;
  }
  .ferrum-prose ul,
  .ferrum-prose ol {
    margin: 0;
    padding-left: 1.25rem;
    display: grid;
    gap: 0.45rem;
  }
  .ferrum-prose li {
    color: var(--color-bone);
  }
  .ferrum-prose li::marker {
    color: var(--color-ember);
  }
  .ferrum-prose strong {
    color: var(--color-bone);
    font-weight: 600;
  }
  .ferrum-prose a {
    color: var(--color-ember);
    text-decoration: none;
    border-bottom: 1px solid color-mix(in oklab, var(--color-ember) 50%, transparent);
    transition: border-color 150ms ease;
  }
  .ferrum-prose a:hover {
    border-bottom-color: var(--color-ember);
  }
  .ferrum-prose-body {
    display: grid;
    gap: 0.85rem;
  }
`;
