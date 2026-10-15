import Image from "next/image";
import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/tenant/tenant";
import { getProduct } from "@/modules/products/service";
import {
  updateProductAction,
  removeProductImageAction,
} from "@/modules/products/actions";
import { ProductStatus } from "@/generated/prisma/enums";

export const instant = false;

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await requireAuth();
  const activeTenant = user?.tenants[0];

  if (!activeTenant) {
    return <p>No tenés acceso a un negocio.</p>;
  }

  const product = await getProduct(activeTenant.tenantId, id);
  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-2xl font-semibold">Editar producto</h2>
      <form
        action={async (formData) => {
          "use server";
          await updateProductAction(activeTenant.tenantId, id, formData);
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
        <button
          type="submit"
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background"
        >
          Guardar cambios
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
                <form
                  action={async () => {
                    "use server";
                    await removeProductImageAction(
                      activeTenant.tenantId,
                      image.id
                    );
                  }}
                >
                  <button
                    type="submit"
                    className="w-full rounded-md border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
