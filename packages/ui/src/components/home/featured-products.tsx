import type { Product } from "@repo/api/products";
import { Suspense, use } from "react";
import { Button } from "../button";
import { ProductGrid } from "../product/grid";
import { ProductGridSkeleton } from "../product/skeleton";

function FeaturedProductsContent({
  getProductsPromise,
}: {
  getProductsPromise: Promise<Product[]>;
}) {
  const products = use(getProductsPromise);

  return <ProductGrid products={products} />;
}

export function FeaturedProducts({
  getProductsPromise,
  title,
  viewAll,
  count = 6,
}: {
  getProductsPromise: Promise<Product[]>;
  title: string;
  viewAll?: string | undefined;
  count?: number;
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">{title}</h2>
        <Button asChild variant="link">
          <a href="/search">{viewAll}</a>
        </Button>
      </div>
      <Suspense fallback={<ProductGridSkeleton count={count} />}>
        <FeaturedProductsContent getProductsPromise={getProductsPromise} />
      </Suspense>
    </>
  );
}
