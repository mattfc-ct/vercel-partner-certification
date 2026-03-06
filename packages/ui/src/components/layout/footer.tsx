import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("Footer");

  return (
    <footer className="border-t bg-black text-white">
      <div className="flex items-center justify-center p-3 text-sm">
        <span>{t("copyright")}</span>
      </div>
    </footer>
  );
}
