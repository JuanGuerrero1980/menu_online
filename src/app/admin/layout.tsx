import Link from "next/link";
import { connection } from "next/server";
import { requireAuth } from "@/lib/tenant/tenant";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export const instant = false;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();

  const user = await requireAuth();
  if (!user) {
    redirect("/login");
  }

  const activeTenant = user.tenants[0];
  if (!activeTenant) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>No tenés acceso a ningún negocio.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold">Resto Menu Online</h1>
              <span className="text-sm text-muted-foreground">
                {activeTenant.name}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 border-r border-border px-4 py-6">
          <nav className="space-y-2">
            <Link
              href="/admin"
              className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
            >
              Inicio
            </Link>
            <Link
              href="/admin/products"
              className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
            >
              Productos
            </Link>
            <Link
              href="/admin/categories"
              className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
            >
              Categorías
            </Link>
            <Link
              href="/admin/menus"
              className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
            >
              Cartas
            </Link>
          </nav>
        </aside>
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
