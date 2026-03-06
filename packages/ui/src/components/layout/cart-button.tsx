"use client";

import { useCart } from "@repo/ui/hooks/use-cart";
import { Link } from "@repo/ui/i18n/navigation";
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
        {t("cartButton")}
        <Badge>{quantity}</Badge>
      </Link>
    </Button>
  ) : null;
}
