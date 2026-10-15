"use client";

import { useCart } from "@/modules/cart/context";

interface AddToCartButtonProps {
  menuItemId: string;
  productId: string;
  name: string;
  price: number;
}

export function AddToCartButton({
  menuItemId,
  productId,
  name,
  price,
}: AddToCartButtonProps) {
  const { addItem, items } = useCart();
  const existing = items.find((i) => i.menuItemId === menuItemId);

  return (
    <button
      type="button"
      onClick={() => addItem({ menuItemId, productId, name, price })}
      className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
    >
      {existing ? `Agregado (${existing.quantity})` : "Agregar"}
    </button>
  );
}
