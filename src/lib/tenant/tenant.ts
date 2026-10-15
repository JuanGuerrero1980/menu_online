import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { TenantStatus } from "@/generated/prisma/enums";

export async function getTenantBySlug(slug: string) {
  const tenant = await prisma.tenant.findUnique({
    where: { slug },
    include: { settings: true },
  });

  if (!tenant || tenant.status !== TenantStatus.ACTIVE) {
    return null;
  }

  return tenant;
}

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return session.user;
}

export function hasTenantAccess(
  user: {
    tenants: Array<{ tenantId: string; role: string }>;
  },
  tenantId: string
) {
  return user.tenants.some((t) => t.tenantId === tenantId);
}

export async function requireTenantAccess(tenantId: string) {
  const user = await requireAuth();
  if (!user) {
    return null;
  }

  if (!hasTenantAccess(user, tenantId)) {
    return null;
  }

  return user;
}
