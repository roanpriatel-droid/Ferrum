import {Suspense, useEffect, useState} from 'react';
import {Await, Link, NavLink, useAsyncValue, useLocation} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type AnchorLink = {label: string; href: string; anchor: string};

const NAV_LINKS: AnchorLink[] = [
  {label: 'The Forge', href: '/#forge', anchor: 'forge'},
  {label: 'The Protocol', href: '/#protocol', anchor: 'protocol'},
  {label: 'Reviews', href: '/#standards', anchor: 'standards'},
];

export function Header({cart}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 25,
        background:
          'color-mix(in oklab, var(--color-obsidian) 88%, transparent)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--color-steel-800)',
        color: 'var(--color-bone)',
        padding: '0 clamp(1rem, 4vw, 3rem)',
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}
    >
      <NavLink
        prefetch="intent"
        to="/"
        end
        style={{
          fontFamily: 'var(--font-display)',
          fontStretch: '125%',
          fontWeight: 800,
          fontSize: '1.15rem',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'var(--color-bone)',
          textDecoration: 'none',
          flexShrink: 0,
        }}
      >
        FERRUM
      </NavLink>

      <nav
        aria-label="Primary"
        className="ferrum-nav-desktop"
        style={{
          display: 'none',
          alignItems: 'center',
          gap: 'clamp(1.25rem, 3vw, 2.25rem)',
        }}
      >
        {NAV_LINKS.map((link) => (
          <AnchorNavLink key={link.href} link={link} />
        ))}
      </nav>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(0.5rem, 1.5vw, 1.25rem)',
          flexShrink: 0,
        }}
      >
        <ClaimCta />
        <CartToggle cart={cart} />
        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="ferrum-mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="ferrum-mobile-toggle"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.25rem',
            height: '2.25rem',
            background: 'transparent',
            border: '1px solid var(--color-steel-800)',
            color: 'var(--color-bone)',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <Hamburger open={mobileOpen} />
        </button>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (min-width: 860px) {
              .ferrum-nav-desktop { display: flex !important; }
              .ferrum-mobile-toggle { display: none !important; }
            }
          `,
        }}
      />
    </header>
  );
}

export function HeaderMenu(_: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: 'desktop' | 'mobile';
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  // Single-product brand — no Shopify-driven nav. Kept for the mobile aside
  // import that PageLayout still references.
  return null;
}

function AnchorNavLink({link}: {link: AnchorLink}) {
  const location = useLocation();
  const onHome = location.pathname === '/';
  const isActive = onHome && location.hash === `#${link.anchor}`;

  return (
    <a
      href={link.href}
      onClick={(e) => {
        if (!onHome) return;
        const el = document.getElementById(link.anchor);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({behavior: 'smooth', block: 'start'});
        history.replaceState(null, '', `#${link.anchor}`);
      }}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: isActive ? 'var(--color-bone)' : 'var(--color-steel-300)',
        textDecoration: 'none',
        transition: 'color 150ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--color-bone)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = isActive
          ? 'var(--color-bone)'
          : 'var(--color-steel-300)';
      }}
    >
      {link.label}
    </a>
  );
}

function ClaimCta() {
  const location = useLocation();
  const onHome = location.pathname === '/';

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.6rem 1rem',
    background: 'var(--color-ember)',
    color: 'var(--color-obsidian)',
    border: 'none',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'filter 200ms ease',
  };

  return (
    <a
      href="/#offer"
      onClick={(e) => {
        if (!onHome) return;
        const el = document.getElementById('offer');
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({behavior: 'smooth', block: 'start'});
        history.replaceState(null, '', '#offer');
      }}
      style={baseStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = 'brightness(1.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = 'none';
      }}
    >
      Claim the Forge
    </a>
  );
}

function Hamburger({open}: {open: boolean}) {
  const bar: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    width: '1.1rem',
    height: '1px',
    background: 'var(--color-bone)',
    transition: 'transform 200ms ease, opacity 200ms ease',
    transform: 'translateX(-50%)',
  };
  return (
    <span
      aria-hidden="true"
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '1.1rem',
        height: '0.7rem',
      }}
    >
      <span
        style={{
          ...bar,
          top: open ? '50%' : 0,
          transform: open
            ? 'translate(-50%, -50%) rotate(45deg)'
            : 'translateX(-50%)',
        }}
      />
      <span
        style={{
          ...bar,
          top: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: open ? 0 : 1,
        }}
      />
      <span
        style={{
          ...bar,
          bottom: open ? '50%' : 0,
          top: 'auto',
          transform: open
            ? 'translate(-50%, 50%) rotate(-45deg)'
            : 'translateX(-50%)',
        }}
      />
    </span>
  );
}

function MobileMenu({open, onClose}: {open: boolean; onClose: () => void}) {
  const location = useLocation();
  const onHome = location.pathname === '/';

  return (
    <div
      id="ferrum-mobile-menu"
      aria-hidden={!open}
      style={{
        position: 'fixed',
        top: 'var(--header-height)',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 24,
        background:
          'color-mix(in oklab, var(--color-obsidian) 96%, transparent)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--color-steel-800)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 200ms ease',
        padding: '2rem clamp(1.25rem, 4vw, 2.5rem)',
        overflowY: 'auto',
      }}
    >
      <nav
        style={{
          display: 'grid',
          gap: '0.25rem',
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {
              if (onHome) {
                const el = document.getElementById(link.anchor);
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({behavior: 'smooth', block: 'start'});
                  history.replaceState(null, '', `#${link.anchor}`);
                }
              }
              onClose();
            }}
            tabIndex={open ? 0 : -1}
            style={{
              fontFamily: 'var(--font-display)',
              fontStretch: '125%',
              fontWeight: 700,
              fontSize: '1.5rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--color-bone)',
              textDecoration: 'none',
              padding: '1.1rem 0',
              borderBottom: '1px solid var(--color-steel-800)',
            }}
          >
            {link.label}
          </a>
        ))}

        <div style={{display: 'grid', gap: '0.75rem', marginTop: '2rem'}}>
          {[
            {label: 'Shipping', to: '/pages/shipping'},
            {label: 'Returns', to: '/pages/returns'},
            {label: 'Contact', to: '/pages/contact'},
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              tabIndex={open ? 0 : -1}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-steel-300)',
                textDecoration: 'none',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

function CartBadge({count}: {count: number}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
      aria-label={`Cart (${count} ${count === 1 ? 'item' : 'items'})`}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: 'var(--color-bone)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.4rem 0.6rem',
        border: '1px solid var(--color-steel-800)',
        background: 'transparent',
      }}
    >
      <span>Cart</span>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '1.4rem',
          height: '1.4rem',
          padding: '0 0.35rem',
          background:
            count > 0 ? 'var(--color-ember)' : 'var(--color-graphite)',
          color:
            count > 0 ? 'var(--color-obsidian)' : 'var(--color-steel-300)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          letterSpacing: '0.04em',
        }}
      >
        {count}
      </span>
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}
