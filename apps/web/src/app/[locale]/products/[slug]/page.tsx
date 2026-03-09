import { getProductBySlug } from "@repo/api/products";
import { ProductDetails } from "@repo/ui/components/product/details";
import { Spinner } from "@repo/ui/components/spinner";
import { routing } from "@repo/ui/i18n/routing";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

type ProductPageProps = PageProps<"/[locale]/products/[slug]">;

interface ProductParams {
  params: ProductPageProps["params"];
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return {
    title: product.name,
  };
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({
    slug: "dummy",
    locale,
  }));
}

async function ProductPageContent({ params }: ProductParams) {
  const { slug } = await params;

  return <ProductDetails slug={slug} />;
}

export default async function ProductPage({ params }: ProductPageProps) {
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
