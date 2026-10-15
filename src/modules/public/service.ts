import { prisma } from "@/lib/db/prisma";
import { TenantStatus, MenuStatus, ProductStatus } from "@/generated/prisma/enums";

export async function getPublicTenantBySlug(slug: string) {
  const tenant = await prisma.tenant.findUnique({
    where: { slug },
    include: { settings: true },
  });

  if (!tenant || tenant.status !== TenantStatus.ACTIVE) {
    return null;
  }

  return tenant;
}

export async function getPublicMenusByTenantId(tenantId: string) {
  return prisma.menu.findMany({
    where: {
      tenantId,
      status: MenuStatus.PUBLISHED,
    },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getPublicMenuBySlug(tenantId: string, menuSlug: string) {
  const menu = await prisma.menu.findFirst({
    where: {
      tenantId,
      slug: menuSlug,
      status: MenuStatus.PUBLISHED,
    },
    include: {
      menuCategories: {
        orderBy: { sortOrder: "asc" },
        include: {
          category: true,
          items: {
            orderBy: { sortOrder: "asc" },
            where: {
              isAvailable: true,
              product: {
                status: ProductStatus.ACTIVE,
              },
            },
            include: {
              product: {
                include: {
                  images: { orderBy: { sortOrder: "asc" } },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!menu) {
    return null;
  }

  return menu;
}
