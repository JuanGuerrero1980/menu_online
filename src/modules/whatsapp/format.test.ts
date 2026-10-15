import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
} from "./format";

describe("formatCurrency", () => {
  it("formats ARS correctly", () => {
    expect(formatCurrency(18000)).toContain("$");
    expect(formatCurrency(18000)).toContain("18.000");
  });
});

describe("buildWhatsAppMessage", () => {
  it("includes header, items and total", () => {
    const message = buildWhatsAppMessage([
      { name: "Hamburguesa", quantity: 2, price: 18000 },
      { name: "Papas", quantity: 1, price: 4000 },
    ]);

    expect(message).toContain("Hola, quiero realizar este pedido:");
    expect(message).toContain("2 x Hamburguesa");
    expect(message).toContain("1 x Papas");
    expect(message).toContain("Total estimado");
    expect(message).toContain("¿Me confirman el pedido y el tiempo de demora?");
  });

  it("includes observations", () => {
    const message = buildWhatsAppMessage([
      { name: "Hamburguesa", quantity: 1, price: 18000, observation: "sin cebolla" },
    ]);

    expect(message).toContain("(sin cebolla)");
  });
});

describe("buildWhatsAppUrl", () => {
  it("cleans phone and encodes message", () => {
    const url = buildWhatsAppUrl("+54 9 351 123-4567", "Hola mundo");
    expect(url).toBe("https://wa.me/5493511234567?text=Hola%20mundo");
  });
});
