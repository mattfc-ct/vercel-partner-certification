"use client";

import type { Product } from "@repo/api/products";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { ProductCard } from "../product/card";
import { Spinner } from "../spinner";

export function Search() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useQueryState("");
  const hasHit3Chars = useRef(false);
  const [loading, setLoading] = useState(false);
  const abortController = useRef<AbortController | null>(null);

  const performSearch = useCallback(async (query: string | null) => {
    setLoading(true);

    abortController.current?.abort();
    abortController.current = new AbortController();

    try {
      const response = await fetch(
        `/api/search${query ? `?query=${query}` : ""}`,
        {
          signal: abortController.current.signal,
        }
      );

      const data = (await response.json()) as Product[];

      setProducts(data);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      console.error(error);

      return;
    }

    setLoading(false);
  }, []);

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!hasHit3Chars.current && query && query.length > 2) {
        hasHit3Chars.current = true;
      }

      if (e.key === "Enter" || hasHit3Chars.current) {
        performSearch(query);
      }
    },
    [performSearch, query]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: Run on mount
  useEffect(() => {
    hasHit3Chars.current = query !== null && query.length > 2;
    performSearch(query);
  }, []);

  return (
    <div>
      <h1 className="mb-6 font-bold text-4xl">Search</h1>
      <div className="flex items-center gap-2">
        <Input
          defaultValue={query ?? ""}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={handleKeyUp}
          placeholder="Search"
          type="text"
        />
        <Button onClick={() => performSearch(query)}>Search</Button>
      </div>
      {loading ? (
        <div className="flex min-h-[70vh] items-center justify-center">
          <Spinner className="size-16" />
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li className="hover:underline" key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
      {products.length === 0 && !loading && (
        <div className="mt-6 text-center text-lg text-muted-foreground">
          No products found
        </div>
      )}
    </div>
  );
}
