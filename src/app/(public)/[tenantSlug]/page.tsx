import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getPublicTenantBySlug,
  getPublicMenusByTenantId,
} from "@/modules/public/service";
import { TenantPageSkeleton } from "@/components/public-menu/tenant-page-skeleton";
import type { Metadata } from "next";

export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tenantSlug: string }>;
}): Promise<Metadata> {
  const { tenantSlug } = await params;
  const tenant = await getPublicTenantBySlug(tenantSlug);

  if (!tenant) {
    return { title: "Negocio no encontrado" };
  }

  return {
    title: tenant.name,
    description: `Cartas digitales de ${tenant.name}`,
    openGraph: {
      title: tenant.name,
      description: `Cartas digitales de ${tenant.name}`,
    },
  };
}

async function TenantContent({ slug }: { slug: string }) {
  const tenant = await getPublicTenantBySlug(slug);

  if (!tenant) {
    notFound();
  }

  const menus = await getPublicMenusByTenantId(tenant.id);
  const settings = tenant.settings;

  return (
    <main
      className="min-h-screen px-4 py-8"
      style={{
        fontFamily: settings?.fontFamily ?? "sans-serif",
        color: settings?.primaryColor ?? "#171717",
      }}
    >
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        {settings?.logoUrl && (
          <Image
            src={settings.logoUrl}
            alt={tenant.name}
            width={120}
            height={120}
            className="mx-auto rounded-full object-cover"
            priority
          />
        )}
        <h1 className="text-3xl font-bold">{tenant.name}</h1>
        {settings && (
          <p className="text-lg" style={{ color: settings.secondaryColor }}>
            Cartas digitales
          </p>
        )}

        {menus.length === 0 ? (
          <p className="text-muted-foreground">
            No hay cartas publicadas por el momento.
          </p>
        ) : (
          <div className="grid gap-4 pt-4">
            {menus.map((menu) => (
              <Link
                key={menu.id}
                href={`/${tenant.slug}/menu/${menu.slug}`}
                className="rounded-xl border border-border bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <h2 className="text-xl font-semibold">{menu.name}</h2>
                {menu.description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {menu.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default async function TenantPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>;
}) {
  const { tenantSlug } = await params;

  return (
    <Suspense fallback={<TenantPageSkeleton />}>
      <TenantContent slug={tenantSlug} />
    </Suspense>
  );
}
