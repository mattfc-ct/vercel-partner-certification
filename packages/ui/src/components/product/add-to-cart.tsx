"use client";

import { useState } from "react";
import { Button } from "../button";
import { Input } from "../input";

export function AddToCart({ maxQuantity }: { maxQuantity: number }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button
          className="text-2xl"
          onClick={() =>
            setQuantity((oldQuantity) =>
              oldQuantity > 1 ? oldQuantity - 1 : 1
            )
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
      <div>
        <Button>Add to Cart</Button>
      </div>
    </div>
  );
}
