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
  limit = 6,
}: {
  featured: boolean;
  limit?: number;
}): Promise<Product[]> {
  const products = await getData<Product[]>(
    `/api/products?featured=${featured}&limit=${limit}`
  );
  return products;
}
