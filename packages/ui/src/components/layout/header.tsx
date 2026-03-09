import type { Promotion } from "@repo/api/promotions";
import { PromotionBar } from "@repo/ui/components/layout/promotion-bar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@repo/ui/components/navigation-menu";
import { TriangleIcon } from "@repo/ui/icons/triangle";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Spinner } from "../spinner";
import { CartButton } from "./cart-button";

export async function Header({
  getActivePromotionPromise,
  locale,
}: {
  getActivePromotionPromise: Promise<Promotion | null>;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: "Header" });

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
                  <a href="/">{t("home")}</a>
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <div>
                  <a href="/search">{t("search")}</a>
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
        <PromotionBar getActivePromotionPromise={getActivePromotionPromise} />
      </Suspense>
    </header>
  );
}
