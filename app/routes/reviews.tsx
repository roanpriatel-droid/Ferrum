import {useEffect, useMemo, useRef, useState} from 'react';
import type {Route} from './+types/reviews';
import {Section, Eyebrow, Display} from '~/components/ferrum/Section';
import {EmberCta} from '~/components/ferrum/EmberCta';
import {StarRating} from '~/components/ferrum/reviews/StarRating';
import {ReviewCard} from '~/components/ferrum/reviews/ReviewCard';
import {
  REVIEWS,
  getAggregate,
  type Review,
} from '~/lib/ferrum-reviews';
import {PDP_PATH} from '~/lib/ferrum-tiers';

export const meta: Route.MetaFunction = () => {
  const agg = getAggregate();
  return [
    {title: `Reviews — FERRUM (${agg.averageDisplay} / 5 · ${agg.total}+ verified)`},
    {
      name: 'description',
      content: `Read ${agg.total}+ verified early-access reviews of the Forge and the FERRUM Protocol from the first FERRUM owners.`,
    },
  ];
};

type Filter = 'all' | '5' | '4' | '3' | 'recent' | 'top';

const FILTERS: Array<{key: Filter; label: string}> = [
  {key: 'all', label: 'All'},
  {key: '5', label: '5 ★'},
  {key: '4', label: '4 ★'},
  {key: '3', label: '3 ★'},
  {key: 'recent', label: 'Most recent'},
  {key: 'top', label: 'Top'},
];

const PAGE_SIZE = 18;

export default function ReviewsRoute() {
  const aggregate = getAggregate();
  const [filter, setFilter] = useState<Filter>('all');
  const filtered = useFiltered(filter);

  return (
    <div
      style={{
        background: 'var(--color-obsidian)',
        color: 'var(--color-bone)',
      }}
    >
      <ReviewsHero aggregate={aggregate} />
      <FilterBar value={filter} onChange={setFilter} total={filtered.length} />
      <ReviewGrid reviews={filtered} />
      <ClosingCta total={aggregate.total} />
    </div>
  );
}

function useFiltered(filter: Filter): Review[] {
  return useMemo(() => {
    switch (filter) {
      case '5':
        return REVIEWS.filter((r) => r.rating === 5);
      case '4':
        return REVIEWS.filter((r) => r.rating === 4);
      case '3':
        return REVIEWS.filter((r) => r.rating === 3);
      case 'top':
        return REVIEWS.filter((r) => r.topReview);
      case 'recent':
        // REVIEWS is pre-sorted newest-first
        return REVIEWS;
      case 'all':
      default:
        return REVIEWS;
    }
  }, [filter]);
}

// ─── Hero ────────────────────────────────────────────────────────────

