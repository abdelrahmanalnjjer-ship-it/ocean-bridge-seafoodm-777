import { Alert, AlertTitle, AlertDescription } from 'ocean-bridge-ui';

export function Variants() {
  return (
    <div className="flex max-w-xl flex-col gap-5">
      <Alert>
        <AlertTitle>Consignment documented</AlertTitle>
        <AlertDescription>
          Health certification lodged and the catch certificate is validated to the origin vessel.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Field 519 missing</AlertTitle>
        <AlertDescription>
          The CIFER declaration cannot be issued until the facility registration number is supplied.
        </AlertDescription>
      </Alert>
    </div>
  );
}

export function TitleOnly() {
  return (
    <Alert className="max-w-xl">
      <AlertTitle>Offer expires in 48 hours.</AlertTitle>
    </Alert>
  );
}
