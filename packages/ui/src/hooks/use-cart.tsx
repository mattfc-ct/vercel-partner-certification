import type { Product } from "@repo/api/products";
import { useLocalStorage } from "usehooks-ts";
import type { Cart } from "../lib/cart";

export function useCart() {
  const [cart, setCart] = useLocalStorage<Cart>("cart", { items: [] });

  const updateCart = (updateFn: (cart: Cart) => Cart) => {
    const newCart = updateFn(cart);

    setCart(newCart);
  };

  const addToCart = (product: Product, quantity: number) => {
    updateCart((cart) => {
      const existingItem = cart.items.find(
        (item) => item.slug === product.slug
      );
      if (existingItem) {
        return {
          ...cart,
          items: cart.items.map((item) =>
            item.slug === product.slug
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        ...cart,
        items: [
          ...cart.items,
          {
            currency: product.currency,
            images: product.images,
            name: product.name,
            price: product.price,
            quantity,
            slug: product.slug,
          },
        ],
      };
    });
  };

  const updateQuantity = (slug: string, quantity: number) => {
    updateCart((cart) => {
      return {
        ...cart,
        items: cart.items.map((item) =>
          item.slug === slug ? { ...item, quantity } : item
        ),
      };
    });
  };

  const removeFromCart = (slug: string) => {
    updateCart((cart) => {
      return {
        ...cart,
        items: cart.items.filter((item) => item.slug !== slug),
      };
    });
  };

  const total = cart.items.length
    ? {
        currency: cart.items[0]?.currency ?? "USD",
        amount: cart.items.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        ),
        quantity: cart.items.reduce((acc, item) => acc + item.quantity, 0),
      }
    : { currency: "USD", amount: 0, quantity: 0 };

  return { addToCart, cart, removeFromCart, total, updateQuantity };
}
