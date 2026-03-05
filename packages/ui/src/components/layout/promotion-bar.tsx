import { getActivePromotion } from "@repo/api/promotions";

export async function PromotionBar() {
  const promotion = await getActivePromotion();

  if (!promotion) {
    return;
  }

  return (
    <div className="bg-black p-3 text-center text-sm text-white">
      {promotion.description} Code{" "}
      <span className="font-bold">{promotion.code}</span>
    </div>
  );
}
