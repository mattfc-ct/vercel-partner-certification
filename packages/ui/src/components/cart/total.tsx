import { useFormatter, useTranslations } from "next-intl";

export function CartTotal({
  amount,
  currency,
}: {
  amount: number;
  currency: string;
}) {
  const format = useFormatter();
  const t = useTranslations("CartPage");

  return (
    <div className="flex justify-end py-8">
      <div className="text-lg lg:w-[200px]">
        <span className="font-bold">{t("total")} </span>
        {format.number(amount, {
          style: "currency",
          currency: currency ?? "USD",
        })}
      </div>
    </div>
  );
}
