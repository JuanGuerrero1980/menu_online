export function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
  }).format(price);
}
