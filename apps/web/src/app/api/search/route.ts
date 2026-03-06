import { getProducts } from "@repo/api/products";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");
  const category = searchParams.get("category");

  const products = await getProducts({ query, category, limit: 5 });

  return NextResponse.json(products);
}
