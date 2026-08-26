import { Reveal } from 'ocean-bridge-ui';

/* Reveal fades and rises its children once, when they scroll into view.
 * `as` picks the rendered tag; `delay` staggers a group by hand when Stagger
 * would be overkill. Under prefers-reduced-motion it renders plain markup. */

/* WHY THIS CELL PINS THE SETTLED STATE.
 *
 * The capture harness screenshots at `networkidle`, but a scroll-triggered
 * entrance does not begin until the IntersectionObserver callback lands
 * (~700ms later) — so an unmodified card photographs the PRE-reveal state,
 * which is opacity 0, i.e. blank.
 *
 * A still image cannot show a transition in any case, so each cell pins the
 * SETTLED state — the true end state of the real animation, on the real
 * component. Scoped to this preview: it never enters the shipped stylesheet. */
function Settled() {
  return (
    <style>{`[data-reveal], [data-reveal] > * { opacity: 1 !important; transform: none !important; }`}</style>
  );
}

export function Default() {
  return (
    <>
      <Settled />
      <Reveal>
        <div className="max-w-xl">
          <div className="eyebrow mb-5">Trade desk</div>
          <h2 className="h-display h-display-md">Oman&rsquo;s catch, cleared for arrival.</h2>
          <p className="lede mt-5">
            Documentation prepared and checked before the offer is issued, so the consignment
            moves the day it lands.
          </p>
        </div>
      </Reveal>
    </>
  );
}

export function Delayed() {
  return (
    <>
      <Settled />
      <div className="grid max-w-3xl gap-6 sm:grid-cols-3">
        {['Sourcing', 'Clearance', 'Delivery'].map((label, i) => (
          <Reveal key={label} delay={i * 0.12}>
            <div className="border border-border bg-card p-6">
              <div className="label-caps">Step {i + 1}</div>
              <div className="mt-3 font-display text-2xl leading-none text-foreground">{label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}

export function AsSection() {
  return (
    <>
      <Settled />
      <Reveal as="section" y={40} duration={1}>
        <div className="border-t border-border pt-8">
          <div className="label-caps">Rendered as a section element</div>
          <p className="lede mt-4 max-w-lg">
            A larger rise and a slower curve, for a full band rather than a card.
          </p>
        </div>
      </Reveal>
    </>
  );
}
