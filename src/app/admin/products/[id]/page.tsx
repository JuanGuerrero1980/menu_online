import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/tenant/tenant";
import { getProduct, updateProduct } from "@/modules/products/service";
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
          await updateProduct(activeTenant.tenantId, id, {
            name: formData.get("name") as string,
            description: (formData.get("description") as string) || undefined,
            basePrice: Number(formData.get("basePrice")),
            status: formData.get("status") as ProductStatus,
          });
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
        <button
          type="submit"
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
