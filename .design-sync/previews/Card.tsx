import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge } from 'ocean-bridge-ui';

/* Card is themed by --card, which every band re-scopes — drop the same card
 * into .band-wash or .band-deep and it re-tones without any prop change.
 * Note the site itself usually writes `border border-border bg-card` by hand
 * rather than using this component. */

export function Default() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Yellowfin tuna</CardTitle>
        <CardDescription>Loins, skin-off, vacuum packed</CardDescription>
      </CardHeader>
      <CardContent className="text-[15px] text-muted-foreground">
        Landed Duqm, blast frozen at sea. Catch certificate validated to the origin vessel.
      </CardContent>
      <CardFooter className="justify-between">
        <Badge>In season</Badge>
        <span className="label-caps">HS 0304.87</span>
      </CardFooter>
    </Card>
  );
}

export function AcrossBands() {
  return (
    <div className="grid gap-0 sm:grid-cols-3">
      {[
        ['band-paper', 'Paper'],
        ['band-wash', 'Wash'],
        ['band-deep', 'Deep'],
      ].map(([band, label]) => (
        <div key={band} className={`${band} p-8`}>
          <div className="label-caps mb-4">{label}</div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Grouper</CardTitle>
              <CardDescription>Whole, gutted</CardDescription>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
