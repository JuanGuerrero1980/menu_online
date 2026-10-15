export interface MessageItem {
  name: string;
  quantity: number;
  price: number;
  observation?: string;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(amount);
}

export function buildWhatsAppMessage(items: MessageItem[]): string {
  const lines: string[] = [];
  let total = 0;

  for (const item of items) {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;
    const observationText = item.observation ? ` (${item.observation})` : "";
    lines.push(
      `${item.quantity} x ${item.name}${observationText} — ${formatCurrency(
        lineTotal
      )}`
    );
  }

  return [
    "Hola, quiero realizar este pedido:",
    "",
    ...lines,
    "",
    `Total estimado: ${formatCurrency(total)}`,
    "",
    "¿Me confirman el pedido y el tiempo de demora?",
  ].join("\n");
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
