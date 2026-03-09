import { Cart } from "@repo/ui/components/cart/cart";
import { routing } from "@repo/ui/i18n/routing";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

type CartPageProps = PageProps<"/[locale]/cart">;

export async function generateMetadata({ params }: CartPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("CartPage");

  return {
    title: t("title"),
  };
}

export default async function CartPage({ params }: CartPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // We render the cart without server properties as it is dependent on browser data (localStorage)
  return <Cart />;
}
