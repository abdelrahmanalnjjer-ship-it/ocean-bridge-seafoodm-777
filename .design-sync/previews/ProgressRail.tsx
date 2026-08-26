import { ProgressRail } from 'ocean-bridge-ui';

/* A one-pixel scroll-progress hairline in --brand-teal, positioned `fixed`
 * under the 4rem header. It takes no props and returns null entirely under
 * prefers-reduced-motion.
 *
 * `fixed` resolves against the viewport, so to show it inside a card the
 * wrapper below establishes a containing block (any transform does this) and
 * reserves the 4rem the real header occupies. In an actual page you simply
 * mount <ProgressRail /> once, next to the header — no wrapper needed. */

function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative h-40 w-full overflow-hidden border border-border bg-card"
      style={{ transform: 'translateZ(0)' }}
    >
      <div className="flex h-16 items-center border-b border-border px-6">
        <span className="label-caps">Site header</span>
      </div>
      {children}
      <div className="px-6 pt-6 text-[14px] text-muted-foreground">
        The rail scales on the X axis from the left as the page scrolls.
      </div>
    </div>
  );
}

export function UnderTheHeader() {
  return (
    <div className="max-w-2xl">
      <Stage>
        <ProgressRail />
      </Stage>
    </div>
  );
}
