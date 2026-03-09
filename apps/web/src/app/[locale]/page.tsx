import { getProducts } from "@repo/api/products";
import { FeaturedProducts } from "@repo/ui/components/home/featured-products";
import { Hero } from "@repo/ui/components/home/hero";
import { routing } from "@repo/ui/i18n/routing";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

const FEATURED_PRODUCTS_COUNT = 6;

type HomePageProps = PageProps<"/[locale]">;

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const getProductsPromise = getProducts({
    featured: true,
    limit: FEATURED_PRODUCTS_COUNT,
  });

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
        count={FEATURED_PRODUCTS_COUNT}
        getProductsPromise={getProductsPromise}
        title={t("featuredProductsTitle")}
        viewAll={t("viewAll")}
      />
    </div>
  );
}
