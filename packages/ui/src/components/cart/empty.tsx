import { useTranslations } from "next-intl";

export function CartEmpty() {
  const t = useTranslations("CartPage");

  return <div className="text-center text-gray-500 text-lg">{t("empty")}</div>;
}
