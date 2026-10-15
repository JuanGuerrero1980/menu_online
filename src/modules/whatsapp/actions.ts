"use server";

import { prisma } from "@/lib/db/prisma";
import {
  TenantStatus,
  MenuStatus,
  ProductStatus,
} from "@/generated/prisma/enums";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "./format";

interface CartInputItem {
  menuItemId: string;
  quantity: number;
  observation?: string;
}

interface ValidationResult {
  success: boolean;
  error?: string;
  whatsappUrl?: string;
}

export async function validateCartAndGenerateMessage(
  tenantSlug: string,
  menuSlug: string,
  items: CartInputItem[]
): Promise<ValidationResult> {
  if (items.length === 0) {
    return { success: false, error: "El carrito está vacío." };
  }

  const tenant = await prisma.tenant.findUnique({
    where: { slug: tenantSlug },
    include: { settings: true },
  });

  if (!tenant || tenant.status !== TenantStatus.ACTIVE) {
    return { success: false, error: "El negocio no está disponible." };
  }

  const menu = await prisma.menu.findFirst({
    where: {
      tenantId: tenant.id,
      slug: menuSlug,
      status: MenuStatus.PUBLISHED,
    },
  });

  if (!menu) {
    return { success: false, error: "La carta no está disponible." };
  }

  const menuItemIds = items.map((i) => i.menuItemId);
  const menuItems = await prisma.menuItem.findMany({
    where: {
      id: { in: menuItemIds },
      menuCategory: { menu: { id: menu.id, tenantId: tenant.id } },
      isAvailable: true,
      product: { status: ProductStatus.ACTIVE },
    },
    include: {
      product: true,
      menuCategory: { include: { category: true } },
    },
  });

  if (menuItems.length !== items.length) {
    return {
      success: false,
      error:
        "Algunos productos ya no están disponibles. Por favor revisá el carrito.",
    };
  }

  const messageItems = [];

  for (const input of items) {
    const menuItem = menuItems.find((mi) => mi.id === input.menuItemId);
    if (!menuItem) {
      return {
        success: false,
        error: "Un producto del carrito ya no está disponible.",
      };
    }

    if (input.quantity < 1) {
      return { success: false, error: "Las cantidades deben ser mayores a 0." };
    }

    const price = Number(menuItem.priceOverride ?? menuItem.product.basePrice);

    messageItems.push({
      name: menuItem.product.name,
      quantity: input.quantity,
      price,
      observation: input.observation,
    });
  }

  const phone = tenant.settings?.whatsappPhone;
  if (!phone) {
    return {
      success: false,
      error: "El negocio no tiene configurado un número de WhatsApp.",
    };
  }

  const message = buildWhatsAppMessage(messageItems);
  const whatsappUrl = buildWhatsAppUrl(phone, message);

  return { success: true, whatsappUrl };
}
