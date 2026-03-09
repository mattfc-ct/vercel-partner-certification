"use client";

import type { Category } from "@repo/api/categories";
import type { Product } from "@repo/api/products";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import { useEffect, useRef, useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { ProductGrid } from "../product/grid";
import { ProductGridSkeleton } from "../product/skeleton";
import { CategorySelector } from "./category-selector";

const SEARCH_LIMIT = 5;

function SearchError({ retry }: { retry: () => void }) {
  const t = useTranslations("SearchPage");

  return (
    <div className="mt-6 text-center text-lg text-muted-foreground">
      <p>{t("error")}</p>
      <Button className="mt-3" onClick={retry}>
        {t("retry")}
      </Button>
    </div>
  );
}

function SearchNoProducts() {
  const t = useTranslations("SearchPage");

  return (
    <div className="mt-6 text-center text-lg text-muted-foreground">
      {t("noProductsFound")}
    </div>
  );
}

export function Search({
  getCategoriesPromise,
}: {
  getCategoriesPromise: Promise<Category[]>;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasError, setHasError] = useState(false);
  const [query, setQuery] = useQueryState("query");
  const [category, setCategory] = useQueryState("category");
  const hasHit3Chars = useRef(false);
  const [loading, setLoading] = useState(true);
  const abortController = useRef<AbortController | null>(null);
  const t = useTranslations("SearchPage");

  const performSearch = async (
    query: string | null,
    category: string | null
  ) => {
    const setLoadingTimeout = setTimeout(() => {
      setLoading(true);
    }, 150);

    abortController.current?.abort();
    abortController.current = new AbortController();

    try {
      setHasError(false);

      const queryParams = new URLSearchParams();
      if (query) {
        queryParams.set("query", query);
      }
      if (category) {
        queryParams.set("category", category);
      }
      queryParams.set("limit", SEARCH_LIMIT.toString());

      const response = await fetch(`/api/search?${queryParams.toString()}`, {
        signal: abortController.current.signal,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = (await response.json()) as Product[];

      clearTimeout(setLoadingTimeout);

      setProducts(data);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      clearTimeout(setLoadingTimeout);

      setHasError(true);
      setLoading(false);

      console.error(error);

      return;
    }

    setLoading(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!hasHit3Chars.current && query && query.length > 2) {
      hasHit3Chars.current = true;
    }

    if (e.key === "Enter" || hasHit3Chars.current) {
      performSearch(query, category);
    }
  };

  const handleCategoryChange = (category: Category | undefined) => {
    const newCategory = category?.slug ?? null;

    setCategory(newCategory);
    performSearch(query, newCategory);
  };

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
          defaultCategory={category}
          getCategoriesPromise={getCategoriesPromise}
          onCategoryChange={handleCategoryChange}
        />
        <Button onClick={() => performSearch(query, category)}>
          {t("searchButton")}
        </Button>
      </div>
      {loading && <ProductGridSkeleton count={5} />}
      {hasError && <SearchError retry={() => performSearch(query, category)} />}
      {products.length === 0 && !loading && !hasError && <SearchNoProducts />}
      {products.length > 0 && !loading && !hasError && (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
