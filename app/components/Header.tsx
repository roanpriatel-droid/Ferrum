import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
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

export function Header({isLoggedIn, cart}: HeaderProps) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'color-mix(in oklab, var(--color-obsidian) 88%, transparent)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--color-steel-800)',
        color: 'var(--color-bone)',
        padding: '0 clamp(1.25rem, 4vw, 3rem)',
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
        }}
      >
        FERRUM
      </NavLink>

      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
}

export function HeaderMenu(_: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: 'desktop' | 'mobile';
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  // Single-product brand — no top-level nav. Kept as an export for the mobile
  // aside which still imports HeaderMenu from this module.
  return null;
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav
      role="navigation"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(0.75rem, 2vw, 1.5rem)',
      }}
    >
      <a
        href="#offer"
        onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById('offer');
          if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
        }}
        style={chromeLinkStyle}
      >
        Offer
      </a>
      <NavLink prefetch="intent" to="/account" style={chromeLinkStyle}>
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(loggedIn) => (loggedIn ? 'Account' : 'Sign in')}
          </Await>
        </Suspense>
      </NavLink>
      <CartToggle cart={cart} />
    </nav>
  );
}

const chromeLinkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.75rem',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--color-steel-300)',
  textDecoration: 'none',
};

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
      style={{
        ...chromeLinkStyle,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        color: 'var(--color-bone)',
      }}
    >
      <span>Cart</span>
      <span
        aria-label={`(items: ${count})`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '1.5rem',
          height: '1.5rem',
          padding: '0 0.4rem',
          background:
            count > 0
              ? 'var(--color-ember)'
              : 'var(--color-graphite)',
          color:
            count > 0 ? 'var(--color-obsidian)' : 'var(--color-steel-300)',
          border: '1px solid var(--color-steel-800)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.05em',
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
