import type { Product } from "@repo/api/products";
import type { Stock } from "@repo/api/stock";
import { getStock } from "@repo/api/stock";
import { getTranslations } from "next-intl/server";
import { AddToCart } from "../add-to-cart";
import { StockError } from "./stock-error";

export async function ProductStock({ product }: { product: Product }) {
  const t = await getTranslations("ProductPage");

  let stock: Stock | undefined;

  try {
    stock = await getStock(product.slug);
  } catch (error) {
    console.error("Error getting stock", error);

    return <StockError />;
  }

  return (
    <>
      <div className="mt-4">
        {stock.inStock ? (
          <p className="text-green-500 text-sm">
            {t("inStock", { stock: stock.stock })}
          </p>
        ) : (
          <p className="text-red-500 text-sm">{t("outOfStock")}</p>
        )}
      </div>
      <hr className="my-6" />
      {stock.inStock && (
        <AddToCart maxQuantity={stock.stock} product={product} />
      )}
    </>
  );
}
