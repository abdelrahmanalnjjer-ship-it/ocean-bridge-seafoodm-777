import { Stagger, StaggerItem } from 'ocean-bridge-ui';

/* Stagger is the parent; StaggerItem is the child. The parent owns the
 * sequence (`step` seconds between children) so no per-item delay has to be
 * threaded through a list. StaggerItem's own 0.75s rise is fixed. */

/* Pins the settled state for the still image — see the note in Reveal.tsx.
 * Scoped to this preview; never part of the shipped stylesheet. */
function Settled() {
  return (
    <style>{`[data-reveal], [data-reveal] > * { opacity: 1 !important; transform: none !important; }`}</style>
  );
}

export function Cards() {
  return (
    <>
      <Settled />
      <Stagger className="grid max-w-4xl gap-5 sm:grid-cols-3">
        {[
          ['GACC', 'China'],
          ['TRACES', 'European Union'],
          ['HACCP', 'United States'],
        ].map(([code, where]) => (
          <StaggerItem key={code}>
            <div className="card-lift border border-border bg-card p-7">
              <div className="font-display text-2xl leading-none text-foreground">{code}</div>
              <div className="label-caps mt-3">{where}</div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </>
  );
}

export function List() {
  return (
    <>
      <Settled />
      <Stagger className="max-w-lg" step={0.05}>
        {[
          'Facility registration verified',
          'Catch certificates validated to vessel',
          'Health certification lodged',
          'Cold chain logged end to end',
        ].map((line) => (
          <StaggerItem key={line}>
            <div className="border-b border-border py-4 text-[15px] text-muted-foreground">
              {line}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </>
  );
}
