import { requireAuth } from "@/lib/tenant/tenant";

export const instant = false;

export default async function MenusPage() {
  const user = await requireAuth();
  const activeTenant = user?.tenants[0];

  if (!activeTenant) {
    return <p>No tenés acceso a un negocio.</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Cartas</h2>
      <p className="text-muted-foreground">
        Esta sección se implementará en la próxima entrega (Fase 3b).
      </p>
    </div>
  );
}
