import { getActivePromotion } from "@repo/api/promotions";
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
  const promotion = await getActivePromotion();

  if (!promotion) {
    return;
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
