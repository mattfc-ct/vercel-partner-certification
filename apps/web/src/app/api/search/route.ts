import { getProducts } from "@repo/api/products";
import { cacheLife } from "next/cache";
import { NextResponse } from "next/server";

async function getSearchResults(query: string | null) {
  "use cache";

  cacheLife("default");

  const products = await getProducts({ query, limit: 5 });
  return products;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  const products = await getSearchResults(query);

  return NextResponse.json(products);
}
