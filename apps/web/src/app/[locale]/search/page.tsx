import { getCategories } from "@repo/api/categories";
import { Search } from "@repo/ui/components/search/search";
import { routing } from "@repo/ui/i18n/routing";
import { NuqsAdapter } from "@repo/ui/nuqs";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

type SearchPageProps = PageProps<"/[locale]/search">;

export async function generateMetadata({ params }: SearchPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("SearchPage");

  return {
    title: t("title"),
  };
}

export default async function SearchPage({ params }: SearchPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const getCategoriesPromise = getCategories().catch((error) => {
    console.error("Error getting categories", error);
    return [];
  });

  return (
    <Suspense>
      <NuqsAdapter>
        <Search getCategoriesPromise={getCategoriesPromise} />
      </NuqsAdapter>
    </Suspense>
  );
}
