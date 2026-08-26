import { ComplianceCard, REGIMES } from 'ocean-bridge-ui';

/* The unit used in the compliance grid on /about. It is a full-height card,
 * so it is previewed inside the same grid the site puts it in. */

export function Grid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {REGIMES.slice(0, 3).map((r) => (
        <ComplianceCard key={r.code} regime={r} />
      ))}
    </div>
  );
}

export function Single() {
  return (
    <div className="max-w-sm">
      <ComplianceCard regime={REGIMES[0]} />
    </div>
  );
}

export function OnWash() {
  return (
    <div className="band-wash p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        {REGIMES.slice(2, 4).map((r) => (
          <ComplianceCard key={r.code} regime={r} />
        ))}
      </div>
    </div>
  );
}
