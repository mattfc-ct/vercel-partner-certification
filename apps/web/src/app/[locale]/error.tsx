"use client";

import { Button } from "@repo/ui/components/button";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("ErrorPage");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="font-bold text-2xl">{t("title")}</h2>
      <p>{t("description")}</p>
      <Button onClick={() => reset()}>{t("tryAgain")}</Button>
    </div>
  );
}
