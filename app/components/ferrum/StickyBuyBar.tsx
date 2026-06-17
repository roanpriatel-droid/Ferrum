import {useEffect, useState} from 'react';
import {Link} from 'react-router';
import {useOffer} from './OfferContext';
import {GradedImage} from './GradedImage';
import {TIERS, formatUsd} from '~/lib/ferrum-offer';
import {PDP_PATH} from '~/lib/ferrum-tiers';

export function StickyBuyBar() {
  const {selected} = useOffer();
  const tier = TIERS[selected];
  const [heroPast, setHeroPast] = useState(false);
  const [offerVisible, setOfferVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    const offer = document.getElementById('offer');
    if (!hero || !offer) return;

    const heroIo = new IntersectionObserver(
      ([entry]) => {
        setHeroPast(!entry.isIntersecting);
      },
      {threshold: 0, rootMargin: '0px 0px -80% 0px'},
    );
    const offerIo = new IntersectionObserver(
      ([entry]) => {
        setOfferVisible(entry.isIntersecting);
      },
      {threshold: 0, rootMargin: '-15% 0px -15% 0px'},
    );

    heroIo.observe(hero);
    offerIo.observe(offer);
    return () => {
      heroIo.disconnect();
      offerIo.disconnect();
    };
  }, []);

  const visible = heroPast && !offerVisible;

  return (
    <div
      aria-hidden={!visible}
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 30,
        background: 'color-mix(in oklab, var(--color-obsidian) 94%, transparent)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderTop: '1px solid var(--color-steel-800)',
        color: 'var(--color-bone)',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 320ms cubic-bezier(0.22, 0.61, 0.36, 1)',
        boxShadow: visible
          ? '0 -20px 60px color-mix(in oklab, var(--color-obsidian) 60%, transparent)'
          : 'none',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0.75rem clamp(1rem, 3vw, 2rem)',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: 'clamp(0.75rem, 2vw, 1.25rem)',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 'clamp(44px, 9vw, 56px)',
            height: 'clamp(44px, 9vw, 56px)',
            border: '1px solid var(--color-steel-800)',
            background: 'var(--color-graphite)',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <GradedImage
            src="/images/forge-glow.png"
            alt=""
            decorative
            width={120}
            height={120}
            tint={0.12}
            style={{position: 'absolute', inset: 0}}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gap: '0.15rem',
            minWidth: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-steel-500)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            The Forge · {tier.label}
          </span>
          <div style={{display: 'flex', alignItems: 'baseline', gap: '0.5rem'}}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontStretch: '125%',
                fontWeight: 800,
                fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
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
                  fontSize: '0.75rem',
                  color: 'var(--color-steel-500)',
                  textDecoration: 'line-through',
                }}
              >
                {formatUsd(tier.compareAt)}
              </span>
            )}
          </div>
        </div>

        <Link
          to={PDP_PATH}
          prefetch="intent"
          tabIndex={visible ? 0 : -1}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.85rem clamp(1rem, 3vw, 1.75rem)',
            background: 'var(--color-ember)',
            color: 'var(--color-obsidian)',
            border: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'filter 200ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = 'brightness(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = 'none';
          }}
        >
          Claim the Forge
        </Link>
      </div>
    </div>
  );
}
