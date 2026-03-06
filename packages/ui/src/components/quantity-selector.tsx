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
  return (
    <div>
      <Button
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
        onChange={(e) => setQuantity(Number(e.target.value))}
        type="number"
        value={quantity}
      />
      <Button
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
