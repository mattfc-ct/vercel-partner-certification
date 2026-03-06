"use client";

import type { Product } from "@repo/api/products";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useCart } from "../hooks/use-cart";
import { Button } from "./button";
import { QuantitySelector } from "./quantity-selector";

export function AddToCart({
  maxQuantity,
  product,
}: {
  maxQuantity: number;
  product: Product;
}) {
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const t = useTranslations("AddToCart");

  const handleAddToCart = useCallback(() => {
    addToCart(product, quantity);

    toast.success(t("itemAdded", { name: product.name }));
  }, [addToCart, product, quantity, t]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <QuantitySelector
          maxQuantity={maxQuantity}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>
      <div>
        <Button onClick={handleAddToCart}>{t("buttonText")}</Button>
      </div>
    </div>
  );
}
