import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPublicTenantBySlug,
  getPublicMenuBySlug,
} from "@/modules/public/service";
import { AddToCartButton } from "@/components/public-menu/add-to-cart-button";
import { CartDrawer } from "@/components/public-menu/cart-drawer";
import type { Metadata } from "next";

export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tenantSlug: string; menuSlug: string }>;
}): Promise<Metadata> {
  const { tenantSlug, menuSlug } = await params;
  const tenant = await getPublicTenantBySlug(tenantSlug);
  const menu = tenant
    ? await getPublicMenuBySlug(tenant.id, menuSlug)
    : null;

  if (!tenant || !menu) {
    return { title: "Carta no encontrada" };
  }

  return {
    title: `${menu.name} — ${tenant.name}`,
    description: menu.description ?? `Carta de ${tenant.name}`,
    openGraph: {
      title: `${menu.name} — ${tenant.name}`,
      description: menu.description ?? `Carta de ${tenant.name}`,
    },
  };
}

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
  }).format(price);
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ tenantSlug: string; menuSlug: string }>;
}) {
  const { tenantSlug, menuSlug } = await params;
  const tenant = await getPublicTenantBySlug(tenantSlug);

  if (!tenant) {
    notFound();
  }

  const menu = await getPublicMenuBySlug(tenant.id, menuSlug);

  if (!menu) {
    notFound();
  }

  const settings = tenant.settings;
  const currency = settings?.currency ?? "ARS";

  return (
    <main
      className="min-h-screen px-4 py-6"
      style={{
        fontFamily: settings?.fontFamily ?? "sans-serif",
        color: settings?.primaryColor ?? "#171717",
      }}
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-2 text-center">
          <Link
            href={`/${tenant.slug}`}
            className="text-sm hover:underline"
            style={{ color: settings?.secondaryColor ?? "#737373" }}
          >
            ← {tenant.name}
          </Link>
          <h1 className="text-2xl font-bold">{menu.name}</h1>
          {menu.description && (
            <p className="text-muted-foreground">{menu.description}</p>
          )}
        </header>

        <div className="space-y-8">
          {menu.menuCategories.map((menuCategory) => (
            <section key={menuCategory.id}>
              <h2
                className="mb-4 text-xl font-semibold"
                style={{ color: settings?.primaryColor ?? "#171717" }}
              >
                {menuCategory.category.name}
              </h2>
              {menuCategory.category.description && (
                <p className="mb-3 text-sm text-muted-foreground">
                  {menuCategory.category.description}
                </p>
              )}
              <div className="grid gap-4">
                {menuCategory.items.map((item) => {
                  const product = item.product;
                  const price = Number(
                    item.priceOverride ?? product.basePrice
                  );
                  const image = product.images[0];

                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 rounded-xl border border-border bg-white p-4 shadow-sm"
                    >
                      {image && (
                        <Image
                          src={image.url}
                          alt={image.altText ?? product.name}
                          width={96}
                          height={96}
                          className="rounded-lg object-cover"
                        />
                      )}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          {product.description && (
                            <p className="text-sm text-muted-foreground">
                              {product.description}
                            </p>
                          )}
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <p
                            className="font-semibold"
                            style={{ color: settings?.primaryColor ?? "#171717" }}
                          >
                            {formatPrice(price, currency)}
                          </p>
                          <AddToCartButton
                            menuItemId={item.id}
                            productId={product.id}
                            name={product.name}
                            price={price}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      <CartDrawer
        tenantSlug={tenant.slug}
        menuSlug={menu.slug}
        currency={currency}
      />
    </main>
  );
}
