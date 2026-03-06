import type { Product } from "@repo/api/products";
import { Link } from "@repo/ui/i18n/navigation";
import Image from "next/image";
import { useFormatter } from "next-intl";

export function ProductCard({ product }: { product: Product }) {
  const format = useFormatter();

  return (
    <Link className="flex flex-col gap-4" href={`/products/${product.slug}`}>
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
        {format.number(product.price, {
          style: "currency",
          currency: product.currency,
        })}
      </p>
    </Link>
  );
}
