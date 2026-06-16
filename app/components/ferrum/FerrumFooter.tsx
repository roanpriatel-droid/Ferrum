import {Link} from 'react-router';
import {FeTile} from './FeTile';

const PRIMARY_NAV: {label: string; href: string}[] = [
  {label: 'The Forge', href: '/#forge'},
  {label: 'The Protocol', href: '/#protocol'},
  {label: 'Offer', href: '/#offer'},
  {label: 'Standards', href: '/#standards'},
  {label: 'FAQ', href: '/#faq'},
];

const META_NAV: {label: string; href: string}[] = [
  {label: 'Shipping', href: '/policies/shipping-policy'},
  {label: 'Returns', href: '/policies/refund-policy'},
  {label: 'Privacy', href: '/policies/privacy-policy'},
  {label: 'Terms', href: '/policies/terms-of-service'},
  {label: 'Contact', href: '/pages/contact'},
];

export function FerrumFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        background: 'var(--color-obsidian)',
        borderTop: '1px solid var(--color-steel-800)',
        color: 'var(--color-bone)',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 3rem)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gap: 'clamp(2.5rem, 5vw, 4rem)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: 'clamp(2rem, 4vw, 3rem)',
            alignItems: 'start',
          }}
          className="ferrum-footer-top"
        >
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <FeTile size={88} />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontStretch: '125%',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--color-bone)',
                lineHeight: 0.95,
              }}
            >
              Ferrum
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: 'var(--color-steel-500)',
              }}
            >
              Forged, not given.
            </span>
          </div>

          <FooterColumn label="Product" links={PRIMARY_NAV} />
          <FooterColumn label="Company" links={META_NAV} />
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            paddingTop: 'clamp(1.5rem, 3vw, 2rem)',
            borderTop: '1px solid var(--color-steel-800)',
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
            © {year} FERRUM · FRM-01
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-steel-500)',
            }}
          >
            26 · Fe · 55.845
          </span>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (min-width: 900px) {
              .ferrum-footer-top { grid-template-columns: 2fr 1fr 1fr !important; }
            }
          `,
        }}
      />
    </footer>
  );
}

function FooterColumn({
  label,
  links,
}: {
  label: string;
  links: {label: string; href: string}[];
}) {
  return (
    <div style={{display: 'grid', gap: '1rem'}}>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--color-steel-500)',
        }}
      >
        {label}
      </span>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          gap: '0.6rem',
        }}
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--color-bone)',
                textDecoration: 'none',
                transition: 'color 150ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-ember)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-bone)';
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
