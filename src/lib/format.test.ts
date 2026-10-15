import { describe, it, expect } from "vitest";
import { formatPrice } from "./format";

describe("formatPrice", () => {
  it("formats ARS currency correctly", () => {
    const result = formatPrice(18000, "ARS");
    expect(result).toContain("$");
    expect(result).toContain("18.000");
  });

  it("formats decimal values correctly", () => {
    const result = formatPrice(2500.5, "ARS");
    expect(result).toContain("2.500,50");
  });
});
