import { Search } from "@repo/ui/components/search/search";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
};

export default function SearchPage() {
  return <Search />;
}
