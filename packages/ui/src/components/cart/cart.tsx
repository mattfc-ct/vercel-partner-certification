"use client";

import { useCart } from "@repo/ui/hooks/use-cart";
import { useTranslations } from "next-intl";
import { useIsClient } from "usehooks-ts";
import { CartItems } from "./cart-items";
import { CartEmpty } from "./empty";
import { CartTotal } from "./total";

export function Cart() {
  const {
    cart: { items },
    total: { amount, currency, quantity },
  } = useCart();
  const t = useTranslations("CartPage");

  const isClient = useIsClient();

  return (
    <div>
      <h1 className="font-bold text-4xl">{t("title")}</h1>
      {isClient && (
        <div className="mt-8">
          {quantity ? (
            <>
              <CartItems items={items} />
              <CartTotal amount={amount} currency={currency} />
            </>
          ) : (
            <CartEmpty />
          )}
        </div>
      )}
    </div>
  );
}
