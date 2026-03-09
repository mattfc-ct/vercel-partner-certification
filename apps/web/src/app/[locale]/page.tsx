import { FeaturedProducts } from "@repo/ui/components/home/featured-products";
import { Hero } from "@repo/ui/components/home/hero";
import { routing } from "@repo/ui/i18n/routing";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

type HomePageProps = PageProps<"/[locale]">;

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("HomePage");

  return (
    <div className="flex flex-col gap-24">
      <Hero
        cta={t("heroCta")}
        description={t("description")}
        image="/images/hero.jpg"
        title={t("title")}
      />
      <FeaturedProducts
        title={t("featuredProductsTitle")}
        viewAll={t("viewAll")}
      />
    </div>
  );
}
