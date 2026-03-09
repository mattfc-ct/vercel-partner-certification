import { useTranslations } from "next-intl";
import { Button } from "../button";

export function SearchError({ retry }: { retry: () => void }) {
  const t = useTranslations("SearchPage");

  return (
    <div className="mt-6 text-center text-lg text-muted-foreground">
      <p>{t("error")}</p>
      <Button className="mt-3" onClick={retry}>
        {t("retry")}
      </Button>
    </div>
  );
}
