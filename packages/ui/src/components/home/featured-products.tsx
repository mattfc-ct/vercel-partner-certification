import { getProducts } from "@repo/api/products";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "../button";

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    price
  );
}

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
            <Link href={`/products/${product.slug}`}>
              {product.images[0] && (
                <Image
                  alt={product.name}
                  className="aspect-square w-full object-cover"
                  height={400}
                  src={product.images[0]}
                  width={400}
                />
              )}
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-gray-500 text-sm">
                {formatPrice(product.price, product.currency)}
              </p>
            </Link>
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
