import {StarRating} from './StarRating';
import {formatRelativeDate, type Review} from '~/lib/ferrum-reviews';

type Props = {
  review: Review;
  variant?: 'card' | 'highlight';
};

export function ReviewCard({review, variant = 'card'}: Props) {
  const isHighlight = variant === 'highlight';
  return (
    <article
      style={{
        background: 'var(--color-graphite)',
        border: `1px solid ${
          review.topReview ? 'color-mix(in oklab, var(--color-ember) 35%, var(--color-steel-800))' : 'var(--color-steel-800)'
        }`,
        padding: isHighlight
          ? 'clamp(1.5rem, 2.5vw, 2rem)'
          : '1.5rem',
        display: 'grid',
        gap: '1rem',
        position: 'relative',
        minHeight: isHighlight ? '220px' : '180px',
      }}
    >
      {review.topReview && (
        <span
          style={{
            position: 'absolute',
            top: '-0.55rem',
            right: '1rem',
            background: 'var(--color-ember)',
            color: 'var(--color-obsidian)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            padding: '0.25rem 0.55rem',
            whiteSpace: 'nowrap',
          }}
        >
          Top review
        </span>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}
      >
        <StarRating value={review.rating} size={isHighlight ? 16 : 13} />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-steel-500)',
          }}
        >
          {formatRelativeDate(review.date)}
        </span>
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontStretch: '125%',
          fontWeight: 600,
          fontSize: isHighlight
            ? 'clamp(1.05rem, 1.5vw, 1.2rem)'
            : '1rem',
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
          color: 'var(--color-bone)',
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {review.title}
      </h3>

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          lineHeight: 1.55,
          color: 'var(--color-bone)',
          margin: 0,
        }}
      >
        {review.body}
      </p>

      <footer
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          paddingTop: '0.85rem',
          borderTop: '1px solid var(--color-steel-800)',
          marginTop: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '1.85rem',
              height: '1.85rem',
              background: 'var(--color-obsidian)',
              border: '1px solid var(--color-steel-800)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.04em',
              color: 'var(--color-steel-300)',
            }}
          >
            {review.initials}
          </span>
          <div style={{display: 'grid', gap: '0.1rem'}}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.06em',
                color: 'var(--color-bone)',
              }}
            >
              {review.name}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-ember)',
              }}
            >
              ✓ Verified buyer
            </span>
          </div>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-steel-500)',
            padding: '0.25rem 0.55rem',
            border: '1px solid var(--color-steel-800)',
          }}
        >
          {review.tag}
        </span>
      </footer>
    </article>
  );
}
