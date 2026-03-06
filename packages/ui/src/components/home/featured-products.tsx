import { getProducts } from "@repo/api/products";
import { Link } from "@repo/ui/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Button } from "../button";
import { ProductCard } from "../product/card";
import { Spinner } from "../spinner";

async function FeaturedProductsContent() {
  const featuredProducts = await getProducts({ featured: true });

  if (!featuredProducts.length) {
    return;
  }

  return (
    <ul className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      {featuredProducts.map((product) => (
        <li className="hover:underline" key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
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
      <Suspense
        fallback={
          <div className="flex justify-center">
            <Spinner className="size-16" />
          </div>
        }
      >
        <FeaturedProductsContent />
      </Suspense>
    </>
  );
}
