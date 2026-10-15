"use client";

import { useState } from "react";
import { createCategory } from "@/modules/categories/service";

export function CategoryForm({ tenantId }: { tenantId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-border p-4">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background"
        >
          Nueva categoría
        </button>
      ) : (
        <form
          action={async (formData) => {
            await createCategory(tenantId, {
              name: formData.get("name") as string,
              description: (formData.get("description") as string) || undefined,
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
