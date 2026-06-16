import {Link} from 'react-router';
import {Section, Eyebrow, Display} from '../Section';
import {StarRating} from './StarRating';
import {ReviewCard} from './ReviewCard';
import {getAggregate, getTopReviews} from '~/lib/ferrum-reviews';
import {REVIEWS_PATH} from '~/lib/ferrum-tiers';

type Props = {
  eyebrow?: string;
  heading?: string;
  limit?: number;
};

export function ReviewHighlights({
  eyebrow = 'Reviews',
  heading = 'Verified, early access.',
  limit = 3,
}: Props) {
  const aggregate = getAggregate();
  const highlights = getTopReviews(limit);

  return (
    <Section id="reviews-highlights">
      <div
        style={{
          display: 'grid',
          gap: 'clamp(2rem, 4vw, 3rem)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            alignItems: 'end',
          }}
          className="ferrum-reviews-head"
        >
          <div style={{display: 'grid', gap: '1rem', maxWidth: '34rem'}}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <Display as="h2" size="md">
              {heading}
            </Display>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
              }}
            >
              <StarRating value={aggregate.average} size={18} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-steel-300)',
                }}
              >
                {aggregate.averageDisplay} / 5 · {aggregate.total}+ verified
              </span>
            </div>
          </div>

          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Link
              to={REVIEWS_PATH}
              prefetch="intent"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-ember)',
                textDecoration: 'none',
                borderBottom:
                  '1px solid color-mix(in oklab, var(--color-ember) 50%, transparent)',
                paddingBottom: '0.15rem',
              }}
            >
              Read all reviews →
            </Link>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {highlights.map((r) => (
            <ReviewCard key={r.id} review={r} variant="highlight" />
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (min-width: 760px) {
              .ferrum-reviews-head { grid-template-columns: 1.4fr 1fr !important; }
            }
          `,
        }}
      />
    </Section>
  );
}
