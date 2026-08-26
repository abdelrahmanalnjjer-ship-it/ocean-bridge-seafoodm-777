# design-sync notes — Ocean Bridge Trade

Repo-specific gotchas for future syncs. Read this before re-running.

## What this repo is

- It is a **TanStack Start application**, not a published component library. There is no
  library `dist/` and `package.json` has no `main`/`module`/`exports`, so the converter is
  pointed at a hand-written barrel: **`.design-sync/entry.ts`** (committed). It re-exports
  `src/components/ui/*`, the three real component files, and `I18nProvider`. It deliberately
  does **not** re-export `src/routes/*` — those pull in server/router code and would break
  the esbuild pass (and `Route` would be mis-detected as a component).
- **The 46 shadcn/ui components in `src/components/ui/` are unused by the app.** Zero imports
  outside their own directory; even the contact form styles bare `<input>`/`<textarea>`/
  `<button>`. The real design language is the utility-class layer in `src/styles.css`. This
  is the single most important fact for anyone re-running the sync — see
  `.design-sync/conventions.md`, which tells the design agent the same thing.

## Config decisions

- `pkg` is `ocean-bridge-ui` (a label, not a real npm name — nothing resolves it from
  node_modules because `--entry` is always passed). `globalName` is `OceanBridge`.
- `componentSrcMap` pins **57 roots**. The barrel exports 254 PascalCase symbols; the rest
  are compound subparts (`CardHeader`, `DialogTitle`, …). They stay importable from
  `window.OceanBridge` but get no card. shadcn exports everything flat with no namespace
  objects, so the converter's automatic subcomponent grouping (which needs `Table.Row`-style
  compounds) can never fire here — the explicit root list is the only lever.
- `docsDir` is `.design-sync/docs/`, one `<Name>.md` per root carrying `category:`
  frontmatter. That is what produces the DS-pane groups; without it every component lands in
  `general`, because the group heuristic strips `ui/` as a generic directory name.
- `provider` is `PreviewProviders` from `.design-sync/preview-providers.tsx`, wired via
  `extraEntries`. It supplies router context (`RouterContextProvider` — **not**
  `RouterProvider`, which renders routes instead of children) plus `I18nProvider`. Without
  it `SiteHeader`/`SiteFooter` die with `Cannot read properties of null (reading 'stores')`.

## The CSS pipeline (the fiddly part)

`src/styles.css` is Tailwind v4 **source**, not compiled CSS, so it cannot be `cssEntry`
directly. The build is a two-step:

```sh
node .ds-sync/node_modules/@tailwindcss/cli/dist/index.mjs \
  -i .design-sync/tw-entry.css -o .design-sync/.cache/ds-styles.css
```

then `cssEntry: .design-sync/.cache/ds-styles.css`. Three traps, all already handled:

1. **Re-run the CSS compile after ANY preview edit.** Preview-only utility classes are
   tree-shaken out otherwise. This bit once: `sm:grid-cols-3` silently vanished and the
   Reveal/Stagger grids rendered single-column.
2. **`@source "./previews/*.tsx"` must stay an explicit glob.** Tailwind's scanner skips
   hidden directories, so the plain `@source "./previews"` form scanned nothing at all
   (`.design-sync` is a dotdir). The explicit file glob works.
3. **Fonts.** The compiled CSS references `url(./files/*.woff2)` from `@fontsource`. Those
   files must be copied next to the compiled stylesheet or the build reports
   `[FONT_DANGLING]`. Regenerate with the loop in "Re-sync" below.

`tw-entry.css` also appends an **unlayered `html body` rule** restating the ground. This is
load-bearing: `src/styles.css` sets the body background inside `@layer base`, and the
preview-card template declares an unlayered `body { background: #fff }`, which outranks any
layer. Without the restatement every card in this dark-only system renders on white.

## Render harness

- No playwright browser is installed. The render check and capture run against the system
  Chrome via `DS_CHROMIUM_PATH="C:/Program Files/Google/Chrome/Application/chrome.exe"`.
  Only the `playwright` npm package is installed in `.ds-sync/` (browser download skipped).
  **Export that variable before validate/capture or they fail `[RENDER_SKIPPED]`.**
- **Scroll-entrance components photograph blank.** `package-capture.mjs` screenshots at
  `networkidle`, but framer-motion's `whileInView` does not fire until the
  IntersectionObserver callback lands ~700ms later — so `Reveal`, `Stagger` and `LineReveal`
  captured at `opacity: 0`. Each of those previews now renders a local `<style>` pinning the
  settled state (`[data-reveal], [data-reveal] * { opacity:1; transform:none }`). It is
  scoped to the preview and never reaches the shipped stylesheet. `LineReveal` needs the
  descendant selector (`*`, not `> *`) because its animated span sits inside the
  `.reveal-line` mask.
- **`fixed`-positioned components** (`ProgressRail`, `SiteHeader`) need a containing block
  to show up inside a card. Any transform makes one — the previews wrap them in a stage with
  `transform: translateZ(0)`.

## Known render warns (triaged — not new)

- `[RENDER_THIN] AspectRatio` fired before its preview existed; it paints nothing on its
  own. Now authored, no longer warns. If it returns, it means the preview stopped compiling.

## Open items / Re-sync risks

- **The wordmark is missing from `SiteHeader`/`SiteFooter` cards.** Both hardcode absolute
  paths (`/logos/logo-horizontal-reversed-saffron.png`,
  `/logos/logo-stacked-reversed-saffron.png`) served from the app's `public/`. The DS project
  does not carry them, so the mark is broken in the cards **and in any design the agent
  builds with those components**. Fixing it means uploading the PNGs into the project and
  widening the upload plan's `writes` — not attempted this run because whether a root-relative
  `/logos/...` resolves inside the design runtime is unverified. Worth settling next sync.
- **Preview plates are synthetic.** `ParallaxMedia`/`ScrollScale` previews use an inline SVG
  data-URI, not the repo's real photography, so the cards stay self-contained. If the real
  product images ever ship into the DS, swap them in.
- **`bunfig.toml` + `bun.lock` exist but bun is not installed** on this machine, and
  `node_modules/` was already present and healthy. No install was re-run this sync. If a
  future run needs a clean install, check which manager actually owns the tree first —
  `package-lock.json` is also present and was modified in the working tree.
- `@tailwindcss/cli` resolved to the same tailwind version as the repo (4.3.3) this run.
  If the repo's tailwind moves, re-pin the CLI to match or the compiled CSS drifts from what
  the app ships.
- Grades live in the gitignored `.design-sync/.cache/`; durable verification carries forward
  from the uploaded `_ds_sync.json`.

## Re-sync

```sh
# 1. refresh staged scripts (never run a stale .ds-sync/)
SB=<skill-base-dir>; cp -r "$SB"/*.mjs "$SB"/lib "$SB"/storybook .ds-sync/
# 2. fonts next to the compiled CSS
mkdir -p .design-sync/.cache/files
node .ds-sync/node_modules/@tailwindcss/cli/dist/index.mjs -i .design-sync/tw-entry.css -o .design-sync/.cache/ds-styles.css
grep -o "url(\./files/[^)]*)" .design-sync/.cache/ds-styles.css | sed 's|url(\./files/||;s|)||' | sort -u \
  | while read -r f; do cp "$(find node_modules/@fontsource -name "$f" -type f | head -1)" .design-sync/.cache/files/; done
# 3. the driver
export DS_CHROMIUM_PATH="C:/Program Files/Google/Chrome/Application/chrome.exe"
node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules \
  --entry ./.design-sync/entry.ts --out ./ds-bundle --remote .design-sync/.cache/remote-sync.json
```
