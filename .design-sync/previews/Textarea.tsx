import { Textarea, Label } from 'ocean-bridge-ui';

export function Default() {
  return (
    <div className="max-w-lg">
      <Label htmlFor="notes">Notes</Label>
      <Textarea
        id="notes"
        rows={5}
        className="mt-3"
        placeholder="Destination port, target volume, packing preference."
      />
    </div>
  );
}

export function Filled() {
  return (
    <div className="max-w-lg">
      <Textarea
        rows={5}
        defaultValue={
          'Two 40ft reefers per month into Vigo. Yellowfin loins, skin-off, vacuum packed.\nNeed the catch certificate lodged before departure.'
        }
      />
    </div>
  );
}
