import type { Product } from "@repo/api/products";
import { ProductCard } from "./card";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li className="hover:underline" key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
