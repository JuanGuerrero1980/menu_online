"use client";

import { useState } from "react";
import { useCart } from "@/modules/cart/context";
import { validateCartAndGenerateMessage } from "@/modules/whatsapp/actions";

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
  }).format(price);
}

interface CartDrawerProps {
  tenantSlug: string;
  menuSlug: string;
  currency: string;
}

export function CartDrawer({ tenantSlug, menuSlug, currency }: CartDrawerProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { items, itemCount, total, updateQuantity, updateObservation, removeItem, clearCart } =
    useCart();

  async function handleSend() {
    if (items.length === 0) return;
    setLoading(true);
    setError(null);

    const result = await validateCartAndGenerateMessage(
      tenantSlug,
      menuSlug,
      items.map((i) => ({
        menuItemId: i.menuItemId,
        quantity: i.quantity,
        observation: i.observation,
      }))
    );

    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Ocurrió un error al validar el pedido.");
      return;
    }

    if (!result.whatsappUrl) {
      setError("No se pudo generar el enlace de WhatsApp.");
      return;
    }

    clearCart();
    window.location.href = result.whatsappUrl;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background shadow-lg"
      >
        Carrito ({itemCount})
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
          <div className="flex h-full w-full max-w-md flex-col bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Tu pedido</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {items.length === 0 ? (
              <p className="mt-8 text-center text-muted-foreground">
                El carrito está vacío.
              </p>
            ) : (
              <div className="mt-6 flex flex-1 flex-col gap-4 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.menuItemId} className="rounded-lg border p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(item.price, currency)} c/u
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.menuItemId)}
                        className="text-sm text-red-600"
                      >
                        Eliminar
                      </button>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                        className="rounded-md border px-2 py-1"
                      >
                        −
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                        className="rounded-md border px-2 py-1"
                      >
                        +
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Observaciones (ej: sin cebolla)"
                      value={item.observation ?? ""}
                      onChange={(e) =>
                        updateObservation(item.menuItemId, e.target.value)
                      }
                      className="mt-2 w-full rounded-md border px-2 py-1 text-sm"
                    />
                  </div>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <div className="mt-4 border-t pt-4">
                <p className="text-lg font-semibold">
                  Total: {formatPrice(total, currency)}
                </p>
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={loading}
                  className="mt-3 w-full rounded-full bg-green-600 py-3 text-sm font-medium text-white disabled:opacity-50"
                >
                  {loading ? "Validando..." : "Enviar pedido por WhatsApp"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
