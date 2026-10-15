import { describe, it, expect } from "vitest";
import { hasTenantAccess } from "./access";

describe("hasTenantAccess", () => {
  it("returns true when user belongs to tenant", () => {
    const user = {
      tenants: [
        { tenantId: "tenant-1", role: "ADMIN" },
        { tenantId: "tenant-2", role: "OWNER" },
      ],
    };

    expect(hasTenantAccess(user, "tenant-1")).toBe(true);
    expect(hasTenantAccess(user, "tenant-2")).toBe(true);
  });

  it("returns false when user does not belong to tenant", () => {
    const user = {
      tenants: [{ tenantId: "tenant-1", role: "ADMIN" }],
    };

    expect(hasTenantAccess(user, "tenant-3")).toBe(false);
  });

  it("returns false when tenants array is empty", () => {
    const user = { tenants: [] };
    expect(hasTenantAccess(user, "tenant-1")).toBe(false);
  });
});
