import Link from "next/link";
import { requireAuth } from "@/lib/tenant/tenant";
import { listProducts, archiveProduct } from "@/modules/products/service";
import { ProductForm } from "./product-form";

export const instant = false;

export default async function ProductsPage() {
  const user = await requireAuth();
  const activeTenant = user?.tenants[0];

  if (!activeTenant) {
    return <p>No tenés acceso a un negocio.</p>;
  }

  const products = await listProducts(activeTenant.tenantId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Productos</h2>
      </div>

      <ProductForm tenantId={activeTenant.tenantId} />

      <div className="rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Precio base</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-muted-foreground"
                >
                  No hay productos todavía.
                </td>
              </tr>
            )}
            {products.map((product) => (
              <tr key={product.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">
                  ${Number(product.basePrice).toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      product.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {product.status === "ACTIVE" ? "Activo" : "Archivado"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await archiveProduct(activeTenant.tenantId, product.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="text-sm text-red-600 hover:underline"
                      >
                        Archivar
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
