import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, Button } from 'ocean-bridge-ui';

/* Tooltip throws outside TooltipProvider, so every cell composes the full
 * parent — that is the only render that is true anyway. `open` is forced so
 * the content is in the DOM for a still capture; in a page you leave it
 * uncontrolled and it opens on hover or focus. */

export function Open() {
  return (
    <TooltipProvider>
      <div className="flex justify-center pt-24">
        <Tooltip open>
          <TooltipTrigger asChild>
            <Button variant="outline">HS 0304.87</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Frozen fillets, tuna</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export function Closed() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover for the tariff line</Button>
        </TooltipTrigger>
        <TooltipContent>Frozen fillets, tuna</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
