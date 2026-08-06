# Logo System, Product Image Sizing, and Insider-Style Home

## 1. Logo placement (three uploaded variants)

Register all three uploads as CDN assets and place them by role:

- **Secondary horizontal logo** — header / navigation bar on every page. Replaces the current `/logos/logo.png` used with a `brightness-0 invert` filter, which flattens the brand navy/teal into pure white. The new mark keeps its real colors on the dark nav.
- **Primary vertical logo** — footer (stacked branding block, replacing the inverted horizontal mark) and the About page intro.
- **Submark / icon** — favicon. A square 64x64 PNG copy goes into `public/` and the icon link in the root route points at it; the old `favicon.ico` is removed. Also used as the compact mark in the mobile menu header.

## 2. Product card images — original proportions

Product cards currently force every photo into a `4:3` box with `object-cover`, which crops and enlarges the shots. Change to:

- A neutral panel with the image constrained by height (not stretched edge-to-edge), rendered `object-contain` so the full product shot is visible at natural aspect ratio.
- Same treatment for the four category tiles on the home page, so the plated/slate product photography reads as product photography, not a cropped banner.
- Cards stay equal height across the grid; only the image box changes.

## 3. Hero + home page in the Insider Madeira register

Reference cues: one full-bleed silent video, near-invisible chrome floating over it, an oversized brand wordmark at top-left, the headline block anchored low-right, one pill CTA, and a very quiet page below.

**Hero**
- Full-viewport (100vh) video, lighter dark overlay (bottom-weighted gradient only) so the footage stays bright instead of the current heavy navy wash.
- Nav becomes fully transparent over the hero — no background bar, no border — and only fades to a solid navy bar once the user scrolls past the hero.
- Headline, sub-line and a single pill-shaped CTA ("Plan"-style: rounded-full, light surface, arrow badge on the right) sit bottom-right, right-aligned, replacing the current bottom-left block.
- The existing 3-video rotation stays, but indicators become minimal dots at bottom-left.

**Below the hero**
- Buttons site-wide move to the pill/rounded-full style with the circular arrow badge.
- Section rhythm simplified: more air, fewer boxed panels, section headings left-aligned with a thin rule, cards borderless with hover lift.
- Certification ticker and stats strip stay but get lighter treatment (no heavy borders).

## Technical notes

- `lovable-assets create` for each of the three uploads into `src/assets/*.asset.json`; `public/favicon.png` written as a real square file (favicons cannot be pointers).
- `src/components/site-chrome.tsx`: scroll-aware transparent → solid header via a scroll listener, new logo imports, footer vertical logo, mobile menu submark.
- `src/routes/__root.tsx`: favicon link swap.
- `src/routes/index.tsx`: hero restructured to 100vh with bottom-right caption block; category tiles switch to contained imagery.
- `src/routes/products.tsx`: species card image box switched to contained, fixed-height panel.
- `src/styles.css`: add `.btn-pill` (rounded-full + arrow badge) and lighter section spacing utilities; no palette change.
- No copy, data, or routing changes.
