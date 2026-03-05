import type { Product } from "@repo/api/products";
import { formatPrice } from "@repo/ui/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  return (
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
  );
}
