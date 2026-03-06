"use client";

import { useCart } from "@repo/ui/hooks/use-cart";
import { Link } from "@repo/ui/i18n/navigation";
import { ShoppingCartIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useIsClient } from "usehooks-ts";
import { Badge } from "../badge";
import { Button } from "../button";

export function CartButton() {
  const {
    total: { quantity },
  } = useCart();

  const isClient = useIsClient();

  const t = useTranslations("Header");

  return isClient && quantity ? (
    <Button asChild className="ml-auto" variant="link">
      <Link href="/cart">
        <ShoppingCartIcon aria-label={t("cartButton")} className="size-6" />
        <Badge>{quantity}</Badge>
      </Link>
    </Button>
  ) : null;
}
