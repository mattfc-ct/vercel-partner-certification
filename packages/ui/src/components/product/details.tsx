import type { Product } from "@repo/api/products";
import { getStock } from "@repo/api/stock";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { Suspense } from "react";
import { AddToCart } from "../add-to-cart";
import { Skeleton } from "../skeleton";

async function ProductStock({ product }: { product: Product }) {
  const t = useTranslations("ProductPage");

  const stock = await getStock(product.slug);

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

function ProductStockSkeleton() {
  return (
    <>
      <div className="mt-4">
        <Skeleton className="h-[20px] w-[150px]" />
      </div>
      <hr className="my-6" />
      <div className="flex flex-col gap-6">
        <Skeleton className="h-[36px] w-[200px]" />
        <Skeleton className="h-[36px] w-[100px]" />
      </div>
    </>
  );
}

export function ProductDetails({ product }: { product: Product }) {
  const format = useFormatter();

  return (
    <div className="flex flex-col items-center gap-8 md:flex-row">
      <div className="md:w-1/3">
        {product.images[0] && (
          <Image
            alt={product.name}
            className="aspect-square w-full object-cover"
            fetchPriority="high"
            height={400}
            preload
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
        <p className="mt-4 text-gray-500 text-sm">{product.description}</p>
        <Suspense fallback={<ProductStockSkeleton />}>
          <ProductStock product={product} />
        </Suspense>
      </div>
    </div>
  );
}
