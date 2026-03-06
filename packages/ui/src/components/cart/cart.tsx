"use client";

import { useCart } from "@repo/ui/hooks/use-cart";
import type { CartItem } from "@repo/ui/lib/cart";
import { formatPrice } from "@repo/ui/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { useIsClient } from "usehooks-ts";
import { Button } from "../button";
import { QuantitySelector } from "../quantity-selector";

function CartItemRow({ item }: { item: CartItem }) {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const quantity =
    cart?.items.find((oldItem) => oldItem.slug === item.slug)?.quantity ?? 1;

  const handleSetQuantity = useCallback(
    (newQuantity: number | ((quantity: number) => number)) => {
      const finalQuantity =
        typeof newQuantity === "function" ? newQuantity(quantity) : newQuantity;

      updateQuantity(item.slug, finalQuantity);
    },
    [updateQuantity, item.slug, quantity]
  );

  const handleRemoveFromCart = useCallback(() => {
    removeFromCart(item.slug);
  }, [removeFromCart, item.slug]);

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
            {item.quantity} x {formatPrice(item.price, item.currency)}
          </p>
        </div>
        <div className="lg:w-[200px]">
          <QuantitySelector
            maxQuantity={99}
            quantity={quantity}
            setQuantity={handleSetQuantity}
          />
          <Button onClick={handleRemoveFromCart} variant="link">
            Remove
          </Button>
        </div>
        <div className="lg:w-[200px]">
          {formatPrice(item.quantity * item.price, item.currency)}
        </div>
      </div>
    </div>
  );
}

export function CartContent() {
  const {
    cart,
    total: { amount, currency },
  } = useCart();

  const isClient = useIsClient();

  return (
    <div>
      <h1 className="font-bold text-4xl">Cart</h1>
      {cart && isClient && (
        <>
          {cart?.items.map((item) => (
            <CartItemRow item={item} key={item.slug} />
          ))}
          <div className="flex justify-end py-8">
            <div className="text-lg lg:w-[200px]">
              <span className="font-bold">Total:</span>
              {formatPrice(amount, currency)}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
