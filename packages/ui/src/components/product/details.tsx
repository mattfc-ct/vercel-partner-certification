import { getProductBySlug } from "@repo/api/products";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getFormatter } from "next-intl/server";
import { Suspense } from "react";
import { ProductStock } from "./stock";
import { ProductStockSkeleton } from "./stock-skeleton";

export async function ProductDetails({ slug }: { slug: string }) {
  const format = await getFormatter();

  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center gap-8 md:flex-row">
      <div className="md:w-1/3">
        {product.images[0] && (
          <Image
            alt={product.name}
            className="aspect-square w-full object-cover"
            fetchPriority="high"
            height={400}
            loading="eager"
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
