"use server";

import { prisma } from "@/lib/db/prisma";
import {
  TenantStatus,
  MenuStatus,
  ProductStatus,
} from "@/generated/prisma/enums";

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

  const lines: string[] = [];
  let total = 0;

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
    const lineTotal = price * input.quantity;
    total += lineTotal;

    const observationText = input.observation
      ? ` (${input.observation})`
      : "";
    lines.push(
      `${input.quantity} x ${menuItem.product.name}${observationText} — ${formatCurrency(
        lineTotal
      )}`
    );
  }

  const phone = tenant.settings?.whatsappPhone;
  if (!phone) {
    return {
      success: false,
      error: "El negocio no tiene configurado un número de WhatsApp.",
    };
  }

  const message = [
    "Hola, quiero realizar este pedido:",
    "",
    ...lines,
    "",
    `Total estimado: ${formatCurrency(total)}`,
    "",
    "¿Me confirman el pedido y el tiempo de demora?",
  ].join("\n");

  const cleanPhone = phone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    message
  )}`;

  return { success: true, whatsappUrl };
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(amount);
}
