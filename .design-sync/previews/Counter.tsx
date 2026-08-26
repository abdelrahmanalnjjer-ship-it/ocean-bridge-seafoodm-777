import { Counter } from 'ocean-bridge-ui';

/* Counts up once when scrolled in from off-screen — but always renders the
 * real value first, so server HTML and crawlers never see a zero. */

export function StatStrip() {
  return (
    <div className="grid max-w-3xl gap-10 sm:grid-cols-3">
      {[
        { value: 34, suffix: '', label: 'Species in the catalogue' },
        { value: 8, suffix: '', label: 'Regimes cleared' },
        { value: 96, suffix: '%', label: 'Documents lodged pre-arrival' },
      ].map((s) => (
        <div key={s.label}>
          <div className="num font-display text-5xl leading-none text-foreground">
            <Counter value={s.value} suffix={s.suffix} />
          </div>
          <div className="label-caps mt-4">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export function WithAffixes() {
  return (
    <div className="flex flex-wrap items-end gap-12">
      <div className="num font-display text-4xl text-foreground">
        <Counter value={1250} prefix="$" suffix="/t" />
      </div>
      <div className="num font-display text-4xl text-foreground">
        <Counter value={72} suffix=" hrs" />
      </div>
    </div>
  );
}
