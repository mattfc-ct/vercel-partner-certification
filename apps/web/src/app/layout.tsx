import "@repo/ui/styles/globals.css";
import { Footer } from "@repo/ui/components/layout/footer";
import { Header } from "@repo/ui/components/layout/header";
import { Toaster } from "@repo/ui/components/sonner";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

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
  return (
    <html lang="en">
      <body>
        <NuqsAdapter>
          <Header />
          <main className="container mx-auto min-h-[calc(100vh-158px)] px-8 py-16">
            {children}
          </main>
          <Footer />
          <Toaster />
        </NuqsAdapter>
      </body>
    </html>
  );
}
