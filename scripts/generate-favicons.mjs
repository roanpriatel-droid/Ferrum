#!/usr/bin/env node
/**
 * FERRUM favicon generator.
 *
 * Builds the favicon set from the FeTile monogram, simplified for tiny
 * sizes. Writes everything into /public/.
 *
 *   favicon.svg                — vector master (modern browsers prefer this)
 *   favicon.ico                — multi-size 16 / 32 / 48
 *   favicon-16x16.png
 *   favicon-32x32.png
 *   apple-touch-icon.png       — 180×180, rounded, ember glow + steel border
 *   icon-192.png, icon-512.png — PWA / Android, maskable-safe padding
 *   site.webmanifest
 *
 * Run:
 *   node scripts/generate-favicons.mjs
 */

import {writeFile, mkdir} from 'node:fs/promises';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC_DIR = join(ROOT, 'public');

// ─── Tokens (mirror BRAND.md) ────────────────────────────────────────

const OBSIDIAN = '#0B0B0D';
const BONE = '#ECEAE4';
const EMBER = '#D2592A';
const STEEL = '#2A2D33';

// Heavy expanded sans, with the widest fallback chain we can muster.
// Sharp's underlying renderer (resvg / librsvg) will pick the first
// installed match. Inter / Archivo aren't guaranteed; Arial Black is on
// every Windows install, Helvetica on every macOS one.
const FONT_STACK =
  '"Archivo", "Arial Black", "Helvetica Neue", Helvetica, "Inter", sans-serif';

// ─── SVG templates ──────────────────────────────────────────────────

/**
 * Minimal favicon SVG — pure Fe on obsidian. Used by the browser
 * directly via favicon.svg AND rasterized into the tiny 16/32/48 sizes
 * where ember accents and a steel border would just become muddy
 * single-pixel noise.
 */
function svgFavicon({size = 64, rx = 0} = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
  <rect width="64" height="64" rx="${rx}" ry="${rx}" fill="${OBSIDIAN}"/>
  <text
    x="32" y="44"
    font-family='${FONT_STACK}'
    font-weight="900"
    font-size="40"
    letter-spacing="-1.2"
    text-anchor="middle"
    fill="${BONE}"
  >Fe</text>
</svg>`;
}

/**
 * Larger FeTile — for 180 / 192 / 512. Adds:
 *   - faint ember corner glow (radial gradient, bottom-right)
 *   - 1.5%-inset steel hairline border
 *   - rounded corners (square ICOs override this when used)
 *
 * Designed against a 512 viewBox; rendered into any target size.
 *
 * `maskableSafe` keeps the Fe inside the inner 80% so Android maskable
 * crops don't clip it.
 */
function svgFeTile({rx = 96, maskableSafe = false} = {}) {
  const fontSize = maskableSafe ? 280 : 320;
  const yBaseline = maskableSafe ? 340 : 348;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="emberGlow" cx="80%" cy="78%" r="60%">
      <stop offset="0%" stop-color="${EMBER}" stop-opacity="0.32"/>
      <stop offset="55%" stop-color="${EMBER}" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="${EMBER}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" rx="${rx}" ry="${rx}" fill="${OBSIDIAN}"/>
  <rect width="512" height="512" rx="${rx}" ry="${rx}" fill="url(#emberGlow)"/>
  <rect
    x="8" y="8" width="496" height="496"
    rx="${Math.max(0, rx - 8)}" ry="${Math.max(0, rx - 8)}"
    fill="none" stroke="${STEEL}" stroke-width="6"
  />
  <text
    x="256" y="${yBaseline}"
    font-family='${FONT_STACK}'
    font-weight="900"
    font-size="${fontSize}"
    letter-spacing="-10"
    text-anchor="middle"
    fill="${BONE}"
  >Fe</text>
</svg>`;
}

// ─── Manifest ───────────────────────────────────────────────────────

const MANIFEST = {
  name: 'FERRUM',
  short_name: 'FERRUM',
  start_url: '/',
  display: 'standalone',
  background_color: OBSIDIAN,
  theme_color: OBSIDIAN,
  icons: [
    {
      src: '/icon-192.png',
      type: 'image/png',
      sizes: '192x192',
      purpose: 'any maskable',
    },
    {
      src: '/icon-512.png',
      type: 'image/png',
      sizes: '512x512',
      purpose: 'any maskable',
    },
  ],
};

// ─── Render helpers ─────────────────────────────────────────────────

async function rasterize(svgString, size) {
  return sharp(Buffer.from(svgString))
    .resize(size, size, {fit: 'cover'})
    .png({compressionLevel: 9})
    .toBuffer();
}

async function write(name, data) {
  const target = join(PUBLIC_DIR, name);
  await writeFile(target, data);
  // eslint-disable-next-line no-console
  console.log(`  ✓ /public/${name} (${data.length.toLocaleString()} bytes)`);
}

// ─── Main ───────────────────────────────────────────────────────────

async function main() {
  await mkdir(PUBLIC_DIR, {recursive: true});
  // eslint-disable-next-line no-console
  console.log('Generating FERRUM favicon set into /public/');

  // 1. Vector master — the simplified Fe-on-obsidian, square.
  const faviconSvg = svgFavicon({size: 64, rx: 0});
  await write('favicon.svg', Buffer.from(faviconSvg, 'utf8'));

  // 2. Rasterize 16 / 32 / 48 for ICO + the two explicit PNG sizes.
  //    Tiny sizes use the minimal SVG (no steel border, no ember glow).
  const png16 = await rasterize(faviconSvg, 16);
  const png32 = await rasterize(faviconSvg, 32);
  const png48 = await rasterize(faviconSvg, 48);

  await write('favicon-16x16.png', png16);
  await write('favicon-32x32.png', png32);

  // 3. Assemble the multi-size ICO.
  const ico = await pngToIco([png16, png32, png48]);
  await write('favicon.ico', ico);

  // 4. Apple touch icon — 180×180, rounded, ember glow + steel border.
  const appleSvg = svgFeTile({rx: 32, maskableSafe: false});
  const png180 = await rasterize(appleSvg, 180);
  await write('apple-touch-icon.png', png180);

  // 5. PWA icons — 192 and 512, maskable-safe padding.
  const maskableSvg = svgFeTile({rx: 96, maskableSafe: true});
  const png192 = await rasterize(maskableSvg, 192);
  const png512 = await rasterize(maskableSvg, 512);
  await write('icon-192.png', png192);
  await write('icon-512.png', png512);

  // 6. Web app manifest.
  await write(
    'site.webmanifest',
    Buffer.from(JSON.stringify(MANIFEST, null, 2) + '\n', 'utf8'),
  );

  // eslint-disable-next-line no-console
  console.log('Done.');
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
