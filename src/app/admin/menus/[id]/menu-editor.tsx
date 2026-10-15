"use client";

import {
  addCategoryToMenu,
  addProductToMenuCategory,
  removeCategoryFromMenu,
  removeProductFromMenu,
  updateMenuItem,
} from "@/modules/menus/service";

export function MenuEditor({
  tenantId,
  menu,
  availableCategories,
  availableProducts,
}: {
  tenantId: string;
  menu: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    status: string;
    menuCategories: Array<{
      id: string;
      category: { id: string; name: string };
      items: Array<{
        id: string;
        product: { id: string; name: string; basePrice: unknown };
        priceOverride: unknown;
        isAvailable: boolean;
      }>;
    }>;
  };
  availableCategories: Array<{ id: string; name: string }>;
  availableProducts: Array<{ id: string; name: string }>;
}) {
  const unusedCategories = availableCategories.filter(
    (cat) => !menu.menuCategories.some((mc) => mc.category.id === cat.id)
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{menu.name}</h2>
          <p className="text-sm text-muted-foreground">/{menu.slug}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await addCategoryToMenu(
            tenantId,
            menu.id,
            formData.get("categoryId") as string
          );
        }}
        className="flex items-end gap-2 rounded-lg border border-border p-4"
      >
        <div className="flex-1">
          <label htmlFor="categoryId" className="block text-sm font-medium">
            Agregar categoría
          </label>
          <select
            id="categoryId"
            name="categoryId"
            required
            className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="">Seleccionar...</option>
            {unusedCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background"
        >
          Agregar
        </button>
      </form>

      {menu.menuCategories.length === 0 && (
        <p className="text-muted-foreground">
          Esta carta no tiene categorías todavía.
        </p>
      )}

      {menu.menuCategories.map((menuCategory) => (
        <section
          key={menuCategory.id}
          className="rounded-lg border border-border p-4"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">
              {menuCategory.category.name}
            </h3>
            <form
              action={async () => {
                await removeCategoryFromMenu(tenantId, menuCategory.id);
              }}
            >
              <button
                type="submit"
                className="text-sm text-red-600 hover:underline"
              >
                Quitar categoría
              </button>
            </form>
          </div>

          <form
            action={async (formData) => {
              await addProductToMenuCategory(
                tenantId,
                menuCategory.id,
                formData.get("productId") as string,
                formData.get("priceOverride")
                  ? Number(formData.get("priceOverride"))
                  : undefined
              );
            }}
            className="mb-4 flex items-end gap-2"
          >
            <div className="flex-1">
              <label
                htmlFor={`product-${menuCategory.id}`}
                className="block text-sm font-medium"
              >
                Producto
              </label>
              <select
                id={`product-${menuCategory.id}`}
                name="productId"
                required
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="">Seleccionar...</option>
                {availableProducts.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {prod.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor={`price-${menuCategory.id}`}
                className="block text-sm font-medium"
              >
                Precio override
              </label>
              <input
                id={`price-${menuCategory.id}`}
                name="priceOverride"
                type="number"
                step="0.01"
                min="0"
                placeholder="Opcional"
                className="mt-1 block w-32 rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background"
            >
              Agregar
            </button>
          </form>

          <div className="space-y-2">
            {menuCategory.items.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Sin productos en esta categoría.
              </p>
            )}
            {menuCategory.items.map((item) => {
              const basePrice = Number(item.product.basePrice);
              const override = item.priceOverride
                ? Number(item.priceOverride)
                : null;
              const displayPrice = override ?? basePrice;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-md border border-border px-4 py-2"
                >
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${displayPrice.toFixed(2)}
                      {override !== null && (
                        <span className="ml-2 text-xs">(override)</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <form
                      action={async () => {
                        await updateMenuItem(tenantId, item.id, {
                          isAvailable: !item.isAvailable,
                        });
                      }}
                    >
                      <button
                        type="submit"
                        className={`text-xs ${
                          item.isAvailable
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {item.isAvailable ? "Disponible" : "No disponible"}
                      </button>
                    </form>
                    <form
                      action={async () => {
                        await removeProductFromMenu(tenantId, item.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="text-sm text-red-600 hover:underline"
                      >
                        Quitar
                      </button>
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
