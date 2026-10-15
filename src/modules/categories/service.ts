"use server";

import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { requireTenantAccess } from "@/lib/tenant/tenant";

const categorySchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().optional(),
});

export type CategoryInput = z.infer<typeof categorySchema>;

export async function listCategories(tenantId: string) {
  const user = await requireTenantAccess(tenantId);
  if (!user) {
    throw new Error("No autorizado");
  }

  return prisma.category.findMany({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCategory(tenantId: string, categoryId: string) {
  const user = await requireTenantAccess(tenantId);
  if (!user) {
    throw new Error("No autorizado");
  }

  return prisma.category.findFirst({
    where: { id: categoryId, tenantId },
  });
}

export async function createCategory(tenantId: string, input: CategoryInput) {
  const user = await requireTenantAccess(tenantId);
  if (!user) {
    throw new Error("No autorizado");
  }

  const parsed = categorySchema.parse(input);

  return prisma.category.create({
    data: {
      tenantId,
      name: parsed.name,
      description: parsed.description,
    },
  });
}

export async function updateCategory(
  tenantId: string,
  categoryId: string,
  input: CategoryInput
) {
  const user = await requireTenantAccess(tenantId);
  if (!user) {
    throw new Error("No autorizado");
  }

  const parsed = categorySchema.parse(input);

  const existing = await prisma.category.findFirst({
    where: { id: categoryId, tenantId },
  });
  if (!existing) {
    throw new Error("Categoría no encontrada");
  }

  return prisma.category.update({
    where: { id: categoryId },
    data: {
      name: parsed.name,
      description: parsed.description,
    },
  });
}

export async function deleteCategory(tenantId: string, categoryId: string) {
  const user = await requireTenantAccess(tenantId);
  if (!user) {
    throw new Error("No autorizado");
  }

  const existing = await prisma.category.findFirst({
    where: { id: categoryId, tenantId },
  });
  if (!existing) {
    throw new Error("Categoría no encontrada");
  }

  return prisma.category.delete({
    where: { id: categoryId },
  });
}
