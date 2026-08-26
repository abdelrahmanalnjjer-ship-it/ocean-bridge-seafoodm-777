import { ScrollScale } from 'ocean-bridge-ui';

/* Eases its child from `from` scale down to true size as it enters, so a
 * photograph reads as settling rather than sliding. The wrapper clips, so the
 * oversized start never spills. */

const PLATE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
       <defs><linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
         <stop offset="0" stop-color="#080705"/><stop offset="0.5" stop-color="#201B15"/>
         <stop offset="1" stop-color="#26211A"/></linearGradient></defs>
       <rect width="800" height="600" fill="url(#g)"/>
       <circle cx="300" cy="330" r="110" fill="#C4653F" opacity="0.14"/>
       <circle cx="560" cy="200" r="76" fill="#D9A05B" opacity="0.16"/>
     </svg>`,
  );

export function Photograph() {
  return (
    <div className="max-w-2xl">
      <ScrollScale className="aspect-[16/9]">
        <img src={PLATE} alt="Settling plate" className="h-full w-full object-cover" />
      </ScrollScale>
    </div>
  );
}

export function OnAPanel() {
  return (
    <div className="max-w-xl">
      <ScrollScale from={1.25} className="aspect-[4/3] border border-border">
        <div className="flex h-full w-full flex-col justify-end bg-card p-8">
          <div className="label-caps">Grouper</div>
          <div className="mt-3 font-display text-3xl leading-none text-foreground">
            Landed Duqm
          </div>
        </div>
      </ScrollScale>
    </div>
  );
}
