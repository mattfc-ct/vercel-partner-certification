import type { Promotion } from "@repo/api/promotions";
import { getTranslations } from "next-intl/server";
import { use } from "react";

async function PromoBarCode({ code }: { code: string }) {
  const t = await getTranslations("Header");

  return (
    <span>
      &nbsp;{t("code")} <span className="font-bold">{code}</span>
    </span>
  );
}

export function PromotionBar({
  getActivePromotionPromise,
}: {
  getActivePromotionPromise: Promise<Promotion | null>;
}) {
  const promotion = use(getActivePromotionPromise);

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
