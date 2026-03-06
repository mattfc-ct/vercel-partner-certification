import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const tSite = await getTranslations("Site");
  const tCart = await getTranslations("CartPage");

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
      {tSite("title")} | {tCart("title")}
    </div>
  );
}
