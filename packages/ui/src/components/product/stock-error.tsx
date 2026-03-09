"use client";

import { useTranslations } from "next-intl";
import { Button } from "../button";

export function StockError() {
  const t = useTranslations("ProductPage");

  return (
    <div className="mt-4">
      <hr />
      <p className="mt-4 text-red-500 text-sm">{t("errorGettingStock")}</p>
      <Button className="mt-3" onClick={() => window.location.reload()}>
        {t("refresh")}
      </Button>
    </div>
  );
}
