import { getProducts } from "@repo/api/products";
import { cacheLife } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  "use cache";

  cacheLife("default");

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  const products = await getProducts({ query, limit: 5 });

  return NextResponse.json(products);
}
