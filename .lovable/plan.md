# Visual Redesign — Navy & Ice

The current site is a near-flat black page: almost no tonal contrast, one thin blue accent, and everything sits at the same visual weight. This replaces the palette, typography and section rhythm site-wide.

## 1. New color system

Replace the Deep Ocean Black theme with a two-tone navy/ice system so the page alternates dark and light instead of one continuous black slab.

- Dark base `#0f1b3d` (nav, hero, footer, feature bands)
- Mid navy `#1e3a5f` (elevated cards, borders, dark section variation)
- Ocean accent `#3b6fa0` (links, active states, hairlines, buttons)
- Ice `#e8edf3` (light section background, light-mode text on dark)
- Near-black ink `#0b1220` for type on ice sections

Every value goes into `src/styles.css` as semantic tokens (`--background`, `--card`, `--primary`, `--accent`, plus `.section-ice` / `.section-navy` band classes). No hardcoded colors in components.

## 2. Typography

- Display: **Instrument Serif** (hero, section headlines) — high-contrast editorial
- Body/UI: **Work Sans** (paragraphs, labels, nav, data tables)
- Loaded via `<link>` in the root route head, mapped in `@theme`
- Tighter display leading, wider eyebrow tracking, clearer size steps between H1/H2/body

## 3. Layout — full-width bands

Each page becomes a sequence of full-width sections that alternate navy → ice → navy, so contrast does the structural work.

- **Home**: hero (navy, video) → manifesto (ice) → capabilities (navy) → category teasers (ice) → vlog rail (navy) → regulatory strip (ice) → CTA (navy)
- **Products**: navy header band → ice band holding category tabs + grid; terminal/data view keeps a dark band for the mono table
- **About**: alternating bands, editorial figures full-bleed inside their band
- **Connect**: navy hero band → ice form band → navy contact/footer

Wider gutters, larger vertical padding, fewer competing elements per band.

## 4. Animation pass

- Section content fades up with a small stagger on viewport entry (framer-motion, ~24px, 0.6s, ease-out)
- Headlines get a slight clip/mask reveal; images scale from 1.04 → 1 on entry
- Card hover: 4px lift, border highlight, 1.05 image zoom
- Nav underline sweep, smooth mobile menu transitions
- All wrapped in `prefers-reduced-motion` guards

## Technical notes

- `src/styles.css`: rewrite `:root` token values, `@theme inline` color map, add `.section-ice` / `.section-navy` band utilities, update `.btn-primary`, `.btn-ghost`, `.card-lift`, `.eyebrow`, `.media-frame` for use on both light and dark bands.
- `src/routes/__root.tsx`: swap font `<link>`s to Instrument Serif + Work Sans.
- `src/components/site-chrome.tsx`, `index.tsx`, `products.tsx`, `about.tsx`, `contact.tsx`: reband sections, swap any leftover literal colors for tokens, apply the animation variants.
- No content, data, or routing changes — copy and the 35-species dataset stay as-is.
