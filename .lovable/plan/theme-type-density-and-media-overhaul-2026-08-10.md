# Theme, Type, Density and Media Overhaul

Goal: kill the generic "AI template" feel — new palette, new typographic voice, tighter vertical rhythm, real photography, and hero video that actually plays correctly.

## 1. New color system

Replace the navy/ice tokens site-wide:

- Dominant background: Deep Ocean Teal `#10222B`, with `#1A2E35` for elevated surfaces and cards.
- Accent: Forest Moss Green `#2C3E2D`, used for buttons, active states, rules and hover fills (a lighter moss tint for hover).
- Light bands: Mist White `#FFFFFF` with a soft warm-grey card tone and dark teal text.
- Borders become hairlines derived from the teal/mist rather than translucent white — this alone removes much of the flat "default dark mode" look.

The band classes (`.section-navy`, `.section-ice`, etc.) are re-pointed at the new values, so every page flips over at once.

## 2. Typography

- Display / brand: high-contrast luxury serif — Cormorant Garamond for headlines, Cinzel reserved for the wordmark and caps eyebrows.
- Body / nav / UI: Montserrat.
- Rebuilt type scale. The current headings are oversized and all one texture. New scale:
  - Hero headline noticeably smaller and tighter (clamp ~2.25–3.75rem), leading 1.05.
  - Section headings drop a full step; body copy up slightly to 15–16px with tighter leading (1.65 instead of 1.8).
  - Eyebrows shrink and lose some letter-spacing so they stop reading as decoration.

## 3. Remove the dead space

Vertical padding is currently `py-32`/`py-40` on nearly every section — the single biggest "AI-made" tell.

- Sections move to `py-16 md:py-24`; only one or two sections keep extra air.
- Heading-to-content gaps cut from `mb-20` to `mb-10`.
- Deliberate rhythm variation: some sections tight, some open, instead of one repeated interval.
- Max content width narrows from 1400px to 1240px so lines stop stretching.

## 4. Hero video fixes

- The third clip ("Untitled design.mp4") is a portrait 720x1280 vertical video — the Oman-flag shot — and cannot fill a widescreen band. It is removed from the full-bleed rotation and reused as a framed vertical inset in the About/Origin section, where a portrait ratio belongs.
- The second clip is only ~3.9s and rotation currently advances on `onEnded`, so it flashes past before the crossfade completes. Fix: all hero clips loop, and rotation runs on a fixed 7s timer with a 1.2s crossfade, giving every clip equal, visible screen time.
- Remaining hero clips use `object-cover` with preload, so no letterboxing and no black frame on switch.

## 5. Markets & Compliance imagery

Source license-free port and container-terminal photography (container cranes, reefer stacks, loading berths) from Unsplash/Pexels, register them as CDN assets, and rebuild the section as an image-led split: a large terminal photo beside the four market rows, plus a small image chip per market row. Replaces the current text-only wall.

## Technical notes

- `src/styles.css`: token values, band definitions, new `--font-display` / `--font-sans`, revised `.h-display-*` scale, `.eyebrow`, `.lede`, and button colors (`.btn-primary`, `.btn-pill`, `.btn-ghost`) moved to the moss accent.
- `src/routes/__root.tsx`: font `<link>` tags for the new families.
- `src/routes/index.tsx`: hero slide array plus timer-based rotation, padding/type pass, Markets & Compliance rebuilt with imagery.
- `src/routes/about.tsx`: vertical Oman clip placed as a framed portrait inset; padding pass.
- `src/routes/products.tsx`, `src/routes/contact.tsx`, `src/components/site-chrome.tsx`: padding and type-scale pass so the whole site matches.
- New images downloaded, uploaded via `lovable-assets`, referenced as `.asset.json` pointers. No generated media.
- No copy, data, or routing changes.