import { useTranslations } from "next-intl";
import { Button } from "./button";
import { Input } from "./input";

export function QuantitySelector({
  maxQuantity,
  quantity,
  setQuantity,
}: {
  maxQuantity: number;
  quantity: number;
  setQuantity: (quantity: number | ((quantity: number) => number)) => void;
}) {
  const t = useTranslations("QuantitySelector");

  return (
    <div>
      <Button
        aria-label={t("decreaseQuantity")}
        className="text-2xl"
        onClick={() =>
          setQuantity((oldQuantity) => (oldQuantity > 1 ? oldQuantity - 1 : 1))
        }
        variant="link"
      >
        -
      </Button>
      <Input
        className="w-full max-w-16"
        max={maxQuantity}
        min={1}
        name="quantity"
        onChange={(e) => setQuantity(Number(e.target.value))}
        type="number"
        value={quantity}
      />
      <Button
        aria-label={t("increaseQuantity")}
        className="text-2xl"
        onClick={() =>
          setQuantity((oldQuantity) =>
            oldQuantity < maxQuantity ? oldQuantity + 1 : maxQuantity
          )
        }
        variant="link"
      >
        +
      </Button>
    </div>
  );
}
