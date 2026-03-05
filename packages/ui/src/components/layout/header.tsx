import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@repo/ui/components/navigation-menu";

import { TriangleIcon } from "@repo/ui/icons/triangle";

export function Header() {
  return (
    <header className="mb-4 border-b">
      <div className="flex items-center gap-4 p-4">
        <span>
          <TriangleIcon height={32} width={32} />
        </span>
        <span className="font-bold text-lg">Swag Store</span>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/">Home</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/search">Search</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center justify-center bg-black p-3 text-sm text-white">
        <span>
          Bundle & Save &mdash; Buy any hoodie + hat combo and save 10%
          automatically. Code <span className="font-bold">BUNDLE10</span>
        </span>
      </div>
    </header>
  );
}
