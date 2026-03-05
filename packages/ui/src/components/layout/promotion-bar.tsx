"use client";

import type { Promotion } from "@repo/api/promotions";
import { use } from "react";

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
      {promotion.description} Code{" "}
      <span className="font-bold">{promotion.code}</span>
    </div>
  );
}
