import {Section, Eyebrow, Display} from '../Section';

const TARGETS = [
  'Grip strength',
  'Forearm mass',
  'Finger and wrist power',
  'Vascularity',
];

export function WhatItTrains() {
  return (
    <Section id="what-it-trains">
      <div
        style={{
          display: 'grid',
          gap: 'clamp(1.5rem, 3vw, 2.25rem)',
        }}
      >
        <div style={{display: 'grid', gap: '0.75rem', maxWidth: '760px'}}>
          <Eyebrow>What it trains</Eyebrow>
          <Display as="h2" size="sm">
            Four outcomes. One instrument.
          </Display>
        </div>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1px',
            background: 'var(--color-steel-800)',
            border: '1px solid var(--color-steel-800)',
          }}
        >
          {TARGETS.map((t) => (
            <li
              key={t}
              style={{
                background: 'var(--color-graphite)',
                padding: '1.25rem 1.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                letterSpacing: '0.06em',
                color: 'var(--color-bone)',
              }}
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
