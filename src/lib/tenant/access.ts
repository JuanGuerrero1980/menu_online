export function hasTenantAccess(
  user: {
    tenants: Array<{ tenantId: string; role: string }>;
  },
  tenantId: string
) {
  return user.tenants.some((t) => t.tenantId === tenantId);
}
