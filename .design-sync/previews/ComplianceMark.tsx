import { ComplianceMark, REGIMES } from 'ocean-bridge-ui';

/* The marks are drawn in currentColor, so they take the surrounding text
 * colour. On this site they are always set in --brand-teal, which resolves
 * to saffron. */

export function AllRegimes() {
  return (
    <div className="flex flex-wrap items-center gap-10 text-[color:var(--brand-teal)]">
      {REGIMES.map((r) => (
        <ComplianceMark key={r.code} regime={r} size={88} />
      ))}
    </div>
  );
}

export function Sizes() {
  return (
    <div className="flex items-end gap-10 text-[color:var(--brand-teal)]">
      {[64, 88, 120].map((size) => (
        <div key={size} className="flex flex-col items-center gap-3">
          <ComplianceMark regime={REGIMES[0]} size={size} />
          <span className="label-caps">{size}px</span>
        </div>
      ))}
    </div>
  );
}

export function OnCard() {
  return (
    <div className="flex gap-6">
      {REGIMES.slice(0, 2).map((r) => (
        <div key={r.code} className="border border-border bg-card p-7">
          <div className="text-[color:var(--brand-teal)]">
            <ComplianceMark regime={r} size={72} />
          </div>
          <div className="mt-6 font-display text-2xl leading-none text-foreground">{r.code}</div>
          <div className="label-caps mt-3">{r.jurisdiction}</div>
        </div>
      ))}
    </div>
  );
}
