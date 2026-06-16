import {
  useLoaderData,
  useLocation,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router';
import type {Route} from './+types/products.$handle';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import {Section, Eyebrow, Display} from '~/components/ferrum/Section';
import {EmberCta} from '~/components/ferrum/EmberCta';
import {ProductGallery} from '~/components/ferrum/pdp/ProductGallery';
import {PdpBuyBox} from '~/components/ferrum/pdp/PdpBuyBox';
import {ThreeDimensions} from '~/components/ferrum/pdp/ThreeDimensions';
import {FeatureGrid} from '~/components/ferrum/pdp/FeatureGrid';
import {WhatItTrains} from '~/components/ferrum/pdp/WhatItTrains';
import {PdpStory} from '~/components/ferrum/pdp/PdpStory';
import {ProtocolValueCard} from '~/components/ferrum/pdp/ProtocolValueCard';
import {StandardsStrip} from '~/components/ferrum/pdp/StandardsStrip';
import {GuaranteeBand} from '~/components/ferrum/pdp/GuaranteeBand';
import {PdpFaq} from '~/components/ferrum/pdp/PdpFaq';
import {ProtocolGallery} from '~/components/ferrum/pdp-protocol/ProtocolGallery';
import {ProtocolBuyBox} from '~/components/ferrum/pdp-protocol/ProtocolBuyBox';
import {WhatsInside} from '~/components/ferrum/pdp-protocol/WhatsInside';
import {ThreePhases} from '~/components/ferrum/pdp-protocol/ThreePhases';
import {Science} from '~/components/ferrum/pdp-protocol/Science';
import {RevealTeaser} from '~/components/ferrum/pdp-protocol/RevealTeaser';
import {ProtocolFaq} from '~/components/ferrum/pdp-protocol/ProtocolFaq';
import {ReviewHighlights} from '~/components/ferrum/reviews/ReviewHighlights';
import {
  FORGE_HANDLE,
  THE_PROTOCOL_HANDLE,
  PDP_PATH,
  PROTOCOL_PATH,
} from '~/lib/ferrum-tiers';

export const meta: Route.MetaFunction = ({data}) => {
  const handle = data?.product?.handle;
  const isProtocol = handle === THE_PROTOCOL_HANDLE;

  const title = data?.product
    ? `${data.product.title} — FERRUM`
    : isProtocol
      ? 'The FERRUM Protocol — FERRUM'
      : 'The Forge — FERRUM';

  const fallbackDesc = isProtocol
    ? 'The FERRUM Protocol — a 30-day digital training and reveal system. Three phases, twelve movements, six named protocols. Free with every Forge.'
    : 'The Forge — FRM-01. A 3D rotational grip instrument. Crush, rotate, drive. Ships with the 30-day FERRUM Protocol.';

  const description =
    data?.product?.seo?.description ||
    data?.product?.description ||
    fallbackDesc;

  return [
    {title},
    {name: 'description', content: description},
    {
      tagName: 'link',
      rel: 'canonical',
      href: `/products/${handle ?? ''}`,
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
  ]);

  if (!product?.id) {
    throw new Response('Product not found', {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {product};
}

function loadDeferredData(_args: Route.LoaderArgs) {
  return {};
}

export default function ProductRoute() {
  const {product} = useLoaderData<typeof loader>();
  return product.handle === THE_PROTOCOL_HANDLE ? (
    <ProtocolPdp />
  ) : (
    <ForgePdp />
  );
}

// ─── Forge PDP ───────────────────────────────────────────────────────

function ForgePdp() {
  const {product} = useLoaderData<typeof loader>();

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  useSelectedOptionInUrlParam(selectedVariant?.selectedOptions ?? []);

  const allVariants = collectVariants(product, selectedVariant);

  type GalleryImg = {
    id?: string | null;
    url: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
  };

  const galleryImages: GalleryImg[] =
    product.images?.nodes?.map(
      (img: GalleryImg): GalleryImg => ({
        id: img.id,
        url: img.url,
        altText: img.altText,
        width: img.width,
        height: img.height,
      }),
    ) ?? [];

  const heroImage: GalleryImg[] = selectedVariant?.image
    ? [
        {
          id: selectedVariant.image.id,
          url: selectedVariant.image.url,
          altText: selectedVariant.image.altText,
          width: selectedVariant.image.width,
          height: selectedVariant.image.height,
        },
        ...galleryImages.filter(
          (g: GalleryImg) => g.id !== selectedVariant.image?.id,
        ),
      ]
    : galleryImages;

  return (
    <div
      style={{
        background: 'var(--color-obsidian)',
        color: 'var(--color-bone)',
      }}
    >
      <Section
        as="section"
        id="pdp-hero"
        style={{paddingTop: 'clamp(2.5rem, 5vw, 4rem)'}}
      >
        <div
          className="ferrum-pdp-hero"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'start',
          }}
        >
          <ProductGallery images={heroImage} title={product.title} />
          <PdpBuyBox
            productTitle={product.title}
            productHandle={product.handle}
            selectedVariant={selectedVariant ?? null}
            variants={allVariants}
          />
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (min-width: 960px) {
                .ferrum-pdp-hero { grid-template-columns: 1.05fr 1fr !important; }
              }
            `,
          }}
        />
      </Section>

      <ThreeDimensions />
      <FeatureGrid />
      <WhatItTrains />
      <PdpStory descriptionHtml={product.descriptionHtml} />
      <ProtocolValueCard />
      <ReviewHighlights
        eyebrow="Reviews · Early access"
        heading="From the first FERRUM owners."
      />
      <StandardsStrip />
      <GuaranteeBand />
      <PdpFaq />

      <Section id="closing-cta">
        <div
          style={{
            display: 'grid',
            gap: '1.5rem',
            justifyItems: 'start',
            borderTop: '1px solid var(--color-steel-800)',
            paddingTop: 'clamp(2.5rem, 5vw, 3.5rem)',
          }}
        >
          <Eyebrow>Forge, not given</Eyebrow>
          <Display as="h2" size="lg" style={{maxWidth: '20ch'}}>
            Claim the Forge.
          </Display>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1rem 1.5rem',
            }}
          >
            <EmberCta href="#pdp-hero" size="lg">
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

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}

// ─── Protocol PDP ────────────────────────────────────────────────────

function ProtocolPdp() {
  const {product} = useLoaderData<typeof loader>();

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  useSelectedOptionInUrlParam(selectedVariant?.selectedOptions ?? []);

  const galleryImages =
    product.images?.nodes?.map(
      (img: {
        id?: string | null;
        url: string;
        altText?: string | null;
        width?: number | null;
        height?: number | null;
      }) => ({
        id: img.id,
        url: img.url,
        altText: img.altText,
        width: img.width,
        height: img.height,
      }),
    ) ?? [];

  return (
    <div
      style={{
        background: 'var(--color-obsidian)',
        color: 'var(--color-bone)',
      }}
    >
      <Section
        as="section"
        id="protocol-pdp-hero"
        style={{paddingTop: 'clamp(2.5rem, 5vw, 4rem)'}}
      >
        <div
          className="ferrum-protocol-pdp-hero"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'start',
          }}
        >
          <ProtocolGallery images={galleryImages} />
          <ProtocolBuyBox selectedVariant={selectedVariant ?? null} />
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (min-width: 960px) {
                .ferrum-protocol-pdp-hero { grid-template-columns: 1fr 1fr !important; }
              }
            `,
          }}
        />
      </Section>

      <WhatsInside />
      <ThreePhases />
      <Science />
      <RevealTeaser />
      <ProtocolFaq />

      <Section id="protocol-closing">
        <div
          style={{
            display: 'grid',
            gap: '1.5rem',
            justifyItems: 'start',
            borderTop: '1px solid var(--color-steel-800)',
            paddingTop: 'clamp(2.5rem, 5vw, 3.5rem)',
          }}
        >
          <Eyebrow>The system, on its own — or with the Forge</Eyebrow>
          <Display as="h2" size="lg" style={{maxWidth: '22ch'}}>
            Forged, not given.
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
            <EmberCta href="#protocol-pdp-hero" variant="ghost">
              Buy the Protocol
            </EmberCta>
          </div>
        </div>
      </Section>

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────

type RawVariant = {
  id: string;
  title?: string | null;
  availableForSale: boolean;
  price: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
  selectedOptions: Array<{name: string; value: string}>;
};

function collectVariants(
  product: unknown,
  selected: unknown,
): RawVariant[] {
  const map = new Map<string, RawVariant>();
  const p = product as {
    adjacentVariants?: Array<RawVariant | null> | null;
    options?: Array<{
      optionValues?: Array<{firstSelectableVariant?: RawVariant | null}> | null;
    }> | null;
    variants?: {nodes?: Array<RawVariant | null> | null} | null;
  };

  const push = (v: RawVariant | null | undefined) => {
    if (!v || !v.id) return;
    if (map.has(v.id)) return;
    map.set(v.id, v);
  };

  push(selected as RawVariant | null);

  p.adjacentVariants?.forEach((v) => push(v));
  p.options?.forEach((option) => {
    option.optionValues?.forEach((value) => {
      push(value.firstSelectableVariant);
    });
  });
  p.variants?.nodes?.forEach((v) => push(v));

  return Array.from(map.values());
}

// ─── Error boundary ──────────────────────────────────────────────────

export function ErrorBoundary() {
  const error = useRouteError();
  const location = useLocation();
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  const isProtocol = location.pathname === PROTOCOL_PATH;
  const productName = isProtocol ? 'FERRUM Protocol' : 'Forge';
  const expectedHandle = isProtocol ? THE_PROTOCOL_HANDLE : FORGE_HANDLE;

  return (
    <div
      style={{
        background: 'var(--color-obsidian)',
        color: 'var(--color-bone)',
      }}
    >
      <Section as="section">
        <div style={{display: 'grid', gap: '1.5rem', maxWidth: '46rem'}}>
          <Eyebrow>{is404 ? 'Pending configuration' : 'Error'}</Eyebrow>
          <Display as="h1" size="lg">
            {is404 ? (
              <>
                The {productName} is being
                <br />
                set up in Shopify.
              </>
            ) : (
              'Something went wrong.'
            )}
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
            {is404 ? (
              <>
                This page goes live the moment the product with handle{' '}
                <code style={{color: 'var(--color-ember)'}}>
                  {expectedHandle}
                </code>{' '}
                is published in the Shopify admin. The homepage and the
                Reviews page remain available.
              </>
            ) : (
              'A request failed while rendering this page. Refresh, or return to the homepage.'
            )}
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '1rem 1.5rem',
            }}
          >
            <EmberCta href="/">Back to home</EmberCta>
            <EmberCta href="/reviews" variant="ghost">
              Read reviews
            </EmberCta>
          </div>
        </div>
      </Section>
    </div>
  );
}

// ─── GraphQL ─────────────────────────────────────────────────────────

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    images(first: 8) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants(selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    variants(first: 10) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;
