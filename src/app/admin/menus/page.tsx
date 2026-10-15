import Link from "next/link";
import { requireAuth } from "@/lib/tenant/tenant";
import { listMenus } from "@/modules/menus/service";
import { MenuForm } from "./menu-form";

export const instant = false;

export default async function MenusPage() {
  const user = await requireAuth();
  const activeTenant = user?.tenants[0];

  if (!activeTenant) {
    return <p>No tenés acceso a un negocio.</p>;
  }

  const menus = await listMenus(activeTenant.tenantId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Cartas</h2>
      </div>

      <MenuForm tenantId={activeTenant.tenantId} />

      <div className="rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {menus.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-muted-foreground"
                >
                  No hay cartas todavía.
                </td>
              </tr>
            )}
            {menus.map((menu) => (
              <tr key={menu.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">{menu.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{menu.slug}</td>
                <td className="px-4 py-3">
                  <MenuStatusBadge status={menu.status} />
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/menus/${menu.id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MenuStatusBadge({ status }: { status: string }) {
  const styles =
    status === "PUBLISHED"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      : status === "ARCHIVED"
        ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
        : "bg-yellow-100 text-yellow-800";

  const label =
    status === "PUBLISHED" ? "Publicada" : status === "ARCHIVED" ? "Archivada" : "Borrador";

  return (
    <span className={`rounded-full px-2 py-1 text-xs ${styles}`}>{label}</span>
  );
}
