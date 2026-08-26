import { Progress } from 'ocean-bridge-ui';

/* The indicator is translated by (100 - value)%, so `value` is a plain 0-100
 * number. The track uses --track; the fill uses --primary. */

export function Steps() {
  return (
    <div className="flex max-w-lg flex-col gap-8">
      {[
        [25, 'Sourcing'],
        [60, 'Documentation'],
        [100, 'Cleared'],
      ].map(([v, label]) => (
        <div key={label as string}>
          <div className="mb-3 flex items-baseline justify-between">
            <span className="label-caps">{label}</span>
            <span className="num text-[14px] text-muted-foreground">{v}%</span>
          </div>
          <Progress value={v as number} />
        </div>
      ))}
    </div>
  );
}
