import { Search } from "@repo/ui/components/search/search";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Search",
};

export default function SearchPage() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
}
