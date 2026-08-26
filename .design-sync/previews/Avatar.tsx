import { Avatar, AvatarFallback } from 'ocean-bridge-ui';

/* AvatarImage is omitted here on purpose: the preview must not reach for an
 * external URL. In a page, wrap <AvatarImage src=... /> above the fallback and
 * the fallback shows only while the image is loading or missing. */

export function Fallbacks() {
  return (
    <div className="flex items-center gap-5">
      {['OB', 'AM', 'RS', 'KH'].map((initials) => (
        <Avatar key={initials}>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}

export function WithName() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarFallback>OB</AvatarFallback>
      </Avatar>
      <div>
        <div className="text-[15px] text-foreground">Trade desk</div>
        <div className="label-caps mt-1">Muscat</div>
      </div>
    </div>
  );
}
