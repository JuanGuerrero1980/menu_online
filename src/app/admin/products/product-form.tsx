"use client";

import { useState } from "react";
import { createProduct } from "@/modules/products/service";
import { ProductStatus } from "@/generated/prisma/enums";

export function ProductForm({ tenantId }: { tenantId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-border p-4">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background"
        >
          Nuevo producto
        </button>
      ) : (
        <form
          action={async (formData) => {
            await createProduct(tenantId, {
              name: formData.get("name") as string,
              description: (formData.get("description") as string) || undefined,
              basePrice: Number(formData.get("basePrice")),
              status: formData.get("status") as ProductStatus,
            });
            setOpen(false);
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="basePrice" className="block text-sm font-medium">
                Precio base
              </label>
              <input
                id="basePrice"
                name="basePrice"
                type="number"
                step="0.01"
                min="0"
                required
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium">
                Estado
              </label>
              <select
                id="status"
                name="status"
                defaultValue={ProductStatus.ACTIVE}
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              >
                <option value={ProductStatus.ACTIVE}>Activo</option>
                <option value={ProductStatus.ARCHIVED}>Archivado</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md border border-border px-4 py-2 text-sm"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
