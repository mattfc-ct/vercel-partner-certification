import { getProductBySlug } from "@repo/api/products";
import { getStock } from "@repo/api/stock";
import { ProductDetails } from "@repo/ui/components/product/details";
import { Spinner } from "@repo/ui/components/spinner";
import { Suspense } from "react";

async function ProductPageContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [product, stock] = await Promise.all([
    getProductBySlug(slug),
    getStock(slug),
  ]);

  return <ProductDetails product={product} stock={stock} />;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center">
          <Spinner className="size-16" />
        </div>
      }
    >
      <ProductPageContent params={params} />
    </Suspense>
  );
}
