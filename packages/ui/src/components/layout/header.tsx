import type { Promotion } from "@repo/api/promotions";
import { PromotionBar } from "@repo/ui/components/layout/promotion-bar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@repo/ui/components/navigation-menu";
import { TriangleIcon } from "@repo/ui/icons/triangle";
import Link from "next/link";
import { Suspense } from "react";

export function Header({
  getActivePromotionPromise,
}: {
  getActivePromotionPromise: Promise<Promotion | null>;
}) {
  return (
    <header className="border-b">
      <div className="flex items-center gap-4 p-4">
        <span>
          <TriangleIcon height={32} width={32} />
        </span>
        <span className="font-bold text-lg">Swag Store</span>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/search">Search</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Suspense>
        <PromotionBar getActivePromotionPromise={getActivePromotionPromise} />
      </Suspense>
    </header>
  );
}
