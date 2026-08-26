import { Button } from 'ocean-bridge-ui';

/* NOTE FOR THE DESIGN AGENT: this site does not build its buttons from this
 * component. Every call to action on ocean-bridge is an <a> or <button>
 * carrying `.btn` plus `.btn-solid` / `.btn-outline` / `.btn-pill`. This
 * component is themed and works, but reach for the .btn family first. */

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button>Request a quote</Button>
      <Button variant="secondary">View catalogue</Button>
      <Button variant="outline">Download spec</Button>
      <Button variant="ghost">Cancel</Button>
      <Button variant="link">Read the trade note</Button>
      <Button variant="destructive">Withdraw offer</Button>
    </div>
  );
}

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}

export function Disabled() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button disabled>Request a quote</Button>
      <Button variant="outline" disabled>
        Download spec
      </Button>
    </div>
  );
}

export function TheSiteIdiom() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <button className="btn btn-solid">Request a quote</button>
      <button className="btn btn-outline">Download spec</button>
      <button className="btn-pill">
        Explore the catalogue
        <span className="pill-badge">→</span>
      </button>
    </div>
  );
}
