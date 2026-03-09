import { getProducts } from "@repo/api/products";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Button } from "../button";
import { ProductGrid } from "../product/grid";
import { ProductGridSkeleton } from "../product/skeleton";

const FEATURED_PRODUCTS_COUNT = 6;

async function FeaturedProductsContent() {
  const products = await getProducts({
    featured: true,
    limit: FEATURED_PRODUCTS_COUNT,
  });

  const t = await getTranslations("HomePage");

  if (products.length === 0) {
    return (
      <div className="mt-6 text-center text-lg text-muted-foreground">
        {t("noFeaturedProducts")}
      </div>
    );
  }

  return <ProductGrid products={products} />;
}

export function FeaturedProducts({
  title,
  viewAll,
}: {
  title: string;
  viewAll?: string | undefined;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">{title}</h2>
        <Button asChild variant="link">
          <a href="/search">{viewAll}</a>
        </Button>
      </div>
      <Suspense
        fallback={<ProductGridSkeleton count={FEATURED_PRODUCTS_COUNT} />}
      >
        <FeaturedProductsContent />
      </Suspense>
    </div>
  );
}
