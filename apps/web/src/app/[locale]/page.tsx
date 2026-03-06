import { Button } from "@repo/ui/components/button";
import { FeaturedProducts } from "@repo/ui/components/home/featured-products";
import { Hero } from "@repo/ui/components/home/hero";
import { Link } from "@repo/ui/i18n/navigation";
import { routing } from "@repo/ui/i18n/routing";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations("HomePage");

  return (
    <div className="flex flex-col gap-24">
      <Hero
        cta={
          <Button asChild size="lg">
            <Link href="/search">{t("cta")}</Link>
          </Button>
        }
        description={t("description")}
        image={
          <Image
            alt={t("imageAlt")}
            height={1000}
            src="/images/hero.jpg"
            width={1000}
          />
        }
        title={t("title")}
      />
      <FeaturedProducts />
    </div>
  );
}
