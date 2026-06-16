# BRAND.md

**Read this before any FERRUM work — locked design system.**

This document defines how FERRUM is spoken, shown, and structured. Tokens, typography, and the product hierarchy below are fixed. Do not introduce new colors, new fonts, marketing claims that drift from the voice, or alternate product names. If a new surface needs something that isn't here, add it to this file first and keep the rest of the codebase aligned.

---

## 1. Voice

Cold. Declarative. Confident. No hype.

FERRUM does not sell — it states. Sentences are short. Claims are concrete. Adjectives earn their place or get cut. The reader should feel addressed by a metallurgist, not pitched by a marketer.

**Tone in one line:** the voice of a tool, not a brand.

### Writing rules

- Lead with the noun, then the verb. Avoid stacking adjectives.
- Prefer specifics over superlatives: *55.845 g/mol* over *premium-grade*.
- Periods, not exclamation points. Statements, not promises.
- Numbers are written as numerals. Units are SI where possible.
- Never address the reader as "friend," "fam," "legend," or similar.

### BANNED words and characters

The following are not permitted in any FERRUM-facing copy — site, email, social, support, packaging:

- insane
- crazy
- game-changer
- revolutionary
- hack
- viral
- `!!!` (or any multi-exclamation)
- 🔥 (or any emoji used for emphasis)

If a draft contains any of these, rewrite it before shipping.

---

## 2. Tagline

> **Forged, not given.**

This is the only tagline. It is not a slogan rotation. Use it as the closing line on the homepage, the footer signature, and the back of any printed insert. Do not lengthen it, do not punctuate it differently, do not translate it loosely.

---

## 3. Product architecture

The structure below is the canonical naming. Do not abbreviate, re-pluralize, or invent alternative SKUs.

### Brand

**FERRUM** — the brand. Always uppercase. Never "Ferrum," never "ferrum.com," never stylized as "FΞRRUM" or similar.

### Device

**The Forge** — the physical product.

- **SKU:** `FRM-01`
- Referred to in copy as *the Forge*, *the device*, or by SKU. Not "the FERRUM," not "Forge™."

### Program

**The FERRUM Protocol** — a 30-day digital program included free with every device.

- Delivered digitally.
- Framed at a **$39 value** wherever a value reference is appropriate (cart, PDP, comparison table).
- Always "the FERRUM Protocol" — capital P. Not "the protocol" on first mention.

### Tiers

Three purchase tiers. Pricing and labels are fixed.

| Tier        | Price    | Per unit  | Label         |
|-------------|----------|-----------|---------------|
| **Solo**    | $39.99   | $39.99    | —             |
| **Duo**     | $69.99   | $34.99 ea | Most Chosen   |
| **Arsenal** | $94.99   | $31.66 ea | —             |

- Tier names are always capitalized: Solo, Duo, Arsenal.
- *Most Chosen* is the only badge on the Duo tier. Do not add "Best Value," "Popular," or similar elsewhere.
- Per-unit prices are shown alongside tier totals on the PDP and cart.

---

## 4. Design tokens

The locked token set lives in `app/styles/app.css` inside the Tailwind v4 `@theme` block. Do not duplicate values inline; reference the tokens.

### Color

| Token                 | Hex       | Role                                      |
|-----------------------|-----------|-------------------------------------------|
| `--color-obsidian`    | `#0B0B0D` | Page background. Default surface.         |
| `--color-graphite`    | `#141519` | Raised surface, cards, tiles.             |
| `--color-steel-800`   | `#2A2D33` | Hairline borders, dividers.               |
| `--color-steel-500`   | `#6B7079` | Mono labels, secondary text.              |
| `--color-steel-300`   | `#A8ADB5` | Body de-emphasis.                         |
| `--color-bone`        | `#ECEAE4` | Primary text on obsidian.                 |
| `--color-ember`       | `#D2592A` | Single accent. Use sparingly.             |

Ember is the only warm color in the system. Reserve it for one accent per view — a glow, an underline, a price punch. Never two embers competing in the same fold.

### Typography

| Token             | Family                | Role                                  |
|-------------------|-----------------------|---------------------------------------|
| `--font-display`  | Archivo Expanded      | Display headings. Uppercase.          |
| `--font-body`     | Inter                 | Body copy, paragraphs, UI labels.     |
| `--font-mono`     | IBM Plex Mono         | Eyebrows, spec values, atomic numbers.|

Display type is set in uppercase with tracked letters. Body is mixed case. Mono is uppercase with wide tracking for eyebrows; natural case for spec values.

---

## 5. Motif

The periodic-element tile (`<FeTile />`) is the signature mark. It carries:

- Atomic number **26** (top-left).
- Symbol **Fe** (large, center).
- Name **Ferrum** and atomic mass **55.845** (bottom row).
- A faint ember glow.

Use the tile as a wordmark substitute, a section anchor, or a closing flourish. Do not recolor it. Do not add words inside the tile beyond the four above.
