import { PromotionBar } from "@repo/ui/components/layout/promotion-bar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@repo/ui/components/navigation-menu";
import { Link } from "@repo/ui/i18n/navigation";
import { TriangleIcon } from "@repo/ui/icons/triangle";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { Spinner } from "../spinner";
import { CartButton } from "./cart-button";

export function Header() {
  const t = useTranslations("Header");

  return (
    <header className="border-b">
      <div className="flex items-center gap-4 p-4">
        <span>
          <TriangleIcon height={32} width={32} />
        </span>
        <span className="font-bold text-lg">{t("title")}</span>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <div>
                  <Link href="/">{t("home")}</Link>
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <div>
                  <Link href="/search">{t("search")}</Link>
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <CartButton />
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
