import Link from "next/link";
import { requireAuth } from "@/lib/tenant/tenant";

export const instant = false;

export default async function AdminPage() {
  const user = await requireAuth();
  const activeTenant = user?.tenants[0];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Bienvenido al panel</h2>
      {activeTenant && (
        <p className="text-muted-foreground">
          Negocio activo: <strong>{activeTenant.name}</strong>
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/admin/products"
          className="rounded-lg border border-border p-4 hover:bg-accent"
        >
          <h3 className="font-medium">Productos</h3>
          <p className="text-sm text-muted-foreground">
            Gestionar el catálogo
          </p>
        </Link>
        <Link
          href="/admin/categories"
          className="rounded-lg border border-border p-4 hover:bg-accent"
        >
          <h3 className="font-medium">Categorías</h3>
          <p className="text-sm text-muted-foreground">
            Grupos de productos
          </p>
        </Link>
        <Link
          href="/admin/menus"
          className="rounded-lg border border-border p-4 hover:bg-accent"
        >
          <h3 className="font-medium">Cartas</h3>
          <p className="text-sm text-muted-foreground">Próximamente</p>
        </Link>
      </div>
    </div>
  );
}
