import { getProductBySlug } from "@repo/api/products";
import { getStock } from "@repo/api/stock";
import { ProductDetails } from "@repo/ui/components/product/details";
import { Spinner } from "@repo/ui/components/spinner";
import { routing } from "@repo/ui/i18n/routing";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return {
    title: product.name,
  };
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({
    slug: "test",
    locale,
  }));
}

async function ProductPageContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [product, stock] = await Promise.all([
    getProductBySlug(slug),
    getStock(slug),
  ]);

  return <ProductDetails product={product} stock={stock} />;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center">
          <Spinner className="size-16" />
        </div>
      }
    >
      <ProductPageContent params={params} />
    </Suspense>
  );
}
