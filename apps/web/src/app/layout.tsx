import "@repo/ui/styles/globals.css";
import { Header } from "@repo/ui/components/layout/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "Swag Store | %s",
    default: "Swag Store | Home",
  },
  description: "Swag Store where you can buy great swag",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
