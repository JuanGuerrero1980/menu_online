import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/tenant/tenant";
import { getProduct } from "@/modules/products/service";
import { ProductEditForm } from "./product-edit-form";

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
      <ProductEditForm
        tenantId={activeTenant.tenantId}
        productId={id}
        product={{
          id: product.id,
          name: product.name,
          description: product.description,
          basePrice: Number(product.basePrice),
          status: product.status,
          images: product.images.map((image) => ({
            id: image.id,
            url: image.url,
            altText: image.altText,
          })),
        }}
      />
    </div>
  );
}
