"use client";

import { useCart } from "@repo/ui/hooks/use-cart";
import Link from "next/link";
import { useIsClient } from "usehooks-ts";
import { Badge } from "../badge";
import { Button } from "../button";
export function CartButton() {
  const {
    total: { quantity },
  } = useCart();

  const isClient = useIsClient();

  return isClient && quantity ? (
    <Button asChild className="ml-auto" variant="link">
      <Link href="/cart">
        Cart
        <Badge>{quantity}</Badge>
      </Link>
    </Button>
  ) : null;
}
