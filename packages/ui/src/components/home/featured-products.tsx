import { getProducts } from "@repo/api/products";
import { Link } from "@repo/ui/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Button } from "../button";
import { ProductGrid } from "../product/grid";
import { ProductGridSkeleton } from "../product/skeleton";

async function FeaturedProductsContent() {
  const featuredProducts = await getProducts({ featured: true });

  if (!featuredProducts.length) {
    return;
  }

  return <ProductGrid products={featuredProducts} />;
}

export async function FeaturedProducts() {
  const t = await getTranslations("FeaturedProducts");

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">{t("title")}</h2>
        <Button asChild variant="link">
          <Link href="/search">{t("viewAll")}</Link>
        </Button>
      </div>
      <Suspense fallback={<ProductGridSkeleton count={6} />}>
        <FeaturedProductsContent />
      </Suspense>
    </>
  );
}
