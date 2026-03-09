import { getProducts } from "@repo/api/products";
import { NextResponse } from "next/server";

// biome-ignore lint/performance/noNamespaceImport: This is actually the correct way to import zod
import * as z from "zod";

export const MAX_LIMIT = 5;

const schema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  limit: z.coerce.number().min(1).max(MAX_LIMIT).optional().default(5),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const { success, data, error } = schema.safeParse(
    Object.fromEntries(searchParams)
  );

  if (!success) {
    console.error(error);

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { query, category, limit } = data;

  const products = await getProducts({ query, category, limit });

  return NextResponse.json(products);
}
