import { ParallaxMedia } from 'ocean-bridge-ui';

/* ParallaxMedia drifts the image slower than the page inside a fixed `.media`
 * frame, oversizing the inner element by strength*2 so no edge is ever
 * exposed. The site feeds it full-bleed photography from /public; these cells
 * stand in a self-contained SVG plate so the card has no external request. */

const PLATE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
       <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
         <stop offset="0" stop-color="#26211A"/><stop offset="0.55" stop-color="#16130F"/>
         <stop offset="1" stop-color="#080705"/></linearGradient></defs>
       <rect width="800" height="600" fill="url(#g)"/>
       <circle cx="250" cy="240" r="86" fill="#C9B49A" opacity="0.16"/>
       <circle cx="520" cy="380" r="130" fill="#9DB05C" opacity="0.10"/>
       <circle cx="620" cy="170" r="54" fill="#D9A05B" opacity="0.18"/>
     </svg>`,
  );

export function Frame() {
  return (
    <div className="max-w-2xl">
      <ParallaxMedia src={PLATE} alt="Catch on slate" className="aspect-[16/9]" />
    </div>
  );
}

export function StrongDrift() {
  return (
    <div className="max-w-2xl">
      <ParallaxMedia
        src={PLATE}
        alt="Catch on slate, stronger drift"
        strength={24}
        className="aspect-[21/9]"
      />
    </div>
  );
}

export function InAMediaFrame() {
  return (
    <div className="media-frame max-w-xl">
      <ParallaxMedia src={PLATE} alt="Framed plate" priority className="aspect-square" />
    </div>
  );
}
