import { AspectRatio } from 'ocean-bridge-ui';

/* AspectRatio paints nothing itself — it only constrains its child's box. The
 * cells below give it a visible child so the constraint can be seen. */

export function Ratios() {
  return (
    <div className="grid max-w-3xl gap-6 sm:grid-cols-3">
      {[
        [16 / 9, '16 / 9'],
        [4 / 3, '4 / 3'],
        [1, '1 / 1'],
      ].map(([ratio, label]) => (
        <div key={label as string}>
          <AspectRatio ratio={ratio as number}>
            <div className="flex h-full w-full items-center justify-center border border-border bg-card">
              <span className="label-caps">{label as string}</span>
            </div>
          </AspectRatio>
        </div>
      ))}
    </div>
  );
}

export function HoldingMedia() {
  return (
    <div className="max-w-lg">
      <AspectRatio ratio={21 / 9}>
        <div className="media-frame flex h-full w-full items-end bg-card p-6">
          <div>
            <div className="label-caps">Duqm</div>
            <div className="mt-2 font-display text-2xl leading-none text-foreground">
              Landed this morning
            </div>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
}
