import { Checkbox, Label } from 'ocean-bridge-ui';

export function States() {
  return (
    <div className="flex flex-col gap-5">
      {[
        ['unchecked', false, false],
        ['checked', true, false],
        ['disabled', false, true],
      ].map(([id, checked, disabled]) => (
        <div key={id as string} className="flex items-center gap-3">
          <Checkbox
            id={id as string}
            defaultChecked={checked as boolean}
            disabled={disabled as boolean}
          />
          <Label htmlFor={id as string}>Include cold-chain log ({id as string})</Label>
        </div>
      ))}
    </div>
  );
}

export function Group() {
  return (
    <div className="flex max-w-sm flex-col gap-4">
      <div className="label-caps mb-1">Documents required</div>
      {['Health certificate', 'Catch certificate', 'Cold-chain log', 'Packing list'].map((d, i) => (
        <div key={d} className="flex items-center gap-3">
          <Checkbox id={`doc-${i}`} defaultChecked={i < 2} />
          <Label htmlFor={`doc-${i}`}>{d}</Label>
        </div>
      ))}
    </div>
  );
}
