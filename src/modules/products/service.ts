"use server";

import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { requireTenantAccess } from "@/lib/tenant/tenant";
import { ProductStatus } from "@/generated/prisma/enums";

const productSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().optional(),
  basePrice: z.coerce.number().min(0, "El precio no puede ser negativo"),
  status: z.enum([ProductStatus.ACTIVE, ProductStatus.ARCHIVED]),
});

export type ProductInput = z.infer<typeof productSchema>;

export async function listProducts(tenantId: string) {
  const user = await requireTenantAccess(tenantId);
  if (!user) {
    throw new Error("No autorizado");
  }

  return prisma.product.findMany({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function getProduct(tenantId: string, productId: string) {
  const user = await requireTenantAccess(tenantId);
  if (!user) {
    throw new Error("No autorizado");
  }

  return prisma.product.findFirst({
    where: { id: productId, tenantId },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
}

export async function createProduct(tenantId: string, input: ProductInput) {
  const user = await requireTenantAccess(tenantId);
  if (!user) {
    throw new Error("No autorizado");
  }

  const parsed = productSchema.parse(input);

  return prisma.product.create({
    data: {
      tenantId,
      name: parsed.name,
      description: parsed.description,
      basePrice: parsed.basePrice,
      status: parsed.status,
    },
  });
}

export async function updateProduct(
  tenantId: string,
  productId: string,
  input: ProductInput
) {
  const user = await requireTenantAccess(tenantId);
  if (!user) {
    throw new Error("No autorizado");
  }

  const parsed = productSchema.parse(input);

  const existing = await prisma.product.findFirst({
    where: { id: productId, tenantId },
  });
  if (!existing) {
    throw new Error("Producto no encontrado");
  }

  return prisma.product.update({
    where: { id: productId },
    data: {
      name: parsed.name,
      description: parsed.description,
      basePrice: parsed.basePrice,
      status: parsed.status,
    },
  });
}

export async function archiveProduct(tenantId: string, productId: string) {
  const user = await requireTenantAccess(tenantId);
  if (!user) {
    throw new Error("No autorizado");
  }

  const existing = await prisma.product.findFirst({
    where: { id: productId, tenantId },
  });
  if (!existing) {
    throw new Error("Producto no encontrado");
  }

  return prisma.product.update({
    where: { id: productId },
    data: { status: ProductStatus.ARCHIVED },
  });
}
