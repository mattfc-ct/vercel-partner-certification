import "@repo/ui/styles/globals.css";
import { Footer } from "@repo/ui/components/layout/footer";
import { Header } from "@repo/ui/components/layout/header";
import { Toaster } from "@repo/ui/components/sonner";
import { routing } from "@repo/ui/i18n/routing";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Site");

  return {
    metadataBase: new URL(
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000/"
    ),
    title: {
      template: t("metaTitle"),
      default: t("defaultMetaTitle"),
    },
    description: t("metaDescription"),
  };
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({
    slug: "dummy",
    locale,
  }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Header locale={locale} />
          <main className="container mx-auto min-h-[calc(100vh-158px)] px-8 py-16">
            {children}
          </main>
          <Footer locale={locale} />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
