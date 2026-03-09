import { getTranslations } from "next-intl/server";

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Footer" });

  return (
    <footer className="border-t bg-black text-white">
      <div className="flex items-center justify-center p-3 text-sm">
        <span>{t("copyright")}</span>
      </div>
    </footer>
  );
}
