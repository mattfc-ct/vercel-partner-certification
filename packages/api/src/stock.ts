import { getData } from "./api";

export interface Stock {
  inStock: boolean;
  lowStock: boolean;
  productId: string;
  stock: number;
}

export async function getStock(slug: string): Promise<Stock> {
  const stock = await getData<Stock>(`/api/products/${slug}/stock`);
  return stock;
}
