import { Toggle } from 'ocean-bridge-ui';

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Toggle>Default</Toggle>
      <Toggle defaultPressed>Pressed</Toggle>
      <Toggle variant="outline">Outline</Toggle>
      <Toggle variant="outline" defaultPressed>
        Outline pressed
      </Toggle>
      <Toggle disabled>Disabled</Toggle>
    </div>
  );
}

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Toggle size="sm" variant="outline">Small</Toggle>
      <Toggle size="default" variant="outline">Default</Toggle>
      <Toggle size="lg" variant="outline">Large</Toggle>
    </div>
  );
}
