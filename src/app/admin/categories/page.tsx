import { requireAuth } from "@/lib/tenant/tenant";
import { listCategories, deleteCategory } from "@/modules/categories/service";
import { CategoryForm } from "./category-form";

export const instant = false;

export default async function CategoriesPage() {
  const user = await requireAuth();
  const activeTenant = user?.tenants[0];

  if (!activeTenant) {
    return <p>No tenés acceso a un negocio.</p>;
  }

  const categories = await listCategories(activeTenant.tenantId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Categorías</h2>
      </div>

      <CategoryForm tenantId={activeTenant.tenantId} />

      <div className="rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Descripción</th>
              <th className="px-4 py-3 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-6 text-center text-muted-foreground"
                >
                  No hay categorías todavía.
                </td>
              </tr>
            )}
            {categories.map((category) => (
              <tr key={category.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">{category.name}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {category.description || "—"}
                </td>
                <td className="px-4 py-3">
                  <form
                    action={async () => {
                      "use server";
                      await deleteCategory(activeTenant.tenantId, category.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="text-sm text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
