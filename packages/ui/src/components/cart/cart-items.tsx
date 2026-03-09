import { useCart } from "@repo/ui/hooks/use-cart";
import type { CartItem } from "@repo/ui/lib/cart";
import Image from "next/image";
import Link from "next/link";
import { useFormatter, useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "../button";
import { QuantitySelector } from "../quantity-selector";

function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useCart();
  const format = useFormatter();
  const t = useTranslations("CartPage");

  const { quantity } = item;

  const handleSetQuantity = (
    newQuantity: number | ((quantity: number) => number)
  ) => {
    const finalQuantity =
      typeof newQuantity === "function" ? newQuantity(quantity) : newQuantity;

    updateQuantity(item.slug, finalQuantity);

    toast.success(
      t("quantityUpdated", { name: item.name, quantity: finalQuantity })
    );
  };

  const handleRemoveFromCart = () => {
    removeFromCart(item.slug);

    toast.success(t("quantityRemoved", { name: item.name }));
  };

  return (
    <li className="border-b pb-8 lg:pb-0">
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
            // Max quantity cannot be determined as it is dependent on the product call. To avoid excessive time spent rendering
            // the cart, we decided to not call the product endpoint here. So we default to 99.
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
    </li>
  );
}

export function CartItems({ items }: { items: CartItem[] }) {
  return (
    <ul>
      {items.map((item) => (
        <CartItemRow item={item} key={item.slug} />
      ))}
    </ul>
  );
}
