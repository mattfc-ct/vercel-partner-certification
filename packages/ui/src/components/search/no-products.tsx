import { useTranslations } from "next-intl";

export function SearchNoProducts() {
  const t = useTranslations("SearchPage");

  return (
    <div className="mt-6 text-center text-lg text-muted-foreground">
      {t("noProductsFound")}
    </div>
  );
}
