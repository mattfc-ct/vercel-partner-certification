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
import { Spinner } from "../spinner";

export function Header() {
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
      <Suspense
        fallback={
          <div className="flex justify-center bg-black p-3 text-center text-sm text-white">
            <Spinner className="size-5" />
          </div>
        }
      >
        <PromotionBar />
      </Suspense>
    </header>
  );
}
