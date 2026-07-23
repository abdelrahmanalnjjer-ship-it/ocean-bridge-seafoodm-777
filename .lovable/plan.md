# Plan

## 1. Revert last two updates
- Delete `src/routes/vlog.tsx` and `src/routes/vlog.$slug.tsx`.
- Delete `src/data/vlog.ts`.
- Remove the `Vlog` nav link from header and footer in `src/components/site-chrome.tsx`.
- Remove i18n keys for the vlog listing/detail page (keep only the home "Vlog" section label).
- On the home page, restore the inline vlog rail (5 hardcoded cards) using the earlier harbor/mosque/coast imagery — not `home-1..home-9`.
- Delete unused CDN assets `src/assets/home-1..home-9.jpg.asset.json` (via `lovable-assets delete`).

## 2. New hero video (single looping)
- Upload `Untitled_design.mp4` via `lovable-assets` as `src/assets/hero-video.mp4.asset.json`.
- Replace the `HeroVideos` cross-fade component in `src/routes/index.tsx` with a single `<video autoplay muted loop playsInline>` background using the new asset. Keep the dhow poster fallback and navy gradient overlay.
- Remove the manual indicator dots and the 8s rotation logic.
- Delete `src/assets/vlog-1.mp4.asset.json` and `src/assets/vlog-2.mp4.asset.json` (no longer referenced).

## 3. Product category images
Upload the 4 uploaded PNGs as CDN assets and wire them into the 4 category cards on `src/routes/products.tsx` (and the home teaser cards if used):
- Pelagic → `Large_Pelagics.png`
- Demersal & Reef → `Demersal_Reef_Fish.png`
- Cephalopods → `Small_fishes.png`
- Crustaceans → `Crustaceans.png`

## 4. About & Connect imagery
- Reuse 5 of the existing vlog-section images (harbor-boats, harbor-dusk, fishermen, port-cranes, dhow-detail — the ones already used in the home Vlog rail).
- About page (`src/routes/about.tsx`): place 3 as editorial figures alongside the manifesto / capabilities / regulatory sections with fade-up scroll animations.
- Connect page (`src/routes/contact.tsx`): place 2 as a hero banner and a sidebar figure next to the contact info column.

## 5. Verify
- Run `bun run build`; fix any dangling imports from removed vlog files.
- Restart dev server after asset deletes.

## Technical notes
- Home Vlog section keeps its section label + cards but cards become non-linking (no detail page). No routing to `/vlog/*`.
- i18n dictionary keeps `section.vlog` / `section.vlog.sub` / `nav.*` minus `nav.vlog`.
- All new images imported as `@/assets/*.asset.json` pointer JSON, referenced via `.url`.
