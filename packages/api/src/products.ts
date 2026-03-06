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
  category,
  limit = 6,
}: {
  featured?: boolean;
  query?: string | null;
  limit?: number;
  category?: string | null;
}): Promise<Product[]> {
  "use cache";

  cacheLife("default");

  const queryParams = new URLSearchParams();
  if (featured) {
    queryParams.set("featured", "true");
  }
  if (query) {
    queryParams.set("search", query);
  }
  if (category) {
    queryParams.set("category", category);
  }
  if (limit) {
    queryParams.set("limit", limit.toString());
  }

  const products = await getData<Product[]>(
    `/api/products?${queryParams.toString()}`
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
