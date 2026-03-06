import type { Category } from "@repo/api/categories";
import { Suspense, use } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Skeleton } from "../skeleton";

function CategorySelectorContent({
  getCategoriesPromise,
  onCategoryChange,
  defaultCategory,
}: {
  getCategoriesPromise: Promise<Category[]>;
  onCategoryChange: (category: Category | undefined) => void;
  defaultCategory: string | null;
}) {
  const categories = use(getCategoriesPromise);
  return (
    <Select
      defaultValue={defaultCategory ?? undefined}
      onValueChange={(value) =>
        onCategoryChange(categories.find((category) => category.slug === value))
      }
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category.slug} value={category.slug}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function CategorySelector({
  getCategoriesPromise,
  onCategoryChange,
  defaultCategory,
}: {
  getCategoriesPromise: Promise<Category[]>;
  onCategoryChange: (category: Category | undefined) => void;
  defaultCategory: string | null;
}) {
  return (
    <Suspense fallback={<Skeleton className="h-9 w-[200px]" />}>
      <CategorySelectorContent
        defaultCategory={defaultCategory}
        getCategoriesPromise={getCategoriesPromise}
        onCategoryChange={onCategoryChange}
      />
    </Suspense>
  );
}
