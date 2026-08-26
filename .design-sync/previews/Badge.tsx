import { Badge } from 'ocean-bridge-ui';

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>In season</Badge>
      <Badge variant="secondary">Frozen at sea</Badge>
      <Badge variant="outline">HS 0304.87</Badge>
      <Badge variant="destructive">Closed season</Badge>
    </div>
  );
}

export function InContext() {
  return (
    <div className="max-w-md border border-border bg-card p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="font-display text-2xl leading-none text-foreground">Kingfish</div>
        <Badge>In season</Badge>
      </div>
      <p className="mt-4 text-[14px] leading-[1.65] text-fg-subtle">
        Landed Masirah. Available whole or in steaks.
      </p>
    </div>
  );
}
