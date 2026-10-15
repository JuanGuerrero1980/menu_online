"use server";

import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { requireTenantAccess } from "@/lib/tenant/tenant";
import { MenuStatus } from "@/generated/prisma/enums";

const menuSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  slug: z.string().min(1, "El slug es obligatorio"),
  description: z.string().optional(),
  status: z.enum([MenuStatus.DRAFT, MenuStatus.PUBLISHED, MenuStatus.ARCHIVED]),
});

export type MenuInput = z.infer<typeof menuSchema>;

export async function listMenus(tenantId: string) {
  const user = await requireTenantAccess(tenantId);
  if (!user) throw new Error("No autorizado");

  return prisma.menu.findMany({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getMenu(tenantId: string, menuId: string) {
  const user = await requireTenantAccess(tenantId);
  if (!user) throw new Error("No autorizado");

  return prisma.menu.findFirst({
    where: { id: menuId, tenantId },
    include: {
      menuCategories: {
        orderBy: { sortOrder: "asc" },
        include: {
          category: true,
          items: {
            orderBy: { sortOrder: "asc" },
            include: { product: true },
          },
        },
      },
    },
  });
}

export async function createMenu(tenantId: string, input: MenuInput) {
  const user = await requireTenantAccess(tenantId);
  if (!user) throw new Error("No autorizado");

  const parsed = menuSchema.parse(input);

  return prisma.menu.create({
    data: {
      tenantId,
      name: parsed.name,
      slug: parsed.slug,
      description: parsed.description,
      status: parsed.status,
    },
  });
}

export async function updateMenu(
  tenantId: string,
  menuId: string,
  input: MenuInput
) {
  const user = await requireTenantAccess(tenantId);
  if (!user) throw new Error("No autorizado");

  const parsed = menuSchema.parse(input);

  const existing = await prisma.menu.findFirst({
    where: { id: menuId, tenantId },
  });
  if (!existing) throw new Error("Carta no encontrada");

  return prisma.menu.update({
    where: { id: menuId },
    data: {
      name: parsed.name,
      slug: parsed.slug,
      description: parsed.description,
      status: parsed.status,
    },
  });
}

export async function addCategoryToMenu(
  tenantId: string,
  menuId: string,
  categoryId: string
) {
  const user = await requireTenantAccess(tenantId);
  if (!user) throw new Error("No autorizado");

  const menu = await prisma.menu.findFirst({
    where: { id: menuId, tenantId },
  });
  const category = await prisma.category.findFirst({
    where: { id: categoryId, tenantId },
  });

  if (!menu || !category) throw new Error("Carta o categoría no encontrada");

  return prisma.menuCategory.create({
    data: {
      menuId,
      categoryId,
    },
  });
}

export async function removeCategoryFromMenu(
  tenantId: string,
  menuCategoryId: string
) {
  const user = await requireTenantAccess(tenantId);
  if (!user) throw new Error("No autorizado");

  const menuCategory = await prisma.menuCategory.findFirst({
    where: { id: menuCategoryId, menu: { tenantId } },
  });
  if (!menuCategory) throw new Error("Relación no encontrada");

  return prisma.menuCategory.delete({
    where: { id: menuCategoryId },
  });
}

export async function addProductToMenuCategory(
  tenantId: string,
  menuCategoryId: string,
  productId: string,
  priceOverride?: number
) {
  const user = await requireTenantAccess(tenantId);
  if (!user) throw new Error("No autorizado");

  const menuCategory = await prisma.menuCategory.findFirst({
    where: { id: menuCategoryId, menu: { tenantId } },
  });
  const product = await prisma.product.findFirst({
    where: { id: productId, tenantId, status: "ACTIVE" },
  });

  if (!menuCategory || !product) {
    throw new Error("Categoría o producto no encontrado");
  }

  return prisma.menuItem.create({
    data: {
      menuCategoryId,
      productId,
      priceOverride: priceOverride,
    },
  });
}

export async function removeProductFromMenu(
  tenantId: string,
  menuItemId: string
) {
  const user = await requireTenantAccess(tenantId);
  if (!user) throw new Error("No autorizado");

  const menuItem = await prisma.menuItem.findFirst({
    where: {
      id: menuItemId,
      menuCategory: { menu: { tenantId } },
    },
  });
  if (!menuItem) throw new Error("Ítem no encontrado");

  return prisma.menuItem.delete({ where: { id: menuItemId } });
}

export async function updateMenuItem(
  tenantId: string,
  menuItemId: string,
  data: { priceOverride?: number | null; isAvailable?: boolean }
) {
  const user = await requireTenantAccess(tenantId);
  if (!user) throw new Error("No autorizado");

  const menuItem = await prisma.menuItem.findFirst({
    where: {
      id: menuItemId,
      menuCategory: { menu: { tenantId } },
    },
  });
  if (!menuItem) throw new Error("Ítem no encontrado");

  return prisma.menuItem.update({
    where: { id: menuItemId },
    data: {
      priceOverride: data.priceOverride,
      isAvailable: data.isAvailable,
    },
  });
}
