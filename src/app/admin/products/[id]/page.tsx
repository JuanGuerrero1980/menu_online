import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/tenant/tenant";
import { getProduct } from "@/modules/products/service";
import { ProductEditForm } from "./product-edit-form";

export const instant = false;

async function loadProduct(productId: string) {
  const user = await requireAuth();
  const activeTenant = user?.tenants[0];

  if (!activeTenant) {
    return { error: "No tenés acceso a un negocio." };
  }

  const product = await getProduct(activeTenant.tenantId, productId);
  if (!product) {
    notFound();
  }

  return {
    tenantId: activeTenant.tenantId,
    product: {
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
    },
  };
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let result;
  let loadError: string | null = null;

  try {
    result = await loadProduct(id);
  } catch (error) {
    loadError = error instanceof Error ? error.message : String(error);
  }

  if (loadError) {
    return (
      <div className="max-w-xl space-y-4">
        <h2 className="text-2xl font-semibold">Error al cargar el producto</h2>
        <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {loadError}
        </p>
      </div>
    );
  }

  if (!result || "error" in result) {
    return <p>{result?.error ?? "No se pudo cargar el producto."}</p>;
  }

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-2xl font-semibold">Editar producto</h2>
      <ProductEditForm
        tenantId={result.tenantId}
        productId={id}
        product={result.product}
      />
    </div>
  );
}
