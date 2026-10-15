import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/tenant/tenant";
import { getMenu } from "@/modules/menus/service";
import { listCategories } from "@/modules/categories/service";
import { listProducts } from "@/modules/products/service";
import { MenuEditor } from "./menu-editor";

export const instant = false;

export default async function EditMenuPage({
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

  const menu = await getMenu(activeTenant.tenantId, id);
  if (!menu) {
    notFound();
  }

  const categories = await listCategories(activeTenant.tenantId);
  const products = await listProducts(activeTenant.tenantId);

  return (
    <MenuEditor
      tenantId={activeTenant.tenantId}
      menu={menu}
      availableCategories={categories}
      availableProducts={products}
    />
  );
}
