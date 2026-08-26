import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
} from 'ocean-bridge-ui';

/* Radix Menubar takes `value`/`defaultValue` naming which menu is open, so the
 * open state can be shown in a still card. Leave it off in a real page. */

export function Bar() {
  return (
    <Menubar>
      <MenubarMenu value="consignment">
        <MenubarTrigger>Consignment</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu value="documents">
        <MenubarTrigger>Documents</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu value="logistics">
        <MenubarTrigger>Logistics</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}

export function OpenMenu() {
  return (
    <div className="pb-56">
      <Menubar defaultValue="documents">
        <MenubarMenu value="consignment">
          <MenubarTrigger>Consignment</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu value="documents">
          <MenubarTrigger>Documents</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Health certificate <MenubarShortcut>⌘H</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Catch certificate <MenubarShortcut>⌘C</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Packing list</MenubarItem>
            <MenubarItem>Cold-chain log</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu value="logistics">
          <MenubarTrigger>Logistics</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
