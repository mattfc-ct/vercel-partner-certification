import "@repo/ui/styles/globals.css";
import { getActivePromotion } from "@repo/api/promotions";
import { Footer } from "@repo/ui/components/layout/footer";
import { Header } from "@repo/ui/components/layout/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "Swag Store | %s",
    default: "Swag Store | Home",
  },
  description: "Swag Store where you can buy great swag",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getActivePromotionPromise = getActivePromotion();

  return (
    <html lang="en">
      <body>
        <Header getActivePromotionPromise={getActivePromotionPromise} />
        <main className="container mx-auto min-h-[calc(100vh-158px)] px-8 py-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