function ReviewsHero({
  aggregate,
}: {
  aggregate: ReturnType<typeof getAggregate>;
}) {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--color-steel-800)',
        background: 'var(--color-obsidian)',
      }}
    >
      <img
        src="/images/bg-industrial.png"
        alt=""
        width={1536}
        height={2048}
        loading="eager"
        decoding="sync"
        fetchPriority="high"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '50% 30%',
          opacity: 0.45,
          borderRadius: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, color-mix(in oklab, var(--color-obsidian) 80%, transparent) 0%, color-mix(in oklab, var(--color-obsidian) 50%, transparent) 50%, color-mix(in oklab, var(--color-obsidian) 95%, transparent) 100%)',
          pointerEvents: 'none',
        }}
      />
      <Section
        as="div"
        style={{
          position: 'relative',
          paddingTop: 'clamp(4rem, 8vw, 7rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        }}
      >
        <div
          className="ferrum-reviews-hero"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: 'clamp(2rem, 4vw, 3rem)',
            alignItems: 'end',
          }}
        >
          <div style={{display: 'grid', gap: '1.5rem', maxWidth: '46rem'}}>
            <Eyebrow>Early access</Eyebrow>
            <Display as="h1" size="lg">
              {aggregate.averageDisplay} / 5
              <br />
              from {aggregate.total}+ owners.
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
              The first FERRUM owners shipped feedback before the
              storefront opened. Every review on this page is a verified
              early-access buyer. No paid reviews. No incentives.
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                flexWrap: 'wrap',
              }}
            >
              <StarRating value={aggregate.average} size={22} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-bone)',
                }}
              >
                {aggregate.averageDisplay} / 5 · {aggregate.total}+ verified
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '1rem 1.5rem',
                paddingTop: '0.5rem',
              }}
            >
              <EmberCta href={PDP_PATH} size="lg">
                Claim the Forge
              </EmberCta>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: 'var(--color-steel-500)',
                }}
              >
                Free shipping · 30-day guarantee
              </span>
            </div>
          </div>

          <DistributionBar aggregate={aggregate} />
        </div>
      </Section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (min-width: 900px) {
              .ferrum-reviews-hero { grid-template-columns: 1.2fr 1fr !important; }
            }
          `,
        }}
      />
    </section>
  );
}

function DistributionBar({
  aggregate,
}: {
  aggregate: ReturnType<typeof getAggregate>;
}) {
  const rows: Array<{rating: 3 | 4 | 5; count: number}> = [
    {rating: 5, count: aggregate.distribution[5]},
    {rating: 4, count: aggregate.distribution[4]},
    {rating: 3, count: aggregate.distribution[3]},
  ];

  return (
    <div
      style={{
        background: 'var(--color-graphite)',
        border: '1px solid var(--color-steel-800)',
        padding: 'clamp(1.5rem, 3vw, 2.25rem)',
        display: 'grid',
        gap: '1rem',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--color-steel-500)',
        }}
      >
        Rating distribution
      </span>
      <div style={{display: 'grid', gap: '0.6rem'}}>
        {rows.map(({rating, count}) => {
          const pct = (count / aggregate.total) * 100;
          return (
            <div
              key={rating}
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                alignItems: 'center',
                gap: '0.85rem',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--color-bone)',
                }}
              >
                <StarRating value={1} size={10} label={`${rating} star`} />
                {rating}
              </span>
              <span
                aria-hidden="true"
                style={{
                  position: 'relative',
                  display: 'block',
                  height: '6px',
                  background: 'var(--color-obsidian)',
                  border: '1px solid var(--color-steel-800)',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: `${pct}%`,
                    background: 'var(--color-ember)',
                    transition: 'width 250ms ease',
                  }}
                />
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.14em',
                  color: 'var(--color-steel-300)',
                  minWidth: '3.25rem',
                  textAlign: 'right',
                }}
              >
                {count} ({pct.toFixed(0)}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Filter bar ──────────────────────────────────────────────────────

function FilterBar({
  value,
  onChange,
  total,
}: {
  value: Filter;
  onChange: (f: Filter) => void;
  total: number;
}) {
  return (
    <Section as="div" style={{paddingTop: 'clamp(2rem, 4vw, 3rem)', paddingBottom: '1rem'}}>
      <div
        role="tablist"
        aria-label="Filter reviews"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          alignItems: 'center',
        }}
      >
        {FILTERS.map((f) => {
          const active = f.key === value;
          return (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(f.key)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: active
                  ? 'var(--color-obsidian)'
                  : 'var(--color-bone)',
                background: active
                  ? 'var(--color-ember)'
                  : 'transparent',
                border: `1px solid ${
                  active ? 'var(--color-ember)' : 'var(--color-steel-800)'
                }`,
                padding: '0.55rem 0.95rem',
                cursor: 'pointer',
                transition: 'background 150ms ease, color 150ms ease',
              }}
            >
              {f.label}
            </button>
          );
        })}
        <span
          style={{
            marginLeft: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-steel-500)',
          }}
        >
          {total} reviews
        </span>
      </div>
    </Section>
  );
}

// ─── Grid (with lazy reveal) ────────────────────────────────────────

function ReviewGrid({reviews}: {reviews: Review[]}) {
  const [visible, setVisible] = useState(() =>
    Math.min(PAGE_SIZE, reviews.length),
  );
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisible(Math.min(PAGE_SIZE, reviews.length));
  }, [reviews]);

  useEffect(() => {
    if (visible >= reviews.length) return;
    const node = sentinelRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible((v) => Math.min(v + PAGE_SIZE, reviews.length));
          }
        }
      },
      {rootMargin: '600px 0px'},
    );
    io.observe(node);
    return () => io.disconnect();
  }, [visible, reviews.length]);

  return (
    <Section as="div" style={{paddingTop: '1rem'}}>
      {reviews.length === 0 ? (
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-steel-500)',
            padding: '2rem 0',
          }}
        >
          No reviews match that filter.
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {reviews.slice(0, visible).map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      )}

      {visible < reviews.length && (
        <div
          ref={sentinelRef}
          aria-hidden="true"
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '2rem 0',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-steel-500)',
          }}
        >
          Loading more…
        </div>
      )}
    </Section>
  );
}

// ─── Closing CTA ─────────────────────────────────────────────────────

function ClosingCta({total}: {total: number}) {
  return (
    <Section id="reviews-closing">
      <div
        style={{
          display: 'grid',
          gap: '1.5rem',
          justifyItems: 'start',
          borderTop: '1px solid var(--color-steel-800)',
          paddingTop: 'clamp(2.5rem, 5vw, 3.5rem)',
        }}
      >
        <Eyebrow>Forged, not given</Eyebrow>
        <Display as="h2" size="lg" style={{maxWidth: '22ch'}}>
          Join the {total}+ already in.
        </Display>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '1rem 1.5rem',
          }}
        >
          <EmberCta href={PDP_PATH} size="lg">
            Claim the Forge
          </EmberCta>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--color-steel-500)',
            }}
          >
            Free shipping · 30-day guarantee
          </span>
        </div>
      </div>
    </Section>
  );
}
