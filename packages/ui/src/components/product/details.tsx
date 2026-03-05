import type { Product } from "@repo/api/products";
import type { Stock } from "@repo/api/stock";
import { formatPrice } from "@repo/ui/lib/utils";
import Image from "next/image";
import { AddToCart } from "./add-to-cart";

export function ProductDetails({
  product,
  stock,
}: {
  product: Product;
  stock: Stock;
}) {
  return (
    <div className="flex flex-col items-center gap-8 md:flex-row">
      <div className="md:w-1/3">
        {product.images[0] && (
          <Image
            alt={product.name}
            className="aspect-square w-full object-cover"
            height={400}
            src={product.images[0]}
            width={400}
          />
        )}
      </div>
      <div className="md:w-2/3">
        <h1 className="font-bold text-2xl">{product.name}</h1>
        <p className="mt-2 text-gray-500 text-sm">
          {formatPrice(product.price, product.currency)}
        </p>
        <div className="mt-4">
          {stock.inStock ? (
            <p className="text-green-500 text-sm">
              In Stock - {stock.stock} remaining
            </p>
          ) : (
            <p className="text-red-500 text-sm">Out of Stock</p>
          )}
        </div>
        <p className="mt-4 text-gray-500 text-sm">{product.description}</p>
        <hr className="my-6" />
        {stock.inStock && <AddToCart maxQuantity={stock.stock} />}
      </div>
    </div>
  );
}
