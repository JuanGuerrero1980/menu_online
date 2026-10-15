"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { updateProductAction, removeProductImageAction } from "@/modules/products/actions";
import { ProductStatus } from "@/generated/prisma/enums";

interface ProductEditFormProps {
  tenantId: string;
  productId: string;
  product: {
    id: string;
    name: string;
    description: string | null;
    basePrice: number;
    status: ProductStatus;
    images: Array<{ id: string; url: string; altText: string | null }>;
  };
}

export function ProductEditForm({ tenantId, productId, product }: ProductEditFormProps) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await updateProductAction(tenantId, productId, formData);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error al guardar el producto";
        setError(message);
      }
    });
  }

  async function handleRemoveImage(imageId: string) {
    startTransition(async () => {
      try {
        await removeProductImageAction(tenantId, imageId);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error al eliminar la imagen";
        setError(message);
      }
    });
  }

  return (
    <div className="space-y-6">
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={product.name}
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
            defaultValue={product.description ?? ""}
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
              defaultValue={Number(product.basePrice)}
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
              defaultValue={product.status}
              className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            >
              <option value={ProductStatus.ACTIVE}>Activo</option>
              <option value={ProductStatus.ARCHIVED}>Archivado</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium">
            Nueva imagen
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="mt-1 block w-full text-sm"
          />
        </div>
        <div>
          <label htmlFor="altText" className="block text-sm font-medium">
            Texto alternativo
          </label>
          <input
            id="altText"
            name="altText"
            type="text"
            className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-50"
        >
          {pending ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>

      {product.images.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Imágenes actuales</h3>
          <div className="flex flex-wrap gap-4">
            {product.images.map((image) => (
              <div key={image.id} className="space-y-2">
                <Image
                  src={image.url}
                  alt={image.altText ?? product.name}
                  width={120}
                  height={120}
                  className="rounded-md object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(image.id)}
                  disabled={pending}
                  className="w-full rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
