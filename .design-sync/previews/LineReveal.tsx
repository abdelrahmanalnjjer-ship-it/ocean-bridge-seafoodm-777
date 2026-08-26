import { LineReveal } from 'ocean-bridge-ui';

/* Pass one string per line — each gets its own overflow mask, which is what
 * keeps descenders from being clipped on every line but the last. `immediate`
 * animates on mount instead of on scroll, for above-the-fold headings. */

/* Pins the settled state for the still image — see the note in Reveal.tsx.
 * LineReveal nests the animated span inside a per-line overflow mask
 * (.reveal-line), so the selector must reach every descendant, not just the
 * direct children: mid-stagger the last line is still translated and the mask
 * clips its descenders. Scoped to this preview, never the shipped stylesheet. */
function Settled() {
  return (
    <style>{`[data-reveal], [data-reveal] * { opacity: 1 !important; transform: none !important; }`}</style>
  );
}

export function Headline() {
  return (
    <>
      <Settled />
      <h1 className="h-display h-display-xl max-w-[15ch]">
        <LineReveal immediate lines={["Oman's catch,", 'cleared for arrival.']} />
      </h1>
    </>
  );
}

export function ThreeLines() {
  return (
    <>
      <Settled />
      <h2 className="h-display h-display-lg max-w-[18ch]">
        <LineReveal
          immediate
          lines={['Sourced at the quay,', 'documented before it', 'leaves the country.']}
        />
      </h2>
    </>
  );
}

export function Statement() {
  return (
    <>
      <Settled />
      <p className="h-statement max-w-[20ch]">
        <LineReveal immediate lines={['An asset-light', 'intermediary.']} />
      </p>
    </>
  );
}
