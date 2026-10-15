"use client";

import { useCart } from "@/modules/cart/context";

interface MenuItemQuantityProps {
  menuItemId: string;
  productId: string;
  name: string;
  price: number;
}

export function MenuItemQuantity({
  menuItemId,
  productId,
  name,
  price,
}: MenuItemQuantityProps) {
  const { items, addItem, updateQuantity, removeItem } = useCart();
  const item = items.find((i) => i.menuItemId === menuItemId);
  const quantity = item?.quantity ?? 0;

  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={() => addItem({ menuItemId, productId, name, price })}
        className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
      >
        Agregar
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => {
          if (quantity <= 1) {
            removeItem(menuItemId);
          } else {
            updateQuantity(menuItemId, quantity - 1);
          }
        }}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-sm font-medium transition hover:bg-accent"
        aria-label="Restar"
      >
        −
      </button>
      <span className="w-6 text-center text-sm font-medium">{quantity}</span>
      <button
        type="button"
        onClick={() => updateQuantity(menuItemId, quantity + 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-sm font-medium transition hover:bg-accent"
        aria-label="Sumar"
      >
        +
      </button>
    </div>
  );
}
