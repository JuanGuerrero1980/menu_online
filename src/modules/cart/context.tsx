"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "./types";

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  updateObservation: (menuItemId: string, observation: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((current) => {
      const existing = current.find((i) => i.menuItemId === item.menuItemId);
      if (existing) {
        return current.map((i) =>
          i.menuItemId === item.menuItemId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((menuItemId: string) => {
    setItems((current) => current.filter((i) => i.menuItemId !== menuItemId));
  }, []);

  const updateQuantity = useCallback((menuItemId: string, quantity: number) => {
    if (quantity < 1) {
      setItems((current) =>
        current.filter((i) => i.menuItemId !== menuItemId)
      );
      return;
    }
    setItems((current) =>
      current.map((i) =>
        i.menuItemId === menuItemId ? { ...i, quantity } : i
      )
    );
  }, []);

  const updateObservation = useCallback(
    (menuItemId: string, observation: string) => {
      setItems((current) =>
        current.map((i) =>
          i.menuItemId === menuItemId ? { ...i, observation } : i
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      updateObservation,
      clearCart,
      total,
      itemCount,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      updateObservation,
      clearCart,
      total,
      itemCount,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
