import { Input, Label } from 'ocean-bridge-ui';

/* The site's own contact form styles a bare <input> with border-border /
 * bg-background/40 rather than using this component — see the conventions
 * header. This component is themed and works if you prefer it. */

export function Fields() {
  return (
    <div className="flex max-w-md flex-col gap-6">
      <div>
        <Label htmlFor="company">Company</Label>
        <Input id="company" className="mt-3" placeholder="Rotterdam Seafood BV" />
      </div>
      <div>
        <Label htmlFor="volume">Indicative volume</Label>
        <Input id="volume" className="mt-3" placeholder="2 x 40ft reefer / month" />
      </div>
    </div>
  );
}

export function States() {
  return (
    <div className="flex max-w-md flex-col gap-5">
      <Input placeholder="Empty" />
      <Input defaultValue="Yellowfin loins, skin-off" />
      <Input disabled placeholder="Disabled" />
    </div>
  );
}
