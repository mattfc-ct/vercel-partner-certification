"use client";

import { useCart } from "@repo/ui/hooks/use-cart";
import { Link } from "@repo/ui/i18n/navigation";
import type { CartItem } from "@repo/ui/lib/cart";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { useCallback } from "react";
import { toast } from "sonner";
import { useIsClient } from "usehooks-ts";
import { Button } from "../button";
import { QuantitySelector } from "../quantity-selector";

function CartItemRow({ item }: { item: CartItem }) {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const format = useFormatter();

  const quantity =
    cart?.items.find((oldItem) => oldItem.slug === item.slug)?.quantity ?? 1;

  const t = useTranslations("CartPage");

  const handleSetQuantity = useCallback(
    (newQuantity: number | ((quantity: number) => number)) => {
      const finalQuantity =
        typeof newQuantity === "function" ? newQuantity(quantity) : newQuantity;

      updateQuantity(item.slug, finalQuantity);

      toast.success(
        t("quantityUpdated", { name: item.name, quantity: finalQuantity })
      );
    },
    [updateQuantity, item.slug, quantity, item.name, t]
  );

  const handleRemoveFromCart = useCallback(() => {
    removeFromCart(item.slug);

    toast.success(t("quantityRemoved", { name: item.name }));
  }, [removeFromCart, item.slug, item.name, t]);

  return (
    <div className="border-b pb-8 lg:pb-0" key={item.slug}>
      <div className="flex flex-col items-center gap-4 lg:flex-row">
        <div className="lg:w-[200px]">
          {item.images[0] && (
            <Image
              alt={item.name}
              height={200}
              src={item.images[0]}
              width={200}
            />
          )}
        </div>
        <div className="lg:flex-1">
          <p className="font-bold text-lg">
            <Link className="hover:underline" href={`/products/${item.slug}`}>
              {item.name}
            </Link>
          </p>
          <p>
            {item.quantity} x{" "}
            {format.number(item.price, {
              style: "currency",
              currency: item.currency,
            })}
          </p>
        </div>
        <div className="lg:w-[200px]">
          <QuantitySelector
            maxQuantity={99}
            quantity={quantity}
            setQuantity={handleSetQuantity}
          />
          <Button onClick={handleRemoveFromCart} variant="link">
            {t("remove")}
          </Button>
        </div>
        <div className="lg:w-[200px]">
          {format.number(item.quantity * item.price, {
            style: "currency",
            currency: item.currency,
          })}
        </div>
      </div>
    </div>
  );
}

function CartEmpty() {
  const t = useTranslations("CartPage");

  return <div className="text-center text-gray-500 text-lg">{t("empty")}</div>;
}

function CartItems({
  items,
  amount,
  currency,
}: {
  items: CartItem[];
  amount: number;
  currency: string;
}) {
  const t = useTranslations("CartPage");
  const format = useFormatter();

  return (
    <>
      {items.map((item) => (
        <CartItemRow item={item} key={item.slug} />
      ))}
      <div className="flex justify-end py-8">
        <div className="text-lg lg:w-[200px]">
          <span className="font-bold">{t("total")} </span>
          {format.number(amount, {
            style: "currency",
            currency: currency ?? "USD",
          })}
        </div>
      </div>
    </>
  );
}

export function CartContent() {
  const {
    cart: { items },
    total: { amount, currency, quantity },
  } = useCart();

  const isClient = useIsClient();

  const t = useTranslations("CartPage");

  return (
    <div>
      <h1 className="font-bold text-4xl">{t("title")}</h1>
      {isClient && (
        <div className="mt-8">
          {quantity ? (
            <CartItems amount={amount} currency={currency} items={items} />
          ) : (
            <CartEmpty />
          )}
        </div>
      )}
    </div>
  );
}
