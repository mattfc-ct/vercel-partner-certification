import { cacheLife } from "next/cache";
import { getData } from "./api";

export interface Category {
  name: string;
  productCount: number;
  slug: string;
}

export async function getCategories(): Promise<Category[]> {
  "use cache";

  cacheLife("default");

  const categories = await getData<Category[]>("/api/categories");
  return categories;
}
