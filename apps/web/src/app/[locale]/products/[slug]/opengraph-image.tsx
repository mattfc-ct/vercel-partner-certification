import { getProductBySlug } from "@repo/api/products";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const tSite = await getTranslations("Site");

  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {tSite("title")} | {product.name}
    </div>
  );
}
