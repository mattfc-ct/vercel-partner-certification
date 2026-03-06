"use client";

import type { Category } from "@repo/api/categories";
import type { Product } from "@repo/api/products";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { ProductGrid } from "../product/grid";
import { ProductGridSkeleton } from "../product/skeleton";
import { CategorySelector } from "./category-selector";

export function Search({
  getCategoriesPromise,
}: {
  getCategoriesPromise: Promise<Category[]>;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useQueryState("query");
  const [category, setCategory] = useQueryState("category");
  const hasHit3Chars = useRef(false);
  const [loading, setLoading] = useState(false);
  const abortController = useRef<AbortController | null>(null);
  const t = useTranslations("SearchPage");

  const performSearch = useCallback(
    async (query: string | null, category: string | null) => {
      setLoading(true);

      abortController.current?.abort();
      abortController.current = new AbortController();

      try {
        const queryParams = new URLSearchParams();
        if (query) {
          queryParams.set("query", query);
        }
        if (category) {
          queryParams.set("category", category);
        }

        const response = await fetch(`/api/search?${queryParams.toString()}`, {
          signal: abortController.current.signal,
        });

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
    },
    []
  );

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!hasHit3Chars.current && query && query.length > 2) {
        hasHit3Chars.current = true;
      }

      if (e.key === "Enter" || hasHit3Chars.current) {
        performSearch(query, category);
      }
    },
    [performSearch, query, category]
  );

  const handleCategoryChange = useCallback(
    (category: Category | undefined) => {
      const newCategory = category?.slug ?? null;

      setCategory(newCategory);
      performSearch(query, newCategory);
    },
    [setCategory, performSearch, query]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: Run on mount
  useEffect(() => {
    hasHit3Chars.current = query !== null && query.length > 2;
    performSearch(query, category);
  }, []);

  return (
    <div>
      <h1 className="mb-6 font-bold text-4xl">{t("title")}</h1>
      <div className="flex items-center gap-2">
        <Input
          defaultValue={query ?? ""}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={handleKeyUp}
          placeholder={t("inputPlaceholder")}
          type="text"
        />
        <CategorySelector
          getCategoriesPromise={getCategoriesPromise}
          onCategoryChange={handleCategoryChange}
        />
        <Button onClick={() => performSearch(query, category)}>
          {t("searchButton")}
        </Button>
      </div>
      {loading ? (
        <ProductGridSkeleton count={5} />
      ) : (
        <ProductGrid products={products} />
      )}
      {products.length === 0 && !loading && (
        <div className="mt-6 text-center text-lg text-muted-foreground">
          {t("noProductsFound")}
        </div>
      )}
    </div>
  );
}
