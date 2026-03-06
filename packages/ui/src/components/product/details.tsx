import type { Product } from "@repo/api/products";
import type { Stock } from "@repo/api/stock";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { AddToCart } from "../add-to-cart";

export function ProductDetails({
  product,
  stock,
}: {
  product: Product;
  stock: Stock;
}) {
  const format = useFormatter();
  const t = useTranslations("ProductPage");

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
          {format.number(product.price, {
            style: "currency",
            currency: product.currency,
          })}
        </p>
        <div className="mt-4">
          {stock.inStock ? (
            <p className="text-green-500 text-sm">
              {t("inStock", { stock: stock.stock })}
            </p>
          ) : (
            <p className="text-red-500 text-sm">{t("outOfStock")}</p>
          )}
        </div>
        <p className="mt-4 text-gray-500 text-sm">{product.description}</p>
        <hr className="my-6" />
        {stock.inStock && (
          <AddToCart maxQuantity={stock.stock} product={product} />
        )}
      </div>
    </div>
  );
}
