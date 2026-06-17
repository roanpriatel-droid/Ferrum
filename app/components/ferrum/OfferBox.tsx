import {Link} from 'react-router';
import {Eyebrow, Display} from './Section';
import {TierSelector} from './TierSelector';
import {useOffer} from './OfferContext';
import {ImageBand} from './ImageBand';
import {GradedImage} from './GradedImage';
import {TIERS, formatUsd, savings} from '~/lib/ferrum-offer';
import {PDP_PATH} from '~/lib/ferrum-tiers';

export function OfferBox() {
  const {selected, setSelected} = useOffer();
  const tier = TIERS[selected];
  const saved = savings(tier);

  return (
    <section
      id="offer"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--color-steel-800)',
        borderBottom: '1px solid var(--color-steel-800)',
        background: 'var(--color-obsidian)',
      }}
    >
      <div style={{position: 'absolute', inset: 0, opacity: 0.55}}>
        <ImageBand
          src="/images/forge-concrete.png"
          decorative
          position="50% 40%"
          tint={0.22}
          scrim="bottom"
          style={{height: '100%'}}
        />
      </div>
      <div
        style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          padding:
            'clamp(5rem, 9vw, 8rem) clamp(1.25rem, 4vw, 3rem)',
          display: 'grid',
          gap: 'clamp(2.5rem, 4vw, 3.5rem)',
        }}
      >
        <header
          style={{
            display: 'grid',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            gridTemplateColumns: 'minmax(0, 1fr)',
            alignItems: 'end',
          }}
          className="ferrum-offer-header"
        >
          <div style={{display: 'grid', gap: '1.25rem', maxWidth: '34rem'}}>
            <Eyebrow>05 · The Offer</Eyebrow>
            <Display as="h2" size="lg">
              Claim the Forge.
            </Display>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
                lineHeight: 1.55,
                color: 'var(--color-steel-300)',
                margin: 0,
              }}
            >
              One device. Three configurations. Pick the one that matches the
              work ahead.
            </p>
          </div>
          <figure
            style={{
              position: 'relative',
              margin: 0,
              border: '1px solid var(--color-steel-800)',
              background: 'var(--color-graphite)',
              overflow: 'hidden',
              aspectRatio: '16 / 9',
            }}
          >
            <GradedImage
              src="/images/arsenal-trio.png"
              alt="Three Forge units — the Arsenal tier."
              width={1920}
              height={1080}
              style={{position: 'absolute', inset: 0}}
            />
            <figcaption
              style={{
                position: 'absolute',
                left: '1rem',
                bottom: '1rem',
                right: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--color-steel-300)',
              }}
            >
              <span>Solo · Duo · Arsenal</span>
              <span>FRM-01</span>
            </figcaption>
          </figure>
        </header>

        <div
          style={{
            background: 'var(--color-graphite)',
            border: '1px solid var(--color-steel-800)',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            display: 'grid',
            gap: '1.75rem',
          }}
        >
          <div style={{paddingTop: '0.5rem'}}>
            <TierSelector selected={selected} onSelect={setSelected} />
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              alignItems: 'center',
              paddingTop: '0.25rem',
            }}
          >
            <Pill>Free shipping</Pill>
            <Pill>FERRUM Protocol included · $39</Pill>
            <Pill>30-day Forge Guarantee</Pill>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--color-steel-800)',
              paddingTop: '1.25rem',
            }}
          >
            <div style={{display: 'grid', gap: '0.25rem'}}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--color-steel-500)',
                }}
              >
                Total · {tier.label}
              </span>
              <div
                style={{display: 'flex', alignItems: 'baseline', gap: '0.75rem'}}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStretch: '125%',
                    fontWeight: 800,
                    fontSize: 'clamp(2.25rem, 3.8vw, 3rem)',
                    color: 'var(--color-bone)',
                    lineHeight: 1,
                  }}
                >
                  {formatUsd(tier.price)}
                </span>
                {tier.compareAt && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1rem',
                      color: 'var(--color-steel-500)',
                      textDecoration: 'line-through',
                    }}
                  >
                    {formatUsd(tier.compareAt)}
                  </span>
                )}
              </div>
            </div>
            {saved > 0 && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ember)',
                }}
              >
                You save {formatUsd(saved)}
              </span>
            )}
          </div>

          <Link
            to={PDP_PATH}
            prefetch="intent"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              width: '100%',
              padding: '1.25rem 2rem',
              background: 'var(--color-ember)',
              color: 'var(--color-obsidian)',
              border: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'filter 200ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'brightness(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'none';
            }}
          >
            Claim the Forge · {tier.label}
            <span aria-hidden="true">→</span>
          </Link>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: '0.75rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-steel-500)',
            }}
          >
            <span>Secure checkout · Shopify</span>
            {/* TODO: confirm fulfillment origin before launch */}
            <span>Ships from [TODO]</span>
            <span>30-day Forge Guarantee</span>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              lineHeight: 1.5,
              color: 'var(--color-steel-300)',
              margin: 0,
              maxWidth: '40rem',
            }}
          >
            Payment is processed by Shopify. Card details are never stored on
            FERRUM servers. If the forearm has not changed in 30 days, return
            the Forge for a full refund — keep the Protocol either way.
          </p>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (min-width: 900px) {
              .ferrum-offer-header { grid-template-columns: 1.1fr 1fr !important; }
            }
          `,
        }}
      />
    </section>
  );
}

function Pill({children}: {children: React.ReactNode}) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--color-bone)',
        padding: '0.4rem 0.75rem',
        border: '1px solid var(--color-steel-800)',
        background: 'var(--color-obsidian)',
      }}
    >
      {children}
    </span>
  );
}
