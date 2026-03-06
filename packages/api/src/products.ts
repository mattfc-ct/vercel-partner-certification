import { cacheLife } from "next/cache";
import { getData } from "./api";

export interface Product {
  createdAt: string;
  currency: string;
  description: string;
  featured: boolean;
  id: string;
  images: string[];
  name: string;
  price: number;
  slug: string;
  tags: string[];
}

export async function getProducts({
  featured,
  query,
  limit = 6,
}: {
  featured?: boolean;
  query?: string | null;
  limit?: number;
}): Promise<Product[]> {
  "use cache";

  cacheLife("default");

  const products = await getData<Product[]>(
    `/api/products?${featured ? "featured=true&" : ""}limit=${limit}${query ? `&search=${query}` : ""}`
  );
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  "use cache";

  cacheLife("default");

  if (slug === "dummy") {
    return null;
  }

  const product = await getData<Product>(`/api/products/${slug}`);
  return product;
}
