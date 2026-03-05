import { getProducts } from "@repo/api/products";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "../button";
import { ProductCard } from "../product/card";

async function FeaturedProductsContent() {
  const featuredProducts = await getProducts({ featured: true });

  if (!featuredProducts.length) {
    return;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Featured Products</h2>
        <Button asChild variant="link">
          <Link href="/search">View All</Link>
        </Button>
      </div>
      <ul className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {featuredProducts.map((product) => (
          <li className="hover:underline" key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </>
  );
}

export function FeaturedProducts() {
  return (
    <Suspense>
      <FeaturedProductsContent />
    </Suspense>
  );
}
