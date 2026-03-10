import { getActivePromotion, type Promotion } from "@repo/api/promotions";
import { connection } from "next/server";
import { getTranslations } from "next-intl/server";

async function PromoBarCode({ code }: { code: string }) {
  const t = await getTranslations("Header");

  return (
    <span>
      &nbsp;{t("code")} <span className="font-bold">{code}</span>
    </span>
  );
}

export async function PromotionBar() {
  await connection();

  let promotion: Promotion | null = null;

  try {
    promotion = await getActivePromotion();
  } catch (error) {
    console.error("Error getting active promotion", error);
  }

  if (!promotion) {
    return null;
  }

  return (
    <div className="bg-black p-3 text-center text-sm text-white">
      {promotion.description}
      {promotion.code && promotion.code !== "AUTO" && (
        <PromoBarCode code={promotion.code} />
      )}
    </div>
  );
}
