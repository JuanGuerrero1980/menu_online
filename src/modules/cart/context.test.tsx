import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "./context";

function wrapper({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}

describe("useCart", () => {
  it("starts empty", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.total).toBe(0);
    expect(result.current.itemCount).toBe(0);
  });

  it("adds an item", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        menuItemId: "1",
        productId: "p1",
        name: "Hamburguesa",
        price: 18000,
      });
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.itemCount).toBe(1);
    expect(result.current.total).toBe(18000);
  });

  it("increments quantity when adding same item", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        menuItemId: "1",
        productId: "p1",
        name: "Hamburguesa",
        price: 18000,
      });
      result.current.addItem({
        menuItemId: "1",
        productId: "p1",
        name: "Hamburguesa",
        price: 18000,
      });
    });

    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.total).toBe(36000);
  });

  it("updates quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        menuItemId: "1",
        productId: "p1",
        name: "Hamburguesa",
        price: 18000,
      });
      result.current.updateQuantity("1", 3);
    });

    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.total).toBe(54000);
  });

  it("removes item when quantity goes below 1", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        menuItemId: "1",
        productId: "p1",
        name: "Hamburguesa",
        price: 18000,
      });
      result.current.updateQuantity("1", 0);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it("adds observation", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        menuItemId: "1",
        productId: "p1",
        name: "Hamburguesa",
        price: 18000,
      });
      result.current.updateObservation("1", "sin cebolla");
    });

    expect(result.current.items[0].observation).toBe("sin cebolla");
  });

  it("clears cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({
        menuItemId: "1",
        productId: "p1",
        name: "Hamburguesa",
        price: 18000,
      });
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
  });
});
